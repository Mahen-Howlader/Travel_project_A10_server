const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware 
app.use(cors())
app.use(express.json());


// Travel
// MwIX9ciiEGQteDH8

const uri = `mongodb+srv://Travel:MwIX9ciiEGQteDH8@cluster0.iagloem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



async function run() {
    const travelCollection = client.db("Travel").collection("TouristsSpots");
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });

        app.get("/touristsspots", async (req, res) => {
            const findData = await travelCollection.find().toArray()
            res.send(findData)
            // console.log(findData)
        })

        app.get("/touristsspots/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: new ObjectId(id) };
            const result = await travelCollection.insertOne(query);
            res.send(result)
        })

        app.post("/touristsspots", async (req, res) => {
            const data = req.body;
            const result = await travelCollection.insertOne(data);
            res.send(result)
        })

        app.get("/mylist/:email", async (req,res) => {
            const email = req.params.email;
            const result = await travelCollection.find({user_email : email}).toArray()
            res.send(result)
        })

        app.delete("/mylist/:id", async (req,res) => {
            const id = req.params.id;
            const query = {_id : new ObjectId(id)}
            const result = await travelCollection.deleteOne(query)
            res.send(result)
        })
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})