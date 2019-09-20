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
        pageNo: 0
    },
    onLoad: function (option) {
        this.getList();
        this.setData({
            voteNum: option.voteNum
        })
    },
    getList: function (type) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        qq.getStorage({
            key: 'staruserinfo',
            success: function (res1) {
                if (!res1.data || res1.data.length == 0) {
                    qq.hideLoading();
                    that.setData({
                        hasUserInfo: false
                    })
                    return false;
                }
                qq.request({
                    method: "GET",
                    url: request_host + '/fans/income_flow',
                    data: {
                        user_id: res1.data.user_id,
                        api_token: res1.data.token,
                        fans_id: res1.data.user_id,
                        page: that.data.pageNo
                    },
                    success: function (res2) {
                        var list = res2.data.data.income_list;
                        for (var x = 0; x < list.length; x++) {
                            list[x].getType = that.formatType(list[x].income_from);
                            list[x].getTime = utils.formatTime(new Date(list[x].income_time * 1000));
                        }
                        var hasMore = true;
                        if (list.length < 10) {
                            hasMore = false;
                        }
                        if (type == 1) {
                            var oldList = that.data.voteList;
                            list = oldList.concat(list);
                        }
                        that.setData({
                            voteList: list,
                            hasMore: hasMore
                        })
                        qq.hideLoading();
                    }
                })
            },
            //没有获取到用户权限
            fail: function () {
                qq.hideLoading();
                that.setData({
                    hasUserInfo: false
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

            case "return":
                return "助力获赠";
            
            case "gift":
                return "助力获赠";    
            
            case "share":
                return "分享获赠";   
        }
    },
    // 加载更多
    loadMore: function () {
        if (this.data.hasMore) {
            var pageNo = this.data.pageNo;
            pageNo += 1;
            this.setData({
                pageNo: pageNo
            })
            this.getList(1);
        }
    },
})
