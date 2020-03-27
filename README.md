# Pwa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.

## Development server

Install http-server to be able to use service workers locally. `npm install http-server -g`. Run it from project root using `npx http-server -p 8080 -c-1 dist/pwa`.

Or run plain old `ng serve` if you develop/test not pwa-related functionality

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --prod` to build the project with prod config.    
Run `ng build --configuration dev` to build for dev env.  
The build artifacts will be stored in the `dist/` directory. After next page reload service worker downloads app update and install it in browser.
Docker is also supported.  
Look at Dockerfile for better understanding

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
