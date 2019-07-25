# 0. Основная информация #

Стили задаются с использованием препроцессора Stylus (http://stylus-lang.com).
При написании стилей мы используем методологию БЭМ (https://ru.bem.info/methodology/quick-start).


# 1. Установка приложения

Установите приложение командой `npm install`
Выполните команду `cp .env.example .env` и заполните файл `.env`.


# 2. Работа в режиме разработки

```
npm run dev
```


# 3. Сборка прода

```
npm run build
npm run start
```


# 4. Адаптивность #

Контрольные точки для адаптивности настраиваются в файлах **source/config/breakpoints.json** (для Desktop First) и **source/config/breakpoints-mf.json** (для Mobile First).

Пример брекпоинта для Desktop First: наличие в файле **source/config/breakpoints.json** строчки `"notebook": 1440` добавляет в Stylus переменную `$notebook` равную `(max-width: 1440px)`.
Эту переменную можно использовать вот так: `@media $notebook { ... }`.

Пример брекпоинта для Mobile First: наличие в файле **source/config/breakpoints-mf.json** строчки `"mfNotebook": 1200` добавляет в Stylus переменную `$mfNotebook` равную `(min-width: 1200)`.
Эту переменную можно использовать вот так: `@media $mfNotebook { ... }`.

Кроме того, в медиа-запросах можно использовать переменные `$landscape` и `$portrait` (вот так: `@media $landscape { ... }`), а для Ретины используется медиа-запрос `@media $retina { ... }`


# 5. Цвета #

Цвета указанные в файле **source/config/colors.json** доступны в Stylus как `$#NAME#Color`.

Например, `linkHover` будет доступен в Stylus как `$linkHoverColor`, а в JS как `app.config.colors.linkHover`.