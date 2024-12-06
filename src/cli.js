#!/usr/bin/env node

const html2markdown = require('./index');

function printUsage() {
    console.log('Usage: html2md <url> [output-file]');
    console.log('');
    console.log('Arguments:');
    console.log('  url           The URL to download and convert');
    console.log('  output-file   (Optional) The name of the output file');
    console.log('');
    console.log('Example:');
    console.log('  html2md https://example.com');
    console.log('  html2md https://example.com output.md');
}

const url = process.argv[2];
const outputFile = process.argv[3];

if (!url) {
    console.error('Error: URL is required');
    printUsage();
    process.exit(1);
}

html2markdown(url, outputFile).catch(() => process.exit(1));
