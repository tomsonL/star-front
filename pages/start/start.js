//rulePage.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;

Page({
    data: {
        poster:"",
        time:5,
        star:{},
        cstl_info:{},
        top_fans:[],
        interval:{}
    },

    onLoad: function () {
        var that = this;
        that.interval = setInterval(function(){
            var timenew = that.data.time - 1;
            that.setData({
                time:timenew
            })
            if(that.data.time ==0){
                clearInterval(that.interval);
                that.skip();
            }
        },1000)
        qq.request({
            method: "GET",
            url: request_host + "/ranks/pre_top",
            data: {},
            success: function (res) {
                that.setData({
                    star: res.data.data.star,
                    cstl_info: res.data.data.cstl_info,
                    top_fans: res.data.data.top_fans,
                    poster: res.data.data.poster
                })
            }
        })
    },
    onShow: function () {

    },
    skip: function () {
        qq.switchTab({
            url: '../homePage/homePage'
        })
        clearInterval(this.interval);
    },
})
