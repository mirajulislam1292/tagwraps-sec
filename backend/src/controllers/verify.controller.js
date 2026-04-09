import { z } from "zod";
import { prisma } from "../prisma/client.js";
import { verifyPayloadSignature } from "../services/crypto.service.js";

const bodySchema = z.object({
  tag_uid: z.string().min(1),
  signature: z.string().min(1),
  signed_payload: z.string().min(1),
  scanner_device: z.string().optional(),
  scanner_location_country: z.string().optional(),
  scanner_location_city: z.string().optional(),
});

async function buildResponse(tag, scanCount, firstScannedAt) {
  return {
    product: {
      name: tag.product.name,
      brand: tag.product.brand,
      category: tag.product.category.name,
      batch_number: tag.product.batch_number,
      manufacture_date: tag.product.manufacture_date?.toISOString() || null,
      expiry_date: tag.product.expiry_date?.toISOString() || null,
      manufacturer: tag.manufacturer.company_name,
      country_of_origin: tag.product.country_of_origin || null,
      image_url: tag.product.image_url || null,
    },
    tag: {
      uid: tag.tag_uid,
      scan_count: scanCount,
      first_scanned: firstScannedAt ? firstScannedAt.toISOString() : null,
    },
  };
}

export async function verifyTag(req, res) {
  const input = bodySchema.parse(req.body);

  const tag = await prisma.nfcTag.findUnique({
    where: { tag_uid: input.tag_uid },
    include: {
      product: { include: { category: true } },
      manufacturer: true,
    },
  });

  if (!tag) {
    return res.json({
      result: "FAKE",
      product: null,
      tag: { uid: input.tag_uid, scan_count: 0, first_scanned: null },
      verified_at: new Date().toISOString(),
    });
  }

  const sigOk = verifyPayloadSignature(
    input.signed_payload,
    input.signature,
    process.env.ECDSA_PUBLIC_KEY
  );

  if (!sigOk) {
    await prisma.fraudAlert.create({
      data: {
        nfc_tag_id: tag.id,
        alert_type: "INVALID_SIGNATURE",
        details: "ECDSA signature verification failed for submitted payload/signature.",
        manufacturer_id: tag.manufacturer_id,
      },
    });

    return res.json({
      result: "FAKE",
      ...(await buildResponse(tag, await prisma.scanLog.count({ where: { nfc_tag_id: tag.id } }), null)),
      verified_at: new Date().toISOString(),
    });
  }

  if (tag.is_flagged) {
    const scanCount = await prisma.scanLog.count({ where: { nfc_tag_id: tag.id } });
    const first = await prisma.scanLog.findFirst({
      where: { nfc_tag_id: tag.id },
      orderBy: { created_at: "asc" },
      select: { created_at: true },
    });
    return res.json({
      result: "FLAGGED",
      ...(await buildResponse(tag, scanCount, first?.created_at || null)),
      verified_at: new Date().toISOString(),
    });
  }

  // Only count scans for locked tags (post-write)
  let scanCount = await prisma.scanLog.count({ where: { nfc_tag_id: tag.id } });
  let firstScannedAt = null;
  const first = await prisma.scanLog.findFirst({
    where: { nfc_tag_id: tag.id },
    orderBy: { created_at: "asc" },
    select: { created_at: true },
  });
  if (first) firstScannedAt = first.created_at;

  if (tag.is_locked) {
    scanCount += 1;
    if (!firstScannedAt) firstScannedAt = new Date();

    const now = new Date();
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const lastToday = await prisma.scanLog.findFirst({
      where: { nfc_tag_id: tag.id, created_at: { gte: start, lte: end } },
      orderBy: { created_at: "desc" },
      select: {
        scanner_location_country: true,
        scanner_location_city: true,
      },
    });

    const differentLocation =
      lastToday &&
      (lastToday.scanner_location_country !== (input.scanner_location_country || null) ||
        lastToday.scanner_location_city !== (input.scanner_location_city || null));

    if (differentLocation) {
      await prisma.fraudAlert.create({
        data: {
          nfc_tag_id: tag.id,
          alert_type: "DUPLICATE_SCAN",
          details:
            "Multiple scans detected on the same day from different locations. Potential clone or distribution anomaly.",
          manufacturer_id: tag.manufacturer_id,
        },
      });
    }

    await prisma.scanLog.create({
      data: {
        tag_uid: tag.tag_uid,
        nfc_tag_id: tag.id,
        scan_result: "GENUINE",
        scanner_ip: req.ip,
        scanner_device: input.scanner_device || req.get("user-agent") || null,
        scanner_location_country: input.scanner_location_country || null,
        scanner_location_city: input.scanner_location_city || null,
        scan_count_at_time: scanCount,
        manufacturer_id: tag.manufacturer_id,
      },
    });
  }

  return res.json({
    result: "GENUINE",
    ...(await buildResponse(tag, scanCount, firstScannedAt)),
    verified_at: new Date().toISOString(),
  });
}

export async function verifyTagGet(req, res) {
  const tag_uid = z.string().min(1).parse(req.params.tag_uid);
  // For web redirect GET, we can't validate signature from client. We still return product info + status based on tag state.
  const tag = await prisma.nfcTag.findUnique({
    where: { tag_uid },
    include: { product: { include: { category: true } }, manufacturer: true },
  });

  if (!tag) {
    return res.json({
      result: "FAKE",
      product: null,
      tag: { uid: tag_uid, scan_count: 0, first_scanned: null },
      verified_at: new Date().toISOString(),
    });
  }

  const scanCount = await prisma.scanLog.count({ where: { nfc_tag_id: tag.id } });
  const first = await prisma.scanLog.findFirst({
    where: { nfc_tag_id: tag.id },
    orderBy: { created_at: "asc" },
    select: { created_at: true },
  });

  const result = tag.is_flagged ? "FLAGGED" : "GENUINE";
  res.json({
    result,
    ...(await buildResponse(tag, scanCount, first?.created_at || null)),
    verified_at: new Date().toISOString(),
  });
}

