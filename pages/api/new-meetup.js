import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect("mongodb+srv://amohamed5535:j1IJSAFLlXtQEgdf@cluster0.gnskzxn.mongodb.net/meetups?retryWrites=true&w=majority")
        const db = client.db()

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({ message: "Meetup Inserted" })
    }

    if (req.method === 'GET') {
        const data = req.body;
    }

}

export default handler;