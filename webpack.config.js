const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');


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
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
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
		})
	]
};
