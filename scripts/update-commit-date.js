const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get the last commit date in ISO format
  const lastCommitDate = execSync('git log -1 --format="%cd" --date=iso', {
    encoding: 'utf8'
  }).trim();

  // Create the last-updated.ts file with the commit date
  const content = `// This file is auto-generated during build
export const LAST_COMMIT_DATE = "${lastCommitDate}";
`;

  const filePath = path.join(__dirname, '..', 'lib', 'last-commit-date.ts');
  fs.writeFileSync(filePath, content);

  console.log('Last commit date updated:', lastCommitDate);
} catch (error) {
  console.error('Error getting last commit date:', error);
  // Fallback to a default date if git command fails
  const fallbackContent = `// This file is auto-generated during build
export const LAST_COMMIT_DATE = "2026-01-08T02:01:50-04:00";
`;

  const filePath = path.join(__dirname, '..', 'lib', 'last-commit-date.ts');
  fs.writeFileSync(filePath, fallbackContent);
}