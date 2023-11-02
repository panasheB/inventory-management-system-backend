const express = require('express');
const router = express.Router();
const axios = require('axios');
const twilio = require('twilio');

// POST route for sending the WhatsApp message
router.post('/send', async (req, res) => {
  const accountSid = 'AC22f6e1fbaf4c73311f18477135c8d0cc';
  const authToken = '5e868c85fca984f72e881aa32c3c3de4';
  const client = twilio(accountSid, authToken);

  const messageContent = "Dashboard Stats";
  const from = '+12054319109'; // Replace with your Twilio WhatsApp number
  const to = '+27749779640'; // Replace with the recipient's WhatsApp number
  try {
    await client.messages.create({
      body: messageContent,
      from: from,
      to: to,
    });
    res.status(200).json({ message: 'WhatsApp message sent successfully' });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).json({ error: 'Failed to send WhatsApp message' });
  }
});





module.exports = router;