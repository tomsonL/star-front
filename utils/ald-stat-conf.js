let config = require('../config.js');
exports.app_key = config.ALDKEY; //请在此行填写从阿拉丁后台获取的appkey

// console.log(exports.app_key);

exports.getLocation = false; //默认不获取用户坐标位置
exports.plugin = false;  //您的小程序中是否使用了插件。根据是否启用插件会有不同的接入方式，请参考文档文档。
exports.useOpen = false; //默认不启用，是否启用openid计算，开启后必须上传openid，否则数据不会上报。
