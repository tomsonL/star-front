<view class="subList container">
    <image class="bg" src="../../images/bg3.jpg" />
    <scroll-view scroll-top="{{scrollTop}}" scroll-y class="scrollWrapper" bindscrolltolower="loadMore">
        <navigator class="searchBtn" url="../searchList/searchList">
            <image class="searchIcon" src="../../images/searchIcon2x.png" />
            搜索
        </navigator>
        <view class="horo-wrapper">
            <image class="horoIcon" src="{{titleInfo.img}}" />
            <view class="horoInfoWrapper">
                <view class="horoName">{{titleInfo.monthName}}明星榜单</view>
                <view class="howLong">({{titleInfo.timeLong}})</view>
                <view class="duration">
                    本期倒计时：{{countDown}}
                </view>
            </view>
            <view style="clear: both"></view>
            <navigator class="rule-wrapper" url="../rulePage/rulePage">
                榜单规则
                <image src="../../images/point2x.png" class="rule-icon" />
            </navigator>
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
                <view
                    class="btn btn-yellow assistBtn"
                    qq:if="{{isThisMonth}}"
                    data-idolId="{{firstIdol.star_id}}"
                    data-idolName="{{firstIdol.star_name}}"
                    data-star_avatar="{{firstIdol.star_avatar}}"
                    catchtap="assistPopFun"
                    >助力</view
                >
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
                <view
                    class="btn btn-yellow assistBtn"
                    qq:if="{{isThisMonth}}"
                    data-idolId="{{secondIdol.star_id}}"
                    data-idolName="{{secondIdol.star_name}}"
                    data-star_avatar="{{secondIdol.star_avatar}}"
                    catchtap="assistPopFun"
                    >助力</view
                >
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
                <view
                    class="btn btn-yellow assistBtn"
                    qq:if="{{isThisMonth}}"
                    data-idolId="{{thirdIdol.star_id}}"
                    data-idolName="{{thirdIdol.star_name}}"
                    data-star_avatar="{{thirdIdol.star_avatar}}"
                    catchtap="assistPopFun"
                    >助力</view
                >
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
                        <view
                            class="btn btn-yellow assistListBtn"
                            qq:if="{{isThisMonth}}"
                            data-idolId="{{item.star_id}}"
                            data-idolName="{{item.star_name}}"
                            data-star_avatar="{{item.star_avatar}}"
                            catchtap="assistPopFun"
                            >助力</view
                        >
                    </view>
                </block>
            </view>
        </view>
        <view class="noMore" hidden="{{hasMore}}">没有更多了~</view>
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
