const express = require('express');
const user = require('./routes/api/users');
const profile = require('./routes/api/profiles');
const post = require('./routes/api/posts');

const mongoose = require('mongoose');

const db = require('./config/keys').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('Connected'))
  .catch((err) => console.log(err));

const app = express();

app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', post);

app.get('/', (req, res) => {
  res.json({ data_sender: 'harpinder singh' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
