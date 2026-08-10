/* ==========================================================================
   BIT MANIPULATION PATTERNS DATASET — 12 CORE PATTERNS & QUIZZES
   ========================================================================== */

const PATTERNS_DATA = {
  1: {
    id: 1,
    name: "Basic Bit Operations (AND, OR, XOR, NOT, Shifts)",
    icon: "⚡",
    goal: "Master fundamental bitwise operators and bit-level arithmetic without arithmetic operators.",
    useCases: [
      "Replacing arithmetic operators (+, -, *, /) with bit shifts and logic gates.",
      "Performing low-level byte manipulation and bitwise flags.",
      "Fast division and multiplication by powers of 2 (x << 1, x >> 1)."
    ],
    template: `// Basic Bitwise Operations Template
def basic_bitwise_demo(a, b):
    and_res = a & b        # Bitwise AND
    or_res  = a | b        # Bitwise OR
    xor_res = a ^ b        # Bitwise XOR
    not_res = ~a           # Bitwise NOT (-(a + 1) in Python)
    lshift  = a << 1       # Multiply by 2
    rshift  = a >> 1       # Divide by 2
    return and_res, or_res, xor_res, not_res, lshift, rshift`,
    tips: [
      "Remember that & returns 1 only when BOTH bits are 1.",
      "XOR (^) returns 1 when bits are DIFFERENT.",
      "Shift left << multiplies by 2^k, Shift right >> divides by 2^k."
    ],
    mistakes: [
      "Confusing boolean logic && with bitwise &.",
      "Forgetting operator precedence: bitwise operators have lower precedence than comparison operators (use parentheses!).",
      "Misunderstanding ~ in signed 2's complement vs unsigned binary."
    ],
    quiz: [
      {
        q: "What is the result of 5 & 3 in binary?",
        options: ["0001 (1)", "0111 (7)", "0110 (6)", "0000 (0)"],
        ans: 0,
        exp: "5 is 0101 and 3 is 0011. 0101 & 0011 = 0001 = 1."
      },
      {
        q: "What is 5 ^ 5 equal to?",
        options: ["5", "0", "10", "1"],
        ans: 1,
        exp: "Any number XORed with itself is 0 (a ^ a = 0)."
      },
      {
        q: "What operation does x << 3 perform mathematically?",
        options: ["x + 3", "x * 3", "x * 8", "x / 8"],
        ans: 2,
        exp: "Shifting left by 3 bits multiplies the number by 2^3 = 8."
      },
      {
        q: "What is the value of ~0 in 32-bit signed integer representation?",
        options: ["0", "1", "-1", "2147483647"],
        ans: 2,
        exp: "~0 flips all bits from 0s to 1s, which equals -1 in 2's complement."
      }
    ]
  },

  2: {
    id: 2,
    name: "Check / Set / Clear / Toggle Bit",
    icon: "🎯",
    goal: "Isolate and modify individual bit positions using bitmasks (1 << k).",
    useCases: [
      "Setting status flags in operating systems and game engines.",
      "Checking whether a specific feature or permission bit is enabled.",
      "Toggling states efficiently without conditional branching."
    ],
    template: `// Bit Manipulation Tricks Template
def bit_tricks(n, k):
    check_k = (n >> k) & 1   # Check if k-th bit is set
    set_k   = n | (1 << k)   # Set k-th bit to 1
    clear_k = n & ~(1 << k)  # Clear k-th bit to 0
    toggle_k= n ^ (1 << k)   # Toggle k-th bit (0->1, 1->0)
    return check_k, set_k, clear_k, toggle_k`,
    tips: [
      "Bit positions are zero-indexed from right to left (LSB is index 0).",
      "Always construct a mask using (1 << k).",
      "To clear a bit, invert the mask using ~ before performing AND (&)."
    ],
    mistakes: [
      "Off-by-one errors when target bit is 1-indexed in problem text.",
      "Shifting beyond 31 bits in 32-bit integers without 64-bit casting."
    ],
    quiz: [
      {
        q: "How do you check if the k-th bit of n is set?",
        options: ["(n >> k) & 1", "n & k", "n | (1 << k)", "n ^ (1 << k)"],
        ans: 0,
        exp: "Right shift n by k positions so the k-th bit moves to LSB, then AND with 1."
      },
      {
        q: "Which expression sets the 3rd bit of n (0-indexed)?",
        options: ["n | 3", "n | (1 << 3)", "n & (1 << 3)", "n ^ 3"],
        ans: 1,
        exp: "1 << 3 generates a mask 00001000. ORing with n sets bit 3 to 1."
      }
    ]
  },

  3: {
    id: 3,
    name: "Odd / Even & Bit Properties",
    icon: "⚖️",
    goal: "Use least significant bit (LSB) checks to detect parity without modulo operators.",
    useCases: [
      "Ultra-fast odd/even checks in high-frequency trading and graphics pipelines.",
      "Checking sign bits and boundary bit properties."
    ],
    template: `def is_even(n):
    return (n & 1) == 0

def is_odd(n):
    return (n & 1) == 1`,
    tips: [
      "Least Significant Bit (LSB) is 0 for even numbers, 1 for odd numbers.",
      "`n & 1` is significantly faster than `n % 2` at CPU cycle level."
    ],
    mistakes: [
      "Assuming modulo works identically for negative numbers in all languages."
    ],
    quiz: [
      {
        q: "Why does (n & 1) check if a number is odd?",
        options: [
          "All powers of 2 except 2^0 are even; LSB represents 2^0 = 1",
          "AND with 1 zeroes out the entire number",
          "Odd numbers always end with 0 in binary",
          "It divides the number by 2"
        ],
        ans: 0,
        exp: "Since all higher bits represent powers of 2 (2, 4, 8, 16...), only the 0-th bit determines oddness."
      }
    ]
  },

  4: {
    id: 4,
    name: "Power of Two & Power of Four",
    icon: "🔋",
    goal: "Exploit binary structure of powers of 2 (exactly one set bit) using `n & (n - 1) == 0`.",
    useCases: [
      "Validating memory alignment and buffer sizes.",
      "LeetCode 231 (Power of Two) and LeetCode 342 (Power of Four)."
    ],
    template: `def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

def is_power_of_four(n):
    # Must be power of 2 AND set bit must be at even index (0, 2, 4...)
    return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0`,
    tips: [
      "A positive integer is a power of 2 if and only if its binary representation has EXACTLY ONE '1' bit.",
      "`n & (n - 1)` clears the single set bit, resulting in 0."
    ],
    mistakes: [
      "Forgetting to check if n > 0 (0 & -1 == 0, but 0 is NOT a power of 2!)."
    ],
    quiz: [
      {
        q: "Why is n & (n - 1) == 0 true for powers of 2?",
        options: [
          "Power of 2 has 1 set bit; n-1 turns that bit to 0 and trailing 0s to 1s, leaving no overlap",
          "n - 1 is always odd",
          "Because binary numbers double every shift",
          "It adds 1 to n"
        ],
        ans: 0,
        exp: "For n = 8 (1000), n - 1 = 7 (0111). 1000 & 0111 = 0000."
      }
    ]
  },

  5: {
    id: 5,
    name: "XOR Properties & Cancellation",
    icon: "🔀",
    goal: "Use key XOR algebraic properties (a ^ a = 0, a ^ 0 = a, commutative & associative).",
    useCases: [
      "Finding missing numbers, duplicate numbers, or single elements.",
      "Swapping two numbers without temporary variables (`a ^= b; b ^= a; a ^= b;`)."
    ],
    template: `def xor_cancellation_demo(nums):
    res = 0
    for num in nums:
        res ^= num  # Duplicates cancel out!
    return res`,
    tips: [
      "Order does NOT matter: a ^ b ^ c ^ a ^ b = c.",
      "All paired duplicates eliminate themselves to 0."
    ],
    mistakes: [
      "Applying XOR cancellation when elements appear more than twice (requires modulo arithmetic or ternary bit manipulation)."
    ],
    quiz: [
      {
        q: "What is 4 ^ 1 ^ 2 ^ 1 ^ 2 equal to?",
        options: ["4", "0", "1", "2"],
        ans: 0,
        exp: "By commutativity: (1^1) ^ (2^2) ^ 4 = 0 ^ 0 ^ 4 = 4."
      }
    ]
  },

  6: {
    id: 6,
    name: "Single Number Variants (I, II, III)",
    icon: "💎",
    goal: "Solve classic LeetCode single number problems using XOR bit counting & 2-group partitioning.",
    useCases: [
      "LeetCode 136 (Single Number - every element 2x except 1).",
      "LeetCode 137 (Single Number II - every element 3x except 1).",
      "LeetCode 260 (Single Number III - two unique elements)."
    ],
    template: `def single_number_iii(nums):
    xor_all = 0
    for n in nums:
        xor_all ^= n
    
    # Find rightmost set bit in xor_all (partition bit)
    diff_bit = xor_all & (-xor_all)
    
    a, b = 0, 0
    for n in nums:
        if n & diff_bit:
            a ^= n
        else:
            b ^= n
    return [a, b]`,
    tips: [
      "To separate two unique numbers, use the lowest set bit of `xor_all` (`diff_bit = x & -x`).",
      "For elements appearing 3 times, track bit counts modulo 3 or use two state variables `ones` and `twos`."
    ],
    mistakes: [
      "Forgetting signed integer overflow when calculating `-xor_all` in Java/C++."
    ],
    quiz: [
      {
        q: "In Single Number III, what does xor_all & (-xor_all) extract?",
        options: [
          "The lowest set bit of xor_all",
          "The highest set bit of xor_all",
          "The sum of the numbers",
          "Zero"
        ],
        ans: 0,
        exp: "In 2's complement, -x = ~x + 1. x & -x isolates the rightmost set bit."
      }
    ]
  },

  7: {
    id: 7,
    name: "Counting Set Bits & Hamming Distance",
    icon: "🔢",
    goal: "Count the number of 1s in binary representation (Hamming Weight) and bit differences.",
    useCases: [
      "LeetCode 191 (Number of 1 Bits).",
      "LeetCode 461 (Hamming Distance).",
      "LeetCode 338 (Counting Bits for range 0 to n)."
    ],
    template: `def count_set_bits(n):
    count = 0
    while n:
        n &= (n - 1)  # Kernighan's trick clears 1 set bit per loop
        count += 1
    return count`,
    tips: [
      "Kernighan's algorithm runs in O(k) time where k is the number of set bits.",
      "Hamming distance between A and B is simply `count_set_bits(A ^ B)`."
    ],
    mistakes: [
      "Looping through all 32 bits when only a few bits are set."
    ],
    quiz: [
      {
        q: "How many iterations does Kernighan's algorithm take for n = 11 (1011 in binary)?",
        options: ["3 iterations", "11 iterations", "4 iterations", "32 iterations"],
        ans: 0,
        exp: "1011 has three 1-bits. Each loop clears one 1-bit, so it takes exactly 3 iterations."
      }
    ]
  },

  8: {
    id: 8,
    name: "Brian Kernighan's Algorithm",
    icon: "🔥",
    goal: "Master `n &= n - 1` to skip trailing zeros and turn off the lowest set bit in O(1) step per bit.",
    useCases: [
      "Optimal set bit counting.",
      "Finding the nearest lower power of two.",
      "Sparse bit array processing."
    ],
    template: `def kernighan_algorithm(n):
    steps = []
    while n > 0:
        prev = n
        n &= (n - 1)
        steps.append((prev, n))
    return steps`,
    tips: [
      "Each operation `n & (n - 1)` flips the rightmost 1-bit to 0 and all trailing 0s to 1s in n - 1."
    ],
    mistakes: [
      "Assuming Kernighan's algorithm loops O(32) times; it loops ONLY as many times as set bits exist!"
    ],
    quiz: [
      {
        q: "If n = 12 (1100), what is n - 1 in binary?",
        options: ["1011 (11)", "1101 (13)", "1000 (8)", "1111 (15)"],
        ans: 0,
        exp: "12 is 1100. Subtracting 1 flips the lowest set bit and all lower bits: 1011 (11)."
      }
    ]
  },

  9: {
    id: 9,
    name: "Bit Masking & State Representation",
    icon: "🎭",
    goal: "Represent subsets, visited nodes, or boolean grid states as integer bitmasks.",
    useCases: [
      "Dynamic Programming with bitmasks (Traveling Salesperson, Matchings).",
      "LeetCode 187 (Repeated DNA Sequences).",
      "Compressing boolean arrays into compact integers."
    ],
    template: `def bitmask_state_demo(items):
    # Mask of n items: (1 << n) - 1
    n = len(items)
    full_mask = (1 << n) - 1
    return full_mask`,
    tips: [
      "A 32-bit integer can store 32 boolean flags in O(1) space.",
      "Use `mask | (1 << i)` to mark item i as visited."
    ],
    mistakes: [
      "Exceeding 30 bits without using BigInt / 64-bit integer masks."
    ],
    quiz: [
      {
        q: "How do you represent a full mask of 4 items (all 4 items selected)?",
        options: ["(1 << 4) - 1 = 15 (1111)", "1 << 4 = 16", "4 & 1", "4 ^ 15"],
        ans: 0,
        exp: "(1 << 4) = 16 (10000). Subtracting 1 gives 15 (01111), which has 4 ones."
      }
    ]
  },

  10: {
    id: 10,
    name: "Subsets Using Bitmask",
    icon: "📦",
    goal: "Generate all 2^N subsets of an array by counting binary numbers from 0 to 2^N - 1.",
    useCases: [
      "LeetCode 78 (Subsets).",
      "Power set generation without recursion."
    ],
    template: `def generate_subsets(nums):
    n = len(nums)
    total = 1 << n
    subsets = []
    
    for mask in range(total):
        subset = []
        for i in range(n):
            if (mask >> i) & 1:
                subset.append(nums[i])
        subsets.append(subset)
    return subsets`,
    tips: [
      "Total number of subsets for N elements is 2^N.",
      "The i-th bit of mask determines whether `nums[i]` is included in the current subset."
    ],
    mistakes: [
      "Using recursive backtracking when simple iterative bitmasking is shorter and faster."
    ],
    quiz: [
      {
        q: "How many total subsets exist for an array of 3 elements?",
        options: ["8 (2^3)", "6", "3", "9"],
        ans: 0,
        exp: "Each element has 2 choices (include/exclude), so 2 * 2 * 2 = 8 subsets."
      }
    ]
  },

  11: {
    id: 11,
    name: "Bitwise AND / OR / XOR Range Operations",
    icon: "🌐",
    goal: "Evaluate bitwise operations across a range of numbers [left, right] efficiently.",
    useCases: [
      "LeetCode 201 (Bitwise AND of Numbers Range).",
      "XOR prefix queries."
    ],
    template: `def range_bitwise_and(left, right):
    shift = 0
    # Find common binary prefix of left and right
    while left < right:
        left >>= 1
        right >>= 1
        shift += 1
    return left << shift`,
    tips: [
      "In a range of consecutive numbers, lower bits flip frequently; only the common prefix remains unchanged after AND."
    ],
    mistakes: [
      "Looping through all numbers from left to right (takes O(N) time and will TLE for large ranges)."
    ],
    quiz: [
      {
        q: "What is the bitwise AND of range [5, 7] (5=101, 6=110, 7=111)?",
        options: ["100 (4)", "101 (5)", "111 (7)", "000 (0)"],
        ans: 0,
        exp: "5 & 6 & 7 = 101 & 110 & 111 = 100 = 4."
      }
    ]
  },

  12: {
    id: 12,
    name: "Reverse Bits & Bit Construction",
    icon: "🔄",
    goal: "Reverse the order of bits in a 32-bit integer or construct new binary values.",
    useCases: [
      "LeetCode 190 (Reverse Bits).",
      "LeetCode 476 (Number Complement).",
      "LeetCode 1342 (Number of Steps to Reduce a Number to Zero)."
    ],
    template: `def reverse_bits(n):
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res`,
    tips: [
      "Extract LSB using `n & 1`, shift `res` left by 1 and OR the LSB bit, then shift `n` right."
    ],
    mistakes: [
      "Not padding to full 32 bits (reversing 5 (101) to 101 instead of 32-bit reversal)."
    ],
    quiz: [
      {
        q: "What does `(res << 1) | (n & 1)` do in bit reversal?",
        options: [
          "Shifts output left to make room, then appends input's lowest bit",
          "Multiplies res by n",
          "Clears the highest bit",
          "Reverses the array"
        ],
        ans: 0,
        exp: "`res << 1` shifts previous bits left, making LSB 0. `| (n & 1)` sets LSB to the read bit."
      }
    ]
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PATTERNS_DATA;
}
