<script setup>
	import { ref } from "vue"
	const formRef = ref()
	const formData = ref({
		username: '',
		code: '',
		password: '',
		qrpassword: ''
	});
	const formRules = ref({
		username: {
			rules: [{required: true,errorMessage: '请输入手机号'}]
		},
		code: {
			rules: [{required: true,errorMessage: '请输入短信验证码'}]
		},
		password: {
			rules: [{required: true,errorMessage: '请输入6-16位密码'}]
		},
		qrpassword: {
			rules: [{required: true,errorMessage: '请再次输入密码'}]
		}
	});
	const loading = ref(false);
	const formSubmit = async () => {
		if (loading.value === true) {
			return;
		}
		try{
			const res = await formRef.value.validate();
			console.log('表单数据信息：', res);
			uni.redirectTo({
			  url: '/pages/user/login/login',
			})
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
		<view class="user-title">注册</view>
		<view class="user-subtitle">
			<view>已有账号？</view>
			<navigator class="nav" url="/pages/user/login/login" >立即登录</navigator>
		</view>
		
		<view class="user-form">
			<uni-forms ref="formRef" :modelValue="formData" :rules="formRules">
				<uni-forms-item label="" name="username">
					<uni-easyinput type="text" v-model="formData.username" placeholder="请输入手机号"  />
				</uni-forms-item>
				<uni-forms-item label="" name="code">
					<uni-easyinput type="text" v-model="formData.code" placeholder="请输入短信验证码" >
						<template #right>
							<button class="uni-btn uni-btn-mini" type="default" size="mini">发送验证码</button>
						</template>
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="" name="password">
					<uni-easyinput type="password" v-model="formData.password"  placeholder="请输入6-16位密码" />
				</uni-forms-item>
				<uni-forms-item label="" name="qrpassword">
					<uni-easyinput type="password" v-model="formData.qrpassword"  placeholder="请再次输入密码" />
				</uni-forms-item>
			</uni-forms>
		</view>
		
		
		<view class="user-btn">
			<button type="warn" class="btn" @click="formSubmit" :loading="loading" :disabled="loading">注册</button>
		</view>
	</view>
</template>

<style>

</style>
