/**
 * Lightweight secret scanner (complements detect-secrets & Gitleaks)
 * Usage: pnpm ts-node scripts/scan-secrets.ts
 */
import * as fs from 'fs';
import * as path from 'path';

const EXCLUDE_DIRS = new Set([ 'node_modules', '.git', '.next', 'dist', 'build', 'coverage' ]);
const EXT_WHITELIST = new Set(['.ts', '.tsx', '.js', '.cjs', '.mjs', '.json', '.env', '.yml', '.yaml', '.md', '.txt']);

interface Pattern { name: string; regex: RegExp; redact?: (m: string) => string }
const patterns: Pattern[] = [
  { name: 'GoogleAPIKey', regex: /AIza[0-9A-Za-z\-_]{35}/g, redact: v => v.slice(0,6)+"..."+v.slice(-4) },
  { name: 'OpenAIKey', regex: /sk-[A-Za-z0-9]{20,}/g },
  { name: 'AWSAccessKeyId', regex: /AKIA[0-9A-Z]{16}/g },
  { name: 'GenericBearer', regex: /Bearer\s+[A-Za-z0-9\-_\.]{20,}/g },
  { name: 'PrivKeyHeader', regex: /-----BEGIN (?:RSA |EC |)PRIVATE KEY-----/g },
];

interface Finding { file: string; line: number; match: string; pattern: string }
const findings: Finding[] = [];

function scanFile(file: string) {
  let content: string;
  try { content = fs.readFileSync(file, 'utf8'); } catch { return; }
  const lines = content.split(/\r?\n/);
  lines.forEach((line, idx) => {
    for (const p of patterns) {
      const matches = line.match(p.regex);
      if (matches) {
        matches.forEach(m => findings.push({ file, line: idx+1, match: p.redact? p.redact(m): m, pattern: p.name }));
      }
    }
  });
}

function walk(dir: string) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    let stats; try { stats = fs.statSync(full); } catch { continue; }
    if (stats.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry)) continue;
      walk(full);
    } else {
      const ext = path.extname(entry);
      if (EXT_WHITELIST.has(ext) || entry.startsWith('.env')) scanFile(full);
    }
  }
}

walk(process.cwd());

if (findings.length) {
  console.error('Secret scan: potential findings:\n');
  for (const f of findings) {
    console.error(`[${f.pattern}] ${f.file}:${f.line} => ${f.match}`);
  }
  console.error('\nReview each finding. If false positive, adjust tooling config.');
  process.exitCode = 1;
} else {
  console.log('Secret scan: OK (no findings).');
}