const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
// dont really understand the : between these 2 below
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const uri =
  'mongodb+srv://CDW:newpassword@cluster-dating.xg9ca.mongodb.net/Cluster-Dating?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.json('hssi');
});

app.post('/signup', async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    //check if user already exists by using email address
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .send('user already exists. Please use a different email');
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    // insert the data object into the mongoDB users collection
    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
  }
});

app.post('/login', async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    console.log('user' + JSON.stringify(user));

    // she did email but i think it might have to be sanitizedEmail

    console.log('correct password:' + correctPassword);
    if (user && correctPassword) {
      console.log('log in success');
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      //console.log('backend' + token);
      res.status(201).send({ token, userId: user.user_id });
    } else {
      res.status(400).send('Invalid credentials');
      console.log('fail');
    }
  } catch (err) {
    console.log(err);
  }
});

app.get('/user', async (req, res) => {
  console.log('backend get user');
  const client = new MongoClient(uri);

  // dont really know the difference between req.params and req.body
  console.log('query:' + JSON.stringify(req.query));
  const userId = req.query.userId;
  console.log('in backend: ' + userId);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const query = { user_id: userId };
    const user = await users.findOne(query);

    res.send(user);
  } finally {
    await client.close();
  }
});

app.get('/users', async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);
  console.log('query' + JSON.stringify(req.query));
  console.log('user Ids of match in backend: ' + userIds);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];
    const foundUsers = await users.aggregate(pipeline).toArray();
    console.log(foundUsers);
    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

app.get('/gendered-users', async (req, res) => {
  const client = new MongoClient(uri);
  const gender = req.query.gender;

  console.log('gender: ' + gender);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const query = { gender_identity: gender };

    const foundUsers = await users.find(query).toArray();
    console.log(foundUsers);
    res.json(foundUsers);
  } finally {
    await client.close();
  }
});

app.put('/user', async (req, res) => {
  const client = new MongoClient(uri);

  const formData = req.body.formData;

  try {
    // connect to the user database
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    // query the user from the user collection based on the userId

    // dont know what query does
    const query = { user_id: formData.user_id };

    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);
    res.status(200).send(insertedUser);
  } finally {
    client.close();
  }
});

app.put('/addmatch', async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    // connect to the user database
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: userId };

    // dont really get the updateDocument bit here
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };

    const user = await users.updateOne(query, updateDocument);
    console.log('user updated one:' + user);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log('Server running on Port: ' + PORT));
