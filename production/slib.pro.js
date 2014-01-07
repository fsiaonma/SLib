/**
 * SLib 类, 命名空间，最高层。
 *
 * @class sl
 * @constructor
 */
var sl = SLib = {}

try {
	module.exports = sl;	
} catch (e) {
	console.log(e);
}

/**
 * eagleMysql 类，mysql 数据库适配器。
 * @class sl.eagleMysql
 * @constructor
 */
sl.eagleMysql = (function() {
    this.mysql = null;
    this.client = null;
    this.dbConfig = null;

    var o = {};

    /**
     * 是否输出调试信息
     * @property debug
     * @type bool
     */
    o.debug = false;

    /**
     * 构造函数，初始化 eagleMysql 类。
     * @parmas {Object} config mysql数据库配置，包括账号，密码，url，库名等。
     * @method init
     */
    o.init = function(config) {
        if (o.debug) {
            console.log("[init eagleMysql]: " + config);
        }

        this.mysql = require('mysql');
        this.dbConfig = config;
    };

    /**
     * 建表
     * @parmas {Array} tables 表名数组 
     * @method createTables
     */
    o.createTables = function (tables) {
        for (var i = 0, tablesLen = tables.length; i < tablesLen; ++i) {
            var tableName = tables[i].Name;
            var fields = tables[i].Fields;
            var queryStr = 'CREATE TABLE if not exists ' + tableName + 
                         '(ID INT(11) not null AUTO_INCREMENT, ';
            for (var t = 0, fieldsLen = fields.length; t < fieldsLen; ++t) {
                queryStr += fields[t].key + ' ' + fields[t].type + ', ';
            }
            queryStr += 'PRIMARY KEY (id))';
            if (o.debug) {
                console.log("[createTables]: " + queryStr);
            }
            this.client.query(queryStr);
        };
    };

    /**
     * 往表中插入数据
     *
     * @parmas {Array} params 插入操作的相关数据，包括表名，键值等
     * @params {function} callback 回调函数
     *
     * @example var sqlCondtion = new SqlCondition();   <br/>
     * var insertParams = {                             <br/>
     *     table  : 'T_TEST_USER',                      <br/>
     *     keys   : ['USERNAME'],                       <br/>
     *     values : ['testName']                        <br/>
     * };                                               <br/>
     * eagleMysql.insert(insertParams, {                <br/>
     *     success : function (data) {                  <br/>
     *         console.log('success');                  <br/>
     *     },                                           <br/>
     *     error : function (err) {                     <br/>
     *         console.log(err);                        <br/>
     *     }                                            <br/>
     * });                                              <br/>
     *
     * @method insert
     */
    o.insert = function (params, callback) {
        var keyStr = ' ' + params.keys[0] + '=? ';
        for (var i = 1, keysLen = params.keys.length; i < keysLen; ++i) {
            keyStr += ', ' + params.keys[i] + '=? ';
        }
        if (o.debug) {
            console.log("[insert]: " + "INSERT INTO " + params.table + " SET " + keyStr);
        }
        this.client.query('INSERT INTO ' + params.table + ' SET ' + keyStr, params.values, 
            function (err, results, fields) {
                o._doCallback(err, results, fields, callback);
            }
        );
    };

    /**
     * 删除表中指定数据
     *
     * @parmas {Array} params 删除操作的相关数据，包括表名，条件等。
     * @params {function} callback 回调函数
     *
     * @example var sqlCondtion = new SqlCondition();                       <br />
     *  var delParams = {                                                   <br />
     *      table      : 'T_TEST_USER',                                     <br />
     *      conditions : sqlCondtion.where("USERNAME = 'testName'").getSql()<br />
     *  };                                                                  <br />
     *  eagleMysql.delete(delParams, {                                      <br />
     *      success : function (data) {                                     <br />
     *          console.log('success');                                     <br />
     *      },                                                              <br />
     *      error : function (err) {                                        <br />
     *          console.log(err)                                            <br />
     *      },                                                              <br />
     *  });                                                                 <br />
     *
     * @method delete
     */
    o.delete = function (params, callback) {
        if (o.debug) {
            console.log("[delete]: " + "DELETE FROM " + params.table + " " + params.conditions);
        }
        this.client.query('DELETE FROM ' + params.table  + ' ' + params.conditions,
            function (err, results, fields) {
                o._doCallback(err, results, fields, callback);
            }
        );
    };

    /**
     * 更新表中指定数据
     *
     * @parmas {Array} params 更新操作的相关数据，包括表名，条件等。
     * @params {function} callback 回调函数
     *
     * @example var sqlCondtion = new SqlCondition();                           <br />
     *  var updateParams = {                                                    <br />
     *      table  : 'T_TEST_USER',
     *      keys   : ['USERNAME'],                                              <br />
     *      values : ['updateName'],                                            <br />
     *      conditions : sqlCondtion.where("USERNAME = 'testName'").getSql()    <br />
     *  };                                                                      <br />
     *  eagleMysql.update(updateParams, {                                       <br />
     *      success : function (data) {                                         <br />
     *          console.log('success');                                         <br />
     *      },                                                                  <br />
     *      error : function (err) {                                            <br />
     *          console.log(err);                                               <br />
     *      }                                                                   <br />
     *  });                                                                     <br />
     *
     * @method update
     */
    o.update = function (params, callback) {
        var keyStr = ' ' + params.keys[0] + '=? ';
        for (var i = 1, keysLen = params.keys.length; i < keysLen; ++i) {
            keyStr += ', ' + params.keys[i] + '=? ';
        }
        if (o.debug) {
            console.log("[update]: " + "UPDATE " + params.table + " SET " + keyStr + " " + params.conditions);
        }
        this.client.query('UPDATE ' + params.table + ' SET ' + keyStr + ' ' + params.conditions, params.values,
            function (err, results, fields) {
                o._doCallback(err, results, fields, callback);
            }
        );
    };

    /**
     * 检索表中指定数据
     *
     * @parmas {Array} params 更新操作的相关数据，包括表名，条件等。
     * @params {function} callback 回调函数
     *
     * @example var sqlCondtion = new SqlCondition();                                   <br />
     * var selParams = {                                                                <br />
     *     keys       : ['USERNAME'],                                                   <br />
     *     table      : 'T_TEST_USER',                                                  <br />
     *     conditions : sqlCondtion.where("USERNAME = 'updateName'").and('1=1').getSql()<br />
     * };                                                                               <br />
     * eagleMysql.select(selParams, {                                                   <br />
     *     success : function (data) {                                                  <br />
     *         console.log('success');                                                  <br />
     *     },                                                                           <br />
     *     error : function (err) {                                                     <br />
     *         console.log(err)                                                         <br />
     *     },                                                                           <br />
     * });                                                                              <br />
     *                                                                                  
     * @method select
     */
    o.select = function (params, callback) {
        var keyStr = ' ' + params.keys[0] + ' ';
        for (var i = 1, keysLen = params.keys.length; i < keysLen; ++i) {
            keyStr += ', ' + params.keys[i] + ' ';
        }
        if (o.debug) {
            console.log("[update]: " + "SELECT " + keyStr + " FROM " + params.table  + " " + params.conditions);
        }
        this.client.query('SELECT ' + keyStr + ' FROM ' + params.table  + ' ' + params.conditions,
            function (err, results, fields) {
                o._doCallback(err, results, fields, callback);
            }
        );
    };

    /**
     * 链接数据库
     * @method connet
     */
    o.connet = function () {
        this.client = this.mysql.createConnection(this.dbConfig.dbOptions);
        if (o.debug) {
            console.log("[connet]: " + "USE " + this.dbConfig.dataBase);
        }
        this.client.query('USE ' + this.dbConfig.dataBase, function(error, results) {
            if(error) {
                console.log('ClientConnectionReady Error: ' + error.message);
                return;
            }else{
                console.log('ClientConnect Success');
            }
        });
    };

    /**
     * 与数据库断开链接
     * @method disconnet
     */
    o.disconnet = function () {
        this.client.end();
        this.client = null;
    };

    /**
     * 数据库操作通用回调函数
     * @method _doCallback
     * @private
     */
    o._doCallback = function (err, results, fields, callback) {
        if (err) {
            callback.error(err);
        } else {
            data = {
                results : results,
                fields  : fields
            }
            callback.success(data);
        }
    };

    return o;
})();


