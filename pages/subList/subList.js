//subList.js
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
        hasDate: false,
        // 页码
        pageNo: 0,
        //前三
        firstIdol: {},
        secondIdol: {},
        thirdIdol: {},
        //明星List
        idolList: [],
        //标题内容
        titleInfo: {},
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
        // 投票的明星姓名
        idolName: "",
        // 显示错误提示
        showErrorPop: false,
        errorTxt: "",
        // 投票数量
        voteNum: 1,
        // 提示框相关
        showPrompt: false,
        promptType: 1,
        promptTxt: "aaa",
        isVote: false,
        // 今天是否签到
        todayCheck: false,
        hasUserInfo: true, //是否有用户信息
        canIUse: qq.canIUse('button.open-type.getUserInfo'),
        // 是否是当前月
        isThisMonth: true
    },
    onLoad: function (option) {
        qq.showShareMenu();
        var that = this;
        var nowCstl = qq.getStorageSync("cstl_id");
        this.getMonthInfo(option.cstl);
        this.getList(option);
        this.setData({
            urlParam: option,
            isThisMonth: nowCstl == option.cstl_id ? true : false
        })
        interval = setInterval(function () {
            that.getCountDown();
        }, 1000)
    },
    onShow: function () {
        this.getList(this.data.urlParam);
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
                endTime = end + 60 * 60 * 24;
                break;
            }
        }
        var lastTime = parseInt((endTime - today) / 1000)
        var days = Math.floor(lastTime / 60 / 60 / 24);
        var hours = Math.floor((lastTime - days * 24 * 60 * 60) / 60 / 60);
        var minutes = Math.floor((lastTime - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
        var seconds = Math.floor((lastTime - days * 24 * 60 * 60 - hours * 60 * 60) % 60);
        that.setData({
            countDown: days > 0 ? days + "天 " : utils.formatNumber(hours) + ":" + utils.formatNumber(minutes) + ":" + utils.formatNumber(seconds)
        })
    },
    // 获取列表
    getList: function (option, type) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        // type = 0: 刷新 type = 1: 加载更多
        var that = this;
        qq.request({
            method: "GET",
            url: request_host + '/ranks/stars',
            data: {
                cstl: option.cstl,
                page: that.data.pageNo,
                cstl_mon: option.cstl_id
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
    },
    // 获取当前月的信息
    getMonthInfo: function (cstlId) {
        for (var x = 0; x < horoList.length; x++) {
            if (cstlId === horoList[x].cstl_id) {
                var obj = {
                    monthName: horoList[x].zh,
                    timeLong: horoList[x].start.replace(/\//g, ".") + "-" + horoList[x].end.replace(/\//g, "."),
                    img: horoList[x].img
                };
                this.setData({
                    titleInfo: obj
                })
            }
        }
    },
    // 投票方法
    assistPopFun: function (e) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })

        var that = this;
        var idolId = e ? e.currentTarget.dataset.idolid : this.data.idolId;
        var idolName = e ? e.currentTarget.dataset.idolname : this.data.idolName;
        app.aldstat.sendEvent('助力', { '明星': idolName, '页面': '星座分榜' });

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
                                idolId: idolId,
                                idolName: idolName,
                                showVotePop: true,
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
    // 明星详情
    goIdolDetail: function (e) {
        if (this.data.isThisMonth) {
            qq.navigateTo({
                url: "../idolDetail/idolDetail?star_id=" + e.currentTarget.dataset.idolid
            })
        }
    },
    // 计算方法
    calculateFun: function (e) {
        var that = this;
        var vote = that.data.voteNum;
        e.currentTarget.dataset.type == 1 ? vote-- : vote++;
        vote = vote < 1 ? 1 : vote;
        if (parseInt(e.detail.value) > this.data.fansInfo.votes_left) {
            this.setData({
                showErrorPop: true,
                errorTxt: "您的助力值不足，请先查看",
            })
        } else {
            this.setData({
                showErrorPop: false,
                voteNum: vote
            })
        }
    },
    // 输入方法
    bindInputFun: function (e) {
        var reg = /^[0-9]*$/;
        if (!reg.test(e.detail.value)) {
            this.setData({
                showErrorPop: true,
                voteNum: 1,
                errorTxt: "投票只能是正整数"
            })
            return false;
        }
        if (parseInt(e.detail.value) < 1) {
            this.setData({
                showErrorPop: true,
                voteNum: 1,
                errorTxt: "投票必须大于票"
            })
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
                    if (!res.data || res.data.length == 0) {
                        qq.hideLoading();
                        that.setData({
                            hasUserInfo: false
                        })
                        return false;
                    }
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
                                    voteNum: 1,
                                    idolId: "",
                                    showVotePop: false,
                                    showPrompt: true,
                                    promptType: 1,
                                    promptTxt: "成功为 " + that.data.idolName + " 助力" + that.data.voteNum,
                                    isVote: true,
                                    pageNo: 0
                                })
                                that.getList(that.data.urlParam);
                                app.aldstat.sendEvent('助力成功', { '明星': that.data.idolName, '页面': '星座分榜' });
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
            voteNum: 1,
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
    },
    // 加载更多
    loadMore: function () {
        var pageNo = this.data.pageNo;
        pageNo += 1;
        this.setData({
            pageNo: pageNo
        })
        this.getList(this.data.urlParam, 1);
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
                                    that.getList(that.data.urlParam);
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
            this.setData({
                hasUserInfo: true
            })
        }
    },
})
