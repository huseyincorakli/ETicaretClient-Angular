# ETicaretClient2023

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.


Errors : 
error NG8001: 'asl-google-signin-button' is not a known element:
1. If 'asl-google-signin-button' is an Angular component, then verify that it is part of this module.
2. If 'asl-google-signin-button' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.

204      <asl-google-signin-button></asl-google-signin-button>

You can fix this bug by running the following command if you have imported all the mentioned modules:-
npm i @abacritt/angularx-social-login@1.2.3 --save OR

npm i @abacritt/angularx-social-login@1.2.3 --legacy-peer-deps

& it runs in both Angular 15 and 16
Also, it is GoogleSigninButtonDirective and not module which will be declared in Providers.


