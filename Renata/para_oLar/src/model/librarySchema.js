const mongoose = require("mongoose");

const LivrariasSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  site: String,
});

module.exports = mongoose.model("libraries", LivrariasSchema);
