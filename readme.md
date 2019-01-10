# Проект "Гео отзыв"

### Описание проекта

Приложение представляет из себя карту Yandex, на которой можно оставлять отзывы. При клике по карте открывается форма добавления отзыва по адресу, который определяется по координатам карты при помощи Yandex Maps API. Отзывы добавленые по одному адресу группируются.

![Гео отзыв](https://media.giphy.com/media/2zoFcpnGAxZZTZ91YX/giphy.gif)

Если добавить несколько отзывов по разным адресам, а потом отдалить карту, то будет создан кластер из отзывов.


### Стек технологий
- Нативный JavaScript ES6+
- Yandex Maps API
- MVC
- Webpack
- Handelbars
- Sass


### Запуск проекта на локальном сервере

```sh
$ git clone git@github.com:ptataurov/geoReviewer.git
$ cd geoReviewer
$ npm install
$ npm run start
```