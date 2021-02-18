<template>
	<div class="log_container">
		<h1>欢迎登录小米有品</h1>
		<div v-show="loginMode">
			<input type="text" placeholder="请输入用户名" v-model="name">
			<input type="text" placeholder="请输入密码" v-model="pwd">
			<button @click="loginPwd">登录</button>
		</div>
		<div v-show="!loginMode">
			<input type="text" placeholder="请输入手机号">
			<input type="text" placeholder="请输入验证码">
			<button type="button" @click="loginPhone">登录</button>
		</div>
		<div>
			<button type="button" @click="loginMode = !loginMode" v-text="loginMode ? '手机验证码登录':'用户名密码登录'">手机验证码登录</button>
		</div>

	</div>
</template>

<script>
	import axios from 'axios';
	export default{
	        name:"Login",
                data:function(){
                        return {
                                loginMode:true,
                                name:"",
                                pwd:""
                        };
                },
                methods:{
                        loginPhone(){    //当键是一个函数时,冒号和function可以简写成()
                                alert("手机验证码登录功能暂未开放，请使用用户名密码登录")
                        },
                        loginPwd(){
                                this.$http({
                                        method:"post",
                                        url:"/user/login_pwd",
                                        data: {
                                                name:this.name,
                                                pwd:this.pwd
                                        }
                                })
	                                .then( data => {
                                                sessionStorage.setItem("token",data);
                                                sessionStorage.setItem("name",this.name);
                                                this.$router.replace(this.$route.query.to || "/Category");
	                                }  )

//                                                                case 401:
//                                                                        sessionStorage.removeItem("token");
//                                                                        sessionStorage.removeItem("name");
//                                                                        this.$router.replace({ path:"/login" ,query:{ to:this.$route }});
//                                                                        break;

                        }

                }
	};
</script>

<style scoped>
	.log_container{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		background: url(./imgback.png) no-repeat center center;
		background-size: cover;
	}
	.log_container h1{
		font-size: 24px;
		color: #333;
		padding: 60px 10px 0;
	}
	.log_container>div{
		width: 90%;
	}
	.log_container>div input{
		outline: none;
		border: none;
		border-bottom: 1px solid #ECECEC;
		display: block;
		width: 100%;
		height: 67px;
		padding: 20px 10px;
		box-sizing: border-box;
		background: rgba(0,0,0,0);
	}
	.log_container button{
		height: 47px;
		margin-top: 20px;
		margin-bottom: 10px;
		outline: none;
		display: block;
		border: none;
		font-size: 17px;
		font-weight: bold;
		border-radius: 20px;
		color: #fff;
		background: #D5AD72;
	}
	.log_container>div>button{
		width: 90%;
	}
	.log_container>button{
		width: 85%;
	}

</style>