export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'cognito-poc',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        '@nuxt/postcss8', // Allow postcss@8 in nuxt@2
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // https://github.com/sirdiego/nuxt-auth-cognito-scheme
        '@sirdiego/nuxt-auth-cognito-scheme',
        '@nuxtjs/auth',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    // https://nuxtjs.org/docs/configuration-glossary/configuration-runtime-config/
    publicRuntimeConfig: {
        AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
        AWS_COGNITO_CLIENT_ID: process.env.AWS_COGNITO_CLIENT_ID,
        AWS_USER_PROFILE_API: process.env.AWS_USER_PROFILE_API,
    },
    router: {
        middleware: ['auth'],
    },
    auth: {
        strategies: {
            // https://github.com/sirdiego/nuxt-auth-cognito-scheme
            cognito: {
                tokenType: 'Bearer',
                globalToken: true,
                tokenRequired: true,
                tokenName: 'Authorization',
                autoFetchUser: true,
                userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
                clientId: process.env.AWS_COGNITO_CLIENT_ID,
                refreshInterval: 5 * 60 * 1000,
            },
        },
        redirect: {
            login: '/login',
            logout: '/',
            callback: '/',
            home: '/',
        },
        plugins: [{ src: '@/plugins/api.js' }],
    },
};
