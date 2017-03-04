import firebase from 'firebase';

export class AuthService {
    constructor($firebaseAuth) {
        'ngInject';

        this.auth = $firebaseAuth(firebase.auth());
        this.authData = null;
        this.userData = null;

        this.onSignIn = (user) => {
            this.authData = user;
            this.fetchUser(user.uid);
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

    fetchUser(userId) {
        return firebase.database()
            .ref('users/' + userId)
            .once('value')
            .then((snapshot) => this.storeUserData(snapshot.val()));
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
        if (this.userData) return this.userData;
    }

    getAuthUser() {
        if (this.authData) return this.authData;
    }
}
