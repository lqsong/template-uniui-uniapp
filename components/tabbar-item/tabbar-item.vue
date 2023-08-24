<script>
	/**
	 * @description tabbar-item 底部导航栏 item
	 * @author LiQingSong
	 */
	export default {
		name:"tabbar-item",
		// (微信小程序、支付宝小程序)将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
		options: {
		    virtualHost: true
		},
		// (H5、APP、微信小程序)向子组件注入
		provide() {
			return {
				tabbarItem: this
			}
		}
	}
</script>
<script setup>	
    import {computed, inject, onMounted} from "vue"
	const props = defineProps({
		text: {
			type: String,
			default: ""
		},
		icon: {
			type: String,
			default: ""
		},	
		url: {
			type: String,
			default: ""
		},
		// 跳转方式navigateTo、redirectTo、reLaunch、switchTab
		openType: {
			type: String,
			default: ""
		},	
		isActive: {
			type: Boolean,
			default: false
		},
		activeColor: {
			type: String,
			default: ""
		},
		inactiveColor: {
			type: String,
			default: ""
		},
	});
	
	const emit = defineEmits([
		'click'
	])
	
	// 获取父组件注入值
	const tabbar = inject('tabbar', null)
	const localOpenType = computed(()=> props.openType ? props.openType : (tabbar && tabbar.openType ? tabbar.openType : 'redirectTo'))
	const localActiveColor = computed(()=>props.activeColor ? props.activeColor : (tabbar && tabbar.activeColor ? tabbar.activeColor : '#c82519') )
	const localInactiveColor = computed(()=>props.inactiveColor ? props.inactiveColor : (tabbar && tabbar.inactiveColor ? tabbar.inactiveColor : '#7d7e80') )
	
	// 跳转页面
	const openPage = () => {		
		if(props.isActive) {
			return;
		}
		
		emit('click');
		
		if(props.url) {
			// 执行类似uni.navigateTo的方法
			uni[localOpenType.value]({
				url: props.url
			})
		}
	}
</script>
<template>
	<view class="tabbar-item" :class="{'is-active': props.isActive}" @click="openPage">
		<slot name="icon">
			<uni-icons v-if="props.icon" :type="props.icon" :color=" props.isActive ? localActiveColor: localInactiveColor" size="20"></uni-icons>
		</slot>
		<slot>
			<text class="tabbar-item-text" :style="{'color': props.isActive ? localActiveColor: localInactiveColor}">{{props.text}}</text>
		</slot>
	</view>
</template>

<style lang="scss">
	.tabbar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		.tabbar-item-text {
			font-size: 12px;
		}
	}
</style>