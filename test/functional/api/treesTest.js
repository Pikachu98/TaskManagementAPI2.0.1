const mongoose = require("mongoose")
const chai = require("chai");
const expect = chai.expect;
const _ = require("lodash")
const dotenv = require("dotenv");
dotenv.config();

let server = require("../../../bin/www")

describe("Trees", ()=> {

    before(function (done) {

        let username = "qianwenzhangnancy"
        let password = "zqw123456"
        let mongodburl = "mongodb+srv://" + username + ":" + password + "@wit-qianwenzhang-cluster-yyg37.mongodb.net/taskmanagementdb"
        mongoose.connect(mongodburl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

        let db = mongoose.connection
        db.on("error", console.error.bind(console, "connection error"))
        db.once("open", function () {
            console.log("Connected to database Successfully!!")
            done()
        })
    })
    describe("GET /plantList",  () => {
        it("should return all the plants in store", done => {
            request(server)
                .get("/plantList")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .end((err, res) => {
                    try {
                        expect(res.body).to.be.a("array")
                        // expect(res.body.length).to.equal(7);
                        //
                        // let result = _.map(res.body, trees => {
                        //     return {treeName: trees.treeName};
                        // });
                        // expect(result).to.deep.include({treeName: "Cherry bolossom"});
                        // expect(result).to.deep.include({treeName: "Rose"});
                        // expect(result).to.deep.include({treeName: "Lemon Tree"});
                        // expect(result).to.deep.include({treeName: "Chinese Pine Tree"});
                        // expect(result).to.deep.include({treeName: "Scarecrow"});
                        // expect(result).to.deep.include({treeName: "Watermelon"});
                        // expect(result).to.deep.include({treeName: "testTree"});

                        done()
                    } catch(e){
                        done(e)
                    }
                })
        })
    })

    // describe("POST /addTree", () => {
    //     describe("if the inputs are valid", () => {
    //         it("should return confirmation and update database ", () => {
    //             const tree = {
    //                 treeName: "Cactus",
    //                 //0 for bush,1 for tree
    //                 treeType: 1,
    //                 treePicPath: "",
    //                 treeDescription: "I am the most dangerous and coolest plant, am I?",
    //                 coinsToBuy: 500
    //             }
    //             return request(server)
    //                 .post("/addTree")
    //                 .send(tree)
    //                 // .expect(200)
    //                 .then(res => {
    //                     expect({message: "New tree added!"})
    //                 })
    //         })
    //
    //         // after(() => {
    //         //     return request(server)
    //         //         .get("/plantList")
    //         //         .expect(200)
    //         //         .then(res => {
    //         //             expect(res.body.length).equals(8);
    //         //         });
    //         // });
    //     })
    //
    //     describe("if the inputs are invalid", () => {
    //         it("should return the error message", () => {
    //             const tree = {
    //                 treeName: "Cactus",
    //                 //0 for bush,1 for tree
    //                 treeType: "feinminfeineife",
    //                 treePicPath: "",
    //                 treeDescription: "I am the most dangerous and coolest plant, am I?",
    //                 coinsToBuy: 500
    //             }
    //             return request(server)
    //                 .post("/addTree")
    //                 .send(tree)
    //                 .expect(200)
    //                 .then(res => {
    //                     expect({message: "tree type should be a number"})
    //                 })
    //         })
    //     })
    //
    //     describe("if input a tree name that has already existed", () => {
    //         it("should return the message that let you know the tree has already existed", () => {
    //
    //             const tree = {
    //                 treeName: "Cactus",
    //                 //0 for bush,1 for tree
    //                 treeType: 1,
    //                 treePicPath: "",
    //                 treeDescription: "I am the most dangerous and coolest plant, am I?",
    //                 coinsToBuy: 500
    //             }
    //             return request(server)
    //                 .post("/addTree")
    //                 .send(tree)
    //                 .expect(200)
    //                 .then(res => {
    //                     expect({message: "tree has already existed"})
    //                 })
    //         })
    //
    //     })
    // })


})
