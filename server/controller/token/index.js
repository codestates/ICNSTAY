const jwt = require('jsonwebtoken')
var response = {
  check: false,
  expired: true,
  data: null,
  message: null
}

module.exports = {
  decoder: (token, TOKEN_SECRET) => {
    if(token){
      response.check = true;
      try {
        const decoder = jwt.verify(token, TOKEN_SECRET);
        response.expired = false;
        const { exp, iat, ...content } = decoder;
        response.data = content;
        response.message = 'ok'
      }catch (err) {
        response.message = `${token} expired`;
      }
    }else {
      response.message = `${token} doesn't exist`;
    }
    return response;
  }
}