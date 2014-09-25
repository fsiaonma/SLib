/**
 * cookie 类
 * @class sl.cookie
 * @constructor
 */
sl.cookie = (function() {
    return {
        /**
         * 设置 cookie
         * @param name cookie 名称 键值
         * @param value cookie 名称 键值 对应内容。
         * @method setCookie
         */
        setCookie: function(name, value) { 
            var argv = setCookie.arguments; 
            var argc = setCookie.arguments.length; 
            var expires = (argc > 2) ? argv[2] : null; 
            if(expires != null) { 
                var LargeExpDate = new Date (); 
                LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));         
            } 
            document.cookie = name + "=" + escape (value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())); 
        },

        /**
         * 获取 cookie 值
         * @param name cookie 名称 键值
         * @method getCookie
         */
        getCookie: function(name) { 
            if (null == name || name == "") {
                return "";
            }
            var search = name + "=" 
            if (document.cookie.length > 0) { 
                offset = document.cookie.indexOf(search) 
                if(offset != -1) { 
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) {
                        end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(offset, end));
                } else {
                    return "";
                }
            } 
        }
    }
})();