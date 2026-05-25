const express = require("express");
const { createSubscription, getSubscriptionStatus } = require("../../controllers/client/subscriptionController");
const verifyToken = require("../../middleware/clientAuth");
const asyncHandler = require("../../utils/asyncHandler");

const router = express.Router();

router.post("/subscription", verifyToken, asyncHandler(createSubscription));
router.get("/subscription/status", verifyToken, asyncHandler(getSubscriptionStatus));

module.exports = router;
