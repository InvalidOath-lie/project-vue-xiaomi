<template>
	<div class="body">

		<div class="page-container">
			<div class="page-header">
				<i class="iconfont icon-back"></i>
				<span>购物车</span>
				<span class="edit" v-text="isEdit?'完成':'编辑'" @click="isEdit=!isEdit"></span>
			</div>
			<ul class="cart-list" v-if="list.length">
				<li v-for="item in list" :key="item.id">
					<!--isEdit为假，第一个i先显示，-->
					<i class="checkbox" :class="{checked:item.checked1}" v-show="!isEdit"
					   @click="item.checked1 = !item.checked1"></i>
					<i class="checkbox" :class="{checked:item.checked2}" v-show="isEdit"
					   @click="item.checked2 = !item.checked2"></i>
					<div class="avatarBrief">
						<img :src="item.avatar"/>
						<div class="Brief">
							<span v-text="item.name"></span>
							<span v-text="`￥${item.price}`"></span>
						</div>
					</div>
					<mi-count :count.sync="item.count"
					          @increase="increaseHandler(item.id)"
					          @decrease="decreaseHandler(item.id)">
					</mi-count>
				</li>
			</ul>
			<div class="page-footer">
				<div class="allChoose">
					<i class="checkbox" :class="{checked:isAllCheck}" @click="toggleAllcheck"></i>
					<span>全选</span>
				</div>
				<div class="sum">
					<span>合计:</span>
					<span id="xianshi" style="color: #f00;" v-text="`￥${total}`">0</span><span
					style="color: #f00;">.00</span>
				</div>
				<router-link :to="`/ConfirmOrder/${waitConfirm}`" v-show="!isEdit">
					<span class="settlement" @click="settlement">结算</span>
				</router-link>
				<a v-show="isEdit" @click="removeId">
					<span class="settlement">删除</span>
				</a>


			</div>
		</div>

	</div>
</template>

<script type="text/ecmascript-6">
        import MiCount from '../../components/mi-count';

        export default {
                name: "Cart",
                components: {
                        "mi-count": MiCount
                },
                data(){
                        return {
                                list: [],
                                isEdit: false,
                                remove: [],
                                waitConfirm: ""
                        }
                },
                created(){

                        this.$http({
                                method: "post",
                                url: "/cart/list"
                        })
                                .then(data =>{
                                        data.forEach(item =>{
                                                item.checked1 = true;
                                                item.checked2 = false;
                                        })
                                        this.list = data;

                                });

                },
                computed: {
                        total: function(){
                                let result = 0;
                                this.list.forEach(item =>{
                                        if(item.checked1) result += item.count * item.price;
                                })
                                return result;
                        },
                        isAllCheck: function(){
                                if(this.isEdit){
                                        return this.list.every(item => item.checked2);
                                }else{
                                        return this.list.every(item => item.checked1);
                                }
                        }
                },
                methods: {
                        increaseHandler(id){
                                this.$http({
                                        method: "post",
                                        url: "/cart/increase/" + id
                                })
                                        .then(data =>{
                                                layer.open({
                                                        content: '添加数量成功'
                                                        , skin: 'msg'
                                                        , time: 2 //2秒后自动关闭
                                                });
                                        })
                        },
                        decreaseHandler(id){
                                this.$http({
                                        method: "post",
                                        url: "/cart/decrease/" + id
                                })
                                        .then(data =>{
                                                layer.open({
                                                        content: '减少数量成功'
                                                        , skin: 'msg'
                                                        , time: 2 //2秒后自动关闭
                                                });
                                        })
                        },
                        toggleAllcheck(){
                                var flag = this.isAllCheck;
                                this.list.forEach(item => item[this.isEdit?"checked2":"checked1"] = !flag)
                        },
                        removeId(){
                                for(let i = this.list.length - 1; i >= 0; i--){
                                        if(this.list[i].checked2){
                                                this.remove.push(this.list[i].id);
                                                this.list.splice(i, 1)
                                        }

                                }
                                this.$http({
                                        method: "post",
                                        url: "/cart/remove",
                                        data: {
                                                ids: this.remove
                                        }
                                })
                                        .then(data =>{

                                        })
                        },
                        settlement(){
                                let confirms = [];
                                this.list.forEach(item =>{

                                        if(item.checked1){
                                                confirms.push(item.id)
                                                this.waitConfirm = confirms.join('-');
                                        }
                                })
                        }
                }
        };
</script>


<style scoped>
	.body {
		height: 100%;
		background-color: #F4F4F4;
	}

	i.checkbox {
		display: inline-block;
		width: 24px;
		height: 24px;
		background-size: 100% 100%;
		background-image: url(./icon_checkbox_uncheck.png);
	}

	i.checkbox.checked {
		background-image: url(./icon_checkbox_check.png);
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
		font-size: 20px;
		font-weight: 800;
	}

	ul.cart-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 60px;
		overflow: auto;
	}

	ul.cart-list li {
		width: 95%;
		height: 125px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10px 10px 5px 15px;
		box-sizing: border-box;
		border-radius: 20px;
		margin: 10px 0;
	}

	ul.cart-list li input {
		width: 18px;
		height: 18px;
		align-self: center;
	}

	.avatarBrief > img {
		width: 86px;
		height: 86px;
	}

	.avatarBrief {
		flex: 1;
	}

	.avatarBrief {
		display: flex;
		align-items: center;
	}

	ul.cart-list li h1 {
		font-size: 20px;
		font-weight: normal;
	}

	ul.cart-list li h3 {
		font-size: 15px;
		font-weight: normal;
	}

	ul.cart-list li .nameBrief {
		align-self: center;
		flex: 1;
	}

	.Brief {
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
		flex: 1;
		display: flex;
		justify-content: flex-end;
		padding: 0 10px;
	}

	.page-footer > a {
		width: 30%;
		height: 70%;
		background: #FD482C;
		color: #fff;
		text-align: center;
		line-height: 37px;
		border-radius: 20px;
	}

	.page-footer > a span {
		width: 100%;
		height: 100%;
	}

	.non {
		display: none;
	}
</style>