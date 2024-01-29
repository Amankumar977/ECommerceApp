import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, res) {
    cb(null, "uploads/");
  },
});
