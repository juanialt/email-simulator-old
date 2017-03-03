import firebase from 'firebase';

export class MailService {
    constructor(AuthService, $firebaseArray, $firebaseObject) {
        'ngInject';

        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.ref = firebase.database().ref('mails');
        this.uid = AuthService.getUser().uid;

        this.rootRef = firebase.database().ref();

        console.log('LEER BASE');
        const dbRef = firebase.database().ref().child('text');
        dbRef.on('value', snap => console.log(snap.val()));
    }

    // createNewMail(mail) {
    //     return this.$firebaseArray(this.ref.child(this.uid)).$add(mail);
    // }
    //
    // getMailById(id) {
    //     return this.$firebaseObject(this.ref.child(this.uid).child(id));
    // }
    //
    getMailsList() {
        const mails = this.rootRef.child('mails');
        mails.on('value', snap => console.log(snap.val()));

        return this.$firebaseArray(this.ref.child('mails'));
    }
    //
    // updateContact(contact) {
    //     return contact.$save();
    // }
    //
    // deleteContact(contact) {
    //     return contact.$remove();
    // }
}
