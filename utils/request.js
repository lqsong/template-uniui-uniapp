/**
 * @description 自定义 request 网络请求工具,基于uni.request
 * @author LiQingSong
 */
import qs from "qs";
import { isFunction, isExternal } from "@/utils/is.js";
import { getToken } from '@/utils/localToken.js';
import { ajaxHeadersTokenKey, ajaxResponseNoVerifyUrl, loginInvalidJumpUrl } from "@/config/settings.js";
import { ResultCodeEnum } from "@/config/enum.js"


/* ================ 自定义请求消除器 相关 S ======================= */

/**
 * @description 声明一个 Map 用于存储每个请求的标识 和 取消函数 Map<string, requestTask>
 */
const requestPendingMap = new Map();

/** 
 * @description 序列化配置参数，生成唯一请求标识url
 * @param {Object} config request参数 { method: string; url: string; data:Object; cancelerKey: number | string}
 * @returns string
 */
export function getRequestPendingUrl(config = {}) {
	config.method = config.method || 'GET';
	config.url = config.url || '';
	config.data = config.data || {};
	// config.cancelerKey 附加的参数，为了解决同一个链接同参数不同地方请求在同一页面调用冲突
	config.cancelerKey = config.cancelerKey || '1';
	
	return [config.method, config.url, qs.stringify(config.data), config.cancelerKey].join("++");
}

/**
 * @description 自定义请求消除器类
 */
export class RequestCanceler {
	
	/**
	 * @description 清空所有pending
	 * @returns void
	 */
	removeAllPending() {
		requestPendingMap.forEach((requestTask) => {
			requestTask.abort && isFunction(requestTask.abort) && requestTask.abort();
		});
		requestPendingMap.clear();
	}
	
	/**
	 * @description 移除请求
	 * @param {Object} config request参数 { method: string; url: string; data:Object; cancelerKey: number | string}
	 * @returns string 返回生成的RequestPendingUrl
	 */
	removePending(config) {
		const url = getRequestPendingUrl(config);
		if (requestPendingMap.has(url)) {
			// 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
			const requestTask = requestPendingMap.get(url);
			requestTask.abort && isFunction(requestTask.abort) && requestTask.abort();
			
			requestPendingMap.delete(url);
		}
		
		return url;
	}
	
	/**
	 * @description 添加请求
	 * @param {Object} config request参数 { method: string; url: string; data:Object; cancelerKey: number | string}
	 * @param {Object} requestTask uni.request 的 requestTask
	 * @returns void
	 */
	addPending(config, requestTask) {
		// 在请求开始前，对之前的请求做检查取消操作
		const url = this.removePending(config);
		
		if (!requestPendingMap.has(url)) {
			// 如果 pending 中不存在当前请求，则添加进去
			requestPendingMap.set(url, requestTask);
		}
	}
	
	/**
	 * @description: 重置
	 * @returns void
	 */
	reset() {
		requestPendingMap.clear();
	}
}

/**
 * @description 生成请求消除器
 */
export const requestCanceler = new RequestCanceler();

/* ================ 自定义请求消除器 相关 E ======================= */


/* ================ 自定义请求类 相关 S ======================= */

/**
 * @description 统一错误处理
 * @param {Object} response 服务器返回经过uni.request处理后的数据，包括响应状态(statusCode)、header、cookies、data等
 * @returns void
 */
function errorHandler(response, requestUrl) {
  const data = response.data || {};
  const { code, msg } = data;
  if(code) {
    const reqUrl = requestUrl.split("?")[0];
    const noVerifyBool = ajaxResponseNoVerifyUrl.includes(reqUrl);
    if (!noVerifyBool) { 
		// 不参加统一报错的api地址定义的变量中不存在当前请求的url 
		if (code === ResultCodeEnum.LOGININVALID) {
			// 登入信息失效
			// 跳转到对应页面
			uni.redirectTo({
			  url: loginInvalidJumpUrl,
			})
		} else {
			// 弹出报错
			uni.showToast({
			  title: msg || 'Error',
			  icon: 'none'
			})
		}
    }
  } else {	  
	  const errMsg = response.errMsg || '服务器错误';
	  if(errMsg !== 'request:fail abort') {
		  // 不是中断请求任务
		  // 再报错
		  uni.showToast({
		    title: errMsg,
		    icon: 'none'
		  })
	  }
  }
 
}

/**
 * @description ajax请求
 * @param {Object} config uni.request的参数(https://uniapp.dcloud.net.cn/api/request/request.html#request)，在此基础上扩展了 {cancelerKey: number | string; baseUrl:string}
 * @returns Promise
 */
export function request(config = {}) {
	/* 初始化参数 S */
	// 消除器key，不是 uni.request 的参数，自定义附加的
	const cancelerKey = config.cancelerKey || '1';
	delete config.cancelerKey;
	// 基础路由，不是 uni.request 的参数，自定义附加的
	const baseUrl = config.baseUrl || process.env.VITE_APP_API_URL || '';
	delete config.baseUrl;
	// header
	config.header = config.header || {};
	// 设置为json，返回后uni.request会对数据进行一次JSON.parse
	config.dataType = config.dataType || 'json';
	// 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
	config.responseType = config.responseType || 'text';
	// 默认 get 请求
	config.method = config.method || 'GET';
	// 请求data
	config.data = config.data || {};
	// 判断用户传递的URL是否http开的头
	const url = config.url || '';
	config.url = isExternal(url) ? url : (baseUrl + url);
	/* 初始化参数 E */
	
	/*  ====== 请求拦截 S ====== */		
	// 配置Token参数
	const headerToken =  getToken();
	if(headerToken) {
	  config.header[ajaxHeadersTokenKey] = headerToken;
	}
	
	// 定义消除器config
	const requestCancelerConfig = {
		method: config.method,
		url: config.url,
		data: config.data,
		cancelerKey: cancelerKey,
	}	
	/*  ====== 请求拦截 E ====== */	
	
	return new Promise((resolve, reject) => {		
		/**
		 * @description uni.request 接口调用结束的回调函数（调用成功、失败都会执行）
		 * @param {Object} response 服务器返回经过uni.request处理后的数据，包括响应状态(statusCode)、header、cookies、data等
		 */
		config.complete = (response) => {	
			if (response.statusCode == 200) {
				// 服务器状态码 200
				const data = response.data || {};
				const code = data.code;
				
				/* ====== 响应拦截 S ====== */
				/*  在请求结束后，移除本次请求消除器 */
				requestCanceler.removePending(requestCancelerConfig);
				/* ====== 响应拦截 E ====== */	
				
				if(code === ResultCodeEnum.SUCCESS) {
					// 成功code
					// 跳到then
					resolve(data);
				} else {
					// 不是成功code
					// 统一错误处理
					errorHandler(response, url)
					// 跳到catch
					reject(response)
				}
			} else {
			  // 服务器状态码 非200
			  // 统一错误处理
			  errorHandler(response, url)
			  // 跳到catch
			  reject(response)
			}
		}
		
		// ajax 请求
		const requestTask = uni.request(config);
		
		/* 将当前请求添加到请求消除器 pending 中 */
		requestCanceler.addPending(requestCancelerConfig, requestTask);
	  	
	})
	
	
}

/* ================ 自定义请求类 相关 E ======================= */

