<script>
	/**
	 * @description spin loading图标。
	 * @author LiQingSong
	 */
	export default {
		name:"spin",
		// (微信小程序、支付宝小程序)将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		}
	}
</script>
<script setup>
	const props = defineProps({
		size: {
			type: String,
			default: "default"
		}
	});
</script>
<template>
	<view class="ft-spin" :class="{ lg: props.size === 'lg' }">
		<view class="ft-spin-dot">
			<view class="ft-spin-dot-item"></view>
			<view class="ft-spin-dot-item"></view>
			<view class="ft-spin-dot-item"></view>
			<view class="ft-spin-dot-item"></view>
		</view>
	</view>
</template>



<style lang="scss" scoped>
@keyframes ft-spin-move {
	to {
		opacity: 1;
	}
}

@keyframes ft-rotate {
	to {
		transform: rotate(360deg);
	}
}
.ft-spin {
	position: static;
	box-sizing: border-box;
	display: inline-block;
	padding: 0;
	margin: 0;
	font-size: 14px;
	font-feature-settings: "tnum";
	font-variant: tabular-nums;
	line-height: 1.5715;
	text-align: center;
	vertical-align: middle;
	opacity: 1;
	transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
	.ft-spin-dot {
		position: relative;
		display: inline-block;
		width: 1em;
		height: 1em;
		font-size: 20px;
		transform: rotate(0);
		animation: ft-rotate 1.2s infinite linear;
		.ft-spin-dot-item {
			position: absolute;
			display: block;
			width: 9px;
			height: 9px;
			background-color: var(--ft-color-primary);
			border-radius: 100%;
			opacity: 0.3;
			transform: scale(0.75);
			transform-origin: 50% 50%;
			animation: ft-spin-move 1s infinite linear alternate;
			&:nth-child(1) {
				top: 0;
				left: 0;
			}
			&:nth-child(2) {
				top: 0;
				right: 0;
				animation-delay: 0.4s;
			}
			&:nth-child(3) {
				right: 0;
				bottom: 0;
				animation-delay: 0.8s;
			}
			&:nth-child(4) {
				bottom: 0;
				left: 0;
				animation-delay: 1.2s;
			}
		}
	}
	&.lg {
		.ft-spin-dot {
			font-size: 32px;
			.ft-spin-dot-item {
				width: 14px;
				height: 14px;
			}
		}
	}
}
</style>