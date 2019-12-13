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

var Tree = require('../models/trees');
let express = require('express');
let router = express.Router();

router.findAllPlants = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    Tree.find(function (err, trees) {
        if(err)
            res.send(err)
        res.send(JSON.stringify(trees,null,5))
    })
}

router.findOneTree = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    Tree.find({treeName: req.params.name}, function(err,tree){
        if(err)
            res.json({message: 'Tree NOT Found', errmsg: err})
        else
            res.json({message: 'Tree is found', data: tree})
    })
}

module.exports = router;
