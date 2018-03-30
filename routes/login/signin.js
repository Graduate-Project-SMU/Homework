var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/dbconfig');
var session = require('express-session');
router.post('/', function (req, res, next) {
    UserData.find({
        email: req.body.email
    }, function (err, data) {
        if (err) {
            res.status(500).send({
                stat: "fail",
                msgs: "find error"
            });
        }
        else {
            if (err) {
                res.status(500).send({
                    stat: "fail",
                    msgs: "hashing fail"
                });
            }
            else {
                if (err) {
                    res.status(201).send({
                        stat: "success",
                        message: "login success"
                    });
                } else {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "login fail"
                    })
                }
            }


        }
    });
});


module.exports = router;
