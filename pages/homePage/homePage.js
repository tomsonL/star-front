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
        rankData: []
    },
    onLoad: function (option) {
        if(option.invite_id){
            qq.setStorageSync('invite_id',option.invite_id);
        }
        //qq.showShareMenu();
        var that = this;
        var cstlId = "";
        var today = new Date().getTime();
        //判断当前日期星座
        for (var x = 0; x < horoList.length; x++) {
            var start = new Date(new Date().getFullYear() + '/' + horoList[x].start).getTime();
            var end = new Date(new Date().getFullYear() + '/' + horoList[x + 1].start).getTime();
            var horoArr = JSON.parse(JSON.stringify(horoList));
            for (var y = 0; y < horoArr.length; y++) {
                horoArr[y].zh = horoArr[y].zh.replace("座", "月");
            }
            if (today > start && today < end) {
                that.setData({
                    currentIndex: x,
                    cstl_id: horoList[x].cstl_id,
                    constellation: horoArr
                })
                break;
            }
        }
        that.getHoroData();
    },
    onShow: function () {
        this.getHoroData();
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
        return shareObj;
    },
    //星座榜
    getHoroData: function (cstl) {
        qq.showLoading({
            title: "请稍后",
            mask: true
        })
        var that = this;
        qq.request({
            method: "GET",
            url: request_host + '/ranks/cstl',
            data: {
                cstl_mon: cstl ? cstl : ''
            },
            success: function (res) {
                qq.hideLoading();
                that.setData({
                    rankData: res.data.data
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
