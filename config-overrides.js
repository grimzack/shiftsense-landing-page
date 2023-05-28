 
const webpack = require('webpack'); 
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, {
            /*
            "path": false, 
            "os": false,
            "stream": false, 
            "crypto": false,
            "zlib": false,
            "http":false,
            "https":false,
            "_stream_transform": false,
            "fs":false,
            "child_process":false,
            "tls":false,
            "querystring": false,
            "util": false,
            "assert": false*/

            
      "path": require.resolve("path-browserify"), 
      "os": require.resolve("os-browserify"),
      "stream": require.resolve("stream-browserify"), 
            "crypto": false,
      "zlib": require.resolve("browserify-zlib"),
      "http":require.resolve("stream-http"),
      "https":require.resolve("https-browserify"),
      "_stream_transform": require.resolve("readable-stream"),
      "fs":false,
      "child_process":false,
      "tls":false,
      "querystring": require.resolve("querystring-es3"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "assert": require.resolve("assert/"),
      }) 
   config.resolve.fallback = fallback; 
   config.resolve.preferRelative = true;
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
    	process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; }