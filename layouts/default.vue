<template>
    <div id="app">
        <b-navbar
            type="dark"
            variant="primary">
            <b-navbar-brand to="/">
                Home
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse" />

            <b-collapse
                id="nav-collapse"
                is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        v-if="!$auth.$state.loggedIn"
                        to="/login">
                        Login
                    </b-nav-item>
                    <b-nav-item
                        v-else
                        to="/logout">
                        Logout
                    </b-nav-item>
                    <b-nav-item
                        v-if="!$auth.$state.loggedIn"
                        to="/signup">
                        Signup
                    </b-nav-item>
                    <b-nav-item
                        :disabled="!$auth.$state.loggedIn"
                        to="/protected">
                        Protected
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-container class="mt-5">
            <Nuxt />
        </b-container>
    </div>
</template>
<script>
export default {
    name: 'DefaultLayout',
};
</script>
