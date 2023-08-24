<script>
	/**
	 * @description tabbar 底部导航栏
	 * @author LiQingSong
	 */
	export default {
		name:"tabbar",
		// (微信小程序、支付宝小程序)将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		},
		// (H5、APP、微信小程序)向子组件注入
		provide() {
			return {
				tabbar: this
			}
		},
	}
</script>
<script setup>	
	const props = defineProps({
		// 跳转方式navigateTo、redirectTo、reLaunch、switchTab
		openType: {
			type: String,
			default: "redirectTo"
		},
		activeColor: {
			type: String,
			default: "#c82519"
		},
		inactiveColor: {
			type: String,
			default: "#7d7e80"
		},
	});
</script>
<template>
	<view class="tabbar">
		<view class="tabbar-content">
			<view class="tabbar-content-item-box">
				<slot />
			</view>
			<safe-area-bottom></safe-area-bottom>
		</view>
		<view class="tabbar-placeholder"></view>
		<safe-area-bottom></safe-area-bottom>
	</view>
</template>
<style lang="scss">
	.tabbar {
		display: flex;
		flex-direction: column;
		.tabbar-placeholder{
			height: 50px;
		}
		.tabbar-content {
			display: flex;
			flex-direction: column;
			flex: 1;
			position: fixed;
			z-index: 999;
			bottom: 0;
			left: 0;
			right: 0;
			box-sizing: border-box;
			border-top: solid 0.5px #dadbde;
			background-color: #fff;
			
			.tabbar-content-item-box {
				height: 50px;
				display: flex;
				flex-direction: row;
			}
		}
	}
</style>