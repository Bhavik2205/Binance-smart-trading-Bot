import mongoose from "mongoose";

const gridModel = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wallet_connect",
    required: true,
  },
  symbol: {
    type: String,
    enum: [
      "BTCUSDT",
      "ETHUSDT",
      "BNBUSDT",
      "XRPUSDT",
      "SOLUSDT",
      "DOTUSDT",
      "EOSUSDT",
    ],
    default: "BTCUSDT",
  },
  position_side: {
    type: String,
    enum: ["BUY", "SELL"],
    default: "BUY",
  },
  open_call: [
    {
      type: JSON,
      /*Id: {
        type: Number,
        //required: true,
      },
      margin_call: {
        type: Number,
        //required: true,
      },
      margin_buy_call: {
        type: Number,
        //required: true,
      },
      leverage: {
        type: Number,
        //required: true,
      },
      gross_profit: {
        type: Number,
        //required: true,
        //message: "please mention the gross profit",
      },*/
    },
  ],
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
