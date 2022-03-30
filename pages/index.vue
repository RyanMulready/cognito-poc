<template>
    <div>
        <form @submit.prevent="userLogin">
            <div>
                <label for="user">
                    Username
                    <input
                        id="user"
                        v-model="login.username"
                        type="text">
                </label>
            </div>
            <div>
                <label for="password">Password
                    <input
                        id="password"
                        v-model="login.password"
                        type="text">
                </label>
            </div>
            <div>
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    auth: false,
    data() {
        return {
            login: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        async userLogin() {
            try {
                const response = await this.$auth.loginWith('cognito', { data: this.login });
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
