<script setup>
	import { ref } from "vue"
	import { setToken } from "@/utils/localToken.js"
	import { login } from "./server.js"
	const formRef = ref()
	const formData = ref({
		username: '',
		password: ''
	});
	const formRules = ref({
		username: {
			rules: [
				{required: true, errorMessage: '请输入账号'}
			]
		},
		password: {
			rules: [
				{required: true, errorMessage: '请输入密码'}
			]
		}
	});
	const loading = ref(false);
	const formSubmit = async () => {
		if (loading.value === true) {
			return;
		}
		try{
			await formRef.value.validate();
			try{
				const response = await login(formData.value);
				const data = response.data || {};
				setToken(data.token || "");
				uni.showToast({ title: "登录成功"});
				uni.redirectTo({
					url: '/pages/member/index/index'
				});
			}catch(e){
				console.log('错误信息：', e);
				const data = e.data || {};
				const errMsg = data.msg || e.errMsg || '服务器错误';
				uni.showToast({
				  title: errMsg,
				  icon: 'none'
				})
			}
		}catch(err){
			//TODO handle the exception
			console.log('表单错误信息：', err);
		}
	}
	
	// 点击导航栏左侧图标
	const clickNavBarLeft = () => {
		uni.redirectTo({
		  url: '/pages/index/index',
		})
	}
</script>
<template>
	<view class="user-layout">
		<uni-nav-bar  :border="false" :fixed="true"  status-bar  left-icon="closeempty" @clickLeft="clickNavBarLeft"/>
		<view class="user-title">密码登录</view>
		<view class="user-subtitle">
			<view>没有账号？</view>
			<navigator class="nav" url="/pages/user/register/register" >立即注册</navigator>
		</view>
		
		<view class="user-form">
			<uni-forms ref="formRef" :modelValue="formData" :rules="formRules">
				<uni-forms-item label="" name="username">
					<uni-easyinput type="text" v-model="formData.username" placeholder="请输入账号 admin or user"  />
				</uni-forms-item>
				<uni-forms-item label="" name="password">
					<uni-easyinput type="password" v-model="formData.password"  placeholder="请输入密码 123456" />
				</uni-forms-item>
			</uni-forms>
		</view>
		
		
		<view class="user-btn">
			<button type="warn" class="btn" @click="formSubmit" :loading="loading" :disabled="loading">登录</button>
		</view>
	</view>
</template>

<style>

</style>
