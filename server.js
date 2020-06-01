const express = require('express');
const user = require('./routes/api/users');
const profile = require('./routes/api/profiles');
const post = require('./routes/api/posts');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// database configuration and connect to mongodb
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('Connected'))
  .catch((err) => console.log(err));

// body parse middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

//use routes
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/post', post);

// server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
