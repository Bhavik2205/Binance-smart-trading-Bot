import Symbol from "../models/symbol.model.js";
import requestIp from "request-ip";

export const createSymbol = async (req, res) => {
  const data = req.body;
  const symbol = data.symbol;
  const clientIp = requestIp.getClientIp(req);

  try {
    const check = await Symbol.findOne({ symbol: symbol });
    if (check) {
      res.status(200).json({ message: "Symbol already exists in DB" });
    } else {
      if (req.file) {
        const logo = req.file.filename;
        data.logo = logo;
        const symbol = await Symbol.create({
          ...data,
          created_ip: clientIp,
          created_at: Date.now(),
        });
        res.status(201).json(symbol);
      } else {
        res.status(419).json({ message: "logo is must to create a symbol" });
      }
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};

export const modifySymbol = async (req, res) => {
  const data = req.body;
  const clientIp = requestIp.getClientIp(req);
  const Id = data.id;

  if (req.file) {
    const logo = req.file.filename;
    data.logo = logo;
  }

  try {
    const check = await Symbol.findOne({ _id: Id });
    if (check) {
      const updatedData = {
        ...data,
        _id: Id,
        modified_ip: clientIp,
        modified_at: Date.now(),
        modified_by: 1,
      };
      await Symbol.findByIdAndUpdate(Id, updatedData);
      res.status(200).json(updatedData);
    } else {
      res.status(404).json({ message: "Symbol not found" });
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};

export const deleteSymbol = async (req, res) => {
  const Id = req.body.id;

  const check = await Symbol.findOne({ _id: Id });

  try {
    if (check) {
      await Symbol.findByIdAndDelete(Id);
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Symbol not found" });
    }
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};
