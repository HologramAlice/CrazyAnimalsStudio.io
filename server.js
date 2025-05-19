const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

// Загрузка переменных окружения
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('client'));

// Настройка транспорта для отправки email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'crazy.studio.cat@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

// API endpoint для обработки формы
app.post('/api/join', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        await transporter.sendMail({
            from: 'crazy.studio.cat@gmail.com',
            to: 'crazy.studio.cat@gmail.com',
            subject: 'Новая заявка на вступление в команду',
            html: `
                <h2>Новая заявка на вступление</h2>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Сообщение:</strong></p>
                <p>${message}</p>
            `
        });

        res.status(200).json({ message: 'Заявка успешно отправлена' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Ошибка при отправке заявки' });
    }
});

// Обработка всех остальных маршрутов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
}); 