<view class="userCenter container">
    <image class="bg" src="../../images/bg2.jpg" />
    <scroll-view scroll-y class="scrollWrapper">
        <view class="userCard">
            <image class="userCardBg" src="../../images/myInfoBg.png" />
            <image class="userAvatar" src="{{fansInfo.fans_avatar ? fansInfo.fans_avatar : '../../images/icon_avatar.png'}}" />
            <view class="username">昵称：{{fansInfo.fans_name}}</view>
            <view class="editWrapper" bindtap="editPop">
                <image class="editName" src="../../images/editIcon2x.png" />
            </view>
        </view>
        <view class="voteWrapper">
            <view class="voteItem">
                <view class="voteTitle">剩余星力</view>
                <view class="powerWrapper">
                    <image class="poworIcon" src="../../images/powerIcon2x.png" />
                    <view class="power">{{fansInfo.votes_left}}</view>
                </view>
            </view>
            <view class="voteItem">
                <view class="voteTitle">贡献星力</view>
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
            <view>星力明细</view>
        </view>
        <view class="contact">
            <text selectable="true">客服QQ：3476347242</text>
        </view>
        <view class="goPay" bindtap="goPay">
            <text selectable="true">充 值</text>
        </view>
        <view class="missionWrapper">
            <view class="getMoreTxt">想获得更多星力？</view>
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
                <view class="btn btn-yellow goWatch" bindtap="goInvite">去邀请</view>
            </view>
            <view class="missionItem checkins">
                <image class="corner" src="../../images/starCorner2x.png" />
                <view class="missionTxt">
                    连续签到，有收获！
                </view>
                <view class="btn btn-yellow goWatch" qq:if="{{!todayCheck}}" bindtap="checkInFun">签到</view>
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
    </scroll-view>
    <!-- 提示框 -->
    <view class="votePopWrapper" bindtap="closePop" hidden="{{!showPrompt}}"></view>
    <view class="promptPop" hidden="{{!showPrompt}}">
        <image class="promptClose" bindtap="closePop" src="../../images/icon_closePop.png" />
        <image class="promptBg" src="../../images/icon_prompt_bg.png" />
        <view hidden="{{popType == 1}}" style="position: relative;">
            <view class="inputWrapper">
                <input class="inputBar" value="{{nickname}}" bindinput="bindInputFun" maxlength="20" />
                <view class="inputPrompt">(20个字)</view>
            </view>
            <view class="buttonWrapper">
                <view class="cancelBtn" bindtap="closePop">取消</view>
                <button class="commitBtn" bindtap="confirmFun">确定</button>
            </view>
        </view>
    </view>
    <prompt-pop qq:if="{{showPop}}" pop-param="{{popParam}}" bind:closePop="closePop"></prompt-pop>
    <!-- 授权框 -->
    <view class="getUserInfo" qq:if="{{!hasUserInfo}}">
        <view class="getUserInfoWrapper">
            <image class="getUserInfoBg" src="../../images/bg_empower.png" />
            <view class="getInfoTxt">为你的偶像助力星运值，来，开始助力吧~</view>
            <button class="getInfoBtn" qq:if="{{canIUse}}" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">点击授权</button>
            <view qq:else>请升级QQ版本</view>
        </view>
    </view>
</view>
