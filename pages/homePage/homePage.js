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
        //星座id
        cstl_id: "",
        //星座控制
        constellation: [],
        hasUserInfo: false, //是否有用户信息
        personInfo: '', //存储用户信息
        canIUse: qq.canIUse('button.open-type.getUserInfo'),
        rankData: []
    },
    onLoad: function () {
        var that = this;
        var cstlId = "";
        var today = new Date().getTime();
        //判断当前日期星座
        for (var x = 0; x < horoList.length; x++) {
            var start = new Date(new Date().getFullYear() + '/' + horoList[x].start).getTime();
            var end = new Date(new Date().getFullYear() + '/' + horoList[x].end).getTime();
            if (today > start && today < end) {
                that.setData({
                    currentIndex: x,
                    cstl_id: horoList[x].cstl_id,
                    constellation: horoList
                })
                break;
            }
        }
        app.getUserInfo(function (cb) {
            qq.setStorage({
                key: 'userInfo',
                data: cb
            })
            that.setData({
                personInfo: cb
            })
            if (cb) {
                that.setData({
                    hasUserInfo: true
                })
            }
        })
        that.getHoroData();
    },
    //星座榜
    getHoroData: function (cstl) {
        var that = this;
        qq.getStorage({
            key: 'staruserinfo',
            success: function (res1) {
                qq.request({
                    method: "GET",
                    url: request_host + '/ranks/cstl',
                    data: {
                        cstl_mon: cstl ? cstl : '',
                        user_id: res1.data.user_id,
                        api_token: res1.data.token
                    },
                    success: function (res) {
                        that.setData({
                            rankData: res.data.data
                        })
                    }
                })
            }
        })
    },
    //滑动控制
    swipeCtrl: function (e) {
        this.setData({
            currentIndex: e.detail.current,
            cstl_id: horoList[e.detail.current].cstl_id
        })
        this.getHoroData(horoList[e.detail.current].cstl_id);
    },
    //授权成功保存信息  
    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            var that = this;
            qq.setStorage({
                key: 'userInfo',
                data: e.detail.userInfo
            })
            that.setData({
                personInfo: e.detail.userInfo,
                hasUserInfo: true
            })
            that.getHoroData();
        }
    },
    // 总榜单
    goTotalRank: function () {
        qq.navigateTo({
            url: '../totalList/totalList?cstl_id=' + this.data.cstl_id
        })
    },
    // 分榜单
    goSubList: function (e) {
        qq.navigateTo({
            url: '../subList/subList?cstl_id=' + this.data.cstl_id + '&cstl=' + horoList[e.currentTarget.dataset.index].cstl_id
        })
    }
})
