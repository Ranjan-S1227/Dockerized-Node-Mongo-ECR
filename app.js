const express = require('express');
const { dirname } = require('path/posix');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({
    extended : true
}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + '/index.html' );
});

app.post("/edit", async (req, res) => {
    var userObj = req.body;

    try {
        const client = await MongoClient.connect("mongodb://root:password@mongoDB:27017");
        console.log("Connected to database");

        const db = client.db('user-account');

        // Using insertOne to create a new document
        const result = await db.collection('users').insertOne(userObj);
        
        client.close();

        if(result.insertedId) {
            res.send({ message: "User added successfully", userId: result.insertedId });
        } else {
            res.status(500).send('Error adding user');
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send('Error processing your request');
    }
});












app.listen(3000,()=>{
    console.log("Server up and running on 3000!")
})