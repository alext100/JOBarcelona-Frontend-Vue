module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  collectCoverage: true,
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/**/*.{js,vue,ts}", "!src/main.js"],
  modulePathIgnorePatterns: [
    "src/main.ts",
    "src/store/index.ts",
    "shims-vue.d.ts",
    "/node_modules/",
  ],
  verbose: true,
};
