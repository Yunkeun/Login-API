var express = require('express');

var router = express.Router();              // express의 Router 사용
var passport = require('passport');

// passport.authentiacte 내부 메커니즘에 의해 middleware/passport의 LocalStrategy로 이동 후 인증 처리
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login'   // 로그인 실패 시 다시 로그인 창으로
  }), (req, res) => {
    res
    .status(200)
    .json({ msg: "LOGIN SUCCESS!!" })
    //.redirect('/home');   home 화면 생성 시 위의 메시지 부분 제외하고 /home 으로 돌아가게 하는 함수
  });

// exports
module.exports = router;