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
        isVote: false,
        // 今天是否签到
        todayCheck: false,
        hasUserInfo: false, //是否有用户信息
        canIUse: qq.canIUse('button.open-type.getUserInfo'),
    },
    onLoad: function () {
        this.getList();
        qq.showShareMenu();
    },
    onShow: function(){
        this.getList();
    },
    getList: function () {
        if(!qq.getStorageSync("staruserinfo")){
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
                qq.request({
                    method: "GET",
                    url: config.REQUEST_HOST + "/fans/info",
                    data: {
                        fans_id: res.data.user_id,
                        api_token: res.data.token
                    },
                    success: function (res1) {
                        var checkList = that.data.checkInsList;
                        for (var x = 0; x < parseInt(res1.data.data.checkins); x++) {
                            checkList[x].isCkeck = true;
                        }
                        that.setData({
                            fansInfo: res1.data.data,
                            checkInsList: checkList,
                            todayCheck: res1.data.data.checkedin == 1
                        })
                        qq.hideLoading();
                    }
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
            }
        })
    },
    // 关闭弹窗
    closePop: function () {
        this.setData({
            showPrompt: false,
            promptType: 0,
            promptTxt: "",
            isVote: false
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
    goInvite: function () {
        qq.navigateTo({
            url: "../inviteList/inviteList"
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
                    qq.request({
                        method: "POST",
                        url: config.REQUEST_HOST + "/user/post_qqcode",
                        data: {
                            qqcode: qq.getStorageSync('qqcode')
                        },
                        success: function (res1) {
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
            that.setData({
                hasUserInfo: true
            })
        }else{
            qq.hideLoading();
        }
    },
})
