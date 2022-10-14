import Binance from "node-binance-api";
import WebSocket from "ws";
import orderHistory from "./models/order_history.model.js";
import mongoose from "mongoose";
import "./node_modules/dotenv/config.js";

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

export const stream = async (req, res) => {
  const ws = new WebSocket(
    "wss://stream.binancefuture.com/ws/lt33HwVlSE8QBtF9MKJpLUl5zR1tpiUdltLOUMOBiLsXstxziOexi0Jax4EprqXz",
    { perMessageDeflate: false }
  );
  ws.on("open", (o) => {
    ws.on("message", async (r) => {
      try {
        var buffer = r;
        var step2 = buffer.toString("utf-8");
        var parsed = JSON.parse(step2);
        if (
          parsed.e == "ORDER_TRADE_UPDATE" //&&
          //parsed.o.x == ("FILLED" || "EXPIRED")
        ) {
          const found = await orderHistory
            .findOne({ orderId: parsed.o.i })
            .maxTimeMS(5000);
          console.log({
            clientOrderId: parsed.o.c,
            OrderId: parsed.o.i,
            status: parsed.o.x,
          });
          if (found) {
            const Id = found._id;
            const updatedData = {
              _id: Id,
              status: parsed.o.X,
              modified_by: 1,
              modified_at: Date.now(),
            };
            const result = await orderHistory.findByIdAndUpdate(
              Id,
              updatedData
            );
            if (parsed.o.x == "FILLED" && parsed.o.S == "BUY") {
              const stopPrice =
                (found.price * found.gross_profit) / 100 + found.price;
              /*console.info(
                await binance.futuresSell(
                  found.symbol,
                  found.quantity,
                  stopPrice
                )
              );*/
              console.log(parsed.o.s, parsed.o.q, stopPrice);
              console.log({ result: result });
            }
          } else {
            console.log("not found");
          }
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
