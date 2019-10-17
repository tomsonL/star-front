<view class="startPage">
    <image class="bg" src="{{poster}}" />
    <view class="countDown">
        <text id="text" bindtap="skip">跳过（{{time}}s）</text>
    </view>

    <view class="votes">
        <image class="power_icon" src="../../images/start_power.jpg" />
        <text>星力值{{star.votes}}！</text>
    </view>


    <view class="fans">
        <text class="leftDays">距离本月封面更新还有{{cstl_info.left_days}}天！</text>
        <image class="fansBg" src="../../images/start_bt.jpg" />
        <view class="fans-wrapper">
            <view class="avatar"><image></image></view>
            <view class="name">张三</view>
        </view>
        <view class="fans-wrapper">
            <view class="avatar"><image></image></view>
            <view class="name">张三</view>
        </view>

        <view class="fans-wrapper">
            <view class="avatar"><image></image></view>
            <view class="name">张三</view>
        </view>

        <view class="fans-wrapper">
            <view class="avatar"><image></image></view>
            <view class="name">张三</view>
        </view>

        <view class="fans-wrapper">
            <view class="avatar"><image></image></view>
            <view class="name">张三</view>
        </view>

        <view class="fans-wrapper">
            <view class="avatar"><image></image></view>
            <view class="name">张三</view>
        </view>
     </view>
</view>
