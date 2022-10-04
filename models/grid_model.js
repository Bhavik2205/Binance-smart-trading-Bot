import mongoose from "mongoose";

const gridModel = new mongoose.Schema({
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
  symbol_id: {
    type: String,
    required: true,
  },
  open_call: [
    {
      margin_call: {
        type: Number,
        required: true,
      },
      margin_buy_call: {
        type: Number,
        //enum: [isabove, isbelow],
        required: true,
        //default: isabove,
      },
      leverage: {
        type: Number,
        required: true,
      },
      gross_profit: {
        type: Number,
        required: true,
        message: "please mention the gross profit",
      },
    },
  ],
  //close_call: [
  //  {
  //  call: {
  //    margin_call: {
  //      type: Number,
  //      required: true,
  //    },
  //    limit_set: {
  //      type: String,
  //      enum: [isabove, isbelow],
  //      required: true,
  //      default: isabove,
  //    },
  //    margin_call_times: {
  //      type: Number,
  //      required: true,
  //    },
  //    required: false,
  //  }}
  //],
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

const grid = mongoose.model("grid", gridModel);

export default grid;
