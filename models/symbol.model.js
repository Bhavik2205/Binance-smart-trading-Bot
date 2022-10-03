import mongoose from "mongoose";

const symbolModel = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: true,
  },
  status: {
    //1 = active, 2 = inactive
    type: Number,
    enum: [1, 2],
    default: 1,
  },
  created_by: {
    //1 = superadmin, 2 = admin
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

var Symbol = mongoose.model("Symbol", symbolModel);

export default Symbol;
