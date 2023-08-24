/**
 * @description 统一Token设置
 * @author LiQingSong
 */

import { siteTokenKey } from "@/config/settings.js";

/**
 * @description 获取本地Token
 * @returns string | null
 */
export function getToken() {
  return  uni.getStorageSync(siteTokenKey);
};

/**
 * @description 设置存储本地Token
 * @returns void
 */
export function setToken (token) {
  try {
    uni.setStorageSync(siteTokenKey, token)  
  } catch (e) { 
    console.log(e);
  }
};

/**
 * @description 移除本地Token
 * @returns void
 */
export function removeToken () {
  try {
    uni.removeStorageSync(siteTokenKey)
  } catch (e) {
    console.log(e);
  }
};
