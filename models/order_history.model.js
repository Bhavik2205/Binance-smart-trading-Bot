import mongoose from "mongoose";

const orderHistoryModel = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wallet_connect",
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
  quantity: {
    type: Number,
  },
  symbol: {
    type: String,
  },
  clientOrderId: {
    type: String,
  },
  orderType: {
    type: String,
  },
  status: {
    //Success=1, Pending=2, Delete=3, Filled=4
    type: String,
    enum: ["NEW", "EXPIRED", "FILLED", "DELETE", null],
    default: null,
  },
  gross_profit: {
    type: Number,
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

var orderHistory = mongoose.model("orderHistory", orderHistoryModel);
export default orderHistory;
