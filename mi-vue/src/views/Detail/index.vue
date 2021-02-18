<template>
	<div class="page-container-all" ref="columnScroll" @scroll="scrolls">
		<div class="page-header1" v-show="shows">
			<img class="backImg" src="./icon_arrow_left_circle_gray.png">
			<img src="./icon_more_solidgray3.png">
		</div>
		<div class="page-header" v-show="!shows">
			<i class="iconfont icon-back backImg"></i>
			<div id="page-header-list">
				<span>商品</span>
				<span>评价</span>
				<span>详情</span>
				<span>推荐</span>
			</div>
			<i class="iconfont icon-ellipsis2"></i>
		</div>
		<div class="page-content">
			<div class="container">
				<div class="scroll-container" ref="scroll">
					<ul class="scroll-content" ref="scrollContent">
						<li><img :src="banner[banner.length-1]"/></li>
						<li v-for="(item,i) in banner" :key="i">
							<img :src="item"/>
						</li>
						<li><img :src="banner[0]"/></li>
					</ul>
				</div>
			</div>
			<div class="page-price"></div>
			<div class="blank"></div>
			<div class="page-choose">
				<span class="choosed">已选</span><span class="one"> 1件 </span>
				<i class="iconfont icon-arrow-right"></i>
			</div>
			<div class="sendTo">
				<span class="choosed">送至</span><input class="receiveRegion regions-picker"
				                                      placeholder="北京市朝阳区"/>
				<i class="iconfont icon-arrow-right"></i>
			</div>
			<div class="page-detail">
				<div class="goodDetail" style="text-align: center"> 商品详情 </div>
				<div v-for="item in others">
					<li><img :src="item"/></li>
				</div>
			</div>
			<div class="page-footer">
				<div class="mi">
					<img src="./mi_shop_icon.png"/>
					<span>小米</span>
				</div>
				<router-link :to="`/Cart`">
					<div class="cart" >
						<img src="./icon_shop_cart.png"/>
						<span>购物车</span>
						<div v-text="cartTotal"></div>
					</div>
				</router-link>

				<div class="pay">
					<div class="pay1" @click="layers" > 加入购物车 </div>
					<div class="pay2"> 立即购买 </div>
				</div>
			</div>
		</div>
		<div class="page-layer" v-show="layerShow" @click.self="layerShow = false">
			<div class="page-layer-bottom">
				<div class="goodMess">
					<div class="page-layer-img">
						<img  :src="avatar" />
					</div>
					<div class="page-layer-price">
						<span v-text="price"></span>
					</div>
				</div>
				<div class="numberFar">
					<div class="number">
						<span >数量</span>
						<div class="goodsNum">
							<mi-count :count.sync="count" ></mi-count>
						</div>
					</div>
				</div>
				<div class="confirm" @click="confirm"> 确定 </div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import IScroll from "iscroll";
        import imagesLoaded from "imagesloaded";
        import MiCount from "../../components/mi-count";

        export default {
                name: "Detail",
	        components:{
                  "mi-count":MiCount
	        },
                data(){
                        return {
                                product: {},
                                banner: [],
                                others: [],
                                shows: true,
	                        layerShow:false,
	                        pointShow:false,
	                        avatar:"",
	                        price:"",
	                        count:1,
	                        id :this.$route.params.id,
				cartTotal:0
                        }
                },
                methods: {
                        scrolls(){
                                if(this.$refs.columnScroll.scrollTop > this.$refs.columnScroll.scrollWidth) this.shows = false;
                                else this.shows = true;
                        },
                        layers(){
                                this.layerShow = true;
                        },
                        increaseHandler(){

                        },
                        decreaseHandler(){

                        },
	                confirm(){
                                this.layerShow = false;
                                this.$http({
                                        method:"post",
	                                url:'/cart/add/',
	                                data:{
                                                pid: this.id,
                                                count: this.count
	                                }
                                })
	                                .then( data => {
                                                layer.open({
                                                        content: '添加成功'
                                                        ,skin: 'msg'
                                                        ,time: 2 //2秒后自动关闭
                                                });
                                                this.cartTotal = this.cartTotal + this.count;
	                                } )

	                }
                },
                created(){
                        this.$http({url: "/product/model/" + this.id})
                                .then(product =>{
                                        this.product = product;
                                        this.avatar = this.product.avatar;
                                        this.price = this.product.price;
                                        this.banner = this.product.bannerImgs.split(",");
                                        this.others = this.product.otherImgs.split(",");
                                })
			this.$http({ url:"/cart/total" })
				.then(data => {
				        if(data) {
                                                this.cartTotal = data;
				        }


				})
                },
                watch: {
                        banner(){
                                this.$refs.scrollContent.style.width = (this.banner.length + 2) + "00%";
                                this.$nextTick(() =>{
                                        imagesLoaded(this.$refs.scrollContent, () =>{
                                                this.$nextTick(() =>{
                                                        this.scroll = new IScroll(this.$refs.scroll, {
                                                                scrollY: false,   //关闭默认的纵向滚动
                                                                scrollX: true,  //开启横向滚动
                                                                snap: true,    //开启轮播图模式滚动（开启对齐模式）
                                                                momentum: false,     //关闭惯性滚动
                                                        });
                                                        this.scroll.on("scrollStart", () => clearTimeout(this.timer));
                                                        this.scroll.on("scrollEnd", () =>{
                                                                this.scroll.disable();      //开启禁用
                                                                if(this.scroll.currentPage.pageX === 0)
                                                                        this.scroll.goToPage(this.banner.length, 0, 0);

                                                                else if(this.scroll.currentPage.pageX === (this.banner.length + 1 ))
                                                                        this.scroll.goToPage(1, 0, 0);

                                                                else{
                                                                }
                                                                this.scroll.enable();       //取消禁用
                                                                this.timer = setTimeout(() => this.scroll.next(), 3000);
                                                        });
                                                        //因为做了无缝所以默认显示最后一张，要初始化滚到第二张
                                                        this.scroll.goToPage(1, 0, 0);
                                                        this.timer = setTimeout(() => this.scroll.next(), 3000);
                                                })
                                        })
                                })
                        }
                }
        };
