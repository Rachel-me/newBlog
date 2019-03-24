var express = require('express');
var app = express();
var mysql = require('mysql');
var fs = require("fs")
var bodyParser = require('body-parser');
var api = require("./routes/api")

// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({extended: false});
//把页面加载到服务器里面
app.use(express.static('public'));

//使用body-parser中间件
app.use(bodyParser.urlencoded({
    extended: false
}));

/*app.post('/getMessage', urlencodedParser, (req, res) => {
    // 输出 JSON 格式
    var response = {
        "用户名": "",
        // "密码":req.body.pwd
    };
    console.log(response);
    res.send(JSON.stringify(response));
})*/

var server = app.listen(8083, function () {
    console.log("success,端口8083");
})
// app.get("/", (req, res) => {
//     const data = fs.readFileSync("./public/login.html");
//     res.send(data);
// })
app.get('/index', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/public/login.html");
})

// 把api.js文件中的接口挂载到/api下
app.use("/api", api);