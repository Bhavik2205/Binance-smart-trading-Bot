import mongoose from "mongoose";

const gridModel = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  strategy_id: {
    type: String,
    required: true,
  },
  symbol_id: {
    type: String,
    required: true,
  },
  open_call: [
    {
      call: {
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
          //required: true,
        },
        gross_Profit: {
          type: Number,
          //required: true,
        },
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
    default: Date.now(),
  },
  created_Ip: {
    type: String,
    default: null,
  },
});

const grid = mongoose.model("grid", gridModel);

export default grid;
