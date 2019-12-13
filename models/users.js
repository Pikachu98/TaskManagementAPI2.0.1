let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
    {
        usertoken: String,
        userName: String,
        userPassword: String,
        userEmail: String,
        photoURL: String,
        userCoins: {type: Number, default: 0},
        tag:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'tag'
        }],
        tree:[{
            type:String,
            ref:'tree'
        }],
        bgm:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'bgm'
        }]
    },
    {
        collection:'users'
    });

module.exports = mongoose.model('User', UserSchema);
