//idolDetail.js
//获取应用实例
const app = getApp()
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
const utils = require('../../utils/util.js');
//星座信息
const horoList = config.HORO;

Page({
    data: {
        // 路由传值
        urlParam: {},
        idolInfo: {},
        lastTimer: new Date().getHours() + ":00:00",
        page: 0,
        timeKing: {},
        totalKing: {},
        todayKing: {},
        fansList: [],
        self: {},
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
        // fans
        fansInfo: {},
        // 显示投票窗口
        showVotePop: false,
        errorTxt: "",
        // 投票的明星id
        idolId: "",
        // 显示错误提示
        showErrorPop: false,
        // 投票数量
        voteNum: 0,
        // 提示框相关
        showPrompt: false,
        promptType: 1,
        promptTxt: "aaa",
        isVote: false,
        // 今天是否签到
        todayCheck: false
    },
    onLoad: function (option) {
        qq.showShareMenu();
        this.setData({
            urlParam: option
        })
        this.getList(option)
    },
    getList: function (option) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        qq.getStorage({
            key: "staruserinfo",
            success: function (res1) {
                qq.request({
                    method: "GET",
                    url: request_host + "/star/info",
                    data: {
                        star_id: option.star_id,
                        user_id: res1.data.user_id,
                        api_token: res1.data.token
                    },
                    success: function (res2) {
                        var idol = res2.data.data;
                        for (var y = 0; y < horoList.length; y++) {
                            if (idol.star_cstl === horoList[y].cstl_id) {
                                idol.bigImg = horoList[y].bigImg;
                            }
                        }
                        that.setData({
                            idolInfo: res2.data.data
                        })
                        qq.hideLoading();
                    }
                })
                qq.request({
                    method: "GET",
                    url: request_host + "/ranks/fans",
                    data: {
                        star_id: option.star_id,
                        page: that.data.page,
                        user_id: res1.data.user_id,
                        api_token: res1.data.token
                    },
                    success: function (res3) {
                        if (res3.data.data) {
                            var list = res3.data.data.rank;
                            var self = res3.data.data.current;
                            if (list[0]) {
                                list[0].topThree = true;
                                list[0].topIcon = "../../images/icon_firstFans.png";
                            }
                            if (list[1]) {
                                list[1].topThree = true;
                                list[1].topIcon = "../../images/icon_secondFans.png";
                            }
                            if (list[2]) {
                                list[2].topThree = true;
                                list[2].topIcon = "../../images/icon_thirdFans.png";
                            }

                            switch (self.current_no) {
                                case 1:
                                    self.topThree = true;
                                    self.topIcon = "../../images/icon_firstFans.png";
                                    break;
                                case 2:
                                    self.topThree = true;
                                    self.topIcon = "../../images/icon_secondFans.png";
                                    break;
                                case 3:
                                    self.topThree = true;
                                    self.topIcon = "../../images/icon_thirdFans.png";
                                    break;
                                default:
                                    break;
                            }
                            that.setData({
                                fansList: list,
                                self: self
                            })
                            qq.hideLoading();
                        }
                    }
                })
                qq.request({
                    method: "GET",
                    url: request_host + "/ranks/fans_topers",
                    data: {
                        star_id: option.star_id,
                        page: that.data.page,
                        user_id: res1.data.user_id,
                        api_token: res1.data.token
                    },
                    success: function (res4) {
                        that.setData({
                            timeKing: res4.data.data.flasher,
                            totalKing: res4.data.data.toper,
                            todayKing: res4.data.data.toper_today,
                        })
                    }
                })
            }
        })
    },
    // 投票方法
    assistPopFun: function (e) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        var idolId = this.data.urlParam.star_id;
        qq.getStorage({
            key: "staruserinfo",
            success: function (res) {
                qq.request({
                    method: "GET",
                    url: request_host + "/fans/info",
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
                            idolId: idolId,
                            showVotePop: true,
                            checkInsList: checkList,
                            todayCheck: res1.data.data.checkedin == 1
                        })
                        qq.hideLoading();
                    }
                })
            }
        })
    },
    // 计算方法
    calculateFun: function (e) {
        var that = this;
        var vote = that.data.voteNum;
        e.currentTarget.dataset.type == 1 ? vote-- : vote++;
        that.setData({
            voteNum: vote
        })
    },
    // 输入方法
    bindInputFun: function (e) {
        var reg = /^[0-9]*$/;
        if(reg.test(e.detail.value)){
            this.setData({
                showErrorPop: false,
                voteNum: 0,
                errorTxt: "投票只能是正整数"
            })
            return false;
        }
        if (parseInt(e.detail.value) > this.data.fansInfo.votes_left) {
            this.setData({
                showErrorPop: true,
                errorTxt: "您的助力值不足，请先查看"
            })
        } else {
            this.setData({
                showErrorPop: false,
                voteNum: parseInt(e.detail.value)
            })
        }
    },
    // 投票方法
    assistBtn: function () {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        if (!that.data.showErrorPop) {
            qq.getStorage({
                key: "staruserinfo",
                success: function (res) {
                    qq.request({
                        method: "POST",
                        url: request_host + "/ops/vote",
                        data: {
                            fans_id: res.data.user_id,
                            api_token: res.data.token,
                            user_id: res.data.user_id,
                            star_id: that.data.idolId,
                            votes: that.data.voteNum
                        },
                        success: function (res1) {
                            if (res1.data.code == 1) {
                                that.setData({
                                    showErrorPop: false,
                                    voteNum: 0,
                                    idolId: "",
                                    showVotePop: false,
                                    showPrompt: true,
                                    promptType: 1,
                                    promptTxt: "成功助力" + that.data.voteNum,
                                    isVote: true
                                })
                                that.getList(that.data.urlParam);
                                setTimeout(function () {
                                    that.setData({
                                        showPrompt: false,
                                        promptType: 0,
                                        promptTxt: "",
                                        isVote: false
                                    })
                                }, 1000)
                            } else {
                                that.setData({
                                    showPrompt: true,
                                    promptType: 0,
                                    promptTxt: res1.data.msg,
                                    isVote: false
                                })
                            }
                            qq.hideLoading();
                        }
                    })
                }
            })
        }
    },
    // 关闭弹窗
    closePop: function () {
        this.setData({
            showErrorPop: false,
            voteNum: 0,
            idolId: "",
            showVotePop: false,
            showPrompt: false,
            promptType: 0,
            promptTxt: "",
            isVote: false
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
                                that.assistPopFun();
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
                                that.assistPopFun();
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
    goInvite: function () {
        qq.navigateTo({
            url: "../inviteList/inviteList"
        })
    }
})
