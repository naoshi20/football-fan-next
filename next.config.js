const path = require('path')

module.exports = {
  // variableは各scssファイルがコンパイルされる前に各sassファイルに追加されておく必要がある
  // prependDataの値が各scssファイルの先頭に追加されるイメージ
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    prependData: `@import "/styles/_variables.scss";`
  },
  images: {
    remotePatterns: [
      {
        hostname: 'resources.premierleague.com'
      }
    ]
  }
}
