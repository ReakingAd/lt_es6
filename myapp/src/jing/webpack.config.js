var webpack = require('webpack');
var Path = require('path');
var _bundlejsPath = Path.join(__dirname,'../../public/javascripts/demo/jing');
// var _indexPath = Path.join(__dirname,'../../views/demo/jing');

module.exports = {
    entry:['webpack/hot/dev-server',__dirname + '/app/main.js'],
    output:{
        // path:__dirname + '/build',
        path:_bundlejsPath,
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                loader:'babel-loader'
            }
        ]
    },
    // devServer:{
    //     // contentBase:'./build',
    //     contentBase:_indexPath,
    //     port:9999,
    //     historyApiFallback:true
    // },
    plugins: [
        new webpack.HotModuleReplacementPlugin()//热模块替换插件
    ]
}