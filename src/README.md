# React Frontend Template

![](https://img.shields.io/badge/version-2.0.0-blue)
![](https://img.shields.io/badge/size-419Kb-critical)
![](https://img.shields.io/badge/gzip-140Kb-orange)
![](https://img.shields.io/badge/node-12.14.1-green)
![](https://img.shields.io/badge/react-16.12.0-inactive)
![](https://img.shields.io/badge/next-9.1.3-inactive)

Server-Side сборка с использованием фреймворка [NextJS](https://nextjs.org/).
<br />
Стили задаются с использованием препроцессора [Stylus](http://stylus-lang.com). При написании стилей используеется методология [БЭМ](https://ru.bem.info/methodology/quick-start).

## Тестирование
### Unit Тесты

```bash
$ make test # Команда для запуска
```

Для unit тестов используются библиотеки [Jest](https://jestjs.io/) и [Enzyme](https://airbnb.io/enzyme/).

Для того что бы запустить конкретный тест, нужно после команды запуска дописать путь к этому файлу `yarn test ./path/to/filename.test.js`.

Если нужно запустить все тесты в конкретной директории, можно воспользоваться такой записью `yarn test ./directory/.*.test.js`

## Visual Studio Code
### Алиасы

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

### eslint

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

### Использование линтера стилей

Первоначально необходимо установить расширение [Manta's Stylus Supremacy](https://marketplace.visualstudio.com/items?itemName=thisismanta.stylus-supremacy). Для работы линтера на сохранение файла, нужно дополнить [глобальный settings.json](https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations) или `.vscode/settings.json`:

*settings.json*
```json
{
  "[stylus]": {
    "editor.formatOnSave": true
  }
}
```

## Адаптивность

Контрольные точки для адаптивности настраиваются в файлах **./config/breakpoints.json** (для Desktop First) и **./config/breakpoints-mf.json** (для Mobile First).

Пример брекпоинта для Desktop First: наличие в файле **./config/breakpoints.json** строчки `"notebook": 1440` добавляет в Stylus переменную `$notebook` равную `(max-width: 1440px)`.
Эту переменную можно использовать вот так: `@media $notebook { ... }`.

Пример брекпоинта для Mobile First: наличие в файле **./config/breakpoints-mf.json** строчки `"mfNotebook": 1200` добавляет в Stylus переменную `$mfNotebook` равную `(min-width: 1200)`.
Эту переменную можно использовать вот так: `@media $mfNotebook { ... }`.

Кроме того, в медиа-запросах можно использовать переменные `$landscape` и `$portrait` (вот так: `@media $landscape { ... }`), а для Ретины используется медиа-запрос `@media $retina { ... }`


## Цвета

Цвета указанные в файле **./config/colors.json** доступны в Stylus как `$#NAME#Color`.

Например, `linkHover` будет доступен в Stylus как `$linkHoverColor`, а в JS как `app.config.colors.linkHover`.


## Миксины

В sytlus-коде доступны следующие миксины:

* `clearfix()` — отменяет обтекание элемента.
* `clickZone(10px [, $pseudoElement])` — создает расширенную кликабельную область заданного размера вокруг элемента (используется для мелких элементов вроде кнопки закрытия модалки). По умолчанию реализуется с помощью псевдоэлемента `before`, но в миксин можно передать вторым параметром имя псевдоэлемента `after`. У элемента, которому добавляется расширенная область, должно быть задано позиционирование, отличное от `static`.
* `faster()` — вдвое уменьшает текущие duration анимации (используется в ховерах элементов).
* `placeholder(#ccc)` — устанавливает цвет плейсхолдеров.
* `smooth-font()` — включает сглаживание шрифтов.
* `webfont($family, $file, $weight, $style)` — подключает файлы шрифтов.
* `grid-width($count, $property, $addGaps)` — используется для построения сетки (см. ниже).


## Сетка

(Работает для Desktop first)
Для построения сетки используется миксин `grid-width($count, $property, $addGaps)`:

* `$count` - количество колонок, которые занимает элемент (по умолчанию все 12).
* `$property` - изменяемое свойство (по умолчанию width).
* `$addGaps` - количество отступов между колонками сетки (по умолчанию 0). В `grid.json` ширина единичного отступа описана равной 30px.

Например: grid-width(6, flex-basis, 1) - этот элемент будет шириной 6 колонок с промежутками в 30px (1 отступ в 30px) между ними.
