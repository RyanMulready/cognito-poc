<template>
    <div id="signup">
        <b-form
            v-if="step === 1"
            @submit.prevent="submitSignup">
            <b-form-group
                id="input-group-1"
                label="Username:"
                label-for="username">
                <b-form-input
                    id="username"
                    v-model="signup.username"
                    type="text"
                    placeholder="Enter username(not email)"
                    required />
            </b-form-group>
            <b-form-group
                id="input-group-1"
                label="Email:"
                label-for="email">
                <b-form-input
                    id="email"
                    v-model="signup.email"
                    type="email"
                    placeholder="Enter email"
                    required />
            </b-form-group>
            <b-form-group
                id="input-group-3"
                label="Password:"
                label-for="password">
                <b-form-input
                    id="password"
                    v-model="signup.password"
                    type="password"
                    placeholder="Enter password"
                    required />
            </b-form-group>
            <b-form-group
                id="input-group-4"
                label="City:"
                label-for="city">
                <b-form-input
                    id="password"
                    v-model="signup.city"
                    type="text"
                    placeholder="Enter city" />
            </b-form-group>
            <b-form-group
                id="input-group-5"
                label="State:"
                label-for="state">
                <b-form-input
                    id="state"
                    v-model="signup.state"
                    type="text"
                    placeholder="Enter state" />
            </b-form-group>
            <b-button
                type="submit"
                variant="primary">
                Submit
            </b-button>
            <b-button
                variant="secondary"
                @click="goToStep(2)">
                Verify User
            </b-button>
        </b-form>
        <b-form
            v-if="step === 2"
            @submit.prevent="submitCode">
            <b-form-group
                id="input-group-1"
                label="Username:"
                label-for="username">
                <b-form-input
                    id="username"
                    v-model="verify.username"
                    type="text"
                    placeholder="Enter username(not email)"
                    required />
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Code:"
                label-for="code">
                <b-form-input
                    id="code"
                    v-model="verify.code"
                    type="text"
                    placeholder="Enter verification code"
                    required />
            </b-form-group>
            <b-button
                type="submit"
                variant="primary">
                Submit
            </b-button>
            <b-button
                variant="info"
                @click="resendCode">
                Resend Verification Code
            </b-button>
            <b-button
                variant="secondary"
                @click="goToStep(1)">
                Back
            </b-button>
        </b-form>
        <div class="d-block invalid-feedback">
            {{ msgs.error }}
        </div>
        <div class="d-block valid-feedback">
            {{ msgs.success }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'SignUpPage',
    auth: false,
    data() {
        return {
            step: 1,
            msgs: {
                error: '',
                success: '',
            },
            signup: {
                username: '',
                email: '',
                password: '',
                city: '',
                state: '',
            },
            verify: {
                username: '',
                code: '',
            },
        };
    },
    async fetch(ctx) {
        if (ctx.$auth.$state.loggedIn) {
            ctx.redirect('/');
        }
    },
    methods: {
        async submitSignup() {
            this.clearMessages();
            try {
                await this.$api.auth.signup({
                    username: this.signup.username,
                    email: this.signup.email,
                    password: this.signup.password,
                });
                // TODO: If this request fails user is in a strange state what should we do?
                await this.$api.profile.create({
                    username: this.signup.username,
                    email: this.signup.email,
                    city: this.signup.city,
                    state: this.signup.state,
                });

                this.verify.username = this.signup.username;
                this.step = 2;
                this.setSuccessMessage('Signup successful, email verification sent!');
            } catch (e) {
                this.setErrorMessage(e);
            }
        },
        async submitCode() {
            this.clearMessages();
            try {
                await this.$api.auth.verify(this.verify);
                this.setSuccessMessage('Verification successful, please login!');
                this.$router.push({ path: '/login' });
            } catch (e) {
                this.setErrorMessage(e);
            }
        },
        async resendCode() {
            this.clearMessages();
            try {
                await this.$api.auth.resend(this.verify);
                this.setSuccessMessage('Verification email resent!');
            } catch (e) {
                this.setErrorMessage(e);
            }
        },
        clearMessages() {
            this.msgs.success = '';
            this.msgs.error = '';
        },
        setErrorMessage(e) {
            this.msgs.error = e.message || 'Unknown server error';
        },
        setSuccessMessage(msg) {
            this.msgs.success = msg;
        },
        goToStep(step) {
            this.clearMessages();
            this.step = step;
        },
    },
};
</script>
