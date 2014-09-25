/**
 * dom 类
 * @class sl.dom
 * @constructor
 */
sl.dom = (function() {
    var dom = function(el) {
        /**
         * 需要处理DOM对象
         * @property dom
         * @type {dom}
         * @default null
         */
        this.el = el;
    };

    dom.prototype = {
        /**
         * 为 dom 对象添加属性
         * @param {String} className 类名
         * @method addClass
         * @example sl.array("divId").addClass("className");
         */
        addClass: function(className) {
            if (!this.hasClass(className)) {
                this.el.className += " " + className;
            }
        },

        /**
         * 为 dom 对象删除属性
         * @param {String} className 类名
         * @method removeClass
         * @example sl.array("divId").removeClass("className");
         */
        removeClass: function(className) {
            if (this.hasClass(className)) {
                var classes = this.el.className.split(" ");
                this.el.className = "";
                for (var i = 0, len = classes.length; i < len; ++i) {
                    if (classes[i] != className) {
                        this.el.className += classes[i] + " ";
                    }
                }
            }
        }, 

        /**
         * 判断 dom 对象是否存在某类名
         * @param {String} className 类名
         * @method hasClass
         * @example sl.array("divId").hasClass("className");
         * @return boolean
         */
        hasClass: function(className) {
            return this.el.className.indexOf(className) > -1;
        }
    }

    return function(elStr) {
        if (!document.getElementById(elStr)) {
            console.log("[错误] 未找到 dom 元素: " + elStr);
        } else {
            return new dom(document.getElementById(elStr));
        }
    }
})();