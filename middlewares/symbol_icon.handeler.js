import multer from "multer";
import shortid from "shortid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "logo");
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error.status(415)({ message: error.message }));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});
//const formdata = multer();
const Symbol_logo = upload.single("logo");
export default Symbol_logo;