/**
 * log 类，用于打印信息，分为 debug, info, warnning, error 三类。
 * @class sl.log
 * @constructor
 */
sl.log = (function() {
	var o = {};

	var mode = 0;

	/**
     * 打印调试信息
     * @example sl.log.d("mseeage") 或 sl.log.debug("mseeage");
     * @method debug
     */
    o.d = o.debug = function(msg) {
    	if (mode <= sl.log_mode.DEBUG) {
    		console.log("%c [DEBUG] " + msg + " ", "background: #222; color: white");
    	}
    }

	/**
     * 打印日志信息
     * @example sl.log.i("mseeage") 或 sl.log.info("mseeage");
     * @method info
     */
	o.i = o.info = function(msg) {
		if (mode <= sl.log_mode.INFO) {
			console.log("%c [INFO] " + msg + " ", "background: #222; color: #bada55");
		}
	}

	/**
     * 打印警告信息
     * @example sl.log.w("mseeage") 或 sl.log.warnning("message");
     * @method warnning
     */
	o.w = o.warn = function(msg) {
		if (mode <= sl.log_mode.WARN) {
			console.log("%c [WARN] " + msg + " ", "background: #222; color: orange");
		}
	}

	/**
     * 打印错误信息
     * @example sl.log.e("mseeage") 或 sl.log.error("message");
     * @method error
     */
	o.e = o.error = function(msg) {
		if (mode <= sl.log_mode.ERROR) {
			console.log("%c [ERROR] " + msg + " ", "background: #222; color: red");
		}
	}

	/**
     * 设置打印日志级别，提供给开发者打印等级选择。
     * @example sl.log.setMode(sl.log_mode.DEBUG); 或 sl.log.setMode(sl.log_mode.INFO);
     * @param {Number} type 打印级别，可选项:
     * <ul>
     * 		<li> sl.log_mode.DEBUG </li>
     *		<li> sl.log_mode.INFO </li>
     *      <li> sl.log_mode.WARN </li>
     *      <li> sl.log_mode.ERROR </li>
     * </ul> <br />
     * 详情参见 {{#crossLink "sl.log_mode"}}{{/crossLink}}。
     * @method setMode
     */
	o.setMode = function(type) {
		mode = type;
	}

	return o;
})();

