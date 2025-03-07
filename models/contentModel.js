const mongoose = require('mongoose');
const sanitizeHtml = require('sanitize-html');

const contentSchema = mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: ['hero', 'about', 'features', 'team', 'contact', 'footer'],
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    buttonLink: {
      type: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Санитизация HTML перед сохранением
contentSchema.pre('save', function (next) {
  if (this.content) {
    this.content = sanitizeHtml(this.content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class'],
        a: ['href', 'name', 'target', 'class'],
        div: ['class', 'id', 'style'],
        span: ['class', 'id', 'style'],
      },
    });
  }
  
  if (this.title) {
    this.title = sanitizeHtml(this.title);
  }
  
  if (this.subtitle) {
    this.subtitle = sanitizeHtml(this.subtitle);
  }
  
  next();
});

module.exports = mongoose.model('Content', contentSchema); 