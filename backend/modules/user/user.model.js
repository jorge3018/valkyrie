const { Int32 } = require('bson');

(function () {
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        user: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        stateUser: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            required: true
        }
    });

    module.exports = mongoose.model('users', UserSchema);
})();