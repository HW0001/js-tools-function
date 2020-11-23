import { terser } from "rollup-plugin-terser";

export default {
  input: "lib/tools.js",
  output: [
    {
      globals: {
        vue: "Vue",
      },
      name: "tools-fucs",
      file: "dist/tools-fucs.js",
      format: "umd",
      plugins: [terser()],
    },
    {
      name: "tools-fucs",
      file: "dist/tools-fucs.esm.js",
      format: "es",
      plugins: [terser()],
    },
  ],
};
