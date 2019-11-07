//promptPop.js
//获取应用实例
const app = getApp()
const config = require('../../config.js');
const request_host = config.REQUEST_HOST;
Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        // 弹出框接收参数
        popParam: {
            type: Object,
            // 默认参数
            value: {
                // 弹出框类型
                popType: '',
                // 弹出框标题
                popTitle: '',
                // 返回文案
                promptTxt:'',
                // 弹出框内容
                popContent: '',
                // 是否是成功
                isSuccess: false,
                // 投票票数
                voteNum: 0,
                // 投票明星头像
                voteIdolAvatar: '',
                // 投票明星排行
                idolRank: 0,
                // 投票明星姓名
                idolName: "",
                // 获取助力值
                getVotes: 0,
                // 获取助力值文案
                rewardTxt: "",
                // 下方提示
                tip: "",
                // 获奖图片
                voteImg: "",
                // 按钮
                btns: [
                    {
                        // 按钮类型
                        type: '',
                        // 按钮宽度类型
                        longType: '',
                        // 按钮方法
                        btnFun: '',
                        // 按钮文本
                        text: '',
                        // 是否有图标
                        hasIcon: false,
                        // 是否是分享
                        isShare: false
                    }
                ]
            },
            observer(newVal, oldVal, changedPath) {
                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                //console.log(newVal);
            }
        },
        innerText: {
            type: String,
            value: ''
        }
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    data: {
        // 这里是一些组件内部数据
        someData: {},
        clipAble:false,
    },
    ready() {
    },
    methods: {
        // 关闭弹窗方法
        closePop: function () {
            this.triggerEvent('closePop', {}, {});
        },
        // 分享方法
        shareFun: function () {
            this.triggerEvent('shareFun', {}, {});
        },
        // 看视频的方法
        videoAdFun: function () {
            console.log('videoAdFun is called');
            var re = this.triggerEvent('videoAdFun', {}, {});
            console.log(this);
        },

        voteFun: function () {
            this.triggerEvent('voteFun', this.data.popParam, {});
        },

        clipCopy: function () {
            var that=this
            qq.setClipboardData({
                data: that.data.popParam.promptTxt,
                success(res) {
                    qq.getClipboardData({
                        success(res) {
                            console.log(res.data) // data
                        }
                    })
                }
            })
            app.globalData.clipAble = false;
            app.globalData.videoAd = 1;
        },

        videoAdFun2: function (e) {
            var that = this
            console.log('video ad fun2 ');
            app.globalData.videoAd = 2;
            app.videoAd2.load().then(() => {
                console.log('激励视频2加载成功');
            app.videoAd2.show().then(() => {
                console.log('激励视频2 广告显示成功')
                setTimeout(function(){
                    that.setData({
                        clipAble:true
                    });
                }, 5000);
            })
            .catch(err => {
                console.log('激励视频 广告显示失败')
            })
            })
            .catch(err => {
                console.log('激励视频加载失败');
            })
        },


    }
})