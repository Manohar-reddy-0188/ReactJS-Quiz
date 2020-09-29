const {
  merge
} = require( 'webpack-merge' );
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const {
  CleanWebpackPlugin
} = require( 'clean-webpack-plugin' );
const OptimizeCssAssetsWebpackPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

module.exports = () => {
  const mode = process.env.NODE_ENV || 'dev';
  const isDev = mode === 'dev';
  const conf = require( `./webpack/webpack.config.${mode}.js` );

  return merge( {
    context: path.resolve( __dirname, 'src' ),
    entry: [ '@babel/polyfill', './index.tsx' ],
    output: {
      filename: isDev ? '[name].bundle.js' : '[name].[hash].js',
      path: path.resolve( __dirname, 'dist' ),
      publicPath: '/',
    },
    resolve: {
      modules: [ path.resolve( __dirname, './' ), 'node_modules' ],
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    },
    optimization: {
      minimizer: isDev ? [] : [
        new TerserWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    devServer: {
      port: process.env.PORT,
      open: true,
      hot: isDev,
      historyApiFallback: isDev,
    },
    plugins: [
      new HTMLWebpackPlugin( {
        template: './index.html',
        minify: {
          collapseWhitespace: !isDev,
        },
      } ),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin( {
        filename: isDev ? '[name].bundle.css' : '[name].[hash].css',
      } ),
    ],
    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          exclude: /node_modules/,
          loader: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
        },
        {
          test: /\.ts(x)?$/,
          exclude: /node_modules/,
          loader: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                reloadAll: true,
              },
            },
            'css-loader' ],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
                reloadAll: true,
              },
            },
            'css-loader',
            'sass-loader' ],
        },
        {
          test: /\.(jpg|gif|png|svg)$/,
          use: [ 'file-loader' ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: [ 'file-loader' ],
        },
      ],
    },
  }, conf );
};
