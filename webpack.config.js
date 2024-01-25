// NodeJS Modules
const path = require('path');

// Libs
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Configuration
module.exports = {
    entry: path.join(__dirname, 'src', 'index.tsx'), // Entry point for bundling in ./src/index.js
    output: {
        path: path.resolve(__dirname, 'dist') // Output point of bundling in ./dist
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Allowed extensions
    },
    module: {

        // Rule to transpile JS with Babel first
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/, // To transpile js files
                exclude: /node_modules/, // Exclude node modules from transpiling
                use: {
                    loader: 'babel-loader', // To use this package
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // Use these presets to transpile JS
                    }
                }
            },
            {
                test: /\.(mp4)$/,
                use: {
                    loader: 'file-loader', // Setup file loader to allow videos / images in the project
                    options: {
                        name: '[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [

        // Setup html-webpack-plugin to generate index.html
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html')
        })

    ]
}