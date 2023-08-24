/**
 * @description 公共user ajax
 * @author LiQingSong
 */
import { request } from '@/utils/request.js'

/**
 * @description 获取登录用户信息
 * @returns Promise
 */
export async function queryUserInfo() {
	return request({
		url: "/user/info",
		method: "get",
	});
}