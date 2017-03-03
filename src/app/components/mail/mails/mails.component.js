import templateUrl from './mails.html';

export const mailsComponent = {
    bindings: {
        mails: '<',
        filter: '<',
    },
    template: templateUrl,
    controller: class MailsComponent {
        constructor($state, $filter) {
            'ngInject';

            this.$state = $state;
            this.filteredMails = $filter('mailsFilter')(this.mails, this.filter);
        }

        goToMail(event) {
            this.$state.go('mail', { id: event.mailId });
        }
    },
};
