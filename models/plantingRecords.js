let mongoose = require('mongoose');

let RecordSchema = new mongoose.Schema(
    {
        startTime: String,
        endTime: String,
        suppFocusTime: String,
        realFocusTime: Number,
        // It should be a tag id, if I have time at the end, I will change it to id, same as tree
        tag: String,
        tree: String,
        recordDescription: String,
        coins: Number,
        usertoken: String
        // user:[{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'user'
        // }],
        // tree:[{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'tree'
        // }],
        // tag:[{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'tag'
        // }],
        // plantedTime: Date,
        // endedTime: Date,
        // focusTime: {type: Number, default: 0},
        // coinsEarn: {type: Number, default: 0},

    },
    {
        collection:'records'
    });

module.exports = mongoose.model('Record', RecordSchema);