</script>

<style scoped>
	.page-container-all {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.page-header1 {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 100;
	}
	.page-header1 img:nth-child(1) {
		width: 60px;
		height: 60px;
	}
	.page-header1 img:nth-child(2) {
		width: 40px;
		height: 40px;
	}
	.page-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background: #EFEFF0;
		display: flex;
		padding: 15px;
		box-sizing: border-box;
		justify-content: space-between;
	}
	.icon-back, .icon-ellipsis2 {
		font-size: 24px !important;
	}
	.page-header-list {
		flex: 1;
		display: flex;
		justify-content: space-around;
	}
	.page-header-list span {
		display: inline-block;
		margin: 0 20px;
	}
	.page-content {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.blank {
		width: 100%;
		height: 5px;
		background: #eee;
		margin-top: 10px;
	}
	.page-price {
		width: 100%;
		color: rgb(180, 115, 31);
	}
	.page-price {
		margin-top: 5px;
	}
	.page-choose {
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;
	}
	.one {
		margin-left: 15px;
		flex: 1;
	}
	.sendTo {
		padding: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;
	}
	.sendTo input {
		outline: none;
		flex: 1;
		border: none;
		margin-left: 15px;
	}
	.goodDetail {
		height: 15vw;
		font-size: 20px;
		line-height: 15vw;
	}
	.page-detail img {
		width: 100%;
		display: block;
	}
	.page-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 8%;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
		box-sizing: border-box;
	}
	.page-footer img {
		width: 25px;
		height: 25px;

	}
	.mi {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
	}
	.cart {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
	}
	.cart div {
		position: absolute;
		right: 3px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #f00;
		display: flex;
		justify-content: center;
		color: #fff;
	}
	.pay {
		display: flex;
		flex: 4;
		justify-content: space-around;
		height: 60%;
	}
	.pay1 {
		display: flex;
		height: 100%;
		background: #E8C168;
		border-top-left-radius: 19px;
		border-bottom-left-radius: 19px;
		color: #fff;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.pay2 {
		display: flex;
		height: 100%;
		background: #FF0000;
		border-top-right-radius: 19px;
		border-bottom-right-radius: 19px;
		color: #fff;
		flex: 1;
		justify-content: center;
		align-items: center;
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
		flex-direction: column;
		bottom: 0;
		width: 100%;
		height: 65%;
		background: #fff;
		z-index: 1;
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
		overflow: hidden;
	}
	div.goodMess {
		width: 100%;
		height: 20%;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.page-layer-img img {
		width: 102px;
		height: 102px;
	}
	.page-layer-price {
		flex: 1;

	}
	.page-layer-price span {
		font-size: 20px;
		display: inline-block;
		color: rgb(180, 115, 31);
	}
	.numberFar {
		flex: 1;
	}
	div.number {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}
	.goodsNum {
		background: #ddd;
		border-radius: 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.goodsNum div{
		width:100px;
		height:50px;
	}
	.goodsNum div button{
		width:50px;
		height:50px;
	}


	.confirm {
		width: 70%;
		height: 13vw;
		background: #f00;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 30px;
		font-size: 20px;
		align-self: center;
		margin-bottom: 10px;
	}

	.container {
		width: 100%;
	}

	.scroll-container {
		width: 100%;
		overflow: hidden;
		touch-action: pan-x;
	}

	ul.scroll-content {
		white-space: nowrap;
		font-size: 0;
	}

	ul.scroll-content li {
		display: inline-block;
		width: 100vw;
	}

	ul.scroll-content li img {
		width: 100%;
	}
</style>