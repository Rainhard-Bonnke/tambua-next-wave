import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = "safaris";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;

  const exists = Array.isArray(buckets) && buckets.some((bucket) => bucket.name === BUCKET_NAME);
  if (exists) {
    console.log(`Bucket '${BUCKET_NAME}' already exists.`);
    process.exit(0);
  }

  const { data, error } = await supabase.storage.createBucket(BUCKET_NAME, { public: true });
  if (error) throw error;

  console.log(`Created storage bucket: ${data.name}`);
}

main().catch((error) => {
  console.error("Failed to create Supabase storage bucket:", error.message || error);
  process.exit(1);
});
