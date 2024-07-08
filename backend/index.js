const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/userModel'); 
const userRoutes = require('./routes'); 
const cors = require('cors');

const app = express();
const port = 3005;

app.use(cors({
  origin: 'http://localhost:3000', 
}));
// Enable CORS for all routes
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

// Use the user routes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
