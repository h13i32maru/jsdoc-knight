/**
 * this is module comment.
 * @module my-module
 */
/**
 * this is class Foo comment
 * @classdesc this is classdesc.
 * @class
 * @example
 * var foo = 10;
 * this is constructor comment.
 * @param {string} p1
 * @param {string} p2
 * @example
 * var foo = 123;
 */
function MyClass() {
}
/**
 * this is static method comment.
 * @param {string} p1
 * @param {string} p2
 */
MyClass.staticMethod = function staticMethod() {
};
/**
 * this is static get comment.
 * this is static set comment.
 */
MyClass.staticGetSet = null;
/**
 * this is only get 
 */
MyClass.staticOnlyGet = null;
/**
 * this is only set 
 */
MyClass.staticOnlySet = null;
/**
 * this is member method comment.
 * @param {string} p1
 * @param {string} p2
 * @return {number}
 */
MyClass.prototype.memberMethod = function memberMethod() {
};
/**
 * this is member get comment.
 * this is member set comment.
 */
MyClass.prototype.memberGetSet = null;
/**
 * this is only get
 */
MyClass.prototype.memberOnlyGet = null;
/**
 * this is only set
 */
MyClass.prototype.memberOnlySet = null;
/**
 * this is myFunction.
 */
function myFunction() {
}
/**
 * this is myVar.
 * @type {number}
 */
var myVar = 100;
/**
 * this is myMember.
 * @type {number}
 */
window.myMember = 100;
