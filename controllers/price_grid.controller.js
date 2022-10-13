import priceGrid from "../models/grid_model.js";
import requestIp from "request-ip";
import User from "../models/connect_wallet.model.js";
import Binance from "node-binance-api";
import grid from "../models/grid_model.js";
import WebSocket from "ws";
import OrderHistory from "../models/order_history.model.js";
import { parse } from "path";
import { binance } from "../index.js";

export const stream = async (req, res) => {
  const ws = new WebSocket(
    "wss://stream.binancefuture.com/ws/rfR6LZxazZoQjfZXjm2qOeQ1SX8z5TUW1HybZCtO33e73KQgd0FaOhYEsP2eQcdV",
    { perMessageDeflate: false }
  );
  ws.on("open", (o) => {
    ws.on("message", async (r) => {
      try {
        var buffer = r;
        var step2 = buffer.toString("utf-8");
        var parsed = JSON.parse(step2);
        if (parsed.e == "ORDER_TRADE_UPDATE") {
          console.log(parsed.e);
        } else {
          console.log(parsed.e);
        }
        console.log(parsed);
        /*console.log({
          Event: parsed.e,
          Symbol: parsed.o.s,
          Client_order_id: parsed.o.c,
          Side: parsed.o.S,
          Order_Type: parsed.o.o,
          Time_in_Force: parsed.o.f,
          Original_quantity: parsed.o.q,
          //Stop_price: parsed.o.sp,
          Execution_type: parsed.o.x,
          Order_Status: parsed.o.X,
          Order_id: parsed.o.i,
          Stop_price_working_Type: parsed.o.wt,
          Original_order_Type: parsed.o.ot,
          Position_Side: parsed.o.ps,
        });*/
      } catch (error) {
        console.log({ error: error });
      }
    });
  });
};
stream();

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
      const r = await binance.futuresLeverage(data.symbol, leverage);
      //console.log(r);
      const timeInForce = "GTC";
      const obj = {
        symbol: data.symbol,
        side: data.position_side,
        type: "LIMIT",
        price: data.open_call[i].margin_call,
        quantity: quantity,
        //futuresLeverage: data.open_call[i].leverage,
        timeInForce: "GTC",
      };
      const stopPrice =
        (data.margin_call + data.gross_profit) / 100 + data.margin_call;
      try {
        if (data.position_side == "BUY") {
          let detail = await binance.futuresBuy(
            data.symbol,
            quantity,
            obj.price
          );
          detail.leverage = data.open_call[i].leverage;
          order.push(detail);
          await OrderHistory.create({
            user_id: data.user_id,
            orderId: detail.orderId,
            amount: data.open_call[i].margin_buy_call,
            price: detail.price,
            quantity: detail.origQty,
            clientOrderId: detail.clientOrderId,
            orderType: detail.side,
            status: detail.status,
            created_at: Date.now(),
            created_Ip: clientIp,
          });
        } else {
          let detail = await binance.futuresSell(
            data.symbol,
            quantity,
            obj.price
          );
          detail.leverage = data.open_call[i].leverage;
          order.push(detail);
          await OrderHistory.create({
            user_id: data.user_id,
            orderId: detail.orderId,
            amount: data.open_call[i].margin_buy_call,
            price: detail.price,
            quantity: detail.origQty,
            clientOrderId: detail.clientOrderId,
            orderType: detail.side,
            status: detail.status,
            created_at: Date.now(),
            created_Ip: clientIp,
          });
        }
        //console.log(order);
      } catch (error) {
        res.send(419).json(error.message);
      }
    }
    const response = {
      user_id: data.user_id,
      Symbol: data.symbol,
      Side: data.position_side,
      open_call: order,
      created_at: Date.now(),
      created_ip: clientIp,
    };
    const save = await priceGrid.create(response);
    //console.log(save);
    res.status(201).json(save);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
