/**
 * vite.config.js 是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被自动加载，一般用于配置 vite 的编译选项，具体规范参考：https://cn.vitejs.dev/config/
 * 支持情况：HBuilderX 3.2.0 及以上版本
 * 仅vue 3项目生效
 * 必须引用 '@dcloudio/vite-plugin-uni' 并且添加到 plugins 中
 */
import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig(({ command, mode })=>{
	// const root = process.cwd(); // 获取的是uniapp-cli-vite目录绝对路径，如：D:\software\HBuilderX\plugins\uniapp-cli-vite
	// const env = loadEnv(mode, root); // 原始vite vue项目uniapp这里已经不适用
	// process.env.VITE_ROOT_DIR 当前项目目录绝对路径
	const env = loadEnv(mode, process.env.VITE_ROOT_DIR);
	
	// 定义 define
	const define = {};
	for(let key in env) {
		define[`process.env.${key}`] = JSON.stringify(env[key]);
	}
	
	
	return {
		plugins: [uni()],
		define,
		build: {
			minify: 'terser',
			terserOptions: {
				compress: {
					// 发布时删除 console ,正式才删除
					drop_console: mode === 'production',
				},
			},
		},
	};
});
