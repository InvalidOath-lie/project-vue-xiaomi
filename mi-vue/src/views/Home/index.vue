<template>
	<div class="page">
		<div class="page-header">
			<img src="./image/image1/有品.png"><input />
		</div>
		<div class="page-center">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide"><img src="./image/image1/swiper1.png"></div>
					<div class="swiper-slide"><img src="./image/image1/swiper2.png"></div>
					<div class="swiper-slide"><img src="./image/image1/swiper3.png"></div>
					<div class="swiper-slide"><img src="./image/image1/swiper4.png"></div>
					<div class="swiper-slide"><img src="./image/image1/swiper5.png"></div>
				</div>
			</div>
			<div class="element">
				<ul class="element1">
					<li> <img src="./image/image1/tit1.png" /> <span>上新精选</span></li>
					<li> <img src="./image/image1/tit2.png" > <span>小米众筹</span> </li>
					<li> <img src="./image/image1/tit3.png" > <span>有品秒杀</span></li>
					<li> <img src="./image/image1/tit4.png" > <span>热销排行</span></li>
					<li> <img src="./image/image1/tit5.png" > <span>小米自营</span></li>
				</ul>
				<ul class="element2">
					<li> <img src="./image/image1/tit6.png" > <span>下单立返</span> </li>
					<li> <img src="./image/image1/tit7.png" > <span>9.9包邮</span></li>
					<li> <img src="./image/image1/tit8.png" > <span>有品直播</span></li>
					<li> <img src="./image/image1/tit9.png" > <span>小米庄园</span></li>
					<li> <img src="./image/image1/tit10.png" > <span>智能生活</span></li>
				</ul>
			</div>
			<div class="page-img">
				<ul>
					<li> <img src="./image/image1/ttt1.png" > </li>
					<li> <img src="./image/image1/ttt2.png" > </li>
					<li> <img src="./image/image1/ttt3.png" > </li>
					<li><img src="./image/image1/ttt4.png" > </li>
				</ul>
				<ul>
					<li> <img src="./image/image1/ttt5.png" > </li>
					<li> <img src="./image/image1/ttt6.png" > </li>
					<li> <img src="./image/image1/ttt7.png" > </li>
					<li> <img src="./image/image1/ttt8.png" > </li>
				</ul>
			</div>
		</div>
		<div class="page-footer">
			<mi-nav></mi-nav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import MiNav from '../../components/mi-nav';

	export default {
	        name:"Home",
		components:{
	                "mi-nav":MiNav
		},
		data(){
	                return {
	                        i : 1
	                }
		},
		//创建
		beforeCreate(){
		        //无法使用this关键字
		        console.log("组件创建前调用了beforeCreate");
		},
		created(){
		        this.$confirm("下课吗?")
			        .then( () => {
                                        this.$alert('是的')
			        } )

                        console.log("组件创建后调用了beforeCreate");
		},
		//挂载
		beforeMount(){
                        console.log("组件挂载前调用了beforeCreate");
		},
		mount(){
                        console.log("组件挂载后调用了beforeCreate");
		},
		//更新
		beforeUpdate(){
                        console.log("组件更新前调用了beforeCreate");
		},
		update(){
                        console.log("组件更新后调用了beforeCreate");
		},
		//销毁
		beforeDestroy(){
                        console.log("组件销毁前调用了beforeCreate");
		},
		destroy(){
		        //没有this关键字
                        console.log("组件销毁后调用了beforeCreate");
		},
	};
</script>

<style scoped>
	.page{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.page-header{
		width: 100%;
		height: 9%;
		background: #845D32;
		display: flex;
		padding: 0 10px;
		box-sizing: border-box;
		align-items: center;
		flex-shrink: 0;
	}
	.page-header img{
		width: 36px;
		height: 28px;
		margin-right: 10px;
	}
	.page-header input{
		height: 32px;
		flex: 1;
		border-radius: 20px;
		outline: none;
	}
	.swiper-container {
		width: 100%;
		height: 160px;
	}
	.swiper-wrapper{
		width: 100%;
		height:160px;
	}
	.swiper-slide img{
		width: 100%;
		height: 160px;
	}
	.page-center{
		flex: 1;
		overflow: auto;
	}
	.element{
		background: #FFF5F3;
		height: 187px;
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.element span{
		font-size: 12px;
	}
	.element1{
		display: flex;
		justify-content: space-around;
	}
	.element1 img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-bottom: 5px;
	}
	.element li{
		display: flex;
		flex-direction: column;
	}
	.element2{
		display: flex;
		justify-content: space-around;
	}
	.element2 img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-bottom: 5px;
	}
	.page-img{
		width: 100%;
	}
	.page-img img{
		width: 85px;
		height: 104px;
	}
	.page-img ul{
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.page-img ul li{
		width: 20%;
	}
	.selected {
		margin: 10px 0;
	}
	.selected .container {
		margin: 10px;
		background-color: white;
		border-radius: 10px;
	}
	.selected-title {
		padding: 10px;
		font-size: 18px;
		font-weight: 700;
	}
	.selected .container ul {
		padding: 10px 0 10px 10px;
		overflow: auto;
		white-space:nowrap;
	}
	.selected .container ul li {
		width: 24.8vw;
		display: inline-block;
	}
	.selected .container ul li:nth-child(1) {
		background-color: rgb(237, 246, 248);
	}
	.selected .container ul li:nth-child(2) {
		background-color: rgb(252, 247, 241);
	}
	.selected .container img {
		width: 24.8vw;
		height: 24.8vw;
	}
	.selected .container .words {
		width: 24.8vw;
		height: 9.333333vw;
		font-size: 12px;
		color: rgb(51, 51, 51);
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.page-footer{
		width: 100%;
		height: 9%;
		flex-shrink: 0;
	}
	iframe{
		width: 100%;
		height: 100%;
		border: none;
	}
</style>