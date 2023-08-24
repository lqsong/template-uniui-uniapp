<script>
	/**
	 * @description safe-area-bottom 底部安全区域，主要是针对IPhone X等一些底部带指示条的机型，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配。
	 * @author LiQingSong
	 */
	export default {
		name:"safe-area-bottom",
		// (微信小程序、支付宝小程序)将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		},
		data() {
			return {
				safeAreaBottomHeight: uni.getSystemInfoSync().safeAreaInsets.bottom + 'px'
			};
		}
	}
</script>
<template>
	<view :style="{ height: safeAreaBottomHeight }" class="safe-area-bottom">
		<slot />
	</view>
</template>

<style lang="scss" >
	.safe-area-bottom {
		height: 0px;
	}
</style>