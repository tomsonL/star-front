<view class="homePage container">
  <image class="bg" src="../../images/bg.jpg" />
  <scroll-view scroll-y class="scrollWrapper">
    <navigator class="searchBtn" url="../searchList/searchList">
      <image class="searchIcon" src="../../images/searchIcon2x.png" />
      搜索
    </navigator>
    <view class="switch-ctrl">
      <swiper current="{{currentIndex}}" circular="{{false}}" bindchange="swipeCtrl" previous-margin="325rpx" display-multiple-items="4">
        <swiper-item qq:for="{{hasMons}}" qq:for-index="idx" qq:for-item="item" qq:key="idx">
          <view class="ctrl-name {{currentIndex==idx?'active': ''}}">{{item.zh}}</view>
        </swiper-item>
        <swiper-item><view class="ctrl-name future"></view></swiper-item>
        <swiper-item><view class="ctrl-name future"></view></swiper-item>
        <swiper-item><view class="ctrl-name future"></view></swiper-item>


      </swiper>
    </view>
    <view class="body">
      <navigator class="rule-wrapper" url="../rulePage/rulePage">
        榜单规则
        <image src="../../images/point2x.png" class="rule-icon" />
      </navigator>
      <view class="horoscopeWrapper">
        <image class="horoBg" src="../../images/horoscope_bg.png" />
        <view class="totalTop" bindtap="{{ cstl_id == curr_cstl_id? 'goTotalRank':''}}">
          <image class="totalTitle" src="../../images/icon_total_title.png" />
          <image class="totalBg {{ cstl_id == curr_cstl_id? 'animation':''}}" src="../../images/icon_total_box.png" />
          <image class="totalAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[12].star_avatar}}" />
        </view>
        <view class="avatarWrapper">
          <view class="ari_avatar_wrapper avatar_wrapper" data-index="0" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'ari'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'ari'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[0].star_avatar}}"></image>
          </view>
          <view class="tau_avatar_wrapper avatar_wrapper" data-index="1" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'tau'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'tau'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[1].star_avatar}}"></image>
          </view>
          <view class="gem_avatar_wrapper avatar_wrapper" data-index="2" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'gem'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'gem'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[2].star_avatar}}"></image>
          </view>
          <view class="cnc_avatar_wrapper avatar_wrapper" data-index="3" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'cnc'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'cnc'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[3].star_avatar}}"></image>
          </view>
          <view class="leo_avatar_wrapper avatar_wrapper" data-index="4" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'leo'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'leo'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[4].star_avatar}}"></image>
          </view>
          <view class="vir_avatar_wrapper avatar_wrapper" data-index="5" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'vir'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'vir'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[5].star_avatar}}"></image>
          </view>
          <view class="lib_avatar_wrapper avatar_wrapper" data-index="6" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'lib'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg"  qq:if="{{cstl_id == 'lib'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[6].star_avatar}}"></image>
          </view>
          <view class="sco_avatar_wrapper avatar_wrapper" data-index="7" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'sco'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'sco'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[7].star_avatar}}"></image>
          </view>
          <view class="sgr_avatar_wrapper avatar_wrapper" data-index="8" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'sgr'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'sgr'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[8].star_avatar}}"></image>
          </view>
          <view class="cap_avatar_wrapper avatar_wrapper" data-index="9" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'cap'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'cap'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[9].star_avatar}}"></image>
          </view>
          <view class="agr_avatar_wrapper avatar_wrapper" data-index="10" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'agr'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'agr'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[10].star_avatar}}"></image>
          </view>
          <view class="psc_avatar_wrapper avatar_wrapper" data-index="11" bindtap="{{ cstl_id == curr_cstl_id? 'goSubList':''}}">
            <image class="avatar_border" qq:if="{{cstl_id == 'psc'}}" src="../../images/icon_avatar_border.png"></image>
            <image class="activeBg" qq:if="{{cstl_id == 'psc'}}" src="../../images/icon_active_bg.png" />
            <image class="rankAvatar {{ cstl_id == curr_cstl_id? 'animation':''}}" src="{{rankData[11].star_avatar}}"></image>
          </view>
        </view>
        <view qq:if="{{showLeft}}" class="toWrapper toBefore" data-type="1" bindtap="toAnotherFun">
          <image src="../../images/icon_showLeft.png" />
        </view>
        <view qq:if="{{showRight}}" class="toWrapper toAfter" data-type="2" bindtap="toAnotherFun">
          <image src="../../images/icon_showRight.png" />
        </view>
      </view>
    </view>
    <view class="listRule">
      <image src="../../images/bottomRule2x.png" class="listRule-background" />
      <!-- <view class="rule-title">
        <view class="rule-title-txt">榜单规则</view>
        <image src="../../images/ruleTitle2x.png" class="rule-title-bottom" />
      </view> -->
      <!-- 提示框 -->
      <prompt-pop qq:if="{{showPop}}" pop-param="{{popParam}}" bind:closePop="closePop" bind:shareFun="{{shareOrAd}}Fun" bind:voteFun="voteFun"></prompt-pop>
      <view class="rule-detail">

        <view>在斗数命盘中，每个人都在变换角色，</view>
        <view>仿佛 闪耀的“你”，在皓洁星空无时无刻变化着光亮，</view>
        <view>渺小的“我”，愿做漆黑夜晚中的“追光者”……</view>
        <view>用浅层的指尖，给你应援与保护，愿你星运无限……</view>
      </view>
    </view>
  </scroll-view>
</view>
