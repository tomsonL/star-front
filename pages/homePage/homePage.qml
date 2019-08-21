<view class="homePage container">
  <image class="bg" src="../../images/bg.jpg" />
  <scroll-view scroll-y class="scrollWrapper">
    <navigator class="searchBtn" url="../searchList/searchList">
      <image class="searchIcon" src="../../images/searchIcon2x.png" />
      搜索
    </navigator>
    <view class="switch-ctrl">
      <swiper current="{{currentIndex}}" circular="{{true}}" previous-margin="325rpx" display-multiple-items="4" bindchange="swipeCtrl">
        <swiper-item qq:for="{{constellation}}" qq:for-index="idx" qq:for-item="item" qq:key="idx">
          <view class="ctrl-name {{currentIndex==idx?'active': ''}}">{{item.zh}}</view>
        </swiper-item>
      </swiper>
    </view>
    <view class="body">
      <navigator class="rule-wrapper" url="../rulePage/rulePage">
        榜单规则
        <image src="../../images/point2x.png" class="rule-icon" />
      </navigator>
      <view class="horoscopeWrapper">
        <image class="horoBg" src="../../images/horoscope_bg.png" />
        <view class="totalTop" bindtap="goTotalRank">
          <image class="totalTitle" src="../../images/icon_total_title.png" />
          <image class="totalBg" src="../../images/icon_total_box.png" />
          <image class="totalAvatar" src="{{rankData[12].star_avatar}}" />
        </view>
        <view class="iconsWrapper">
          <view class="ari_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[0].star_id}}" src="{{constellation[0].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[0].star_id}}" e src="{{constellation[0].home_active}}"></image>
          </view>
          <view class="tau_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[1].star_id}}" src="{{constellation[1].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[1].star_id}}" e src="{{constellation[1].home_active}}"></image>
          </view>
          <view class="gem_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[2].star_id}}" src="{{constellation[2].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[2].star_id}}" e src="{{constellation[2].home_active}}"></image>
          </view>
          <view class="cnc_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[3].star_id}}" src="{{constellation[3].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[3].star_id}}" e src="{{constellation[3].home_active}}"></image>
          </view>
          <view class="leo_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[4].star_id}}" src="{{constellation[4].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[4].star_id}}" e src="{{constellation[4].home_active}}"></image>
          </view>
          <view class="vir_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[5].star_id}}" src="{{constellation[5].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[5].star_id}}" e src="{{constellation[5].home_active}}"></image>
          </view>
          <view class="lib_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[6].star_id}}" src="{{constellation[6].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[6].star_id}}" e src="{{constellation[6].home_active}}"></image>
          </view>
          <view class="sco_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[7].star_id}}" src="{{constellation[7].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[7].star_id}}" e src="{{constellation[7].home_active}}"></image>
          </view>
          <view class="sgr_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[8].star_id}}" src="{{constellation[8].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[8].star_id}}" e src="{{constellation[8].home_active}}"></image>
          </view>
          <view class="cap_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[9].star_id}}" src="{{constellation[9].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[9].star_id}}" e src="{{constellation[9].home_active}}"></image>
          </view>
          <view class="agr_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[10].star_id}}" src="{{constellation[10].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[10].star_id}}" src="{{constellation[10].home_active}}"></image>
          </view>
          <view class="psc_icon_wrapper icon_wrapper">
            <image qq:if="{{rankData[12].star_id != rankData[11].star_id}}" src="{{constellation[11].home_icon}}"></image>
            <image qq:if="{{rankData[12].star_id == rankData[11].star_id}}" src="{{constellation[11].home_active}}"></image>
          </view>
        </view>
        <view class="avatarWrapper">
          <view class="ari_avatar_wrapper avatar_wrapper" data-index="0" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[0].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[0].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[0].star_avatar}}"></image>
          </view>
          <view class="tau_avatar_wrapper avatar_wrapper" data-index="1" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[1].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[1].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[1].star_avatar}}"></image>
          </view>
          <view class="gem_avatar_wrapper avatar_wrapper" data-index="2" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[2].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[2].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[2].star_avatar}}"></image>
          </view>
          <view class="cnc_avatar_wrapper avatar_wrapper" data-index="3" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[3].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[3].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[3].star_avatar}}"></image>
          </view>
          <view class="leo_avatar_wrapper avatar_wrapper" data-index="4" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[4].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[4].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[4].star_avatar}}"></image>
          </view>
          <view class="vir_avatar_wrapper avatar_wrapper" data-index="5" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[5].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[5].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[5].star_avatar}}"></image>
          </view>
          <view class="lib_avatar_wrapper avatar_wrapper" data-index="6" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[6].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[6].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[6].star_avatar}}"></image>
          </view>
          <view class="sco_avatar_wrapper avatar_wrapper" data-index="7" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[7].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[7].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[7].star_avatar}}"></image>
          </view>
          <view class="sgr_avatar_wrapper avatar_wrapper" data-index="8" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[8].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[8].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[8].star_avatar}}"></image>
          </view>
          <view class="cap_avatar_wrapper avatar_wrapper" data-index="9" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[9].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[9].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[9].star_avatar}}"></image>
          </view>
          <view class="agr_avatar_wrapper avatar_wrapper" data-index="10" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[10].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[10].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[10].star_avatar}}"></image>
          </view>
          <view class="psc_avatar_wrapper avatar_wrapper" data-index="11" bindtap="goSubList">
            <image class="avatar_border" qq:if="{{rankData[12].star_id == rankData[11].star_id}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{rankData[12].star_id == rankData[11].star_id}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar" src="{{rankData[11].star_avatar}}"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="listRule">
      <image src="../../images/bottomRule2x.png" class="listRule-background" />
      <view class="rule-title">
        <view class="rule-title-txt">榜单规则</view>
        <image src="../../images/ruleTitle2x.png" class="rule-title-bottom" />
      </view>
      <view class="rule-detail"> 星守护小程序是客观反映明星热度的产品，星榜单排名以粉丝真实助力数据为依据的明星打榜平台。</view>
    </view>
  </scroll-view>
  <view class="getUserInfo" qq:if="{{!hasUserInfo}}">
    <view class="getUserInfoWrapper">
      <image class="getUserInfoBg" src="../../images/bg_empower.png" />
      <view class="getInfoTxt">获取不到你的昵称和头像，请开启授权！</view>
      <button class="getInfoBtn" qq:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">点击获取授权</button>
      <view qq:else>请升级QQ版本</view>
    </view>
  </view>
</view>
