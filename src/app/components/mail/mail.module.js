import { MailService } from './mail.service';
import { mails } from './mails/mails.module';
import { mailNew } from './mail-new/mail-new.module';

export const mail = angular
    .module('components.mail', [
        mails,
        mailNew
    ])
    .service('MailService', MailService)
    .name;
