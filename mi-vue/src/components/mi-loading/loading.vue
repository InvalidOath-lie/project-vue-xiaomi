<template>
	<div class="loading">
		<p>loading...</p>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
	        name:"MiLoading",
		data(){
	                return {
				name:"MiLoading"
	                }
		}
	};
</script>

<style scoped>
	.loading{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		z-index:1000;
		background-color: rgba(0,0,0,0.5);

	}
	.loading p{
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		color:#fff;
	}
</style>