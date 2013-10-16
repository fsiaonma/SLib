sl.eagleMysql = (function() {
    this.mysql = null;
    this.client = null;
    this.dbConfig = null;

    var o = {};

    o.init = function(config) {
        this.mysql = require('mysql');
        this.dbConfig = config;
    };

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
            this.client.query(queryStr);
        };
    };

    o.insert = function (params, callback) {
        var keyStr = ' ' + params.keys[0] + '=? ';
        for (var i = 1, keysLen = params.keys.length; i < keysLen; ++i) {
            keyStr += ', ' + params.keys[i] + '=? ';
        }
        this.client.query('INSERT INTO ' + params.table + ' SET ' + keyStr, params.values, 
            function (err, results, fields) {
                o._doCallback(err, results, fields, callback);
            }
        );
    };

    o.delete = function (params, callback) {
        this.client.query('DELETE FROM ' + params.table  + ' ' + params.conditions,
            function (err, results, fields) {
                o._doCallback(err, results, fields, callback);
            }
        );
    };

    o.update = function (params, callback) {
        var keyStr = ' ' + params.keys[0] + '=? ';
        for (var i = 1, keysLen = params.keys.length; i < keysLen; ++i) {
            keyStr += ', ' + params.keys[i] + '=? ';
        }
        this.client.query('UPDATE ' + params.table + ' SET ' + keyStr + ' ' + params.conditions, params.values,
            function (err, results, fields) {
                o._doCallback(err, results, fields, callback);
            }
        );
    };

    o.select = function (params, callback) {
        var keyStr = ' ' + params.keys[0] + ' ';
        for (var i = 1, keysLen = params.keys.length; i < keysLen; ++i) {
            keyStr += ', ' + params.keys[i] + ' ';
        }
        this.client.query('SELECT ' + keyStr + ' FROM ' + params.table  + ' ' + params.conditions,
            function (err, results, fields) {
                o._doCallback(err, results, fields, callback);
            }
        );
    };

    o.connet = function () {
        this.client = this.mysql.createConnection(this.dbConfig.dbOptions);
        this.client.query('USE ' + this.dbConfig.dataBase, function(error, results) {
            if(error) {
                console.log('ClientConnectionReady Error: ' + error.message);
                return;
            }else{
                console.log('ClientConnect Success');
            }
        });
    };

    o.disconnet = function () {
        this.client.end();
        this.client = null;
    };

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
