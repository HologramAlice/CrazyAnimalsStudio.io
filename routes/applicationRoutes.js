const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/applicationController');

// Публичные маршруты
router.post('/', createApplication);

// Защищенные маршруты для администратора
router.get('/', protect, admin, getApplications);
router.get('/:id', protect, admin, getApplicationById);
router.put('/:id', protect, admin, updateApplicationStatus);
router.delete('/:id', protect, admin, deleteApplication);

module.exports = router; 