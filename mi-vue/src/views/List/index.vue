<template>
	<div class="page-container">
		<div class="page-top">
			<div class="page-header">
				<i class="iconfont icon-back"></i>
				<input class="search" type="text" name="" id="" value="" />
				<i class="iconfont icon-listview" @click="changeClass=!changeClass"></i>
			</div>
			<div class="page-choose">
				<li @click="changeOrderDir"> <i class="iconfont icon-paixu"></i> </li>
				<li data-orderCol="sale" @click="changeOrderCol('sale')" :class="{active:orderCol==='sale'}"> 销量 </li>
				<li data-orderCol="price" @click="changeOrderCol('price')" :class="{active:orderCol==='price'}"> 价格 </li>
				<li data-orderCol="rate" @click="changeOrderCol('rate')":class="{active:orderCol==='rate'}"> 评价 </li>
			</div>
		</div>
		<div class="outlist-box" ref="scroll">
			<div class="scroll-content" >
				<ul :class="{ page_list:changeClass,page_newList:!changeClass }" class="listBox">
					<li v-for="item in listMain" :key="item.id">
						<router-link :to="`/detail/${item.id}`">
							<img :src="item.avatar">
							<div class="list-name">
								<span v-text="item.name"></span>
								<span v-text="`￥${item.price}`"></span>
								<p>
									<span v-text="`已有${item.rate}条评论`"></span>
									<span v-text="`销量:${item.sale}`"></span>
								</p>
							</div>

						</router-link>
					</li>
				</ul>
				<p v-text="info" class="info"></p>
			</div>
		</div>
	</div>
</template>

<script>
	import IScroll from "iscroll/build/iscroll-probe";
	import imagesLoaded from "imagesloaded"

	export default{
	        name:"List",
                data: function() {
                        return {
                                name: '',
                                orderCol: "price",
                                orderDir: "asc",
                                pageSize: 6,
                                hasMore: true,           //标识当前还有没有更多数据可供加载
                                listMain: [],                   //当前显示的商品数据
                                changeClass:true,        //切换卡片样式
	                        isloading:false,                        //标识当前是否有ajax请求未完成，处于加载状态
	                        isTriggerLoadMore:false  ,              //标识有没有触发加载更多

                        }
                },
		computed:{
	                info(){
	                        if(this.isloading) return "加载中...";
	                        else if(this.isTriggerLoadMore) return "放手立即加载";
	                        else if(this.hasMore) return "上拉加载更多";
	                        else if(this.listMain.length===0) return "暂无相关商品，敬请期待";
	                        else return "已到达底部...";
	                }
		},
                methods: {
                        sendAxios( isloadMore = false ) {
                                if( !isloadMore ) this.listMain=[];
                               this. isloading = true;
                               this.$http({
                                       method: "post",
                                       url: "/product/list",
	                               data:{
                                               name: this.name,
                                               cid: parseInt(this.$route.params.cid),
                                               orderCol: this.orderCol,
                                               orderDir: this.orderDir,
                                               begin: isloadMore? this.listMain.length:0,
                                               pageSize:this.pageSize
	                               }
                               },false)
	                               .then( data => {
                                               this.listMain = this.listMain.concat(data);
                                               this. isloading = false;
                                               this.hasMore=data.length === this.pageSize;
	                               } )
	                                //then函数一定会返回一个promise对象，如果then里面的参数函数没有返回一个promise对象，而是
	                                //个值，then就会自己封装一个成功的promise对象并携带这个值
	                                //如果参数函数返回的是一个promise对象，则then就返回promise返回的对象，自己不再构造参数返回
//	                                .then( response => {
//	                                        return new Promise( (resolve,reject) => {
//	                                                setTimeout( () => {
//	                                                        resolve(response);
//	                                                },1000);
//	                                        } );
//	                                } )

                        },

	                changeOrderCol(col){
                                if(this.isloading){
                                        this.$notice("亲，您的操作过于频繁");
	                                return;
                                }
                                this.orderCol=col;
                                this.sendAxios();
	                },
	                changeOrderDir(){
                                if(this.isloading){
                                        this.$notice("亲，您的操作过于频繁");
	                                return;
                                }
                                this.orderDir =   this.orderDir === "asc"? "desc": "asc";
                                this.sendAxios();
	                },
                        initOrRefreshScroll(){
                                //iscroll规定在调用new IScroll代码时必须保证股吧定区域安全渲染完毕
	                        //且滚动内容比滚动容器宽或高
	                        this.$nextTick( () => {
	                                imagesLoaded(this.$refs.scroll,() => {
	                                        this.$nextTick( () => {
	                                                if(!this.scroll){
	                                                        this.scroll = new IScroll(this.$refs.scroll,{
	                                                                click:true,                  //开启iscroll的点击事件，默认是停掉的
	                                                                deceleration:0.003,  //设置iscroll滚动的阻尼系数
	                                                                bounce:false,           //关闭iscroll的边界回弹效果
	                                                                probeType:2,             //开启iscroll的滚动监听，监听等级2
	                                                        });
	                                                        this.scroll.on("scroll",() => {
									if( this.isloading || !this.hasMore ) return;
									this.isTriggerLoadMore = this.scroll.y===this.scroll.maxScrollY;
	                                                        });
	                                                        this.scroll.on("scrollEnd",() =>{
									if( this.isTriggerLoadMore ){
									        this.isTriggerLoadMore = false;
									        this.sendAxios(true);
									}
	                                                        });
	                                                }else{
	                                                        this.scroll.refresh();
	                                                }
	                                        } )
	                                })
	                        } )
                        }
                },
		watch:{
                        changeClass(){
	                        this.initOrRefreshScroll();
	                },
	                listMain(){
	                        this.initOrRefreshScroll();
	                }
		},
                created: function() {
                        this.sendAxios();
                },
		beforeDestroy(){
	                //页面销毁前释放iscroll实例（instance）对象占用的内存
	                this.scroll.destroy();
	                this.scroll = null;
		}
	};
