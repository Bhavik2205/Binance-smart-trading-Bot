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
    const binance = new Binance().options({
      APIKEY: check.API_Key,
      APISECRET: check.API_Secret,
      useServerTime: true, //binance-api/node_modules/node-binance-api/node-binance-api.js/default_options/recvWindow //default: 5000
      test: true,
      verbose: true,
      recvWindow: 60000,
    });

    const order = [];
    for (var i = 0; i < data.open_call.length; i++) {
      const quantity = (
        data.open_call[i].margin_buy_call / data.open_call[i].margin_call
      ).toFixed(2);
      const leverage = data.open_call[i].leverage;
      const r = await binance.futuresLeverage(
        data.symbol,
        data.open_call[i].leverage
      );
      console.log(r);

      const obj = {
        symbol: data.symbol,
        side: data.position_side,
        type: "LIMIT",
        price: data.open_call[i].margin_call,
        quantity: quantity,
        futuresLeverage: data.open_call[i].leverage,
        timeInForce: "GTC",
      };
      order.push(obj);
      let timeInForce = "GTC";
      const place = await binance.futuresBuy(
        data.symbol,
        quantity,
        data.open_call[i].margin_call
      );
      console.log(place);
      res.send({ message: place });
    }

    // The only time the user data (account balances) and order execution websockets will fire, is if you create or cancel an order, or an order gets filled or partially filled

    /*
      .create({ ...data, created_at: Date.now(), created_ip: clientIp })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(419).json({ message: err.message });
      }); */
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
