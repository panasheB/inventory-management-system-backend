const express = require('express');
const router = express.Router();
const axios = require('axios');
const twilio = require('twilio');

// POST route for sending the WhatsApp message
router.post('/send', async (req, res) => {
  try {
    const stats = await fetchDashboardStats(); // Fetch dashboard stats from the dashboard route
    await sendWhatsAppMessage(stats);

    res.status(200).json({ message: 'Stats sent via WhatsApp' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function fetchDashboardStats() {
  try {
    const response = await axios.get('http://localhost:3000/dashboard/stats'); // Make a GET request to the dashboard route
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch dashboard stats');
  }
}

async function sendWhatsAppMessage(stats) {
  const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
  const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
  const client = twilio(accountSid, authToken);

  const messageContent = `Dashboard Stats:\n\n${JSON.stringify(stats)}`;
  const from = 'whatsapp:+1234567890'; // Replace with your Twilio WhatsApp number
  const to = 'whatsapp:+0987654321'; // Replace with the recipient's WhatsApp number

  try {
    await client.messages.create({
      body: messageContent,
      from: from,
      to: to,
    });
  } catch (error) {
    throw new Error('Failed to send WhatsApp message');
  }
}

module.exports = router;