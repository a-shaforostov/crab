This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


Структура архіву:
source/ - папка з вихыдними файлами
build/ - зібраний проект
documentation/ - зібрана документація
data.json - файл з даними, дані в якому відповідають тим, що наведені в завданні.

Команди для роботи с проектом:
1. Для встановлення залежностей
*npm install*

2. Для запуску проекту
*npm start*

3. Для збирання проекту
*npm run dev*
Результат в папці build. Для запуску зібраного проекту потрібен сервер.
Для завантаження і запуску сервера можна виконати команду
*npx http-server*
В браузері: localhost:8080

4. Для тестів
*npm test*
Використовується Jest. Тести написані для допоміжних функцій (utils.js)

5. Для збирання документації
*npm run doc*
Використовується jsdoc. Результат зборки documentation/index.html

При виконанні завдання використовано:
- create-react-app
- react
- cerebral для керування станом
- material-ui для інтерфейсу
- SVG для формування зображення
- jss для стилів
- jest для тестів
- jsdoc для генерування документації
- eslint з налаштуваннями create-react-app

Окрім завдань, наведених в умові реалізовано:
- Undo/Redo для всіх операцій редагування в межах одного документа.
- Перемикання графіку ефективності для відображення даних як регулярного графіку, так і оптимізованого
