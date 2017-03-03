import templateUrl from './app-sidebar.html';

export const sidebarComponent = {
    template: templateUrl,
    controller: class SidebarComponent {
        constructor() {
            'ngInject';

            this.defaultLabels = [{
                label: 'Recibidos',
                icon: 'inbox',
                state: 'none'
            }, {
                label: 'Enviados',
                icon: 'send',
                state: 'sent'
            }];

            this.userLabels = [{
                label: 'Friends',
                icon: 'people',
                state: 'friends',
            }, {
                label: 'Family',
                icon: 'child_care',
                state: 'family',
            }, {
                label: 'Acquaintances',
                icon: 'accessibility',
                state: 'acquaintances',
            }, {
                label: 'Following',
                icon: 'remove_red_eye',
                state: 'following',
            }];
        }
    }
};
