//totalList.js
//获取应用实例
const app = getApp();
const utils = require('../../utils/util.js');
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
//星座信息
const horoList = config.HORO;
// interval计时器
var interval = "";
Page({
    data: {
        // 倒计时
        countDown: "",
        // 路由传值
        urlParam: {},
        // 是否有数据
        hasDate: false,
        // 页码
        pageNo: 0,
        //前三
        firstIdol: {},
        secondIdol: {},
        thirdIdol: {},
        //明星List
        idolList: [],
        titleInfo: {
            monthName: "",
            timeLong: ""
        },
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
        // 投票的明星id
        idolId: "",
        // 显示错误提示
        showErrorPop: false,
        // 投票数量
        voteNum: 0,
        // 提示框相关
        showPrompt: false,
        promptType: 1,
        promptTxt: "",
        isVote: false,
        // 今天是否签到
        todayCheck: false
    },
    onLoad: function (option) {
        qq.showShareMenu();
        var that = this;
        this.getMonthInfo(option.cstl_id);
        this.getList(option, 0);
        this.setData({
            urlParam: option
        })
        interval = setInterval(function () {
            that.getCountDown();
        }, 1000)
    },
    // 获取倒计时
    getCountDown: function () {
        var that = this;
        var endTime = "";
        var today = new Date().getTime();
        //判断当前日期星座
        for (var x = 0; x < horoList.length; x++) {
            var start = new Date(new Date().getFullYear() + '/' + horoList[x].start).getTime();
            var end = new Date(new Date().getFullYear() + '/' + horoList[x + 1].start).getTime();
            if (today > start && today < end) {
                endTime = end;
                break;
            }
        }
        var lastTime = parseInt((endTime - today) / 1000)
        var days = Math.floor(lastTime / 60 / 60 / 24);
        var hours = Math.floor((lastTime - days * 24 * 60 * 60) / 60 / 60);
        var minutes = Math.floor((lastTime - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
        var seconds = Math.floor((lastTime - days * 24 * 60 * 60 - hours * 60 * 60) % 60);
        that.setData({
            countDown: days + "天 " + utils.formatNumber(hours) + ":" + utils.formatNumber(minutes) + ":" + utils.formatNumber(seconds)
        })
    },
    // 获取列表接口
    getList: function (option, type) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        // type = 0: 刷新 type = 1: 加载更多
        var that = this;
        qq.getStorage({
            key: "staruserinfo",
            success: function (res1) {
                qq.request({
                    method: "GET",
                    url: request_host + '/ranks/stars',
                    data: {
                        cstl: "all",
                        page: that.data.pageNo,
                        cstl_mon: option.cstl_id,
                        api_token: res1.data.token,
                        user_id: res1.data.user_id
                    },
                    success: function (res) {
                        if (res.data.code == 1) {
                            var list = res.data.data;
                            if (list.length == 0) {
                                return false;
                            }
                            for (var x = 0; x < list.length; x++) {
                                for (var y = 0; y < horoList.length; y++) {
                                    if (list[x].star_cstl === horoList[y].zh) {
                                        list[x].smallImg = horoList[y].smallImg;
                                    }
                                }
                            }
                            if (type == 1) {
                                var oldList = that.data.idolList;
                                list = oldList.concat(list);
                                that.setData({
                                    idolList: list
                                })
                            } else {
                                var first = list[0];
                                var second = list[1];
                                var third = list[2];
                                list.splice(0, 3);
                                that.setData({
                                    firstIdol: first,
                                    secondIdol: second,
                                    thirdIdol: third,
                                    idolList: list,
                                    hasDate: true
                                })
                            }
                        }
                        qq.hideLoading();
                    }
                })
            }
        })
    },
    // 获取当前月的信息
    getMonthInfo: function (cstlId) {
        for (var x = 0; x < horoList.length; x++) {
            if (cstlId === horoList[x].cstl_id) {
                var obj = {
                    monthName: horoList[x].zh.replace(/座/, "月"),
                    timeLong: horoList[x].start.replace(/\//g, "月") + "日---" + horoList[x].end.replace(/\//g, "月") + "日"
                };
                this.setData({
                    titleInfo: obj
                })
            }
        }
    },
    // 投票方法
    assistPopFun: function (e) {
        var that = this;
        var idolId = e ? e.currentTarget.dataset.idolid : this.data.idolId;
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
                    }
                })
            }
        })
    },
    // 明星详情
    goIdolDetail: function (e) {
        qq.navigateTo({
            url: "../idolDetail/idolDetail?star_id=" + e.currentTarget.dataset.idolid
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
        if (parseInt(e.detail.value) > this.data.fansInfo.votes_left) {
            this.setData({
                showErrorPop: true
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
                                that.getList(that.data.urlParam, 0);
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
            promptTxt: ""
        })
    },
    // 签到
    checkInFun: function (e) {
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
                                promptTxt: res1.data.msg
                            })
                        }
                    }
                })
            }
        })
    },
    goInvite: function () {
        qq.navigateTo({
            url: "../inviteList/inviteList"
        })
    },
    // 加载更多
    loadMore: function () {
        var pageNo = this.data.pageNo;
        pageNo += 1;
        this.setData({
            pageNo: pageNo
        })
        this.getList(this.data.urlParam, 1);
    }
})
