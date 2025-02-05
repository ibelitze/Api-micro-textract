const express = require('express');
const router = express.Router();
const multer = require('multer');
const { TextractController } = require('../../controllers/textract/TextractController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var textractController = new TextractController();

// router.post('/analyzeText', upload.single('file'), textractController.AnalizarDocumento);

router.post('/analyzeText', textractController.AnalizarDocumento);
router.post('/analyzeText2', upload.single('file'), textractController.AnalizarDocumento2);
router.post('/analyzeForm', textractController.AnalizarFormulario);
router.post('/analyzeForm2', upload.single('file'), textractController.AnalizarFormulario2);

module.exports = router;