import Binance from "node-binance-api";
import WebSocket from "ws";
import orderHistory from "./models/order_history.model.js";
import mongoose from "mongoose";
import "./node_modules/dotenv/config.js";
import { binance } from "./index.js";
/*
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
*/
export const stream = async (req, res) => {
  const ws = new WebSocket(
    "wss://stream.binancefuture.com/ws/7QygXlHif0iJt41b1HT57P2AyLh48LKn1xpoyECgTGwyZckGUhh6oDHXhWZCbvMq",
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
            } else {
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
stream();
