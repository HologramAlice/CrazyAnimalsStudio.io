const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Регистрация нового пользователя
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Пожалуйста, заполните все поля');
  }

  // Проверка существования пользователя
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Пользователь уже существует');
  }

  // Создание пользователя
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.getSignedJwtToken(),
    });
  } else {
    res.status(400);
    throw new Error('Некорректные данные пользователя');
  }
});

// @desc    Аутентификация пользователя и получение токена
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Проверка email и пароля
  if (!email || !password) {
    res.status(400);
    throw new Error('Пожалуйста, укажите email и пароль');
  }

  // Проверка существования пользователя
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Неверный email или пароль');
  }

  // Проверка соответствия пароля
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error('Неверный email или пароль');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.getSignedJwtToken(),
  });
});

// @desc    Получение профиля пользователя
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Пользователь не найден');
  }
});

// @desc    Обновление профиля пользователя
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: updatedUser.getSignedJwtToken(),
    });
  } else {
    res.status(404);
    throw new Error('Пользователь не найден');
  }
});

// @desc    Получение всех пользователей
// @route   GET /api/auth/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Создание администратора (только для первого запуска)
// @route   POST /api/auth/create-admin
// @access  Public (должен быть защищен другими способами)
const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  // Проверка секретного ключа (должен быть установлен в .env)
  if (secretKey !== process.env.ADMIN_SECRET_KEY) {
    res.status(401);
    throw new Error('Неверный секретный ключ');
  }

  // Проверка существования пользователей
  const userCount = await User.countDocuments({});

  // Если пользователи уже существуют, запретить создание админа
  if (userCount > 0) {
    res.status(400);
    throw new Error('Администратор уже создан');
  }

  // Создание администратора
  const admin = await User.create({
    name,
    email,
    password,
    isAdmin: true,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: admin.getSignedJwtToken(),
    });
  } else {
    res.status(400);
    throw new Error('Некорректные данные администратора');
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  createAdmin,
}; 