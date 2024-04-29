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

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.iagloem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const countryCollection = client.db("Travel").collection("Countrys");
    const countryToptenInfo = client.db("Travel").collection("ToptenInfo");
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

        // app.get("/touristsspots/:id", async (req, res) => {
        //     const id = req.params.id;
        //     console.log(id)
        //     const query = { _id: new ObjectId(id) };
        //     const result = await travelCollection.insertOne(query);
        //     res.send(result)
        // })

        app.post("/touristsspots", async (req, res) => {
            const data = req.body;
            const result = await travelCollection.insertOne(data);
            res.send(result)
        })

        app.get("/mylist/:email", async (req, res) => {
            const email = req.params.email;
            const result = await travelCollection.find({ user_email: email }).toArray()
            res.send(result)
        })

        app.get("/update/:id", async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const result = await travelCollection.findOne({ _id: new ObjectId(id) })
            res.send(result)
        })

        app.delete("/mylist/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await travelCollection.deleteOne(query)
            res.send(result)
        })

        app.put("/touristsspots/:id", async (req, res) => {
            const user = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
  
                $set: {
                    image : user.image,
                    tourists_spot_name : user.tourists_spot_name,
                    location : user.location,
                    travel_time : user.travel_time,
                    average_cost : user.average_cost,
                    seasonality : user.seasonality,
                    total_visitors_per_year : user.total_visitors_per_year,
                    user_email : user.user_email,
                    user_name : user.user_name,
                    short_description : user.short_description,
                    country_Name : user.country_Name,
                },
              };
            const result = await travelCollection.updateOne(filter, updateDoc, options);
            // console.log(result)
              res.send(result)
        })


        // countrys section data 
        app.get("/countrys", async (req, res) => {
            const findData = await countryCollection.find().toArray()
            res.send(findData)
            // console.log(findData)
        })
        // countryToptenInfo
        app.get("/topten",async (req,res) => {
            const findData = await countryToptenInfo.find().toArray()
            res.send(findData)
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