var express = require("express");
var mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'blog2',
    port: 3306
});
// 导出查询相关
module.exports = pool;