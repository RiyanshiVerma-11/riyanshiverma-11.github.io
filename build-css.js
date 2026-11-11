#!/usr/bin/env node
/**
 * ============================================================================
 * Riyanshi Verma Portfolio — Modular CSS Bundler
 * ============================================================================
 * Combines modular component stylesheets from /styles into production style.css
 *
 * Usage:
 *   node build-css.js          -> Build style.css once
 *   node build-css.js --watch  -> Watch /styles directory for live changes
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const STYLES_DIR = path.join(__dirname, 'styles');
const OUTPUT_FILE = path.join(__dirname, 'style.css');

// Exact cascade order for all modular component stylesheets
const MODULES = [
    '01-variables.css',
    '02-base.css',
    '03-nav.css',
    '04-hero.css',
    '05-about.css',
    '06-skills.css',
    '07-projects.css',
    '08-experience.css',
    '09-honors.css',
    '10-sandbox.css',
    '11-contact.css',
    '12-modals.css',
    '13-chatbot.css',
    '14-features.css',
    '15-animations.css',
    '16-light-theme.css'
];

function build() {
    const startTime = Date.now();
    let combined = `/**\n * Riyanshi Verma — Portfolio Production Stylesheet\n * COMPILED FROM MODULAR SOURCE: /styles/*.css\n * Build time: ${new Date().toISOString()}\n *\n * NOTE: To edit styles, modify the component files in /styles/\n * and run: node build-css.js (or npm run build:css)\n */\n\n`;

    let totalFiles = 0;
    for (const mod of MODULES) {
        const filePath = path.join(STYLES_DIR, mod);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            combined += content.trim() + '\n\n';
            totalFiles++;
        } else {
            console.warn(`[WARN] Missing modular file: ${mod}`);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, combined.trim() + '\n', 'utf-8');
    const elapsed = Date.now() - startTime;
    const lines = combined.split('\n').length;
    const kb = (Buffer.byteLength(combined, 'utf-8') / 1024).toFixed(1);

    console.log(`✅ [CSS Build] Bundled ${totalFiles} modules into style.css (${lines} lines, ${kb} KB) in ${elapsed}ms`);
}

// Watch mode support
if (process.argv.includes('--watch') || process.argv.includes('-w')) {
    build();
    console.log('👀 [CSS Watcher] Watching styles/ directory for changes... (Press Ctrl+C to stop)');
    
    let debounceTimer = null;
    fs.watch(STYLES_DIR, (eventType, filename) => {
        if (filename && filename.endsWith('.css')) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                console.log(`📝 [Change Detected] ${filename} modified.`);
                build();
            }, 100);
        }
    });
} else {
    build();
}

