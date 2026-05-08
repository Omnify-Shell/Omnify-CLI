// src/commands/add.ts

import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

const VALID_PACKAGES: Record<string, string> = {
  camera: '@omnify/camera',
  notifications: '@omnify/notifications',
  files: '@omnify/files',
  fingerprint: '@omnify/fingerprint',
  offline: '@omnify/offline',
};

export async function add(packageName: string) {
  const npmPackage = VALID_PACKAGES[packageName];

  if (!npmPackage) {
    console.log(chalk.red(`\n❌ Unknown package: ${packageName}`));
    console.log(
      chalk.dim('Available: ' + Object.keys(VALID_PACKAGES).join(', ')),
    );
    return;
  }

  // read omnify.json
  const configPath = path.join(process.cwd(), 'omnify.json');
  if (!(await fs.pathExists(configPath))) {
    console.log(chalk.red('\n❌ omnify.json not found. Run: npx omnify init'));
    return;
  }

  const config = await fs.readJSON(configPath);

  // add to permissions if not already there
  if (!config.permissions.includes(packageName)) {
    config.permissions.push(packageName);
  }

  // add to packages
  config.packages[npmPackage] = 'latest';

  // save omnify.json
  await fs.writeJSON(configPath, config, { spaces: 2 });

  console.log(chalk.cyan(`\n⚡ Adding ${npmPackage}...`));

  // npm install (commented until packages exist on npm)
  // execSync(`npm install ${npmPackage}`, { stdio: 'inherit' })

  console.log(chalk.green(`✅ Added ${packageName} to omnify.json`));
  console.log(chalk.dim(`   Package: ${npmPackage}`));
  console.log(chalk.dim(`   Permission: ${packageName} added\n`));
}
