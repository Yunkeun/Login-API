// express 불러오기
var express = require('express');
var connectDB = require("./config/db");
var session = require('express-session'); // 세션 설정
var passport = require('passport'); // 여기와
var passportConfig = require('./middleware/passport'); // 여기
var secretObj = require('./config/secret');
// app 생성
var app = express();
// PORT 번호 기본값 3000으로 설정
var PORT = process.env.PORT || 3000;
var sessionSecret = secretObj.sessionSecret

app.use(session({ secret: sessionSecret, resave: true, saveUninitialized: false })); // 세션 활성화
// passport를 미들웨어로 등록
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

// get 요청시 "API running"을 response 해주기
/*
app.get("/", (req, res) => {
    res.send("API Running");
});
*/

// Connect DB
connectDB();

passportConfig(); // passport

// 첫번째 인자로 PORT 번호
// 두번째 인자로 callback 함수를 통해 server 구축 성공시 console log
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// allow us to get the data in request.body
app.use(express.json({ extended: false }));
// api route
app.use("/register", require("./routes/api/register"));
app.use("/getUser", require("./routes/api/getUser"));
app.use("/", require("./routes/api/login"));