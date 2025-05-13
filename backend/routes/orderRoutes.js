const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJWT");
const verifyJWTtoAdmin = require("../middleware/verifyJWTtoAdmin");

const { getOrder, getAllOrders } = require("../controllers/orderControllers");

const {
  paymentController,
  webhooks,
} = require("../controllers/paymentControllers");


router.use(verifyJWT);
router.route("/webhook").post(webhooks);
router.route("/").post(paymentController);
router.route("/get-order").get(getOrder);

router.use(verifyJWTtoAdmin);
router.route("/all-orders").get(getAllOrders);

module.exports = router;
