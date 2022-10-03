import User from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import shortid from "shortid";

export const signup = (req, res) => {
  try {
    User.estimatedDocumentCount(async (err, count) => {
      if (err) res.status(400).json({ error });
      let role;
      if (count === 0) {
        role = "admin";

        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
          firstName,
          lastName,
          email,
          hash_password,
          username: shortid.generate(),
          role,
        });

        _user.save((error, data) => {
          if (error) {
            res.status(400).json({
              message: "Something went wrong",
            });
          }

          if (data) {
            res.status(201).json({
              message: "Admin created Successfully..!",
            });
          }
        });
      } else {
        res.status(419).json({ message: "admin already registered" });
      }
    });
  } catch (error) {
    res.status(419).json({ message: error.message });
  }
};

export const signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

export const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
