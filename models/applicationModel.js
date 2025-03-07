const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');

const applicationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Пожалуйста, укажите ваше имя'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Пожалуйста, укажите ваш email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Пожалуйста, укажите корректный email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Пожалуйста, укажите ваш телефон'],
    },
    role: {
      type: String,
      required: [true, 'Пожалуйста, укажите желаемую роль'],
      enum: [
        'Программист',
        'Дизайнер',
        'Художник',
        '3D-моделлер',
        'Геймдизайнер',
        'Звукорежиссер',
        'Композитор',
        'Сценарист',
        'Маркетолог',
        'Другое',
      ],
    },
    otherRole: {
      type: String,
    },
    experience: {
      type: String,
      required: [true, 'Пожалуйста, опишите ваш опыт'],
    },
    portfolio: {
      type: String,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Новая', 'Рассмотрена', 'Принята', 'Отклонена'],
      default: 'Новая',
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Санитизация HTML перед сохранением
applicationSchema.pre('save', function (next) {
  if (this.experience) {
    this.experience = sanitizeHtml(this.experience);
  }
  
  if (this.message) {
    this.message = sanitizeHtml(this.message);
  }
  
  if (this.adminNotes) {
    this.adminNotes = sanitizeHtml(this.adminNotes);
  }
  
  next();
});

module.exports = mongoose.model('Application', applicationSchema); 