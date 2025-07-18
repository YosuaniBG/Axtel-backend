const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadCSV, normalizeSales } = require('../controllers/file_process.controller');

const storage = require("../config/multerConfig").storage;
const upload = multer({ storage });

router.post('/upload', upload.single("file"), uploadCSV);

router.post("/normalize-sales", normalizeSales);

module.exports = router;
