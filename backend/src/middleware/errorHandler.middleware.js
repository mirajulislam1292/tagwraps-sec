export function notFoundHandler(req, res) {
  res.status(404).json({ error: "Not Found" });
}

export function errorHandler(err, req, res, next) {
  // eslint-disable-line no-unused-vars
  // Zod validation errors should be 400, not 500.
  if (err?.name === "ZodError") {
    return res.status(400).json({
      error: "Validation failed",
      details: err.issues?.map((i) => ({ path: i.path?.join("."), message: i.message })) || [],
    });
  }

  const status = err.statusCode || err.status || 500;
  const message =
    status >= 500 ? "Internal Server Error" : err.message || "Request failed";

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
}

