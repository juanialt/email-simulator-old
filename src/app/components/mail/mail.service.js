import firebase from 'firebase';

export class MailService {
    constructor(AuthService, $firebaseArray, $firebaseObject) {
        'ngInject';

        this.$firebaseArray = $firebaseArray;
        this.$firebaseObject = $firebaseObject;
        this.ref = firebase.database().ref('mails');
        this.uid = AuthService.getAuthUser().uid;

        this.rootRef = firebase.database().ref();
    }

    createNewMail(mail) {
        return this.$firebaseArray(this.ref).$add(mail);
    }
    //
    // getMailById(id) {
    //     return this.$firebaseObject(this.ref.child(this.uid).child(id));
    // }
    //
    getMailsList(filter) {
        // const mails = this.rootRef.child('mails');
        // mails.on('value', snap => console.log(snap.val()));

        return this.$firebaseArray(this.ref);
    }

    getSentMails() {
        const mails = this.rootRef.child('mails').orderByChild('sid').equalTo(this.uid);
        mails.on('value', snap => console.log(snap.val()));

        //return this.$firebaseArray(this.ref.child('sender'));
        return this.$firebaseArray(this.rootRef.child('mails').orderByChild('sid').equalTo(this.uid));

    }
    //
    // updateMail(mail) {
    //     return mail.$save();
    // }
    //
    // deleteMail(mail) {
    //     return mail.$remove();
    // }
}
