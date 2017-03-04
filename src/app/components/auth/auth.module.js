import firebase from 'firebase';
import angularfire from 'angularfire';
import uiRouter from 'angular-ui-router';
import { AuthService } from './auth.service';
import { login } from './login/login.module';
import { register } from './register/register.module';

import './auth.scss';

// Initialize Firebase
var firebaseConfig = {
    apiKey: 'AIzaSyAXPhAZNlgMpe_YQ8Je5GcH8GC8X7ofgIQ',
    authDomain: 'email-simulator.firebaseapp.com',
    databaseURL: 'https://email-simulator.firebaseio.com',
    storageBucket: 'email-simulator.appspot.com',
    messagingSenderId: '987976380620'
};
export const app = firebase.initializeApp(firebaseConfig);

export const auth = angular
    .module('components.auth', [
        angularfire,
        uiRouter,
        login,
        register
    ])
    .config(($firebaseRefProvider) => {
        'ngInject';

        $firebaseRefProvider
        .registerUrl({
            default: firebaseConfig.databaseURL,
            //mails: `${firebaseConfig.databaseURL}/mails`,
        });
    })
    .run(($transitions, $state, AuthService) => {
        'ngInject';

        $transitions.onStart({
            to: (state) => !!(state.data && state.data.requiredAuth),
        }, () => {
            return AuthService
            .requireAuthentication()
            .catch(() => $state.target('auth.login'));
        });

        $transitions.onStart({
            to: 'auth.*',
        }, () => {
            if (AuthService.isAuthenticated()) return $state.target('app');
        });
    })
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';

        $stateProvider
        .state('auth', {
            redirectTo: 'auth.login',
            url: '/auth'
        });
        $urlRouterProvider.otherwise('/auth/login');
    })
    .service('AuthService', AuthService)
    .name;
