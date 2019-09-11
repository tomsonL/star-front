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
                        <view class="sayPrompt">{{popParam.promptTxt}}</view>
                  </view>
            </view>
            <view qq:if="{{popParam.popType == 'reward'}}">
                  <view class="getVotesWrapper">
                        <view class="getVotes">+{{popParam.getVotes}}</view>
                        <image class="poworIcon" src="../../images/powerIcon2x.png" />
                  </view>
                  <view class="promptTxt">{{popParam.rewardTxt}}</view>
            </view>
      </view>
</view>