<view class="searchList container">
    <image class="bg" src="../../images/bg2.jpg" />
    <scroll-view scroll-top="{{scrollTop}}" scroll-y class="scrollWrapper" bindscrolltolower="loadMore">
        <view class="searchWrapper">
            <image class="searchIcon" src="../../images/searchIcon2x.png" />
            <input class="searchInput" auto-focus bindconfirm="bindConfirm" placeholder="为喜欢的爱豆助力" />
            <view class="cancelBtn" bindtap="cancelFun">取消</view>
        </view>
        <view class="rankList">
            <block qq:for="{{idolList}}" qq:for-item="item" qq:key="index">
                <view class="rankItem" data-idolId="{{item.star_id}}" bindtap="goIdolDetail">
                    <image class="rankBottom" src="../../images/searchItem2x.png"></image>
                    <view class="rankNum">{{item.star_no}}</view>
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
                    <view class="btn btn-yellow assistListBtn" data-idolId="{{item.star_id}}" data-idolName="{{item.star_name}}" data-star_avatar="{{item.star_avatar}}" catchtap="assistPopFun"
                        >助力</view
                    >
                </view>
            </block>
        </view>
        <view class="noMore" hidden="{{hasMore}}">没有更多了~</view>
    </scroll-view>
    <view class="votePopWrapper" bindtap="closePop" hidden="{{!showVotePop}}"> </view>
    <view class="votePop" hidden="{{!showVotePop}}">
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
            <form bindsubmit="assistSubmit" report-submit="true">
                            <view class="voteBottom">
                                <view class="myNum">我的星力: {{fansInfo.votes_left}}</view>
                                <image class="poworIcon" src="../../images/powerIcon2x.png" />
                                <!-- <button form-type="submit">Submit</button> -->
                                <button class="btn btn-yellow assist {{showErrorPop ? 'btn-gray':''}}" form-type="submit">助力</button>
                            </view>
                        </form>
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
    <prompt-pop qq:if="{{showPop}}" pop-param="{{popParam}}" bind:closePop="closePop" bind:shareFun="shareFun" bind:voteFun="voteFun"></prompt-pop>
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
