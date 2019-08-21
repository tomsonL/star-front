<view class="userCenter container">
    <image class="bg" src="../../images/bg2.jpg" />
    <scroll-view scroll-y class="scrollWrapper">
        <view class="userCard">
            <image class="userCardBg" src="../../images/myInfoBg.png" />
            <image class="userAvatar" src="{{userInfo.avatarUrl}}" />
            <view class="username">昵称：{{userInfo.nickName}}</view>
            <image class="editName" src="../../images/editIcon2x.png" />
        </view>
        <view class="voteWrapper">
            <view class="voteItem">
                <view class="voteTitle">剩余神力</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{fansInfo.votes_left}}</view>
                </view>
            </view>
            <view class="voteItem">
                <view class="voteTitle">贡献神力</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{fansInfo.votes_spent}}</view>
                </view>
            </view>
            <view class="voteItem">
                <view class="voteTitle">连续签到</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{fansInfo.checkins}}</view>
                </view>
            </view>
        </view>
        <view class="voteDetail" bindtap="goVoteDetail">
            <view>神力明细</view>
        </view>
        <view class="contact" bindtap="callFun">
            <view>联系客服</view>
        </view>
        <view class="missionWrapper">
            <view class="getMoreTxt">想获得更多助力值？</view>
            <view class="missionItem">
                <image class="corner" src="../../images/starCorner2x.png" />
                <view class="missionTxt">
                    看视频+200
                    <image class="powerIcon" src="../../images/powerIcon2x.png" />
                </view>
                <view class="btn btn-yellow goWatch">去观看</view>
            </view>
            <view class="missionItem">
                <image class="corner" src="../../images/starCorner2x.png" />
                <view class="missionTxt">
                    邀请好友+1000
                    <image class="powerIcon" src="../../images/powerIcon2x.png" />
                </view>
                <view class="btn btn-yellow goWatch" bindtap="goInvite">去邀请</view>
            </view>
            <view class="missionItem checkins">
                <image class="corner" src="../../images/starCorner2x.png" />
                <view class="missionTxt">
                    连续签到，有收获！
                </view>
                <view class="btn btn-yellow goWatch" bindtap="checkInFun">签到</view>
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
    </scroll-view>
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
