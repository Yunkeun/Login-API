var express = require('express');

var router = express.Router();              // express의 Router 사용
var passport = require('passport');

// passport.authentiacte 내부 메커니즘에 의해 middleware/passport의 LocalStrategy로 이동 후 인증 처리

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      res.status(403).send(info.message);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error('loginErr');
        return next(loginErr);
      }
      return res.status(200).send('login success');
    });
  })(req, res, next);
});

// exports
module.exports = router;