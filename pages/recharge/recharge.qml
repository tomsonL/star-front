<view class="rechargePage">
    <image class="bg" src="../../images/bg2.jpg" />
    <scroll-view scroll-y class="scrollWrapper">
        <view class="voteBlock">
            <image class="voteBlockBg" src="../../images/voteBlockBg.png" />
            <view class="voteTitle"
                >剩余助力值:
                <view class="myOrder" bindtap="goMyOrder">
                    <image class="orderIcon" src="../../images/icon_myOrder.png" />
                    我的订单
                </view>
            </view>
            <view class="powerWrapper">
                <view class="power">{{myVoteNum}}</view>
                <image class="poworIcon" src="../../images/powerIcon2x.png" />
            </view>
        </view>
        <view class="rechargeList">
            <view class="rechargeTitle">
                <view class="blankBlock"></view>
                助力值购买:
            </view>
            <view class="rechargeTypeWrapper">
                <block qq:for="{{voteTypeList}}" qq:for-item="item" qq:key="index">
                    <view bindtap="chooseType" data-index="{{index}}" class="typeItem {{item.isChoose? 'typeItemActive' : ''}}">
                        <view class="powerWrapper">
                            <view class="power">{{item.voteNum}}</view>
                            <image class="poworIcon" src="../../images/powerIcon2x.png" />
                        </view>
                        <view class="money">￥{{item.money}}</view>
                    </view>
                </block>
            </view>
            <view class="rechargeTitle">
                <view class="blankBlock"></view>
                自定义购买:
            </view>
            <view class="inputWrapper">
                <view class="leftWrapper">
                    <view class="leftTxt"></view>
                    <input class="leftInput" placeholder-class="inputPlaceholder" placeholder="请输入充值助力值的数量" bindfocus="focusInput" type="number" value="{{inputVoteNum}}" bindinput="checkInput" />
                </view>
                <view class="unit"> 助力值</view>
            </view>
        </view>
    </scroll-view>
    <view class="rechargeBar">
        <view class="rechargeRule">
            充值星币即表示您同意
            <view>
                《星运MAX榜用户充值协议》
            </view>
        </view>
        <view class="needToPay">
            <view class="needToPayTxt">需支付</view>
            <view class="payMoney">￥{{payMoney}}</view>
        </view>
        <button class="payBtn" bindtap="payMoneyFun">确认支付</button>
    </view>
    <!-- 提示框 -->
    <prompt-pop qq:if="{{showPop}}" pop-param="{{popParam}}" bind:closePop="closePop"></prompt-pop>
    <!-- 授权框 -->
     <view class="getUserInfo" qq:if="{{!hasUserInfo}}">
        <view class="getUserInfoWrapper">
            <image class="getUserInfoBg" src="../../images/bg_empower.png" />
            <view class="getInfoTxt">为你的偶像助力星运值，来，开始助力吧~</view>
            <button class="getInfoBtn" qq:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">点击授权</button>
            <view qq:else>请升级QQ版本</view>
        </view>
    </view>
</view>
