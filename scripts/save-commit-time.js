import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  const timestamp = execSync('git log -1 --format=%ct').toString().trim();
  fs.writeFileSync(
    path.join('public', 'commit-time.json'), 
    JSON.stringify({ timestamp }), 
    'utf-8'
  );
} catch (err) {
  console.error('Error getting commit time:', err);
}