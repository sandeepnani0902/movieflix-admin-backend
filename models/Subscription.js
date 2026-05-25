const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    planName: {
      type: String,
      required: true,
      default: "PREMIUM",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "CANCELLED"],
      default: "ACTIVE",
    },
    paymentId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema, "subscriptions");
module.exports = Subscription;
