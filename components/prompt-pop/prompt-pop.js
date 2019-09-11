//promptPop.js
//获取应用实例
const app = getApp()

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
                // 获取助力值
                getVotes: 0,
                // 获取助力值文案
                rewardTxt: ""
            },
            observer(newVal, oldVal, changedPath) {
                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                console.log(newVal);
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
        someData: {}
    },
    ready() {
    },
    methods: {
        closePop: function () {
             this.triggerEvent('closePop', {}, {})
        }
    }
})