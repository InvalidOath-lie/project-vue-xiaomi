<template>
	<div class="categoryContent">
		<div class="page-header">

		</div>
		<div class="categoryContain">

			<ul class="list-main">
				<li v-for="item in listMain" :key="item.id" :class="{ active: item.id===activeId }" @click="toggleId(item.id)">
					<span v-text="item.name"></span>
				</li>
			</ul>
			<div class="categoryRight">
				<img :src="avatar" />
				<ul class="list-sub" v-if="listSub.length">
					<li v-for="item in listSub" :key="item.id">
						<router-link :to="`/list/${item.id}`">
							<img :src="item.avatar">
							<span v-text="item.name"></span>
						</router-link>
					</li>
				</ul>
				<p v-else>暂无相关分类，敬请期待</p>
			</div>

		</div>
		<div class="page-footer">
			<mi-nav></mi-nav>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
	import MiNav from'../../components/mi-nav'

	export default {
	        name:"Category",
		components:{
	               "mi-nav": MiNav   //临时的名字
		},
                data: function() {
                        return {
                                listMain: [],
                                activeId: 0,
                                avatar: "",
                                listSub: []
                        }
                },
                methods: {
                        toggleId: function(id) {
                                console.log(id)
                                if (this.activeId === id) return;
                                this.activeId = id
                                this.avatar = this.listMain.find(item => item.id === id).avatar;
                                this.$http({ url: '/category/list/' + id })
	                                .then( data => {
                                                this.listSub = data;
	                                } )
                        }
                },
                created: function() {
                        //使用axios发送ajx请求一级分类的数据
	                this.$http({ url: "/category/list/0" },false)
		                .then( data => {
                                        this.listMain = data;
                                        this.toggleId(this.listMain[0].id)
		                } )
                }

        };
</script>

<style scoped>
	.categoryContent{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	.categoryContain{
		display: flex;
		flex: 1;
		align-items: stretch;
		border-top: 1px solid #b0b0b0;
		border-bottom: 1px solid #b0b0b0;
		overflow: hidden;
	}
	.page-header {
		height: 45px;
		flex-shrink: 0;
	}
	.categoryRight{
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}
	.categoryRight>img{
		width: 100%;
	}
	.categoryRight ul{
		flex: 1;
	}
	.categoryRight ul li{
		width: 33%;
		float: left;
	}
	ul.list-main{
		padding-top: 20px;
		overflow: auto;
	}
	ul.list-main li{
		width: 100%;
		height: 50px;
		text-align: center;
	}
	ul.list-main li span{
		display: inline-block;
		width: 74px;
		height: 24px;
		border-radius: 20px;
		font-size: 13px;
		text-align: center;
		line-height: 24px;
	}
	ul.list-main .active span{
		display: inline-block;
		width: 74px;
		height: 24px;
		border-radius: 20px;
		font-size: 13px;
		text-align: center;
		line-height: 24px;
		color: #fff;
		background: rgb(244,20,15);
	}
	ul.list-sub{
		flex-grow: 1;
		margin: 10px;
	}
	ul.list-sub li{
		width: 33.333333%;
		background: #fff;
		float: left;
		text-align: center;
	}
	ul.list-sub img{
		width: 79px;
		height: 76px;
	}
	ul.list-sub span{
		font-size: 11px;
		color: #666;
	}
	.page-footer {
		height: 50px;
		flex-shrink: 0;
	}
</style>