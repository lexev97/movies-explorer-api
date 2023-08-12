# Movies-Explorer. Backend

Backend для дипломной работы Яндекс Практикума. Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

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

## Запуск проекта

`git clone https://github.com/lexev97/movies-explorer-api` — копирование репозитория   
`npm install` — установка зависимостей.   
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Ссылка на репозиторий
https://github.com/lexev97/movies-explorer-api

## Публичный IP
130.193.49.54

## Домен
https://api.ypdiploma.nomoreparties.co
