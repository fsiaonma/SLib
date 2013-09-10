/**
 * Log 类，用于打印信息，分为 debug, info, warnning, error 三类。
 * @class sl.log
 * @constructor
 */
sl.log = (function() {
	var o = {};

	var mode = 0;

	/**
     * 打印调试信息
     * @example sl.log.d("mseeage") 或 sl.log.debug("mseeage");
     * @method debug
     */
    o.d = o.debug = function(msg) {
    	if (mode <= sl.log_mode.DEBUG) {
    		console.log("%c [DEBUG] " + msg + " ", "background: #222; color: white");
    	}
    }

	/**
     * 打印日志信息
     * @example sl.log.i("mseeage") 或 sl.log.info("mseeage");
     * @method info
     */
	o.i = o.info = function(msg) {
		if (mode <= sl.log_mode.INFO) {
			console.log("%c [INFO] " + msg + " ", "background: #222; color: #bada55");
		}
	}

	/**
     * 打印警告信息
     * @example sl.log.w("mseeage") 或 sl.log.warnning("message");
     * @method warnning
     */
	o.w = o.warn = function(msg) {
		if (mode <= sl.log_mode.WARN) {
			console.log("%c [WARN] " + msg + " ", "background: #222; color: orange");
		}
	}

	/**
     * 打印错误信息
     * @example sl.log.e("mseeage") 或 sl.log.error("message");
     * @method error
     */
	o.e = o.error = function(msg) {
		if (mode <= sl.log_mode.ERROR) {
			console.log("%c [ERROR] " + msg + " ", "background: #222; color: red");
		}
	}

	/**
     * 设置打印日志级别，提供给开发者打印等级选择。
     * @example sl.log.setMode(sl.log_mode.DEBUG); 或 sl.log.setMode(sl.log_mode.INFO);
     * @param {Number} type 打印级别，可选项:
     * <ul>
     * 		<li> sl.log_mode.DEBUG </li>
     *		<li> sl.log_mode.INFO </li>
     *      <li> sl.log_mode.WARN </li>
     *      <li> sl.log_mode.ERROR </li>
     * </ul> <br />
     * 详情参见 {{#crossLink "sl.log_mode"}}{{/crossLink}}。
     * @method setMode
     */
	o.setMode = function(type) {
		mode = type;
	}

	return o;
})();