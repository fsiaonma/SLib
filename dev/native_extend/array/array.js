/**
 * array 类，数组扩展类
 * @class sl.array
 * @constructor
 */
sl.array = (function() {
    var slarr = function(arr) {
        /**
         * 需要处理的数组
         * @property array
         * @type {Array}
         * @default []
         */
        this.array = arr;
    }

    slarr.prototype = {
        /**
         * 当数组没有顺序要求时候，该方法能快速删除某一指定下标的数组项
         * @param {Number} index 指定的数组下标
         * @method qRemoveByIndex
         * @example sl.array(arr).qRemoveByIndex(1);
         * @return {Array} 删除某项后的数组
         */
        qRemoveByIndex: function(index) {
            if (index < 0 || index >= this.array.length) {
                console.log("[错误] qRemoveByIndex 参数越界");
            } else {
                var end = this.array.length - 1;
                var temp = this.array[index];
                this.array[index] = this.array[end];
                this.array[end] = temp;
                this.array.pop();
                return this.array;
            }
        },

        /**
         * 当数组有顺序要求时候，该方法能删除某一指定数组项而不改变数组顺序
         * @param {Number} index 指定的数组下标
         * @method cRemoveByIndex
         * @example sl.array(arr).cRemoveByIndex(1);
         * @return {Array} 删除某项后的数组
         */
        cRemoveByIndex: function(index) {
            if (index < 0 || index >= this.array.length) {
                console.log("[错误] cRemoveByIndex 参数越界");
            } else {
                for (var i = index; i < this.array.length; ++i) {
                   this.array[i] = this.array[i + 1];
                }
                this.array.pop();
            }
            return this.array;
        },

        /**
         * 随即抽取一数组项
         * @method random
         * @example sl.array(arr).random();
         * @return 随即出来的数组项
         */
        random: function() {
            var index = Math.floor(Math.random() * this.array.length);
            return this.array[index];
        },

        /**
         * 比较 2 个数组是否相等
         * @param {Array} arr 需要比较的数组
         * @method equalsTo
         * @example sl.array(arr1).equalsTo(arr2);
         * @return {bool} ture 表述2数组相等，false 则不相等
         */
        equalsTo: function(arr) {
            var flag = true;
            for (var i = 0, len = this.array.length; i < len; ++i) {
                var type = sl.extendBase.getType(this.array[i]);
                var arrType = sl.extendBase.getType(arr[i]);

                if (type != arrType) {
                    flag = false;
                } else if (type == sl.extendBase.Config.Array) {
                    flag = sl.array(this.array[i]).equalsTo(arr[i]);
                } else if (type == sl.extendBase.Config.Object) {
                    flag = sl.object(this.array[i]).equalsTo(arr[i]);
                } else {
                    flag = (arr[i] == this.array[i]);
                }

                if (!flag) {
                    break;
                }
            }
            return flag;
        },

        /**
         * 判断数组是否包含某一指定值
         * @param data 需要判断的键值
         * @method isContain
         * @example sl.array(arr).isContain(1);
         * @return {bool} ture 表述数组包含该特定值，false 则不包含 
         */
        isContain: function(data) {
            var flag = false;
            var dataType = sl.extendBase.getType(data);
            for (var i = 0, len = this.array.length; i < len; ++i) {
                var type = sl.extendBase.getType(this.array[i]);
                if (type != dataType) {
                    continue ;
                }
                if (type == sl.extendBase.Config.Array) {
                    flag = sl.array(this.array[i]).equalsTo(data);
                } else if (type == sl.extendBase.Config.Object) {
                    flag = sl.object(this.array[i]).equalsTo(data);
                } else {
                    flag = (this.array.indexOf(data) != -1);
                }
                if (flag) {
                    break;
                }
            }
            return flag;
        },

        /**
         * 转换成字符串
         * @method toString
         * @example sl.array(arr).toString();
         * @return {String} 转换后的字符串
         */
        toString: function() {
            var str = "[";
            for (var i = 0, len = this.array.length; i < len; ++i) {
                var item = this.array[i];
                var type = sl.extendBase.getType(item);
                if (type == sl.extendBase.Config.Object) {
                    str += sl.object(item).toString();
                } else if (type == sl.extendBase.Config.Array) {
                    str += sl.array(item).toString();
                } else {
                    str += item;
                }
                str += ", ";
            }
            str.length > 1? str = str.substr(0, str.lastIndexOf(",")) + "]" : str += "]";
            return str;
        },

        /**
         * 复制数组
         * @method copy
         * @example sl.array(arr).copy();
         * @return {Array} 复制后的数组
         */
        clone: function() {
            var rst = [];
            for (var i = 0, len = this.array.length; i < len; ++i) {
                var item = this.array[i];
                var type = sl.extendBase.getType(item);
                if (type == sl.extendBase.Config.Object) {
                    rst.push(sl.object(item).clone());
                } else if (type == sl.extendBase.Config.Array) {
                    rst.push(sl.array(item).clone());
                } else {
                    rst.push(item);
                }
            }
            return rst;
        }
    }

    return function(arr) {
      	if (sl.extendBase.getType(arr) != sl.extendBase.Config.Array) {
      		console.log("[错误] sl.array 参数类型错误");
      	} else {
    		return new slarr(arr);
      	}
    }
 })();