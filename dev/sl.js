/**
 * SLib 类, 命名空间，最高层。
 *
 * @class sl
 * @constructor
 */
var sl = SLib = {};

sl.base = {
	/**
     * 获取参数类型
     * @param {任意} 需要判断类型的参数
     * @method getType
     * @return {String} 参数类型
     * @example sl.base.getType("mseeage") 或 sl.base.getType([1, 2, 3]);
     */
	getType: function(params) {
		var type = Object.prototype.toString.call(params);
		type = type.substring(type.indexOf(' ') + 1, type.indexOf("]"));
		if (type == undefined) {
			console.log("[错误] getType 参数类型错误");
		}
		return type;
	}
}