module.exports = {
    env: {
        browser: true,
        commonjs: true,
        node: true,
        mocha: true,
    },
    extends: [
        'eslint-config-energysage',
        'plugin:nuxt/recommended',
        'plugin:jest/recommended',
        'plugin:jest/style',
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        extensions: ['*', '.js', '.vue', '.json'],
                        alias: {
                            '~': __dirname,
                            '@': __dirname,
                        },
                    },
                },
            },
        },
    },
    rules: {
        'jest/consistent-test-it': ['error', { fn: 'it' }],
        // TODO: We should likely be consistent on .vue and .json as well in the future
        'import/extensions': ['error', 'always', { js: 'never', json: 'ignorePackages', vue: 'ignorePackages' }],
    },
};
