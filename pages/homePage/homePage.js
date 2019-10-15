//homepage.js
//获取应用实例
const app = getApp()
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
const utils = require('../../utils/util.js');
//星座信息
const horoList = config.HORO;

Page({
    data: {
        //当前星座index
        currentIndex: 0,
        // 临时index
        temIndex: 0,
        //星座id
        cstl_id: "",
        //当前日期星座id
        curr_cstl_id: "",
        //星座控制
        constellation: [],
        hasMons: [],
        rankData: [],
        showLeft: true,
        showRight: false,
    },
    onLoad: function (option) {
        app.aldstat.sendEvent('星盘');
        if (option.invite_id) {
            qq.setStorageSync('invite_id', option.invite_id);
        }
        //qq.showShareMenu();
        var that = this;
        var cstlId = "";
        var today = new Date().getTime();
        //获取有数据的星座列表
        qq.request({
            method: "GET",
            url: request_host + '/ranks/has_mons',
            data: {},
            success: function (res) {
                //赋值给hasMons
                that.setData({
                    hasMons: res.data.data,
                })
                //判断当前日期星座
                var horoArr = JSON.parse(JSON.stringify(horoList));
                for (var y = 0; y < horoArr.length; y++) {
                    horoArr[y].zh = horoArr[y].zh.replace("座", "月");
                }
                that.setData({
                    currentIndex: that.data.hasMons.length - 1,
                    cstl_id: that.data.hasMons[that.data.hasMons.length - 1].id,
                    curr_cstl_id: that.data.hasMons[that.data.hasMons.length - 1].id,
                    constellation: horoArr
                })
                qq.setStorage({
                    key: "cstl_id",
                    data: that.data.hasMons[that.data.hasMons.length - 1].id
                });
                that.getHoroData('',that.data.hasMons.length - 1);
            }
        });
        that.checkInFun();
    },
    onShow: function () {
        //console.log('onshow');
        //this.getHoroData();
    },
    onShareAppMessage: function (options) {
        var that = this;
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        var shareObj = {
            title: "人生剧本任意变幻，因为“你”，让“他”星运无限……",        // 默认是小程序的名称(可以写slogan等)
            path: '/pages/homePage/homePage',        // 默认是当前页面，必须是以‘/’开头的完整路径
            imageUrl: 'http://image.3ceng.cn/res/share/share_500_400.jpg',
            //imageUrl: 'http://img.mp.itc.cn/upload/20170624/1da4a6bd75dc4f56bae76a702cb4242c_th.jpg',
            success: function (res) {
                // 转发成功之后的回调
                if (res.errMsg == 'shareAppMessage:ok') {
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
            },
            fail: function () {
                // 转发失败之后的回调
                if (res.errMsg == 'shareAppMessage:fail cancel') {
                    // 用户取消转发
                } else if (res.errMsg == 'shareAppMessage:fail') {
                    // 转发失败，其中 detail message 为详细失败信息
                }
            },
            complete: function () {
                // 转发结束之后的回调（转发成不成功都会执行）
            }
        };
        return shareObj;
    },
    //星座榜
    getHoroData: function (cstl, index, type) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        that.setData({
            currentIndex: index,
            showLeft: index <= 0 ? false : true,
            showRight: index >= that.data.hasMons.length - 1 ? false : true,
        })
        if (type == undefined) {
            qq.request({
                method: "GET",
                url: request_host + '/ranks/cstl',
                data: {
                    cstl_mon: cstl ? cstl : ''
                },
                success: function (res) {
                    qq.hideLoading();
                    that.setData({
                        rankData: res.data.data,
                    })
                }
            })
        }

    },
    //滑动控制
    forbidMove: function (e) {

    },
    swipeCtrl: function (e) {
        this.setData({
            temIndex: this.data.currentIndex,
            currentIndex: e.detail.current,
            cstl_id: this.data.hasMons[e.detail.current].id
        })
        this.getHoroData(this.data.hasMons[e.detail.current].id, e.detail.current);
    },
    // 总榜单
    goTotalRank: function () {
        app.aldstat.sendEvent('星座总榜');
        qq.navigateTo({
            url: '../totalList/totalList?cstl_id=' + this.data.cstl_id
        })
    },
    // 分榜单
    goSubList: function (e) {
        app.aldstat.sendEvent('星座分榜', {
            '星座': horoList[e.currentTarget.dataset.index].zh
        });
        qq.navigateTo({
            url: '../subList/subList?cstl_id=' + this.data.cstl_id + '&cstl=' + horoList[e.currentTarget.dataset.index].cstl_id
        })
    },
    // 去其他星月
    toAnotherFun: function (e) {
        var that = this;
        var current = e.currentTarget.dataset.type == 1 ? that.data.currentIndex - 1 : that.data.currentIndex + 1;
        this.setData({
            temIndex: that.data.currentIndex,
            cstl_id: that.data.hasMons[current].id
        })
        this.getHoroData(that.data.hasMons[current].id, current, e.currentTarget.dataset.type);
    },
    // 关闭弹窗
    closePop: function () {
        this.setData({
            showErrorPop: false,
            voteNum: 100,
            idolId: '',
            showVotePop: false,
            showPop: false,
        })
    },
    // 打卡
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
                                    showPop: true,
                                    popParam: {
                                        popType: "reward",
                                        popTitle: "打卡成功",
                                        getVotes: res2.data.data.votes,
                                        rewardTxt: "连续打卡，助力值翻倍！",
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
                                //that.getList();
                            } else {
                                // that.setData({
                                //     showPop: true,
                                //     popParam: {
                                //         popType: "fail",
                                //         popContent: "今天已打卡"
                                //     }
                                // })
                            }
                        } else {
                            that.setData({
                                showPop: true,
                                popParam: {
                                    popType: "fail",
                                    popContent: res2.data.msg
                                }
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
})
