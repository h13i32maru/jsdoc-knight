import foo from 'foo';

/**
 * this is myFunction.
 */
function myFunction(){}

// this is myFunction2
var myFunction2 = function(){};

class MyClass {

  // this is not jsdoc
  static get val(){}

  /** this is static val setter */
  static set val(v){}

  /** this is static val2 getter */
  static get val2(){}

  // this is not jsdoc.
  static set val2(v){}

  /**
   * this is val getter.
   */
  get val(){}

  set val(v){}

  /** this is first comment of getter */
  /** this is second comment of getter */
  get val2(){}

  /** this is first comment of setter */
  /** this is second comment of setter */
  set val2(v){}

  get val3(){}

  /** this is val3 setter */
  set val3(v){}

  constructor(){}

  method(){}

  // this is not jsdoc.
  method2(){}
}
