/* ==========================================================================
   BIT MANIPULATION ENGINE — SOURCE OF TRUTH MATHEMATICAL OPERATIONS
   ========================================================================== */

const BitEngine = {
  /**
   * Converts a number to an array of bit values [b31, b30, ..., b0] or specified bitLength.
   * Handles negative numbers using unsigned 32-bit integer representation (2's complement).
   */
  toBitArray(num, bitLength = 32) {
    const unsignedNum = num >>> 0;
    const bits = [];
    for (let i = bitLength - 1; i >= 0; i--) {
      bits.push((unsignedNum >>> i) & 1);
    }
    return bits;
  },

  /**
   * Formats a bit array into a binary string with spaces every 4 bits for readability.
   */
  toBinaryString(num, bitLength = 32, formatted = false) {
    const bits = this.toBitArray(num, bitLength);
    if (!formatted) return bits.join("");
    
    // Group into 4-bit nibbles
    const nibbles = [];
    for (let i = 0; i < bits.length; i += 4) {
      nibbles.push(bits.slice(i, i + 4).join(""));
    }
    return nibbles.join(" ");
  },

  /**
   * Returns Hexadecimal representation (e.g. 0x0D or 0x0000000D)
   */
  toHexString(num, bitLength = 32) {
    const unsignedNum = num >>> 0;
    const hexDigits = Math.ceil(bitLength / 4);
    return "0x" + unsignedNum.toString(16).toUpperCase().padStart(hexDigits, "0");
  },

  /**
   * Truncates number to specified bitLength (e.g., 8-bit, 16-bit, 32-bit)
   */
  clampToBits(num, bitLength = 32) {
    if (bitLength === 8) return num & 0xFF;
    if (bitLength === 16) return num & 0xFFFF;
    return num >>> 0;
  },

  /* ------------------------------------------------------------------------
     1. BASIC BITWISE OPERATIONS (BIT-BY-BIT EVALUATION)
     ------------------------------------------------------------------------ */

  bitwiseAND(a, b, bitLength = 8) {
    const res = a & b;
    const bitsA = this.toBitArray(a, bitLength);
    const bitsB = this.toBitArray(b, bitLength);
    const bitsRes = this.toBitArray(res, bitLength);
    
    const pairEvals = [];
    for (let i = 0; i < bitLength; i++) {
      const bitPos = bitLength - 1 - i;
      pairEvals.push({
        position: bitPos,
        bitA: bitsA[i],
        bitB: bitsB[i],
        resultBit: bitsRes[i],
        expression: `${bitsA[i]} & ${bitsB[i]} = ${bitsRes[i]}`
      });
    }

    return {
      a, b, result: res,
      bitsA, bitsB, bitsRes,
      pairEvals,
      binaryA: this.toBinaryString(a, bitLength, true),
      binaryB: this.toBinaryString(b, bitLength, true),
      binaryRes: this.toBinaryString(res, bitLength, true)
    };
  },

  bitwiseOR(a, b, bitLength = 8) {
    const res = a | b;
    const bitsA = this.toBitArray(a, bitLength);
    const bitsB = this.toBitArray(b, bitLength);
    const bitsRes = this.toBitArray(res, bitLength);

    const pairEvals = [];
    for (let i = 0; i < bitLength; i++) {
      const bitPos = bitLength - 1 - i;
      pairEvals.push({
        position: bitPos,
        bitA: bitsA[i],
        bitB: bitsB[i],
        resultBit: bitsRes[i],
        expression: `${bitsA[i]} | ${bitsB[i]} = ${bitsRes[i]}`
      });
    }

    return {
      a, b, result: res,
      bitsA, bitsB, bitsRes,
      pairEvals,
      binaryA: this.toBinaryString(a, bitLength, true),
      binaryB: this.toBinaryString(b, bitLength, true),
      binaryRes: this.toBinaryString(res, bitLength, true)
    };
  },

  bitwiseXOR(a, b, bitLength = 8) {
    const res = a ^ b;
    const bitsA = this.toBitArray(a, bitLength);
    const bitsB = this.toBitArray(b, bitLength);
    const bitsRes = this.toBitArray(res, bitLength);

    const pairEvals = [];
    for (let i = 0; i < bitLength; i++) {
      const bitPos = bitLength - 1 - i;
      pairEvals.push({
        position: bitPos,
        bitA: bitsA[i],
        bitB: bitsB[i],
        resultBit: bitsRes[i],
        expression: `${bitsA[i]} ^ ${bitsB[i]} = ${bitsRes[i]} ${bitsA[i] === bitsB[i] ? "(cancels to 0)" : "(results in 1)"}`
      });
    }

    return {
      a, b, result: res,
      bitsA, bitsB, bitsRes,
      pairEvals,
      binaryA: this.toBinaryString(a, bitLength, true),
      binaryB: this.toBinaryString(b, bitLength, true),
      binaryRes: this.toBinaryString(res, bitLength, true)
    };
  },

  bitwiseNOT(a, bitLength = 8) {
    // For Python explanation: ~x = -(x + 1)
    const rawNot = ~a;
    const clampedNot = this.clampToBits(rawNot, bitLength);
    const bitsA = this.toBitArray(a, bitLength);
    const bitsRes = this.toBitArray(clampedNot, bitLength);

    const pairEvals = [];
    for (let i = 0; i < bitLength; i++) {
      const bitPos = bitLength - 1 - i;
      pairEvals.push({
        position: bitPos,
        bitA: bitsA[i],
        resultBit: bitsRes[i],
        expression: `~${bitsA[i]} = ${bitsRes[i]}`
      });
    }

    return {
      a, result: clampedNot, pythonValue: rawNot,
      bitsA, bitsRes,
      pairEvals,
      binaryA: this.toBinaryString(a, bitLength, true),
      binaryRes: this.toBinaryString(clampedNot, bitLength, true)
    };
  },

  leftShift(a, shift, bitLength = 8) {
    const res = this.clampToBits(a << shift, bitLength);
    const bitsA = this.toBitArray(a, bitLength);
    const bitsRes = this.toBitArray(res, bitLength);

    return {
      a, shift, result: res,
      bitsA, bitsRes,
      binaryA: this.toBinaryString(a, bitLength, true),
      binaryRes: this.toBinaryString(res, bitLength, true)
    };
  },

  rightShift(a, shift, bitLength = 8) {
    const res = a >> shift;
    const clampedRes = this.clampToBits(res, bitLength);
    const bitsA = this.toBitArray(a, bitLength);
    const bitsRes = this.toBitArray(clampedRes, bitLength);

    return {
      a, shift, result: clampedRes,
      bitsA, bitsRes,
      binaryA: this.toBinaryString(a, bitLength, true),
      binaryRes: this.toBinaryString(clampedRes, bitLength, true)
    };
  },

  /* ------------------------------------------------------------------------
     2. SINGLE BIT MANIPULATIONS (CHECK, SET, CLEAR, TOGGLE)
     ------------------------------------------------------------------------ */

  checkBit(n, pos) {
    const mask = 1 << pos;
    const isSet = ((n >> pos) & 1) === 1;
    return {
      n, pos, mask, isSet,
      binaryN: this.toBinaryString(n, 8, true),
      binaryMask: this.toBinaryString(mask, 8, true),
      expression: `(${n} >> ${pos}) & 1 = ${isSet ? 1 : 0}`
    };
  },

  setBit(n, pos, bitLength = 8) {
    const mask = 1 << pos;
    const res = n | mask;
    return {
      n, pos, mask, result: res,
      bitsN: this.toBitArray(n, bitLength),
      bitsMask: this.toBitArray(mask, bitLength),
      bitsRes: this.toBitArray(res, bitLength),
      binaryN: this.toBinaryString(n, bitLength, true),
      binaryMask: this.toBinaryString(mask, bitLength, true),
      binaryRes: this.toBinaryString(res, bitLength, true),
      expression: `${n} | (1 << ${pos}) = ${res}`
    };
  },

  clearBit(n, pos, bitLength = 8) {
    const mask = ~(1 << pos);
    const clampedMask = this.clampToBits(mask, bitLength);
    const res = n & clampedMask;
    return {
      n, pos, mask: clampedMask, result: res,
      bitsN: this.toBitArray(n, bitLength),
      bitsMask: this.toBitArray(clampedMask, bitLength),
      bitsRes: this.toBitArray(res, bitLength),
      binaryN: this.toBinaryString(n, bitLength, true),
      binaryMask: this.toBinaryString(clampedMask, bitLength, true),
      binaryRes: this.toBinaryString(res, bitLength, true),
      expression: `${n} & ~(1 << ${pos}) = ${res}`
    };
  },

  toggleBit(n, pos, bitLength = 8) {
    const mask = 1 << pos;
    const res = n ^ mask;
    return {
      n, pos, mask, result: res,
      bitsN: this.toBitArray(n, bitLength),
      bitsMask: this.toBitArray(mask, bitLength),
      bitsRes: this.toBitArray(res, bitLength),
      binaryN: this.toBinaryString(n, bitLength, true),
      binaryMask: this.toBinaryString(mask, bitLength, true),
      binaryRes: this.toBinaryString(res, bitLength, true),
      expression: `${n} ^ (1 << ${pos}) = ${res}`
    };
  },

  /* ------------------------------------------------------------------------
     3. BRIAN KERNIGHAN'S ALGORITHM ENGINE — n & (n - 1)
     ------------------------------------------------------------------------ */

  performKernighanStep(n, bitLength = 8) {
    if (n === 0) {
      return {
        n: 0, nMinus1: 0, result: 0, lowestSetBitPos: -1,
        bitsN: this.toBitArray(0, bitLength),
        bitsNMinus1: this.toBitArray(0, bitLength),
        bitsRes: this.toBitArray(0, bitLength)
      };
    }

    const nMinus1 = n - 1;
    const res = n & nMinus1;

    // Find position of the lowest set bit in n (which was cleared)
    let lowestSetBitPos = 0;
    for (let pos = 0; pos < bitLength; pos++) {
      if ((n & (1 << pos)) !== 0) {
        lowestSetBitPos = pos;
        break;
      }
    }

    return {
      n, nMinus1, result: res, lowestSetBitPos,
      bitsN: this.toBitArray(n, bitLength),
      bitsNMinus1: this.toBitArray(nMinus1, bitLength),
      bitsRes: this.toBitArray(res, bitLength),
      binaryN: this.toBinaryString(n, bitLength, true),
      binaryNMinus1: this.toBinaryString(nMinus1, bitLength, true),
      binaryRes: this.toBinaryString(res, bitLength, true)
    };
  },

  /* ------------------------------------------------------------------------
     4. XOR CANCELLATION TRACE GENERATOR
     ------------------------------------------------------------------------ */

  getXorTrace(numbers, bitLength = 8) {
    const steps = [];
    let currentXor = 0;

    steps.push({
      stepIndex: 0,
      numberAdded: null,
      currentXor: 0,
      binaryXor: this.toBinaryString(0, bitLength, true),
      explanation: "Initialize accumulator: currentXor = 0"
    });

    numbers.forEach((num, idx) => {
      const prevXor = currentXor;
      currentXor = currentXor ^ num;
      const xorEval = this.bitwiseXOR(prevXor, num, bitLength);

      steps.push({
        stepIndex: idx + 1,
        numberAdded: num,
        prevXor,
        currentXor,
        binaryPrev: this.toBinaryString(prevXor, bitLength, true),
        binaryNum: this.toBinaryString(num, bitLength, true),
        binaryXor: this.toBinaryString(currentXor, bitLength, true),
        pairEvals: xorEval.pairEvals,
        explanation: `Step ${idx + 1}: XOR with ${num} (${this.toBinaryString(num, bitLength, true)}). Result = ${currentXor}`
      });
    });

    return steps;
  },

  /* ------------------------------------------------------------------------
     5. REVERSE BITS TRACE GENERATOR (32-bit / 8-bit)
     ------------------------------------------------------------------------ */

  getReverseBitsTrace(n, bitLength = 32) {
    const steps = [];
    let input = n >>> 0;
    let result = 0;

    steps.push({
      stepIndex: 0,
      bitPos: -1,
      bitRead: null,
      currentInput: input,
      currentResult: result,
      binaryInput: this.toBinaryString(input, bitLength, true),
      binaryResult: this.toBinaryString(result, bitLength, true),
      explanation: `Initialize: Input = ${input}, Output = 0 (${this.toBinaryString(0, bitLength, true)})`
    });

    for (let i = 0; i < bitLength; i++) {
      const bitRead = input & 1;
      result = (result << 1) | bitRead;
      input = input >>> 1;

      steps.push({
        stepIndex: i + 1,
        bitPos: i,
        bitRead,
        currentInput: input,
        currentResult: result >>> 0,
        binaryInput: this.toBinaryString(input, bitLength, true),
        binaryResult: this.toBinaryString(result >>> 0, bitLength, true),
        explanation: `Step ${i + 1}/${bitLength}: Read LSB bit = ${bitRead}. Shift Output left and insert ${bitRead}. Shift Input right.`
      });
    }

    return steps;
  },

  /* ------------------------------------------------------------------------
     6. SUBSETS BITMASK TRACE GENERATOR
     ------------------------------------------------------------------------ */

  getSubsetsTrace(elements) {
    const n = elements.length;
    const totalSubsets = 1 << n;
    const steps = [];

    for (let mask = 0; mask < totalSubsets; mask++) {
      const subset = [];
      const bits = this.toBitArray(mask, n);

      for (let i = 0; i < n; i++) {
        // Checking if i-th bit is set
        if ((mask & (1 << i)) !== 0) {
          subset.push(elements[i]);
        }
      }

      steps.push({
        mask,
        maskBinary: bits.join(""),
        subset,
        explanation: `Mask ${mask} (${bits.join("")}): Selected elements [${subset.join(", ")}]`
      });
    }

    return steps;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = BitEngine;
}
