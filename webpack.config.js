module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname + "/build",
        publicPath: 'build/',
        filename: "bundle.js",
    },
    module: {
        loaders: [
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
            {
                test: /\.tff$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    },
    devServer: {
        contentBase: "static/",
    }
};