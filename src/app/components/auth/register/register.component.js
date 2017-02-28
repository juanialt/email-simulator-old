import templateUrl from './register.html';

import firebase from 'firebase';

export const registerComponent = {
    template: templateUrl,
    controller: class RegisterComponent {
        constructor(AuthService, $state) {
            'ngInject';

            this.authService = AuthService;
            this.$state = $state;
        }
        
        $onInit() {
            this.error = null;
            this.countries = [{
                name: 'Argentina',
                id: 1
            }];
            this.states = [{
                name: 'Buenos Aires',
                id: 1
            }];
            this.user = {
                username: '',
                name: '',
                lastname: '',
                address: '',
                phone: '',
                country: '',
                state: '',
                city: '',
                password: '',
                email: ''
            };
        }

        $onChanges(changes) {
            if (changes.user) {
                this.user = angular.copy(this.user);
            }
        }

        createUser() {
            console.log('REGISTER USER PLEASEEE');
            const dbRef = firebase.database().ref().child('text');
            dbRef.on('value', snap => console.log(snap.val()));

            return this.authService
            .register(this.user)
            .then(() => {
                this.$state.go('app');
            }, reason => {
                this.error = reason.message;
            });
        }
    },
};


// export const formComponent = {
//     bindings: {
//         user: '<',
//         button: '@',
//         message: '@',
//         onSubmit: '&',
//     },
//     templateUrl,
//     controller: class FormComponent {
//         constructor() {
//             'ngInject';
//         }
//         $onChanges(changes) {
//             if (changes.user) {
//                 this.user = angular.copy(this.user);
//             }
//         }
//         submitForm() {
//             this.onSubmit({
//                 $event: {
//                     user: this.user,
//                 },
//             });
//         }
//     },
// };
