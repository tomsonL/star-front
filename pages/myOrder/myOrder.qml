<view class="myOrderPage">
    <image class="bg" src="../../images/bg2.jpg" />
    <scroll-view scroll-y class="scrollWrapper" bindscrolltolower="loadMore">
        <block qq:for="{{orderList}}" qq:for-item="item" qq:key="index">
            <view class="orderItem">
                <view class="orderTitleWrapper">
                    <view class="orderTitle">{{item.title}}</view>
                    <view class="orderMoney">{{item.votes}}</view>
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <button class="goPay" qq:if="{{item.paid == 0}}" data-prepayId="{{item.prepay_id}}" bindtap="goPay">去支付</button>
                </view>
                <view class="orderTime">{{item.createTime}}</view>
            </view>
        </block>
        <view class="noMore" hidden="{{hasMore}}">没有更多了~</view>
    </scroll-view>
    <!-- 提示框 -->
    <view class="votePopWrapper" bindtap="closePop" hidden="{{!showPrompt}}"></view>
    <view class="promptPop" hidden="{{!showPrompt}}">
        <image class="promptClose" bindtap="closePop" src="../../images/icon_closePop.png" />
        <image class="promptBg" src="../../images/icon_prompt_bg.png" />
        <image class="promptIcon" hidden="{{promptType != 1}}" src="../../images/icon_success.png" />
        <image class="promptIcon" hidden="{{promptType != 0}}" src="../../images/icon_fail.png" />
        <view class="promptTxtWrapper">
            <view class="promptTxt">{{promptTxt}}</view>
            <image class="poworIcon" hidden="{{!isVote}}" src="../../images/powerIcon2x.png" />
        </view>
    </view>
     <view class="getUserInfo" qq:if="{{!hasUserInfo}}">
        <view class="getUserInfoWrapper">
            <image class="getUserInfoBg" src="../../images/bg_empower.png" />
            <view class="getInfoTxt">为你的偶像助力星运值，来，开始助力吧~</view>
            <button class="getInfoBtn" qq:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">点击授权</button>
            <view qq:else>请升级QQ版本</view>
        </view>
    </view>
</view>
