<view class="startPage">
    <image class="bg" src="{{poster}}" />
    <view class="countDown">
        <text id="text" bindtap="skip">跳过（{{time}}s）</text>
    </view>

    <view class="votes">
        <image class="power_icon" src="../../images/start_power.jpg" />
        <text>星力值{{star.votes}}！</text>
    </view>

    <view class="fans-wrapper">
        <text class="leftDays">距离本月封面更新还有{{cstl_info.left_days}}天！</text>
        <image class="fansBg" src="../../images/start_bt.jpg" />
        <view qq:for="{{top_fans}}" qq:for-index="idx" qq:for-item="fans" class="fans fans{{idx+1}}" >
            <view class="no">{{fans['fans_no']}}</view>
            <view class="avatar-wrapper"><image class="avatar" src="{{fans['fans_avatar']}}"></image></view>
            <view class="name">{{fans['fans_name']}}</view>
            <!-- <view class="votes">{{fans['fans_votes']}}</view> -->
        </view>
    </view>
</view>
