import mongoose from "mongoose";

const orderHistoryModel = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wallet_connect",
    required: true,
  },
  strategy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "strategy",
    required: true,
  },
  orderId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  price: {
    type: Number,
  },
  grid_hit: {
    type: Number,
  },
  clientOrderId: {
    type: String,
  },
  orderType: {
    type: String,
  },
  response: {
    type: JSON,
  },
  status: {
    //Success=1, Pending=2, Delete=3, Filled=4
    type: Number,
    enum: [1, 2, 3, 4],
    default: null,
  },
  created_by: {
    type: Number,
    enum: [1, 2],
    default: 1,
  },
  created_at: {
    type: Date,
    default: null,
  },
  created_Ip: {
    type: String,
    default: null,
  },
  modified_by: {
    type: Number,
    enum: [1, 2],
    default: null,
  },
  modified_at: {
    type: Date,
    default: null,
  },
  modified_ip: {
    type: String,
    default: null,
  },
});
