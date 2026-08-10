/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — LANGUAGE SEMANTICS VALIDATOR
   ========================================================================== */

const LanguageSemanticsValidator = {
  runAudit() {
    const results = {
      passed: 0,
      failed: 0,
      errors: [],
      matrix: [
        { operation: "Integer Width", python: "Arbitrary precision", js: "Signed 32-bit (bitwise ops)", java: "Signed 32-bit (int)", cpp: "32-bit (uint32_t / int)" },
        { operation: "Signed Bitwise NOT (~x)", python: "-(x + 1) [infinite bits]", js: "-(x + 1) [signed 32-bit]", java: "-(x + 1) [signed 32-bit]", cpp: "-(x + 1) [signed 32-bit]" },
        { operation: "Right Shift (>>)", python: "Arithmetic right shift", js: "Signed 32-bit right shift", java: "Signed 32-bit right shift", cpp: "Arithmetic / Implementation defined" },
        { operation: "Unsigned Shift (>>>)", python: "N/A (mask with 0xFFFFFFFF)", js: "Unsigned 32-bit right shift", java: "Unsigned 32-bit right shift", cpp: "N/A (use uint32_t >>)" },
        { operation: "Overflow Behavior", python: "Auto-promotes to BigInt", js: "Wraps around 32-bit", java: "Wraps around 32-bit", cpp: "UB if signed overflow" }
      ]
    };

    const assert = (condition, msg) => {
      if (condition) {
        results.passed++;
      } else {
        results.failed++;
        results.errors.push(msg);
      }
    };

    // 1. JS Unsigned 32-bit Shift (>>> 0) Test
    assert(((-1) >>> 0) === 4294967295, "JS >>> 0 on -1 must equal 4294967295");
    assert(((2147483648) >>> 0) === 2147483648, "JS >>> 0 on 2147483648 must equal 2147483648");

    // 2. JS Bitwise NOT (~) Signed 32-bit Test
    assert((~0) === -1, "~0 in JS must equal -1");
    assert((~1) === -2, "~1 in JS must equal -2");
    assert((~5) === -6, "~5 in JS must equal -6");
    assert((~2147483647) === -2147483648, "~2147483647 in JS must equal -2147483648");

    // 3. Python ~ Simulation Test in 32-bit Mask Context
    // Python ~x = -(x + 1). In 32-bit mask: (~x) & 0xFFFFFFFF
    const pythonNotSim = (x) => (~x) >>> 0;
    assert(pythonNotSim(0) === 4294967295, "Python ~0 masked 32-bit must equal 4294967295");
    assert(pythonNotSim(5) === 4294967290, "Python ~5 masked 32-bit must equal 4294967290");

    return results;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = LanguageSemanticsValidator;
}
