import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { visualizer } from "rollup-plugin-visualizer";
import { getFiles } from "./utils/getFiles";

const extensions = [".ts", ".tsx"];
const excludeExtensions = [".d.ts", ".test.tsx", ".spec.tsx"];

const files = getFiles("./src/components", extensions, excludeExtensions);

export default {
  input: ["./src/index.ts", ...files],
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist",
    }),
    postcss(),
    terser(),
    visualizer({
      filename: "bundle-analysis.html",
    }),
  ],
  external: [
    "react",
    "react-dom",
    "classnames",
    "prop-types",
    "react/jsx-runtime",
    "tslib",
  ],
};
