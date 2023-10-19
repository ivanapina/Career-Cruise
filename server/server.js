//express server will go here
const express = require('express');
const User = require('./models/Profile'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./config/connection');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');

const Profile = require('./models/Profile');

const path = require('path');
const { authMiddleware } = require('./utils/auth');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//signup route 

app.post('/register', async (req, res) => {
  const { userName, email, password, company } = req.body;

  try {
    const existingProfile = await Profile.findOne({ email });

    if (existingProfile) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const profile = new Profile({
      userName,
      email,
      password,
      company,
    });

    const saltRounds = 10;
    Profile.password = await bcrypt.hash(password, saltRounds);

    await profile.save();

    const token = jwt.sign({ profileId: profile._id }, 'secret-key', {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

//login route

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const profile= await Profile.findOne({ email });

    if (!profile || !(await profile.isCorrectPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ profileId: profile._id }, 'secret-key', {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server,
    { context: authMiddleware }
  ));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port http://localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
}

startApolloServer();
