<template>
    <div>
        <h1>
            {{ welcomeMsg }}
        </h1>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    auth: false,
    computed: {
        welcomeMsg() {
            return `Welcome ${this.$auth.$state.loggedIn ? this.$auth.$state.user.email : '!'}`;
        },
    },
    // TODO:
    // Forgot Password
    // Change Password
};
</script>
