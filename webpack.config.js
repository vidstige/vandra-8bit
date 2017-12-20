module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + "/build",
        publicPath: 'build/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },
};