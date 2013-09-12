/**
 * array 类，数组扩展类
 * @class sl.array
 * @constructor
 */
 sl.array = (function() {
 	var o = {};

 	var isArray = function(arr) {
 		return sl.base.getType(arr) == "Array";
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
     * @method qRemove
     * @example sl.array(arr).qRemove(1);
	 * @return {Array} 删除某项后的数组
     */
 	o.qRemove = function(index) {
 		if (index < 0 || index >= o.array.length) {
 			console.log("[错误] qRemove 参数越界");
 		} else {
 			var end = o.array.length - 1;
 			var temp = o.array[index];
 			o.array[index] = o.array[end];
 			o.array[end] = temp;
 			o.array.pop();
 			return o.array;
 		}
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