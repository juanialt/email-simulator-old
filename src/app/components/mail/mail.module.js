import { MailService } from './mail.service';
//import { lengthCheck } from './length-check/length-check.directive';
import { mails } from './mails/mails.module';
// import { mailSingle } from './mail/mail.module';
// import { mailNew } from './mail-new/mail-new.module';
// import { mailDetail } from './mail-detail/mail-detail.module';
// import { mailEdit } from './mail-edit/mail-edit.module';
// import { mailTag } from './mail-tag/mail-tag.module';

export const mail = angular
    .module('components.mail', [
        mails,
        // mailSingle,
        // mailNew,
        // mailDetail,
        // mailEdit,
        // mailTag,
    ])
    .service('MailService', MailService)
    //.directive('lengthCheck', lengthCheck)
    .name;
