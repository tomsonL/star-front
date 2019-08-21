//assistValue.js
//获取应用实例
const app = getApp();
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
const utils = require('../../utils/util.js');
//星座信息
const horoList = config.HORO;

Page({
    data: {
        voteList: [],
        voteNum: "",
        page: 0
    },
    onLoad: function (option) {
        var that = this;

        qq.getStorage({
            key: 'staruserinfo',
            success: function (res1) {
                qq.request({
                    method: "GET",
                    url: request_host + '/fans/income_flow',
                    data: {
                        user_id: res1.data.user_id,
                        api_token: res1.data.token,
                        fans_id: res1.data.user_id,
                        page: that.data.page
                    },
                    success: function (res2) {
                        var list = res2.data.data.income_list;
                        for (var x = 0; x < list.length; x++) {
                            list[x].getType = that.formatType(list[x].income_from);
                            list[x].getTime = utils.formatTime(new Date(list[x].income_time*1000));
                        }
                        that.setData({
                            voteNum: option.voteNum,
                            voteList: list
                        })
                    }
                })
            }
        })
    },
    // checkin:签到 / vad:视频广告 / invite:邀请好友 / charge:充值 / init / 初始赠送
    formatType: function (type) {
        switch (type) {
            case "checkin":
                return "签到";

            case "vad":
                return "视频广告";

            case "invite":
                return "邀请好友";

            case "charge":
                return "充值";

            case "init":
                return "初始赠送";
        }
    }
})
