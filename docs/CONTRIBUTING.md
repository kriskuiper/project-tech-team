# Contributing to Project Tech Team

## Branches
The `master` branch is always being deployed to the live environment, so everything on the master branch needs to be bug free. For development we use a `development` branch so all bugfixes and features get a last check before merging it with `master`.

### Features
A feature branch is branched off from the `development` branch and is formatted like: `feature/feature-name`.

### Bugfixes
A bugfix branch is branched off from the `development` branch and is formatted like: `bugfix/fix-name`.

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

## Code standards

### Use let and const
Use `let` and `const` instead of `var` when defining your variables since it's less buggy.
```js
// Do: use const or let
const myNeverChangingVariable = 0;
let myChangingVariable = 1;

// Don't: use var
var myVariable = 2;
```

### Functions
When you write functions in the global scope or as a method on `Object.prototype` you should use ES5 named functions since they're getting hoisted and that improves your document structure.

#### Function expressions / arrow functions
Always bind a function expression to a `const` variable:
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
    const mapped = arr.map(item => item + 1);
    return mapped;
}

// Object prototype functions
Object.prototype.logMessage = function() {
    console.log(this.message);
}
```

## Make functions say what they're intended to do
When you write function names in a way that they say what they do then your teammates don't have to read how the function actually works, the function name describes its intent:

```js
// Do:
function addTwo(arr) {
    return arr.map(item => item + 2);
}

// Don't:
function add() {
    return arr.map(item => item + 2);
}
```

### Make use of hoisting to structure your code
So define your global functions at the bottom of your files:
```js
// Other code
logHelloWorld();
doSomething();
// Other code

function logHelloWorld() {
    console.log("Hello world!")
}

function doSomethingElse() {
    console.log("Something else")
}
```


## Using external code
When you external code, always specify the source APA style in comments above the code like this:

```js
// =============
/* Source, M. (2019, March 29). My External Source. Retrieved March 29, 2019, from www.mysource.com */
function awesomeExternalCode() {
    // does something awesome
}
// =============
```

After you found out what the external code does, please create an issue that descibes what the code does, add a label `external` to the issue.