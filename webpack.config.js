const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function directorySeparator() {
    if (typeof process !== 'undefined' && process.platform) {
        return process.platform === 'win32' ? '\\' : '/';
    } else if (typeof navigator !== 'undefined' && navigator.platform) {
        if (navigator.platform.startsWith('Win')) {
            return '\\';
        } else {
            return '/';
        }
    } else {
        return '/';
    }
}

function cleanString(filePath) {
    if (typeof filePath !== 'string') {
        throw new TypeError('O argumento deve ser uma string.');
    }
    const DIRECTORY_SEPARATOR = directorySeparator();
    const basePath = ['public', 'assets', 'ts', ''].join(DIRECTORY_SEPARATOR);
    if (filePath.startsWith('.' + DIRECTORY_SEPARATOR + basePath)) {
        filePath = filePath.slice(2 + basePath.length);
    } else if (filePath.startsWith(basePath)) {
        filePath = filePath.slice(basePath.length);
    }
    const fileName = filePath.replace('.ts', '');
    return fileName.replace(basePath, '');
}

function getEntries() {
    const entries = {};
    glob.sync('./public/assets/ts/**/*.ts').forEach(file => {
        const entryName = cleanString(file);
        entries[entryName] = path.resolve(__dirname, file);
    });
    return entries;
}

module.exports = {
    mode: 'development', entry: getEntries(), output: {
        filename: '[name].js', path: path.resolve(__dirname, 'public/assets/js'),
    }, resolve: {
        extensions: ['.ts', '.js'], alias: {
            '@': path.resolve(__dirname, 'public/assets/ts')
        },
    }, module: {
        rules: [{
            test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/,
        }, {
            test: /\.css$/, use: ['style-loader', 'css-loader'],
        },],
    }, plugins: [new CopyWebpackPlugin({
        patterns: [{
            from: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
            to: path.resolve(__dirname, 'public/libs/bootstrap/[name][ext]'),
        }, {
            from: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            to: path.resolve(__dirname, 'public/libs/bootstrap/[name][ext]'),
        }, {
            from: 'node_modules/bootstrap-icons/font/bootstrap-icons.css',
            to: path.resolve(__dirname, 'public/libs/bootstrap-icons/[name][ext]'),
        }, {
            from: 'node_modules/bootstrap-icons/font/fonts',
            to: path.resolve(__dirname, 'public/libs/bootstrap-icons/fonts'),
        }, {
            from: 'node_modules/jquery/dist/jquery.min.js',
            to: path.resolve(__dirname, 'public/libs/jquery/[name][ext]'),
        }, {
            from: 'node_modules/axios/dist/axios.min.js', to: path.resolve(__dirname, 'public/libs/axios/[name][ext]'),
        },],
    }),], devtool: 'source-map',
};
