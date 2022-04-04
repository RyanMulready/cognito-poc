<template>
    <b-form @submit.prevent="onSubmit">
        <b-form-group
            id="input-group-1"
            label="Username:"
            label-for="username">
            <b-form-input
                id="username"
                v-model="form.username"
                type="text"
                placeholder="Enter username(not email)"
                required />
        </b-form-group>
        <b-form-group
            id="input-group-2"
            label="Password:"
            label-for="password">
            <b-form-input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="Enter password"
                required />
        </b-form-group>
        <b-button
            type="submit"
            variant="primary">
            Submit
        </b-button>
        <div class="d-block invalid-feedback">
            {{ serverError }}
        </div>
    </b-form>
</template>
<script>
export default {
    name: 'LoginPage',
    auth: false,
    data() {
        return {
            serverError: '',
            form: {
                username: '',
                password: '',
            },
        };
    },
    async fetch(ctx) {
        if (ctx.$auth.$state.loggedIn) {
            ctx.redirect('/');
        }
    },
    methods: {
        async onSubmit() {
            this.serverError = '';
            try {
                await this.$api.auth.login(this.form);
                this.$router.push({ path: '/protected' });
            } catch (e) {
                this.serverError = e.message || 'Unknown server error';
            }
        },
    },
};
</script>
