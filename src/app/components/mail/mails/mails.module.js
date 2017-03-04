import uiRouter from 'angular-ui-router';
import { mailsComponent } from './mails.component';
import { mailsFilter } from './mails.filter';

import './mails.scss';

export const mails = angular
    .module('components.mail.mails', [
        uiRouter,
    ])
    .component('mails', mailsComponent)
    .filter('mailsFilter', mailsFilter)
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider
        .state('mails', {
            parent: 'app',
            url: '/mails?filter',
            component: 'mails',
            params: {
                filter: {
                    value: 'none',
                },
            },
            resolve: {
                mails(MailService, $transition$) {
                    'ngInject';
                    const filter = $transition$.params().filter;
                    return MailService.getMailsList(filter).$loaded();
                },
                filter($transition$) {
                    'ngInject';
                    return $transition$.params();
                },
            },
        });
    })
    .name;
