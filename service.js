var connection = require('./mysql');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function (req, res) {
    res.redirect('/login');
});

router.get('/login', function (req, res) {
    res.render('views/login');
});

var paramsUrlencoded = bodyParser.urlencoded({
    extended: false
});
router.post('/login', paramsUrlencoded, function (req, res) {
    var usrname = req.body.username;
    var pwd = req.body.password;
    // console.log(usrname + ": " + pwd);
    var loginSql = "select * from user where username ='" + usrname + "' and password ='" + pwd + "';";
    connection.query(loginSql, function (err, info) {
        if (err) {
            console(err);
            return;
        }
        if (info.length < 1) {
            console.log("用户名或密码错误");
            res.redirect('/login')
        } else {
            console.log(info);
            res.redirect('/add');
        }

    });
});

router.get('/add', function (req, res) {
    res.render('views/add');
});

router.post('/add', paramsUrlencoded, function (req, res) {
    // var id = req.body.id;
    var name = req.body.name;
    var unit = req.body.unit;
    var inPrice = req.body.inPrice;
    var outPrice = req.body.outPrice;
    var addSql = "insert into product(id,name,unit,inPrice,outPrice,reminder) values(0,?,?,?,?,1);";
    var addParams = [name, unit, inPrice, outPrice];
    // var addParams = ['奶茶', '杯', '1.5', '3'];
    connection.query(addSql, addParams, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
    });
});

router.get('/query', function (req, res) {
    var querySql = "select * from product";
    /* var info = [
        {
            id: "001",
            name: "www",
            inPrice: "10",
            outPrice: "5",
            reminder: "2",
            unit: "w"
        }
    ]; */
    connection.query(querySql, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(info);
        res.render('views/query', {
            product: info
        });
    });
});

router.post('/query', paramsUrlencoded, function (req, res) {
    var id = req.body.id;
    var queryIdSql = "select * from product where id = '" + id + "'";
    connection.query(queryIdSql, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.render('views/query', {
            product: result
        });
    });
});

router.get('/update', function (req, res) {
    res.render('views/update');
});

router.post('/update', paramsUrlencoded, function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var unit = req.body.unit;
    var inPrice = req.body.inPrice;
    var outPrice = req.body.outPrice;
    var reminder = req.body.reminder;
    var updateSql = "update product set name=?, unit=?, inPrice=?, outPrice=?, reminder=? where id=?"
    var updateParams = [name, unit, inPrice, outPrice, reminder, id];
    connection.query(updateSql, updateParams, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
});

router.get('/sell', function (req, res) {
    res.render('views/sell');
});

router.post('/sell', paramsUrlencoded, function (req, res) {
    var id = req.body.id;
    var deleteSql = "delete from product where id = '" + id + "'";
    connection.query(deleteSql, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
    res.render('views/sell');
});
module.exports = router;