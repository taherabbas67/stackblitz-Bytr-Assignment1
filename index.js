const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

// Server side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

// Endpoint 1
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  cartTotal = newItemPrice + cartTotal;
  res.send(cartTotal.toString());
});

// End point 2
function membershipDiscount(cartTotal, isMember) {
  if (isMember == 'true') {
    return cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    return cartTotal;
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let result = membershipDiscount(cartTotal, isMember);
  res.send(result.toString());
});

// End point 3
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = (cartTotal * taxRate) / 100;
  res.send(tax.toString());
});

// End point 4
function standardDeliveryTime(distance) {
  let estimateDelivery = parseInt(distance / 50);
  return estimateDelivery.toString();
}
function expressDeliveryTime(distance) {
  let estimateDelivery = parseInt(distance / 100);
  return estimateDelivery.toString();
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  if (shippingMethod == 'Standard') {
    res.send(standardDeliveryTime(distance));
  } else {
    res.send(expressDeliveryTime(distance));
  }
});

// End point 5
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

// End point 6
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
