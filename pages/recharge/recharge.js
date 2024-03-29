//recharge.js
//获取应用实例
const app = getApp();
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
const utils = require('../../utils/util.js');
//星座信息
const horoList = config.HORO;

Page({
    data: {
        myVoteNum: 0,
        voteTypeList: [
            {
                voteNum: 10000,
                money: 10,
                isChoose: true
            },
            {
                voteNum: 20000,
                money: 20,
                isChoose: false
            },
            {
                voteNum: 50000,
                money: 50,
                isChoose: false
            },
            {
                voteNum: 100000,
                money: 100,
                isChoose: false
            },
            {
                voteNum: 200000,
                money: 200,
                isChoose: false
            },
            {
                voteNum: 500000,
                money: 500,
                isChoose: false
            },
        ],
        inputVoteNum: null,
        payMoney: "10.00",
        // 提示框相关
        showPop: false,
        popParam: {},
        hasUserInfo: false, //是否有用户信息
        canIUse: qq.canIUse('button.open-type.getUserInfo'),
    },
    onLoad: function () {
        qq.showShareMenu({
            withShareTicket: true
        });
        this.getList();
    },
    onShareAppMessage: function (options) {
        var that = this;
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            title: "人生剧本任意变幻，因为“你”，让“他”星运无限……",        // 默认是小程序的名称(可以写slogan等)
            path: '/pages/start/start',
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
                    app.aldstat.sendEvent('转发失败', { 'msg': res.detail.message });
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
                            that.setData({
                                myVoteNum: res1.data.data.votes_left
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
    // 跳转到我的订单
    goMyOrder: function () {
        qq.navigateTo({
            url: "../myOrder/myOrder"
        })
    },
    // 切换类型
    chooseType: function (e) {
        var index = e.currentTarget.dataset.index;
        var typeList = this.data.voteTypeList;
        var voteNum = 0;
        for (var x = 0; x < typeList.length; x++) {
            if (x == index) {
                typeList[x].isChoose = true;
                voteNum = typeList[x].voteNum;
            } else {
                typeList[x].isChoose = false;
            }
        }
        this.setData({
            voteTypeList: typeList,
            inputVoteNum: null,
            payMoney: (voteNum / 1000).toFixed(2)
        })
    },
    //聚焦事件
    focusInput: function () {
        var typeList = this.data.voteTypeList;
        var voteNum = this.data.inputVoteNum;
        for (var x = 0; x < typeList.length; x++) {
            typeList[x].isChoose = false;
        }
        this.setData({
            voteTypeList: typeList,
            inputVoteNum: voteNum,
            payMoney: (voteNum / 1000).toFixed(2)
        })
    },
    // 检查输入
    checkInput: function (e) {
        var reg = /^[0-9]*$/;
        var voteNum = e.detail.value;
        if (!reg.test(voteNum)) {
            this.setData({
                showPop: true,
                popParam: {
                    popType: "fail",
                    popTitle: "提示",
                    popContent: "充值助力值只能是正整数"
                },
                inputVoteNum: 0,
                payMoney: 0.00
            })
            return 0;
        }
        this.setData({
            inputVoteNum: voteNum,
            payMoney: (voteNum / 1000).toFixed(2)
        })
    },
    // 支付方法
    payMoneyFun: function () {
        var that = this;
        var voteNum = 0;
        if (this.data.inputVoteNum != null) {
            if (parseInt(this.data.inputVoteNum) < 100) {
                this.setData({
                    showPop: true,
                    popParam: {
                        popType: "fail",
                        popTitle: "提示",
                        popContent: "充值助力值必须大于100票"
                    },
                    inputVoteNum: 0,
                    payMoney: 0.10
                })
                return false;
            }
            voteNum = this.data.inputVoteNum;
        } else {
            var typeList = this.data.voteTypeList;
            for (var x = 0; x < typeList.length; x++) {
                if (typeList[x].isChoose) {
                    voteNum = typeList[x].voteNum;
                }
            }
        }
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
                    method: 'POST',
                    url: request_host + '/ops/create_order',
                    data: {
                        user_id: res.data.user_id,
                        api_token: res.data.token,
                        total_fee: typeof (that.data.payMoney) == 'number' ? that.data.payMoney.toFixed(2) : that.data.payMoney,
                        good_desc: voteNum + ""
                    },
                    success: function (res2) {
                        qq.requestPayment({
                            package: "prepay_id=" + res2.data.data.prepay_id,
                            bargainor_id: config.BUSSINESSNO,
                            success(res) {
                                that.setData({
                                    showPop: true,
                                    popParam: {
                                        popType: "fail",
                                        isSuccess: true,
                                        popTitle: "充值结果",
                                        popContent: "充值成功"
                                    },
                                    inputVoteNum: null,
                                    payMoney: "10.00",
                                })
                                that.getList();
                            },
                            fail(res) {
                                that.setData({
                                    showPop: true,
                                    popParam: {
                                        popType: "fail",
                                        popTitle: "充值结果",
                                        popContent: "充值失败"
                                    },
                                })
                            }
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
    // 关闭弹窗
    closePop: function () {
        this.setData({
            showPop: false,
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
    }
})