/**
 * extendBase 类, 原生接口扩展的基类
 *
 * @class extendBase
 * @constructor
 */
sl.extendBase = {
	/**
	 * 配置对象
	 * @property Config
	 * @type {object}
	 */
	Config: {
		Object: "object",
		Array: "Array",
		String: "string"
	},

	/**
	 * 获取参数类型
	 * @param {任意} 需要判断类型的参数
	 * @method getType
	 * @return {String} 参数类型
	 * @example sl.base.getType("mseeage") 或 sl.base.getType([1, 2, 3]);
	 */
	getType: function(params) {
		var type = typeof params;
		if (type == sl.extendBase.Config.Object) {
			var t = Object.prototype.toString.call(params);
			t = t.substring(t.indexOf(' ') + 1, t.indexOf("]"));
			if (t == sl.extendBase.Config.Array) {
				type = t;
			}
		}
		if (type == undefined) {
			console.log("[错误] getType 参数类型错误");
		}
		return type;
	}
}


/**
 * sqlCondition 类，用于描述 sql 条件
 * @class sl.sqlCondition
 * @constructor
 */
sl.sqlCondition = function () {
    var sql = sql || '';

    /**
     * where 条件
     * @method where
     * @example sl.sqlCondition.where("1=1");
     * @return sl.sqlCondition 实例
     */
    this.where = function (str) {
        sql += ' where ' + str;
        return this;
    };

    /**
     * and 条件
     * @method and
     * @example sl.sqlCondition.and("1=1");
     * @return sl.sqlCondition 实例
     */
    this.and = function (str) {
        sql += ' and ' + str;
        return this;
    };

    /**
     * or 条件
     * @method or
     * @example sl.sqlCondition.or("1=1");
     * @return sl.sqlCondition 实例
     */
    this.or = function (str) {
        sql += ' or ' + str;
        return this;
    };

    /**
     * getSql 方法，获取拼接后的 sql 语句
     * @method getSql
     * @example sl.sqlCondition.where("1=1").getSql();
     * @return 拼接后的 sql 语句
     */
    this.getSql = function () {
        return sql;
    };
};

/**
 * log_mode 类，标记打印日志级别。
 * @class sl.log_mode
 * @constructor
 */
sl.log_mode = (function() {
	var o = {};

	/**
	 * 调试信息级别代号
	 * @property DEBUG
	 * @type {Number}
	 * @default 0
	 */
	o.DEBUG = 0;

	/**
	 * 日志信息级别代号
	 * @property INFO
	 * @type {Number}
	 * @default 1
	 */
	o.INFO = 1;

	/**
	 * 警告信息级别代号
	 * @property WARN
	 * @type {Number}
	 * @default 2
	 */
	o.WARN = 2;

	/**
	 * 错误信息级别代号
	 * @property ERROR
	 * @type {Number}
	 * @default 3
	 */
	o.ERROR = 3;

	return o;
})()

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

