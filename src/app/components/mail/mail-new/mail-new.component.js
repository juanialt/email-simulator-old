import templateUrl from './mail-new.html';

export const mailNewComponent = {
    template: templateUrl,
    controller: class MailNewComponent {
        constructor(MailService, $state) {
            'ngInject';

            this.mailService = MailService;
            this.$state = $state;
        }
        $onInit() {
            this.mail = {
                name: '',
                email: '',
                job: '',
                location: '',
                social: {
                    facebook: '',
                    github: '',
                    twitter: '',
                    linkedin: '',
                },
                tag: 'none',
            };
        }
        createNewMail(event) {
            return this.mailService
            .createNewMail(event.mail)
            .then((mail) => {
                this.$state.go('mail', {
                    id: mail.key,
                });
            });
        }
    },
};
