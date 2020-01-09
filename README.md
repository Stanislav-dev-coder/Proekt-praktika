# Основная информация
Server-side сборка на основе Next.js 9.1.3, React 16.11.0, Node.js 10.15
Стили задаются с использованием препроцессора Stylus (http://stylus-lang.com).
При написании стилей мы используем методологию БЭМ (https://ru.bem.info/methodology/quick-start).

# Использование с Docker

## Установка Docker

Установить Docker Desktop (с сайта https://www.docker.com)
Запустить его (авторизовываться в программе не нужно).

## Установить главный контейнер

Склонировать на рабочий компьютер репозиторий: `git clone git@bitbucket.org:OlegChulakovStudio/development.main.git`
Ознакомиться с инструкцией в файле README.md этого репозитория.
Переименовать файл `.env.example` в `.env` и указать в нем переменные
Запустить главный контейнер командой `sh start-me.sh`

## Запуск контейнера

Перед всеми действиями необходимо выполнить команду `cp .env.example .env` и заполнить значения переменных окружения.
`VIRTUAL_HOST` — локальное DNS-имя проекта. Именно под этим именем проект будет доступен в браузере. Выполните в корне проекта `sh start-me.sh`.

При первом запуске скрипт внесет запись о приложении в `/etc/hosts`, для повышения привилегий потребуется ввести пароль пользователя.

После запуска контейнера откроется командная строка контейнера. Далее можно производить сборку и работу над проектом (см. п. 2.3 и далее).

##  Остановка контейнера

Для остановки контейнера выйдите из командной строки используя команду `exit` и выполните скрипт `sh stop-me.sh`.

# Установка
```
yarn
cp .env.example .env
```

# Установка на сервере
```
yarn
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
yarn dev
```

# Запуск создания билда и сервера
```
yarn start
```

# Запуск создания билда
```
yarn build
```

# Запуск на сервере
```
yarn build
pm2 startOrRestart ecosystem.config.js
```

# Visual Studio Code

## Алиасы

Для перехода по алиасам в импортах, нужно в корне проекта создать файл `jsconfig.json`. Если в проекте появляется маршрут который отличается от файлового, например `@utils/*`, то нужно добавить его в свойство `path`.

Для добавление или удаления алиасов в коде, нужно изменить конфиг `.babelrc`, плагин - `module-resolver`.

*jsconfig.json*
```json
{
  "compilerOptions": {
    "jsx": "react",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "baseUrl": ".",
    "module": "commonjs",
    "paths": {
      "*": ["./*"],
      "@utils/*": ["./utils/*"],
    }
  },
  "exclude": ["node_modules"]
}
```

## eslint
Для работы линтера в редакторе vscode, необходимо [установить пакеты](#markdown-header-установка) и добавить следующие строки в [глобальный settings.json](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations) или в окружение проекта - `.vscode/settings.json`.

*settings.json*
```json
{
  "[javascript]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact"
  ]
}
```

## Использование линтера стилей
Первоначально необходимо установить расширение [Manta's Stylus Supremacy](https://marketplace.visualstudio.com/items?itemName=thisismanta.stylus-supremacy). Для работы линтера на сохранение файла, нужно дополнить [глобальный settings.json](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations) или `.vscode/settings.json`:

*settings.json*
```json
{
  "[stylus]": {
    "editor.formatOnSave": true
  }
}
```

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


# Миксины #

В sytlus-коде доступны следующие миксины:

* `clearfix()` — отменяет обтекание элемента.
* `clickZone(10px [, $pseudoElement])` — создает расширенную кликабельную область заданного размера вокруг элемента (используется для мелких элементов вроде кнопки закрытия модалки). По умолчанию реализуется с помощью псевдоэлемента `before`, но в миксин можно передать вторым параметром имя псевдоэлемента `after`. У элемента, которому добавляется расширенная область, должно быть задано позиционирование, отличное от `static`.
* `faster()` — вдвое уменьшает текущие duration анимации (используется в ховерах элементов).
* `placeholder(#ccc)` — устанавливает цвет плейсхолдеров.
* `smooth-font()` — включает сглаживание шрифтов.
* `webfont($family, $file, $weight, $style)` — подключает файлы шрифтов.
* `grid-width($count, $property, $addGaps)` — используется для построения сетки (см. ниже).


# Сетка #

(Работает для Desktop first)
Для построения сетки используется миксин `grid-width($count, $property, $addGaps)`:

* `$count` - количество колонок, которые занимает элемент (по умолчанию все 12).
* `$property` - изменяемое свойство (по умолчанию width).
* `$addGaps` - количество отступов между колонками сетки (по умолчанию 0). В `grid.json` ширина единичного отступа описана равной 30px.

Например: grid-width(6, flex-basis, 1) - этот элемент будет шириной 6 колонок с промежутками в 30px (1 отступ в 30px) между ними.

