import Binance from "node-binance-api";

export const Api_key = async (req, res, next) => {
  const data = req.body;
  const apiKey = data.API_Key;
  const apiSecret = data.API_Secret;

  /*if (!apiKey) {
    res.status(409).json({ message: "API Key is must to connect the wallet" });
  } else {*/
  const binance = new Binance().options({
    //"0d1e94b104dd54fde98dec9a83f8916b1af3daa0c81c8c754b59ce3d62c8a00a",
    APIKEY: apiKey,
    //"fd6302c060bdf02d8c5e369cc433eb802f6fa09b22317ae1a113f5ff86c40841",
    APISECRET: apiSecret,
    useServerTime: true, //binance-api/node_modules/node-binance-api/node-binance-api.js/default_options/recvWindow //default: 5000
    test: true,
  });
  //.then((success) => {
  next();
  //})
  //.catch((err) => {
  //  res.status(404).json({ error: err.message });
  // });
  //}
};
