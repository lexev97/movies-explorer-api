# **Movies Explorer. Backend**

### Обзор
* [Описание](#описание)
* [Роуты](#роуты)
* [Стек](#стек)
* [Развертывание](#развертывание)
* [Домен](#домен)
<br>

## Описание

Backend для SPA [Movies Explorer](https://github.com/lexev97/movies-explorer-frontend). Сервис в котором можно найти фильмы по запросу и сохранить в личном кабинете.

## Роуты

### Возвращает информацию о пользователе (email и имя)
- GET /users/me
### Обновляет информацию о пользователе (email и имя)
- PATCH /users/me
### Возвращает все сохранённые текущим пользователем фильмы
- GET /movies
### Создаёт фильм
- POST /movies
### Удаляет сохранённый фильм по id
- DELETE /movies/_id 

## Стек

Node.js, Express, MongoDB, helmet, celebrate, winston, express-rate-limit

## Развертывание

Для копирования и запуска приложения Вам потребуются [Git](https://git-scm.com/) и [Node.js](https://nodejs.org/en/download/) (вместе с которым автоматически устанавливается менеджер пакетов [npm](http://npmjs.com/)) предварительно установленные на компьютер.

Далее пишем в командной строке следующие команды:

```
// Клонирование репозитория
$ git clone https://github.com/lexev97/movies-explorer-api

// Установка зависимостей
$ npm install

// Запуск сервера
$ npm run start    

// Запуск сервера с hot-reload
$ npm run dev
```

## Домен
https://api.ypdiploma.nomoreparties.co

## Публичный IP
84.201.143.32
