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
        lastTimer: "",
        pageNo: 0,
        timeKing: {},
        totalKing: {},
        todayKing: {},
        fansList: [],
        // 是否有更多
        hasMore: true,
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
        voteNum: 100,
        // 提示框相关
        showPop: false,
        popParam: {},
        // 今天是否签到
        todayCheck: false,
        hasUserInfo: false, //是否有用户信息
        canIUse: qq.canIUse('button.open-type.getUserInfo'),
    },
    onLoad: function (option) {
        qq.showShareMenu();
        this.setData({
            urlParam: option
        })
        this.getList(option)
    },
    onShow: function () {
        this.setData({
            lastTimer: new Date().getHours() + ":00:00"
        })
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
                    // 来自页面内的按钮的转发
                    if (options.from == 'button') {
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
    getList: function (option, type) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        });
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
                that.setData({
                    hasUserInfo: true
                });
                qq.request({
                    method: "GET",
                    url: request_host + "/star/info",
                    data: {
                        star_id: option.star_id,
                        user_id: res1.data.user_id,
                        api_token: res1.data.token
                    },
                    success: function (res2) {
                        var idol = JSON.parse(JSON.stringify(res2.data.data));
                        for (var y = 0; y < horoList.length; y++) {
                            if (idol.star_cstl === horoList[y].cstl_id) {
                                idol.bigImg = horoList[y].bigImg;
                                idol.horoName = horoList[y].zh;
                                idol.bgImg = horoList[y].bg;
                                idol.isUp = parseInt(idol.up) >= 0;
                                idol.upNum = Math.abs(parseInt(idol.up));
                                idol.cstl_isUp = parseInt(idol.cstl_up) >= 0;
                                idol.cstl_upNum = Math.abs(parseInt(idol.cstl_up));
                            }
                        }
                        that.setData({
                            idolInfo: idol
                        })
                        qq.setNavigationBarTitle({
                            title: res2.data.data.star_name
                        });
                        qq.hideLoading();
                    }
                })
                qq.request({
                    method: "GET",
                    url: request_host + "/ranks/fans",
                    data: {
                        star_id: option.star_id,
                        page: that.data.pageNo,
                        user_id: res1.data.user_id,
                        api_token: res1.data.token
                    },
                    success: function (res3) {
                        if (res3.data.data) {
                            var list = res3.data.data.rank;
                            var hasMore = true;
                            if (list.length < 10) {
                                hasMore = false;
                            }
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
                            if (type == 1) {
                                var oldList = that.data.fansList;
                                list = oldList.concat(list);
                            }
                            that.setData({
                                fansList: list,
                                self: self,
                                lastTimer: new Date().getHours() + ":00:00",
                                hasMore: hasMore
                            })
                            qq.hideLoading();
                            app.aldstat.sendEvent('明星详情', { '明星': that.data.idolInfo.star_name })
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
            },
            fail: function () {
                qq.hideLoading();
                return false;
            }
        })
    },
    // 抢点王规则
    showRule: function () {
        this.setData({
            showPop: true,
            popParam: {
                popType: 'desc',
                popTitle: '抢点王玩法介绍',
                popContent: '1.每逢整点助力成功者，将成为抢点王。\n 2.当整点时，多名星粉助力成功，当次值最高者，成为抢点王。\n 3.若整点无助力星粉，抢点王坐席暂为空'
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
        app.aldstat.sendEvent('助力', { '明星': that.data.idolInfo.star_name, '页面': '明星详情' });
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
                    url: request_host + "/fans/info",
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
            }
        })
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
                voteNum: 100,
                errorTxt: "投票只能是正整数"
            })
            return false;
        }
        if (parseInt(e.detail.value) < 1) {
            this.setData({
                showErrorPop: true,
                voteNum: 100,
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
        var that = this;
        if (!that.data.showErrorPop) {
            qq.showLoading({
                title: "请稍后",
                mask: true
            })
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
                                    voteNum: 100,
                                    idolId: "",
                                    showVotePop: false,
                                    // 弹出框
                                    showPop: true,
                                    popParam: {
                                        popType: "voteSuccess",
                                        popTitle: "助力成功",
                                        voteNum: that.data.voteNum,
                                        promptTxt: res1.data.data.info,
                                        voteIdolAvatar: that.data.idolInfo.star_avatar,
                                        idolName: that.data.idolInfo.star_name,
                                        idolRank: res1.data.data.rank,
                                        voteImg: res1.data.data.img,
                                        tip: res1.data.data.tip,
                                        btns: [
                                            {
                                                type: 1,
                                                longType: 0,
                                                btnFun: 'shareFun',
                                                text: '赢1万',
                                                hasIcon: true,
                                                isShare: true
                                            },
                                            {
                                                type: 2,
                                                longType: 0,
                                                btnFun: 'voteFun',
                                                text: '继续助力' + that.data.voteNum,
                                                hasIcon: false
                                            },
                                        ]
                                    },
                                })
                                that.getList(that.data.urlParam);
                                app.aldstat.sendEvent('助力成功', { '明星': that.data.idolInfo.star_name, '页面': '明星详情' });
                            } else {
                                that.setData({
                                    showPop: true,
                                    popParam: {
                                        popType: "fail",
                                        popTitle: "提示",
                                        popContent: res1.data.msg
                                    },
                                })
                            }
                            qq.hideLoading();
                        }
                    })
                }
            })
        }
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
                                    showPop: true,
                                    popParam: {
                                        popType: "reward",
                                        popTitle: "签到成功",
                                        getVotes: res2.data.data.votes,
                                        rewardTxt: "连续签到，助力值翻倍！",
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
                                                text: '赢1万',
                                                hasIcon: true,
                                                isShare: true
                                            },
                                        ]
                                    }
                                })
                                that.assistPopFun();
                            } else {
                                that.setData({
                                    showPop: true,
                                    popParam: {
                                        popType: "fail",
                                        popContent: "今天已签到"
                                    }
                                })
                                that.assistPopFun();
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
            }
        })
    },
    // 去邀请页面
    goInvite: function () {
        qq.navigateTo({
            url: "../inviteList/inviteList"
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
            this.getList(this.data.urlParam, 1);
        }
    },
    // 手动分享方法
    shareFun: function () {
        app.aldstat.sendEvent('邀请');
        qq.showShareMenu();
    },
    // 弹框投票方法
    voteFun: function (e) {
        this.setData({
            showPop: false,
            voteNum: e.detail.voteNum
        })
        this.assistPopFun();
    },
    // 关闭弹窗
    closePop: function () {
        this.setData({
            showErrorPop: false,
            voteNum: 100,
            idolId: "",
            showVotePop: false,
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
                            that.getList(that.data.urlParam);
                        }
                    })
                }
            });
            that.setData({
                hasUserInfo: true
            })
        } else {
            qq.hideLoading();
        }
    },
})
