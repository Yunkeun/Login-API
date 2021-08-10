var express = require('express');
var User = require('../../models/User');    // user model 불러오기
var router = express.Router();              // express의 Router 사용
var bcrypt = require('bcryptjs');           // 암호화 모듈
var jwt = require('jsonwebtoken');          // json web token 모듈
var secretObj = require('../../config/secret');   // jwt secret key

router.post(
    '/',
    async (req, res) => {
        // req의 body 정보를 사용하려면 server.js 에서 따로 설정을 해줘야한다.
        var { name, email, password } = req.body;

        try {
            // email을 비교하여 user가 이미 존재하는지 확인
            var user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists "}] });
            }
            // user에 name, email, password 값 할당
            user = new User({
                name,
                email,
                password,
            });

            // password를 암호화 하기
            var salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();      // db에 user 저장하기

            // json web token 생성 및 response
            var payload = {
                user: {
                    id: user.id,
                },
            };
            jwt.sign(
                payload,                    // token으로 변환할 데이터
                secretObj.jwtSecret,                // secret key 값
                { expiresIn: "1h"},         // token의 유효시간을 1시간으로 설정
                (err, token) => {
                    if (err) throw err;
                    res.send({ token });
                }
            );

            // res.send("Success");
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error!");
        }
    }
);

// exports
module.exports = router;