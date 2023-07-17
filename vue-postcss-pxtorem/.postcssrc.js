// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      "browsers": [
        "defaults",
        "not ie < 8",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ]
    },
    "postcss-pxtorem": {
      "rootValue": 32,
      "propList": ["*"],
      "exclude":(e)=>{
        if (/src(\\|\/)components(\\|\/)Home/.test(e)){

          return false
        }
        return true
      }
    }

  }
}
