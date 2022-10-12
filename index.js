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
import crypto from "crypto";

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
/*
const key = await crypto.subtle.importKey(
  "raw",
  toBytes(secretKey),
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign"]
);
const timestamp = Date.now();
const queryString = `timestamp=${timestamp}`;
const signature = await crypto.subtle.sign("HMAC", key, toBytes(queryString));
const response = await fetch(
  `/api/v3/account?${queryString}&signature=${toHex(signature)}`,
  { headers: { "X-MBX-APIKEY": apiKey } }
);
console.log(await response.json());
*/
/*
const connection = new WebSocket(
  "wss://stream.binance.com/ws/BudumoYTTCcSNHXwNvkH5ZkAWPIBIf6Tuoc8zIY7E8ylxIUYDSeJ2cCGtnqpbOct"
);

connection.onopen = () => {
  connection.send(
    JSON.stringify([
      {
        e: "ORDER_TRADE_UPDATE",
        method: "SUBSCRIBE",
        id: 1,
      },
    ])
  );
  console.log("Connected to Data Streaming");
};

connection.onmessage = async (ev) => {
  //let tickers = JSON.parse(ev.method);
  /*for (const ticker of tickers) {
    if (ticker.symbol.endsWith("USDT")) {
      data[ticker.symbol] = ticker;
    }
  }
  //console.log("Tickers loaded:", Object.keys(data).length);
  try {
    console.log(ev._url);
  } catch (error) {
    console.log(error.message);
  }
  //console.log({ ...ev });
};

connection.onclose = (err) => {
  console.log("disconnected");
};
*/
/*
async function testStreaming() {
  const stream = new WebSocket(
    "wss://fstream.binance.com/ws/tc8i8GejclkJOVCVtUASyCgggXTqOcjVQLRUR3UwCPZbMMOEyjIcBm8qwSH4aJtz"
  );
  //console.log(stream)
  stream.onmessage = async (ev) => {
    let tickers = JSON.parse(ev.data).map(
      ({ e, E, T, o, s, c, S, f, q, p, ap, x, X, i, ps }) => ({
        eventType: ORDER_TRADE_UPDATE,
        symbol: s,
        clientOrderId: c,
        side: S,
        timeInForce: f,
        orderStatus: X,
        orderId: i,
        positionSide: ps,
      })
    );
    console.log(tickers.c);
    /*
    for (const ticker of tickers) {
      if (ticker.symbol.endsWith("BUSD")) {
        data[ticker.symbol] = ticker;
      }
    }
    console.log("Tickers loaded:", Object.keys(data).length);
    */
/*if (Date.now() - startDate > 10000) {
      stream.close()
      const selectedTickers = Object.values(data)
        .sort(
          (a, b) =>
            b.totalTradedQuoteAssetVolume - a.x
        )
        .slice(0, 5)
        console.log(selectedTickers);
        await Promise.all(
          selectedTickers.map(async (ticker) => {
            const update = await orderTradeUpdate(ticker.symbol);
            console.log(`${ticker.symbol}:`, update);
          })
          );
        };
      }
      testStreaming();
      */
/*s
binance.websockets.depth(["BTCUSDT"], (depth) => {
  let { b: bidDepth } = depth;
  //console.info(symbol + " market depth update");
  const s = JSON.parse(bidDepth[0][0]).toFixed(1);
  clear();
  console.log(s);
});

const result = async (req, res) => {
  const s = await binance.futuresBalance();
  console.log(s[1].balance);
};
result();
*/
/*
binance.futuresSubscribe(
  "wss://stream.binance.com:9443/ws/tc8i8GejclkJOVCVtUASyCgggXTqOcjVQLRUR3UwCPZbMMOEyjIcBm8qwSH4aJtz",
  console.log()
);

console.log(binance.futuresSubscriptions());*/
/*
binance.allOrders("BTC", (error, orders, symbol) => {
  console.info(symbol + " orders:", orders);
});
binance.websockets.userData(
  "wss://stream.binance.com:9443/ws/tc8i8GejclkJOVCVtUASyCgggXTqOcjVQLRUR3UwCPZbMMOEyjIcBm8qwSH4aJtz",
  (trades) => {
    let {
      e: listStatus,
      E: eventTime,
      s: symbol,
      l: statusType,
      L: orderStatus,
      r: rejectReason,
      a: tradeId,
    } = trades;
    console.info(
      symbol +
        " trade update. price: " +
        price +
        ", quantity: " +
        quantity +
        ", maker: " +
        maker
    );
  }
);

*/
const r = async (req, res) => {
  const s = await binance.futuresGetDataStream();
  //const s = await binance.futuresBuy("BTCUSDT", 0.1, 19100);
  //const r = await binance.futuresGetDataStream();
  //const r = await binance.futuresAccount();
  //await binance.futuresCancelAll("BTCUSDT");
  console.log(s);
};
r();

/*
const data = async (req, res) => {
  let position_data = await binance.futuresPositionRisk(),
    markets = Object.keys(position_data);
  for (let market of markets) {
    let obj = position_data[market],
      size = Number(obj.positionAmt);
    if (size == 0) continue;
    console.info(`${leverage}x\t${market}\t${obj.unRealizedProfit}`);
  }
};
app.get("/", (req, res) => {
  binance.websockets.depth(["BTCUSDT"], (depth) => {
    let { b: bidDepth } = depth;
    const s = JSON.parse(bidDepth[0][0]).toFixed(1);
    res.render("pages/design-crypto/main/smart-single", {
      BTC: s,
      Bal: result(),
    });
  });
});
*/
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/user", walletInsert);
app.use("/api/grid", grid);
app.use("/api/symbol", symbol);
app.use("/api/strategy", strategy);
app.use("/api/admin", admin);

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

/*
for (var i = 0; i < 100000; i++) {
  binance.prices("BTCUSDT", (error, ticker) => {
    console.info("Price of BTCUSDT: ", ticker);
  });
}
*/
//console.info(await binance.futuresCancelAll("BTCUSDT"));
/*
let orders = [
  {
    symbol: "BTCUSDT",
    side: "BUY",
    type: "LIMIT",
    price: "19220",
    quantity: "0.01",
    timeInForce: "GTC",
  },
  {
    symbol: "BTCUSDT",
    side: "BUY",
    type: "LIMIT",
    price: "20000",
    quantity: "0.5",
    timeInForce: "GTC",
  },
];
console.info(await binance.futuresMultipleOrders(orders));

binance.websockets.userData(["ORDER_TRADE_UPDATE"], (orderId) => {
  console.log(orderId);
  //let bids = binance.sortBids(depth.bids);
  //let asks = binance.sortAsks(depth.asks);
  //console.info(symbol + " depth cache update");
  //console.info("bids", bids);
  //console.info("asks", asks);
  //console.info("best bid: " + binance.first(bids));
  //console.info("best ask: " + binance.first(asks));
  //console.info("last updated: " + new Date(depth.eventTime));
});
/*
const stream = binance.websockets.userFutureData(
  (balance_update, execution_update) => {
    console.log(execution_update);
  }
  );
  console.log(stream);
  */
/*
const BTC = binance.websockets.miniTicker((markets) => {
  console.info(markets.BTCUSDT);
});
*/
/*let ticker = await binance.prices("BTCUSDT", (error, ticker) => {
  console.info("Price of BNB: ", ticker.BTCUSDT);
});*/

//result().then((success) => console.log(success));
//const res = binance.futuresMiniTickerStream("BTCUSDT", console.log);

//console.log(res);
/*
const test = async (req, res) => {
  binance.futuresGetDataStream("BTCUSDT");
};
test().then((res) => console.log(res));
*/
