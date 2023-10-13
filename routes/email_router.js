const express = require('express');
const router = express.Router();
const axios = require('axios');
const nodemailer = require('nodemailer');


// POST route for sending the email
router.post('/send', async (req, res) => {
  try {
    const stats = await fetchDashboardStats();
    await sendEmail(stats);

    res.status(200).json({ message: 'Stats sent via email' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while sending the email.' });
  }
});

async function fetchDashboardStats() {
  try {
    const response = await axios.get('http://localhost:3000/dashboard/stats'); // Make a GET request to the dashboard route
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch dashboard stats');
  }
}

async function sendEmail(stats) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME, // Use environment variables
      pass: process.env.EMAIL_PASSWORD, // Use environment variables
    },
  });

  const emailContent = {
    from: process.env.EMAIL_USERNAME,
    to: 'panashebudzinike@gmail.com',
    subject: 'Dashboard Stats',
    text: JSON.stringify(stats),
  };

  await transporter.sendMail(emailContent);
}

module.exports = router;
