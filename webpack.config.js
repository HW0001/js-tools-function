const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./lib/tools.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "tools.js",
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      include: /\/lib/,
    }),
  ],
};
