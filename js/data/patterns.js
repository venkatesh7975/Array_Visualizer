/* ==========================================================================
   ARRAY PATTERNS DATA — 12 MASTER PATTERNS METADATA & 120 QUIZ QUESTIONS + EXPLANATIONS
   ========================================================================== */

const PATTERNS_DATA = {
  1: {
    id: 1,
    name: "Array Traversal",
    icon: "🚶",
    goal: "Learn to iterate through an array and compute running info or filter/modify elements.",
    template: `for (let i = 0; i < nums.length; i++) {\n  // Process nums[i] with running variable\n  process(nums[i]);\n}`,
    useCases: [
      "Computing running aggregates (running sum, running product)",
      "Finding max/min elements or counting elements matching condition",
      "In-place element removal or modification using write pointer"
    ],
    tips: [
      "Keep track of running state variables initialized outside the loop.",
      "For in-place modifications (e.g. Remove Element/Duplicates), use a read-write dual index approach.",
      "Check boundary cases such as single element or empty arrays."
    ],
    mistakes: [
      "Off-by-one error: iterating up to `i <= nums.length` instead of `<`.",
      "Modifying array length while iterating forwards causing index skips.",
      "Not handling empty input arrays gracefully."
    ],
    quiz: [
      {
        q: "What is the time complexity of a single-pass array traversal on size N?",
        options: ["O(1)", "O(N)", "O(N log N)", "O(N²)"],
        ans: 1,
        exp: "Single-pass array traversal visits each of the N elements exactly once, taking O(N) linear time."
      },
      {
        q: "When modifying an array in-place while removing elements, what is the best strategy?",
        options: ["Create a duplicate array", "Use a write pointer `k` to overwrite elements", "Delete elements with `delete` operator", "Sort the array first"],
        ans: 1,
        exp: "A write pointer `k` tracks where the next valid element should be placed, allowing O(N) time and O(1) space in-place filtering."
      },
      {
        q: "In LeetCode 26 (Remove Duplicates from Sorted Array), how many pointers are typically used?",
        options: ["1", "2 (Read and Write pointers)", "3", "4"],
        ans: 1,
        exp: "A read pointer scans elements while a write pointer overwrites duplicate positions with unique values."
      },
      {
        q: "What happens if you use `i <= nums.length` in JavaScript during array traversal?",
        options: ["Code runs without errors", "Accesses `undefined` at index `nums.length`", "Throws a IndexOutOfBounds Exception immediately", "Infinite loop"],
        ans: 1,
        exp: "In JavaScript, arrays are 0-indexed up to `nums.length - 1`. Index `nums.length` evaluates to `undefined`."
      },
      {
        q: "How can you compute the total sum of an array in O(N) time and O(1) space?",
        options: ["Use a recursive accumulator", "Use a single loop with an accumulator variable", "Use a HashMap", "Sort the array"],
        ans: 1,
        exp: "Iterating through the array once while adding elements to a scalar sum variable takes O(N) time and O(1) auxiliary space."
      },
      {
        q: "What is the auxiliary space complexity of in-place array element filtering?",
        options: ["O(N)", "O(N²)", "O(1)", "O(log N)"],
        ans: 2,
        exp: "In-place modifications mutate the original input array directly without allocating extra array memory, achieving O(1) space."
      },
      {
        q: "In LeetCode 1672 (Richest Customer Wealth), if there are M customers and N banks, what is the time complexity?",
        options: ["O(M + N)", "O(M * N)", "O(N²)", "O(M²)"],
        ans: 1,
        exp: "We iterate through M customer rows and N bank columns, visiting all M * N cells exactly once."
      },
      {
        q: "What is the number of digits in integer X (X > 0)?",
        options: ["Math.floor(Math.log10(X)) + 1", "X.length", "Math.log2(X)", "X / 10"],
        ans: 0,
        exp: "Base-10 logarithm `Math.floor(Math.log10(X)) + 1` mathematically computes the exact digit count of positive integer X."
      },
      {
        q: "Why is modifying array length inside `for (let i=0; i<nums.length; i++)` dangerous?",
        options: ["It skips elements or alters loop termination dynamically", "It causes compiler crash", "It changes variable types", "No issue at all"],
        ans: 0,
        exp: "Splicing or modifying `nums.length` inside a forward loop alters index positions dynamically, leading to skipped elements or index out of bounds."
      },
      {
        q: "Which traversal direction is best when merging two sorted arrays into one from the end?",
        options: ["Forward from index 0", "Backward from the last index", "Random order", "Middle outwards"],
        ans: 1,
        exp: "Traversing backwards places the largest unmerged element into empty buffer slots at the back without overwriting unread elements."
      }
    ]
  },

  2: {
    id: 2,
    name: "Prefix Sum",
    icon: "➕",
    goal: "Precompute cumulative sums to enable O(1) subarray sum queries and avoid recalculating.",
    template: `let prefix = new Array(nums.length + 1).fill(0);\nfor (let i = 0; i < nums.length; i++) {\n  prefix[i + 1] = prefix[i] + nums[i];\n}\n// Subarray sum(L..R) = prefix[R + 1] - prefix[L]`,
    useCases: [
      "Range sum queries (sum of elements from index L to R)",
      "Finding pivot indices where sum(left) == sum(right)",
      "Subarray sum equals K (using Prefix Sum + HashMap)"
    ],
    tips: [
      "Prefix array size N+1 simplifies 0-indexed range calculations: sum(L..R) = prefix[R+1] - prefix[L].",
      "In-place prefix sum can save O(N) space if original array mutation is allowed.",
      "Combine with HashMap for O(N) detection of arbitrary target sum subarrays."
    ],
    mistakes: [
      "Index off-by-one errors when querying `prefix[R] - prefix[L-1]` without 1-based padding.",
      "Integer overflow when accumulating very large prefix values.",
      "Forgetting to initialize `prefixMap.set(0, 1)` when counting subarrays summing to K."
    ],
    quiz: [
      {
        q: "Given prefix sum array `P` (1-padded), how do you calculate subarray sum from index L to R?",
        options: ["P[R] - P[L]", "P[R + 1] - P[L]", "P[R] + P[L]", "P[R + 1] + P[L + 1]"],
        ans: 1,
        exp: "With 1-based padding, `P[R+1]` contains sum(0..R) and `P[L]` contains sum(0..L-1). Subtracting yields sum(L..R)."
      },
      {
        q: "What is the time complexity to answer Q range sum queries after precomputing prefix sum?",
        options: ["O(Q * N)", "O(N log N)", "O(N + Q)", "O(Q log N)"],
        ans: 2,
        exp: "Precomputation takes O(N) time once. Each of the Q queries is answered in O(1) time, giving total O(N + Q) time."
      },
      {
        q: "Why is a 1-padded prefix sum array of size N + 1 preferred?",
        options: ["It prevents negative numbers", "It avoids out-of-bounds checks when L = 0", "It doubles processing speed", "It saves memory"],
        ans: 1,
        exp: "`P[0] = 0` acts as a dummy base element, eliminating special `if (L == 0)` conditional branches."
      },
      {
        q: "In LeetCode 560 (Subarray Sum Equals K), what does `map.get(currSum - K)` represent?",
        options: ["The total array sum", "The number of previous prefix sums that yield subarray sum K", "The index of target K", "The max element"],
        ans: 1,
        exp: "If `currSum - prevSum = K`, then `prevSum = currSum - K`. Searching `currSum - K` in the map counts all subarrays ending at current index that sum to K."
      },
      {
        q: "Why must `map.set(0, 1)` be initialized in Prefix Sum + HashMap problems?",
        options: ["To account for subarrays starting at index 0", "To set map size", "To clear memory", "It is optional"],
        ans: 0,
        exp: "`map.set(0, 1)` represents an empty prefix with sum 0, allowing subarrays starting from index 0 (where `currSum == K`) to be counted."
      },
      {
        q: "In Pivot Index problem, what is the right-hand sum when leftSum is known?",
        options: ["totalSum - leftSum", "totalSum - leftSum - nums[i]", "leftSum + nums[i]", "totalSum / 2"],
        ans: 1,
        exp: "Right sum excludes pivot element `nums[i]`, so `rightSum = totalSum - leftSum - nums[i]`."
      },
      {
        q: "Can prefix sums handle negative numbers in the array?",
        options: ["No, only positive numbers", "Yes, cumulative sum works for negative numbers", "Only if array is sorted", "Only if length is even"],
        ans: 1,
        exp: "Cumulative addition mathematically holds for positive, negative, and zero values alike."
      },
      {
        q: "What is the space complexity of a standard precomputed prefix sum array?",
        options: ["O(1)", "O(N)", "O(N²)", "O(log N)"],
        ans: 1,
        exp: "A separate prefix array of size N + 1 requires O(N) auxiliary space."
      },
      {
        q: "How to compute 2D matrix range sum query in O(1)?",
        options: ["2D Prefix Sum matrix", "Double loop", "Binary Search", "DFS"],
        ans: 0,
        exp: "A 2D prefix sum matrix allows computing any subgrid sum using 4 corner lookups: `P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]`."
      },
      {
        q: "If nums = [2, 4, 1, 3], what is the 1-padded prefix sum array?",
        options: ["[0, 2, 6, 7, 10]", "[2, 6, 7, 10]", "[0, 2, 4, 1, 3]", "[10, 7, 6, 2, 0]"],
        ans: 0,
        exp: "Prefix sum starts with 0: P[0]=0, P[1]=2, P[2]=2+4=6, P[3]=6+1=7, P[4]=7+3=10."
      }
    ]
  },

  3: {
    id: 3,
    name: "Fixed Sliding Window",
    icon: "🪟",
    goal: "Maintain a contiguous window of fixed size K while sliding across the array.",
    template: `let windowSum = 0;\nfor (let i = 0; i < k; i++) windowSum += nums[i];\nfor (let i = k; i < nums.length; i++) {\n  windowSum += nums[i] - nums[i - k];\n  // Process current window\n}`,
    useCases: [
      "Maximum average subarray of length K",
      "Counting distinct elements or distinct characters in every window of size K",
      "Defuse bomb or moving average calculations"
    ],
    tips: [
      "Compute initial sum/frequency of the first window of size K.",
      "Slide window by adding incoming element `nums[i]` and subtracting outgoing element `nums[i-k]`.",
      "Time complexity remains O(N) regardless of window size K!"
    ],
    mistakes: [
      "Recalculating sum inside window using a loop (defeats the purpose, O(N*K)).",
      "Off-by-one error when subtracting outgoing element index.",
      "Not handling cases where array size N is less than window size K."
    ],
    quiz: [
      {
        q: "What operation transforms an O(N * K) brute-force sliding window into O(N)?",
        options: ["Sorting the array", "Subtracting `nums[i-k]` and adding `nums[i]` in O(1)", "Using recursion", "Using Binary Search"],
        ans: 1,
        exp: "Updating window state by removing outgoing `nums[i-k]` and adding incoming `nums[i]` takes O(1) time per step."
      },
      {
        q: "How many windows of size K exist in an array of length N (N >= K)?",
        options: ["N - K", "N - K + 1", "N * K", "K + 1"],
        ans: 1,
        exp: "Starting at index 0 up to index `N - K`, there are exactly `N - K + 1` valid window positions."
      },
      {
        q: "When sliding a fixed window of size K from index `i-1` to `i`, which element leaves the window?",
        options: ["nums[i]", "nums[i - k]", "nums[i + k]", "nums[0]"],
        ans: 1,
        exp: "The element at index `i - k` falls outside the left bound of the updated window."
      },
      {
        q: "What should be returned if array length N < window size K?",
        options: ["0 or null depending on requirements", "First element", "Full array sum", "Infinity"],
        ans: 0,
        exp: "If array length N is smaller than requested window K, no valid window can be formed."
      },
      {
        q: "What is the time complexity of Fixed Sliding Window on array of size N?",
        options: ["O(K)", "O(N)", "O(N * K)", "O(N log K)"],
        ans: 1,
        exp: "The window slides from left to right in a single pass of N steps."
      },
      {
        q: "In LeetCode 643 (Max Average Subarray I), how is max average derived from max sum?",
        options: ["maxSum * K", "maxSum / K", "maxSum - K", "maxSum + K"],
        ans: 1,
        exp: "Average of window of size K is `windowSum / K`. Finding max average is equivalent to `maxSum / K`."
      },
      {
        q: "Which data structure helps track max element in a sliding window of size K in O(1) per step?",
        options: ["Monotonic Deque", "Stack", "HashSet", "Binary Tree"],
        ans: 0,
        exp: "A monotonic double-ended queue maintains elements in decreasing order, yielding window max at front in O(1) amortized time."
      },
      {
        q: "In Fixed Sliding Window, does the window size change during iteration?",
        options: ["Yes, expands dynamically", "No, remains fixed at K", "Decreases to 1", "Random changes"],
        ans: 1,
        exp: "In Fixed Sliding Window, `right - left + 1` remains strictly equal to K at all times."
      },
      {
        q: "If nums = [1, 3, -1, -3, 5, 3, 6, 7] and K = 3, what is the sum of the first window?",
        options: ["3", "-1", "5", "7"],
        ans: 0,
        exp: "First window is `[1, 3, -1]`. Sum = 1 + 3 + (-1) = 3."
      },
      {
        q: "What space complexity is required for tracking running sum in fixed sliding window?",
        options: ["O(K)", "O(N)", "O(1)", "O(log N)"],
        ans: 2,
        exp: "Tracking a scalar sum variable takes O(1) constant auxiliary space."
      }
    ]
  },

  4: {
    id: 4,
    name: "Variable Sliding Window",
    icon: "📐",
    goal: "Expand right bound to satisfy condition, shrink left bound to optimize or restore validity.",
    template: `let left = 0;\nfor (let right = 0; right < nums.length; right++) {\n  // Add nums[right] to state\n  while (conditionIsInvalid) {\n    // Remove nums[left] from state\n    left++;\n  }\n  // Update max/min answer\n}`,
    useCases: [
      "Smallest subarray with sum >= S",
      "Longest substring without repeating characters",
      "Minimum window substring containing all target characters"
    ],
    tips: [
      "Use two pointers `left` and `right` starting at index 0.",
      "Outer loop expands `right`, inner loop shrinks `left` while condition holds/violates.",
      "Both pointers only move forward, guaranteeing O(N) amortized time complexity."
    ],
    mistakes: [
      "Shrinking `left` inside an `if` instead of a `while` loop when multiple shrinks are required.",
      "Forgetting to update tracked frequency map or window sum when incrementing `left`.",
      "Incorrectly updating global answer outside valid window boundaries."
    ],
    quiz: [
      {
        q: "Why is the total time complexity of a variable sliding window O(N)?",
        options: ["It uses quicksort internally", "Each pointer (left & right) traverses array elements at most once", "It runs in logarithmic time", "It uses parallel threads"],
        ans: 1,
        exp: "Both `left` and `right` pointers move forward only and visit each element at most once."
      },
      {
        q: "In LeetCode 209 (Min Size Subarray Sum), when do we shrink the left pointer?",
        options: ["When current sum < target", "When current sum >= target", "When right pointer reaches end", "Every 2 steps"],
        ans: 1,
        exp: "When window sum >= target, the condition is satisfied, so we record length and shrink `left` to search for smaller valid windows."
      },
      {
        q: "In Longest Substring Without Repeating Characters, what structure tracks character frequency?",
        options: ["HashMap or Array/Set", "Queue", "Stack", "Heap"],
        ans: 0,
        exp: "A Map or Set tracks unique character occurrences in the active window."
      },
      {
        q: "What is the length of a window bounded by indices `left` and `right` (0-indexed)?",
        options: ["right - left", "right - left + 1", "right + left", "right - left - 1"],
        ans: 1,
        exp: "Including both bounds `left` and `right`, count = `right - left + 1`."
      },
      {
        q: "In variable sliding window for MINIMUM length, when is the answer updated?",
        options: ["While condition is valid (inside shrink loop)", "When right reaches end", "At index 0", "Before expanding right"],
        ans: 0,
        exp: "For minimum length, we record answer while window is valid before shrinking left."
      },
      {
        q: "In variable sliding window for MAXIMUM length, when is the answer updated?",
        options: ["After restoring validity (outside shrink loop)", "Before expanding right", "Inside inner while loop only", "Never"],
        ans: 0,
        exp: "For maximum length, answer is recorded after shrinking `left` until window condition is valid."
      },
      {
        q: "What happens if you use `if` instead of `while` when shrinking `left`?",
        options: ["Window may remain invalid if multiple shrinks are needed", "Code runs faster", "No difference", "Compiler error"],
        ans: 0,
        exp: "Multiple `left++` steps may be required to restore validity; `if` only performs one shrink step."
      },
      {
        q: "What is the amortized number of steps taken by `left` pointer across full iteration?",
        options: ["N²", "At most N steps", "Log N", "N * K"],
        ans: 1,
        exp: "`left` starts at 0 and increments at most N times total."
      },
      {
        q: "In LeetCode 1004 (Max Consecutive Ones III), what condition triggers shrinking `left`?",
        options: ["Zero count > K", "Zero count < K", "Array sum == K", "Right pointer > N"],
        ans: 0,
        exp: "We can flip at most K zeros. If zero count exceeds K, window becomes invalid and `left` must advance."
      },
      {
        q: "What is the auxiliary space complexity when using a fixed 128-char ASCII frequency map for window?",
        options: ["O(N)", "O(1) (fixed 128 size)", "O(N²)", "O(log N)"],
        ans: 1,
        exp: "A fixed 128 ASCII array is constant size O(1) independent of input string length N."
      }
    ]
  },

  5: {
    id: 5,
    name: "Two Pointers",
    icon: "👉👈",
    goal: "Use two pointers moving inwards or at different speeds to process pairs or partitions.",
    template: `let left = 0, right = nums.length - 1;\nwhile (left < right) {\n  let current = nums[left] + nums[right];\n  if (current === target) return [left, right];\n  else if (current < target) left++;\n  else right--;\n}`,
    useCases: [
      "Two Sum II (Sorted input array)",
      "Container With Most Water (Trapping water bounds)",
      "3Sum / 4Sum (Sort + Two Pointers)",
      "Partitioning arrays (Sort Colors / Dutch National Flag)"
    ],
    tips: [
      "Inward two pointers require sorted array or monotonic greedy property (e.g. water area).",
      "For 3Sum, sort first, fix element `i`, then run two pointers on remaining subarray.",
      "Skip duplicate values during pointer increments to avoid duplicate result triplets."
    ],
    mistakes: [
      "Applying inward two pointers on unsorted array without sorting first.",
      "Infinite while-loop from forgetting pointer increment/decrement step.",
      "Overstepping `left >= right` boundary."
    ],
    quiz: [
      {
        q: "In Two Sum II (Sorted Array), if current sum < target, which pointer should move?",
        options: ["Move right pointer left (right--)", "Move left pointer right (left++)", "Move both pointers", "Reset left pointer"],
        ans: 1,
        exp: "Since array is sorted ascending, moving `left` right increases the sum toward target."
      },
      {
        q: "Why must the array be sorted for two-pointer search (Two Sum II)?",
        options: ["Sorting guarantees sum monotonicity when moving pointers", "Sorting makes array smaller", "Two pointers don't work on numbers", "Sorting is required by compiler"],
        ans: 0,
        exp: "Sorted order guarantees that moving `left++` strictly increases sum and `right--` strictly decreases sum."
      },
      {
        q: "In Container With Most Water (LeetCode 11), which pointer is moved at each step?",
        options: ["Pointer with smaller height", "Pointer with larger height", "Always left", "Always right"],
        ans: 0,
        exp: "Area is limited by smaller height. Moving larger height can only decrease width without increasing height limit."
      },
      {
        q: "What is the time complexity of 3Sum using Sorting + Two Pointers?",
        options: ["O(N³)", "O(N²)", "O(N log N)", "O(N)"],
        ans: 1,
        exp: "Sorting takes O(N log N). Outer loop runs N times, inner two pointers run in O(N). Total = O(N²)."
      },
      {
        q: "In 3Sum, how do you avoid duplicate triplets in the output?",
        options: ["Use HashSet or skip identical adjacent values `nums[i] === nums[i-1]`", "Sort backward", "Delete duplicate elements", "Run 3 nested loops"],
        ans: 0,
        exp: "Skipping identical adjacent elements after processing avoids producing identical triplets."
      },
      {
        q: "In Move Zeroes (LeetCode 283), what do the read and write pointers track?",
        options: ["Read tracks non-zero elements, write tracks position to place next non-zero", "Both track zeros", "Read tracks end, write tracks start", "Binary search bounds"],
        ans: 0,
        exp: "Read pointer scans array; when non-zero is found, write pointer places it at current non-zero boundary."
      },
      {
        q: "In Dutch National Flag problem (Sort Colors), how many pointers are used?",
        options: ["1", "2", "3 (low, mid, high)", "4"],
        ans: 2,
        exp: "`low` tracks boundary of 0s, `mid` scans current element, `high` tracks boundary of 2s."
      },
      {
        q: "What is the area formula bounded by height[L] and height[R] at distance (R - L)?",
        options: ["Math.min(height[L], height[R]) * (R - L)", "height[L] * height[R]", "(height[L] + height[R]) * (R - L)", "Math.max(height[L], height[R]) * (R - L)"],
        ans: 0,
        exp: "Water height is bottlenecked by `Math.min(h[L], h[R])` multiplied by width `(R - L)`."
      },
      {
        q: "In Trapping Rain Water (LeetCode 42), what determines trapped water at index i?",
        options: ["Math.min(leftMax, rightMax) - height[i]", "height[i] - leftMax", "leftMax + rightMax", "height[i] * 2"],
        ans: 0,
        exp: "Trapped water at i is limited by lower of left and right peak walls minus current ground height."
      },
      {
        q: "What is the space complexity of inward two pointers on an array?",
        options: ["O(N)", "O(1)", "O(N²)", "O(log N)"],
        ans: 1,
        exp: "Two integer pointer variables require O(1) constant auxiliary space."
      }
    ]
  },

  6: {
    id: 6,
    name: "Binary Search",
    icon: "🔍",
    goal: "Divide search space in half each step on sorted or monotonic search domains.",
    template: `let low = 0, high = nums.length - 1;\nwhile (low <= high) {\n  let mid = Math.floor(low + (high - low) / 2);\n  if (nums[mid] === target) return mid;\n  else if (nums[mid] < target) low = mid + 1;\n  else high = mid - 1;\n}`,
    useCases: [
      "Searching target in sorted array in O(log N)",
      "Search Insert Position / Lower & Upper bound search",
      "Binary Search on Answer Range (Koko Eating Bananas, Capacity to Ship Packages)"
    ],
    tips: [
      "Use `low + Math.floor((high - low) / 2)` to prevent integer overflow.",
      "Identify the search space monotonicity condition (e.g., `feasible(mid) === true`).",
      "Carefully choose boundary conditions (`low <= high` vs `low < high`)."
    ],
    mistakes: [
      "Integer overflow with `(low + high) / 2` in languages with 32-bit integer limits.",
      "Infinite loop when `low = mid` without integer floor / ceiling division.",
      "Confusing boundary updates between `low = mid + 1` and `high = mid - 1`."
    ],
    quiz: [
      {
        q: "What is the worst-case number of comparisons for binary search on N = 1,000,000 elements?",
        options: ["1,000,000", "500,000", "~20 comparisons", "~100 comparisons"],
        ans: 2,
        exp: "log2(1,000,000) ≈ 19.93, requiring at most 20 comparisons."
      },
      {
        q: "Why is `low + Math.floor((high - low) / 2)` preferred over `(low + high) / 2`?",
        options: ["Prevents integer overflow in 32-bit environments", "Runs faster on GPU", "It works for negative numbers only", "Syntax requirement"],
        ans: 0,
        exp: "In languages with 32-bit integer limits, `low + high` can overflow max integer value 2^31 - 1."
      },
      {
        q: "If target is not found in Search Insert Position (LC 35), what index does `low` point to?",
        options: ["Target insertion position index", "-1", "Last element index", "0"],
        ans: 0,
        exp: "When search loop terminates with `low > high`, `low` points to the exact sorted position where target belongs."
      },
      {
        q: "In Rotated Sorted Array (LC 33), how do you determine which half is sorted?",
        options: ["Compare `nums[low] <= nums[mid]`", "Check if `mid` is even", "Sort the array first", "Check `nums[0] == target`"],
        ans: 0,
        exp: "If `nums[low] <= nums[mid]`, the left subarray `[low..mid]` is strictly sorted."
      },
      {
        q: "What is Binary Search on Answer Range?",
        options: ["Searching over range of possible answer values [minSpeed..maxSpeed] using feasibility check", "Binary searching target array indices", "Searching 2D matrix", "Searching string length"],
        ans: 0,
        exp: "Instead of searching array indices, binary search tests candidate solution values over a monotonic boolean domain."
      },
      {
        q: "In Koko Eating Bananas (LC 875), what is the search range for speed K?",
        options: ["1 to max(piles)", "0 to len(piles)", "1 to 100", "piles sum"],
        ans: 0,
        exp: "Minimum possible eating speed is 1 banana/hr, maximum needed is `max(piles)` bananas/hr."
      },
      {
        q: "What is the time complexity of Binary Search?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        ans: 1,
        exp: "The search space size N is halved at every iteration step."
      },
      {
        q: "What condition terminates `while (low <= high)`?",
        options: ["`low > high`", "`low == high`", "`mid == 0`", "`high == 0`"],
        ans: 0,
        exp: "Loop terminates when pointers cross (`low > high`), meaning search space is exhausted."
      },
      {
        q: "In Peak Element (LC 162), if `nums[mid] < nums[mid + 1]`, where is a peak guaranteed?",
        options: ["In the right half (`low = mid + 1`)", "In the left half", "At index 0", "No peak exists"],
        ans: 0,
        exp: "Since numbers increase from mid to mid+1, an ascending slope guarantees at least one peak exists to the right."
      },
      {
        q: "What is the prerequisite condition for standard binary search on array?",
        options: ["Array must be sorted or monotonic", "Array size must be power of 2", "All numbers positive", "No duplicates"],
        ans: 0,
        exp: "Binary search requires monotonicity to discard half of search space each step."
      }
    ]
  },

  7: {
    id: 7,
    name: "Kadane's Algorithm",
    icon: "📈",
    goal: "Find maximum contiguous subarray sum by deciding whether to extend or restart at each step.",
    template: `let maxSoFar = nums[0], currMax = nums[0];\nfor (let i = 1; i < nums.length; i++) {\n  currMax = Math.max(nums[i], currMax + nums[i]);\n  maxSoFar = Math.max(maxSoFar, currMax);\n}`,
    useCases: [
      "Maximum Subarray Sum (LeetCode 53)",
      "Best Time to Buy and Sell Stock (Derivative of prefix difference)",
      "Maximum Product Subarray (Tracking both min and max for negative flips)"
    ],
    tips: [
      "At index `i`, decide: is it better to add `nums[i]` to existing `currMax`, or start fresh from `nums[i]`?",
      "For Maximum Product Subarray, track both `currMax` and `currMin` because negative * negative = positive!",
      "Kadane works in O(N) time and O(1) space."
    ],
    mistakes: [
      "Initializing `maxSoFar = 0` when all elements in array are negative (returns 0 instead of max negative).",
      "Confusing Kadane's algorithm with sliding window when negative numbers are present.",
      "Not handling circular array edge cases in Maximum Circular Subarray."
    ],
    quiz: [
      {
        q: "If nums = [-2, -3, -1], what should Kadane's algorithm return?",
        options: ["0", "-1", "-6", "-2"],
        ans: 1,
        exp: "When all elements are negative, max single element sum is max negative value (-1)."
      },
      {
        q: "What key decision is made at index `i` in Kadane's algorithm?",
        options: ["Restart subarray at `nums[i]` OR extend current sum `currMax + nums[i]`", "Skip element", "Sort remaining elements", "Divide by 2"],
        ans: 0,
        exp: "`currMax = Math.max(nums[i], currMax + nums[i])` chooses between starting fresh or extending."
      },
      {
        q: "What is the time and space complexity of Kadane's algorithm?",
        options: ["Time: O(N), Space: O(1)", "Time: O(N²), Space: O(1)", "Time: O(N), Space: O(N)", "Time: O(N log N), Space: O(1)"],
        ans: 0,
        exp: "Kadane executes in a single pass of N steps requiring O(1) auxiliary variables."
      },
      {
        q: "In Maximum Product Subarray (LC 152), why must we track `currMin` alongside `currMax`?",
        options: ["Negative number multiplied by `currMin` can become new `currMax`", "Product is always positive", "To prevent overflow", "For sorting"],
        ans: 0,
        exp: "Multiplying a negative number by a negative `currMin` yields a positive product."
      },
      {
        q: "In Maximum Product Subarray, what happens to `currMax` and `currMin` when `nums[i] < 0`?",
        options: ["Swap `currMax` and `currMin` before multiplying", "Set both to 0", "Ignore element", "Square `currMax`"],
        ans: 0,
        exp: "Negative multiplier flips maximum into minimum and minimum into maximum."
      },
      {
        q: "In Best Time to Buy and Sell Stock (LC 121), what variable is maintained alongside max profit?",
        options: ["Minimum price seen so far (`minPrice`)", "Maximum price seen so far", "Average price", "Stock count"],
        ans: 0,
        exp: "At each day, profit is `price[i] - minPrice`, updating `minPrice = Math.min(minPrice, price[i])`."
      },
      {
        q: "In Maximum Circular Subarray (LC 918), what formula handles the circular wrapping max sum?",
        options: ["Math.max(maxKadane, totalSum - minKadane)", "totalSum * 2", "maxKadane + minKadane", "totalSum / maxKadane"],
        ans: 0,
        exp: "Wrapping max sum equals `totalSum - minSubarraySum`."
      },
      {
        q: "If all elements in array are negative, what does `totalSum - minKadane` equal?",
        options: ["0 (Special edge case: return maxKadane instead)", "Positive sum", "Infinity", "Total sum"],
        ans: 0,
        exp: "When all elements are negative, `totalSum - minKadane = 0` (empty array), so return standard `maxKadane`."
      },
      {
        q: "If nums = [1, 2, 3, -2, 5], what is the maximum subarray sum?",
        options: ["9", "6", "5", "8"],
        ans: 0,
        exp: "Contiguous subarray `[1, 2, 3, -2, 5]` sums to 1 + 2 + 3 - 2 + 5 = 9."
      },
      {
        q: "Why does standard sliding window fail on Maximum Subarray with negative numbers?",
        options: ["Adding negative numbers shrinks sum breaking window monotonicity", "Sliding window is too slow", "Syntax errors", "Only works on strings"],
        ans: 0,
        exp: "Sliding window relies on monotonic expansion/shrinkage; negative numbers break sum monotonicity."
      }
    ]
  },

  8: {
    id: 8,
    name: "HashMap Pattern",
    icon: "🗺️",
    goal: "Trade space O(N) for time O(1) by caching element values, frequencies, or indices.",
    template: `let map = new Map();\nfor (let i = 0; i < nums.length; i++) {\n  let complement = target - nums[i];\n  if (map.has(complement)) return [map.get(complement), i];\n  map.set(nums[i], i);\n}`,
    useCases: [
      "Two Sum (Store complement value -> index)",
      "Contains Duplicate / Frequency count / Majority Element",
      "Longest Consecutive Sequence (HashSet for O(1) boundary check)"
    ],
    tips: [
      "Use `Map` or `Set` for O(1) average lookup time.",
      "Store `Value -> Index` when position matters, or `Value -> Frequency` when counts matter.",
      "In LeetCode 1 (Two Sum), check complement BEFORE setting `map.set(nums[i], i)` to avoid self-pairing!"
    ],
    mistakes: [
      "Inserting into map before checking complement, causing self-matching errors (e.g. [3], target=6 -> [0,0]).",
      "Using objects with non-string keys in JS without proper type conversion.",
      "Ignoring map memory overhead when auxiliary space is constrained."
    ],
    quiz: [
      {
        q: "Why is HashMap single-pass Two Sum faster than double-loop brute force?",
        options: ["It sorts the array", "It replaces O(N) inner scan with O(1) map lookup", "It uses multi-threading", "It reduces array size"],
        ans: 1,
        exp: "HashMap provides O(1) average lookup time, reducing time complexity from O(N²) to O(N)."
      },
      {
        q: "In LeetCode 1 (Two Sum), why check complement BEFORE `map.set(nums[i], i)`?",
        options: ["Prevents matching element with itself", "Saves memory", "Required by JS Map API", "Avoids negative numbers"],
        ans: 0,
        exp: "If you set map first, `nums[i] = 3` with `target = 6` matches key 3 in map and returns `[i, i]` erroneously."
      },
      {
        q: "In Contains Duplicate (LC 217), what data structure gives O(N) time and O(N) space?",
        options: ["HashSet", "Queue", "Stack", "Binary Tree"],
        ans: 0,
        exp: "A HashSet detects duplicate elements in O(1) average lookup time."
      },
      {
        q: "In Majority Element (Boyer-Moore Voting), what space complexity is achieved without HashMap?",
        options: ["O(1) Space", "O(N) Space", "O(N²) Space", "O(log N) Space"],
        ans: 0,
        exp: "Boyer-Moore Voting tracks candidate and count in O(1) auxiliary space."
      },
      {
        q: "In Longest Consecutive Sequence (LC 128), how do you check if number `x` is start of sequence?",
        options: ["Check if `set.has(x - 1)` is false", "Check if `x == 0`", "Check if `x` is even", "Check if `set.has(x + 1)`"],
        ans: 0,
        exp: "If `x - 1` does not exist in set, `x` is guaranteed to be the starting boundary of a consecutive sequence."
      },
      {
        q: "What is the average time complexity for HashMap `.has()` and `.get()` operations?",
        options: ["O(1)", "O(N)", "O(log N)", "O(N²)"],
        ans: 0,
        exp: "Hash table bucket index calculation yields O(1) average constant time."
      },
      {
        q: "What worst-case time complexity occurs in HashMap with high hash collisions?",
        options: ["O(N)", "O(1)", "O(N log N)", "O(N³)"],
        ans: 0,
        exp: "If all keys hash to the same bucket, lookup degrades to O(N) linear scan."
      },
      {
        q: "In Top K Frequent Elements (LC 347), what structure gets top K after frequency counting in O(N log K)?",
        options: ["Min-Heap / Bucket Sort", "Queue", "LinkedList", "Stack"],
        ans: 0,
        exp: "A Min-Heap of size K maintains top K highest frequencies."
      },
      {
        q: "What is stored as key and value in Two Sum HashMap?",
        options: ["Key: Number Value, Value: Array Index", "Key: Array Index, Value: Target", "Key: Target, Value: Sum", "Key: Pair, Value: Count"],
        ans: 0,
        exp: "Map stores `Number Value -> Index` so complement lookup instantly returns original index."
      },
      {
        q: "How to check if two strings are Anagrams using HashMap?",
        options: ["Compare character frequency counts map of both strings", "Compare string lengths only", "Reverse strings", "Check first char"],
        ans: 0,
        exp: "Anagrams contain identical character frequencies."
      }
    ]
  },

  9: {
    id: 9,
    name: "Matrix Traversal",
    icon: "🧱",
    goal: "Navigate 2D grid dimensions using row/col index bounds or direction vectors.",
    template: `let rows = grid.length, cols = grid[0].length;\nfor (let r = 0; r < rows; r++) {\n  for (let c = 0; c < cols; c++) {\n    // Process grid[r][c]\n  }\n}`,
    useCases: [
      "Rotate Image 90 degrees (Transpose + Reverse rows)",
      "Spiral Matrix traversal (Maintain top, bottom, left, right boundary pointers)",
      "Set Matrix Zeroes / Search 2D Matrix"
    ],
    tips: [
      "Map 2D matrix (r, c) to 1D index: `index = r * cols + c` for binary search.",
      "Transpose matrix: swap `matrix[r][c]` with `matrix[c][r]` for `c > r`.",
      "For Spiral traversal, shrink boundaries `top++`, `bottom--`, `left++`, `right--` step-by-step."
    ],
    mistakes: [
      "Confusing rows `grid.length` and cols `grid[0].length` in non-square matrices.",
      "Swapping elements twice during matrix transpose, restoring original state.",
      "Out of bounds index access `grid[r][c]` without validating `r >= 0 && r < rows`."
    ],
    quiz: [
      {
        q: "How to rotate an N x N matrix 90 degrees clockwise in-place?",
        options: ["Reverse rows then Transpose", "Transpose then Reverse each row", "Shift all elements right", "Reverse columns"],
        ans: 1,
        exp: "Transposing converts rows to columns; reversing each row flips orientation clockwise 90 degrees."
      },
      {
        q: "What is Transposing a matrix?",
        options: ["Swapping `matrix[i][j]` with `matrix[j][i]`", "Reversing columns", "Multiplying by 2", "Sorting rows"],
        ans: 0,
        exp: "Transposing reflects matrix elements across main diagonal `(i == j)`."
      },
      {
        q: "In Search a 2D Matrix (LC 74), how to map 1D mid index to 2D (r, c) for M x N matrix?",
        options: ["r = Math.floor(mid / N), c = mid % N", "r = mid % M, c = mid / M", "r = mid * N, c = mid", "r = mid, c = mid"],
        ans: 0,
        exp: "`mid / N` gives row index; `mid % N` gives column index."
      },
      {
        q: "In Spiral Matrix (LC 54), how many boundary pointers are maintained?",
        options: ["4 (top, bottom, left, right)", "2", "1", "6"],
        ans: 0,
        exp: "Four boundary pointers shrink grid bounds step-by-step as perimeter is traversed."
      },
      {
        q: "In Set Matrix Zeroes (LC 73), how to achieve O(1) auxiliary space?",
        options: ["Use first row and first column of matrix as markers", "Use extra M x N matrix", "Sort matrix", "Use recursion"],
        ans: 0,
        exp: "Using cell `(0, c)` and `(r, 0)` avoids allocating external space."
      },
      {
        q: "What is the total element count in an M x N matrix?",
        options: ["M * N", "M + N", "2 * (M + N)", "M^N"],
        ans: 0,
        exp: "M rows containing N elements each equals M * N total cells."
      },
      {
        q: "In Flood Fill (LC 733), what algorithm is used to visit connected cells?",
        options: ["DFS or BFS traversal", "Binary Search", "Kadane's Algorithm", "Two Pointers"],
        ans: 0,
        exp: "Depth-First Search or Breadth-First Search traverses adjacent grid cells."
      },
      {
        q: "What condition validates 4-directional cell `(r, c)` inside grid bounds?",
        options: ["`r >= 0 && r < rows && c >= 0 && c < cols`", "`r == c`", "`r + c == 0`", "`r > cols`"],
        ans: 0,
        exp: "Valid cells must satisfy non-negative index lower bounds and strict upper bounds."
      },
      {
        q: "How to rotate matrix 90 degrees COUNTER-clockwise?",
        options: ["Transpose then Reverse columns (or Reverse each row then Transpose)", "Transpose only", "Reverse matrix", "Shift left"],
        ans: 0,
        exp: "Reversing each row before transposing produces counter-clockwise 90 degree rotation."
      },
      {
        q: "What is the time complexity to traverse all elements in an M x N matrix?",
        options: ["O(M * N)", "O(M + N)", "O(N²)", "O(log(M*N))"],
        ans: 0,
        exp: "Visiting every grid cell takes linear O(M * N) time."
      }
    ]
  },

  10: {
    id: 10,
    name: "Simulation",
    icon: "🎮",
    goal: "Model exact step-by-step state changes according to problem rules.",
    template: `let state = initialState;\nfor (let step of operations) {\n  state = updateState(state, step);\n  // Maintain invariants\n}`,
    useCases: [
      "Rotate Array by K steps",
      "Merge Sorted Array in-place (Three pointers backwards)",
      "Pascal's Triangle generation / Baseball Game score tracker"
    ],
    tips: [
      "For Rotate Array by K, reduce `k = k % N` and use 3-step reverse technique!",
      "For Merge Sorted Array, work BACKWARDS from index `m + n - 1` to avoid overwriting elements.",
      "Keep track of explicit simulation rules using stack or helper data structures."
    ],
    mistakes: [
      "Forgetting `k = k % N` when K is greater than array size N.",
      "Modifying array from front during backwards merge simulation.",
      "Not handling edge cases like empty operations list."
    ],
    quiz: [
      {
        q: "What is the 3-step reverse algorithm to rotate an array right by K steps in O(1) space?",
        options: ["Reverse full, reverse 0..k-1, reverse k..N-1", "Reverse 0..k-1, reverse full, reverse k..N-1", "Sort, Reverse, Shift", "Reverse twice"],
        ans: 0,
        exp: "Reversing full array, then reversing first K elements and remaining N-K elements rotates array in O(1) space."
      },
      {
        q: "Why reduce `k = k % N` before rotating an array of size N by K steps?",
        options: ["Rotating by N steps returns array to original order", "To prevent negative K", "Required by JS", "To increase speed"],
        ans: 0,
        exp: "Rotating N times yields original array. Effective shift is `K mod N`."
      },
      {
        q: "In Merge Sorted Array (LC 88), why work backwards from index `m + n - 1`?",
        options: ["Avoids overwriting unmerged elements in nums1", "Runs in O(1) time", "Required for sorting", "Prevents overflow"],
        ans: 0,
        exp: "Back of nums1 contains empty buffer slots, permitting backwards merge without element destruction."
      },
      {
        q: "In Pascal's Triangle (LC 118), how is cell `row[i][j]` calculated from previous row?",
        options: ["`row[i-1][j-1] + row[i-1][j]`", "`row[i-1][j] * 2`", "`row[i][j-1] + 1`", "Sum of full row"],
        ans: 0,
        exp: "Pascal's triangle adds top-left and top-right elements from preceding row."
      },
      {
        q: "In Baseball Game (LC 682), which data structure handles record operations (+, D, C)?",
        options: ["Stack", "Queue", "Heap", "Binary Tree"],
        ans: 0,
        exp: "Operations act on recent scores, matching Last-In-First-Out (LIFO) stack order."
      },
      {
        q: "What does operation 'C' do in Baseball Game simulation?",
        options: ["Invalidate/pop previous score from stack", "Double previous score", "Sum last two scores", "Clear all"],
        ans: 0,
        exp: "'C' cancels and pops the most recent score from score stack."
      },
      {
        q: "What does operation 'D' do in Baseball Game simulation?",
        options: ["Double previous score and push to stack", "Delete score", "Divide by 2", "Decrement"],
        ans: 0,
        exp: "'D' computes 2 * top score and pushes it to stack."
      },
      {
        q: "What is the time complexity of 3-step reverse array rotation?",
        options: ["O(N)", "O(N * K)", "O(N²)", "O(log N)"],
        ans: 0,
        exp: "Three array reversal steps visit 2N elements total, taking O(N) time."
      },
      {
        q: "In Parking System (LC 1603), how to track available slots for 3 car types?",
        options: ["Array/Variables counting slots per type [big, medium, small]", "HashSet", "Matrix", "Binary Search"],
        ans: 0,
        exp: "Simple count variables track slot availability per car type."
      },
      {
        q: "What is the auxiliary space complexity of 3-step reverse array rotation?",
        options: ["O(1)", "O(N)", "O(K)", "O(N²)"],
        ans: 0,
        exp: "In-place element swapping takes O(1) constant auxiliary space."
      }
    ]
  },

  11: {
    id: 11,
    name: "Sorting + Arrays",
    icon: "📊",
    goal: "Sort array first to bring order, structure, or greedy choice opportunities.",
    template: `nums.sort((a, b) => a - b);\n// Apply linear scan, two pointers, or interval merging\nfor (let i = 0; i < nums.length; i++) {\n  // Exploit sorted structure\n}`,
    useCases: [
      "Merge Intervals / Non-overlapping intervals",
      "Sort Colors (Dutch National Flag algorithm in O(N) single pass)",
      "Largest Number custom sort comparator"
    ],
    tips: [
      "Sorting takes O(N log N) time, making subsequent operations like binary search or linear scans simple.",
      "For Merge Intervals, sort by interval start time first, then merge overlapping intervals.",
      "For Dutch National Flag (Sort Colors), use 3 pointers: `low`, `mid`, `high`."
    ],
    mistakes: [
      "JS `array.sort()` defaults to lexicographical string sort (e.g. [10, 2] -> [10, 2]), always pass `(a,b) => a - b`!",
      "Forgetting to handle custom sort tie-breaker conditions.",
      "Mutating original input array when non-mutation is expected."
    ],
    quiz: [
      {
        q: "What does default `[10, 2, 5].sort()` return in JavaScript if no comparator is passed?",
        options: ["[2, 5, 10]", "[10, 2, 5]", "[10, 5, 2]", "Error"],
        ans: 1,
        exp: "Default JavaScript `.sort()` converts numbers to strings: \"10\" comes before \"2\" lexicographically."
      },
      {
        q: "In Merge Intervals (LC 56), what primary criteria should intervals be sorted by?",
        options: ["Interval start time `a[0] - b[0]`", "Interval end time", "Interval length", "Random order"],
        ans: 0,
        exp: "Sorting by start time guarantees overlapping intervals appear adjacently."
      },
      {
        q: "When do two intervals `[a, b]` and `[c, d]` overlap (assuming `a <= c`)?",
        options: ["`c <= b`", "`c > b`", "`a == d`", "`b == c`"],
        ans: 0,
        exp: "If next interval start `c` is less than or equal to current end `b`, intervals overlap."
      },
      {
        q: "In Dutch National Flag (Sort Colors LC 75), what is the time complexity?",
        options: ["O(N) single pass", "O(N log N)", "O(N²)", "O(1)"],
        ans: 0,
        exp: "3-pointer partition sorts 0s, 1s, and 2s in a single O(N) pass."
      },
      {
        q: "In Largest Number (LC 179), how to compare two numbers A and B as strings?",
        options: ["Compare `(B + A)` vs `(A + B)` lexicographically", "Compare `A - B`", "Compare length only", "Sort ascending"],
        ans: 0,
        exp: "String concatenation comparison `(B + A)` vs `(A + B)` determines largest combined number representation."
      },
      {
        q: "In Assign Cookies (LC 455), why sort both children greed array and cookies size array?",
        options: ["To match smallest cookie satisfying smallest child greed", "To reverse arrays", "Required for binary search", "To remove duplicates"],
        ans: 0,
        exp: "Greedy matching pairs minimal satisfying cookies with smallest greed children."
      },
      {
        q: "What is the optimal time complexity of comparison-based sorting algorithms (Quicksort, Mergesort)?",
        options: ["O(N log N)", "O(N)", "O(N²)", "O(log N)"],
        ans: 0,
        exp: "Comparison sorting lower bound proof shows minimum O(N log N) time complexity."
      },
      {
        q: "In Relative Sort Array (LC 1122), how to order elements appearing in arr2 first?",
        options: ["Frequency map / Counting sort based on arr2 order", "Standard sort", "Reverse arr1", "Binary search"],
        ans: 0,
        exp: "Counting frequencies of arr1 elements allows placing them according to arr2 order."
      },
      {
        q: "In Merge Intervals, how to merge interval `curr` into `lastMerged` if overlapping?",
        options: ["`lastMerged[1] = Math.max(lastMerged[1], curr[1])`", "`lastMerged[1] = curr[1]`", "`lastMerged[0] = curr[0]`", "Delete lastMerged"],
        ans: 0,
        exp: "Merged end time expands to maximum end boundary of overlapping intervals."
      },
      {
        q: "What non-comparison sorting algorithm sorts integers in O(N + K) time?",
        options: ["Counting Sort / Radix Sort", "Quicksort", "Mergesort", "Heapsort"],
        ans: 0,
        exp: "Counting sort uses array bucket frequencies to achieve linear O(N + K) time."
      }
    ]
  },

  12: {
    id: 12,
    name: "Greedy Arrays",
    icon: "💎",
    goal: "Make locally optimal choices at each step to reach a global optimum.",
    template: `let maxReach = 0;\nfor (let i = 0; i < nums.length; i++) {\n  if (i > maxReach) return false; // Cannot proceed\n  maxReach = Math.max(maxReach, i + nums[i]);\n}\nreturn maxReach >= nums.length - 1;`,
    useCases: [
      "Jump Game / Jump Game II (Track maximum reachable boundary)",
      "Gas Station (Track current tank and total deficit)",
      "Minimum Number of Arrows to Burst Balloons (Interval end greedy choice)"
    ],
    tips: [
      "In Jump Game, continuously update `maxReach = Math.max(maxReach, i + nums[i])`.",
      "In Gas Station, if total gas >= total cost, a solution is guaranteed to exist!",
      "Prove greedy choice property by demonstrating that locally optimal move never impedes global solution."
    ],
    mistakes: [
      "Attempting Dynamic Programming when O(N) Greedy strategy is sufficient.",
      "Forgetting to verify if global feasibility is met (e.g. `totalGas < totalCost`).",
      "Overlooking edge case when starting index is at the last element."
    ],
    quiz: [
      {
        q: "In Jump Game (LeetCode 55), if at index `i` we have `i > maxReach`, what does it imply?",
        options: ["We reached the end", "Index `i` is unreachable, return false", "Jump forward", "Reset maxReach"],
        ans: 1,
        exp: "If current position `i` exceeds furthest reachable index `maxReach`, remaining array cannot be reached."
      },
      {
        q: "In Jump Game (LC 55), what is the recurrence for updating `maxReach` at index `i`?",
        options: ["`maxReach = Math.max(maxReach, i + nums[i])`", "`maxReach += nums[i]`", "`maxReach = nums[i]`", "`maxReach = i`"],
        ans: 0,
        exp: "At index i, maximum reach expands to furthest reachable boundary `i + nums[i]`."
      },
      {
        q: "In Jump Game II (LC 45), when do we increment the jump count?",
        options: ["When current index `i` reaches `currentJumpEnd`", "At every step", "When maxReach changes", "At index 0"],
        ans: 0,
        exp: "When i reaches end of current jump range, a jump must be taken, advancing boundary to `maxReach`."
      },
      {
        q: "In Gas Station (LC 134), what condition guarantees a valid starting station exists?",
        options: ["`sum(gas) >= sum(cost)`", "`gas[0] > cost[0]`", "`gas.length == cost.length`", "`max(gas) > max(cost)`"],
        ans: 0,
        exp: "If total gas accumulated >= total cost needed, circular route completion is mathematically guaranteed."
      },
      {
        q: "In Gas Station, if running tank drops below 0 at station `i`, where should next start station be set?",
        options: ["`i + 1`", "`0`", "`i - 1`", "Remain unchanged"],
        ans: 0,
        exp: "No station between start and i can complete route; next potential start must be `i + 1`."
      },
      {
        q: "In Candy (LC 135), why are two passes (left-to-right and right-to-left) used?",
        options: ["To satisfy higher rating neighbor conditions on both left and right sides", "To double candies", "To sort children", "For binary search"],
        ans: 0,
        exp: "Left pass satisfies `ratings[i] > ratings[i-1]`; right pass satisfies `ratings[i] > ratings[i+1]`."
      },
      {
        q: "In Minimum Number of Arrows to Burst Balloons (LC 452), how to sort balloon intervals?",
        options: ["Sort by end coordinate `a[1] - b[1]`", "Sort by start coordinate", "Sort by length", "Random order"],
        ans: 0,
        exp: "Sorting by end coordinate shoots arrow at earliest balloon end position."
      },
      {
        q: "When a balloon start `interval[0]` is greater than current arrow position, what to do?",
        options: ["Shoot a new arrow and update arrow position to `interval[1]`", "Ignore balloon", "Move backward", "Stop"],
        ans: 0,
        exp: "Balloon starts after previous arrow line; a new arrow is required at `interval[1]`."
      },
      {
        q: "What is the time complexity of Jump Game (LC 55) greedy single pass?",
        options: ["O(N)", "O(N²)", "O(2^N)", "O(N log N)"],
        ans: 0,
        exp: "Greedy single pass visits N elements in linear O(N) time."
      },
      {
        q: "What is the space complexity of greedy array decision algorithms?",
        options: ["O(1)", "O(N)", "O(N²)", "O(log N)"],
        ans: 0,
        exp: "Greedy state variables (e.g. maxReach, tank, jumps) require O(1) constant auxiliary space."
      }
    ]
  }
};
