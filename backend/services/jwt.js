'use strict'

var jwt = require('jwt-simple');
var secret = 'dutyFree';

exports.createToken = function(user){
  var payload = {
      sub: user._id,
      identificacion: user.identificacion, 
      rol:user.rol,
      iat: new Date().getTime(),
      exp: new Date().getTime()+ (1000*60*60*24*360)
  }
  // console.log(payload)
  return jwt.encode(payload, secret);
};

