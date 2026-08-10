/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — TRUSTED REFERENCE IMPLEMENTATIONS
   ========================================================================== */

const ReferenceSolutions = {
  /**
   * LC 191: Number of 1 Bits
   * Naive reference: Convert unsigned 32-bit to binary string, count '1' characters.
   */
  hammingWeight(n) {
    if (n < 0 || n > 0xFFFFFFFF) return null;
    const binStr = (n >>> 0).toString(2);
    let count = 0;
    for (let char of binStr) {
      if (char === '1') count++;
    }
    return count;
  },

  /**
   * LC 190: Reverse Bits
   * Naive reference: Pad to 32 bits, reverse string, parse back as unsigned 32-bit integer.
   */
  reverseBits(n) {
    const binStr = (n >>> 0).toString(2).padStart(32, '0');
    const reversed = binStr.split('').reverse().join('');
    return parseInt(reversed, 2) >>> 0;
  },

  /**
   * LC 476: Number Complement
   * Naive reference: Convert to binary string, flip '0' to '1' and '1' to '0', parse integer.
   */
  findComplement(num) {
    if (num <= 0) return null;
    const binStr = num.toString(2);
    const flipped = binStr.split('').map(c => c === '0' ? '1' : '0').join('');
    return parseInt(flipped, 2);
  },

  /**
   * LC 2220: Minimum Bit Flips to Convert Number
   * Naive reference: Convert both to binary strings, compare bit by bit.
   */
  minBitFlips(start, goal) {
    const strStart = (start >>> 0).toString(2).padStart(32, '0');
    const strGoal = (goal >>> 0).toString(2).padStart(32, '0');
    let diffCount = 0;
    for (let i = 0; i < 32; i++) {
      if (strStart[i] !== strGoal[i]) diffCount++;
    }
    return diffCount;
  },

  /**
   * LC 1342: Number of Steps to Reduce a Number to Zero
   * Naive reference: Simpler arithmetic simulation.
   */
  numberOfSteps(num) {
    let steps = 0;
    let current = num;
    while (current > 0) {
      if (current % 2 === 1) {
        current -= 1;
      } else {
        current /= 2;
      }
      steps++;
    }
    return steps;
  },

  /**
   * LC 231: Power of Two
   * Naive reference: Loop dividing by 2.
   */
  isPowerOfTwo(n) {
    if (n <= 0) return false;
    let curr = n;
    while (curr % 2 === 0) {
      curr /= 2;
    }
    return curr === 1;
  },

  /**
   * LC 136: Single Number
   * Naive reference: Frequency map counter.
   */
  singleNumber(nums) {
    const map = new Map();
    for (let n of nums) {
      map.set(n, (map.get(n) || 0) + 1);
    }
    for (let [num, freq] of map.entries()) {
      if (freq === 1) return num;
    }
    return null;
  },

  /**
   * LC 268: Missing Number
   * Naive reference: Sum formula (n * (n + 1)) / 2 - actual sum.
   */
  missingNumber(nums) {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((acc, curr) => acc + curr, 0);
    return expectedSum - actualSum;
  },

  /**
   * LC 260: Single Number III
   * Naive reference: Frequency map counter.
   */
  singleNumberIII(nums) {
    const map = new Map();
    for (let n of nums) {
      map.set(n, (map.get(n) || 0) + 1);
    }
    const result = [];
    for (let [num, freq] of map.entries()) {
      if (freq === 1) result.push(num);
    }
    return result.sort((a, b) => a - b);
  },

  /**
   * LC 338: Counting Bits
   * Naive reference: Count set bits for each number 0 to n.
   */
  countBits(n) {
    const res = [];
    for (let i = 0; i <= n; i++) {
      res.push(this.hammingWeight(i));
    }
    return res;
  },

  /**
   * LC 78: Subsets
   * Naive reference: Recursive backtracking generator.
   */
  subsets(nums) {
    const res = [];
    const backtrack = (start, current) => {
      res.push([...current]);
      for (let i = start; i < nums.length; i++) {
        current.push(nums[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    };
    backtrack(0, []);
    return res;
  },

  /**
   * LC 201: Bitwise AND of Numbers Range
   * Naive reference: Binary string common prefix comparison.
   */
  rangeBitwiseAnd(left, right) {
    const strL = (left >>> 0).toString(2).padStart(32, '0');
    const strR = (right >>> 0).toString(2).padStart(32, '0');
    let commonPrefix = "";
    for (let i = 0; i < 32; i++) {
      if (strL[i] === strR[i]) {
        commonPrefix += strL[i];
      } else {
        commonPrefix = commonPrefix.padEnd(32, '0');
        break;
      }
    }
    return parseInt(commonPrefix, 2) >>> 0;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = ReferenceSolutions;
}
