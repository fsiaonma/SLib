/**
 * string 类，字符串扩展类
 * @class sl.string
 * @constructor
 */
sl.string = (function() {
	var regs = {
        trim : /(^\s*)|(\s*$)/g,
        androidVersion : /^Android+\s+\d+/i,
        email : /^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/,
        post : /^\d{6}$/
    };

 	var slstr = function(str) {
        /**
         * 需要处理的字符串
         * @property string
         * @type {String}
         * @default ""
         */
        this.string = str;
    }

    slstr.prototype = {
    	/**
         * 首字母变大写
         * @method initialsToUpper
         * @example sl.string(str).initialsToUpper();
         * @return {String} 首字母变大写后的字符串
         */
        initialsToUpper: function () {
            return this.string.substring(0,1).toUpperCase().concat(this.string.substring(1));  
        },

        /**
         * 判断字符串中是否包含某指定字符
         * @method isContain
         * @params {String} item 指定字符，单个字符。
         * @example sl.string(str).initialsToUpper();
         * @return {bool} 是否包含该字符，true 为包含。 
         */
        isContain: function(item) {
        	if (sl.extendBase.getType(item) == sl.extendBase.Config.String && item.length != 1) {
        		console.log("[错误] sl.string.isContain 参数类型错误");
        		return false;
        	}
        	return this.string.indexOf(item) > -1 ? true : false;
        },

        /**
         * 判断字符串格式是否为 email
         * @method isEmail
         * @example sl.string(str).isEmail();
         * @return {bool} 字符串格式是否为 email，true 为 email 格式。
         */
        isEmail: function () {
            return regs.email.test(this.string.trim());
        }
    }

    return function(str) {
 		if (sl.extendBase.getType(str) != sl.extendBase.Config.String) {
 			console.log("[错误] sl.string 参数类型错误");
 		} else if (str == "") {
 			console.log("[错误] sl.string 长度为 0");
 		} else {
 			return new slstr(str);
 		}
 	}
 })();