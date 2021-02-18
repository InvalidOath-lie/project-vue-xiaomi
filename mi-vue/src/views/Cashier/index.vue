<template>
	<div class="page-container">
		<div class="page-header">
			<i class="iconfont icon-back goback"> </i>
			<span>有品收银台</span>
			<p></p>
		</div>
		<div class="page-content">
			<div class="price">
				<span>￥</span>
				<span v-text="total"></span>
				<span>.00</span>
			</div>
			<div class="payWay">
				<div>
					<img src="./pay_alipay.png">
					<span>支付宝</span>
					<input type="radio" name="pay" checked/>
				</div>
				<div>
					<img src="./pay_mipay.png">
					<span>小米钱包</span>
					<input type="radio" name="pay"/>
				</div>
			</div>

		</div>
		<div class="page-footer">
			<div class="pay" @click="pay">
				确认支付￥<span v-text="total"></span>.00
			</div>

		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                name: "Cashier",
                data(){
                        return {
                                number: this.$route.query.data,
	                        total:0
                        }
                },
	        created(){
                        this.$http({
	                        url:"/order/account/" + this.number
                        })
	                        .then( data => {
	                                this.total = data;
	                        })
	        },
	        methods:{
			pay(){
			        this.$http({
				        url:"/order/pay/" + this.number
			        })
				        .then( data => {
                                                layer.open({
                                                        content: '支付成功'
                                                        ,skin: 'msg'
                                                        ,time: 2 //2秒后自动关闭
                                                });
                                                setTimeout(() => {
                                                        this.$router.push( "/myorder" )
                                                },2000)
				        } )
			}
	        }

        };
</script>

<style scoped>
	body {

	}

	.page-container {
		background: #eee;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.icon-back {
		font-size: 30px !important;
	}

	.page-header {
		width: 100%;
		height: 10%;
		display: flex;
		align-items: center;
		background: #fff;
	}

	.page-header span {
		flex: 1;
		font-size: 20px;
		display: flex;
		justify-content: center;
	}

	.page-header p {
		width: 30px;
	}

	.page-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.page-content img {
		width: 30px;
		height: 30px;
	}

	.price {
		height: 20%;
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.price span {
		color: #f00;
	}

	.price span:nth-child(2) {
		font-size: 25px;
	}

	.payWay {
		width: 90%;
		background: #fff;
		padding: 0 5px;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.payWay div {
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;

	}

	.payWay div span {
		flex: 1;
	}

	.page-footer {
		height: 16vw;
		display: flex;
		justify-content: center;
		padding: 2vw;
		box-sizing: border-box;
		background: #fff;
	}

	.pay {
		display: flex;
		height: 100%;
		width: 60%;
		background: #FD482C;
		border-radius: 30px;
		justify-content: center;
		align-items: center;
		font-size: 15px;
		color: #fff;
	}
</style>