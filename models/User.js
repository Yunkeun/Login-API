var mongoose = require('mongoose'); // mongoose 불러오기
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.methods.comparePassword = function(inputPassword, cb) {
    // db에 저장한 password가 암호화되었기 때문에 compareSync함수를 통해 비교한다.
    var same = bcrypt.compareSync(inputPassword, this.password)

    if (same) {
        cb(null, true);
    } else {
        cb('error');
    }
};

module.exports = User = mongoose.model('user', UserSchema)
