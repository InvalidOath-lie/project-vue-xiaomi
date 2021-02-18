<template>
	<div >
		<button :disabled="count===1" @click.prevent="decreaseHandler">-</button>		<!-- 只能用于表单元素，v-model也只能用于表单元素 -->
		<span v-text="count"></span>
		<button :disabled="count === maxCount" @click.prevent="increaseHandler">+</button>  <!-- maxCount只有在传的一瞬间使用max-count -->
	</div>
</template>

<script>
        export default{
                name:"MiCount",
                props:{			//用于组件对外公开属性，父组件可以用对外公开放入属性向当前组件传值
                        count:{
                                type:Number,   //数值类型
                                required:true	//要求必须传
                        },
                        maxCount:{
                                type:Number,
                                default:5 	//默认值是5
                        }
                },
                methods:{
                        increaseHandler(){
                                this.$emit("increase");
                                this.$emit("update:count",this.count + 1);
                        },
                        decreaseHandler(){
                                this.$emit("decrease");
                                this.$emit("update:count",this.count - 1);
                        }
                }
        };
</script>

<style>

</style>