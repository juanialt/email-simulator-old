import firebase from 'firebase';
import angularfire from 'angularfire';
import uiRouter from 'angular-ui-router';
import { AuthService } from './auth.service';
import { login } from './login/login.module';
import { register } from './register/register.module';
import { authForm } from './auth-form/auth-form.module';

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
        register,
        //authForm
    ])
    .config(($firebaseRefProvider) => {
        'ngInject';

        $firebaseRefProvider
        .registerUrl({
            default: firebaseConfig.databaseURL,
            //contacts: `${firebaseConfig.databaseURL}/contacts`,
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
            url: '/auth',
            //template: '<div class="juani"></div>',
        });
        $urlRouterProvider.otherwise('/auth/login');
    })

    // .config(($stateProvider, $urlRouterProvider) => {
    //     'ngInject';
    //     $stateProvider
    //     .state('todos', {
    //         url: '/auth/register',
    //         component: 'register',
    //         resolve: {
    //             //todoData: TodoService => TodoService.getTodos()
    //         }
    //     });
    //     $urlRouterProvider.otherwise('/');
    // })



    .service('AuthService', AuthService)
    .name;
