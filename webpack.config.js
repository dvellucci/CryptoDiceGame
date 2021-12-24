const webpack = require('webpack')
module.exports = {
   plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
        'process.type': JSON.stringify(process.type),
        'process.version': JSON.stringify(process.version),
      })
    ],
}