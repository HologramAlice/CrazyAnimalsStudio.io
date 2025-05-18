const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
// const connectDB = require('./config/db'); // Временно отключаем
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorMiddleware');

// Загрузка переменных окружения
dotenv.config();

// Подключение к базе данных
// connectDB(); // Временно отключаем

const app = express();

// Настройка безопасности
app.use(helmet());
app.use(cors());

// Ограничение запросов для защиты от DoS атак
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // ограничение каждого IP до 100 запросов за windowMs
});
app.use('/api/', limiter);

// Middleware для парсинга JSON и urlencoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Настройка статических файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Маршруты API - временная заглушка для работы без MongoDB
app.get('/api/content', (req, res) => {
  res.json([
    {
      _id: '123',
      section: 'hero',
      title: 'CRAZY ANIMALS STUDIO',
      subtitle: 'Создаем миры, которые оживают',
      content: 'Мы - команда талантливых разработчиков, художников и дизайнеров, объединенных страстью к созданию уникальных игровых вселенных.',
      buttonText: 'Присоединиться к команде',
      buttonLink: '/apply',
      order: 0,
      isActive: true
    }
  ]);
});

// Остальные API маршруты с заглушками
app.use('/api/auth', (req, res) => {
  if (req.method === 'POST' && req.path === '/create-admin') {
    return res.status(201).json({ message: 'Администратор создан' });
  }
  if (req.method === 'POST' && req.path === '/login') {
    return res.json({
      _id: '123',
      name: 'Admin',
      email: 'admin@example.com',
      isAdmin: true,
      token: 'fake_token_123'
    });
  }
  res.status(404).json({ message: 'Endpoint не найден' });
});

app.use('/api/applications', (req, res) => {
  if (req.method === 'POST') {
    return res.status(201).json({ message: 'Заявка успешно отправлена' });
  }
  res.json([]);
});

// Если в production, то статические файлы из build директории клиента
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API работает. Для разработки запустите клиент отдельно.');
  });
}

// Обработчик ошибок
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен в ${process.env.NODE_ENV} режиме на порту ${PORT}`);
}); 