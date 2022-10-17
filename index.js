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
import requestIp from "request-ip";
import { stream } from "./streaming.js";

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
/*
const stream = async (req, res) => {
  const ws = new WebSocket(
    "wss://stream.binancefuture.com/ws/44OtZzcuXqWfcemlDl0kxj20EZ6RTeSIh4ASqgs4ZJ073dKtvAlVyXu8g3TCIDeH",
    { perMessageDeflate: true }
  );
  ws.on("open", (o) => {
    ws.on("message", async (r) => {
      try {
        var buffer = r;
        var step2 = buffer.toString("utf-8");
        var parsed = JSON.parse(step2);
        //console.log(parsed);
        //const clientIp = requestIp.getClientIp(req);
        if (parsed.o.X == "FILLED" || parsed.o.X == "EXPIRED") {
          const status = parsed.o.X;
          setTimeout(async () => {
            const found = await orderHistory.findOne({
              clientOrderId: parsed.o.c,
            });
            const Id = found._id;

            console.log(
              await orderHistory.findByIdAndUpdate(Id, { status: status })
            );
            const stopPrice =
              (found.price + found.gross_profit) / 100 + found.price;
            const price = Math.round(stopPrice);
            console.log(stopPrice);
            if (status === "FILLED" && found.orderType === "BUY") {
              const gpOrder = await binance.futuresSell(
                found.symbol,
                found.quantity,
                price
              );
              console.log(gpOrder);
              const saved = await orderHistory.create({
                user_id: found.user_id,
                orderId: gpOrder.orderId,
                amount: price,
                price: gpOrder.price,
                quantity: gpOrder.origQty,
                symbol: gpOrder.symbol,
                clientOrderId: gpOrder.clientOrderId,
                orderType: gpOrder.side,
                status: gpOrder.status,
                gross_profit: price - found.price,
                created_at: Date.now(),
                created_Ip: found.created_Ip,
              });
              console.log(saved);
            } else if (status === "FILLED" && found.orderType === "SELL") {
              const gpOrder = await binance.futuresBuy(
                found.symbol,
                found.quantity,
                price
              );
              console.log();
              const saved = await orderHistory.create({
                user_id: found.user_id,
                orderId: gpOrder.orderId,
                amount: price,
                price: gpOrder.price,
                quantity: gpOrder.origQty,
                symbol: gpOrder.symbol,
                clientOrderId: gpOrder.clientOrderId,
                orderType: gpOrder.side,
                status: gpOrder.status,
                gross_profit: price - found.price,
                created_at: Date.now(),
                created_Ip: found.created_Ip,
              });
              console.log(saved);
            }
          }, 2000);
        }
      } catch (error) {
        // if (
        //   error.message === "Cannot read properties of undefined (reading 's')"
        // ) {
        //  console.log("null");
        // } else {
        console.log({ error: error.message });
        //}
      }
    });
  });
};
*/
stream();
