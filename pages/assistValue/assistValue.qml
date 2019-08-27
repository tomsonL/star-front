<view class="assistValue container">
    <image class="bg" src="../../images/bg2.jpg" />
    <scroll-view scroll-y class="scrollWrapper">
        <view class="voteBlock">
            <image class="voteBlockBg" src="../../images/voteBlockBg.png" />
            <view class="voteTitle">剩余星运值</view>
            <view class="powerWrapper">
                <view class="power">{{voteNum}}</view>
                <image class="poworIcon" src="../../images/powerIcon2x.png" />
            </view>
        </view>
        <view class="voteRecord">
            <block qq:for="{{voteList}}" qq:for-item="item" qq:key="index">
             <view class="recordItem">
                <view class="itemTitle">{{item.getType}}</view>
                <view class="itemTime">{{item.getTime}}</view>
                <view class="itemPower">
                    <view class="power">+{{item.votes}}</view>
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                </view>
            </view>
            </block>
        </view>
    </scroll-view>
</view>
