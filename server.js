/**
 * GS-Plaza Business Center Development Server
 * Version: 2.0
 * Last change: 15.01.2026
 * Author: Qwen AI Assistant
 * 
 * Simple development server for the GS-Plaza website
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Set up route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Set up route to serve the modern version
app.get('/modern', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.modern.html'));
});

// API endpoint for form submissions (mock)
app.post('/api/contact', express.json(), (req, res) => {
    console.log('Contact form submitted:', req.body);
    res.json({ 
        success: true, 
        message: 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.' 
    });
});

// API endpoint for subscription (mock)
app.post('/api/subscribe', express.json(), (req, res) => {
    console.log('Subscription request:', req.body);
    res.json({ 
        success: true, 
        message: 'Вы успешно подписались на наши новости!' 
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Страница не найдена - GS-Plaza</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100vh; 
                    margin: 0; 
                    background-color: #f5f5f5; 
                }
                .error-container { 
                    text-align: center; 
                    padding: 2rem; 
                    background: white; 
                    border-radius: 8px; 
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1); 
                }
                h1 { color: #ff3530; }
                a { color: #ff3530; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="error-container">
                <h1>404 - Страница не найдена</h1>
                <p>К сожалению, запрашиваемая страница не существует.</p>
                <p><a href="/">← Вернуться на главную</a></p>
            </div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`GS-Plaza Business Center сервер запущен на http://localhost:${PORT}`);
    console.log('Доступные маршруты:');
    console.log('- http://localhost:' + PORT + ' (основной сайт)');
    console.log('- http://localhost:' + PORT + '/modern (модернизированная версия)');
    console.log('\nДля остановки сервера нажмите Ctrl+C');
});