import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json
const packageJsonPath = path.resolve(__dirname, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

// Remove "type": "module" from package.json
delete packageJson.type;

// Write modified package.json to dist folder
const distPackageJsonPath = path.resolve(__dirname, "dist", "package.json");
fs.writeFileSync(
  distPackageJsonPath,
  JSON.stringify(packageJson, null, 2),
  "utf-8"
);
