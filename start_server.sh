#!/bin/bash
echo "Запуск локального сервера для сайта..."
cd /workspace/html
echo "Сайт будет доступен по адресу: http://localhost:8000/real-estate.html"
python3 -m http.server 8000