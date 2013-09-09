/**
 * Log 类，用于打印信息，分为 info, warnning, error 三类。
 * @class SL.Log
 * @constructor
 */
sl.log = (function() {
	var o = {};

	/**
     * 打印日志信息
     * @example SL.Log.i("mseeage") 或 SL.Log.info("mseeage");
     * @method info
     */
	o.i = o.info = function(msg) {
		console.log("%c" + msg, "background: #222; color: #bada55");
	},

	/**
     * 打印警告信息
     * @example SL.Log.w("mseeage") 或 SL.Log.warnning("message");
     * @method warnning
     */
	o.w = o.warnning = function(msg) {
		console.log("%c" + msg, "background: #222; color: orange");
	},

	/**
     * 打印错误信息
     * @example SL.Log.e("mseeage") 或 SL.Log.error("message");
     * @method error
     */
	o.e = o.error = function(msg) {
		console.log("%c" + msg, "background: #222; color: red");
	}

	return o;
})();