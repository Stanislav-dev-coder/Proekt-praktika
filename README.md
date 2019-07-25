# Основная информация
Server-side сборка на основе Next.js 8, React 16.8.4, Node.js 10
Стили задаются с использованием препроцессора Stylus (http://stylus-lang.com).
При написании стилей мы используем методологию БЭМ (https://ru.bem.info/methodology/quick-start).

# Использование с Docker

## Установить главный контейнер

Склонировать на рабочий компьютер репозиторий: `git clone git@bitbucket.org:OlegChulakovStudio/development.main.git`
Ознакомиться с инструкцией в файле README.md этого репозитория.
Переименовать файл `.env.example` в `.env` и указать в нем переменные
Запустить главный контейнер командой `sh start.sh`

## Установка Docker

Установить Docker Desktop (с сайта https://www.docker.com)
Запустить его (авторизовываться в программе не нужно).

## Запуск контейнера

Перед всеми действиями необходимо выполнить команду `cp .env.example .env` и заполнить значения переменных окружения.
`VIRTUAL_HOST` — локальное DNS-имя проекта. Именно под этим именем проект будет доступен в браузере. Выполните в корне проекта `sh start-me.sh`.

При первом запуске скрипт внесет запись о приложении в `/etc/hosts`, для повышения привилегий потребуется ввести пароль пользователя.

После запуска контейнера откроется командная строка контейнера. Далее можно производить сборку и работу над проектом (см. п. 2.3 и далее).

##  Остановка контейнера 

Для остановки контейнера выйдите из командной строки используя команду `exit` и выполните скрипт `sh stop-me.sh`.

# Установка
```
npm install
cp .env.example .env
```

# Установка на сервере
```
npm install
cp .env.example .env
cp ecosystem.config.js.example ecosystem.config.js
```
После копирования заполните переменные окружения в файлах .env и ecosystem.config.js.

Чтобы запустить несколько инстенсов: нужно в файле ecosystem.config.js продублировать вызов функции с новым портом, например:
```
...
  apps: [
    defineServer(5000),
    defineServer(5001)
  ]
...
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

# Запуск на сервере
```
npm run build
pm2 startOrRestart ecosystem.config.js
```

# Использование линтера стилей
Первоначально необходимо установить расширение [Manta's Stylus Supremacy](https://marketplace.visualstudio.com/items?itemName=thisismanta.stylus-supremacy) для VS Code. Затем необходимо открыть настройки VS Code и установить значение для `stylint.stylintrcPath`: `/.stylintrc`

Чтобы линтер срабатывал при сохранении и при вставке стилей, необходимо указать значение `true` для параметров `editor.formatOnSave` и `files.autoSave`

# Адаптивность #

Контрольные точки для адаптивности настраиваются в файлах **source/config/breakpoints.json** (для Desktop First) и **source/config/breakpoints-mf.json** (для Mobile First).

Пример брекпоинта для Desktop First: наличие в файле **source/config/breakpoints.json** строчки `"notebook": 1440` добавляет в Stylus переменную `$notebook` равную `(max-width: 1440px)`.
Эту переменную можно использовать вот так: `@media $notebook { ... }`.

Пример брекпоинта для Mobile First: наличие в файле **source/config/breakpoints-mf.json** строчки `"mfNotebook": 1200` добавляет в Stylus переменную `$mfNotebook` равную `(min-width: 1200)`.
Эту переменную можно использовать вот так: `@media $mfNotebook { ... }`.

Кроме того, в медиа-запросах можно использовать переменные `$landscape` и `$portrait` (вот так: `@media $landscape { ... }`), а для Ретины используется медиа-запрос `@media $retina { ... }`


# Цвета #

Цвета указанные в файле **source/config/colors.json** доступны в Stylus как `$#NAME#Color`.

Например, `linkHover` будет доступен в Stylus как `$linkHoverColor`, а в JS как `app.config.colors.linkHover`.

