<script>
	/**
	 * @description page-loading 页面级 loading
	 * @author LiQingSong
	 */
	export default {
		name:"page-loading",
		// (微信小程序、支付宝小程序)将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		}
	}
</script>
<template>
	<view class="ft-page-loading">
		<spin size="lg"></spin>
	</view>
</template>



<style lang="scss" scoped>
.ft-page-loading {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100px;
}
</style>
