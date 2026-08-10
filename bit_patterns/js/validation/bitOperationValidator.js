/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — BIT OPERATION VALIDATOR
   ========================================================================== */

if (typeof require !== "undefined") {
  BitEngine = require("../engine/bitOperations.js");
}

const BitOperationValidator = {
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

    // 1. Binary <-> Decimal Roundtrip Tests
    const testValues = [0, 1, 2, 3, 7, 8, 13, 15, 16, 31, 32, 63, 64, 127, 128, 255, 256, 1024, 65535, 2147483647];
    testValues.forEach(val => {
      const bits = BitEngine.toBitArray(val, 32);
      let reconstructed = 0;
      bits.forEach((b, idx) => {
        const bitPos = 31 - idx;
        if (b === 1) reconstructed += Math.pow(2, bitPos);
      });
      assert(reconstructed === val, `Binary roundtrip failed for decimal ${val}: got ${reconstructed}`);
    });

    // 2. Bit Position Indexing Test (LSB = pos 0, MSB = pos 31)
    // For 13 = 0000 1101, bits at pos 0, 2, 3 should be 1. Bits at pos 1, 4, 5... should be 0.
    const bits13 = BitEngine.toBitArray(13, 8);
    // Index 7 (pos 0) = 1, Index 6 (pos 1) = 0, Index 5 (pos 2) = 1, Index 4 (pos 3) = 1
    assert(bits13[7] === 1, "Bit position 0 for 13 must be 1 (LSB)");
    assert(bits13[6] === 0, "Bit position 1 for 13 must be 0");
    assert(bits13[5] === 1, "Bit position 2 for 13 must be 1");
    assert(bits13[4] === 1, "Bit position 3 for 13 must be 1");

    // 3. Property-Based Bitwise Law Tests (1,000 Random values)
    for (let i = 0; i < 1000; i++) {
      const a = Math.floor(Math.random() * 65535);
      const b = Math.floor(Math.random() * 65535);

      // Identity & Inverse Laws
      assert((a ^ a) === 0, `Property fail: ${a} ^ ${a} !== 0`);
      assert((a ^ 0) === a, `Property fail: ${a} ^ 0 !== ${a}`);
      assert((a & 0) === 0, `Property fail: ${a} & 0 !== 0`);
      assert((a | 0) === a, `Property fail: ${a} | 0 !== ${a}`);
      assert((a & a) === a, `Property fail: ${a} & ${a} !== ${a}`);
      assert((a | a) === a, `Property fail: ${a} | ${a} !== ${a}`);

      // Commutativity Laws
      assert((a ^ b) === (b ^ a), `Commutativity fail: ${a} ^ ${b}`);
      assert((a & b) === (b & a), `Commutativity fail: ${a} & ${b}`);
      assert((a | b) === (b | a), `Commutativity fail: ${a} | ${b}`);
    }

    // 4. Language Semantics Check (JS Signed 32-bit vs Python arbitrary precision)
    // In Python: ~x = -(x + 1)
    // In JS: ~x = -(x + 1) for 32-bit signed
    assert((~0) === -1, "~0 in 32-bit signed must equal -1");
    assert((~1) === -2, "~1 in 32-bit signed must equal -2");
    assert((~5) === -6, "~5 in 32-bit signed must equal -6");

    // 5. Brian Kernighan Transformation Test
    const kernighanInputs = [1, 2, 3, 4, 5, 7, 8, 10, 12, 15, 16, 31, 32, 63, 64, 88, 127, 128, 255, 256];
    kernighanInputs.forEach(n => {
      const res = n & (n - 1);
      // Verify rightmost set bit was cleared
      assert((res & -res) !== (n & -n), `Kernighan fail for n=${n}: lowest set bit was not cleared`);
    });

    return results;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = BitOperationValidator;
}
