const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');

    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);

    console.log('Database seeded');
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
