import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSufix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "_" + uniqueSufix + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });
export default upload;
