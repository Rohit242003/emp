const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", async (req, res) => {
        try {
            const url = "mongodb://localhost:27017";
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db("management");
            const coll = db.collection("employe");
            
            const existingRecord = await coll.findOne({ "_id": req.body.id });
            if (existingRecord) {
               
                res.status(400).json({ error: "Record with the provided ID already exists" });
                return;
            }
    
            const record = { "_id": req.body.id, "name": req.body.name1, "salary": req.body.salary };
            const result = await coll.insertOne(record);
            res.json({ insertedId: result.insertedId });
            client.close();
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "An error occurred while saving the record" });
        }
    });


    app.post("/update", async (req, res) => {
        try {
            const url = "mongodb://localhost:27017";
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db("management");
            const coll = db.collection("employe");
            
            const existingRecord = await coll.findOne({ "_id": req.body.id });
            if (existingRecord) {
                const updatedRecord = { $set: { "name": req.body.name1, "salary": req.body.salary } };
                const result = await coll.updateOne({ "_id": req.body.id }, updatedRecord);
                res.json({ modifiedCount: result.modifiedCount });
                client.close();
                return;
            }
        
            res.status(404).json({ error: "Record with the provided ID does not exist" });
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "An error occurred while updating the record" });
        }
    });
    
    

    app.delete("/delete/:id", async (req, res) => {
        try {
            const url = "mongodb://localhost:27017";
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db("management");
            const coll = db.collection("employe");
            
            const record = { "_id": req.params.id };
            const result = await coll.deleteOne(record);
            if (result.deletedCount === 0) {
                res.status(404).json({ error: "Record not found" });
            } else {
                res.json({ deletedCount: result.deletedCount });
            }
            client.close();
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "An error occurred while deleting the record" });
        }
    });
    
    app.get("/read",async(req,res)=>{
        const url = "mongodb://localhost:27017";
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db("management");
            const coll = db.collection("employe");
            coll.find({}).toArray()
            .then(result=>res.send(result))
            .catch(error=>err.send(error));

    });

    app.get("/top-employe", async (req, res) => {
        try {
            const url = "mongodb://localhost:27017";
            const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            const db = client.db("management");
            const coll = db.collection("employe");
            const sortedEmployees = await coll.find({}).sort({ "salary": -1 }).limit(5).toArray();
            res.json(sortedEmployees);
        } catch (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "An error occurred while fetching the top employees" });
        }
    });



app.listen(9000,()=>{console.log("ready @9000");});