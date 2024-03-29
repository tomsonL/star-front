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
                  <block qq:if="{{popParam.voteImg}}">
                        <view class="idolSay">
                              <view class="sayTrigle"></view>


                              <view qq:if="{{clipAble}}" class="sayPrompt" bindtap="clipCopy">
                                    <image class="voteImg" src="{{popParam.voteImg}}" />
                                    <button open-type="openGroupProfile" group-id="920053426"><text selectable="true">{{popParam.promptTxt}}</text></button>
                              </view>
                              <view qq:else class="sayPrompt" bindtap="videoAdFun2">
                                    <image class="voteImg" src="{{popParam.voteImg}}" bindtap="videoAdFun2" />
                                    <text>恭喜获得礼物码，点击视频后查看吧~</text>
                              </view>
                        </view>
                  </block>
                  <block qq:else>
                        <view class="idolSay" >
                              <view class="sayTrigle"></view>
                              <view class="sayPrompt">
                                    <text selectable="true">{{popParam.promptTxt}}</text>
                              </view>
                        </view>
                  </block>

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
