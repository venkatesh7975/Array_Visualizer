/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — DIFFERENTIAL OUTPUT VALIDATOR
   ========================================================================== */

if (typeof require !== "undefined") {
  ReferenceSolutions = require("./referenceSolutions.js");
  PROBLEMS_DATA = require("../data/problems.js");
}

const OutputValidator = {
  runAudit() {
    const results = {
      passed: 0,
      failed: 0,
      errors: [],
      problemResults: {}
    };

    const assertEqual = (probId, probTitle, testCaseLabel, expected, actual) => {
      const match = JSON.stringify(expected) === JSON.stringify(actual);
      if (match) {
        results.passed++;
      } else {
        results.failed++;
        const err = `[LC #${PROBLEMS_DATA[probId]?.lcNum} ${probTitle}] Test '${testCaseLabel}' FAILED. Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`;
        results.errors.push(err);
        if (!results.problemResults[probId]) results.problemResults[probId] = [];
        results.problemResults[probId].push(err);
      }
    };

    // 1. LC 191: Number of 1 Bits
    const testCases191 = [0, 1, 2, 3, 7, 8, 11, 15, 16, 31, 32, 255, 1024, 2147483647];
    testCases191.forEach(val => {
      const ref = ReferenceSolutions.hammingWeight(val);
      const steps = PROBLEMS_DATA[101].generateSteps(val);
      const finalStep = steps[steps.length - 1];
      const actualVis = finalStep.variables.count;
      assertEqual(101, "Number of 1 Bits", `n=${val}`, ref, actualVis);
    });

    // 2. LC 190 / 476: Number Complement (102)
    const testCases476 = [1, 2, 5, 7, 8, 10, 15, 16, 31, 32, 255];
    testCases476.forEach(val => {
      const ref = ReferenceSolutions.findComplement(val);
      const steps = PROBLEMS_DATA[102].generateSteps(val);
      const finalStep = steps[steps.length - 1];
      const actualVis = finalStep.variables.complement;
      assertEqual(102, "Number Complement", `n=${val}`, ref, actualVis);
    });

    // 3. LC 2220: Minimum Bit Flips (103)
    const testCases2220 = [
      [10, 7], [3, 4], [0, 0], [1, 1], [0, 15], [255, 0], [7, 10]
    ];
    testCases2220.forEach(([start, goal]) => {
      const ref = ReferenceSolutions.minBitFlips(start, goal);
      const steps = PROBLEMS_DATA[103].generateSteps([start, goal]);
      const finalStep = steps[steps.length - 1];
      const actualVis = finalStep.variables.bitFlipsCount;
      assertEqual(103, "Min Bit Flips", `start=${start}, goal=${goal}`, ref, actualVis);
    });

    // 4. LC 1342: Number of Steps to Reduce to Zero (104)
    const testCases1342 = [0, 1, 2, 7, 8, 14, 15, 16, 123];
    testCases1342.forEach(val => {
      const ref = ReferenceSolutions.numberOfSteps(val);
      const steps = PROBLEMS_DATA[104].generateSteps(val);
      const finalStep = steps[steps.length - 1];
      const actualVis = finalStep.variables.steps;
      assertEqual(104, "Steps to Reduce to Zero", `n=${val}`, ref, actualVis);
    });

    // 5. LC 231: Power of Two (105)
    const testCases231 = [0, 1, 2, 3, 4, 5, 8, 16, 31, 32, 64, -1, -2, -16];
    testCases231.forEach(val => {
      const ref = ReferenceSolutions.isPowerOfTwo(val);
      const steps = PROBLEMS_DATA[105].generateSteps(val);
      const finalStep = steps[steps.length - 1];
      const actualVis = finalStep.variables.isPowerOfTwo;
      assertEqual(105, "Power of Two", `n=${val}`, ref, actualVis);
    });

    // 6. LC 136: Single Number (106)
    const testCases136 = [
      [2, 2, 1],
      [4, 1, 2, 1, 2],
      [1],
      [7, 3, 5, 3, 7]
    ];
    testCases136.forEach(arr => {
      const ref = ReferenceSolutions.singleNumber(arr);
      const steps = PROBLEMS_DATA[106].generateSteps(arr);
      const finalStep = steps[steps.length - 1];
      const actualVis = finalStep.variables.accumulatorXor;
      assertEqual(106, "Single Number", `nums=[${arr.join(",")}]`, ref, actualVis);
    });

    // 7. LC 260: Single Number III (107)
    const testCases260 = [
      [1, 2, 1, 3, 2, 5],
      [0, 1],
      [-1, 0]
    ];
    testCases260.forEach(arr => {
      const ref = ReferenceSolutions.singleNumberIII(arr);
      const steps = PROBLEMS_DATA[107].generateSteps(arr);
      const finalStep = steps[steps.length - 1];
      const actualVis = [finalStep.variables.groupA, finalStep.variables.groupB].sort((a, b) => a - b);
      assertEqual(107, "Single Number III", `nums=[${arr.join(",")}]`, ref, actualVis);
    });

    // 8. LC 338: Counting Bits (108)
    const testCases338 = [0, 1, 2, 5, 8];
    testCases338.forEach(val => {
      const ref = ReferenceSolutions.countBits(val);
      const steps = PROBLEMS_DATA[108].generateSteps(val);
      const actualVis = steps.filter(s => s.variables && s.variables["ans[i]"] !== undefined).map(s => s.variables["ans[i]"]);
      actualVis.unshift(0); // ans[0] = 0
      assertEqual(108, "Counting Bits", `n=${val}`, ref, actualVis);
    });

    // 9. LC 78: Subsets (109)
    const testCases78 = [
      [1, 2, 3],
      [0],
      [1, 2]
    ];
    testCases78.forEach(arr => {
      const ref = ReferenceSolutions.subsets(arr);
      const steps = PROBLEMS_DATA[109].generateSteps(arr);
      const actualVisCount = steps.length;
      assertEqual(109, "Subsets Count", `nums=[${arr.join(",")}]`, ref.length, actualVisCount);
    });

    // 10. LC 201: Bitwise AND of Numbers Range (110)
    const testCases201 = [
      [5, 7], [0, 0], [1, 2147483647], [10, 11]
    ];
    testCases201.forEach(([left, right]) => {
      const ref = ReferenceSolutions.rangeBitwiseAnd(left, right);
      const steps = PROBLEMS_DATA[110].generateSteps([left, right]);
      const finalStep = steps[steps.length - 1];
      const actualVis = finalStep.variables.result;
      assertEqual(110, "Range Bitwise AND", `left=${left}, right=${right}`, ref, actualVis);
    });

    return results;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = OutputValidator;
}