</script>

<style scoped>
	.info{
		color: #666;
		font-size:12px;
		text-align: center;
	}
	.page-container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.page-top{
		height: 80px;
		display: flex;
		flex-direction: column;
	}
	.page-header{
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-between;
		padding-top: 10px;
		padding-left: 10px;
		padding-right: 20px;
		box-sizing: border-box;
	}
	.page-header .search{
		width: 60%;
		outline: none;
		border-radius: 20px;
	}
	.page-choose{
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-around;
		line-height: 40px;
	}
	.icon-paixu{
		font-size: 20px !important;
	}
	.icon-listview {
		font-size: 32px !important;
	}
	.icon-back {
		font-size: 32px !important;
	}
	.outlist-box{
		overflow: hidden;    /*iscroll插件要求*/
		width: 100%;
		height: 100%;
		touch-action:pan-y;  /* 消除iscroll滚动的警告*/
	}
	.page_list{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.page_list li{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.page_list li a{
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		color: #888;
	}
	.page_list li a img{
		width: 126px;
		height: 126px;
		margin-right: 10px;
	}
	.page_list li a div{
		width: calc(100% - 136px);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.page_list li a p{
		width: 100%;
		white-space:nowrap;
		overflow: hidden;
		text-overflow:ellipsis;
	}
	.page_list div>span:nth-child(1){
		width:80%;
		font-size: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.page_list div>span:nth-child(2){
		font-size: 20px;
		color: #f00;
	}
	/* 改变样式 */
	.page_newList{
		flex: 1;
		overflow: auto;
		background: #eee;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		width: 100%;
	}
	.page_newList li {
		width: 171px;
		height: 240px;
		display: flex;
		justify-content: center;
	}
	.page_newList li a{
		width: 90%;
		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 12px;
		background: #fff;
		margin: 8px 0;
		border-radius: 5%;
		color: #888;
	}
	.page_newList a img{
		width: 126px;
		height: 126px;
	}
	.page_newList li a div{
		width: 126px;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.page_newList p{
		display:flex;
		flex-direction: column;
		align-items: center;
	}
	.page_newList div>span:nth-child(1){
		width: 90%;
		font-size: 15px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.page_newList div>span:nth-child(2){
		font-size: 20px;
		color: #f00;
	}
	.active{
		color: #FF0000;
	}
</style>