var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var UserData = require('../../config/dbconfig');
var session = require('express-session');
var async = require('async');

router.post('/', function (req, res, next) {

  let taskArray = [

    (callback) =>{
      if(req.session.email){
        UserData.find({
          email: req.session.email
        },function(err, data){
          if(err){
            res.status(500).send({
                stat: "fail",
                msgs: "find error"
            });
            callback("find Error");
          } else{
            callback(null,data);
          }
        });
      }
    },
    (data,callback) => {
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
        callback("find myInfo",null);
      } else {
        res.status(500).send({
            stat: "fail",
            msgs: "no such info"
        });
        callback("no such info");
      }
    }
  ];

  async.waterfall(taskArray, (err, result)=>{
  if(err) console.log(err);
  else console.log(result);
  });

});


module.exports = router;
