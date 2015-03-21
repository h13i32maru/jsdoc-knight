/**
 * this is myFunction.
 */
function myFunction() {
}
// this is myFunction2
var myFunction2 = function () {
};
function MyClass() {
}
// this is not jsdoc
/**
 * this is static val setter 
 */
MyClass.val = null;
/**
 * this is static val2 getter 
 */
// this is not jsdoc.
MyClass.val2 = null;
MyClass.prototype.method = function method() {
};
// this is not jsdoc.
MyClass.prototype.method2 = function method2() {
};
/**
 * this is val getter.
 */
MyClass.prototype.val = null;
/**
 * this is first comment of getter 
 */
/**
 * this is second comment of getter 
 */
/**
 * this is first comment of setter 
 */
/**
 * this is second comment of setter 
 */
MyClass.prototype.val2 = null;
/**
 * this is val3 setter 
 */
MyClass.prototype.val3 = null;
