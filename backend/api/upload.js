import multer from 'multer';
import { verifyUser } from '../utils/jwt';

const uploadRouter = require('express').Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post('/uploads', verifyUser, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = uploadRouter;
