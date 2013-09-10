/**
 * log_mode 类，标记打印日志级别。
 * @class sl.log_mode
 * @constructor
 */
sl.log_mode = (function() {
	var o = {};

	/**
	 * 调试信息级别代号
	 * @property DEBUG
	 * @type {Number}
	 * @default 0
	 */
	o.DEBUG = 0;

	/**
	 * 日志信息级别代号
	 * @property INFO
	 * @type {Number}
	 * @default 1
	 */
	o.INFO = 1;

	/**
	 * 警告信息级别代号
	 * @property WARN
	 * @type {Number}
	 * @default 2
	 */
	o.WARN = 2;

	/**
	 * 错误信息级别代号
	 * @property ERROR
	 * @type {Number}
	 * @default 3
	 */
	o.ERROR = 3;

	return o;
})()