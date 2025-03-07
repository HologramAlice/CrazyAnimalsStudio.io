const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  createAdmin,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Публичные маршруты
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/create-admin', createAdmin);

// Защищенные маршруты
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Маршруты для администратора
router.get('/users', protect, admin, getUsers);

module.exports = router; 