const express = require("express");
const router = express.Router();

const {
  paymentController,
  webhooks,
} = require("../controllers/paymentControllers");

router.route("/webhook").post(webhooks);
router.route("/").post(paymentController);
