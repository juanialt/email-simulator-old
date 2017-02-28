import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { rootComponent } from './root.component';
import { common } from './common/common.module';
import { components } from './components/components.module';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import 'normalize.css';
import '../../node_modules/angular-material/angular-material.scss';
import './root.scss';

export const root = angular
    .module('root', [
        'ngMaterial',
        uiRouter,
        common,
        components
    ])
    .component('root', rootComponent)
    .config(($locationProvider, $urlRouterProvider) => {
        'ngInject';
        $locationProvider.html5Mode(true);
    })
    .name;
