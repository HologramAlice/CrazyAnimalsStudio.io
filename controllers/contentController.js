const asyncHandler = require('express-async-handler');
const Content = require('../models/contentModel');
const path = require('path');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');

// @desc    Получение всего контента
// @route   GET /api/content
// @access  Public
const getAllContent = asyncHandler(async (req, res) => {
  const content = await Content.find({ isActive: true }).sort('order');
  res.json(content);
});

// @desc    Получение контента по секции
// @route   GET /api/content/:section
// @access  Public
const getContentBySection = asyncHandler(async (req, res) => {
  const content = await Content.findOne({ 
    section: req.params.section,
    isActive: true 
  });
  
  if (content) {
    res.json(content);
  } else {
    res.status(404);
    throw new Error('Контент не найден');
  }
});

// @desc    Создание нового контента
// @route   POST /api/content
// @access  Private/Admin
const createContent = asyncHandler(async (req, res) => {
  const { section, title, subtitle, content, imageUrl, buttonText, buttonLink, order, isActive } = req.body;

  // Проверка существования секции
  const contentExists = await Content.findOne({ section });

  if (contentExists) {
    res.status(400);
    throw new Error('Секция уже существует');
  }

  // Санитизация HTML
  const sanitizedContent = content ? sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class'],
      a: ['href', 'name', 'target', 'class'],
      div: ['class', 'id', 'style'],
      span: ['class', 'id', 'style'],
    },
  }) : '';

  const newContent = await Content.create({
    section,
    title: title ? sanitizeHtml(title) : '',
    subtitle: subtitle ? sanitizeHtml(subtitle) : '',
    content: sanitizedContent,
    imageUrl,
    buttonText,
    buttonLink,
    order: order || 0,
    isActive: isActive !== undefined ? isActive : true,
  });

  if (newContent) {
    res.status(201).json(newContent);
  } else {
    res.status(400);
    throw new Error('Некорректные данные');
  }
});

// @desc    Обновление контента
// @route   PUT /api/content/:id
// @access  Private/Admin
const updateContent = asyncHandler(async (req, res) => {
  const { title, subtitle, content, imageUrl, buttonText, buttonLink, order, isActive } = req.body;

  const contentItem = await Content.findById(req.params.id);

  if (!contentItem) {
    res.status(404);
    throw new Error('Контент не найден');
  }

  // Санитизация HTML
  const sanitizedContent = content ? sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class'],
      a: ['href', 'name', 'target', 'class'],
      div: ['class', 'id', 'style'],
      span: ['class', 'id', 'style'],
    },
  }) : contentItem.content;

  contentItem.title = title ? sanitizeHtml(title) : contentItem.title;
  contentItem.subtitle = subtitle ? sanitizeHtml(subtitle) : contentItem.subtitle;
  contentItem.content = sanitizedContent;
  contentItem.imageUrl = imageUrl || contentItem.imageUrl;
  contentItem.buttonText = buttonText || contentItem.buttonText;
  contentItem.buttonLink = buttonLink || contentItem.buttonLink;
  contentItem.order = order !== undefined ? order : contentItem.order;
  contentItem.isActive = isActive !== undefined ? isActive : contentItem.isActive;

  const updatedContent = await contentItem.save();
  res.json(updatedContent);
});

// @desc    Удаление контента
// @route   DELETE /api/content/:id
// @access  Private/Admin
const deleteContent = asyncHandler(async (req, res) => {
  const contentItem = await Content.findById(req.params.id);

  if (!contentItem) {
    res.status(404);
    throw new Error('Контент не найден');
  }

  // Если есть изображение, удаляем его
  if (contentItem.imageUrl && contentItem.imageUrl.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '..', contentItem.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await contentItem.remove();
  res.json({ message: 'Контент удален' });
});

// @desc    Загрузка изображения
// @route   POST /api/content/upload
// @access  Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Пожалуйста, загрузите файл');
  }

  res.json({
    message: 'Изображение загружено',
    imageUrl: `/uploads/${req.file.filename}`,
  });
});

module.exports = {
  getAllContent,
  getContentBySection,
  createContent,
  updateContent,
  deleteContent,
  uploadImage,
}; 