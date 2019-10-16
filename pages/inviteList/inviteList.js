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
        showPop: false,
        popParam: {},
        // 是否是点击领取后的分享
        isGetShare: false,
        shareMsg1:'',
        shareMsg2:'',
    },
    onLoad: function () {
        var pages = getCurrentPages()
        if (pages.length >= 2) {
            var prevpage = pages[pages.length - 2]
            var s = prevpage.route.split('/');
            var prevpage_route = s.pop();
        }
        app.aldstat.sendEvent('去邀请', {
            '来源': prevpage_route
        });
        qq.showShareMenu();
        this.getList();
    },
    onShareAppMessage: function (options) {
        var that = this;
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            title: that.data.shareMsg1,        // 默认是小程序的名称(可以写slogan等)
            shareTemplateId: "EE558DDCEFB407FD811CC6C06181D6AF",
            shareTemplateData: {
                "txt1": that.data.shareMsg2,
                "txt2": "为爱豆助力，领现金红包！"
            },
            path: '/pages/homePage/homePage',        // 默认是当前页面，必须是以‘/’开头的完整路径
            imageUrl: 'http://image.3ceng.cn/res/share/share_500_400.jpg',
            success: function (res) {
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
                    app.aldstat.sendEvent('转发成功');
                    // 来自页面内的按钮的转发
                    if (options.from == 'button' && that.data.isGetShare) {
                        qq.getStorage({
                            key: "staruserinfo",
                            success: function (res1) {
                                // 此处可以修改 shareObj 中的内容
                                shareObj.path = '/pages/homePage/homePage?invite_id=' + res1.data.user_id;
                                // 添加获取随机助力值的ajax
                                qq.request({
                                    method: "POST",
                                    url: request_host + "/ops/task",
                                    data: {
                                        task: "share",
                                        user_id: res1.data.user_id,
                                        api_token: res1.data.token
                                    },
                                    success: function (res2) {
                                        that.setData({
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
                }
            },
            fail: function (res) {
                // 转发失败之后的回调
                if (res.errMsg == 'shareAppMessage:fail cancel') {
                    app.aldstat.sendEvent('取消转发');
                    // 用户取消转发
                } else if (res.errMsg == 'shareAppMessage:fail') {
                    app.aldstat.sendEvent('转发失败', { 'msg': res.detail.message });
                    // 转发失败，其中 detail message 为详细失败信息
                }
            },
            complete: function (res) {
                // 转发结束之后的回调（转发成不成功都会执行）
            }
        };
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
        this.setData({
            isGetShare: false
        })
    },
    onShow: function () {
        this.getList(this.data.urlParam, 0);
        var that=this;
        qq.getStorage({
            key: 'staruserinfo',
            success: function (res) {
                qq.request({
                    method: "GET",
                    url: request_host + "/user/get_share_msg",
                    data: {
                        user_id: res.data.user_id
                    },
                    success: function (res2) {

                        that.data.shareMsg1 = res2.data.data.msg1;
                        that.data.shareMsg2 = res2.data.data.msg2;
                    }
                })
            }
        })
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
                                isGetShare: true,
                                showPop: true,
                                popParam: {
                                    popType: "reward",
                                    popTitle: "邀请奖励",
                                    getVotes: res2.data.data.votes,
                                    rewardTxt: "邀请奖励无上限，冲鸭～",
                                    btns: [
                                        {
                                            type: 1,
                                            longType: 0,
                                            btnFun: 'closePop',
                                            text: '去助力',
                                            hasIcon: false
                                        },
                                        {
                                            type: 2,
                                            longType: 0,
                                            btnFun: 'shareFun',
                                            text: '增加星力！',
                                            hasIcon: true,
                                            isShare: true
                                        },
                                    ]
                                }
                            })
                            that.getList();
                        } else {
                            that.setData({
                                showPop: true,
                                popParam: {
                                    popType: "fail",
                                    popContent: res2.data.msg
                                }
                            })
                        }
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
    // 手动分享方法
    shareFun: function () {
        app.aldstat.sendEvent('邀请');
        qq.showShareMenu();
    },
    // 关闭弹窗
    closePop: function () {
        this.setData({
            showVotePop: false,
            showPop: false,
        })
    },
})
