module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          components: './src/components',
          pages: './src/pages',
          types: './src/types',
          utils: './src/utils',
          assets: './src/assets',
          store: './src/store',
          hooks: './src/hooks',
          config: './src/config',
          navigations: './src/navigations',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ]
  ]
};
