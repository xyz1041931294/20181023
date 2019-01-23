const path = require('path');
const CWP = require('clean-webpack-plugin');
const HWP = require('html-webpack-plugin');
const MCEP = require('mini-css-extract-plugin');
const OCAWP = require('optimize-css-assets-webpack-plugin');

const obj = {
    mode:'production',
    entry:{
        app:'./app.js'
    },
    output:{
        path:path.resolve(__dirname,'build/js'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MCEP.loader
                    },
                    'css-loader'
                ]
            },
            {
                test:/\.(jpg|png|gif|svg|bmp)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:4096,
                            outputPath:'../images',
                            publicPath:'../images',
                        }
                    }
                ]
            },
            {
                test:/\.html$/,
                use:'html-withimg-loader'
            }
        ]
    },
    plugins:[
        new OCAWP(),
        new CWP(['build']),
        new HWP({
            template:'./index.html',
            filename:'../index.html',
            minify:{
                removeAttributeQuotes:true, 
		        collapseWhitespace:true      
            }
        }),
        new MCEP({
            filename:'../css/[name].css'
        })
    ]

}
module.exports = obj;
