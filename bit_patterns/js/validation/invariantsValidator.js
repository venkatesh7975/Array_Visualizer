/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — MATHEMATICAL INVARIANTS VALIDATOR
   ========================================================================== */

if (typeof require !== "undefined") {
  BitEngine = require("../engine/bitOperations.js");
  ReferenceSolutions = require("./referenceSolutions.js");
}

const InvariantsValidator = {
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

    // 1. Bitwise Identity & Inverse Invariants (1,000 Random Unsigned Ints)
    // Note: In JS, bitwise ops return signed 32-bit. Coerce with >>> 0 for unsigned 32-bit equality.
    for (let i = 0; i < 1000; i++) {
      const a = Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;
      const b = Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;

      // Identity & Cancellation
      assert(((a ^ a) >>> 0) === 0, `XOR Self Cancellation failed for ${a}`);
      assert(((a ^ 0) >>> 0) === a, `XOR Identity failed for ${a}`);
      assert(((((a ^ b) >>> 0) ^ b) >>> 0) === a, `XOR Double Cancel failed for ${a}, ${b}`);
      assert(((a & 0) >>> 0) === 0, `AND Zero failed for ${a}`);
      assert(((a | 0) >>> 0) === a, `OR Zero failed for ${a}`);
      assert(((a & a) >>> 0) === a, `AND Self failed for ${a}`);
      assert(((a | a) >>> 0) === a, `OR Self failed for ${a}`);

      // Commutativity
      assert(((a ^ b) >>> 0) === ((b ^ a) >>> 0), `XOR Commutativity failed for ${a}, ${b}`);
      assert(((a & b) >>> 0) === ((b & a) >>> 0), `AND Commutativity failed for ${a}, ${b}`);
      assert(((a | b) >>> 0) === ((b | a) >>> 0), `OR Commutativity failed for ${a}, ${b}`);
    }

    // 2. Kernighan Popcount Invariant: popcount(n & (n - 1)) === popcount(n) - 1 for n > 0
    const testKernighan = [1, 2, 3, 5, 7, 8, 11, 14, 15, 16, 31, 32, 255, 1024, 65535, 2147483647];
    testKernighan.forEach(n => {
      const popCountN = ReferenceSolutions.hammingWeight(n);
      const kRes = (n & (n - 1)) >>> 0;
      const popCountK = ReferenceSolutions.hammingWeight(kRes);
      assert(popCountK === popCountN - 1, `Kernighan invariant failed for n=${n}: popcount(n)=${popCountN}, popcount(n&(n-1))=${popCountK}`);
    });

    // 3. Reverse Bits 32-Bit Invariant: reverse32(reverse32(n)) === n (unsigned 32-bit)
    const testReverse = [0, 1, 2, 3, 4, 5, 7, 8, 15, 16, 255, 65535, 2147483647, 2147483648, 4294967295];
    testReverse.forEach(n => {
      const rev1 = ReferenceSolutions.reverseBits(n);
      const rev2 = ReferenceSolutions.reverseBits(rev1);
      assert(rev2 === (n >>> 0), `Reverse bits 32-bit invariant failed for n=${n}: got ${rev2}`);
    });

    // 4. Number Complement Invariant: complement(complement(n)) === n (within significant width)
    const testComplement = [1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 16, 255, 1023];
    testComplement.forEach(n => {
      const comp1 = ReferenceSolutions.findComplement(n);
      const comp2 = ReferenceSolutions.findComplement(comp1);
      if (comp1 > 0) {
        const bitLenN = n.toString(2).length;
        const bitLenC1 = comp1.toString(2).length;
        if (bitLenN === bitLenC1) {
          assert(comp2 === n, `Complement double invariant failed for n=${n}: comp1=${comp1}, comp2=${comp2}`);
        }
      }
    });

    return results;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = InvariantsValidator;
}
