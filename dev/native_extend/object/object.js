/**
 * object 类，对象扩展类
 * @class sl.object
 * @constructor
 */
sl.object = (function() {
 	var o = {};

 	var isObject = function(object) {
 		return sl.extendBase.getType(object) == "Object";
 	}

 	/**
	 * 需要处理的对象
	 * @property object
	 * @type {object}
	 * @default {}
	 */
 	o.object = {};

 	/**
     * 比较 2 个对象是否相等
     * @param {Object} obj 需要比较的对象
     * @method equal
     * @example sl.object(object).equal(obj);
     * @return {bool} ture 表述2对象相等，false 则不相等
     */
 	o.equalsTo = function(obj) {
 		var flag = false;
 		return flag;
 	}

 	/**
     * 判断对象是否包含某一指定值
     * @param {String} data 需要判断的键值
     * @method isContain
     * @example sl.object(object).isContain(1);
     * @return {bool} ture 表述对象包含该特定值，false 则不包含 
     */
    o.isContain = function(data) {
    	var flag = false;
    	for (var i in o.object) {
    		if (i == data) {
    			flag = true;
    		}
    	}
        return flag;
    }

 	/**
	 * 转换成字符串
	 * @method toString
     * @example sl.object(object).toString();
     * @return {String} 转换后的字符串
	 */
 	o.toString = function() {
 		var str = "{";
 		for (var i in o.object) {
 			var type = sl.extendBase.getType(o.object[i]);
 			if (type == "Object") {
 				str += sl.object(o.object[i]).toString();
 			} else if (type == "Array") {
 				str += sl.array(o.object[i]).toString();
 			} else {
 				str += i + ":" + o.object[i];
 			}
 			str += ", ";
 		}
 		str.length > 1? str = str.substr(0, str.lastIndexOf(",")) + "}" : str += "}";
 		return str;
 	};

 	/**
     * 复制对象
     * @method clone
     * @example sl.object(object).clone();
     * @return {Object} 复制后的对象
     */
    o.clone = function() {
        var rst = {};
        for (var i in o.object) {
            var type = sl.extendBase.getType(o.object[i]);
            if (type == "Object") {
                rst[i] = sl.object(o.object[i]).clone();
            } else if (type == "Array") {
                rst[i] = sl.array(o.object[i]).clone();
            } else {
                rst[i] = o.object[i];
            }
        };
        return rst;
    }

 	return function(object) {
 		if (!isObject(object)) {
 			console.log("[错误] sl.object 参数类型错误");
 		} else {
 			o.object = object;
 			return o;
 		}
 	};
 })();