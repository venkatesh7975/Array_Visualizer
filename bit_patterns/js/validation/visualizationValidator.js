/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — COMPREHENSIVE VISUALIZATION VALIDATOR
   ========================================================================== */

if (typeof require !== "undefined") {
  PROBLEMS_DATA = require("../data/problems.js");
  BitEngine = require("../engine/bitOperations.js");
  ReferenceSolutions = require("./referenceSolutions.js");
}

const VisualizationValidator = {
  runAudit() {
    const results = {
      passed: 0,
      failed: 0,
      errors: []
    };

    const assert = (condition, msg) => {
      if (condition) {
        results.passed++;
      } else {
        results.failed++;
        results.errors.push(msg);
      }
    };

    // Test multiple sample inputs per problem
    const testInputs = {
      101: [0, 1, 2, 3, 7, 8, 11, 15, 16, 31, 255, 1024, 2147483647],
      102: [1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 16, 255],
      103: [[10, 7], [0, 0], [1, 1], [3, 4], [15, 0]],
      104: [0, 1, 2, 6, 7, 14, 15, 100],
      105: [1, 2, 3, 4, 5, 8, 16, 31, 32],
      106: [[4, 1, 2, 1, 2], [2, 2, 1], [0]],
      107: [[1, 2, 1, 3, 2, 5], [0, 1]],
      108: [0, 1, 2, 5, 10],
      109: [[1, 2, 3], [1]],
      110: [[5, 7], [0, 0], [0, 1], [8, 15], [26, 30]],
      111: [0, 1, 2, 5, 43261596, 2147483648, 4294967295]
    };

    Object.values(PROBLEMS_DATA).forEach(prob => {
      const inputs = testInputs[prob.id] || [prob.defaultInput];

      inputs.forEach(inputVal => {
        const steps = prob.generateSteps(inputVal);
        
        // 1. Check non-empty steps
        assert(steps && steps.length > 0, `LC #${prob.lcNum} (${prob.title}) input ${JSON.stringify(inputVal)}: Steps array must not be empty`);

        steps.forEach((step, idx) => {
          const stepPrefix = `LC #${prob.lcNum} (${prob.title}) Step ${idx + 1}/${steps.length}`;

          // 2. Validate Text Labels & UI Callouts
          assert(typeof step.action === "string" && step.action.length > 0, `${stepPrefix}: Action label must be a non-empty string`);
          assert(typeof step.explanation === "string" && step.explanation.length > 0, `${stepPrefix}: Explanation text must be a non-empty string`);
          assert(typeof step.formula === "string" && step.formula.length > 0, `${stepPrefix}: Formula callout must be a non-empty string`);

          // 3. Validate Primary Bit Array Representation
          if (step.bits) {
            assert(Array.isArray(step.bits), `${stepPrefix}: bits property must be an array`);
            assert(step.bits.length === 8 || step.bits.length === 16 || step.bits.length === 32, `${stepPrefix}: bits array length must be 8, 16, or 32 (got ${step.bits.length})`);
            assert(step.bits.every(b => b === 0 || b === 1), `${stepPrefix}: bits elements must be strictly 0 or 1`);

            if (step.decimalVal !== undefined) {
              let recDec = 0;
              const bitLen = step.bits.length;
              step.bits.forEach((b, bIdx) => {
                if (b === 1) recDec += Math.pow(2, bitLen - 1 - bIdx);
              });
              assert((recDec >>> 0) === (step.decimalVal >>> 0), `${stepPrefix}: decimalVal ${step.decimalVal} does not match bits array sum ${recDec}`);
            }
          }

          // 4. Validate Auxiliary Bit Array (Secondary Container)
          if (step.auxBits) {
            assert(Array.isArray(step.auxBits), `${stepPrefix}: auxBits property must be an array`);
            assert(step.auxBits.every(b => b === 0 || b === 1), `${stepPrefix}: auxBits elements must be strictly 0 or 1`);
            
            if (step.auxDec !== undefined) {
              let auxDecSum = 0;
              const bitLen = step.auxBits.length;
              step.auxBits.forEach((b, bIdx) => {
                if (b === 1) auxDecSum += Math.pow(2, bitLen - 1 - bIdx);
              });
              assert((auxDecSum >>> 0) === (step.auxDec >>> 0), `${stepPrefix}: auxDec ${step.auxDec} does not match auxBits array sum ${auxDecSum}`);
            }
          }

          // 5. Validate Specialized Visualization Cards
          if (step.type === "kernighan") {
            assert(step.n !== undefined && step.nMinus1 !== undefined && step.result !== undefined, `${stepPrefix}: Kernighan card missing n, nMinus1, or result`);
            assert(((step.n & step.nMinus1) >>> 0) === (step.result >>> 0), `${stepPrefix}: Kernighan step bitwise AND mismatch: ${step.n} & ${step.nMinus1} != ${step.result}`);
            assert(step.nMinus1 === step.n - 1, `${stepPrefix}: Kernighan nMinus1 property mismatch: expected ${step.n - 1}, got ${step.nMinus1}`);
          } else if (step.type === "maskOverlay") {
            assert(step.numA !== undefined && step.numB !== undefined && step.resultNum !== undefined, `${stepPrefix}: Mask overlay card missing numA, numB, or resultNum`);
            if (step.opSymbol && step.opSymbol.includes("^")) {
              assert(((step.numA ^ step.numB) >>> 0) === (step.resultNum >>> 0), `${stepPrefix}: Mask overlay XOR mismatch: ${step.numA} ^ ${step.numB} != ${step.resultNum}`);
            }
          } else if (step.type === "xorTrace") {
            assert(step.prevXor !== undefined && step.numberAdded !== undefined && step.currentXor !== undefined, `${stepPrefix}: XOR trace card missing prevXor, numberAdded, or currentXor`);
            assert(((step.prevXor ^ step.numberAdded) >>> 0) === (step.currentXor >>> 0), `${stepPrefix}: XOR trace mismatch: ${step.prevXor} ^ ${step.numberAdded} != ${step.currentXor}`);
          } else if (step.type === "subsets") {
            assert(step.mask !== undefined && Array.isArray(step.subset), `${stepPrefix}: Subsets card missing mask or subset array`);
          }

          // 6. Validate Code Line Mapping across Python, JavaScript, Java, C++
          if (step.codeLine !== undefined && prob.code) {
            ["python", "javascript", "java", "cpp"].forEach(lang => {
              if (prob.code[lang]) {
                const lineVal = typeof step.codeLine === "object" && step.codeLine !== null ? (step.codeLine[lang] || step.codeLine.python) : step.codeLine;
                const maxLines = prob.code[lang].length;
                assert(lineVal >= 1 && lineVal <= maxLines, `${stepPrefix} [${lang}]: codeLine ${lineVal} out of bounds (1..${maxLines})`);
              }
            });
          }

          // 7. Validate Live Variables Object
          if (step.variables) {
            assert(typeof step.variables === "object", `${stepPrefix}: step.variables must be an object`);
          }
        });

        // 8. Validate Final Visualization State matches Reference Output
        const finalStep = steps[steps.length - 1];
        if (prob.lcNum === 191) {
          const expected = ReferenceSolutions.hammingWeight(inputVal);
          assert(finalStep.variables.count === expected, `LC #191 Final step count ${finalStep.variables.count} != reference output ${expected}`);
        } else if (prob.lcNum === 476) {
          const expected = ReferenceSolutions.findComplement(inputVal);
          assert(finalStep.variables.complement === expected, `LC #476 Final step complement ${finalStep.variables.complement} != reference output ${expected}`);
        } else if (prob.lcNum === 2220) {
          const start = Array.isArray(inputVal) ? inputVal[0] : 10;
          const goal = Array.isArray(inputVal) ? inputVal[1] : 7;
          const expected = ReferenceSolutions.minBitFlips(start, goal);
          assert(finalStep.variables.bitFlipsCount === expected, `LC #2220 Final step bitFlipsCount ${finalStep.variables.bitFlipsCount} != reference output ${expected}`);
        } else if (prob.lcNum === 201) {
          const left = Array.isArray(inputVal) ? inputVal[0] : 5;
          const right = Array.isArray(inputVal) ? inputVal[1] : 7;
          const expected = ReferenceSolutions.rangeBitwiseAnd(left, right);
          assert(finalStep.variables.result === expected, `LC #201 Final step result ${finalStep.variables.result} != reference output ${expected}`);
        } else if (prob.lcNum === 190) {
          const expected = ReferenceSolutions.reverseBits(inputVal);
          assert(finalStep.variables.result === expected, `LC #190 Final step result ${finalStep.variables.result} != reference output ${expected}`);
        }
      });
    });

    return results;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = VisualizationValidator;
}
