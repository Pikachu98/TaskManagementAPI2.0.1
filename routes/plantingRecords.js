var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb';
let mongoose = require('mongoose');
mongoose.connect(mongodbUri);

let db = mongoose.connection;
db.on('error',function (err) {
    console.log('Unable to Connect to  [' + db.name + ']',err);
});
db.once('open',function () {
    console.log('Successfully Connected to  [' + db.name + ']');
});
// var User = require('../models/users');
var Record = require('../models/plantingRecords');
let express = require('express');
let router = express.Router();
let sd = require('silly-datetime');



router.addRecord = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    // console.log(req.body)
    let record = new Record();

    record.suppFocusTime = req.body.suppFocusTime;
    record.usertoken = req.body.usertoken;
    record.tag = req.body.tag;
    record.tree = req.body.tree;
    record.recordDescription = req.body.recordDescription;



    let nowTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    record.startTime = nowTime;
    record.endTime = nowTime;

    record.realFocusTime = 0;


    record.save(function(err) {
        if (err)
            res.json({ message: 'Record NOT Added!', errmsg : err } );
        else{
            console.log(record)
            res.json({ message: 'Record Successfully Added!', data: record });
        }
    });
}

router.deleteRecord = (req, res) => {

    var id = req.params.id;
    // var token = req.params.usertoken;

    Record.findByIdAndRemove( {_id : id} , function(err) {
        if (err)
            res.json({ message: 'Record NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Record Successfully Deleted!'});
    });
}


router.findOne = (req, res) => {

    var id = req.params.id;
    var token = req.params.usertoken;
    res.setHeader('Content-Type', 'application/json');
    Record.find({usertoken : token, _id : id},function(err, record) {
        if (err)
            res.json({ message: 'Record NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(record,null,5));
    })

}


function getTotalTime(array){
    let totalTime = 0;
    array.forEach(function(obj){
        totalTime += obj.focusTime;
    })
    return totalTime;
}

function getCoin(time){
    let coin = 0;
    if(time < 25){
        coin = Math.round(time / 5) + 1;
    }
    else if (time < 60){
        coin = Math.round(time / 5) + 4;
    }
    else if (time < 120){
        coin = Math.round(time / 5) + 7;
    }else{
        coin = Math.round( time / 5) + 12;
    }
    return coin
}

function getTime(startTime, endTime){
    let realTime = 0;
    let daystart = parseInt(startTime.substring(8,10));
    let dayend = parseInt(endTime.substring(8,10));
    let hourstart = parseInt(startTime.substring(11,13));
    let hourend = parseInt(endTime.substring(11,13));
    let minstart = parseInt(startTime.substring(14,16));
    let minend = parseInt(endTime.substring(14,16))
    if(daystart == dayend){
        if(hourstart == hourend){
            realTime = minend - minstart;
        }
        else{
            realTime = (hourend - hourstart)*60 + minend - minstart;
        }
    }
    else{
        realTime = ((dayend - daystart) *24 + hourend - hourstart) * 60 +  minend - minstart;
    }
    return realTime
}

router.updateRecord = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var token = req.params.usertoken;
    Record.findById({usertoken : token, _id : id},function(err, record) {
        if (err)
            return res.json(err);
        else {
            if (record == null) {
                return res.json({message: "record NOT Found!"});
            } else {
                console.log(record)
                record.endTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                console.log(record.suppFocusTime);
                console.log(record._id);

                console.log(record.startTime);
                // console.log(typeof (record.startTime)+"hhhhhhhhhh!!!!");
                // record.suppFocusTime = req.body.suppFocusTime;
                record.realFocusTime = getTime(record.startTime,record.endTime);
                record.coins = getCoin(record.realFocusTime);
                // record.tag = req.body.tag;
                // record.tree = req.body.tree;
                // record.recordDescription = req.body.recordDescription;
                // record.usertoken = req.body.usertoken;

                record.save(function (err) {
                    if (err)
                        return res.json({message: "record NOT Successfully Updated!", errmsg: err});
                    // return a error message
                    else
                        return res.json({message: 'record Successfully Updated!', data: record});
                    // return a success message
                })
            }
        }
    })
}

router.findRecOfOne = (req,res) => {
    res.setHeader('Content-Type', 'application/json');

    var token = req.params.usertoken;

    Record.find({usertoken: token}, function (err, records) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(records,null,5));

    })
}

module.exports = router;
