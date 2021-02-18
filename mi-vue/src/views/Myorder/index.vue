<template>
	<div class="page-container">
		<div class="page-header">
			<i class="iconfont icon-back goback"> </i>
			<span>我的订单</span>
			<p></p>
		</div>
		<div class="page-center">
			<div :class="{active:number === 1}" @click="allOrder">全部</div>
			<div :class="{active:number === 2}" @click="paid">待付款</div>
			<div :class="{active:number === 3}" @click="received">待收货</div>
			<div :class="{active:number === 4}" @click="refund">退款订单</div>
			<div :class="{active:number === 5}" @click="got">已收货</div>
		</div>
		<div class="main">
			<div class="all"  v-if="list_all.length">
				<ul v-for="item in list_all">
					<li v-for="aa in item.details">
						<img :src="aa.avatar" />
						<div>
							<span v-text="aa.name"></span>
							<span v-text="aa.price"></span>
						</div>
						<div v-text="`×${aa.count}`"></div>
					</li>
					<div>
						<span v-text="`总金额:${item.account}`"></span>
					</div>
					<div>
						<span @click="removeOrder(item.orderId)">删除订单</span>
						<span class="buyAgain" v-text="number === 2?'立即支付': '再次购买'"></span>
					</div>
				</ul>
			</div>
			<p v-else>暂无相关订单</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name:"Myorder",
		data(){
	                return {
	                        number:1,
		                list_all:[],
	                }
		},
		created(){
		        this.$http({ url:"/order/list_all" })
			        .then( data => {
				        data.forEach( item => {
                                                this.list_all = data;
				        } )
				        console.log(this.list_all)
			        } );
		},
		methods:{
		        allOrder(){
		                this.number = 1;
                                this.$http({ url:"/order/list_all" })
                                        .then( data => {
                                                data.forEach( item => {
                                                        this.list_all = data;

                                                } )

	                                        console.log(this.list_all)
                                        } );
		        },
		        paid(){
		                this.number = 2;
		                this.list_all=[];
		                this.$http({ url:"/order/list_all" })
			                .then( data => {
			                        data.forEach( item => {
                                                        if( item.pay === 0 ){
                                                                this.list_all = this.list_all.concat(item);
                                                                if( this.list.length === 0 ){

                                                                }
                                                        }
			                        } )
			                        console.log(this.list_all)
			                } )
		        },
                        received(){
		                this.number = 3;
		                this.list_all =[];
                                this.$http({ url:"/order/list_pay" })
                                        .then( data => {
                                                this.list_all = data;
                                                console.log(this.list_all)
                                        } )
                        },
                        refund(){
                                this.number = 4;
                                this.list_all = [];
                        },
                        got(){
                                this.list_all = [];
                                this.number = 5;
                        },
                        removeOrder(orderId){
                                layer.open({
                                        content: '删除本条订单？？'
                                        ,btn: ['删除', '取消']
                                        ,yes: ( index => {
                                                this.$http({ url:"/order/remove/" +  orderId})
                                                        .then( data => {
								let i = this.list_all.findIndex( item =>  item.orderId === orderId );
								this.list_all.splice( i,1 )
                                                        })
                                                layer.close(index);
	                                } )
                                });

			}
		}
	};
</script>

<style scoped>
	.page-container{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.icon-back{
		font-size: 30px !important;
	}
	.page-header{
		width: 100%;
		height: 10%;
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}
	.page-header span{
		flex: 1;
		font-size: 20px;
		display: flex;
		justify-content: center;
	}
	.page-header p{
		width:30px;
	}
	.page-center{
		width: 100%;
		height: 5%;
		display: flex;
		justify-content: space-evenly;
		flex-shrink: 0;
	}
	.page-center div{
		width: 70px;
		height: 100%;
		border-radius: 20px;
		text-align: center;
		line-height: 30px;
	}
	.active{
		background: #DFB455;
		color: #fff;
	}
	.main{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.main>div{
		width: 100%;
		height: 100%;
		background: #F4F4F4;
	}
	.main>div li img{
		width: 90px;
		height: 90px;
	}
	.main>div{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.main>div>ul{
		width: 90%;
		margin: 10px auto;
		background: #fff;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
	}
	.main>div>ul span{
		font-size: 14px;
	}
	.main>div>ul>div:nth-child(3){
		height: 30%;
	}
	.main>div>ul li{
		width: 90%;
		display: flex;
		align-items: center;
		margin: 0 auto;
	}
	.main>div>ul li>div{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.main>div>ul li>div div:nth-child(2){
		display: flex;
		justify-content: space-between;
	}
	.name{
		font-size: 14px;
	}
	.price{
		display: flex;
		justify-content: flex-end;
		padding: 20px;
		box-sizing: border-box;
	}
	.delorpay{
		display: flex;
		justify-content: space-between;
		padding: 15px;
		box-sizing: border-box;
	}
	.buyAgain{
		border: 1px solid #E08C8C;
		border-radius: 20px;
		color: #E08C8C;
		padding: 5px;
	}
</style>