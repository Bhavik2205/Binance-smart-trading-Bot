import WalletModel from "../models/connect_wallet.model.js";
import requestIp from "request-ip";
import Binance from "node-binance-api";

export const newUser = async (req, res) => {
  const data = req.body;
  const clientIp = requestIp.getClientIp(req);
  const apiKey = data.API_Key;
  const apiSecret = data.API_Secret;

  try {
    const check = await WalletModel.findOne({ API_Key: apiKey });
    if (check) {
      res.status(200).json(check);
    } else {
      const binance = new Binance().options({
        APIKEY: apiKey,
        APISECRET: apiSecret,
        useServerTime: true, //binance-api/node_modules/node-binance-api/node-binance-api.js/default_options/recvWindow //default: 5000
        test: true,
        verbose: true,
        recvWindow: 6000,
      });
      const result = await binance.futuresAccount();
      if (result.code == -2015) {
        res.status(404).json({ message: "Invalid API Key provided" });
      } else {
        //res.status(200).json({ message: "Success" });
        const user = await WalletModel.create({
          ...data,
          created_Ip: clientIp,
        });
        res.status(201).json(user);
      }
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};
