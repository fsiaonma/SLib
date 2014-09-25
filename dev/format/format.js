/**
 * format 类，文件格式l
 * @class sl.format
 * @constructor
 */
sl.format = (function() {
    return {
        /**
         * 获取文件后缀名
         * @param fileName 文件全名
         * @method checkFormat
         * @return {String} 文件名后缀
         * @example sl.format.checkFormat("helloworld.png");
         */
        checkFormat: function(fileName) { 
            var suffix = fileName.substr(fileName.lastIndexOf(".") + 1);
            return suffix.toLowerCase();
        }
    }
})();