import Strategy from "../models/strategy.model.js";
import User from "../models/connect_wallet.model.js";
import Symbol from "../models/symbol.model.js";
import requestIp from "request-ip";

export const createStrategy = async (req, res) => {
  const data = req.body;
  const user_id = data.user_id;
  const symbol_id = data.symbol_id;
  const clientIp = requestIp.getClientIp(req);

  try {
    const ucheck = await User.findOne({ _id: user_id });
    const scheck = await Symbol.findOne({ _id: symbol_id });
    if (!ucheck || !scheck) {
      res.status(404).json({ message: "Invalid user_id or symbol_id" });
    } else {
      if (data.margin_call_limit < 11) {
        const strategy = await Strategy.create({
          ...data,
          created_ip: clientIp,
          created_at: Date.now(),
        });
        res.status(201).json(strategy);
      } else {
        res.status(419).json({
          message: "margin_call_limit should less than or equals to 10",
        });
      }
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};

export const modifyStrategy = async (req, res) => {
  const data = req.body;
  const symbol_id = data.symbol_id;
  const clientIp = requestIp.getClientIp(req);
  const Id = data.id;

  try {
    const check = await Strategy.findOne({ _id: Id });
    if (check) {
      //const ucheck = await User.findOne({ _id: user_id });
      const scheck = await Symbol.findOne({ _id: symbol_id });
      if (!scheck) {
        res.status(404).json({ message: "Invalid symbol_id" });
      } else {
        if (data.margin_call_limit < 11) {
          const updatedData = {
            ...data,
            _id: Id,
            modified_ip: clientIp,
            modified_at: Date.now(),
            modified_by: 1,
          };
          const strategy = await Strategy.findByIdAndUpdate(Id, updatedData);
          res.status(200).json(updatedData);
        } else {
          res.status(419).json({
            message: "margin_call_limit should less than or equals to 10",
          });
        }
      }
    } else {
      res.status(404).json({ message: "Strategy not found" });
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};

export const deleteStrategy = async (req, res) => {
  const Id = req.body.id;

  const check = await Strategy.findOne({ _id: Id });

  try {
    if (check) {
      await Strategy.findByIdAndDelete(Id);
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Symbol not found" });
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};
