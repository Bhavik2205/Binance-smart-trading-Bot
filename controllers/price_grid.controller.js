import priceGrid from "../models/grid_model.js";
import { binance } from "../index.js";

export const gridcreate = async (req, res) => {
  const data = req.body;

  try {
    if (!data.open_call) {
      res.status(409).json({ message: "field is necessary to continue" });
    } else {
      const symbol = data.symbol;
      const call = data.open_call;

      const result = async (req, res) => {
        const s = await console.info(
          await binance.futuresBuy(symbol, call[2], call[1])
        );
        console.log(s);
      };
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};
