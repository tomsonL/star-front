//app.js
const config = require('config.js');
const ald = require('./utils/ald-stat.js')
App({
  onLaunch: function (option) {
    // 获取用户信息
    qq.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          qq.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {

        }
      }
    })
    // 登录
    qq.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        qq.setStorageSync('qqcode',res.code);
      }
    })

  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      qq.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo;
          typeof cb == "function" && cb(that.globalData.userInfo)
          qq.setStorage({
            key: 'userInfo',
            data: res.userInfo
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null
  }
})
