const fs = require('fs');

// Массив с путями к требуемым файлам
const filePaths = ['counter.js', 'swiper.js', 'todo.js'];

// Читаем содержимое всех файлов и объединяем их в одну строку
let combinedContent = '';
filePaths.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    combinedContent += content + '\n';
});

// Записываем объединенное содержимое в файл main.js
fs.writeFileSync('main.js', combinedContent, 'utf8');

console.log('Файл main.js успешно создан с объединенным содержимым.');