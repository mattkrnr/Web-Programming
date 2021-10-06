const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

//Mean 1
try {
    // Should Pass
    console.log(arrayUtils.mean([2, 3, 4]));
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    arrayUtils.mean([1234,"hello"]);
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }

 //MedianSquared 2
try {
    // Should Pass
    console.log(arrayUtils.medianSquared([2, 1, 4]));
    console.log('medianSquared passed successfully');
 } catch (e) {
    console.error('medianSquared failed test case');
 }
 try {
    // Should Fail
    arrayUtils.medianSquared([1234,"hello"]);
    console.error('medianSquared did not error');
 } catch (e) {
    console.log('medianSquared failed successfully');
 }

 //MaxElement 3
try {
    // Should Pass
    console.log(arrayUtils.maxElement([2, 4, 1]));
    console.log('maxElement passed successfully');
 } catch (e) {
    console.error('maxElement failed test case');
 }
 try {
    // Should Fail
    arrayUtils.maxElement([1234,"hello"]);
    console.error('maxElement did not error');
 } catch (e) {
    console.log('maxElement failed successfully');
 }

 //Fill 4
try {
    // Should Pass
    console.log(arrayUtils.fill(3,'Welcome'));
    console.log('fill passed successfully');
 } catch (e) {
    console.error('fill failed test case');
 }
 try {
    // Should Fail
    arrayUtils.fill(-1);
    console.error('fill did not error');
 } catch (e) {
    console.log('fill failed successfully');
 }

 //CountRepeating 5
try {
    // Should Pass
    console.log(arrayUtils.countRepeating([7, '7', 13, "Hello","Hello", "hello"]));
    console.log('countRepeating passed successfully');
 } catch (e) {
    console.error('countRepeating failed test case');
 }
 try {
    // Should Fail
    arrayUtils.countRepeating([7, '7', 13, true, null]);
    console.error('countRepeating did not error');
 } catch (e) {
    console.log('countRepeating failed successfully');
 }

 //IsEqual 6
try {
    // Should Pass
    console.log(arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]]));
    console.log('isEqual passed successfully');
 } catch (e) {
    console.error('isEqual failed test case');
 }
 try {
    // Should Fail
    arrayUtils.isEqual();
    console.error('isEqual did not error');
 } catch (e) {
    console.log('isEqual failed successfully');
 }

 //camelCase 7
try {
   // Should Pass
   console.log(stringUtils.camelCase("How now brown cow"));
   console.log('camelCase passed successfully');
} catch (e) {
   console.error('camelCase failed test case');
}
try {
   // Should Fail
   stringUtils.camelCase('   ');
   console.error('camelCase did not error');
} catch (e) {
   console.log('camelCase failed successfully');
}

//replaceChar 8
try {
   // Should Pass
   console.log(stringUtils.replaceChar("Da*$y"));
   console.log('replaceChar passed successfully');
} catch (e) {
   console.error('replaceChar failed test case');
}
try {
   // Should Fail
   stringUtils.replaceChar('   ');
   console.error('replaceChar did not error');
} catch (e) {
   console.log('replaceChar failed successfully');
}

//mashUp 9
try {
   // Should Pass
   console.log(stringUtils.mashUp("hello", "world"));
   console.log('mashUp passed successfully');
} catch (e) {
   console.error('mashUp failed test case');
}
try {
   // Should Fail
   stringUtils.mashUp('What','');
   console.error('mashUp did not error');
} catch (e) {
   console.log('mashUp failed successfully');
}

//makeArrays 10
try {
   // Should Pass
   const first = { x: 2, y: 3};
   const second = { a: 70, x: 4, z: 5 };
   const third = { x: 0, y: 9, q: 10 };
   console.log(objUtils.makeArrays([first, second, third]));
   console.log('makeArrays passed successfully');
} catch (e) {
   console.error(e);
   console.error('makeArrays failed test case');
}
try {
   // Should Fail
   objUtils.makeArrays({});
   console.error('makeArrays did not error');
} catch (e) {
   console.log('makeArrays failed successfully');
}

//isDeepEqual 11
try {
   // Should Pass
   const first = {a: 2, b: 3};
   const second = {a: 2, b: 4};
   const fourth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
   const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
   console.log(objUtils.isDeepEqual(first,second));
   console.log('isDeepEqual passed successfully');
} catch (e) {
   console.error(e);
   console.error('isDeepEqual failed test case');
}
try {
   // Should Fail
   objUtils.isDeepEqual({});
   console.error('isDeepEqual did not error');
} catch (e) {
   console.log('isDeepEqual failed successfully');
}

//computeObject 12
try {
   // Should Pass
   console.log(objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));
   console.log('computeObject passed successfully');
} catch (e) {
   console.error(e);
   console.error('computeObject failed test case');
}
try {
   // Should Fail
   objUtils.computeObject({});
   console.error('computeObject did not error');
} catch (e) {
   console.log('computeObject failed successfully');
}