const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		bundle: './src/js/entry.js',
		critical: './src/js/critical.js'
	},
	output: {
		filename: '[name].js'
	},
	module: {
		rules: [
			{ 
				test: /\.styl$/,
				use: 
				[
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
					},
					{
						loader: "stylus-loader",
						options: 
						{
							stylusOptions: 
							{
								include: [path.join(process.cwd(), "src", "css")],
								additionalData: `@env: ${process.env.NODE_ENV};`,
							},
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [require('@babel/plugin-proposal-object-rest-spread')]
					}
				}
			}
		]
	},
	plugins: [
		new HandlebarsPlugin({
			entry: path.join(process.cwd(), 'src', 'html', '*.hbs'),
			output: path.join(process.cwd(), 'dist', '[name].html'),
			partials: [
				path.join(process.cwd(), 'src', 'html', 'partials', '*', '*.hbs')
			],
			helpers: {
				projectHelpers: path.join(process.cwd(), 'src', 'html', 'helpers', '*.js')
			}
		}),
		new MiniCssExtractPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'src/assets/',
					to: 'assets/'
				}
			]
		})
	]
};
