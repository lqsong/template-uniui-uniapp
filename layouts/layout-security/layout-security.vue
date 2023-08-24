<script>
	/**
	 * @description layout-security 认证布局
	 * @author LiQingSong
	 */
	export default {
		name:"layout-security",
		// (微信小程序、支付宝小程序)将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		}
	}
</script>
<script setup>
	import { onMounted } from "vue";
	import { useUserStore } from "@/stores/user.js";
	import { loginInvalidJumpUrl } from '@/config/settings.js';
	const userStore = useUserStore();
	// 读取当前用户信息
	const getUser = async () => {
		const { code, msg } = await userStore.getInfo();
		if (code === 1) {
			// 未登录或登入信息失效
			uni.redirectTo({
			  url: loginInvalidJumpUrl,
			})
		} else {
			if (code !== 0) {
				// 没有获取用户信息成功
				console.log("error msg", msg);
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 3000
				});
			}
		}
	};
	onMounted(() => {
		getUser();
	});
</script>
<template>
	<template v-if="userStore.isLogin">
		<slot></slot>
	</template>
	<page-loading v-else></page-loading>
</template>

<style>

</style>
