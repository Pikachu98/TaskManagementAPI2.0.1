let mongoose = require('mongoose');

let TreeSchema = new mongoose.Schema(
    {
        treeName: String,
        //0 for bush,1 for tree
        treeType: String,
        treePicPath:String,
        treeDescription:String,
        coinsToBuy: {type: Number, default: 500}

    },
    {
        collection:'trees'
    });

module.exports = mongoose.model('Tree',TreeSchema);
