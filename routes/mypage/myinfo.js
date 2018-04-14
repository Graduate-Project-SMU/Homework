var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/dbconfig');
var session = require('express-session');
var async = require('async');

router.post('/', function(req,res,next){
      let taskArray = [
        (callback) => {
          if(req.session.email){
            UserData.find({
              email: req.session.email
            }, (err,data)=>{
              if(err){
                res.status(500).send({
                  stat : "fail",
                  msgs : "find error"
                });
                callback("find error" + err);
              }
              else{
                if(data[0]){
                  res.status(200).send({
                      stat:"success",
                      data:{
                          email : data[0].email,
                          name : data[0].name,
                          nickname : data[0].nickname,
                          posi: data[0].posi,
                          mkind: data[0].mkind,
                          mServiceStartDate:data[0].mServiceStartDate,
                          gender : data[0].gender
                      }
                  });
                  callback(data,null);
                }
                else{
                  res.status(500).send({
                      stat: "fail",
                      msgs: "no such info"
                  });
                  callback("no such info");
                }
              }
            });
          }
          else{
            res.status(500).send({
              stat : "fail",
              msgs : "no session"
            });
            callback("no session", null);
          }
        }
      ];
      async.waterfall(taskArray, (err, result)=>{
          if(err) console.log(err);
          else console.log(result);
      });
});

/*
router.post('/', function (req, res, next) {
    console.log(req.session.email);
    if (req.session.email) {
        UserData.find({
            email: req.session.email
        }, function (err, data) {
            if (err) {
                res.status(500).send({
                    stat: "fail",
                    msgs: "find error"
                });
            }
            else {
                if (data[0]) {
                    res.status(200).send({
                        stat:"success",
                        data:{
                            email : data[0].email,
                            name : data[0].name,
                            nickname : data[0].nickname,
                            posi: data[0].posi,
                            mkind: data[0].mkind,
                            mServiceStartDate:data[0].mServiceStartDate,
                            gender : data[0].gender
                        }
                    });
                } else {
                    res.status(500).send({
                        stat: "fail",
                        msgs: "no such info"
                    });
                }
            }
        });
    } else {
        res.status(500).send({
            stat: "fail",
            msgs: "no session"
        });

    }

});
*/

module.exports = router;
