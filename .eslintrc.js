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
        "no-var": ["error", "always"],
        "arrow-body-style": ["error", "as-needed"],
        "prefer-arrow-callback": "error",
        "prefer-destructuring": "error",
        "new-cap": ["error", {"newIsCap": false}],
        "space-before-function-paren": ["error", "never"]
    }
};