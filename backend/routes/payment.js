const express = require('express');
const router = express.Router();

const {
  processPayment,
  sendStripeApi
} = require('../controllers/paymentController');

const {
  isAuthenticatedUser
} = require('../middlewares/authenticate');


// Frontend must access this before login
router.get('/stripeapi', sendStripeApi);

// Only logged-in users can pay
router.post(
  '/payment/process',
  isAuthenticatedUser,
  processPayment
);

module.exports = router;
