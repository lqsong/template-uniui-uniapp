/**
 * main.js是 uni-app 的入口文件，主要作用是初始化vue实例、定义全局组件、使用需要的插件如 pinia。
 */
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  // 绑定全局状态管理
  app.use(Pinia.createPinia())
  return {
    app,
	Pinia,
  }
}
