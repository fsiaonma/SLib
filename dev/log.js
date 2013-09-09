/**
 * Log 类，用于打印信息，分为 info, warnning, error 三类。
 * @class SL.Log
 * @constructor
 */
sl.log = (function() {
	var o = {};

	var level = 0;

	/**
     * 打印日志信息
     * @example SL.Log.i("mseeage") 或 SL.Log.info("mseeage");
     * @method info
     */
    o.d = o.debug = function(msg) {
    	if (level >= 0) {
    		console.log("%c [DEBUG] " + msg, "background: #222; color: white");
    	}
    }

	/**
     * 打印日志信息
     * @example SL.Log.i("mseeage") 或 SL.Log.info("mseeage");
     * @method info
     */
	o.i = o.info = function(msg) {
		if (level >= 1) {
			console.log("%c [INFO] " + msg, "background: #222; color: #bada55");
		}
	}

	/**
     * 打印警告信息
     * @example SL.Log.w("mseeage") 或 SL.Log.warnning("message");
     * @method warnning
     */
	o.w = o.warn = function(msg) {
		if (level >= 2) {
			console.log("%c [WARN] " + msg, "background: #222; color: orange");
		}
	}

	/**
     * 打印错误信息
     * @example SL.Log.e("mseeage") 或 SL.Log.error("message");
     * @method error
     */
	o.e = o.error = function(msg) {
		if (level >= 3) {
			console.log("%c [ERROR] " + msg, "background: #222; color: red");
		}
	}

	/**
     * 设置打印日志级别，提供给开发者打印等级选择。
     * @example
     * @param {Number} num 打印级别，0 为仅打印 info，1 为打印 info，warnning，2 为打印 info，warnning，error。
     * @method setLevel
     */
	o.setLevel = function(num) {
		level = num;
	}

	return o;
})();