import { request } from '@/utils/request.js'

/**
 * @description 登录
 * @param {Object} params {username: string;password: string;}
 * @returns Promise
 */
export async function login(params) {
	return request({
		url: "/user/login",
		method: "POST",
		data: params,
	});
}