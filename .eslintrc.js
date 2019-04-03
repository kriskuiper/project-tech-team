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
        "semi": [2, "always"],
        "quotes": [2, "double"],
        "no-var": [2],
        "arrow-body-style": [2, "as-needed"],
        "prefer-arrow-callback": 2,
        "prefer-destructuring": 1,
        "new-cap": ["error", {"newIsCap": false}],
        "space-before-function-paren": [2, "never"],
        "space-before-blocks": [2, "always"]
    }
};