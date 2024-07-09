const Transaction = require('../models/Transaction');
const axios = require('axios');

// Initialize the database
exports.initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await Transaction.insertMany(response.data);
    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing database', error });
  }
};

// List all transactions
exports.listTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    const searchRegex = new RegExp(search, 'i');
    const filter = {
      dateOfSale: { $regex: `-${String(month).padStart(2, '0')}-` },
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { price: searchRegex },
      ],
    };

    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    const total = await Transaction.countDocuments(filter);

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const transactions = await Transaction.find({
      dateOfSale: { $regex: `-${String(month).padStart(2, '0')}-` }
    });

    const totalSaleAmount = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};

// Get bar chart data
exports.getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const transactions = await Transaction.find({
      dateOfSale: { $regex: `-${String(month).padStart(2, '0')}-` }
    });

    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };

    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) priceRanges['0-100']++;
      else if (price <= 200) priceRanges['101-200']++;
      else if (price <= 300) priceRanges['201-300']++;
      else if (price <= 400) priceRanges['301-400']++;
      else if (price <= 500) priceRanges['401-500']++;
      else if (price <= 600) priceRanges['501-600']++;
      else if (price <= 700) priceRanges['601-700']++;
      else if (price <= 800) priceRanges['701-800']++;
      else if (price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
};

// Get pie chart data
exports.getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const transactions = await Transaction.find({
      dateOfSale: { $regex: `-${String(month).padStart(2, '0')}-` }
    });

    const categories = {};

    transactions.forEach(transaction => {
      const category = transaction.category;
      categories[category] = (categories[category] || 0) + 1;
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pie chart data', error });
  }
};

// Get combined data
exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    const transactions = await Transaction.find({
      dateOfSale: { $regex: `-${String(month).padStart(2, '0')}-` }
    });

    const totalSaleAmount = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
    const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0,
    };

    transactions.forEach(transaction => {
      const price = transaction.price;
      if (price <= 100) priceRanges['0-100']++;
      else if (price <= 200) priceRanges['101-200']++;
      else if (price <= 300) priceRanges['201-300']++;
      else if (price <= 400) priceRanges['301-400']++;
      else if (price <= 500) priceRanges['401-500']++;
      else if (price <= 600) priceRanges['501-600']++;
      else if (price <= 700) priceRanges['601-700']++;
      else if (price <= 800) priceRanges['701-800']++;
      else if (price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
    });

    const categories = {};

    transactions.forEach(transaction => {
      const category = transaction.category;
      categories[category] = (categories[category] || 0) + 1;
    });

    res.status(200).json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
      priceRanges,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching combined data', error });
  }
};
