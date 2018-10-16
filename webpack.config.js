const {resolve} = require('path');

const packageName = require('./package.json').name;

module.exports = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts']
    },
    externals: [
        '@angular/core',
        'react',
        'react-dom',
        'prop-types',
    ],
    output: {
        filename: packageName + '.js',
        path: resolve(__dirname, 'dist'),
        library: packageName,
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
        ],
    },
};