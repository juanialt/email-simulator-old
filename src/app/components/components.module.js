import angular from 'angular';
import { auth } from './auth/auth.module';
import { mail } from './mail/mail.module';

export const components = angular
    .module('components', [
        auth,
        mail
    ])
    .name;
