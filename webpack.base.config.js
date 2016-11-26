module.exports = {
  output: {
    path: '/public',
    publicPath: '/',
    filename: '[name].js',
    chinkFilename: '[chunkhash].js'
  },
  module: {
    preLoaders: [{
      test: /\.ts$/,
      include: [
        '/src/'
      ],
      loader: 'jshint' // TODO switch TO ESlint
    }],
    loaders: [{
      test: /\.ts(x?)$/,
      exclude: [ '/node_modules/' ],
      loaders: [
        'script',
        'babel?presets[]=es2015&presets[]=react',
        'babel-loader?presets[]=es2015&presets[]=react',
        'ts-loader'
      ]
    }, {
      test: /\.(styl|css)$/,
      loaders: [
        'style',
        'css',
        'autoprefixer',
        'stylus'
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url?name=[name]-[hash:6].[ext]&limit=8192&publicPath=/&outputPath=/build'
    }, {
      test: /\.pug$/,
      exclude: /node_modules/,
      loaders: [
        // 'ngtemplate',
        'pug-html'
      ],
    }, {
      test: /\.ico$/,
      loader: 'file?name=[name].[ext]&publicPath=/&outputPath=/build'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx', '.pug', '.css', '.styl']
  }
};
