const path = require("path");

module.exports = {
  mode: "production", // Minified
  entry: {
    ["components/buttonAnimations"]: "./src/components/buttonAnimations.js",
    ["components/navMenu"]: "./src/components/navMenu.js",
    ["globals"]: "./src/globals.js",
    ["home-page"]: "./src/home-page.js",
    ["index"]: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // Creates file name in 'dist' folder
    library: "[name]",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
    clean: true,
  },
};
