var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = () => {
    passport.serializeUser((user, done) => {        // Strategy 성공 시 호출됨
        done(null, user);                           // 여기의 user가 deserializeUser의 첫번째 매개변수로 이동
    });

    passport.deserializeUser((user, done) => {      // Strategy 성공 시 호출됨
        done(null, user);                           // 여기의 user가 req.user가 됨
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,  // 세션에 저장 여부
        passReqToCallback: false,
    }, (email, password, done) => {
        User.findOne({ email: email}, (findError, user) => {
            if (findError) {
                console.log('login fail : findError -> ' + findError);
                return done(findError);  // 서버 에러 처리
            }
            if (!user) {
                console.log('login fail : User does not exist.');
                return done(null, false, { message: '존재하지 않는 아이디입니다.'}); // 임의 에러 처리
            }
            return user.comparePassword(password, (passError, isMatch) => {
                if (isMatch) {
                    console.log('login success');
                    return done(null, user);        // 검증 성공
                }
                else {
                    console.log('login fail : Wrong password');
                    console.log(passError);
                    return done(null, false, { message: '비밀번호가 틀렸습니다' });    // 임의 에러 처리
                }
            });
        });
    }));
};