#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupStorage() {
  try {
    console.log('🔧 Setting up Supabase storage...');

    // Create storage bucket if it doesn't exist
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      return;
    }

    const bucketExists = buckets.some(bucket => bucket.name === 'safaris');

    if (!bucketExists) {
      console.log('📦 Creating storage bucket "safaris"...');
      const { error: createError } = await supabase.storage.createBucket('safaris', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 5242880, // 5MB
      });

      if (createError) {
        console.error('❌ Error creating bucket:', createError.message);
        return;
      }

      console.log('✅ Storage bucket "safaris" created successfully');
    } else {
      console.log('✅ Storage bucket "safaris" already exists');
    }

    // Update bucket to be public
    console.log('🔓 Setting bucket to public...');
    const { error: updateError } = await supabase.storage.updateBucket('safaris', {
      public: true,
    });

    if (updateError) {
      console.error('❌ Error updating bucket:', updateError.message);
    } else {
      console.log('✅ Bucket set to public');
    }

    // Test bucket access
    console.log('🧪 Testing bucket access...');
    const { data: testData, error: testError } = await supabase.storage
      .from('safaris')
      .list('', { limit: 1 });

    if (testError) {
      console.error('❌ Bucket access test failed:', testError.message);
    } else {
      console.log('✅ Bucket access test passed');
    }

    console.log('🎉 Storage setup complete!');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

setupStorage();