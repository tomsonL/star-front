//app.js
const config = require('config.js');
const ald = require('./utils/ald-stat.js')
const request_host = config.REQUEST_HOST;

App({
  //视频广告
  videoAd: null,
  onLaunch: function (option) {
    this.videoAd = qq.createRewardedVideoAd({ adUnitId: '62d55eb03b58c9c51694df802608e1c7' });
    this.videoAd.onError(function (res) {
      console.log('videoAd onError', res)
    })
    this.videoAd.onLoad(function (res) {
      console.log('videoAd onLoad', res)
    })
    this.videoAd.onClose(function (res) {
      console.log('videoAd onClose', res)
      if (res.isEnded == true) {
        qq.getStorage({
          key: "staruserinfo",
          success: function (res1) {
            // 添加获取随机助力值的ajax
            qq.request({
              method: "POST",
              url: request_host + "/ops/task",
              data: {
                task: "video_ad",
                user_id: res1.data.user_id,
                api_token: res1.data.token
              },
              success: function (res2) {
                getCurrentPages()[getCurrentPages().length - 1].setData({
                  // 弹出框
                  showPop: true,
                  popParam: {
                    popType: "reward",
                    popTitle: "获得奖励",
                    getVotes: res2.data.data.votes,
                    btns: [
                      {
                        type: 2,
                        longType: 1,
                        btnFun: 'closePop',
                        text: '去助力',
                        hasIcon: false
                      }
                    ]
                  }
                })
              }
            })
          }
        })
      }
    })

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
        qq.setStorageSync('qqcode', res.code);
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
    userInfo: null,
  }
})
