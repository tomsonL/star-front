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
                <image class="inviteAvatar" src="" />
                <view class="itemTitle">第{{inviteList.length+1}}位好友</view>
                <view class="itemPower">
                    <view class="power">+1000</view>
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                </view>
                <button  open-type="share" class="btn btn-yellow inviteBtn" bindtap="inviteFun">邀请</button>
            </view>
            <block qq:for="{{inviteList}}" qq:for-item="item" qq:key="index">
                <view class="inviteItem">
                    <image class="inviteAvatar" src="{{item.avatar}}" />
                    <view class="itemTitle">{{item.name}}</view>
                    <view class="itemPower">
                        <view class="power">+1000</view>
                        <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    </view>
                    <button class="btn btn-yellow inviteBtn" open-type="share" qq:if="{{!item.canGet}}">邀请</button>
                    <view class="btn btn-green inviteBtn" qq:else>领取</view>
                </view>
            </block>
        </view>
    </scroll-view>
</view>
