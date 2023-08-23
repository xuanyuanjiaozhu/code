module.exports = {
    "plugins": {
        "postcss-pxtorem": {
            "rootValue": 32,
            "propList": ["*"],
            // minPixelValue: 12,
            // unitPrecision: 2, // 保留rem小数点
            selectorBlackList: ['ig']
        },
    }
}
