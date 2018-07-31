const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
    entry: __dirname + "/src/js/index.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "bundle.js",//打包后输出文件的文件名
        // publicPath: 'http://localhost:8080/',
    },
    devtool: 'eval-source-map',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        },
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
    },
    module: {
        rules:
            [
                { test: /.js$/, use: ['babel-loader'] },

                //将css文件单独打包
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({

                        fallback: "style-loader",
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }, 'postcss-loader'],
                        publicPath: '../'
                    })
                },

                //将less文件单独打包
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({

                        fallback: "style-loader",
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: true //css压缩
                            }
                        }, 'less-loader'],
                        publicPath: '../'
                    })
                },

                { test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=8192&name=images/[name].[ext]'] },/*解析图片并且将图片打包到images文件夹下*/
                // { test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
                { test: /\.html$/, use: { loader: 'html-loader' } }, //解析在html里面img src直接引入的图片

            ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html",//new 一个这个插件的实例，并传入相关的参数
            favicon: './src/favicon.ico'
        }),
        new ExtractTextPlugin('stylesheets/[name].css'),
        new ExtractTextPlugin('stylesheets/[name].less'),
    ],
}