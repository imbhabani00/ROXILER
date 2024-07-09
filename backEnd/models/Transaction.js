const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  dateOfSale: { type: Date, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sold: { type: Boolean, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
