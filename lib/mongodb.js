import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI .env.local me set nahi hai. .env.local check karo."
    );
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        // 8s timeout — fail fast instead of hanging for 30s
        serverSelectionTimeoutMS: 8000,
      })
      .then((mongoose) => mongoose)
      .catch((err) => {
        // Reset cache so next call retries instead of caching the failure
        cached.promise = null;
        throw enhanceError(err);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Mongoose ka raw error user-friendly banane ka helper
function enhanceError(err) {
  const code = err?.code || "";
  const syscall = err?.syscall || "";
  const hostname = err?.hostname || "";

  // SRV lookup failure — mongodb+srv:// DNS problem
  if (syscall === "querySrv" || code === "ECONNREFUSED" && hostname.includes("_mongodb._tcp")) {
    return new Error(
      `MongoDB SRV DNS lookup fail hua (${hostname}).\n` +
      `  → .env.local me mongodb+srv:// URI hai — iske liye DNS SRV queries allowed honi chahiye.\n` +
      `  → Fix 1: Atlas → Connect → Drivers → "Standard connection string" copy karo\n` +
      `           aur mongodb+srv:// ko mongodb:// se replace karo.\n` +
      `  → Fix 2: DNS provider change karo (8.8.8.8 try karo).`
    );
  }

  // Plain DNS resolution failure
  if (code === "ENOTFOUND") {
    return new Error(
      `MongoDB host resolve nahi hua (${hostname}). Cluster name ya network check karo.`
    );
  }

  // Auth failure
  if (err?.name === "MongoServerError" && /auth/i.test(err?.message)) {
    return new Error(
      `MongoDB authentication fail hua. .env.local me username/password check karo.`
    );
  }

  // Timeout — usually cluster paused or firewall
  if (err?.name === "MongooseServerSelectionError") {
    return new Error(
      `MongoDB cluster tak nahi pahunch paaye (timeout). Cluster Atlas me paused toh nahi hai? IP whitelist check karo.`
    );
  }

  // Default — surface the original message
  return err;
}

export default connectDB;