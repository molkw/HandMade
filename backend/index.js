const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/userModel'); 
const Product =  require('./models/productModel'); 
const userRoutes = require('./routes'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;

require('dotenv').config();

app.use(bodyParser.json({ limit: '50mb' })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true, 
}));


app.use(express.json());
app.use(cookieParser());


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });


app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
