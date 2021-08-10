// middleware/auth.js 를 사용하여 user 정보를 받아온다.
// token을 사용하여 user 정보를 받아오는 router

var express = require("express");
var router = express.Router();
var auth = require("../../middleware/auth"); // middleware 불러오기
var User = require("../../models/User");

router.get('/', auth, async (req, res) => {
    try {
        // auth 미들웨어에서 생성해준 req.user를 사용하여 DB에서 user 탐색
        var user = await User.findById(req.user.id).select("-password");
        res.json(user);
        console.log('@@@' + user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

// exports
module.exports = router;