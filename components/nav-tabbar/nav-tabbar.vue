<script>
	/**
	 * @description nav-tabbar 平台公共底部主导航
	 * @author LiQingSong
	 */
	export default {
		name:"nav-tabbar",
		// (微信小程序、支付宝小程序)将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		}
	}
</script>
<script setup>	
	const props = defineProps({
		index: {
			type: Number,
			default: -1
		},
	});
</script>
<template>
	<tabbar>
		<tabbar-item text="首页" icon="home" :is-active="props.index === 0" url="/pages/index/index" ></tabbar-item>
		<tabbar-item text="我的" icon="person" :is-active="props.index === 1" url="/pages/member/index/index" ></tabbar-item>
	</tabbar>
</template>
<style lang="scss">
	
</style>