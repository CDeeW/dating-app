const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://CDW:newpassword@cluster-dating.xg9ca.mongodb.net/Cluster-Dating?retryWrites=true&w=majority';

const app = express();

app.get('/', async (req, res) => {
  res.json('hssi');
});

app.post('/signup', (req, res) => {
  const client = new MongoClient(uri);
});

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log('Server running on Port: ' + PORT));
