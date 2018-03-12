import { Accounts } from 'meteor/accounts-base';
// import { FlowRouter } from 'meteor/kadira:flow-router-ssr';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
    // onSignedOutHook: () => FlowRouter.go('/login')
});