const mongoose = require("mongoose");

const scholorshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  availability: {
    type: String,
    required: [true, "availability is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  expiryDate: {
    type: String,
    required: [true, "An expiry date should be mentioned"],
  },
  docsRequired: [String],
  serviceCharge: {
    type: Number,
    required: [true, "The service charge should be mentioned"],
  },
  latest: {
    type: Boolean,
  },
});
const Scholorship = mongoose.model("Scholorship", scholorshipSchema);
module.exports = Scholorship;
