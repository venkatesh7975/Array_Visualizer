/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — VISUALIZATION VALIDATOR
   ========================================================================== */

if (typeof require !== "undefined") {
  PROBLEMS_DATA = require("../data/problems.js");
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

    Object.values(PROBLEMS_DATA).forEach(prob => {
      const steps = prob.generateSteps(prob.defaultInput);
      
      // 1. Check non-empty steps
      assert(steps && steps.length > 0, `LC #${prob.lcNum} (${prob.title}): Steps array must not be empty`);

      steps.forEach((step, idx) => {
        // 2. Validate Step Structure
        assert(step.action && step.explanation, `LC #${prob.lcNum} Step ${idx + 1}: Missing action or explanation text`);

        // 3. Validate Binary Bits Consistency
        if (step.bits) {
          assert(Array.isArray(step.bits), `LC #${prob.lcNum} Step ${idx + 1}: bits must be an array`);
          assert(step.bits.every(b => b === 0 || b === 1), `LC #${prob.lcNum} Step ${idx + 1}: bits element must be 0 or 1`);
        }

        // 4. Validate Code Line Index
        if (step.codeLine !== undefined && prob.code && prob.code.python) {
          const lineVal = typeof step.codeLine === "object" && step.codeLine !== null ? step.codeLine.python : step.codeLine;
          const maxLines = prob.code.python.length;
          assert(lineVal >= 1 && lineVal <= maxLines, `LC #${prob.lcNum} Step ${idx + 1}: codeLine ${lineVal} out of bounds (1..${maxLines})`);
        }

        // 5. Validate Variable Consistency (Decimal vs Binary string matching)
        if (step.decimalVal !== undefined && step.bits) {
          let recDec = 0;
          const bitLen = step.bits.length;
          step.bits.forEach((b, bIdx) => {
            if (b === 1) recDec += Math.pow(2, bitLen - 1 - bIdx);
          });
          assert(recDec === step.decimalVal, `LC #${prob.lcNum} Step ${idx + 1}: decimalVal ${step.decimalVal} does not match bits array sum ${recDec}`);
        }
      });
    });

    return results;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = VisualizationValidator;
}
