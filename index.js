import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import "./node_modules/dotenv/config.js";
import walletInsert from "./routes/connect_wallet.route.js";
import Binance from "node-binance-api";
import path from 'path';

export const binance = new Binance().options({
  APIKEY: "0d1e94b104dd54fde98dec9a83f8916b1af3daa0c81c8c754b59ce3d62c8a00a",
  APISECRET: "fd6302c060bdf02d8c5e369cc433eb802f6fa09b22317ae1a113f5ff86c40841",
  useServerTime: true, //binance-api/node_modules/node-binance-api/node-binance-api.js/default_options/recvWindow //default: 5000
  test: true,
});

const app = express();
const __dirname = path.resolve();

app.set(`view engine`, `ejs`);
app.use(express.static(`${__dirname} + views/pages/design-crypto/`));
app.get("/", (req, res) => {
  res.render("pages/design-crypto/main/smart-single");
});
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api", walletInsert);

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

//const res = binance.futuresMiniTickerStream("BTCUSDT", console.log);

//console.log(res);
/*
const test = async (req, res) => {
  await binance.futuresGetDataStream("BTCUSDT");
};
test().then((res) => console.log(res));
*/
