//inviteList.js
//获取应用实例
const app = getApp();
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
const utils = require('../../utils/util.js');
//星座信息
const horoList = config.HORO;

Page({
    data: {
        inviteList: [],
        invited_count: ""
    },
    onLoad: function () {
        qq.showShareMenu();
        var that = this;
        qq.getStorage({
            key: 'staruserinfo',
            success: function (res1) {
                qq.request({
                    method: "GET",
                    url: request_host + '/fans/invited',
                    data: {
                        user_id: res1.data.user_id,
                        api_token: res1.data.token,
                        fans_id: res1.data.user_id
                    },
                    success: function (res2) {
                        that.setData({
                            inviteList: res2.data.data.invited_list,
                            invited_count: res2.data.data.invited_count
                        })
                    }
                })
            }
        })
    },

    onShareAppMessage: function( options ){
        var that = this;
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
    　　　　title: "人生剧本任意变幻，因为“你”，让“他”星运无限……",        // 默认是小程序的名称(可以写slogan等)
    　　　　path: '/pages/homePage/homePage',        // 默认是当前页面，必须是以‘/’开头的完整路径
    　　　　imageUrl: 'http://image.3ceng.cn/res/share/share_500_400.jpg',
    　　　　//imageUrl: 'http://img.mp.itc.cn/upload/20170624/1da4a6bd75dc4f56bae76a702cb4242c_th.jpg',
    　　　　success: function(res){
    　　　　　　// 转发成功之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
    　　　　　　}
    　　　　},
    　　　　fail: function(){
    　　　　　　// 转发失败之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
    　　　　　　　　// 用户取消转发
    　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
    　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
    　　　　　　}
    　　　　},
    　　　　complete: function(){
    　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
    　　　　}
        };
        // 来自页面内的按钮的转发
    　　if( options.from == 'button' ){
    　　　　var eData = options.target.dataset;
    　　　　console.log( eData.name );     // shareBtn
    　　　　// 此处可以修改 shareObj 中的内容
    　　　　shareObj.path = '/pages/homePage/homePage?btn_name='+eData.name;
    　　}
        return shareObj;
    },
    // 邀请方法
    inviteFun: function () {
        qq.showShareMenu();
    }
})
