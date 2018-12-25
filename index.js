var express = require('express');
var path = require('path');
var app = express();
var service = require('./service');

//指定模板引擎
app.set("view engine", 'ejs');
//指定模板位置
app.set('views', path.join(__dirname,'src'));
// app.engine('.html', require('ejs').__express);

app.use(express.static(path.join(__dirname, 'src')));
app.use("/", service);

app.listen(8080);
console.log("http://127.0.0.1:8080");