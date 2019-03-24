/*
var fun=(req, res) => {
    var uname = req.query.value;
    // var pwd=req.query.pwd;
    res.header("Access-Control-Allow-Origin", "*");
    res.send("name: " + uname);
}

module.exports=fun*/

var express = require("express");
var router = express.Router();
var pool = require("../pool");
var url = require('url');

router.post("/writeData", (req, res) => {
    var title = req.body.title;
    console.log(title);
    var create_time = new Date();
    var content = req.body.content;
    var sql = 'INSERT INTO blog2.article(title, content ,create_time) VALUES (?, ?, ?)'
    pool.query(sql, [title, content, create_time], function (err, data) {

        console.log(data)
        if (data.affectedRows >= 1) {
            res.send("成功")
        } else {
            res.send("失败")
        }

    })

})

router.post("/getALL", (req, res) => {
    // 解析 url 参数
    // var params = url.parse(req.url, true).query;
    var sql = 'SELECT * FROM  article'
    pool.query(sql, function (err, data) {

        // console.log(data)
        res.send(data)
    })

})

router.post("/userData", (req, res) => {

    var sql = 'SELECT * FROM blog2.user';
    pool.query(sql, function (err, data, fields) {
        // console.log(err)
        if (err)
            throw err;
        res.end(JSON.stringify(data))
        //console.log(data)
        // console.log(fields)
    })

})

router.get("/getMessage", (req, res) => {
    var data = req.query;
    res.end(JSON.stringify(data))
    // res.send(data);

})

router.post("/login", (req, res) => {
    var body = req.body
    var name = body.user;

    var pwd = body.pwd;

    var sql = "SELECT manager_name,manager_pwd from blog2.manager";
    pool.query(sql, function (err, data) {
        console.log(data);
        var data = JSON.stringify(data)
        var data = JSON.parse(data)

        console.log(data[0].manager_name);
        if (name == data[0].manager_name && pwd == data[0].manager_pwd) {
            // res.send("登陆成功")
            // window.location.href = '../public/index.html'
            // res.sendFile(__dirname + "/public/index.html")
            // res.sendFile(path.join(__dirname, './static', 'index.html'));
            res.redirect('/index');
            return

        } else {
            res.send("登陆失败")
        }
    })
})
module.exports = router;