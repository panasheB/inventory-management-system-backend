// routes/dashboard.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactions_model');
const Item = require('../models/items_model');

// GET dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const salesTodayWeekMonth = await getSalesForTodayWeekMonth();
    const weeklySalesProfit = await getWeeklySalesAndProfit();
    const monthlySalesProfit = await getMonthlySalesAndProfit();
    const totalInventoryValue = await getTotalInventoryValue();
    const itemCount = await countAllItems();
    const mostPopularItems = await getMostPopularItems();
    const leastPopularItems = await getLeastPopularItems();
    const lowStockItems = await getLowStockItems();
    const overstockedItems = await getOverstockedItems();
    const stockTurnover = await calculateStockTurnover();
    const profitMargins = await calculateProfitMargins();
    const paymentMethodsStats = await getPaymentMethodsStatistics();
    const yearEarnings = await getYearEarnings();
    const itemQuantity = await getItemQuantities();


    const dashboardStats = {
      sales_today_week_month: salesTodayWeekMonth,
      weekly_sales_profit: weeklySalesProfit,
      monthly_sales_profit: monthlySalesProfit,
      total_inventory_value: totalInventoryValue,
      items: itemCount,
      most_popular: mostPopularItems,
      least_popular: leastPopularItems,
      low_stock: lowStockItems,
      over_stock: overstockedItems,
      stock_turnover: stockTurnover,
      profit_margin: profitMargins,
      payment_methods: paymentMethodsStats,
      year_earnings: yearEarnings,
      item_quantities: itemQuantity,
    };

    res.status(200).json(dashboardStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getSalesForTodayWeekMonth() {
  const currentDate = new Date();
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);

  try {
    const salesToday = await Transaction.countDocuments({ createdAt: { $gte: today } });
    const salesThisWeek = await Transaction.countDocuments({ createdAt: { $gte: startOfWeek } });
    const salesThisMonth = await Transaction.countDocuments({ createdAt: { $gte: startOfMonth } });

    return {
      today: salesToday,
      week: salesThisWeek,
      month: salesThisMonth
    };
  } catch (error) {
    throw new Error('Failed to fetch sales data');
  }
}

async function getWeeklySalesAndProfit() {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(currentDate.setDate(currentDate.getDate() + 6));
  endOfWeek.setHours(23, 59, 59, 999);

  try {
    const transactions = await Transaction.find({
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    }).select('itemCode quantity totalPrice');

    const totalSales = transactions.reduce((total, transaction) => total + transaction.totalPrice, 0);
    const totalProfit = await calculateTotalProfit(transactions);

    return {
      total_sales: totalSales,
      total_profit: totalProfit,
    };
  } catch (error) {
    throw new Error('Failed to fetch weekly sales and profit data');
  }
}

async function calculateTotalProfit(transactions) {
  let totalProfit = 0;

  for (const transaction of transactions) {
    const item = await Item.findOne({ code: transaction.itemCode }).select('cost');
    if (item) {
      const profit = transaction.totalPrice - transaction.quantity * item.cost;
      totalProfit += profit;
    }
  }

  return totalProfit;
}

async function getMonthlySalesAndProfit() {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);
  
    try {
      const transactions = await Transaction.find({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      }).select('itemCode quantity totalPrice');
  
      const totalSales = transactions.reduce((total, transaction) => total + transaction.totalPrice, 0);
      const totalProfit = await calculateTotalProfit(transactions);
      return {
        total_sales: totalSales,
        total_profit: totalProfit,
      };
    } catch (error) {
      console.error('Error:', error); // Log the error for debugging
      throw new Error('Failed to fetch monthly sales and profit data');
    }
  }
  

async function getTotalInventoryValue() {
  try {
    const items = await Item.find();
    const totalValue = items.reduce((total, item) => total + item.quantity * item.cost, 0);
    return totalValue;
  } catch (error) {
    throw new Error('Failed to fetch total inventory value');
  }
}

async function countAllItems() {
  try {
    const itemCount = await Item.countDocuments();
    return itemCount;
  } catch (error) {
    throw new Error('Failed to count items');
  }
}

async function getMostPopularItems() {
  try {
    const mostPopularItems = await Transaction.aggregate([
      { $group: { _id: '$itemCode', totalQuantity: { $sum: '$quantity' } } },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
    ]);

    return mostPopularItems;
  } catch (error) {
    throw new Error('Failed to fetch most popular items');
  }
}

async function getLeastPopularItems() {
  try {
    const leastPopularItems = await Transaction.aggregate([
      { $group: { _id: '$itemCode', totalQuantity: { $sum: '$quantity' } } },
      { $sort: { totalQuantity: 1 } },
      { $limit: 5 },
    ]);

    return leastPopularItems;
  } catch (error) {
    throw new Error('Failed to fetch least popular items');
  }
}

async function getLowStockItems() {
  try {
    const lowStockItems = await Item.find({ quantity: { $lte: 10 } }).select('name quantity');
    return lowStockItems;
  } catch (error) {
    throw new Error('Failed to fetch low stock items');
  }
}

async function getOverstockedItems() {
  try {
    const overstockedItems = await Item.find({ quantity: { $gte: 100 } }).select('name quantity');
    return overstockedItems;
  } catch (error) {
    throw new Error('Failed to fetch overstocked items');
  }
}

async function calculateStockTurnover() {
  try {
    const items = await Item.find().select('name quantity sold');
    const stockTurnover = items.map((item) => {
      const turnover = item.sold / item.quantity;
      return { name: item.name, turnover };
    });

    return stockTurnover;
  } catch (error) {
    throw new Error('Failed to calculate stock turnover');
  }
}

async function calculateProfitMargins() {
  try {
    const items = await Item.find().select('name cost price');
    const profitMargins = items.map((item) => {
      const profitMargin = ((item.price - item.cost) / item.price) * 100;
      return { name: item.name, margin: profitMargin };
    });

    return profitMargins;
  } catch (error) {
    throw new Error('Failed to calculate profit margins');
  }
}

async function getPaymentMethodsStatistics() {
  try {
    const paymentMethodsStats = await Transaction.aggregate([
      { $group: { _id: '$paymentMethod', totalAmount: { $sum: '$totalPrice' } } },
      { $sort: { totalAmount: -1 } },
    ]);

    return paymentMethodsStats;
  } catch (error) {
    throw new Error('Failed to fetch payment methods statistics');
  }
}

async function getYearEarnings() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  startOfYear.setHours(0, 0, 0, 0);
  const endOfYear = new Date(currentYear, 11, 31);
  endOfYear.setHours(23, 59, 59, 999);

  try {
    const earnings = await Transaction.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalEarnings: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return earnings;
  } catch (error) {
    throw new Error('Failed to fetch year earnings');
  }
}

async function getItemQuantities() {
    try {
      const items = await Item.find();
      const itemQuantities = items.map((item) => ({
        name: item.name,
        quantity: item.availableQuantity,
      }));
      return itemQuantities;
    } catch (error) {
      throw new Error('Failed to fetch item quantities');
    }
  }
  

module.exports = router;