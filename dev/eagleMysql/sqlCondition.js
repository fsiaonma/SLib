sl.sqlCondition = function () {
  
    var sql = sql || '';

    this.where = function (str) {
        sql += ' where ' + str;
        return this;
    };

    this.and = function (str) {
        sql += ' and ' + str;
        return this;
    };

    this.getSql = function () {
        return sql;
    };

};