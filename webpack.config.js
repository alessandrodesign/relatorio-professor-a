const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './public/assets/ts/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/assets/js'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'node_modules/bootstrap/dist/**/*',
                    to: path.resolve(__dirname, 'public/libs/bootstrap'),
                    globOptions: {
                        ignore: ['**/package.json']
                    }
                },
                {
                    from: 'node_modules/bootstrap-icons/font/**/*',
                    to: path.resolve(__dirname, 'public/libs/bootstrap-icons'),
                    globOptions: {
                        ignore: ['**/package.json']
                    }
                },
                {
                    from: 'node_modules/jquery/dist/**/*',
                    to: path.resolve(__dirname, 'public/libs/jquery'),
                    globOptions: {
                        ignore: ['**/package.json']
                    }
                },
                {
                    from: 'node_modules/axios/dist/**/*',
                    to: path.resolve(__dirname, 'public/libs/axios'),
                    globOptions: {
                        ignore: ['**/package.json']
                    }
                }
            ],
        }),
    ],
    devtool: 'source-map',
};
