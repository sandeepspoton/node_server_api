var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
var port = 5001

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        for (var i = 0; i < users.length; i++) {
            if (req.params.id == users[i].id) {
                console.log(users[i]);
                res.end(JSON.stringify(users[i]));
                break;
            }
        }
    });
})

app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        console.log(req.body);
        res.end(JSON.stringify(data));
    });
})

app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
        res.end(data);
    });
})

var server = app.listen(port, function () {
    var host = server.address().address
    console.log("Example app listening at http://%s:%s", host, port)
})