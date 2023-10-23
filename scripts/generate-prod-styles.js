import fs from "fs";
import { globby } from "globby";
import { fileURLToPath } from "node:url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootPath = __dirname.split("/").slice(0, -1).join("/");
const srcPath = rootPath + "/src";

const buildStyles = async () => {
  const files = await globby(srcPath + "/**/*.scss", {});

  // clean up dist/styles directory before generating new styles
  fs.rmSync(rootPath + "/dist/components/styles", {
    recursive: true,
    force: true,
  });

  fs.mkdirSync(rootPath + "/dist/components/styles", { recursive: true });

  files.forEach((file) => {
    const fileName = file.split("/").slice(-1)[0];

    if (fileName.startsWith("_")) return;

    console.log("Minifying: ", fileName);
    const fileContent = fs.readFileSync(file, "utf-8");

    const result = fileContent
      .replace(/([^0-9a-zA-Z\.#])\s+/g, "$1")
      .replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1");
    // .replace(/\/\*.*?\*\//g, "");

    fs.writeFileSync(rootPath + `/dist/components/styles/${fileName}`, result);
  });
};

buildStyles();
