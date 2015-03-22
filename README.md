[![Build Status](https://travis-ci.org/h13i32maru/jsdoc-knight.svg?branch=master)](https://travis-ci.org/h13i32maru/jsdoc-knight)
[![Coverage Status](https://coveralls.io/repos/h13i32maru/jsdoc-knight/badge.svg?branch=master)](https://coveralls.io/r/h13i32maru/jsdoc-knight?branch=master)
# JSDoc Knight
JSDoc Knight converts ES6 to ES5 that JSDoc can process.

## Caution
JSDoc Knight is **not** ES6 transpiler.
This is converter for only JSDoc. Converted source code is not executable.

## Usage

```
npm install jsdoc-knight
./node_modules/.bin/jsdoc-knight indir outdir
```

## Example
create ``indir/MyClass.js``

```javascript
import SuperClass from './SuperClass.js';

/**
 * @classdesc this is MyClass.
 * @class
 * @extends SuperClass
 */
class MyClass extends SuperClass {
  /**
   * this is constructor.
   * @param {string} p1
   */
  constructor(p1) {
    this.p1 = p1;
  }

  /**
   * this is method.
   * @param {string} p1
   * @returns {number}
   */
  method(p1){
    return 123;
  }
}
```

convert ES6 to ES5.

```
./node_modules/.bin/jsdoc-knight indir outdir
```

show ``outdir/MyClass.js``

```javascript
/**
 * this is constructor.
 * @param {string} p1
 * @classdesc this is MyClass.
 * @class
 * @extends SuperClass
 */
function MyClass() {
}
/**
 * this is method.
 * @param {string} p1
 * @returns {number}
 */
MyClass.prototype.method = function method() {
};
```

## API
[http://h13i32maru.github.io/jsdoc-knight/](http://h13i32maru.github.io/jsdoc-knight/])
