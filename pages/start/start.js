//rulePage.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util.js');
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;

Page({
    data: {
        poster:"http://image.3ceng.cn/start_bg2.jpg",
        time:5,
        star:{},
        cstl_info:{},
        top_fans:[]
    },
    onLoad: function () {
        var that = this;
        var interval = setInterval(function(){
            var timenew = that.data.time - 1;
            that.setData({
                time:timenew
            })
            if(that.data.time ==0){
                clearInterval(interval);
                qq.switchTab({
                    url: '../homePage/homePage'
                })
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
                    top_fans: res.data.data.top_fans
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
    }
})
