/* eslint-disable no-console */
import {
    CognitoUserPool,
    CognitoUser,
    CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

export default async (ctx) => {
    const userPool = new CognitoUserPool({
        UserPoolId: ctx.$config.AWS_COGNITO_USER_POOL_ID,
        ClientId: ctx.$config.AWS_COGNITO_CLIENT_ID,
    });
    ctx.$auth.cognito = {
        userPool,
        signup: async ({
            username, email, password,
        }) => {
            const emailAttribute = new CognitoUserAttribute({
                Name: 'email',
                Value: email,
            });

            return new Promise((success, error) => {
                const callback = (err, result) => {
                    if (err) {
                        error(err);
                        return;
                    }
                    success(result);
                };

                userPool.signUp(username, password, [emailAttribute], null, callback);
            });
        },
        verify: async ({ username, code }) => {
            const user = new CognitoUser({
                Username: username,
                Pool: userPool,
            });

            return new Promise((success, error) => {
                const callback = (err, result) => {
                    if (err) {
                        error(err);
                        return;
                    }
                    success(result);
                };

                user.confirmRegistration(code, true, callback);
            });
        },
        resend: async ({ username }) => {
            const user = {
                Username: username,
                Pool: userPool,
            };
            const cognitoUser = new CognitoUser(user);

            return new Promise((success, error) => {
                const callback = (err, result) => {
                    if (err) {
                        error(err);
                        return;
                    }
                    success(result);
                };

                cognitoUser.resendConfirmationCode(callback);
            });
        },
        login: async ({ username, password }) => {
            try {
                await ctx.$auth.loginWith('cognito', { data: { username, password } });
                return true;
            } catch (e) {
                const state = (e.message.split('.')).pop().split(' ').shift();
                if (state) {
                    return state;
                }
                throw e;
            }
        },
    };
};
