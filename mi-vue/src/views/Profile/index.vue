<template>
	<div class="profile_login">
		<div class="profile-header" @click="login">
			<div>
				<!-- 1 -->
				<img id="per" src="./人、.png">
				<span v-html="name">请登录</span>

				<img id="jiantou" src="./箭头.png">
			</div>
			<div></div> <!-- 2 -->
		</div>
		<div class="profile-center">
			<div class="chuerzi2" @click="toMyorder">
				<!-- 3 -->
				<span>我的订单</span>
				<img class="jiantou" src="./箭头.png">
			</div>
			<div>
				<!-- 4 -->
				<li>
					<img src="./代付款.png">
					<span>待付款</span>
				</li>
				<li>
					<img src="./代付款.png">
					<span>待收货</span>
				</li>
				<li>
					<img src="./代付款.png">
					<span>评价</span>
				</li>
				<li>
					<img src="./代付款.png">
					<span>退款/售后</span>
				</li>
			</div>
			<div></div> <!-- 5 -->
			<div>
				<!-- 6 -->
				<li>
					<img src="./资产.png">
					<span>我的资产</span>
					<img class="jiantou" src="./箭头.png">
				</li>
				<li>
					<img src="./收藏.png">
					<span>我的收藏</span>
					<img class="jiantou" src="./箭头.png">
				</li>
				<li class="chuerzi">
					<img src="./地址.png">
					<span>地址管理</span>
					<img class="jiantou" src="./箭头.png">
				</li>
			</div>
			<div></div> <!-- 7 -->
			<div>
				<!-- 8 -->
				<li>
					<img src="./资产.png">
					<span>资质证照</span>
					<img class="jiantou" src="./箭头.png">
				</li>
				<li>
					<img src="./收藏.png">
					<span>协议规则</span>
					<img class="jiantou" src="./箭头.png">
				</li>
				<li>
					<img src="./地址.png">
					<span>帮助与反馈</span>
					<img class="jiantou" src="./箭头.png">
				</li>
			</div>
		</div>
		<div class="exit" @click="exit">退出</div>
		<div class="page-footer">
			<mi-nav></mi-nav>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import MiNav from  '../../components/mi-nav';

	export default {
	        name: "Profile",
		components:{
	                "mi-nav": MiNav
		},
                data: function() {
                        return {
                                name: '请登录'
                        };
                },
                methods: {
                        login: function() {
                                if (sessionStorage.getItem("token")) return;
                                this.$router.push({ path: "/login",query: { to: this.$route } })
                        },
                        exit: function() {
                                sessionStorage.clear();
                                this.name = "请登录";
                        },
                        toMyorder() {
                                if (sessionStorage.getItem("token")) {
                                        this.$router.push({ path: "/myorder" })
                                }else{
                                        layer.open({
                                                content: '请先登录'
                                                ,skin: 'msg'
                                                ,time: 2 //2秒后自动关闭
                                        });
                                        this.$router.push({ path: "/login",query: { to: this.$route } })
                                };
                                toAddress(){
                                        if (sessionStorage.getItem("token")) {
                                                this.$router.push({ path: "/myorder" })
                                        }else{
                                                layer.open({
                                                        content: '请先登录'
                                                        ,skin: 'msg'
                                                        ,time: 2 //2秒后自动关闭
                                                });
                                                this.$router.push({ path: "/address" })
                                        };
	                        }

                        },
                },
                created: function() {
                        if (sessionStorage.getItem("token")) {
                                this.name = sessionStorage.getItem("name");
                        }
                }
	};
</script>

<style scoped>
	.profile_login{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.profile_login .profile-header div:nth-child(1){
		width: 100%;
		height: 99px;
		background: url(./top.png);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 20px;
		box-sizing: border-box;
	}
	.profile_login .profile-header #per{
		width: 60px;
		height:60px;
		flex-shrink:0 ;
	}
	.profile_login .profile-header #jiantou{
		width: 18px;
		height:18px;
		flex-shrink:0 ;
	}
	.profile_login div .jiantou{
		width: 15px;
		height:15px;
	}

	.profile_login .profile-header span{
		display: inline-block;
		color: #ddd;
		flex-grow:1 ;
		margin-left: 10px;
	}
	.profile_login .profile-header>div:nth-child(2){
		height: 5px;
		background: #DDDDDD;
	}
	.profile_login .profile-center{
		flex-grow: 1;
	}
	.profile_login .profile-center>div:nth-child(1){
		height: 40px;
		border-bottom: 1px solid #DDDDDD;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 10px 0px 20px;
		box-sizing: border-box;
	}
	.profile_login .profile-center>div:nth-child(2){
		width: 100%;
		height: 67px;
		display: flex;
		align-items: center;
	}
	.profile_login .profile-center>div:nth-child(2) li img{
		width: 40px;
		height: 40px;
	}
	.profile_login .profile-center>div:nth-child(2) li span{
		font-size: 12px;
	}
	.profile_login .profile-center>div:nth-child(2) li{
		width: 25%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.profile_login .profile-center>div:nth-child(3){
		height: 5px;
		background: #DDDDDD;
	}
	.profile_login .profile-center>div:nth-child(4) li{
		width: 100%;
		height: 49px;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.profile_login .profile-center>div:nth-child(4) li img{
		width: 38px;
		height: 38px;
		flex-shrink: 0;
	}
	.profile_login .profile-center>div:nth-child(4) li .jiantou{
		width: 15px;
		height: 15px;
		flex-shrink: 0;
		padding-right: 10px;
	}

	.profile_login .profile-center>div:nth-child(4) li span{
		font-size: 14px;
		flex-grow: 1;
	}
	.profile_login .profile-center>div:nth-child(5){
		height: 5px;
		background: #DDDDDD;
	}
	.profile_login .profile-center>div:nth-child(6) li{
		width: 100%;
		height: 49px;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.profile_login .profile-center>div:nth-child(6) li img{
		width: 38px;
		height: 38px;
		flex-shrink: 0;
	}
	.profile_login .profile-center>div:nth-child(6) li .jiantou{
		width: 15px;
		height: 15px;
		flex-shrink: 0;
		padding-right: 10px;
	}
	.profile_login .profile-center>div:nth-child(6) li span{
		font-size: 14px;
		flex-grow: 1;
	}
	.exit{
		width: 70px;
		height: 50px;
		background: #eee;
		margin: 20px auto;
		text-align: center;
		line-height: 50px;
	}
	.page-footer{
		width: 100%;
		height: 50px;
		flex-shrink: 0;
	}
</style>