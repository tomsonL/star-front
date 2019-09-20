<view class="promptPop">
      <view class="promptWrapper">
            <image class="close" catchtap="closePop" src="../../images/icon_closePop.png" />
            <image class="promptTop" src="../../images/bg_pop_top.png" />
            <view class="promptTitle">{{popParam.popTitle}}</view>
            <view qq:if="{{popParam.popType == 'fail'}}">
                  <image qq:if="{{!popParam.isSuccess}}" class="promptIcon" src="../../images/icon_fail.png" />
                  <image qq:else class="promptIcon" src="../../images/icon_success.png" />
                  <view class="promptContent">{{popParam.popContent}}</view>
            </view>
            <view class="promptContent" qq:if="{{popParam.popType == 'desc'}}">
                  <text class="promptContentText">{{popParam.popContent}}</text>
            </view>
            <view qq:if="{{popParam.popType == 'voteSuccess'}}">
                  <image class="idolAvatar" src="{{popParam.voteIdolAvatar}}" />
                  <view class="idolInfo">
                        <view class="name">{{popParam.idolName}}</view>
                        <view class="rank"
                              >总榜排位：
                              <text class="value">{{popParam.idolRank}}</text>
                        </view>
                        <view class="voteNum"
                              >增加星运值：
                              <text class="value">{{popParam.voteNum}}</text>
                              <image class="poworIcon" src="../../images/powerIcon2x.png" />
                        </view>
                  </view>
                  <view class="clear"></view>
                  <view class="idolSay">
                        <view class="sayTrigle"></view>
                        <image class="voteImg" qq:if="{{popParam.voteImg}}" src="{{popParam.voteImg}}" />
                        <view class="sayPrompt">
                        <text selectable="true">{{popParam.promptTxt}}</text>
                        </view>
                  </view>
                  <view class="tips">{{popParam.tip}}</view>
            </view>
            <view qq:if="{{popParam.popType == 'reward'}}">
                  <view class="getVotesWrapper">
                        <view class="getVotes">+{{popParam.getVotes}}</view>
                        <image class="poworIcon" src="../../images/powerIcon2x.png" />
                  </view>
                  <view class="promptTxt">{{popParam.rewardTxt}}</view>
            </view>
            <view class="btnWrapper">
                  <view qq:for="{{popParam.btns}}" qq:for-item="btn" qq:key="index" class="{{btn.type == 1 ? 'btnType1' : 'btnType2'}} {{btn.longType == 1 ? 'longBtn':''}}" bindtap="{{btn.btnFun}}">
                        <button open-type="{{btn.isShare ? 'share': ''}}">
                              <text class="btnTxt">{{btn.text}}</text>
                              <image qq:if="{{btn.hasIcon}}" class="poworIcon" src="../../images/powerIcon2x.png" />
                        </button>
                  </view>
            </view>
      </view>
</view>
