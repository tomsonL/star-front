//userCenter.js
//获取应用实例
const app = getApp()
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
const utils = require('../../utils/util.js');
//星座信息
const horoList = config.HORO;

Page({
    data: {
        userInfo: "",
        fansInfo: {},
        checkInsList: [
            {
                dayName: "第一天",
                getNum: "X1",
                isCkeck: false,
            },
            {
                dayName: "第二天",
                getNum: "X2",
                isCkeck: false,
            },
            {
                dayName: "第三天",
                getNum: "X3",
                isCkeck: false,
            },
            {
                dayName: "第四天",
                getNum: "X4",
                isCkeck: false,
            },
            {
                dayName: "第五天",
                getNum: "X10",
                isCkeck: false,
            },
            {
                dayName: "第六天",
                getNum: "X12",
                isCkeck: false,
            },
            {
                dayName: "第七天",
                getNum: "X15",
                isCkeck: false,
            },
        ],
        // 提示框相关
        showPrompt: false,
        promptType: 1,
        promptTxt: "",
        popType: 1,
        isVote: false,
        // 今天是否签到
        todayCheck: false,
        hasUserInfo: false, //是否有用户信息
        canIUse: qq.canIUse('button.open-type.getUserInfo'),
        //用户昵称
        nickname: ""
    },
    onLoad: function () {
        this.getList();
        qq.showShareMenu();
    },
    onShow: function () {
        this.getList();
    },
    getList: function () {
        if (!qq.getStorageSync("staruserinfo") || qq.getStorageSync("staruserinfo").length == 0) {
            this.setData({
                hasUserInfo: false
            })
            return false;
        }
        this.setData({
            hasUserInfo: true
        });
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        qq.getStorage({
            key: "userInfo",
            success: function (res) {
                that.setData({
                    userInfo: res.data
                })
            }
        });
        qq.getStorage({
            key: "staruserinfo",
            success: function (res) {
                if (!res.data || res.data.length == 0) {
                    qq.hideLoading();
                    that.setData({
                        hasUserInfo: false
                    })
                    return false;
                }
                qq.request({
                    method: "GET",
                    url: config.REQUEST_HOST + "/fans/info",
                    data: {
                        fans_id: res.data.user_id,
                        api_token: res.data.token
                    },
                    success: function (res1) {
                        if (res1.data.code == 1) {
                            var checkList = that.data.checkInsList;
                            for (var x = 0; x < parseInt(res1.data.data.checkins); x++) {
                                checkList[x].isCkeck = true;
                            }
                            that.setData({
                                fansInfo: res1.data.data,
                                checkInsList: checkList,
                                todayCheck: res1.data.data.checkedin == 1
                            })
                        } else {
                            that.setData({
                                hasUserInfo: false
                            })
                        }
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
    // 签到
    checkInFun: function (e) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        qq.getStorage({
            key: 'staruserinfo',
            success: function (res) {
                if (!res.data || res.data.length == 0) {
                    qq.hideLoading();
                    that.setData({
                        hasUserInfo: false
                    })
                    return false;
                }
                qq.request({
                    method: "POST",
                    url: request_host + "/ops/checkin",
                    data: {
                        api_token: res.data.token,
                        fans_id: res.data.user_id
                    },
                    success: function (res2) {
                        if (res2.data.code == 1) {
                            if (res2.data.data.votes != 0) {
                                that.setData({
                                    showPrompt: true,
                                    promptType: 1,
                                    promptTxt: "成功签到" + res2.data.data.votes,
                                    isVote: true
                                })
                                that.getList();
                                setTimeout(function () {
                                    that.setData({
                                        showPrompt: false,
                                        promptType: 0,
                                        promptTxt: ""
                                    })
                                }, 1000)
                            } else {
                                that.setData({
                                    showPrompt: true,
                                    promptType: 0,
                                    promptTxt: "今天已签到",
                                    isVote: false
                                })
                                that.getList();
                                setTimeout(function () {
                                    that.setData({
                                        showPrompt: false,
                                        promptType: 0,
                                        promptTxt: ""
                                    })
                                }, 1000)
                            }
                        } else {
                            that.setData({
                                showPrompt: true,
                                promptType: 0,
                                promptTxt: res2.data.msg
                            })
                        }
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
    // 关闭弹窗
    closePop: function () {
        this.setData({
            showPrompt: false,
            promptType: 0,
            promptTxt: "",
            isVote: false,
            popType: 1
        })
    },
    callFun: function () {
        qq.makePhoneCall({
            phoneNumber: "17710146650"
        })
    },
    goVoteDetail: function () {
        qq.navigateTo({
            url: "../assistValue/assistValue?voteNum=" + this.data.fansInfo.votes_left,
        })
    },
    goPay: function () {
        qq.navigateTo({
            url: "../recharge/recharge"
        })
    },
    goInvite: function () {
        qq.navigateTo({
            url: "../inviteList/inviteList"
        })
    },
    //显示修改昵称弹框
    editPop: function () {
        var that = this;
        that.setData({
            popType: 2,
            showPrompt: true,
            nickname: that.data.fansInfo.fans_name
        })
    },
    //确认修改昵称
    confirmFun: function () {
        var that = this;
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
                    url: request_host + '/fans/update',
                    data: {
                        user_id: res1.data.user_id,
                        api_token: res1.data.token,
                        name: that.data.nickname
                    },
                    success: function (res2) {
                        if (res2.data.code == 1) {
                            that.setData({
                                showPrompt: true,
                                promptType: 1,
                                popType: 1,
                                promptTxt: "成功修改昵称"
                            })
                            that.getList();
                            setTimeout(function () {
                                that.setData({
                                    showPrompt: false,
                                    promptType: 0,
                                    popType: 1,
                                    promptTxt: ""
                                })
                            }, 1000)
                        } else {
                            that.setData({
                                showPrompt: true,
                                promptType: 1,
                                popType: 1,
                                promptTxt: res2.data.msg
                            })
                        }

                    },
                    fail: function () {
                        that.setData({
                            showPrompt: true,
                            promptType: 1,
                            popType: 1,
                            promptTxt: "网络错误，请重试"
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
    //检查输入
    bindInputFun: function (e) {
        this.setData({
            nickname: e.detail.value
        })
    },
    //授权成功保存信息  
    bindGetUserInfo: function (e) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        app.aldstat.sendEvent('授权');
        if (e.detail.userInfo) {
            var that = this;
            // 存储用户登录信息
            qq.setStorage({
                key: 'userInfo',
                data: e.detail.userInfo,
                success: function () {
                    // 登录
                    qq.login({
                        success: res => {
                            // 发送 res.code 到后台换取 openId, sessionKey, unionId
                            qq.setStorageSync('qqcode', res.code);
                            qq.request({
                                method: "POST",
                                url: config.REQUEST_HOST + "/user/post_qqcode",
                                data: {
                                    qqcode: res.code
                                },
                                success: function (res1) {
                                    if (!res1.data || res1.data.length == 0) {
                                        qq.hideLoading();
                                        that.setData({
                                            hasUserInfo: false
                                        })
                                        return false;
                                    }
                                    var req = res1.data.data;
                                    qq.setStorage({
                                        key: "staruserinfo",
                                        data: req
                                    })
                                    if (req.need_create == 1) {
                                        var param = {
                                            name: e.detail.userInfo.nickName,
                                            gender: e.detail.userInfo.gender + "",
                                            avatar: e.detail.userInfo.avatarUrl,
                                            city: e.detail.userInfo.city,
                                            province: e.detail.userInfo.province,
                                            country: e.detail.userInfo.country,
                                            user_id: req.user_id,
                                            api_token: req.token,
                                            invited_by: qq.getStorageSync('invite_id')
                                        };
                                        qq.request({
                                            method: "POST",
                                            url: config.REQUEST_HOST + "/user/create",
                                            data: param,
                                            success: function (res) {
                                                qq.hideLoading();
                                            }
                                        })
                                    } else {
                                        qq.hideLoading();
                                    }
                                    that.getList();
                                }
                            })
                        }
                    })

                }
            })
            that.setData({
                hasUserInfo: true
            })
        } else {
            qq.hideLoading();
        }
    },
})
