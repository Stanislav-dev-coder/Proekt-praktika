# Основная информация
Server-side сборка на основе Next.js 8, React 16.8.4, Node.js 10

# Установка
```
npm install
cp .env.example .env
```

# Установка на сервере
```
npm install
cp .env.example .env
cp .ecosystem.config.js.example .ecosystem.config.js
```

# Запуск в режиме разработки
```
npm run dev
```

# Запуск создания билда и сервера
```
npm run start
```

# Запуск создания билда
```
npm run build
```

# Использование линтера стилей
Первоначально необходимо установить расширение [Manta's Stylus Supremacy](https://marketplace.visualstudio.com/items?itemName=thisismanta.stylus-supremacy) для VS Code. Затем необходимо открыть настройки VS Code и установить значение для `stylint.stylintrcPath`: `/.stylintrc`

Чтобы линтер срабатывал при сохранении и при вставке стилей, необходимо указать значение `true` для параметров `editor.formatOnSave` и `files.autoSave`

