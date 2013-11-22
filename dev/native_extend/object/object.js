/**
 * object 类，对象扩展类
 * @class sl.object
 * @constructor
 */
sl.object = (function() {
 	var slobj = function(obj) {
        /**
         * 需要处理的对象
         * @property object
         * @type {object}
         * @default {}
         */
        this.object = obj;
    }

    slobj.prototype = {
        /**
         * 比较 2 个对象是否相等
         * @param {Object} obj 需要比较的对象
         * @method equalsTo
         * @example sl.object(obj1).equalsTo(obj2);
         * @return {bool} ture 表述2对象相等，false 则不相等
         */
        equalsTo: function(obj) {
            var flag = true;
            for (var i in this.object) {
                var type = sl.extendBase.getType(this.object[i]);
                var objType = sl.extendBase.getType(obj[i]);
                if (type != objType) {
                    flag = false;
                } else if (type == sl.extendBase.Config.Array) {
                    flag = sl.array(this.object[i]).equalsTo(obj[i]);
                } else if (type == sl.extendBase.Config.Object) {
                    flag = sl.object(this.object[i]).equalsTo(obj[i]);
                } else {
                    flag = (obj[i] == this.object[i]);
                }
                if (!flag) {
                  break;
                }
            }
            return flag;
        },

        /**
         * 判断对象是否包含某一指定值
         * @param {String} data 需要判断的键值
         * @method isContain
         * @example sl.object(object).isContain(1);
         * @return {bool} ture 表述对象包含该特定值，false 则不包含 
         */
        isContainKey: function(data) {
            var flag = false;
            for (var i in this.object) {
                if (i == data) {
                    flag = true;
                }
            }
            return flag;
        },

        /**
         * 转换成字符串
         * @method toString
         * @example sl.object(object).toString();
         * @return {String} 转换后的字符串
         */
        toString: function() {
            var str = "{";
            for (var i in this.object) {
                var type = sl.extendBase.getType(this.object[i]);
                if (type == sl.extendBase.Config.Object) {
                    str += i + ":" + sl.object(this.object[i]).toString();
                } else if (type == sl.extendBase.Config.Array) {
                    str += i + ":" + sl.array(this.object[i]).toString();
                } else {
                    str += i + ":" + this.object[i];
                }
                str += ", ";
            }
            str.length > 1? str = str.substr(0, str.lastIndexOf(",")) + "}" : str += "}";
            return str;
        },

        /**
         * 复制对象
         * @method clone
         * @example sl.object(object).clone();
         * @return {Object} 复制后的对象
         */
        clone: function() {
            var rst = {};
            for (var i in this.object) {
                var type = sl.extendBase.getType(this.object[i]);
                if (type == "Object") {
                    rst[i] = sl.object(this.object[i]).clone();
                } else if (type == "Array") {
                    rst[i] = sl.array(this.object[i]).clone();
                } else {
                    rst[i] = this.object[i];
                }
            };
            return rst;
        }
    }

 	return function(object) {
 		if (sl.extendBase.getType(object) != sl.extendBase.Config.Object) {
 			console.log("[错误] sl.object 参数类型错误");
 		} else {
 			return new slobj(object);
 		}
 	}
 })();