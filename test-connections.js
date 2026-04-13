#!/usr/bin/env node

/**
 * Simple connection test runner
 */

import { testConnections } from '../src/lib/connection-test.ts';

async function main() {
  console.log('🔍 Running Frontend-Backend Connection Tests...\n');

  try {
    const results = await testConnections();

    console.log('\n' + '='.repeat(60));
    console.log('CONNECTION TEST SUMMARY');
    console.log('='.repeat(60));

    const successful = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'failed').length;
    const warnings = results.filter(r => r.status === 'warning').length;

    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`⚠️ Warnings: ${warnings}`);
    console.log('='.repeat(60));

    results.forEach(result => {
      const icon = result.status === 'success' ? '✅' : result.status === 'failed' ? '❌' : '⚠️';
      console.log(`${icon} ${result.name}: ${result.message}`);
    });

  } catch (error) {
    console.error('❌ Test execution failed:', error);
  }
}

main();