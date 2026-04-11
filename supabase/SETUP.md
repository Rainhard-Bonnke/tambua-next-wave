# Supabase Setup

## 1. Apply the database migrations

From the project root:

```bash
cd supabase
npx supabase db push
```

This will apply the schema in `supabase/migrations` and ensure `blogs`, `safaris`, and `destinations` tables exist.

## 2. Create the storage bucket

This repo includes a helper script to create the image bucket used by the admin panel:

```bash
npm run setup-storage-bucket
```

If you prefer to run the script directly:

```bash
node scripts/create-supabase-storage-bucket.js
```

## 3. Confirm storage policies

If you need to add the storage policies manually, use `create_storage_bucket.sql` at the repository root.

## Notes

- The bucket name used by the admin panel is `safaris`.
- The service role key must be present in `.env` as `SUPABASE_SERVICE_ROLE_KEY`.
