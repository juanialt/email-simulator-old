import uiRouter from 'angular-ui-router';
import { mailsComponent } from './mails.component';

import './mails.scss';

export const mails = angular
    .module('components.mail.mails', [
        uiRouter,
    ])
    .component('mails', mailsComponent)
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
                    //
                    if(filter === 'sent') {
                        return MailService.getSentMails().$loaded();
                    } else {
                        //return MailService.getMailsList(filter).$loaded();
                    }

                }
            },
        });
    })
    .name;
