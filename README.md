# GamblingProject

Проекта съдържа 7 страници:
# Начало:
Динамична страница, връща броя на регистрираните потребители от REST и предлага сваляне на PDf (книга-игра) през REST; Отчита броя на свалянията на pdf-a
# Играй: 
Динамична страница, през която се играе книга-игра. Главите се зареждат динамично през REST read-only json база; Регистрираните потребители могат да запазват прогреса си;
# Отзиви:
Динамична страница за публикуване/триене/редакция на отзиви за регистрирани потребители/четене на отзиви за нерегистрирани потребители през REST;
# За сайта:
 Статична страница
# Логин/Регистрация:
 Страници за регистрация и логин на съществуващи потребители през REST
# Профил:
 Динамична страница, съдържаща информация за потребителя взета от REST; връзка към последен Save на играта

# Backend Rest service
https://github.com/entropy88/AngularGamblingBackEnd
REST API реализирано чрез Node | Express| MongoDb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
