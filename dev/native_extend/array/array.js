/**
 * array 类，数组扩展类
 * @class sl.array
 * @constructor
 */
sl.array = (function() {
    var o = {};

    var isArray = function(arr) {
     	return sl.extendBase.getType(arr) == "Array";
    }

   	/**
  	 * 需要处理的数组
  	 * @property array
  	 * @type {Array}
  	 * @default []
  	 */
   	o.array = [];

    /**
     * 当数组没有顺序要求时候，该方法能快速删除某一指定下标的数组项
     * @param {Number} index 指定的数组下标
     * @method qRemoveByIndex
     * @example sl.array(arr).qRemoveByIndex(1);
     * @return {Array} 删除某项后的数组
     */
 	  o.qRemoveByIndex = function(index) {
    	if (index < 0 || index >= o.array.length) {
    		console.log("[错误] qRemoveByIndex 参数越界");
    	} else {
    		var end = o.array.length - 1;
    		var temp = o.array[index];
    		o.array[index] = o.array[end];
    		o.array[end] = temp;
    		o.array.pop();
    		return o.array;
    	}
   	}

    /**
     * 当数组有顺序要求时候，该方法能删除某一指定数组项而不改变数组顺序
     * @param {Number} index 指定的数组下标
     * @method cRemoveByIndex
     * @example sl.array(arr).cRemoveByIndex(1);
     * @return {Array} 删除某项后的数组
     */
    o.cRemoveByIndex = function(index) {
        if (index < 0 || index >= o.array.length) {
            console.log("[错误] cRemoveByIndex 参数越界");
        } else {
            for (var i = index; i < this.array.length; ++i) {
               o.array[i] = o.array[i + 1];
            }
            o.array.pop();
        }
        return o.array;
    }

    /**
     * 随即抽取一数组项
     * @method random
     * @example sl.array(arr).random();
     * @return 随即出来的数组项
     */
    o.random = function() {
        var index = Math.floor(Math.random() * o.array.length);
        return o.array[index];
    }

    /**
     * 判断数组是否包含某一指定值
     * @param data 需要判断的键值
     * @method isContain
     * @example sl.array(arr).isContain(1);
     * @return {bool} ture 表述数组包含该特定值，false 则不包含 
     */
    o.isContain = function(data) {
        return o.array.indexOf(data) != -1;
    }

    /**
     * 转换成字符串
     * @method toString
     * @example sl.array(arr).toString();
     * @return {String} 转换后的字符串
     */
    o.toString = function() {
        var str = "[";
        o.array.map(function(item) { 
            var type = sl.extendBase.getType(item);
            if (type == "Object") {
                str += sl.object(item).toString();
            } else if (type == "Array") {
                str += sl.array(item).toString();
            } else {
                str += item;
            }
            str += ", ";
        });
        str.length > 1? str = str.substr(0, str.lastIndexOf(",")) + "]" : str += "]";
        return str;
    }

    /**
     * 复制数组
     * @method copy
     * @example sl.array(arr).copy();
     * @return {Array} 复制后的数组
     */
    o.clone = function() {
        var rst = [];
        o.array.map(function(item) {
            var type = sl.extendBase.getType(item);
            if (type == "Object") {
                rst.push(sl.object(item).clone());
            } else if (type == "Array") {
                rst.push(sl.array(item).clone());
            } else {
                rst.push(item);
            }
        });
        return rst;
    }

    return function(arr) {
      	if (!isArray(arr)) {
      		console.log("[错误] sl.array 参数类型错误");
      	} else {
    		o.array = arr;
    		return o;
      	}
    };
 })();