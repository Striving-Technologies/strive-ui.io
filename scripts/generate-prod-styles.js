import fs from "fs";
import { globby } from "globby";
import { fileURLToPath } from "node:url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootPath = path.normalize(__dirname.split("scripts").slice(0, -1)[0]);
const srcPath = path.join(rootPath, "src");

const buildStyles = async () => {
  const styleRoutes = path.join(srcPath, "**", "*.scss").replace(/\\/g, "/");

  const files = await globby(styleRoutes, {});

  const buildDirectory = path.join(rootPath, "dist", "styles");

  // clean up dist/styles directory before generating new styles
  fs.rmSync(buildDirectory, {
    recursive: true,
    force: true,
  });

  fs.mkdirSync(buildDirectory, { recursive: true });

  files.forEach((file) => {
    const fileName = file.split("/").slice(-1)[0];

    if (fileName === "_settings.scss") return;

    console.log("Minifying: ", fileName);
    const fileContent = fs.readFileSync(file, "utf-8");

    const result = fileContent
      .replace(/([^0-9a-zA-Z.#])\s+/g, "$1")
      .replace(/\s([^0-9a-zA-Z.#]+)/g, "$1");
    // .replace(/\/\*.*?\*\//g, "");

    fs.writeFileSync(path.join(buildDirectory, fileName), result);
  });
};

buildStyles();
