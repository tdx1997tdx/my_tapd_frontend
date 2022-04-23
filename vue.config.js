const {defineConfig} = require("@vue/cli-service");
module.exports = defineConfig({
    pwa: {
        iconPaths: {
            favicon32: "favicon.jpg",
            favicon16: "favicon.jpg",
            appleTouchIcon: "favicon.jpg",
            maskIcon: "favicon.jpg",
            msTileImage: "favicon.jpg"
        }
    },
    transpileDependencies: true
});
