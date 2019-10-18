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
        pageNo: 0,
        orderList: [],
        hasMore: true,
        // 提示框相关
        showPop: false,
        popParam: {},
        hasUserInfo: false, //是否有用户信息
        canIUse: qq.canIUse('button.open-type.getUserInfo'),
    },
    onLoad: function () {
        qq.showShareMenu();
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
        return shareObj;
    },
    //获取列表
    getList: function (type) {
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
                    url: config.REQUEST_HOST + "/ops/get_orders",
                    data: {
                        user_id: res.data.user_id,
                        api_token: res.data.token,
                        page: that.data.pageNo
                    },
                    success: function (res1) {
                        var list = res1.data.data.order_list;
                        var hasMore = true;
                        if (list.length < 10) {
                            hasMore = false;
                        }
                        for (var x = 0; x < list.length; x++) {
                            list[x].title = "助力值购买";
                            list[x].createTime = "2019-09-04 20:20";
                        }
                        if (type == 1) {
                            var oldList = that.data.orderList;
                            list = oldList.concat(list);
                        }
                        that.setData({
                            orderList: list,
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
    // 去支付
    goPay: function (e) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        //console.log(e.currentTarget.dataset.prepayid);
        qq.requestPayment({
            package: "prepay_id=" + e.currentTarget.dataset.prepayid,
            bargainor_id: config.BUSSINESSNO,
            success(res) {
                qq.hideLoading();
                that.setData({
                    showPop: true,
                    popParam: {
                        popType: "fail",
                        isSuccess: true,
                        popTitle: "充值结果",
                        popContent: "充值成功"
                    },
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
                that.getList();
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
