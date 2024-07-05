const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

app.use(express.json());

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync the models
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
