// var mongodbUri = 'mongodb+srv://qianwenzhangnancy:zqw123456@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagement';
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

var User = require('../models/users');
let express = require('express');
let router = express.Router();

router.findOne = (req,res) =>{
    res.setHeader("Content-Type","application/json")

    let query = req.params.id
    let queryString = query.toString()
    User.find({"userName":{$regex:queryString}},function(err,user) {
        if (err)
            res.json({ message: "USER NOT FOUND", errmsg : err } )
        else{
            // res.send(user[userName]);

            if(user.length == 0)
                res.json({message:"USER NOT FOUND"})
            // if(user != null)
            else
                res.send(JSON.stringify(user,null,5));
                // res.json({ message: "User has found! Do you want to send a request?",data:user} )

        }
    })
}

router.findAllUsers = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(users,null,5));
    });
}

router.findByUserToken = (req,res) => {
    res.setHeader('Content-Type', 'application/json');

    var token = req.params.usertoken;

    User.find({usertoken: token}, function (err, user) {
        if (err)
            res.send(err);
        return res.json({message:'got  the user' , data: user})
        // res.send(JSON.stringify(user,null,5));

    })
}


router.createUser = (req,res) => {
    res.setHeader('Content-Type', 'application/json');
    var user = new User();
//     //verify whether the userName and userEmail have existed or not
//     User.findOne({'userName': req.body.userName}, function (err, user) {
//         if (err) {
//             res.json({message: 'There is an error!', errmsg: err});
//         } else {
//             if(){
    user.usertoken = req.body.usertoken
    user.userName = req.body.userName
    user.photoURL = req.body.photoURL
    console.log(JSON.stringify(user, null, 5))
    console.log(user.usertoken)
    user.tree.push('Cherry Bolossom')
    user.tree.push('Rose')
    user.tag.push('5dc18a8ed5f3917d887392d4')
    user.tag.push('5db633ca1666192d90185682')
    user.tag.push('5db633dc1666192d90185683')
    user.tag.push('5dc18b129825c62030873d2e')
    user.coins = 0;
    // user.userName = req.body.userName;
    // user.userEmail = req.body.userEmail;
    // user.userPassword = req.body.userPassword;
    user.save(function (err) {
        if (err)
            res.json({message: 'USER NOT Added', errmsg: err});
        else
            res.json({message: 'User has registered successfully', data: user})
    })
//             }
//             else{
//                 res.json({message: 'USER NOT Added'});
//             }
//         }
//     });
}

router.getCoins = (req, res)  => {
    res.setHeader('Content-Type','application/json');
    User.findById({"_id":req.params.id},{"_id":0,"userCoins":1},function(err,user) {
        if (err)
            res.json({ message: 'USER NOT Found!', errmsg : err } );
        else{
            user.save(function(err){
                if(err)
                    res.json({message:'ERROR'});
                else
                    res.json({message:'your coins: '+ user.toString()});
            })
        }
    });
}

router.deleteUser = (req,res) => {
    User.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.json({message:'User NOT DELETED!', errmsg:err})
        else
            res.json({message:'User Successfully Deleted!'});
    });
}

router.getMytrees = (req,res) => {
    res.setHeader('Content-Type','application/json');
    User.find({usertoken: req.params.usertoken}, function(err, user){
        if(err)
            res.json({message: 'User not found', errmsg: err})
        else{

            res.json({message:'UserIsFound!', data:user});
        }
            // res.send(JSON.stringify(user.tree,null,5));
    })
}


router.putTree = (req,res) => {
    // var token = req.params.usertoken;
    res.setHeader('Content-Type','application/json');
    User.findById(req.params.id, function(err, user){
        if (err)
            res.json({ message: 'USER not Found!', errmsg : err } );
        else {
            user.save(function(err){
                if(err)
                    res.json({message:'Tree Not Boughted Successfully!'})
                else{
                    if(user.userCoins <= 500){
                        res.json({message:'Sorry, you do not have enough money!'})
                    }
                    else{
                        user.userCoins -= 500;
                        user.tree.push(req.body._id);
                        res.json({message:'Tree Successfully Bought!', data:user});
                    }
                }
            })
        }
    })
}



module.exports = router;
