import priceGrid from "../models/grid_model.js";
import strategy from "../models/strategy.model.js";
import User from "../models/connect_wallet.model.js";

export const margin_call_size = async (req, res, next) => {
  const data = req.body;

  try {
    if (data.open_call) {
      const margin_call = [];
      const margin_buy_call = [];
      const leverage = [];
      const gross_profit = [];

      for (var i = 0; i < data.open_call.length; i++) {
        margin_call.push(data.open_call[i].margin_call);
        margin_buy_call.push(data.open_call[i].margin_buy_call);
        if (data.open_call[i].leverage < 6 && data.open_call[i].leverage > 1) {
          leverage.push(data.open_call[i].leverage);
        } else {
          return res
            .status(400)
            .json({ message: "leverage should be less than or equals to 5" });
        }
        gross_profit.push(data.open_call[i].gross_profit);
      }

      const open_call = [];
      for (var i = 0; i < margin_call.length; i++) {
        const obj = {
          margin_call: margin_call[i],
          margin_buy_call: margin_buy_call[i],
          leverage: leverage[i],
          gross_profit: gross_profit[i],
        };
        open_call.push(obj);
      }
      data.open_call = open_call;
      next();
    } else {
      next();
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};

export const gridValidate = async (req, res, next) => {
  const data = req.body;
  try {
    const check = await User.findOne({ _id: data.user_id });
    const scheck = await strategy.findOne({ _id: data.strategy_id });
    const gridCheck = await priceGrid.findOne({
      strategy_id: data.strategy_id,
    });
    if (check) {
      if (scheck) {
        if (gridCheck) {
          res
            .status(400)
            .json({ message: "Strategy already present in the grid" });
        } else {
          data.symbol_id = scheck.symbol_id;
          const length = scheck.margin_call_limit;
          if (data.open_call.length == length) {
            next();
          } else {
            res.status(419).json({
              message:
                "please create the grid according to the size mention in strategy",
            });
          }
        }
      } else {
        res.status(404).json({ message: "Invalid Strategy id" });
      }
    } else {
      res.status(404).json({ message: "User is not registered" });
    }
  } catch (error) {
    res.status(419).json(error.message);
  }
};
