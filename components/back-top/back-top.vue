<script>
	/**
	 * @description back-top 返回顶部
	 * @author LiQingSong
	 */
	export default {
		name:"back-top",
		// (微信小程序、支付宝小程序)将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		}
	}
</script>
<script setup>
import { computed } from "vue";	
	const props = defineProps({
		// 滚动距离
		scrollTop: {
			type: Number,
			default: 0
		},
		// 距离顶部多少距离显示
		top: {
			type: Number,
			default: 400
		},
		// 返回顶部滚动时间
		duration: {
			type: Number,
			default: 100
		},
		icon: {
			type: String,
			default: 'arrow-up'
		}
		
	});
	
	const emit = defineEmits([
		'click'
	])
	
	const styles = computed(()=> {
		return {
			bottom: '220rpx',
			right: '20rpx',
			width: '72rpx',
			height: '72rpx',
			position: 'fixed',
			zIndex: 999,
		};
	})
	
	const show = computed(()=> props.scrollTop > props.top);
	
	// 返回顶部
	const backToTop = () => {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: props.duration
		});
		
		emit('click')
	}
</script>
<template>
	<uni-transition mode-class="fade" :styles="styles" :show="show">
		<view class="back-top" @click="backToTop">
			<uni-icons :type="props.icon" size="20"></uni-icons>
		</view>
	</uni-transition>
</template>
<style lang="scss" scoped>
	.back-top {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 100% !important;
		background-color: #E1E1E1 !important;
		border-radius: 50%;
	}
</style>