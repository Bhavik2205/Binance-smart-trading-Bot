import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "./node_modules/dotenv/config.js";
import walletInsert from "./routes/connect_wallet.route.js";
import Binance from "node-binance-api";
import path from "path";
import grid from "./routes/grid.route.js";
import symbol from "./routes/symbol.route.js";
import admin from "./admin/route.js";
import strategy from "./routes/strategy.route.js";
import WebSocket from "ws";
import orderHistory from "./models/order_history.model.js";
//import { stream } from "./streaming.js";

//Binance Connection with default API_Key and API_Secret for test Only
export const binance = new Binance().options({
  APIKEY: "0d1e94b104dd54fde98dec9a83f8916b1af3daa0c81c8c754b59ce3d62c8a00a",
  APISECRET: "fd6302c060bdf02d8c5e369cc433eb802f6fa09b22317ae1a113f5ff86c40841",
  useServerTime: true, //binance-api/node_modules/node-binance-api/node-binance-api.js/default_options/recvWindow //default: 5000
  test: true,
  verbose: true,
  recvWindow: 60000,
});

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname + `public`)));
app.set("views", path.join(__dirname, "views"));
app.set(`view engine`, `ejs`);

const r = async (req, res) => {
  const s = await binance.futuresGetDataStream();
  console.log(s);
};
r();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/user", walletInsert);
app.use("/api/grid", grid);
//app.use("/api/symbol", symbol);
//app.use("/api/strategy", strategy);
//app.use("/api/admin", admin);

app.listen(process.env.PORT);

//connecting to Database
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`processing on Port: ${process.env.PORT}`);
  })
  .catch((error) => {
    console.error({ message: error.message });
  });

//console.info(await binance.futuresCancelAll("BTCUSDT"));

const stream = async (req, res) => {
  const ws = new WebSocket(
    "wss://stream.binancefuture.com/ws/mWAogtRwScY0Rsd4y10RksZRxBIGBPQtniE3UeGkjMoWrW1gTf82Qv43B7yiM5TG",
    { perMessageDeflate: false }
  );
  ws.on("open", (o) => {
    ws.on("message", async (r) => {
      try {
        var buffer = r;
        var step2 = buffer.toString("utf-8");
        var parsed = JSON.parse(step2);
        console.log(parsed);
        if (parsed.e == "ORDER_TRADE_UPDATE" && (parsed.o.X == "FILLED" || parsed.o.X == "EXPIRED")) {
          const found = await orderHistory
            .findOne({ orderId: parsed.o.i })
            .maxTimeMS(3000);
          console.log({
            clientOrderId: parsed.o.c,
            OrderId: parsed.o.i,
            status: parsed.o.X,
          });
          if (found) {
            const Id = found._id;
            const updatedData = {
              _id: Id,
              status: parsed.o.X,
              modified_by: 1,
              modified_at: Date.now(),
            };
            const result = await orderHistory
              .findByIdAndUpdate(Id, updatedData)
              .maxTimeMS(3000); /*
            if (parsed.o.x == "FILLED" && parsed.o.S == "BUY") {
              const stopPrice =
                (found.price * found.gross_profit) / 100 + found.price;
              /*console.info(
                await binance.futuresSell(
                  found.symbol,
                  found.quantity,
                  stopPrice
                )
              );
              console.log(parsed.o.s, parsed.o.q, stopPrice);
              console.log({ result: result });
            }*/
          } else {
            await orderHistory.create({
              user_id: data.user_id,
              orderId: detail.orderId,
              amount: data.open_call[i].margin_buy_call,
              price: detail.price,
              quantity: detail.origQty,
              symbol: detail.symbol,
              clientOrderId: detail.clientOrderId,
              orderType: detail.side,
              status: detail.status,
              gross_profit: data.open_call[i].gross_profit,
              created_at: Date.now(),
              created_Ip: clientIp,
            });          }
        } else {
          //console.log({ Account_Update: parsed });
        }
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
        if (
          error.message === "Cannot read properties of undefined (reading 's')"
        ) {
          console.log("null");
        } else {
          console.log({ error: error.message });
        }
      }
    });
  });
};
stream();