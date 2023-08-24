/**
 * @description 自定义 is 方法
 * @author LiQingSong
 */

/**
 * @description 判断值是否未某个类型
 * @param {unknown} val 变量
 * @param {string} type 类型字符串 如：“Function”
 * @returns boolean
 */
export function is(val, type) {
	return Object.prototype.toString.call(val) === `[object ${type}]`;
}


/**
 * @description 是否为函数
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isFunction(val) {
	return is(val, "Function");
}

/**
 * @description 是否为AsyncFunction
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isAsyncFunction(val) {
	return is(val, "AsyncFunction");
}

/**
 * @description 是否为promise
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isPromise(val) {
	return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description 是否为对象
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isObject(val) {
	return val !== null && is(val, "Object");
}

/**
 * @description 是否为日期
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isDate(val) {
	return is(val, "Date");
}

/**
 * @description 是否为数值
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isNumber(val) {
	return is(val, "Number");
}

/**
 * @description 是否为字符串
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isString(val) {
	return is(val, "String");
}

/**
 * @description 是否为boolean类型
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isBoolean(val) {
	return is(val, "Boolean");
}

/**
 * @description 是否为数组
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isArray(val) {
	return val && Array.isArray(val);
}

/**
 * @description 是否为null
 * @param {unknown} val 变量
 * @returns boolean
 */
export function isNull(val) {
	return val === null;
}

/**
 * @description 判断是否是外链
 * @param {string} path
 * @returns boolean
 */
export function isExternal(path){
	return /^(https?:|mailto:|tel:)/.test(path);
}
