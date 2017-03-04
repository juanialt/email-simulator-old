import uiRouter from 'angular-ui-router';
import { mailNewComponent } from './mail-new.component';

import './mail-new.scss';

export const mailNew = angular
    .module('components.mail.mail-new', [
        uiRouter
    ])
    .component('mailNew', mailNewComponent)
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
        .state('new', {
            parent: 'app',
            url: '/new',
            component: 'mailNew',
        });
    })
    .name;
