import dotenv from "dotenv";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "./client.js";
import { ensureEcdsaKeypairInEnv } from "../utils/keypair.js";
import { generateRandomTagUid, sha256, signPayload } from "../services/crypto.service.js";

dotenv.config();
ensureEcdsaKeypairInEnv();

async function upsertCategory(name) {
  return prisma.productCategory.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

function makeSignedPayload({ tag_uid, product_id, manufacturer_id, timestamp }) {
  return JSON.stringify({ tag_uid, product_id, manufacturer_id, timestamp });
}

function makeApiKey() {
  return `tw_${crypto.randomBytes(32).toString("hex")}`;
}

async function main() {
  const categories = [
    "Medicine",
    "Cosmetics",
    "Electronics",
    "Food",
    "Luxury Goods",
    "Clothing",
    "Other",
  ];

  for (const c of categories) await upsertCategory(c);

  await prisma.subscriptionPlan.upsert({
    where: { name: "FREE" },
    update: { tags_per_month: 100, price_usd: "0.00", features: ["100 tags/month", "Basic dashboard"] },
    create: { name: "FREE", tags_per_month: 100, price_usd: "0.00", features: ["100 tags/month", "Basic dashboard"] },
  });
  await prisma.subscriptionPlan.upsert({
    where: { name: "BASIC" },
    update: { tags_per_month: 1000, price_usd: "49.00", features: ["1,000 tags/month", "Fraud alerts"] },
    create: { name: "BASIC", tags_per_month: 1000, price_usd: "49.00", features: ["1,000 tags/month", "Fraud alerts"] },
  });
  await prisma.subscriptionPlan.upsert({
    where: { name: "PRO" },
    update: { tags_per_month: 10000, price_usd: "199.00", features: ["10,000 tags/month", "API access", "Advanced alerts"] },
    create: { name: "PRO", tags_per_month: 10000, price_usd: "199.00", features: ["10,000 tags/month", "API access", "Advanced alerts"] },
  });
  await prisma.subscriptionPlan.upsert({
    where: { name: "ENTERPRISE" },
    update: { tags_per_month: 100000, price_usd: "999.00", features: ["100,000 tags/month", "SLA", "Dedicated support"] },
    create: { name: "ENTERPRISE", tags_per_month: 100000, price_usd: "999.00", features: ["100,000 tags/month", "SLA", "Dedicated support"] },
  });

  const adminEmail = "admin@tagwraps.com";
  const adminPass = await bcrypt.hash("Admin@123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: adminPass, role: "SUPER_ADMIN", is_verified: true, is_active: true, full_name: "TagWraps Super Admin" },
    create: {
      email: adminEmail,
      password: adminPass,
      role: "SUPER_ADMIN",
      is_verified: true,
      is_active: true,
      full_name: "TagWraps Super Admin",
    },
  });

  const demoEmail = "demo@squarepharma.com.bd";
  const demoPass = await bcrypt.hash("Demo@123456", 12);

  const demoApiKey = makeApiKey();
  const demoApiKeyHash = sha256(demoApiKey);

  const demoUser = await prisma.user.upsert({
    where: { email: demoEmail },
    update: { password: demoPass, role: "MANUFACTURER", is_verified: true, is_active: true, full_name: "Square Pharma Demo" },
    create: {
      email: demoEmail,
      password: demoPass,
      role: "MANUFACTURER",
      is_verified: true,
      is_active: true,
      full_name: "Square Pharma Demo",
    },
  });

  const demoManufacturer = await prisma.manufacturer.upsert({
    where: { user_id: demoUser.id },
    update: {
      company_name: "Square Pharmaceuticals (Demo)",
      country: "Bangladesh",
      is_approved: true,
      approved_by: admin.id,
      approved_at: new Date(),
      subscription_plan: "PRO",
      tags_remaining: 5000,
      api_key_hash: demoApiKeyHash,
      api_key_last4: demoApiKey.slice(-4),
      api_key_created_at: new Date(),
    },
    create: {
      user_id: demoUser.id,
      company_name: "Square Pharmaceuticals (Demo)",
      country: "Bangladesh",
      is_approved: true,
      approved_by: admin.id,
      approved_at: new Date(),
      subscription_plan: "PRO",
      tags_remaining: 5000,
      api_key_hash: demoApiKeyHash,
      api_key_last4: demoApiKey.slice(-4),
      api_key_created_at: new Date(),
    },
  });

  const medicine = await prisma.productCategory.findUnique({ where: { name: "Medicine" } });

  const products = [
    { name: "Montelukast 10mg tablets", brand: "Square", batch_number: "MNT-10-2026-01" },
    { name: "Salbutamol Inhaler 100mcg", brand: "Square", batch_number: "SLB-100-2026-01" },
    { name: "Paracetamol 500mg tablets", brand: "Square", batch_number: "PCM-500-2026-01" },
  ];

  const createdProducts = [];
  for (const p of products) {
    const created = await prisma.product.create({
      data: {
        manufacturer_id: demoManufacturer.id,
        category_id: medicine.id,
        name: p.name,
        brand: p.brand,
        description: "DEMO SEED DATA — replace with real product information.",
        image_url: null,
        batch_number: p.batch_number,
        manufacture_date: new Date("2026-01-10"),
        expiry_date: new Date("2028-01-10"),
        country_of_origin: "Bangladesh",
      },
    });
    createdProducts.push(created);
  }

  const privateKey = process.env.ECDSA_PRIVATE_KEY;

  // 20 tags (10 for first two products)
  const tags = [];
  const now = new Date();
  for (let i = 0; i < 20; i++) {
    const product = i < 10 ? createdProducts[0] : createdProducts[1];
    const tag_uid = generateRandomTagUid();
    const timestamp = new Date(now.getTime() - i * 60_000).toISOString();
    const signed_payload = makeSignedPayload({
      tag_uid,
      product_id: product.id,
      manufacturer_id: demoManufacturer.id,
      timestamp,
    });
    const ecdsa_signature = signPayload(signed_payload, privateKey);

    const tag = await prisma.nfcTag.create({
      data: {
        tag_uid,
        product_id: product.id,
        manufacturer_id: demoManufacturer.id,
        signed_payload,
        ecdsa_signature,
        is_locked: true,
        locked_at: new Date(),
      },
    });
    tags.push(tag);
  }

  // 5 tags with scan history
  for (let i = 0; i < 5; i++) {
    const tag = tags[i];
    for (let s = 0; s < 3; s++) {
      await prisma.scanLog.create({
        data: {
          tag_uid: tag.tag_uid,
          nfc_tag_id: tag.id,
          scan_result: "GENUINE",
          scanner_ip: "203.76.121.10",
          scanner_device: "DEMO_DEVICE",
          scanner_location_country: "Bangladesh",
          scanner_location_city: "Dhaka",
          scan_count_at_time: s + 1,
          manufacturer_id: demoManufacturer.id,
        },
      });
    }
  }

  // 1 flagged tag + fraud alert
  const flagged = tags[6];
  await prisma.nfcTag.update({
    where: { id: flagged.id },
    data: { is_flagged: true, flag_reason: "DEMO: Suspicious duplicate scans" },
  });

  await prisma.fraudAlert.createMany({
    data: [
      {
        nfc_tag_id: tags[0].id,
        alert_type: "DUPLICATE_SCAN",
        details: "DEMO SEED DATA — duplicate scans from different locations within the same day.",
        manufacturer_id: demoManufacturer.id,
      },
      {
        nfc_tag_id: tags[1].id,
        alert_type: "INVALID_SIGNATURE",
        details: "DEMO SEED DATA — invalid signature submitted to verification endpoint.",
        manufacturer_id: demoManufacturer.id,
      },
    ],
    skipDuplicates: true,
  });

  // eslint-disable-next-line no-console
  console.log("Seed complete.");
  // eslint-disable-next-line no-console
  console.log(`Demo Manufacturer API key (shown once): ${demoApiKey}`);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

