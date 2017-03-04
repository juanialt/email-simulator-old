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
            this.filteredMails = $filter('mailsFilter')(this.mails, this.filter);


            // var obj = $firebaseObject(ref);
            // obj.$loaded()
            //   .then(function(data) {
            //     console.log(data === obj); // true
            //   })
            //   .catch(function(error) {
            //     console.error("Error:", error);
            //   });

            // this.mails
            // .then((mail) => {
            //     console.log('adentro');
            //     console.log(mail);
            // });

            console.log(this.filteredMails);
        }

        goToMail(event) {
            this.$state.go('mail', { id: event.mailId });
        }
    },
};
