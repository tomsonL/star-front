<view class="inviteList container">
    <image class="bg" src="../../images/bg2.jpg" />
    <scroll-view scroll-y class="scrollWrapper">
        <view class="inviteBlock">
            <image class="inviteBlockBg" src="../../images/voteBlockBg.png" />
            <view class="inviteTitleWrapper">
                <view class="inviteTitle">已邀请：</view>
                <view class="inviteNum">{{invited_count}}</view>
            </view>
            <view class="inviteDesc">被邀请人任意助力即可获得奖励</view>
        </view>
        <view class="inviteRecord">
            <view class="inviteItem">
                <image class="inviteAvatar" src="../../images/icon_avatar.png" />
                <view class="itemTitle">第{{inviteList.length+1}}位好友</view>
                <view class="itemPower">
                    <view class="power">+500</view>
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                </view>
                <button  open-type="share" class="btn btn-yellow inviteBtn" bindtap="inviteFun">邀请</button>
            </view>
            <block qq:for="{{inviteList}}" qq:for-item="item" qq:key="index">
                <view class="inviteItem">
                    <image class="inviteAvatar" src="{{item.avatar ? item.avatar : '../../images/icon_avatar.png'}}" />
                    <view class="itemTitle">{{item.name}}</view>
                    <view class="itemPower">
                        <view class="power">+500</view>
                        <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    </view>
                    <button class="btn btn-green inviteBtn" data-invitedId="{{item.fans_id}}" bindtap="receiveFun" qq:if="{{item.invited_award == 0}}">领取</button>
                    <view class="btn btn-gray inviteBtn" qq:else>已领取</view>
                </view>
            </block>
        </view>
    </scroll-view>
    <!-- 提示框 -->
        <view class="votePopWrapper" bindtap="closePop" hidden="{{!showPrompt}}"></view>
        <view class="promptPop" hidden="{{!showPrompt}}">
            <image class="promptBg" src="../../images/icon_prompt_bg.png"/>
            <image class="promptIcon" hidden="{{promptType != 1}}" src="../../images/icon_success.png"/>
            <image class="promptIcon" hidden="{{promptType != 0}}" src="../../images/icon_fail.png"/>
            <view class="promptTxtWrapper">
                <view class="promptTxt">{{promptTxt}}</view>
                <image class="poworIcon" hidden="{{!isVote}}" src="../../images/powerIcon2x.png" />
            </view>
        </view>
</view>
