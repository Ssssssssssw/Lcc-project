const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/index2.js",
    output: {
        //  要打包文件名字
        filename: "chu.js",
        //  打包在哪个文件夹
        path: path.resolve(__dirname, './dist'),
        //  打包之前是否清除js文件
        clean: true,
        //  自定义图片名
        assetModuleFilename: "test/[contenthash][ext][query]" 
    },
    mode: "development",
    devtool: "inline-source-map",
    //  插件
    plugins: [
        new HtmlWebpackPlugin({
            //  自定义出口html文件title名字
            title: "这是test",
            filename: "test.html",
            // template: "./index.html",
            inject: "body"
        })
    ],
    devServer: {
        static: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.jpg$/,
                type: "asset/resource"
            },
            {
                test:/\.txt$/,
                type:"asset/source"
            }
        ]
    }
}