module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "no-var": "error",
        "arrow-body-style": ["error", "as-needed"],
        "prefer-arrow-callback": "error",
        "prefer-destructuring": "warn",
        "new-cap": ["error", {"newIsCap": false}],
        "space-before-function-paren": ["error", "never"],
        "func-call-spacing": "error"
    }
};
