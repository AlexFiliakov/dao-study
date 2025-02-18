const { execSync } = require('child_process');
const fs = require('fs');
try {
  const timestamp = execSync('git log -1 --format=%ct').toString().trim();
  fs.writeFileSync('commit-time.json', JSON.stringify({ timestamp }), 'utf-8');
} catch (err) {
  console.error('Error getting commit time:', err);
}