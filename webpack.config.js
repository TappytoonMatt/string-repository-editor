const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx.tsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: { minimize: true },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    output: {
        path: __dirname + '/build',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'public/index.tsx.html',
            filename: './index.tsx.html',
        }),
    ],
    externals: {
        fs: 'require("fs")',
    },
    target: 'electron-renderer',
};
