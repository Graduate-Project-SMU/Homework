var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/dbconfig');
var session = require('express-session');
var async = require('async');

router.get('/',function(req,res,next){
  let taskArray =[
    (callback)=>{
      if(req.session.email)
      {
        req.session.destroy();
        if(req.session){
          res.status(500).send({
            stat:"fail",
            msgs:"can't destroy"
          });
          callback("can't destroy"+err);  //???
          }
          else{
            res.status(201).send({
              stat:"success",
              msgs:"destroy success"
            });
            callback("destroy success",null);
          }
        }

        else{
          res.status(500).send({
            stat: "fail",
            msgs: "no session"
          });
          callback("no session",null);
        }
      }

  ];
  async.waterfall(taskArray, (err, result)=>{
      if(err) console.log(err);
      else console.log(result);
    });
  });

/*
router.get('/', function (req, res, next) {
    console.log(req.session.email + "!!!");
    if(req.session.email){
        req.session.destroy();
        if(req.session){
            res.status(500).send({
                stat:"fail",
                msgs:"cant destroy"
            });
        }else{
            res.status(200).send({
                stat:"success",
                msgs:"logout success"
            })
        }
    }else{
        res.status(500).send({
            stat:"fail",
            msgs:"no session"
        });
    }

});
*/

module.exports = router;
