/**
 * @description 站点配置
 * @author LiQingSong
 */

/**
 * @description 站点本地存储Token 的 Key值
 */
export const siteTokenKey = "template-uniui-uniapp-token";

/**
 * @description Ajax请求头发送Token 的 Key值
 */
export const ajaxHeadersTokenKey = "x-token";

/**
 * @description Ajax返回值不参加统一报错的api地址
 */
export const ajaxResponseNoVerifyUrl = [
	"/user/login", 
	"/user/info",
];

/**
 * @description 登录信息失效，跳转的url
 */
export const loginInvalidJumpUrl = "/pages/user/login/login";



