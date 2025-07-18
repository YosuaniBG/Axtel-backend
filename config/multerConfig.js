const multer = require("multer");

// Configuración del almacenamiento en memoria (para evitar archivos temporales)
const storage = multer.memoryStorage();

module.exports = {
  storage,
};