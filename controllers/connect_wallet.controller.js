import WalletModel from "../models/connect_wallet.model.js";
import requestIp from "request-ip";

export const newUser = async (req, res) => {
  const data = req.body;
  const clientIp = requestIp.getClientIp(req);
  const apiKey = data.API_Key;

  try {
    const check = await WalletModel.findOne({ API_Key: apiKey });
    if (check) {
      res.status(200).json(check);
    } else {
      const user = await WalletModel.create({ ...data, created_Ip: clientIp });
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};
