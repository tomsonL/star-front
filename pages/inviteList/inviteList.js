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
        invited_count: "",
        // 提示框相关
        showPrompt: false,
        promptType: 1,
        promptTxt: "",
        isVote: false,
    },
    onLoad: function () {

        var pages = getCurrentPages()
            if (pages.length >= 2) {
                var prevpage = pages[pages.length - 2]
                var s = prevpage.route.split('/');
                var prevpage_route = s.pop();
        }
        app.aldstat.sendEvent('去邀请',{
            '来源': prevpage_route
        });
        qq.showShareMenu();
        this.getList();
    },
    onShareAppMessage: function (options) {
        var that = this;
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            title: "人生剧本任意变幻，因为“你”，让“他”星运无限……",        // 默认是小程序的名称(可以写slogan等)
            path: '/pages/homePage/homePage',        // 默认是当前页面，必须是以‘/’开头的完整路径
            imageUrl: 'http://image.3ceng.cn/res/share/share_500_400.jpg',
            success: function (res) {
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
                    app.aldstat.sendEvent('转发成功');
                }
            },
            fail: function (res) {
                // 转发失败之后的回调
                if (res.errMsg == 'shareAppMessage:fail cancel') {
                    app.aldstat.sendEvent('取消转发');
                    // 用户取消转发
                } else if (res.errMsg == 'shareAppMessage:fail') {
                    app.aldstat.sendEvent('转发失败',{'msg':res.detail.message});
                    // 转发失败，其中 detail message 为详细失败信息
                }
            },
            complete: function (res) {
                // 转发结束之后的回调（转发成不成功都会执行）
            }
        };
        // 来自页面内的按钮的转发
        if (options.from == 'button') {
            qq.getStorage({
                key: "staruserinfo",
                success: function (res) {
                    // 此处可以修改 shareObj 中的内容
                    shareObj.path = '/pages/homePage/homePage?invite_id=' + res.data.user_id;
                }
            })
        }
        return shareObj;
    },
    //获取列表
    getList: function () {
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
    // 邀请方法
    inviteFun: function () {
        app.aldstat.sendEvent('邀请');
        qq.showShareMenu();
    },
    // 领取方法
    receiveFun: function (e) {
        var that = this;
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        qq.getStorage({
            key: "staruserinfo",
            success: function (res1) {
                if (!res1.data || res1.data.length == 0) {
                    qq.hideLoading();
                    that.setData({
                        hasUserInfo: false
                    })
                    return false;
                }
                qq.request({
                    method: "POST",
                    url: request_host + '/ops/task',
                    data: {
                        user_id: res1.data.user_id,
                        api_token: res1.data.token,
                        task: "invite",
                        invite_fans_id: e.currentTarget.dataset.invitedid
                    },
                    success: function (res2) {
                        qq.hideLoading();
                        if (res2.data.code == 1) {
                            that.setData({
                                showPrompt: true,
                                promptType: 1,
                                promptTxt: "成功领取助力" + res2.data.data.votes,
                            });
                            that.getList();
                        } else {
                            that.setData({
                                showPrompt: true,
                                promptType: 0,
                                promptTxt: res2.data.msg
                            });
                        }
                        setTimeout(function () {
                            that.setData({
                                showPrompt: false,
                                promptType: 0,
                                promptTxt: "",
                            })
                        }, 1000)
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
    }
})
