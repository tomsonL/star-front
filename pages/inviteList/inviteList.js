//inviteList.js
//获取应用实例
const app = getApp();
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
const utils = require('../../utils/util.js');
//星座信息
const horoList = config.HORO;

Page({
    data: {
        inviteList: [],
        invited_count: ""
    },
    onLoad: function () {
        qq.showShareMenu();
        var that = this;
        qq.getStorage({
            key: 'staruserinfo',
            success: function (res1) {
                qq.request({
                    method: "GET",
                    url: request_host + '/fans/invited',
                    data: {
                        user_id: res1.data.user_id,
                        api_token: res1.data.token,
                        fans_id: res1.data.user_id
                    },
                    success: function (res2) {
                        that.setData({
                            inviteList: res2.data.data.invited_list,
                            invited_count: res2.data.data.invited_count
                        })
                    }
                })
            }
        })
    },
    // 邀请方法
    inviteFun: function () {
        qq.shareAppMessage();
    }
})
