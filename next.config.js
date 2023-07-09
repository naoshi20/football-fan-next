const path = require('path')

module.exports = {
  // variableは各sassファイルがコンパイルされる前に各sassファイルに追加されておく必要がある
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
