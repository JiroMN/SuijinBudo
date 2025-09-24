const path = require("path");

module.exports = {
  mode: "production", // Minified
  entry: {
    ["global/globals"]: "./src/global/globals.js",
    ["global/scrollSmoother"]: "./src/global/scrollSmoother.js",
    ["globalComponents/buttonAnimations"]:
      "./src/globalComponents/buttonAnimations.js",
    ["globalComponents/footer"]: "./src/globalComponents/footer.js",
    ["globalComponents/infoShortcuts"]:
      "./src/globalComponents/infoShortcuts.js",
    ["globalComponents/navigation"]: "./src/globalComponents/navigation.js",
    ["home/about"]: "./src/home/about.js",
    ["home/hero"]: "./src/home/hero.js",
    ["index"]: "./src/index.js",
    ["overOns"]: "./src/overOns.js",
    ["vechtstijl"]: "./src/vechtstijl.js",
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
