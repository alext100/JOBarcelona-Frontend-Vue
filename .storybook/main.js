const path = require("path");

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-jest",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
    {
      name: "@storybook/addon-docs",
      options: {
        babelOptions: {
          presets: [
            [
              "@vue/cli-plugin-babel/preset",
              {
                jsx: false,
              },
            ],
          ],
        },
      },
    },
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      vue$: "vue/dist/vue.esm-bundler.js",
      "@": path.resolve(__dirname, "../src"),
    };
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader", "postcss-loader"],
      include: path.resolve(__dirname, "../"),
    });
    config.module.rules.push({
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        },
      ],
    });

    return config;
  },
  framework: "@storybook/vue3",
};
