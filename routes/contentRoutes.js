const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllContent,
  getContentBySection,
  createContent,
  updateContent,
  deleteContent,
  uploadImage,
} = require('../controllers/contentController');

// Настройка хранилища для загрузки файлов
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Проверка типа файла
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Только изображения!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter,
});

// Публичные маршруты
router.get('/', getAllContent);
router.get('/:section', getContentBySection);

// Защищенные маршруты для администратора
router.post('/', protect, admin, createContent);
router.put('/:id', protect, admin, updateContent);
router.delete('/:id', protect, admin, deleteContent);
router.post('/upload', protect, admin, upload.single('image'), uploadImage);

module.exports = router; 