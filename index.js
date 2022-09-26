import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "./node_modules/dotenv/config.js";
import walletInsert from "./routes/connect_wallet.route.js";
import Binance from "node-binance-api";
import path from "path";
import grid from "./routes/grid.route.js";
import { JSDOM } from "jsdom";

export const binance = new Binance().options({
  APIKEY: "0d1e94b104dd54fde98dec9a83f8916b1af3daa0c81c8c754b59ce3d62c8a00a",
  APISECRET: "fd6302c060bdf02d8c5e369cc433eb802f6fa09b22317ae1a113f5ff86c40841",
  useServerTime: true, //binance-api/node_modules/node-binance-api/node-binance-api.js/default_options/recvWindow //default: 5000
  test: true,
});

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname + `public`)));
app.set("views", path.join(__dirname, "views"));
app.set(`view engine`, `ejs`);
/*
binance.websockets.depth(["BTCUSDT"], (depth) => {
  let { b: bidDepth } = depth;
  //console.info(symbol + " market depth update");
  const s = JSON.parse(bidDepth[0][0]).toFixed(1);
  console.log(s);
});
/
const result = async (req, res) => {
  const s = await binance.futuresBalance();
  console.log(s);
};
result();

const r = async (req, res) => {
  const s = await console.info(await binance.futureBuy("BTCUSDT", 0.1, 18980));
  console.log(s);
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
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api", walletInsert);
app.use("/api/grid", grid);

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

/*
binance.websockets.depthCache(["BTCUSDT"], (symbol, depth) => {
  let bids = binance.sortBids(depth.bids);
  let asks = binance.sortAsks(depth.asks);
  console.info(symbol + " depth cache update");
  console.info("bids", bids);
  console.info("asks", asks);
  console.info("best bid: " + binance.first(bids));
  console.info("best ask: " + binance.first(asks));
  console.info("last updated: " + new Date(depth.eventTime));
});
*/
//binance.websockets.bookTickers("BTCUSDT", console.log);

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
