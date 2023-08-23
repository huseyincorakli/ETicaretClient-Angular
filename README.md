# ETicaretClient2023

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.


!Errors : 
error NG8001: 'asl-google-signin-button' is not a known element:
1. If 'asl-google-signin-button' is an Angular component, then verify that it is part of this module.
2. If 'asl-google-signin-button' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.

204      <asl-google-signin-button></asl-google-signin-button>

You can fix this bug by running the following command if you have imported all the mentioned modules:-
npm i @abacritt/angularx-social-login@1.2.3 --save OR

npm i @abacritt/angularx-social-login@1.2.3 --legacy-peer-deps

& it runs in both Angular 15 and 16
Also, it is GoogleSigninButtonDirective and not module which will be declared in Providers.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

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
