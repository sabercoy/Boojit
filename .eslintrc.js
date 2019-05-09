module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        "object-curly-newline": ["error", {
            "ImportDeclaration": "never",
            "ExportDeclaration": "never"
        }],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "arrow-parens": ["error", "as-needed"],
        "no-console": "off",
        "arrow-body-style": "off",
        "global-require": "off",
        "react/destructuring-assignment": "off",
        "no-multiple-empty-lines": "off",
        "react/jsx-filename-extension": "off",
        "eol-last": "off",
        "react/prefer-stateless-function": "off",
        "spaced-comment": "off",
        "no-unused-vars": "off",
        "arrow-parens": "off",
        "object-curly-spacing": "off",
        "react/jsx-curly-brace-presence": "off",
        "quote-props": "off",
        "comma-dangle": "off",
        "no-trailing-spaces": "off",
        "no-multi-spaces": "off",
        "max-len": "off",
        "import/order": "off",
        "react/jsx-props-no-multi-spaces": "off",
        "radix": "off",
        "no-plusplus": "off",
        "no-nested-ternary": "off",
        "object-shorthand": "off",
        "prefer-template": "off",
        "no-unneeded-ternary": "off",
        "import/prefer-default-export": "off",
        "space-before-function-paren": "off",
        "func-names": "off",
        "react/jsx-boolean-value": "off",
        "consistent-return": "off",
        "object-curly-newline": "off",
        "react/forbid-prop-types": "off",
        "no-underscore-dangle": "off"
    }
};