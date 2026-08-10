/* ==========================================================================
   BIT MANIPULATION PROBLEMS DATASET — CURATED LEETCODE PROBLEMS
   ========================================================================== */

const PROBLEMS_DATA = {
  // =========================================================================
  // PATTERN 1: BASIC BIT OPERATIONS
  // =========================================================================

  101: {
    id: 101,
    patternId: 1,
    lcNum: 191,
    title: "Number of 1 Bits",
    difficulty: "Easy",
    statement: "Given a positive integer n, write a function that returns the number of set bits (1s) in its binary representation (also known as Hamming Weight).",
    examples: "Input: n = 11 (00000000000000000000000000001011 in binary)\nOutput: 3\nExplanation: The input binary string has three 1 bits.",
    constraints: [
      "1 <= n <= 2^31 - 1",
      "The input must be a 32-bit unsigned integer."
    ],
    bruteDesc: "Check every single bit from position 0 to 31 by right shifting n >> i and performing AND with 1.",
    bruteTime: "O(32) = O(1)",
    bruteSpace: "O(1)",
    optimalDesc: "Use Brian Kernighan's Algorithm: n &= (n - 1) turns off the rightmost set bit in each iteration. Runs in O(k) where k is the number of 1-bits.",
    optimalTime: "O(k) <= O(32)",
    optimalSpace: "O(1)",
    defaultInput: 11,
    code: {
      python: [
        "def hammingWeight(n: int) -> int:",
        "    count = 0",
        "    while n:",
        "        n &= (n - 1)  # Clear lowest set bit",
        "        count += 1",
        "    return count"
      ],
      javascript: [
        "function hammingWeight(n) {",
        "    let count = 0;",
        "    while (n !== 0) {",
        "        n &= (n - 1); // Clear lowest set bit",
        "        count++;",
        "    }",
        "    return count;",
        "}"
      ],
      java: [
        "public int hammingWeight(int n) {",
        "    int count = 0;",
        "    while (n != 0) {",
        "        n &= (n - 1);",
        "        count++;",
        "    }",
        "    return count;",
        "}"
      ],
      cpp: [
        "int hammingWeight(uint32_t n) {",
        "    int count = 0;",
        "    while (n) {",
        "        n &= (n - 1);",
        "        count++;",
        "    }",
        "    return count;",
        "}"
      ]
    },
    generateSteps(inputVal, targetVal, mode = "optimal") {
      let n = inputVal !== null && !isNaN(inputVal) ? (parseInt(inputVal) >>> 0) : 11;
      const steps = [];
      let count = 0;
      const originalN = n;
      const bitLen = n > 255 ? 32 : 8;

      if (mode === "brute") {
        steps.push({
          action: "Initialize Counter",
          formula: `count = 0 | n = ${n} (${BitEngine.toBinaryString(n, bitLen, true)})`,
          explanation: `Initialize 1-bit counter to 0. Input n = ${n}. Binary: ${BitEngine.toBinaryString(n, bitLen, true)}.`,
          bits: BitEngine.toBitArray(n, bitLen),
          decimalVal: n,
          codeLine: { python: 2, javascript: 2, java: 2, cpp: 2 },
          variables: { n: n, count: 0 }
        });

        for (let i = 0; i < bitLen; i++) {
          const bitVal = (n >> i) & 1;

          steps.push({
            action: `Loop Bit ${i}`,
            formula: `Inspect bit pos ${i}: (${n} >> ${i}) & 1 = ${bitVal}`,
            explanation: `Inspecting bit position ${i}: Value is ${bitVal}. ${bitVal === 1 ? "1-bit found! Will increment count." : "0-bit (skip)."}.`,
            bits: BitEngine.toBitArray(n, bitLen),
            decimalVal: n,
            activeIndices: [i],
            highlightPos: i,
            codeLine: { python: 3, javascript: 3, java: 3, cpp: 3 },
            variables: { n: n, i: i, bitVal: bitVal, count: count }
          });

          if (bitVal === 1) {
            count++;
            steps.push({
              action: `Bit ${i} is 1 -> Increment Count`,
              formula: `count += 1 => ${count}`,
              explanation: `Bit ${i} is 1! Increment count from ${count - 1} to ${count}.`,
              bits: BitEngine.toBitArray(n, bitLen),
              decimalVal: n,
              activeIndices: [i],
              highlightPos: i,
              codeLine: { python: 5, javascript: 5, java: 5, cpp: 5 },
              variables: { n: n, i: i, bitVal: 1, count: count }
            });
          }
        }

        steps.push({
          action: "Return Final Count",
          formula: `return count => ${count}`,
          explanation: `Completed bit inspection. Total set bits in ${originalN} is ${count}.`,
          bits: BitEngine.toBitArray(n, bitLen),
          decimalVal: n,
          codeLine: { python: 6, javascript: 7, java: 7, cpp: 7 },
          variables: { n: originalN, count: count }
        });

      } else { // OPTIMAL: Brian Kernighan
        steps.push({
          action: "Initialize Counter",
          formula: `count = 0 | n = ${n} (${BitEngine.toBinaryString(n, bitLen, true)})`,
          explanation: `Start Kernighan Algorithm: Line 2 initializes count = 0. Input n = ${n} (${BitEngine.toBinaryString(n, bitLen, true)}).`,
          bits: BitEngine.toBitArray(n, bitLen),
          decimalVal: n,
          codeLine: { python: 2, javascript: 2, java: 2, cpp: 2 },
          variables: { n: n, count: 0 }
        });

        let iter = 0;
        while (n > 0) {
          iter++;
          steps.push({
            action: `Iteration ${iter}: While Loop Check`,
            formula: `n = ${n} > 0 => TRUE (Continue loop)`,
            explanation: `Line 3: Condition check: n = ${n} (${BitEngine.toBinaryString(n, bitLen, true)}) is non-zero (True). Proceeding into loop iteration ${iter}.`,
            bits: BitEngine.toBitArray(n, bitLen),
            decimalVal: n,
            codeLine: { python: 3, javascript: 3, java: 3, cpp: 3 },
            variables: { n: n, count: count }
          });

          const kStep = BitEngine.performKernighanStep(n, bitLen);
          n = kStep.result;

          steps.push({
            type: "kernighan",
            action: `Iteration ${iter}: Clear Lowest Set Bit`,
            formula: `n &= (n - 1)  =>  ${kStep.n} & ${kStep.nMinus1} = ${kStep.result}`,
            explanation: `Line 4: Execute n &= (n - 1). Bitwise AND of ${kStep.n} (${kStep.binaryN}) & ${kStep.nMinus1} (${kStep.binaryNMinus1}) = ${kStep.result} (${BitEngine.toBinaryString(kStep.result, bitLen, true)}). Cleared lowest 1-bit at pos ${kStep.lowestSetBitPos}!`,
            n: kStep.n,
            nMinus1: kStep.nMinus1,
            result: kStep.result,
            lowestSetBitPos: kStep.lowestSetBitPos,
            bitLength: bitLen,
            codeLine: { python: 4, javascript: 4, java: 4, cpp: 4 },
            variables: { n: kStep.result, "n - 1": kStep.nMinus1, count: count }
          });

          count++;
          steps.push({
            action: `Iteration ${iter}: Increment Count`,
            formula: `count += 1  =>  ${count}`,
            explanation: `Line 5: Increment count from ${count - 1} to ${count}. Total 1-bits found so far = ${count}.`,
            bits: BitEngine.toBitArray(kStep.result, bitLen),
            decimalVal: kStep.result,
            codeLine: { python: 5, javascript: 5, java: 5, cpp: 5 },
            variables: { n: kStep.result, count: count }
          });
        }

        if (originalN === 0) {
          steps.push({
            action: "Loop Condition False",
            formula: `n = 0 => FALSE (Exit loop)`,
            explanation: `Line 3: Condition check: n = 0 is zero (False). Exit while loop.`,
            bits: BitEngine.toBitArray(0, bitLen),
            decimalVal: 0,
            codeLine: { python: 3, javascript: 3, java: 3, cpp: 3 },
            variables: { n: 0, count: 0 }
          });
        }

        steps.push({
          action: "Return Result",
          formula: `return count => ${count}`,
          explanation: `Line 6: Return count = ${count}. Total set bits in ${originalN} is ${count}.`,
          bits: BitEngine.toBitArray(0, bitLen),
          decimalVal: 0,
          codeLine: { python: 6, javascript: 7, java: 7, cpp: 7 },
          variables: { n: originalN, count: count }
        });
      }

      return steps;
    }
  },

  // =========================================================================
  // PATTERN 2: CHECK / SET / CLEAR / TOGGLE BIT
  // =========================================================================

  102: {
    id: 102,
    patternId: 2,
    lcNum: 476,
    title: "Number Complement",
    difficulty: "Easy",
    statement: "The complement of an integer is the integer you get when you flip all the 0s to 1s and all the 1s to 0s in its binary representation. Given an integer num, return its complement.",
    examples: "Input: num = 5 (101 in binary)\nOutput: 2 (010 in binary)\nExplanation: The binary representation of 5 is 101. Its complement is 010, which is 2 in decimal.",
    constraints: ["1 <= num < 2^31"],
    bruteDesc: "Convert to binary string, flip '0' to '1' and '1' to '0', parse integer.",
    bruteTime: "O(log N)",
    bruteSpace: "O(log N)",
    optimalDesc: "Create a bitmask of all 1s matching length of num, then XOR: `mask = (1 << num.bit_length()) - 1; return num ^ mask`.",
    optimalTime: "O(1)",
    optimalSpace: "O(1)",
    defaultInput: 5,
    code: {
      python: [
        "def findComplement(num: int) -> int:",
        "    mask = (1 << num.bit_length()) - 1",
        "    return num ^ mask"
      ],
      javascript: [
        "function findComplement(num) {",
        "    let mask = 1;",
        "    while (mask < num) mask = (mask << 1) | 1;",
        "    return num ^ mask;",
        "}"
      ],
      java: [
        "public int findComplement(int num) {",
        "    int mask = (Integer.highestOneBit(num) << 1) - 1;",
        "    return num ^ mask;",
        "}"
      ],
      cpp: [
        "int findComplement(int num) {",
        "    unsigned int mask = 1;",
        "    while (mask < (unsigned int)num) mask = (mask << 1) | 1;",
        "    return num ^ mask;",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let num = inputVal !== null && !isNaN(inputVal) ? parseInt(inputVal) : 5;
      const steps = [];

      const bitLen = Math.max(1, num.toString(2).length);
      const mask = (1 << bitLen) - 1;
      const res = num ^ mask;

      steps.push({
        type: "maskOverlay",
        action: "Create Bitmask",
        formula: `num = ${num} | mask = ${mask} (${BitEngine.toBinaryString(mask, bitLen)})`,
        explanation: `Step 1: Construct a bitmask of 1s with length ${bitLen} matching num's binary width. Mask = ${mask} (${BitEngine.toBinaryString(mask, bitLen)}).`,
        numA: num,
        numB: mask,
        opSymbol: "^ (XOR)",
        resultNum: res,
        bitLength: bitLen,
        codeLine: { python: 2, javascript: 3, java: 2, cpp: 3 },
        variables: { num: num, mask: mask, bitLength: bitLen }
      });

      steps.push({
        type: "maskOverlay",
        action: "XOR Complement",
        formula: `${num} ^ ${mask} = ${res}`,
        explanation: `Step 2: XOR num with mask. All 1s flip to 0s and 0s flip to 1s. Result = ${res} (${BitEngine.toBinaryString(res, bitLen)}).`,
        numA: num,
        numB: mask,
        opSymbol: "^ (XOR)",
        resultNum: res,
        bitLength: bitLen,
        codeLine: { python: 3, javascript: 4, java: 3, cpp: 4 },
        variables: { num: num, complement: res }
      });

      return steps;
    }
  },

  103: {
    id: 103,
    patternId: 2,
    lcNum: 2220,
    title: "Minimum Bit Flips to Convert Number",
    difficulty: "Easy",
    statement: "A bit flip of a number x is choosing a bit in the binary representation of x and flipping it from 0 to 1 or 1 to 0. Given two integers start and goal, return the minimum number of bit flips to convert start to goal.",
    examples: "Input: start = 10, goal = 7\nOutput: 3\nExplanation: 10 (1010) -> 7 (0111) requires 3 bit flips.",
    constraints: ["0 <= start, goal <= 10^9"],
    bruteDesc: "Compare bits position by position using right shifts.",
    bruteTime: "O(32)",
    bruteSpace: "O(1)",
    optimalDesc: "XOR start and goal (`diff = start ^ goal`), then count 1-bits in `diff` using Kernighan's algorithm!",
    optimalTime: "O(k) <= O(32)",
    optimalSpace: "O(1)",
    defaultInput: [10, 7],
    code: {
      python: [
        "def minBitFlips(start: int, goal: int) -> int:",
        "    diff = start ^ goal  # 1s represent mismatched bit positions",
        "    count = 0",
        "    while diff:",
        "        diff &= (diff - 1)  # Count set bits",
        "        count += 1",
        "    return count"
      ],
      javascript: [
        "function minBitFlips(start, goal) {",
        "    let diff = start ^ goal;",
        "    let count = 0;",
        "    while (diff !== 0) {",
        "        diff &= (diff - 1);",
        "        count++;",
        "    }",
        "    return count;",
        "}"
      ],
      java: [
        "public int minBitFlips(int start, int goal) {",
        "    return Integer.bitCount(start ^ goal);",
        "}"
      ],
      cpp: [
        "int minBitFlips(int start, int goal) {",
        "    return __builtin_popcount(start ^ goal);",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let start = 10, goal = 7;
      if (Array.isArray(inputVal) && inputVal.length >= 2) {
        start = inputVal[0];
        goal = inputVal[1];
      }

      const diff = start ^ goal;
      const steps = [];

      steps.push({
        type: "maskOverlay",
        action: "XOR Difference",
        formula: `start ^ goal => ${start} ^ ${goal} = ${diff}`,
        explanation: `Step 1: Compute start ^ goal (${start} ^ ${goal} = ${diff}). 1s in diff indicate positions where start and goal differ!`,
        numA: start,
        numB: goal,
        opSymbol: "^ (XOR)",
        resultNum: diff,
        bitLength: 8,
        codeLine: { python: 2, javascript: 2, java: 2, cpp: 2 },
        variables: { start: start, goal: goal, diff: diff, bitFlipsCount: 0 }
      });

      let d = diff;
      let count = 0;
      if (d === 0) {
        steps.push({
          action: "Completed",
          formula: `start === goal => 0 bit flips needed`,
          explanation: `start and goal are identical. Total 0 bit flips required.`,
          bits: BitEngine.toBitArray(0, 8),
          decimalVal: 0,
          codeLine: { python: 7, javascript: 7, java: 2, cpp: 2 },
          variables: { start: start, goal: goal, diff: 0, bitFlipsCount: 0 }
        });
      } else {
        while (d > 0) {
          const kStep = BitEngine.performKernighanStep(d, 8);
          count++;
          steps.push({
            type: "kernighan",
            action: `Count Mismatched Bit ${count}`,
            formula: `diff &= diff - 1 => ${kStep.result}`,
            explanation: `Step ${count + 1}: Kernighan iteration ${count}. Cleared mismatched bit at pos ${kStep.lowestSetBitPos}. Remaining diff = ${kStep.result}. Count = ${count}.`,
            n: kStep.n,
            nMinus1: kStep.nMinus1,
            result: kStep.result,
            lowestSetBitPos: kStep.lowestSetBitPos,
            bitLength: 8,
            codeLine: { python: 5, javascript: 5, java: 2, cpp: 2 },
            variables: { diff: kStep.result, bitFlipsCount: count }
          });
          d = kStep.result;
        }
      }

      return steps;
    }
  },

  // =========================================================================
  // PATTERN 3: ODD / EVEN & BIT PROPERTIES
  // =========================================================================

  104: {
    id: 104,
    patternId: 3,
    lcNum: 1342,
    title: "Number of Steps to Reduce a Number to Zero",
    difficulty: "Easy",
    statement: "Given an integer num, return the number of steps to reduce it to zero. In one step, if the current number is even, you have to divide it by 2; otherwise, you have to subtract 1 from it.",
    examples: "Input: num = 14\nOutput: 6\nExplanation: Step 1) 14 is even -> 7. Step 2) 7 is odd -> 6. Step 3) 6 is even -> 3. Step 4) 3 is odd -> 2. Step 5) 2 is even -> 1. Step 6) 1 is odd -> 0.",
    constraints: ["0 <= num <= 10^6"],
    bruteDesc: "Simulate with while loop dividing by 2 or subtracting 1.",
    bruteTime: "O(log N)",
    bruteSpace: "O(1)",
    optimalDesc: "Bit manipulation check: If (num & 1) == 1, subtract 1 (num ^= 1). Else divide by 2 (num >>= 1).",
    optimalTime: "O(log N)",
    optimalSpace: "O(1)",
    defaultInput: 14,
    code: {
      python: [
        "def numberOfSteps(num: int) -> int:",
        "    steps = 0",
        "    while num > 0:",
        "        if num & 1:   # Odd check via LSB",
        "            num -= 1  # Subtract 1",
        "        else:",
        "            num >>= 1 # Divide by 2 via right shift",
        "        steps += 1",
        "    return steps"
      ],
      javascript: [
        "function numberOfSteps(num) {",
        "    let steps = 0;",
        "    while (num > 0) {",
        "        if (num & 1) num -= 1;",
        "        else num >>= 1;",
        "        steps++;",
        "    }",
        "    return steps;",
        "}"
      ],
      java: [
        "public int numberOfSteps(int num) {",
        "    int steps = 0;",
        "    while (num > 0) {",
        "        if ((num & 1) == 1) num -= 1;",
        "        else num >>= 1;",
        "        steps++;",
        "    }",
        "    return steps;",
        "}"
      ],
      cpp: [
        "int numberOfSteps(int num) {",
        "    int steps = 0;",
        "    while (num > 0) {",
        "        if (num & 1) num -= 1;",
        "        else num >>= 1;",
        "        steps++;",
        "    }",
        "    return steps;",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let num = inputVal !== null && !isNaN(inputVal) ? parseInt(inputVal) : 14;
      const steps = [];
      let stepCount = 0;

      steps.push({
        action: "Initialize",
        formula: `num = ${num} (${BitEngine.toBinaryString(num, 8, true)})`,
        explanation: `Start with num = ${num}. Binary: ${BitEngine.toBinaryString(num, 8, true)}.`,
        bits: BitEngine.toBitArray(num, 8),
        decimalVal: num,
        codeLine: { python: 2, javascript: 2, java: 2, cpp: 2 },
        variables: { num: num, steps: 0 }
      });

      while (num > 0) {
        stepCount++;
        const isOdd = (num & 1) === 1;
        const prevNum = num;
        if (isOdd) {
          num -= 1;
        } else {
          num >>= 1;
        }

        steps.push({
          action: `Step ${stepCount}: ${isOdd ? "Odd (Subtract 1)" : "Even (Shift Right >> 1)"}`,
          formula: `${prevNum} is ${isOdd ? "ODD => " + prevNum + " - 1 = " + num : "EVEN => " + prevNum + " >> 1 = " + num}`,
          explanation: `Step ${stepCount}: LSB of ${prevNum} is ${isOdd ? "1 (ODD). Subtract 1 => " + num : "0 (EVEN). Right shift 1 bit (divide by 2) => " + num}.`,
          bits: BitEngine.toBitArray(num, 8),
          decimalVal: num,
          activeIndices: [0],
          codeLine: { python: isOdd ? 5 : 7, javascript: isOdd ? 4 : 5, java: isOdd ? 4 : 5, cpp: isOdd ? 4 : 5 },
          variables: { num: num, isOdd: isOdd, steps: stepCount }
        });
      }

      return steps;
    }
  },

  // =========================================================================
  // PATTERN 4: POWER OF TWO / FOUR
  // =========================================================================

  105: {
    id: 105,
    patternId: 4,
    lcNum: 231,
    title: "Power of Two",
    difficulty: "Easy",
    statement: "Given an integer n, return true if it is a power of two. Otherwise, return false.",
    examples: "Input: n = 16\nOutput: true\n\nInput: n = 3\nOutput: false",
    constraints: ["-2^31 <= n <= 2^31 - 1"],
    bruteDesc: "Loop dividing n by 2.",
    bruteTime: "O(log N)",
    bruteSpace: "O(1)",
    optimalDesc: "`n > 0 and (n & (n - 1)) == 0` checks if n has exactly one set bit.",
    optimalTime: "O(1)",
    optimalSpace: "O(1)",
    defaultInput: 16,
    code: {
      python: [
        "def isPowerOfTwo(n: int) -> bool:",
        "    return n > 0 and (n & (n - 1)) == 0"
      ],
      javascript: [
        "function isPowerOfTwo(n) {",
        "    return n > 0 && (n & (n - 1)) === 0;",
        "}"
      ],
      java: [
        "public boolean isPowerOfTwo(int n) {",
        "    return n > 0 && (n & (n - 1)) == 0;",
        "}"
      ],
      cpp: [
        "bool isPowerOfTwo(int n) {",
        "    return n > 0 && (n & (n - 1)) == 0;",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let n = inputVal !== null && !isNaN(inputVal) ? parseInt(inputVal) : 16;
      const kStep = BitEngine.performKernighanStep(n, 8);
      const isPower = n > 0 && kStep.result === 0;

      return [
        {
          type: "kernighan",
          action: "Bitwise Check",
          formula: `${kStep.n} & ${kStep.nMinus1} = ${kStep.result}`,
          explanation: `n = ${n} (${kStep.binaryN}). n - 1 = ${kStep.nMinus1}. Result = ${kStep.result}. ${isPower ? "Result is 0! n is a POWER OF TWO." : "Result is NOT 0. n is NOT a power of two."}`,
          n: kStep.n,
          nMinus1: kStep.nMinus1,
          result: kStep.result,
          lowestSetBitPos: kStep.lowestSetBitPos,
          bitLength: 8,
          codeLine: { python: 2, javascript: 2, java: 2, cpp: 2 },
          variables: { n: n, isPowerOfTwo: isPower }
        }
      ];
    }
  },

  // =========================================================================
  // PATTERN 5: XOR CANCELLATION & UNIQUE ELEMENTS
  // =========================================================================

  106: {
    id: 106,
    patternId: 5,
    lcNum: 136,
    title: "Single Number",
    difficulty: "Easy",
    statement: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    examples: "Input: nums = [4, 1, 2, 1, 2]\nOutput: 4",
    constraints: ["1 <= nums.length <= 3 * 10^4"],
    bruteDesc: "Use Hash Map to count frequencies.",
    bruteTime: "O(N)",
    bruteSpace: "O(N)",
    optimalDesc: "XOR all elements. Duplicates cancel to 0, leaving the unique element.",
    optimalTime: "O(N)",
    optimalSpace: "O(1)",
    defaultInput: [4, 1, 2, 1, 2],
    code: {
      python: [
        "def singleNumber(nums: List[int]) -> int:",
        "    res = 0",
        "    for n in nums:",
        "        res ^= n",
        "    return res"
      ],
      javascript: [
        "function singleNumber(nums) {",
        "    let res = 0;",
        "    for (let n of nums) res ^= n;",
        "    return res;",
        "}"
      ],
      java: [
        "public int singleNumber(int[] nums) {",
        "    int res = 0;",
        "    for (int n : nums) res ^= n;",
        "    return res;",
        "}"
      ],
      cpp: [
        "int singleNumber(vector<int>& nums) {",
        "    int res = 0;",
        "    for (int n : nums) res ^= n;",
        "    return res;",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let nums = Array.isArray(inputVal) ? inputVal : [4, 1, 2, 1, 2];
      const trace = BitEngine.getXorTrace(nums, 8);

      return trace.map((t, idx) => ({
        type: idx === 0 ? "bits" : "xorTrace",
        action: idx === 0 ? "Initialize" : `XOR ${t.numberAdded}`,
        formula: idx === 0 ? "res = 0" : `${t.prevXor} ^ ${t.numberAdded} = ${t.currentXor}`,
        explanation: t.explanation,
        prevXor: t.prevXor,
        numberAdded: t.numberAdded,
        currentXor: t.currentXor,
        bitLength: 8,
        bits: BitEngine.toBitArray(t.currentXor, 8),
        decimalVal: t.currentXor,
        codeLine: { python: idx === 0 ? 2 : 4, javascript: idx === 0 ? 2 : 3, java: idx === 0 ? 2 : 3, cpp: idx === 0 ? 2 : 3 },
        variables: { currentNum: t.numberAdded, accumulatorXor: t.currentXor }
      }));
    }
  },

  // =========================================================================
  // PATTERN 6: SINGLE NUMBER VARIANTS
  // =========================================================================

  107: {
    id: 107,
    patternId: 6,
    lcNum: 260,
    title: "Single Number III",
    difficulty: "Medium",
    statement: "Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.",
    examples: "Input: nums = [1, 2, 1, 3, 2, 5]\nOutput: [3, 5]",
    constraints: ["2 <= nums.length <= 3 * 10^4"],
    bruteDesc: "Hash Map frequency counter.",
    bruteTime: "O(N)",
    bruteSpace: "O(N)",
    optimalDesc: "XOR all elements to get `a ^ b`. Find lowest set bit in XOR result (`diff = xor & -xor`). Partition elements into 2 groups based on diff bit and XOR each group!",
    optimalTime: "O(N)",
    optimalSpace: "O(1)",
    defaultInput: [1, 2, 1, 3, 2, 5],
    code: {
      python: [
        "def singleNumber(nums: List[int]) -> List[int]:",
        "    xor_all = 0",
        "    for n in nums: xor_all ^= n",
        "    diff = xor_all & (-xor_all) # Rightmost set bit",
        "    a, b = 0, 0",
        "    for n in nums:",
        "        if n & diff: a ^= n",
        "        else: b ^= n",
        "    return [a, b]"
      ],
      javascript: [
        "function singleNumber(nums) {",
        "    let xorAll = 0;",
        "    for (let n of nums) xorAll ^= n;",
        "    let diff = xorAll & (-xorAll);",
        "    let a = 0, b = 0;",
        "    for (let n of nums) {",
        "        if (n & diff) a ^= n;",
        "        else b ^= n;",
        "    }",
        "    return [a, b];",
        "}"
      ],
      java: [
        "public int[] singleNumber(int[] nums) {",
        "    int xorAll = 0;",
        "    for (int n : nums) xorAll ^= n;",
        "    int diff = xorAll & (-xorAll);",
        "    int a = 0, b = 0;",
        "    for (int n : nums) {",
        "        if ((n & diff) != 0) a ^= n;",
        "        else b ^= n;",
        "    }",
        "    return new int[]{a, b};",
        "}"
      ],
      cpp: [
        "vector<int> singleNumber(vector<int>& nums) {",
        "    long long xorAll = 0;",
        "    for (int n : nums) xorAll ^= n;",
        "    long long diff = xorAll & (-xorAll);",
        "    int a = 0, b = 0;",
        "    for (int n : nums) {",
        "        if (n & diff) a ^= n;",
        "        else b ^= n;",
        "    }",
        "    return {a, b};",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let nums = Array.isArray(inputVal) ? inputVal : [1, 2, 1, 3, 2, 5];
      let xorAll = 0;
      nums.forEach(n => xorAll ^= n);
      const diff = xorAll & (-xorAll);
      let a = 0, b = 0;

      const steps = [];
      steps.push({
        action: "XOR All Elements",
        formula: `xorAll = a ^ b = ${xorAll} (${BitEngine.toBinaryString(xorAll, 8, true)})`,
        explanation: `XORing all elements yields a ^ b = ${xorAll}.`,
        bits: BitEngine.toBitArray(xorAll, 8),
        decimalVal: xorAll,
        codeLine: { python: 3, javascript: 3, java: 3, cpp: 3 },
        variables: { xorAll: xorAll }
      });

      steps.push({
        action: "Find Partition Bit",
        formula: `diff = xorAll & (-xorAll) = ${diff}`,
        explanation: `Isolate lowest set bit of xorAll: diff = ${diff}. This bit position differs between the two unique numbers!`,
        bits: BitEngine.toBitArray(diff, 8),
        decimalVal: diff,
        activeIndices: [Math.log2(diff)],
        codeLine: { python: 4, javascript: 4, java: 4, cpp: 4 },
        variables: { diff: diff, bitPos: Math.log2(diff) }
      });

      nums.forEach((n, idx) => {
        if (n & diff) a ^= n;
        else b ^= n;

        steps.push({
          action: `Partition Element ${n}`,
          formula: `${n} & ${diff} ${n & diff ? "!= 0 => Group A" : "== 0 => Group B"}`,
          explanation: `Item ${n}: ${(n & diff) ? "Bit is 1 -> XOR into Group A (a = " + a + ")" : "Bit is 0 -> XOR into Group B (b = " + b + ")"}`,
          bits: BitEngine.toBitArray(n, 8),
          decimalVal: n,
          codeLine: { python: 7, javascript: 7, java: 7, cpp: 7 },
          variables: { item: n, groupA: a, groupB: b }
        });
      });

      return steps;
    }
  },

  // =========================================================================
  // PATTERN 7: COUNTING SET BITS
  // =========================================================================

  108: {
    id: 108,
    patternId: 7,
    lcNum: 338,
    title: "Counting Bits",
    difficulty: "Easy",
    statement: "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    examples: "Input: n = 5\nOutput: [0, 1, 1, 2, 1, 2]\nExplanation: 0->0, 1->1, 2->1, 3->2, 4->1, 5->2",
    constraints: ["0 <= n <= 10^5"],
    bruteDesc: "Call bit count helper for each number i from 0 to n.",
    bruteTime: "O(N log N)",
    bruteSpace: "O(1)",
    optimalDesc: "Dynamic Programming + Bit Shift: `ans[i] = ans[i >> 1] + (i & 1)`. The bit count of i equals bit count of (i // 2) plus 1 if i is odd!",
    optimalTime: "O(N)",
    optimalSpace: "O(1)",
    defaultInput: 5,
    code: {
      python: [
        "def countBits(n: int) -> List[int]:",
        "    ans = [0] * (n + 1)",
        "    for i in range(1, n + 1):",
        "        ans[i] = ans[i >> 1] + (i & 1)",
        "    return ans"
      ],
      javascript: [
        "function countBits(n) {",
        "    const ans = new Array(n + 1).fill(0);",
        "    for (let i = 1; i <= n; i++) {",
        "        ans[i] = ans[i >> 1] + (i & 1);",
        "    }",
        "    return ans;",
        "}"
      ],
      java: [
        "public int[] countBits(int n) {",
        "    int[] ans = new int[n + 1];",
        "    for (int i = 1; i <= n; i++) {",
        "        ans[i] = ans[i >> 1] + (i & 1);",
        "    }",
        "    return ans;",
        "}"
      ],
      cpp: [
        "vector<int> countBits(int n) {",
        "    vector<int> ans(n + 1, 0);",
        "    for (int i = 1; i <= n; i++) {",
        "        ans[i] = ans[i >> 1] + (i & 1);",
        "    }",
        "    return ans;",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let n = inputVal !== null && !isNaN(inputVal) ? parseInt(inputVal) : 5;
      const ans = new Array(n + 1).fill(0);
      const steps = [];

      steps.push({
        action: "Initialize DP Array",
        formula: `ans[0] = 0`,
        explanation: `Initialize ans array of size ${n + 1} with zeros.`,
        bits: BitEngine.toBitArray(0, 8),
        decimalVal: 0,
        codeLine: { python: 2, javascript: 2, java: 2, cpp: 2 },
        variables: { ans: "[0]" }
      });

      for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1);
        steps.push({
          action: `Compute ans[${i}]`,
          formula: `ans[${i}] = ans[${i >> 1}] + (${i & 1}) = ${ans[i]}`,
          explanation: `i = ${i} (${BitEngine.toBinaryString(i, 8, true)}). Right shift ${i >> 1} has ${ans[i >> 1]} bits + LSB (${i & 1}) = ${ans[i]}.`,
          bits: BitEngine.toBitArray(i, 8),
          decimalVal: i,
          codeLine: { python: 4, javascript: 4, java: 4, cpp: 4 },
          variables: { i: i, "i >> 1": i >> 1, LSB: i & 1, "ans[i]": ans[i] }
        });
      }

      return steps;
    }
  },

  // =========================================================================
  // PATTERN 10: SUBSETS USING BITMASK
  // =========================================================================

  109: {
    id: 109,
    patternId: 10,
    lcNum: 78,
    title: "Subsets",
    difficulty: "Medium",
    statement: "Given an integer array nums of unique elements, return all possible subsets (the power set).",
    examples: "Input: nums = [1, 2, 3]\nOutput: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]",
    constraints: ["1 <= nums.length <= 10"],
    bruteDesc: "Recursive backtracking.",
    bruteTime: "O(2^N * N)",
    bruteSpace: "O(N)",
    optimalDesc: "Count binary masks 0 to 2^N - 1.",
    optimalTime: "O(2^N * N)",
    optimalSpace: "O(1)",
    defaultInput: [1, 2, 3],
    code: {
      python: [
        "def subsets(nums: List[int]) -> List[List[int]]:",
        "    n = len(nums)",
        "    res = []",
        "    for mask in range(1 << n):",
        "        subset = [nums[i] for i in range(n) if (mask >> i) & 1]",
        "        res.append(subset)",
        "    return res"
      ],
      javascript: [
        "function subsets(nums) {",
        "    const n = nums.length;",
        "    const res = [];",
        "    for (let mask = 0; mask < (1 << n); mask++) {",
        "        const subset = [];",
        "        for (let i = 0; i < n; i++) {",
        "            if ((mask >> i) & 1) subset.push(nums[i]);",
        "        }",
        "        res.push(subset);",
        "    }",
        "    return res;",
        "}"
      ],
      java: [
        "public List<List<Integer>> subsets(int[] nums) {",
        "    int n = nums.length;",
        "    List<List<Integer>> res = new ArrayList<>();",
        "    for (int mask = 0; mask < (1 << n); mask++) {",
        "        List<Integer> subset = new ArrayList<>();",
        "        for (int i = 0; i < n; i++) {",
        "            if (((mask >> i) & 1) == 1) subset.add(nums[i]);",
        "        }",
        "        res.add(subset);",
        "    }",
        "    return res;",
        "}"
      ],
      cpp: [
        "vector<vector<int>> subsets(vector<int>& nums) {",
        "    int n = nums.size();",
        "    vector<vector<int>> res;",
        "    for (int mask = 0; mask < (1 << n); mask++) {",
        "        vector<int> subset;",
        "        for (int i = 0; i < n; i++) {",
        "            if ((mask >> i) & 1) subset.push_back(nums[i]);",
        "        }",
        "        res.push_back(subset);",
        "    }",
        "    return res;",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let nums = Array.isArray(inputVal) ? inputVal : [1, 2, 3];
      const trace = BitEngine.getSubsetsTrace(nums);

      return trace.map((t, idx) => ({
        type: "subsets",
        action: `Mask ${t.mask} / ${trace.length - 1}`,
        formula: `Mask ${t.mask} (${t.maskBinary}) => Subset [${t.subset.join(", ")}]`,
        explanation: t.explanation,
        mask: t.mask,
        subset: t.subset,
        elements: nums,
        bitLength: nums.length,
        codeLine: { python: 5, javascript: 7, java: 7, cpp: 7 },
        variables: { mask: t.mask, maskBinary: t.maskBinary, subset: `[${t.subset.join(", ")}]` }
      }));
    }
  },

  // =========================================================================
  // PATTERN 11: BITWISE RANGE OPERATIONS
  // =========================================================================

  110: {
    id: 110,
    patternId: 11,
    lcNum: 201,
    title: "Bitwise AND of Numbers Range",
    difficulty: "Medium",
    statement: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
    examples: "Input: left = 5, right = 7\nOutput: 4\nExplanation: 5 (101) & 6 (110) & 7 (111) = 4 (100).",
    constraints: ["0 <= left <= right <= 2^31 - 1"],
    bruteDesc: "Loop from left to right computing bitwise AND.",
    bruteTime: "O(right - left) (TLE for large range)",
    bruteSpace: "O(1)",
    optimalDesc: "Right shift left and right until they are equal (finding common binary prefix), then left shift back!",
    optimalTime: "O(32) = O(1)",
    optimalSpace: "O(1)",
    defaultInput: [5, 7],
    code: {
      python: [
        "def rangeBitwiseAnd(left: int, right: int) -> int:",
        "    shift = 0",
        "    while left < right:",
        "        left >>= 1",
        "        right >>= 1",
        "        shift += 1",
        "    return left << shift"
      ],
      javascript: [
        "function rangeBitwiseAnd(left, right) {",
        "    let shift = 0;",
        "    while (left < right) {",
        "        left >>= 1;",
        "        right >>= 1;",
        "        shift++;",
        "    }",
        "    return left << shift;",
        "}"
      ],
      java: [
        "public int rangeBitwiseAnd(int left, int right) {",
        "    int shift = 0;",
        "    while (left < right) {",
        "        left >>= 1;",
        "        right >>= 1;",
        "        shift++;",
        "    }",
        "    return left << shift;",
        "}"
      ],
      cpp: [
        "int rangeBitwiseAnd(int left, int right) {",
        "    int shift = 0;",
        "    while (left < right) {",
        "        left >>= 1;",
        "        right >>= 1;",
        "        shift++;",
        "    }",
        "    return left << shift;",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let left = 5, right = 7;
      if (Array.isArray(inputVal) && inputVal.length >= 2) {
        left = inputVal[0];
        right = inputVal[1];
      }

      const steps = [];
      let l = left, r = right, shift = 0;

      steps.push({
        action: "Initialize Range",
        formula: `left = ${left} (${BitEngine.toBinaryString(left, 8, true)}) | right = ${right} (${BitEngine.toBinaryString(right, 8, true)})`,
        explanation: `Find common binary prefix of left = ${left} and right = ${right}.`,
        bits: BitEngine.toBitArray(l, 8),
        decimalVal: l,
        auxBits: BitEngine.toBitArray(r, 8),
        auxLabel: "Right",
        auxDec: r,
        codeLine: { python: 2, javascript: 2, java: 2, cpp: 2 },
        variables: { left: l, right: r, shift: 0 }
      });

      while (l < r) {
        l >>= 1;
        r >>= 1;
        shift++;

        steps.push({
          action: `Shift Iteration ${shift}`,
          formula: `left >>= 1 => ${l} | right >>= 1 => ${r}`,
          explanation: `Shift ${shift}: Truncate LSB bit. left = ${l} (${BitEngine.toBinaryString(l, 8, true)}), right = ${r} (${BitEngine.toBinaryString(r, 8, true)}).`,
          bits: BitEngine.toBitArray(l, 8),
          decimalVal: l,
          auxBits: BitEngine.toBitArray(r, 8),
          auxLabel: "Right",
          auxDec: r,
          codeLine: { python: 4, javascript: 4, java: 4, cpp: 4 },
          variables: { left: l, right: r, shift: shift }
        });
      }

      const res = l << shift;
      steps.push({
        action: "Shift Back Prefix",
        formula: `result = left << ${shift} = ${res}`,
        explanation: `Common prefix found! Shift left by ${shift} bits: result = ${res} (${BitEngine.toBinaryString(res, 8, true)}).`,
        bits: BitEngine.toBitArray(res, 8),
        decimalVal: res,
        codeLine: { python: 7, javascript: 7, java: 7, cpp: 7 },
        variables: { commonPrefix: l, shift: shift, result: res }
      });

      return steps;
    }
  },

  // =========================================================================
  // PATTERN 12: REVERSE BITS & BIT CONSTRUCTION (FIXED 32-BIT WIDTH FOR LC 190)
  // =========================================================================

  111: {
    id: 111,
    patternId: 12,
    lcNum: 190,
    title: "Reverse Bits (32-Bit Fixed Width)",
    difficulty: "Easy",
    statement: "Reverse bits of a given 32-bit unsigned integer. Note that in some languages such as Java, there is no unsigned integer type. In this case, both input and output will be given as signed integers.",
    examples: "Input: n = 43261596 (00000010100101000001111010011100)\nOutput: 964176192 (00111001011110000010100101000000)",
    constraints: ["The input must be a 32-bit unsigned integer."],
    bruteDesc: "Convert 32-bit string, reverse string, parse back as unsigned integer.",
    bruteTime: "O(32)",
    bruteSpace: "O(32)",
    optimalDesc: "Fixed 32-bit loop: Extract LSB with (n & 1), shift result left by 1 and OR LSB, shift n right by 1.",
    optimalTime: "O(32) = O(1)",
    optimalSpace: "O(1)",
    defaultInput: 43261596,
    code: {
      python: [
        "def reverseBits(n: int) -> int:",
        "    result = 0",
        "    for _ in range(32):",
        "        result = (result << 1) | (n & 1)",
        "        n >>= 1",
        "    return result"
      ],
      javascript: [
        "function reverseBits(n) {",
        "    let result = 0;",
        "    for (let i = 0; i < 32; i++) {",
        "        result = (result << 1) | (n & 1);",
        "        n >>>= 1;",
        "    }",
        "    return result >>> 0;",
        "}"
      ],
      java: [
        "public int reverseBits(int n) {",
        "    int result = 0;",
        "    for (int i = 0; i < 32; i++) {",
        "        result = (result << 1) | (n & 1);",
        "        n >>>= 1;",
        "    }",
        "    return result;",
        "}"
      ],
      cpp: [
        "uint32_t reverseBits(uint32_t n) {",
        "    uint32_t result = 0;",
        "    for (int i = 0; i < 32; i++) {",
        "        result = (result << 1) | (n & 1);",
        "        n >>= 1;",
        "    }",
        "    return result;",
        "}"
      ]
    },
    generateSteps(inputVal) {
      let n = inputVal !== null && !isNaN(inputVal) ? (parseInt(inputVal) >>> 0) : 43261596;
      const trace = BitEngine.getReverseBitsTrace(n, 32);

      return trace.map((t, idx) => ({
        action: idx === 0 ? "Initialize 32-bit" : `Step ${idx}/32`,
        formula: `Read LSB = ${t.bitRead !== null ? t.bitRead : "-"} | Output = ${t.currentResult}`,
        explanation: t.explanation,
        bits: BitEngine.toBitArray(t.currentResult, 32),
        decimalVal: t.currentResult,
        bitLabel: "Reversed Output (32-bit)",
        auxBits: BitEngine.toBitArray(t.currentInput, 32),
        auxLabel: "Input n (32-bit)",
        auxDec: t.currentInput,
        codeLine: { python: idx === 0 ? 2 : 4, javascript: idx === 0 ? 2 : 4, java: idx === 0 ? 2 : 4, cpp: idx === 0 ? 2 : 4 },
        variables: { input: t.currentInput, result: t.currentResult, readBit: t.bitRead }
      }));
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PROBLEMS_DATA;
}
