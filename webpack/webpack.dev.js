const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '..', './.env.development'),
        }),
        new HotModuleReplacementPlugin(),
    ],
    devServer: {
        historyApiFallback: true,
    },
    devtool: 'eval-source-map',
};