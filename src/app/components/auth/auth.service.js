import firebase from 'firebase';

export class AuthService {
    constructor($firebaseAuth) {
        'ngInject';

        this.auth = $firebaseAuth(firebase.auth());
        this.authData = null;
        this.userData = null;

        this.onSignIn = (user) => {
            this.authData = user;
            return this.auth.$requireSignIn();
        };

        this.storeAuthData = (data) => {
            this.authData = data;
            return this.authData;
        };

        this.clearAuthData = () => {
            this.authData = null;
        };

        this.storeUserData = (data) => {
            console.log('storing data');
            this.userData = data;
            return this.userData;
        };
    }

    login(user) {
        return this.auth
        .$signInWithEmailAndPassword(user.email, user.password)
        .then(this.storeAuthData);
    }

    register(user) {
        return this.auth
        .$createUserWithEmailAndPassword(user.email, user.password)
        .then(this.storeAuthData);
    }

    // Create a user with all the extra data referencing the authorized one
    registerUser(user) {
        return firebase.database().ref('users/' + this.authData.uid).set({
            username: user.username,
            name: user.name,
            lastname: user.lastname,
            address: user.address,
            phone: user.phone,
            country: user.country,
            state: user.state,
            city: user.city,
            email: user.email
        }).then(() => this.storeUserData(user));
    }

    logout() {
        return this.auth
        .$signOut()
        .then(this.clearAuthData);
    }

    requireAuthentication() {
        return this.auth
        .$waitForSignIn()
        .then(this.onSignIn);
    }

    isAuthenticated() {
        return !!this.authData;
    }

    getUser() {
        if (this.authData) return this.authData;
    }
}
