<script setup>
import { reactive, ref } from "vue"
import { useUserStore } from "@/stores/user";
import { removeToken } from "@/utils/localToken.js";
import { trim } from "@/utils/trim.js"

const userStore = useUserStore();

// 数据
const info = reactive({
	name: "张三",
	sex: "0",
	birthday: "2022-12-01",
	phone: "13413141314",
	email: "xxxxxx@xx.xx",
});

// 姓名编辑弹框
const nameDialogRef = ref();
const nameDialog = reactive({
	value:  '',
	onOpen: () => {
		nameDialog.value = info.name;
		nameDialogRef.value?.open();
	},
	onClose: () => {
		nameDialogRef.value?.close();
	},
	onConfirm: async (value) => {
		const val = trim(value);
		if(val === '') {
			uni.showToast({
			  title: "姓名不能为空",
			  icon: 'none'
			})
			return;
		}
		info.name = value;
		
		nameDialogRef.value?.close();
	}
	
});

// 性别选择
const sexArr = ['男','女']
const sexChange = async (e) => {
	info.sex = e.detail.value;
}

// 生日选择
const birthdayChange = async (e) => {
	info.birthday = e.detail.value;
}

// 退出
const logout = () => {
	removeToken();
	userStore.reset();
	uni.redirectTo({
	  url: '/pages/user/login/login',
	})
};
</script>
<template>
	<layout-security>
		<view class="uni-mb-4">
			<uni-list >
				<uni-list-item showArrow title="姓名" :right-text="info.name" clickable @click="nameDialog.onOpen" ></uni-list-item>
				<picker  :value="info.sex" :range="sexArr" @change="sexChange">
					<uni-list-item showArrow title="性别" :right-text="sexArr[info.sex]" ></uni-list-item>
				</picker>
				<picker mode="date" :value="info.birthday"  @change="birthdayChange">
					<uni-list-item showArrow title="生日" :right-text="info.birthday"></uni-list-item>
				</picker>
			</uni-list>
		</view>
		
		<view class="uni-mb-4">
			<uni-list>
				<uni-list-item showArrow title="手机" :right-text="info.phone" ></uni-list-item>
				<uni-list-item showArrow title="邮箱" :right-text="info.email" ></uni-list-item>
			</uni-list>
		</view>
		
		<view class="uni-mb-4">
			<uni-list>
				<uni-list-item showArrow title="登录密码" rightText="去设置" ></uni-list-item>
				<uni-list-item showArrow title="支付密码" rightText="去设置" ></uni-list-item>
			</uni-list>
		</view>
		
		<view class="uni-mb-4">
			<button  class="btn" type="default" @click="logout">退出</button>
		</view>
		
		<!-- 姓名编辑 -->
		<uni-popup ref="nameDialogRef" type="dialog">
			<uni-popup-dialog 			 
			    mode="input" 
			    :value="nameDialog.value"
				placeholder="请输入内容" 
				title=" "
				before-close
				@close="nameDialog.onClose"
				@confirm="nameDialog.onConfirm">
		    </uni-popup-dialog>
		</uni-popup>
		
		
		
	</layout-security>
</template>

<style lang="scss" scoped>
	.btn {
		background-color: #fff;
		font-size: 14px;
		line-height: 3;
		border-radius: 0;
	}
</style>
