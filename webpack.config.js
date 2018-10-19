const {readdirSync, statSync, unlinkSync} = require("fs");
const {resolve, join} = require('path');

const packageName = require('./package.json').name;

module.exports = {
    entry: './src/index.ts',
    resolve: {
        extensions: ['.ts'],
    },
    externals: [
        '@angular/core',
        'react',
        'react-dom',
        'prop-types',
    ],
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist'),
        library: packageName,
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'},
        ],
    },
    plugins: [
        {
            apply: compiler =>
                compiler.hooks.compilation.tap('clean dist', compilation => {
                    const path = compilation.options.output.path;
                    readdirSync(path)
                        .forEach(name => {
                            const fullPath = join(path, name);
                            if (!statSync(fullPath).isDirectory()) {
                                unlinkSync(join(fullPath));
                            }
                        })
                })
        },
    ]
};