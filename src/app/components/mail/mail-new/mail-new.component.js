import templateUrl from './mail-new.html';

export const mailNewComponent = {
    template: templateUrl,
    controller: class MailNewComponent {
        constructor(AuthService, MailService, $state) {
            'ngInject';

            this.mailService = MailService;
            this.$state = $state;
            this.user = AuthService.getUser();
            this.user.uid = AuthService.getAuthUser().uid;
        }
        $onInit() {
            this.mail = {
                sender: this.user,
                subject: '',
                recipients: '',
                message: '',
                date: null
            };
        }
        createNewMail() {
            this.mail.date = new Date().getTime();
            return this.mailService
            .createNewMail(this.mail)
            .then((mail) => {
                this.$state.go('mail', {
                    id: mail.key,
                });
            });
        }
    },
};
