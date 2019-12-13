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

var Tag = require('../models/tags');
let express = require('express');
let router = express.Router();

router.getTags = function(req,res) {
    res.setHeader('Content-Type', 'application/json');
    Tag.find(function (err, tags) {
        if(err)
            res.send(err)
        res.send(JSON.stringify(tags,null,5))
    })
}

router.findOneTag = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    Tag.find({tagType: req.params.type, tagColor: req.params.color}, function(err,tag){
        if(err)
            res.json({message: 'Tag NOT Found', errmsg: err})
        else
            res.json({message: 'Tag is found', data: tag})
    })
}

router.getTag = function (req, res){
    res.setHeader('Content-Type','application/json');

    Tag.find({"_id":req.params.id},function(err,tag) {
        if (err)
            res.json({ message: 'TAG NOT Found!', errmsg : err } );
        else
        // res.send(user[userName]);
            res.send(JSON.stringify(tag,null,5))
    });
}

router.editTag = function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    Tag.findById(req.params.id,function (err,tag) {
        if(err)
            res.send(err)
        else{
            tag.tagColor = req.body.tagColor;
            tag.tagType = req.body.tagType;
            // tag.tagDescription = req.body.description;
            tag.save(function(err){
                if(err)
                    res.send(err)
                else
                    res.json({message:'Tag edited!' ,data:tag})
            })
        }
    })
}

router.addTag = function(req,res){
    res.setHeader('Content-Type', 'application/json');

    let tag = new Tag()

    tag.tagType = req.body.tagType;
    tag.tagColor = req.body.tagColor;
    tag.usertoken = req.body.usertoken;

    Tag.find({tagType: req.body.tagType, tagColor:req.body.tagColor, usertoken: req.body.usertoken} , function(err, tags){
        if(err)
            res.json({ message: 'Something wrong!', errmsg : err })
        else{
            if(tags.length == 0){
                tag.save(function(err) {
                    if (err)
                        res.json({ message: 'Tag NOT Added!', errmsg : err } );
                    else{
                        res.json({ message: 'Tag Successfully Added!', data: tag });
                    }
                })
            } else {
                res.json({ message: 'Tag has already existed!' });
            }
        }
    })

}


router.deleteTag = function(req,res){
    // res.setHeader('Content-Type', 'application/json');
    Tag.findByIdAndRemove(req.params.id,function (err) {
        if(err)
            res.send(err)
        else
            res.json({message:"Tag Deleted!"})
    })
}
module.exports = router;
