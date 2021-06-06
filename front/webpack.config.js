const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");

module.exports = () => {
  const isDevelopment = !process.env["NODE_ENV"] || process.env["NODE_ENV"] === "development";

  return {
    entry: {
      login: "./src/javascript/login/index.tsx",
      register: "./src/javascript/register/index.tsx",
      main: "./src/javascript/main/index.tsx",
    },
    module: {
      rules: [
        {
          test: /\.(m?jsx?(\.erb)?|tsx?)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "supports es6-module" }],
              "@babel/preset-typescript",
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      plugins: [new TsconfigPathsPlugin({ configFile: "web.tsconfig.json" })],
    },
    plugins: [
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist", "javascript"),
    },
    devtool: "inline-source-map",
    devServer: {
      port: 9000,
      hot: true,
      hotOnly: true,
      inline: true,
      publicPath: "/javascript/",
      public: "localhost:9000",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      },
    },
  };
};
