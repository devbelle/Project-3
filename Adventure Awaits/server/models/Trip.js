const mongoose = require("mongoose");

const { Schema } = mongoose;

const tripSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
