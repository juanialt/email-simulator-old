import templateUrl from './mails.html';

export const mailsComponent = {
    bindings: {
        mails: '<',
        filter: '<',
    },
    template: templateUrl,
    controller: class MailsComponent {
        constructor($state, $filter, AuthService, MailService) {
            'ngInject';

            this.$state = $state;
            this.mailService = MailService;


            // var obj = $firebaseObject(ref);
            // obj.$loaded()
            //   .then(function(data) {
            //     console.log(data === obj); // true
            //   })
            //   .catch(function(error) {
            //     console.error("Error:", error);
            //   });

            console.log(this.mails);
        }

        goToMail(event) {
            this.$state.go('mail', { id: event.mailId });
        }
    },
};
