const Subscription = require("../../models/Subscription");
const { sendSuccess, sendError } = require("../../utils/apiResponse");

// Save subscription payment details
const createSubscription = async (req, res) => {
  const { planName, paymentId, amount } = req.body;

  if (!paymentId) {
    return sendError(res, "paymentId is required", 400);
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30);

  // Deactivate any existing active subscriptions for this user
  await Subscription.updateMany(
    { clientId: req.userId, status: "ACTIVE" },
    { $set: { status: "INACTIVE" } }
  );

  const subscription = new Subscription({
    clientId: req.userId,
    planName: planName || "PREMIUM",
    status: "ACTIVE",
    paymentId,
    startDate,
    endDate,
  });

  await subscription.save();
  return sendSuccess(res, "Subscription created successfully", { subscription }, 201);
};

// Get current active subscription details
const getSubscriptionStatus = async (req, res) => {
  const subscription = await Subscription.findOne({
    clientId: req.userId,
    status: "ACTIVE",
    endDate: { $gte: new Date() },
  });

  if (!subscription) {
    return sendSuccess(res, "No active subscription found", { subscribed: false }, 200);
  }

  return sendSuccess(res, "Active subscription retrieved", { subscribed: true, subscription }, 200);
};

module.exports = {
  createSubscription,
  getSubscriptionStatus,
};
