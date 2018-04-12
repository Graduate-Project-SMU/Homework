var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/dbconfig');
var session = require('express-session');
var async = require('async');

router.get('/', function (req, res, next) {

  let taskArray = [
    (callback) => {
      if(req.session.email){
          req.session.destroy();
          if(req.session){
              res.status(500).send({
                  stat:"fail",
                  msgs:"cant destroy"
              });
              callback('session destroy failed');
          }else{
              res.status(200).send({
                  stat:"success",
                  msgs:"logout success"
              });
              callback(null,"session destroy success");
          }
      }else{
          res.status(500).send({
              stat:"fail",
              msgs:"no session"
          });
          callback('session destroy failed');
      }

    }
  ];

  async.waterfall(taskArray, (err, result)=>{
  if(err) console.log(err);
  else console.log(result);
  });

});


module.exports = router;
