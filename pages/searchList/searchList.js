//searchList.js
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
//星座信息
const horoList = config.HORO;
//获取应用实例
const app = getApp()

Page({
    data: {
        scrollTop: 0,
        // 页码
        pageNo: 0,
        //明星List
        idolList: [],
        // 是否有更多
        hasMore: true,
        shareMsg1:'',
        shareMsg2:'',
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
        // 投票的明星头像地址
        idolAvatar: "",
        // 显示错误提示
        showErrorPop: false,
        errorTxt: "",
        // 投票数量
        voteNum: 100,
        // 关键字
        keyword: "",
        // 提示框相关
        showPop: false,
        popParam: {},
        // 今天是否打卡
        todayCheck: false,
        hasUserInfo: true, //是否有用户信息
        canIUse: qq.canIUse('button.open-type.getUserInfo'),
        //增加星力的按钮显示广告还是分享
        shareOrAd: 'share'
    },
    onLoad: function () {
        qq.showShareMenu();
        if (parseInt(Math.random()*2) == 1){
            this.setData({
                shareOrAd: 'share'
            })
        }else {
            this.setData({
                shareOrAd: 'videoAd'
            })
        }
    },
    onShow: function () {
        if (this.data.keyword) {
            this.getList(this.data.keyword, 0);
        }
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
    onHide: function () {
        this.setData({
            pageNo: 0,
            scrollTop: 0
        })
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
                    //if (options.from == 'button') {
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
                    //}
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
    getList: function (keyword, type) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        // type = 0: 刷新 type = 1: 加载更多
        var that = this;
        qq.request({
            method: "GET",
            url: request_host + '/ops/search',
            data: {
                page: that.data.pageNo,
                keyword: keyword
            },
            success: function (res2) {
                var list = res2.data.data.stars;
                var hasMore = true;
                if (list.length < 10) {
                    hasMore = false;
                }
                for (var x = 0; x < list.length; x++) {
                    for (var y = 0; y < horoList.length; y++) {
                        if (list[x].star_cstl === horoList[y].cstl_id) {
                            list[x].smallImg = horoList[y].smallImg;
                        }
                    }
                }
                if (type == 1) {
                    var oldList = that.data.idolList;
                    list = oldList.concat(list);
                }
                that.setData({
                    idolList: list,
                    hasMore: hasMore
                })
                qq.hideLoading();
            }
        })
    },
    //绑定回车事件
    bindConfirm: function (e) {
        this.setData({
            keyword: e.detail.value
        });
        this.getList(e.detail.value, 0);
    },
    // 取消搜索
    cancelFun: function () {
        qq.navigateBack();
    },
    // 进入明星详情页
    goIdolDetail: function (e) {
        qq.navigateTo({
            url: "../idolDetail/idolDetail?star_id=" + e.currentTarget.dataset.idolid
        })
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
        var idolAvatar = e ? e.currentTarget.dataset.star_avatar : this.data.idolAvatar;
        app.aldstat.sendEvent('助力', { '明星': idolName, '页面': '搜索页' });
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
                                idolName: idolName,
                                idolAvatar: idolAvatar,
                                showVotePop: true,
                                checkInsList: checkList,
                                todayCheck: res1.data.data.checkedin == 1
                            });
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
    assistSubmit(e) {
        var that = this;

        if (parseInt(Math.random()*2) == 1){
            that.setData({
                shareOrAd: 'share'
            })
        }else {
            that.setData({
                shareOrAd: 'videoAd'
            })
        }

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
                            votes: that.data.voteNum,
                            form_id:e.detail.formId
                        },
                        success: function (res1) {
                            if (res1.data.code == 1) {
                                that.setData({
                                    showErrorPop: false,
                                    voteNum: 100,
                                    showVotePop: false,
                                    showPop: true,
                                    popParam: {
                                        popType: "voteSuccess",
                                        popTitle: "助力成功",
                                        voteNum: that.data.voteNum,
                                        promptTxt: res1.data.data.info,
                                        voteIdolAvatar: that.data.idolAvatar,
                                        idolName: that.data.idolName,
                                        idolRank: res1.data.data.rank,
                                        voteImg: res1.data.data.img,
                                        tip: res1.data.data.tip,
                                        btns: [
                                            {
                                                type: 1,
                                                longType: 0,
                                                btnFun: 'shareFun',
                                                text: '增加星力！',
                                                hasIcon: true,
                                                isShare: (that.data.shareOrAd == 'share')
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
                                that.getList(that.data.keyword, 0);
                                app.aldstat.sendEvent('助力成功', { '明星': that.data.idolName, '页面': '搜索页' });
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
                },
                //没有获取到用户权限
                fail: function () {
                    qq.hideLoading();
                    that.setData({
                        hasUserInfo: false
                    })
                }
            })
        }
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
                                that.assistPopFun();
                            } else {
                                that.setData({
                                    showPop: true,
                                    popParam: {
                                        popType: "fail",
                                        popContent: "今天已打卡"
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

    videoAdFun: function(e){
        app.videoAd.load().then(() => {
            console.log('激励视频加载成功');
        app.videoAd.show().then(() => {
            console.log('激励视频 广告显示成功')
        })
    .catch(err => {
            console.log('激励视频 广告显示失败')
        })
    })
    .catch(err => {
            console.log('激励视频加载失败');
    })
    },
})
