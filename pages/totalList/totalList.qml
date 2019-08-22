<view class="totalList container">
    <image class="bg" src="../../images/bg3.jpg" />
    <scroll-view scroll-y class="scrollWrapper" bindscrolltolower="loadMore">
        <navigator class="searchBtn" url="../searchList/searchList">
            <image class="searchIcon" src="../../images/searchIcon2x.png" />
            搜索
        </navigator>
        <view class="horo-wrapper">
            <view class="horoName">{{titleInfo.monthName}}</view>
            <view class="howLong">(时间：{{titleInfo.timeLong}})</view>
            <navigator class="rule-wrapper" url="../rulePage/rulePage">
                榜单规则
                <image src="../../images/point2x.png" class="rule-icon" />
            </navigator>
        </view>
        <view class="duration">
            本期倒计时：{{countDown}}
        </view>
        <view class="rankListWrapper" qq:if="{{hasDate}}">
            <view class="firstIdol topWrapper" data-idolId="{{firstIdol.star_id}}" bindtap="goIdolDetail">
                <image class="topBg" src="../../images/1.png" />
                <image class="topAvatar" src="{{firstIdol.star_avatar}}" />
                <image class="topHoro" src="{{firstIdol.smallImg}}" />
                <view class="idolName">{{firstIdol.star_name}}</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{firstIdol.star_votes}}</view>
                </view>
                <view class="btn btn-yellow assistBtn" data-idolId="{{firstIdol.star_id}}" catchtap="assistPopFun">助力</view>
            </view>
            <view class="secondIdol topWrapper" data-idolId="{{secondIdol.star_id}}" bindtap="goIdolDetail">
                <image class="topBg" src="../../images/2.png" />
                <image class="topAvatar" src="{{secondIdol.star_avatar}}" />
                <image class="topHoro" src="{{secondIdol.smallImg}}" />
                <view class="idolName">{{secondIdol.star_name}}</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{secondIdol.star_votes}}</view>
                </view>
                <view class="btn btn-yellow assistBtn" data-idolId="{{secondIdol.star_id}}" catchtap="assistPopFun">助力</view>
            </view>
            <view class="thirdIdol topWrapper" data-idolId="{{thirdIdol.star_id}}" bindtap="goIdolDetail">
                <image class="topBg" src="../../images/3.png" />
                <image class="topAvatar" src="{{thirdIdol.star_avatar}}" />
                <image class="topHoro" src="{{thirdIdol.smallImg}}" />
                <view class="idolName">{{thirdIdol.star_name}}</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{thirdIdol.star_votes}}</view>
                </view>
                <view class="btn btn-yellow assistBtn" data-idolId="{{thirdIdol.star_id}}" catchtap="assistPopFun">助力</view>
            </view>
            <view class="rankList">
                <block qq:for="{{idolList}}" qq:for-item="item" qq:key="index">
                    <view class="rankItem" data-idolId="{{item.star_id}}" bindtap="goIdolDetail">
                        <image class="rankBottom" src="../../images/rankBottom2x.png"></image>
                        <view class="rankNum">{{index+4}}</view>
                        <image class="rankAvatar" src="{{item.star_avatar}}" />
                        <view class="idolInfoWrapper">
                            <view class="idolInfo">
                                <image class="rankHoro" src="{{item.smallImg}}" />
                                <view class="rankName">{{item.star_name}}</view>
                            </view>
                            <view class="powerWrapper textLeft">
                                <image class="poworIcon" src="../../images/powerIcon2x.png" />
                                <view class="power">{{item.star_votes}}</view>
                            </view>
                        </view>
                        <view class="btn btn-yellow assistListBtn" data-idolId="{{item.star_id}}" catchtap="assistPopFun">助力</view>
                    </view>
                </block>
            </view>
        </view>
    </scroll-view>
    <view class="votePopWrapper" bindtap="closePop" hidden="{{!showVotePop}}"> </view>
    <view class="votePop" hidden="{{!showVotePop}}">
        <view class="voteBlock">
            <view class="errorTxt" hidden="{{!showErrorPop}}">您的助力值不足，请先查看</view>
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
                    邀请好友+1000
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
        <image class="promptBg" src="../../images/icon_prompt_bg.png"/>
        <image class="promptIcon" hidden="{{promptType != 1}}" src="../../images/icon_success.png"/>
        <image class="promptIcon" hidden="{{promptType != 0}}" src="../../images/icon_fail.png"/>
        <view class="promptTxtWrapper">
            <view class="promptTxt">{{promptTxt}}</view>
            <image class="poworIcon" hidden="{{!isVote}}" src="../../images/powerIcon2x.png" />
        </view>
    </view>
</view>
