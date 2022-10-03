import mongoose from "mongoose";

const connect_wallet = new mongoose.Schema({
  account_name: {
    type: String,
    required: true,
    message: "Please enter the name to continue",
  },
  API_Key: {
    type: String,
    required: true,
    unique: true,
    message: "Key already exists in the DB",
  },
  API_Secret: {
    type: String,
    required: true,
    unique: true,
  },
  created_by: {
    type: Number,
    enum: [1, 2],
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  created_Ip: {
    type: String,
    default: null,
  },
});

var wallet_connect = mongoose.model("wallet_connect", connect_wallet);

export default wallet_connect;
