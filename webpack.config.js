const path = require("path");
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const svgHelper = require("handlebars-helper-svg");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const mergeJSON = require("handlebars-webpack-plugin/utils/mergeJSON");
const projectData = mergeJSON(path.join(__dirname, "template-data/*.json"));

module.exports = {
  mode: "production",
  entry: {
    bundle: "./src/js/entry.js",
    critical: "./src/js/critical.js",
  },
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [require("@babel/plugin-proposal-object-rest-spread")],
          },
        },
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
            options: {
              stylusOptions: {
                include: [path.join(__dirname, "src", "css")],
                additionalData: `@env: ${process.env.NODE_ENV};`,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HandlebarsPlugin({
      entry: path.join(__dirname, "src", "html", "*.hbs"),
      output: path.join(__dirname, "dist", "[name].html"),
      data: projectData,
      partials: [path.join(__dirname, "src", "html", "partials", "*", "*.hbs")],
      helpers: {
        svg: svgHelper,
        projectHelpers: path.join(__dirname, "src", "html", "helpers", "*.js"),
      },
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets/",
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
};
