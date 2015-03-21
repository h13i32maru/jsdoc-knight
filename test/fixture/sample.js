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
 */
export default class MyClass extends MySuperClass {

  /**
   * this is static method comment.
   * @param {string} p1
   * @param {string} p2
   */
  static staticMethod(p1, p2){
    return 0;
  }

  /**
   * this is static get comment.
   */
  static get staticGetSet() {
    return 0;
  }

  /**
   * this is static set comment.
   */
  static set staticGetSet(v) {}

  /** this is only get */
  static get staticOnlyGet() {
    return 0;
  }

  /** this is only set */
  static set staticOnlySet(v) {}

  /**
   * this is constructor comment.
   * @param {string} p1
   * @param {string} p2
   * @example
   * var foo = 123;
   */
  constructor(p1, p2) {}

  /**
   * this is member method comment.
   * @param {string} p1
   * @param {string} p2
   * @return {number}
   */
  memberMethod(p1, p2) {
    return 0;
  }

  /**
   * this is member get comment.
   */
  get memberGetSet() {
    return 0;
  }

  /**
   * this is member set comment.
   */
  set memberGetSet(v) {}

  /**
   * this is only get
   */
  get memberOnlyGet(){}

  /**
   * this is only set
   */
  set memberOnlySet(v){}
}

/**
 * this is myFunction.
 */
export function myFunction({p1 = true} = {p1: 100}){}

/**
 * this is myVar.
 * @type {number}
 */
export var myVar = 100;

/**
 * this is myMember.
 * @type {number}
 */
window.myMember = 100;
