const asyncHandler = require("express-async-handler");
const Subscriber = require("../models/Subscriber");

// @desc Get all Subscribers
// @route GET /subscribers
// @access Private
const getAllSubscribers = asyncHandler(async (req, res) => {
  const items = await Subscriber.find().sort({ name: 1 }).lean();

  if (!items.length) {
    return res.status(400).json({ message: "No items found" });
  }
  res.json(items);
});

// @desc Create a new Subscriber
// @route POST /subscribers
// @access Public
const createSubscriber = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  // Validate input
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Optional: Check if subscriber already exists
  const duplicate = await Subscriber.findOne({ email }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Subscriber already exists" });
  }

  // Create subscriber
  const subscriber = await Subscriber.create({ name, email });

  if (subscriber) {
    return res.status(201).json({ message: "Subscriber created", subscriber });
  } else {
    return res.status(400).json({ message: "Invalid subscriber data" });
  }
});

module.exports = {
  getAllSubscribers,
  createSubscriber,
};
