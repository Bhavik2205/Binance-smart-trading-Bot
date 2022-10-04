import mongoose from "mongoose";

const strategyModel = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wallet_connect",
    required: true,
  },
  symbol_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Symbol",
    required: true,
  },
  type: {
    //1=long, 2=short
    type: Number,
    enum: [1, 2],
    default: null,
    required: true,
    message: "please mention the type to proceed further",
  },
  margin_call_limit: {
    type: Number,
    required: true,
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
  created_ip: {
    type: String,
    default: null,
  },
  modified_by: {
    //1=self, 2=admin
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

var strategy = mongoose.model("strategy", strategyModel);

export default strategy;
