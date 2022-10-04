import priceGrid from "../models/grid_model.js";
import strategy from "../models/strategy.model.js";
import symbol from "../models/symbol.model.js";
import requestIp from "request-ip";
import User from "../models/connect_wallet.model.js";
import Binance from "node-binance-api";

export const gridcreate = async (req, res) => {
  const data = req.body;
  const user_id = data.user_id;
  const clientIp = requestIp.getClientIp(req);

  try {
    const check = await User.findOne({ _id: data.user_id });
    const scheck = await strategy.findOne({ _id: data.strategy_id });
    const symbol_id = scheck.symbol_id;
    const symcheck = await symbol.findOne({ _id: symbol_id });
    let side;
    if (scheck.type == 1) {
      side = "BUY";
    } else {
      side = "SELL";
    }

    const binance = new Binance().options({
      APIKEY: check.API_Key,
      APISECRET: check.API_Secret,
      useServerTime: true, //binance-api/node_modules/node-binance-api/node-binance-api.js/default_options/recvWindow //default: 5000
      test: true,
      verbose: true,
      recvWindow: 6000,
    });

    const order = [];
    order.length = scheck.margin_call_limit;
    for (var i = 0; i < data.open_call.length; i++) {
      const obj = {
        symbol: symcheck.symbol,
        side: side,
        type: "LIMIT",
        price: "19220",
        quantity: "0.01",
        timeInForce: "GTC",
      };
    }

    const grid = await priceGrid
      .create({ ...data, created_at: Date.now(), created_ip: clientIp })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(419).json({ message: err.message });
      });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
};
