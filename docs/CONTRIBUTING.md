# Contributing to Project Tech Team

## Branches
The `master` branch is always being deployed to the live environment, so everything on the master branch needs to be bug free. For development we use a `develop` branch so all bugfixes and features get a last check before merging it with `master`.

### Features
A feature branch is branched off from the `develop` branch and is formatted like: `feature/feature-name`.

### Bugfixes
A bugfix branch is branched off from the `develop` branch and is formatted like: `bugfix/fix-name`.

## Commits
Always write your commits in present tense and prefix it with something. 

A commit message should be:
* Start with a capital
* Descriptive
* Brief
* Use 10 words at max

Some examples:
```
# Fixing a bug:
git commit -m "Fix form submitting"

# Adding functionality:
git commit -m "Add a form for registering users"

# Changing functionality:
git commit -m "Change title of pages"
```

## ESLint
ESLint covers most of the coding standards defined in our first meeting.

## Var or let and const?
We complied to using let and cost since it's less buggy.
```js
// Do: use const or let
const myNeverChangingVariable = 0;
let myChangingVariable = 1;

// Don't: use var
var myVariable = 2;
```

## Functions
When you write functions in the global scope or as a method on `Object.prototype` you should use ES5 named functions since they're getting hoisted and that improves your document structure.

### Function expressions / arrow functions
Always declare a function expression to a `const` variable:
```js
const myFunction = () => {
    // do something
}
```
When you're writing functions inside of other functions you should use ES6 arrow functions:
```js
// Function in the global scope:

// Function calls and other code

function globalFunction() {
    // Do something
}

// Functions in functions
function globalFunction(arr) {
    const mapped = arr.map(item => item+1);
    return mapped;
}

// Object prototype functions
Object.prototype.logMessage = function() {
    console.log(this.message);
}
```