import templateUrl from './login.html';

export const loginComponent = {
    template: templateUrl,
    controller: class LoginComponent {
        constructor(AuthService, $state) {
            'ngInject';

            this.authService = AuthService;
            this.$state = $state;
        }

        $onInit() {
            this.error = null;
            this.user = {
                email: '',
                password: '',
            };
        }

        $onChanges(changes) {
            if (changes.user) {
                this.user = angular.copy(this.user);
            }
        }

        loginUser() {
            return this.authService
            .login(this.user)
            .then(() => {
                this.$state.go('app');
            }, reason => {
                this.error = reason.message;
            });
        }
    },
};
