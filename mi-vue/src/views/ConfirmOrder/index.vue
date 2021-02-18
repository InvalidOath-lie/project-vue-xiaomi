<template>
	<div class="body">
		<div class="page-container">
			<div class="page-header">
				<i class="iconfont icon-back"></i>
				<span>确认订单</span>
				<span class="edit"></span>
			</div>
			<div class="page-content">
				<div class="address" @click="addressGet">
					<div>
						<span v-text="address.receiveName"></span>
						<span v-text="address.receivePhone"></span>
					</div>
					<div>
						<span v-text="address.receiveRegion"></span>
						<span v-text="address.receiveDetail"></span>
					</div>
					<span></span>
				</div>
				<ul class="goodList">
					<li v-for="item in order">
						<img :src="item.avatar"/>
						<div class="briefOname">
							<span v-text="item.name"></span>
							<span v-text="item.price"></span>
						</div>
						<span v-text="`×${item.count}`"></span>
					</li>
				</ul>
			</div>

			<div class="page-footer">
				<div class="sum">
					<span>合计：￥</span>
					<span id="xianshi" style="color: #f00;" v-text="`${total}`">0.00</span>
				</div>
				<span @click="submit">提交订单</span>
			</div>
		</div>
		<div class="page-layer" v-show="show" @click.self="show=false">
			<div class="page-layer-bottom">
				<div class="chooseAddress">选择地址</div>
				<div class="addressList">
					<ul class="address-block">
						<li v-for="item in addressList" @click.stop="changeAddress(item.id)"
						    :key="item.id">
							<div>
								<span v-text="item.receiveName"></span>
								<span v-text="item.receivePhone"></span>
							</div>
							<div>
								<span v-text="item.receiveRegion"></span>
								<span v-text="item.receiveDetail"></span>
							</div>
						</li>
					</ul>
				</div>
				<div class="addAddress"> +添加地址 </div>
			</div>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
        export default {
                name: "ConfirmOrder",
                data(){
                        return {
                                show: false,
                                address: {},
                                arr: this.$route.params.arr.split('-'),
                                order: [],
                                addressList: {},
                                number: ""
                        }
                },
                computed: {
                        total(){
                                let result = 0;
                                this.order.forEach(item =>{
                                        result += item.count * item.price;
                                })
                                return result;
                        }
                },
                created(){
                        this.$http({
                                url: "/address/get_default"
                        })
                                .then(data =>{
                                        this.address = data;
                                });
                        this.$http({
                                method: "post",
                                url: "/cart/list_ids",
                                data: {
                                        "ids": this.arr
                                }
                        })
                                .then(data =>{
                                        this.order = data;
                                })

                },
                methods: {
                        addressGet(){
                                this.show = true;
                                this.$http({
                                        url: "/address/list"
                                })
                                        .then(data =>{
                                                this.addressList = data;
                                        })
                        },
                        changeAddress(id){
                                this.show = false;
                                this.$http({
                                        url: "/address/model/" + id
                                })
                                        .then(data =>{
                                                this.address = data;
                                        })
                        },
                        submit(){
                                this.$http({
                                        method: "post",
                                        url: "/order/confirm",
                                        data: {
                                                "ids": this.arr,
                                                "account": this.total,
                                                "addressId": this.address.id
                                        }
                                })
                                        .then(data =>{
                                                this.$router.push({path: "/cashier", query: {data}})
                                        })
                        }
                }
        };
</script>

<style scoped>
	.body {
		height: 100%;
		background: #F4F4F4;
	}

	.page-container {
		width: 100%;
		height: 100%;
		background: url(./bg_page_header.png) no-repeat;
		background-size: contain;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.page-header {
		width: 100%;
		height: 15%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;
		box-sizing: border-box;
		color: #fff;
		flex-shrink: 0;
	}

	.icon-back {
		font-size: 24px !important;
	}

	div.page-header span:nth-child(2) {
		font-size: 25px;
		font-weight: 800;
	}

	.page-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 70px;
	}

	.address {
		width: 95%;
		height: 85px;
		background: #fff;
		border-radius: 10px;
		display: flex;
	}

	.name div {
		margin: 0 10px;
	}

	.address-info div {
		margin: 0 2px;
	}

	.goodList {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.goodList img {
		width: 86px;
		height: 86px;
	}

	.goodList li {
		width: 90%;
		height: 110px;
		background: #fff;
		border-radius: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 10px 0;
		padding: 0 10px;
		box-sizing: border-box;
	}

	.briefOname {
		display: flex;
		flex-direction: column;
	}

	.page-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 10%;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2vw;
		box-sizing: border-box;
		font-size: 20px;
		flex-shrink: 0;
	}

	.sum {
		display: flex;
		justify-content: flex-end;
		padding: 0 10px;
	}

	.allChoose input {
		width: 20px;
		height: 20px;
	}

	.page-footer > span {
		width: 30%;
		height: 70%;
		background: #FD482C;
		color: #fff;
		text-align: center;
		line-height: 37px;
		border-radius: 20px;
		overflow: hidden;
	}

	.page-layer {
		position: fixed;
		z-index: 1;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		height: 100%;
	}

	.page-layer-bottom {
		position: fixed;
		display: flex;
		z-index: 100;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		bottom: 0;
		width: 100%;
		height: 65%;
		background: #fff;
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
	}

	.addressList {
		overflow: hidden;
		flex: 1;
	}

	.address-block {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
	}

	.address-block li {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		margin: 20px 0;
	}

	.address-block li input {
		width: 20px;
		height: 20px;
	}

	.address-block li > div {
		width: 80%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 10px;
	}

	.namePhone div:nth-child(1) {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.namePhone div:nth-child(2) {
		display: flex;
	}

	.address {
		margin-top: 10px;
	}

	.chooseAddress {
		font-size: 14px;
		font-weight: 800;
		color: #333;
		padding: 10px 0;
		flex-shrink: 0;
	}

	.addAddress {
		width: 70%;
		height: 11vw;
		background: #f00;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		font-size: 20px;
		align-self: center;
		flex-shrink: 0;
	}
</style>