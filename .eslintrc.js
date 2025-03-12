module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'playwright'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:playwright/recommended'
    ],
    env: {
        node: true,
        es6: true
    },
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        'playwright/no-skipped-test': 'warn',
        'playwright/valid-expect': 'error'
    }
}; 