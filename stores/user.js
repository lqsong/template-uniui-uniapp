/**
 * @description 用户 store
 * @author LiQingSong
 */
import { defineStore } from 'pinia';
import { queryUserInfo } from "@/services/user.js"
import { ResultCodeEnum } from "@/config/enum.js"
export const useUserStore = defineStore('useUserStore', {
	state: () => {
		return {
			id: 0,
			name: "",
		};
	},
	getters: {
		// 是否登录
		isLogin({ id }) {
			return id > 0;
		},
	},
	actions: {
		/**
		 * @description 获取用户信息
		 * @returns result code 0 已登录并且获取用户信息成功,1 未登录, 2 后端返回的其他错误，999 服务器错误
		 */
		async getInfo() {
			const result = { code: 0, msg: "" };
			if (this.id > 0) {
				// 如果用户已经登录了，就不要请求了
				return result;
			}

			try {
				const response = await queryUserInfo();
				const data = response.data;
				this.id = data.id || 0;
				this.name = data.name || "";
			} catch (error) {
				console.log("error", error);
				const errMsg = error.errMsg;
				if (errMsg === "request:ok") {
					const response = error.data || { code: ResultCodeEnum.LOGININVALID, msg: "" };
					const { code, msg } = response;
					if (code === ResultCodeEnum.LOGININVALID) {
						// 登入信息失效
						result.code = 1;
					} else {
						result.code = 2;
					}
					result.msg = msg;
				} else {
					result.code = 999;
					result.msg = errMsg;
				}
			}
			return result;
		},
		/**
		 * @description 重置用户信息
		 */
		reset() {
			this.id = 0;
			this.name = "";
		},
	},
});
