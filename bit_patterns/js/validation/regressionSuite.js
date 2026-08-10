/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — PERMANENT REGRESSION SUITE
   ========================================================================== */

if (typeof require !== "undefined") {
  ReferenceSolutions = require("./referenceSolutions.js");
  PROBLEMS_DATA = require("../data/problems.js");
}

const RegressionSuite = {
  runAudit() {
    const results = {
      passed: 0,
      failed: 0,
      errors: []
    };

    const assertEqual = (testName, expected, actual) => {
      const match = JSON.stringify(expected) === JSON.stringify(actual);
      if (match) {
        results.passed++;
      } else {
        results.failed++;
        results.errors.push(`Regression Test '${testName}' FAILED. Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`);
      }
    };

    // Regression Test 1: LC #476 n=1 (Significant bits only)
    const complement1 = ReferenceSolutions.findComplement(1);
    assertEqual("LC #476 n=1 must return 0", 0, complement1);

    // Regression Test 2: LC #476 n=2 (10 -> 1)
    const complement2 = ReferenceSolutions.findComplement(2);
    assertEqual("LC #476 n=2 must return 1", 1, complement2);

    // Regression Test 3: LC #476 n=10 (1010 -> 0101 = 5)
    const complement10 = ReferenceSolutions.findComplement(10);
    assertEqual("LC #476 n=10 must return 5", 5, complement10);

    // Regression Test 4: LC #2220 start===goal (0 bit flips)
    const steps2220 = PROBLEMS_DATA[103].generateSteps([5, 5]);
    const final2220 = steps2220[steps2220.length - 1];
    assertEqual("LC #2220 start=5, goal=5 must return 0 bit flips", 0, final2220.variables.bitFlipsCount);

    // Regression Test 5: LC #190 reverseBits 32-bit width for n=1
    const rev1 = ReferenceSolutions.reverseBits(1);
    assertEqual("LC #190 n=1 must return 2147483648 (1000...0)", 2147483648, rev1);

    // Regression Test 6: LC #191 code-line synchronization
    const steps191 = PROBLEMS_DATA[101].generateSteps(11);
    assertEqual("LC #191 initial step codeLine", 2, typeof steps191[0].codeLine === "object" ? steps191[0].codeLine.python : steps191[0].codeLine);

    // Regression Test 7: LC #201 Range AND for [5, 7]
    const rangeAnd57 = ReferenceSolutions.rangeBitwiseAnd(5, 7);
    assertEqual("LC #201 [5, 7] must return 4", 4, rangeAnd57);

    // Regression Test 8: LC #201 Range AND for [0, 0] and [0, 1]
    assertEqual("LC #201 [0, 0] must return 0", 0, ReferenceSolutions.rangeBitwiseAnd(0, 0));
    assertEqual("LC #201 [0, 1] must return 0", 0, ReferenceSolutions.rangeBitwiseAnd(0, 1));
    assertEqual("LC #201 [8, 15] must return 8", 8, ReferenceSolutions.rangeBitwiseAnd(8, 15));

    // Regression Test 9: LC #260 Single Number III for [1, 2, 1, 3, 2, 5]
    const single3 = ReferenceSolutions.singleNumberIII([1, 2, 1, 3, 2, 5]);
    assertEqual("LC #260 [1, 2, 1, 3, 2, 5] must return [3, 5]", [3, 5], single3);

    return results;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = RegressionSuite;
}
