const asyncHandler = require('express-async-handler');
const Application = require('../models/applicationModel');
const sanitizeHtml = require('sanitize-html');

// @desc    Создание новой заявки
// @route   POST /api/applications
// @access  Public
const createApplication = asyncHandler(async (req, res) => {
  const { name, email, phone, role, otherRole, experience, portfolio, message } = req.body;

  // Проверка обязательных полей
  if (!name || !email || !phone || !role || !experience) {
    res.status(400);
    throw new Error('Пожалуйста, заполните все обязательные поля');
  }

  // Если выбрана роль "Другое", но не указано какая именно
  if (role === 'Другое' && !otherRole) {
    res.status(400);
    throw new Error('Пожалуйста, укажите вашу роль');
  }

  // Санитизация HTML
  const sanitizedExperience = sanitizeHtml(experience);
  const sanitizedMessage = message ? sanitizeHtml(message) : '';

  const application = await Application.create({
    name,
    email,
    phone,
    role,
    otherRole,
    experience: sanitizedExperience,
    portfolio,
    message: sanitizedMessage,
  });

  if (application) {
    res.status(201).json({
      message: 'Заявка успешно отправлена',
      application: {
        id: application._id,
        name: application.name,
        email: application.email,
        status: application.status,
      },
    });
  } else {
    res.status(400);
    throw new Error('Некорректные данные');
  }
});

// @desc    Получение всех заявок
// @route   GET /api/applications
// @access  Private/Admin
const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({}).sort('-createdAt');
  res.json(applications);
});

// @desc    Получение заявки по ID
// @route   GET /api/applications/:id
// @access  Private/Admin
const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    res.json(application);
  } else {
    res.status(404);
    throw new Error('Заявка не найдена');
  }
});

// @desc    Обновление статуса заявки
// @route   PUT /api/applications/:id
// @access  Private/Admin
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, adminNotes } = req.body;

  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Заявка не найдена');
  }

  application.status = status || application.status;
  application.adminNotes = adminNotes ? sanitizeHtml(adminNotes) : application.adminNotes;

  const updatedApplication = await application.save();
  res.json(updatedApplication);
});

// @desc    Удаление заявки
// @route   DELETE /api/applications/:id
// @access  Private/Admin
const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Заявка не найдена');
  }

  await application.remove();
  res.json({ message: 'Заявка удалена' });
});

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
}; 