<view class="idolDetail container">
    <image class="bg" src="../../images/bg4.jpg" />
    <scroll-view scroll-y class="scrollWrapper">
        <view class="idolBlock">
            <image class="idolBlockBg" src="../../images/idolBlockBg.png" />
            <view class="avatarWrapper">
                <image class="idolAvatar" src="{{idolInfo.star_avatar}}" />
                <image class="idolHoro" src="{{idolInfo.bigImg}}" />
            </view>
            <view class="idolInfo">
                <view class="idolName">姓名：{{idolInfo.star_name}}</view>
                <view>星运：{{idolInfo.star_votes}}</view>
            </view>
            <view class="btn btn-yellow assistBtn" data-star-id="{{idolInfo.star_id}}" bindtap="assistPopFun">助力</view>
        </view>
        <view class="topWrapper">
            <image class="topBg" src="../../images/top_bg.png" />
            <view class="topItem">
                <view class="itemTitle">抢点王{{lastTimer}}</view>
                <view class="userAvatar">
                    <image class="avatarIcon" src="../../images/icon_timeVote.png" />
                    <image class="avatar" src="{{timeKing.flasher_avatar ? timeKing.flasher_avatar : '../../images/icon_avatar.png'}}" />
                </view>
                <view class="userName">{{timeKing.flasher_name ? timeKing.flasher_name:"暂无"}}</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{timeKing.flasher_votes ? timeKing.flasher_votes:0}}</view>
                </view>
            </view>
            <view class="topItem">
                <view class="itemTitle">累计助力冠军：</view>
                <view class="userAvatar">
                    <image class="avatarIcon" src="../../images/icon_totalVote.png" />
                    <image class="avatar" src="{{totalKing.toper_avatar ? totalKing.toper_avatar : '../../images/icon_avatar.png'}}" />
                </view>
                <view class="userName">{{totalKing.toper_name ? totalKing.toper_name:"暂无"}}</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{totalKing.toper_votes ? totalKing.toper_votes:0}}</view>
                </view>
            </view>
            <view class="topItem">
                <view class="itemTitle">今日助力神：</view>
                <view class="userAvatar">
                    <image class="avatarIcon" src="../../images/icon_todayVote.png" />
                    <image class="avatar" src="{{todayKing.toper_avatar ? todayKing.toper_avatar : '../../images/icon_avatar.png'}}" />
                </view>
                <view class="userName">{{todayKing.toper_name ? todayKing.toper_name:"暂无"}}</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{todayKing.toper_votes ? todayKing.toper_votes:0}}</view>
                </view>
            </view>
        </view>
        <image class="fansRankTitle" src="../../images/icon_fans_title.png" />
        <view class="fansRankList">
            <block qq:for="{{fansList}}" qq:for-item="item" qq:key="index">
                <view class="fansItem">
                    <image class="fansBg" src="../../images/fans_bg.png" />
                    <image class="topThreeIcon" qq:if="{{item.topThree}}" src="{{item.topIcon ? item.topIcon : ''}}" />
                    <image class="fansAvatar" src="{{item.fans_avatar ? item.fans_avatar : '../../images/icon_avatar.png'}}" />
                    <view class="fansName">{{item.fans_name}}</view>
                    <view class="powerWrapper textLeft">
                        <view class="voteWrapper">
                            <image class="poworIcon" src="../../images/powerIcon2x.png" />
                            <view class="power">{{item.fans_votes}}</view>
                        </view>
                        <view class="closeWrapper">
                            <image class="closenessIcon" src="../../images/icon_heartbeat.png" />
                            <view class="closenessTxt">{{item.fans_closeness}}%</view>
                        </view>
                    </view>
                    <view class="rankNum {{item.topThree ? 'rankNumTop' : ''}}">{{item.fans_no}}</view>
                </view>
            </block>
        </view>
        <view class="mySelfWrapper fansItem">
            <image class="myBg" src="../../images/self_bg.png" />
            <image class="topThreeIcon" qq:if="{{self.topThree}}" src="{{self.topIcon ? self.topIcon : ''}}" />
            <image class="fansAvatar" src="{{self.current_avatar ? self.current_avatar : '../../images/icon_avatar.png'}}" />
            <view class="fansName">{{self.current_name}}</view>
            <view class="powerWrapper textLeft">
                <view class="voteWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{self.current_votes ? self.current_votes:0}}</view>
                </view>
                <view class="closeWrapper">
                    <image class="closenessIcon" src="../../images/icon_heartbeat.png" />
                    <view class="closenessTxt">{{self.current_closeness}}%</view>
                </view>
            </view>
            <view class="rankNum {{self.topThree ? 'rankNumTop' : ''}}">{{self.current_no ? self.current_no : "暂无"}}</view>
        </view>
    </scroll-view>
    <view class="votePopWrapper" bindtap="closePop" hidden="{{!showVotePop}}"> </view>
    <view class="votePop" qq:if="{{showVotePop}}">
        <view class="voteBlock">
            <view class="errorTxt" hidden="{{!showErrorPop}}">{{errorTxt}}</view>
            <view class="voteInputWrapper">
                <image class="minusBtn btnFun" src="../../images/icon_minus_btn.png" catchtap="calculateFun" data-type="1" />
                <view class="inputWrapper">
                    <input class="voteInput" value="{{voteNum}}" type="number" bindinput="bindInputFun" />
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                </view>
                <image class="addBtn btnFun" src="../../images/icon_add_btn.png" catchtap="calculateFun" data-type="2" />
            </view>
            <view class="voteBottom">
                <view class="myNum">我的助力值: {{fansInfo.votes_left}}</view>
                <image class="poworIcon" src="../../images/powerIcon2x.png" />
                <view class="btn btn-yellow assist {{showErrorPop ? 'btn-gray':''}}" catchtap="assistBtn">助力</view>
            </view>
        </view>
        <view class="missionWrapper">
            <view class="getMoreTxt">想获得更多助力值？</view>
            <!-- <view class="missionItem">
                <image class="corner" src="../../images/starCorner2x.png" />
                <view class="missionTxt">
                    看视频+200
                    <image class="powerIcon" src="../../images/powerIcon2x.png" />
                </view>
                <view class="btn btn-yellow goWatch">去观看</view>
            </view> -->
            <view class="missionItem">
                <image class="corner" src="../../images/starCorner2x.png" />
                <view class="missionTxt">
                    邀请好友+500
                    <image class="powerIcon" src="../../images/powerIcon2x.png" />
                </view>
                <view class="btn btn-yellow goWatch" catchtap="goInvite">去邀请</view>
            </view>
            <view class="missionItem checkins">
                <image class="corner" src="../../images/starCorner2x.png" />
                <view class="missionTxt">
                    连续签到，有收获！
                </view>
                <view class="btn btn-yellow goWatch" qq:if="{{!todayCheck}}" catchtap="checkInFun">签到</view>
                <view class="isCheckIn goWatch" qq:else>已签到</view>
                <view class="checkinsWrapper">
                    <block qq:for="{{checkInsList}}" qq:for-item="item" qq:key="index">
                        <view class="checkinsItem {{item.isCkeck ? 'checkinsItemActive':''}}">
                            <view>{{item.dayName}}</view>
                            <view>{{item.getNum}}</view>
                        </view>
                    </block>
                </view>
            </view>
        </view>
    </view>
    <!-- 提示框 -->
    <view class="votePopWrapper" bindtap="closePop" hidden="{{!showPrompt}}"></view>
    <view class="promptPop" hidden="{{!showPrompt}}">
        <image class="promptBg" src="../../images/icon_prompt_bg.png" />
        <image class="promptIcon" hidden="{{promptType != 1}}" src="../../images/icon_success.png" />
        <image class="promptIcon" hidden="{{promptType != 0}}" src="../../images/icon_fail.png" />
        <view class="promptTxtWrapper">
            <view class="promptTxt">{{promptTxt}}</view>
            <image class="poworIcon" hidden="{{!isVote}}" src="../../images/powerIcon2x.png" />
        </view>
    </view>
    <view class="getUserInfo" qq:if="{{!hasUserInfo}}">
        <view class="getUserInfoWrapper">
            <image class="getUserInfoBg" src="../../images/bg_empower.png" />
            <view class="getInfoTxt">为你的偶像助力星运，来，开始助力吧~</view>
            <button class="getInfoBtn" qq:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">点击授权</button>
            <view qq:else>请升级QQ版本</view>
        </view>
    </view>
</view>
