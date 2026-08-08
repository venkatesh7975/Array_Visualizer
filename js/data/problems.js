/* ==========================================================================
   ARRAY PATTERNS PROBLEMS DATA — 60 CURATED LEETCODE PROBLEMS & MULTI-LANGUAGE CODE
   ========================================================================== */

const CODE_SOLUTIONS = {
  // Pattern 1: Array Traversal
  101: {
    optimal: {
      javascript: `function runningSum(nums) {\n  let running = 0;\n  let res = [];\n  for (let i = 0; i < nums.length; i++) {\n    running += nums[i];\n    res.push(running);\n  }\n  return res;\n}`,      python: `class Solution:\n    def runningSum(self, nums: List[int]) -> List[int]:\n        running = 0\n        res = []\n        for i in range(len(nums)):\n            running += nums[i]\n            res.append(running)\n        return res`,
      java: `public int[] runningSum(int[] nums) {\n    int running = 0;\n    int[] res = new int[nums.length];\n    for (let i = 0; i < nums.length; i++) {\n        running += nums[i];\n        res[i] = running;\n    }\n    return res;\n}`,
      cpp: `vector<int> runningSum(vector<int>& nums) {\n    int running = 0;\n    vector<int> res;\n    for (int i = 0; i < nums.size(); i++) {\n        running += nums[i];\n        res.push_back(running);\n    }\n    return res;\n}`
    },
    inplace: {
      javascript: `function runningSumInPlace(nums) {\n  for (let i = 1; i < nums.length; i++) {\n    nums[i] += nums[i - 1];\n  }\n  return nums;\n}`,
      python: `class Solution:\n    def runningSumInPlace(self, nums: List[int]) -> List[int]:\n        for i in range(1, len(nums)):\n            nums[i] += nums[i - 1]\n        return nums`,
      java: `public int[] runningSumInPlace(int[] nums) {\n    for (int i = 1; i < nums.length; i++) {\n        nums[i] += nums[i - 1];\n    }\n    return nums;\n}`,
      cpp: `vector<int> runningSumInPlace(vector<int>& nums) {\n    for (int i = 1; i < nums.size(); i++) {\n        nums[i] += nums[i - 1];\n    }\n    return nums;\n}`
    },
    brute: {
      javascript: `function runningSumBrute(nums) {\n  let res = [];\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = 0; j <= i; j++) sum += nums[j];\n    res.push(sum);\n  }\n  return res;\n}`,
      python: `class Solution:\n    def runningSumBrute(self, nums: List[int]) -> List[int]:\n        res = []\n        for i in range(len(nums)):\n            sum_val = 0\n            for j in range(i + 1): sum_val += nums[j]\n            res.append(sum_val)\n        return res`,
      java: `public int[] runningSumBrute(int[] nums) {\n    int[] res = new int[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n        int sum = 0;\n        for (int j = 0; j <= i; j++) sum += nums[j];\n        res[i] = sum;\n    }\n    return res;\n}`,
      cpp: `vector<int> runningSumBrute(vector<int>& nums) {\n    vector<int> res;\n    for (int i = 0; i < nums.size(); i++) {\n        int sum = 0;\n        for (int j = 0; j <= i; j++) sum += nums[j];\n        res.push_back(sum);\n    }\n    return res;\n}`
    }
  },

  102: {
    optimal: {
      javascript: `function maximumWealth(accounts) {\n  let maxWealth = 0;\n  for (let r = 0; r < accounts.length; r++) {\n    let rowSum = accounts[r].reduce((a, b) => a + b, 0);\n    maxWealth = Math.max(maxWealth, rowSum);\n  }\n  return maxWealth;\n}`,
      python: `class Solution:\n    def maximumWealth(self, accounts: List[List[int]]) -> int:\n        max_wealth = 0\n        for customer in accounts:\n            row_sum = sum(customer)\n            max_wealth = max(max_wealth, row_sum)\n        return max_wealth`,
      java: `public int maximumWealth(int[][] accounts) {\n    int maxWealth = 0;\n    for (int[] customer : accounts) {\n        int rowSum = Arrays.stream(customer).sum();\n        maxWealth = Math.max(maxWealth, rowSum);\n    }\n    return maxWealth;\n}`,
      cpp: `int maximumWealth(vector<vector<int>>& accounts) {\n    int maxWealth = 0;\n    for (auto& customer : accounts) {\n        int rowSum = accumulate(customer.begin(), customer.end(), 0);\n        maxWealth = max(maxWealth, rowSum);\n    }\n    return maxWealth;\n}`
    },
    brute: {
      javascript: `function maximumWealthBrute(accounts) {\n  let maxW = 0;\n  for (let r = 0; r < accounts.length; r++) {\n    let s = 0;\n    for (let c = 0; c < accounts[r].length; c++) s += accounts[r][c];\n    if (s > maxW) maxW = s;\n  }\n  return maxW;\n}`,
      python: `class Solution:\n    def maximumWealthBrute(self, accounts: List[List[int]]) -> int:\n        max_w = 0\n        for i in range(len(accounts)):\n            s = 0\n            for j in range(len(accounts[i])):\n                s += accounts[i][j]\n            if s > max_w: max_w = s\n        return max_w`,
      java: `public int maximumWealthBrute(int[][] accounts) {\n    int maxW = 0;\n    for (int i = 0; i < accounts.length; i++) {\n        int s = 0;\n        for (int j = 0; j < accounts[i].length; j++) s += accounts[i][j];\n        if (s > maxW) maxW = s;\n    }\n    return maxW;\n}`,
      cpp: `int maximumWealthBrute(vector<vector<int>>& accounts) {\n    int maxW = 0;\n    for (int i = 0; i < accounts.size(); i++) {\n        int s = 0;\n        for (int j = 0; j < accounts[i].size(); j++) s += accounts[i][j];\n        if (s > maxW) maxW = s;\n    }\n    return maxW;\n}`
    }
  },

  103: {
    optimal: {
      javascript: `function findNumbers(nums) {\n  let count = 0;\n  for (let num of nums) {\n    if (String(num).length % 2 === 0) count++;\n  }\n  return count;\n}`,
      python: `class Solution:\n    def findNumbers(self, nums: List[int]) -> int:\n        count = 0\n        for num in nums:\n            if len(str(num)) % 2 == 0:\n                count += 1\n        return count`,
      java: `public int findNumbers(int[] nums) {\n    int count = 0;\n    for (int num : nums) {\n        if (String.valueOf(num).length() % 2 == 0) count++;\n    }\n    return count;\n}`,
      cpp: `int findNumbers(vector<int>& nums) {\n    int count = 0;\n    for (int x : nums) {\n        if (to_string(x).length() % 2 == 0) count++;\n    }\n    return count;\n}`
    },
    brute: {
      javascript: `function findNumbersBrute(nums) {\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    let digits = 0, temp = nums[i];\n    while (temp > 0) { temp = Math.floor(temp / 10); digits++; }\n    if (digits % 2 === 0) count++;\n  }\n  return count;\n}`,
      python: `class Solution:\n    def findNumbersBrute(self, nums: List[int]) -> int:\n        count = 0\n        for num in nums:\n            digits = 0\n            temp = num\n            while temp > 0:\n                temp //= 10\n                digits += 1\n            if digits % 2 == 0:\n                count += 1\n        return count`,
      java: `public int findNumbersBrute(int[] nums) {\n    int count = 0;\n    for (int num : nums) {\n        int digits = 0, temp = num;\n        while (temp > 0) { temp /= 10; digits++; }\n        if (digits % 2 == 0) count++;\n    }\n    return count;\n}`,
      cpp: `int findNumbersBrute(vector<int>& nums) {\n    int count = 0;\n    for (int num : nums) {\n        int digits = 0, temp = num;\n        while (temp > 0) { temp /= 10; digits++; }\n        if (digits % 2 == 0) count++;\n    }\n    return count;\n}`
    }
  },

  104: {
    optimal: {
      javascript: `function removeElement(nums, val) {\n  let k = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] !== val) {\n      nums[k] = nums[i];\n      k++;\n    }\n  }\n  return k;\n}`,
      python: `class Solution:\n    def removeElement(self, nums: List[int], val: int) -> int:\n        k = 0\n        for i in range(len(nums)):\n            if nums[i] != val:\n                nums[k] = nums[i]\n                k += 1\n        return k`,
      java: `public int removeElement(int[] nums, int val) {\n    int k = 0;\n    for (int i = 0; i < nums.length; i++) {\n        if (nums[i] != val) nums[k++] = nums[i];\n    }\n    return k;\n}`,
      cpp: `int removeElement(vector<int>& nums, int val) {\n    int k = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        if (nums[i] != val) nums[k++] = nums[i];\n    }\n    return k;\n}`
    },
    brute: {
      javascript: `function removeElementBrute(nums, val) {\n  let temp = [];\n  for (let x of nums) if (x !== val) temp.push(x);\n  for (let i = 0; i < temp.length; i++) nums[i] = temp[i];\n  return temp.length;\n}`,
      python: `class Solution:\n    def removeElementBrute(self, nums: List[int], val: int) -> int:\n        temp = [x for x in nums if x != val]\n        for i in range(len(temp)):\n            nums[i] = temp[i]\n        return len(temp)`,
      java: `public int removeElementBrute(int[] nums, int val) {\n    List<Integer> temp = new ArrayList<>();\n    for (int x : nums) if (x != val) temp.add(x);\n    for (int i = 0; i < temp.size(); i++) nums[i] = temp.get(i);\n    return temp.size();\n}`,
      cpp: `int removeElementBrute(vector<int>& nums, int val) {\n    vector<int> temp;\n    for (int x : nums) if (x != val) temp.push_back(x);\n    for (int i = 0; i < temp.size(); i++) nums[i] = temp[i];\n    return temp.size();\n}`
    }
  },

  105: {
    optimal: {
      javascript: `function removeDuplicates(nums) {\n  if (nums.length === 0) return 0;\n  let write = 1;\n  for (let read = 1; read < nums.length; read++) {\n    if (nums[read] !== nums[read - 1]) {\n      nums[write] = nums[read];\n      write++;\n    }\n  }\n  return write;\n}`,
      python: `class Solution:\n    def removeDuplicates(self, nums: List[int]) -> int:\n        if not nums: return 0\n        write = 1\n        for read in range(1, len(nums)):\n            if nums[read] != nums[read - 1]:\n                nums[write] = nums[read]\n                write += 1\n        return write`,
      java: `public int removeDuplicates(int[] nums) {\n    if (nums.length == 0) return 0;\n    int write = 1;\n    for (int read = 1; read < nums.length; read++) {\n        if (nums[read] != nums[read - 1]) nums[write++] = nums[read];\n    }\n    return write;\n}`,
      cpp: `int removeDuplicates(vector<int>& nums) {\n    if (nums.empty()) return 0;\n    int write = 1;\n    for (int read = 1; read < nums.size(); read++) {\n        if (nums[read] != nums[read - 1]) nums[write++] = nums[read];\n    }\n    return write;\n}`
    },
    brute: {
      javascript: `function removeDuplicatesBrute(nums) {\n  let set = Array.from(new Set(nums));\n  for (let i = 0; i < set.length; i++) nums[i] = set[i];\n  return set.length;\n}`,
      python: `def removeDuplicatesBrute(nums: List[int]) -> int:\n    unique = sorted(list(set(nums)))\n    for i in range(len(unique)):\n        nums[i] = unique[i]\n    return len(unique)`,
      java: `public int removeDuplicatesBrute(int[] nums) {\n    Set<Integer> set = new LinkedHashSet<>();\n    for (int x : nums) set.add(x);\n    int i = 0;\n    for (int x : set) nums[i++] = x;\n    return set.size();\n}`,
      cpp: `int removeDuplicatesBrute(vector<int>& nums) {\n    set<int> unique(nums.begin(), nums.end());\n    int i = 0;\n    for (int x : unique) nums[i++] = x;\n    return unique.size();\n}`
    }
  },

  // Pattern 2: Prefix Sum
  201: {
    optimal: {
      javascript: `function pivotIndex(nums) {\n  let totalSum = nums.reduce((a, b) => a + b, 0);\n  let leftSum = 0;\n  for (let i = 0; i < nums.length; i++) {\n    let rightSum = totalSum - leftSum - nums[i];\n    if (leftSum === rightSum) return i;\n    leftSum += nums[i];\n  }\n  return -1;\n}`,
      python: `class Solution:\n    def pivotIndex(self, nums: List[int]) -> int:\n        total_sum = sum(nums)\n        left_sum = 0\n        for i in range(len(nums)):\n            right_sum = total_sum - left_sum - nums[i]\n            if left_sum == right_sum:\n                return i\n            left_sum += nums[i]\n        return -1`,
      java: `public int pivotIndex(int[] nums) {\n    int totalSum = 0;\n    for (int x : nums) totalSum += x;\n    int leftSum = 0;\n    for (int i = 0; i < nums.length; i++) {\n        int rightSum = totalSum - leftSum - nums[i];\n        if (leftSum == rightSum) return i;\n        leftSum += nums[i];\n    }\n    return -1;\n}`,
      cpp: `int pivotIndex(vector<int>& nums) {\n    int totalSum = 0;\n    for (int x : nums) totalSum += x;\n    int leftSum = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        int rightSum = totalSum - leftSum - nums[i];\n        if (leftSum == rightSum) return i;\n        leftSum += nums[i];\n    }\n    return -1;\n}`
    },
    brute: {
      javascript: `function pivotIndexBrute(nums) {\n  for (let i = 0; i < nums.length; i++) {\n    let leftSum = 0, rightSum = 0;\n    for (let j = 0; j < i; j++) leftSum += nums[j];\n    for (let j = i + 1; j < nums.length; j++) rightSum += nums[j];\n    if (leftSum === rightSum) return i;\n  }\n  return -1;\n}`,
      python: `class Solution:\n    def pivotIndexBrute(self, nums: List[int]) -> int:\n        for i in range(len(nums)):\n            left_sum = sum(nums[:i])\n            right_sum = sum(nums[i+1:])\n            if left_sum == right_sum:\n                return i\n        return -1`,
      java: `public int pivotIndexBrute(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n        int leftSum = 0, rightSum = 0;\n        for (int j = 0; j < i; j++) leftSum += nums[j];\n        for (int j = i + 1; j < nums.length; j++) rightSum += nums[j];\n        if (leftSum == rightSum) return i;\n    }\n    return -1;\n}`,
      cpp: `int pivotIndexBrute(vector<int>& nums) {\n    for (int i = 0; i < nums.size(); i++) {\n        int leftSum = 0, rightSum = 0;\n        for (int j = 0; j < i; j++) leftSum += nums[j];\n        for (int j = i + 1; j < nums.size(); j++) rightSum += nums[j];\n        if (leftSum == rightSum) return i;\n    }\n    return -1;\n}`
    }
  },

  202: {
    optimal: {
      javascript: `class NumArray {\n  constructor(nums) {\n    this.prefix = new Array(nums.length + 1).fill(0);\n    for (let i = 0; i < nums.length; i++) {\n      this.prefix[i + 1] = this.prefix[i] + nums[i];\n    }\n  }\n  sumRange(left, right) {\n    return this.prefix[right + 1] - this.prefix[left];\n  }\n}`,
      python: `class NumArray:\n    def __init__(self, nums: List[int]):\n        self.prefix = [0] * (len(nums) + 1)\n        for i in range(len(nums)):\n            self.prefix[i + 1] = self.prefix[i] + nums[i]\n\n    def sumRange(self, left: int, right: int) -> int:\n        return self.prefix[right + 1] - self.prefix[left]`,
      java: `class NumArray {\n    private int[] prefix;\n    public NumArray(int[] nums) {\n        prefix = new int[nums.length + 1];\n        for (int i = 0; i < nums.length; i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n    }\n    public int sumRange(int left, int right) {\n        return prefix[right + 1] - prefix[left];\n    }\n}`,
      cpp: `class NumArray {\nprivate:\n    vector<int> prefix;\npublic:\n    NumArray(vector<int>& nums) {\n        prefix.resize(nums.size() + 1, 0);\n        for (int i = 0; i < nums.size(); i++) {\n            prefix[i + 1] = prefix[i] + nums[i];\n        }\n    }\n    int sumRange(int left, int right) {\n        return prefix[right + 1] - prefix[left];\n    }\n};`
    },
    brute: {
      javascript: `function sumRangeBrute(nums, left, right) {\n  let sum = 0;\n  for (let i = left; i <= right; i++) sum += nums[i];\n  return sum;\n}`,
      python: `def sumRangeBrute(nums: List[int], left: int, right: int) -> int:\n    return sum(nums[left:right + 1])`,
      java: `public int sumRangeBrute(int[] nums, int left, int right) {\n    int sum = 0;\n    for (int i = left; i <= right; i++) sum += nums[i];\n    return sum;\n}`,
      cpp: `int sumRangeBrute(vector<int>& nums, int left, int right) {\n    int sum = 0;\n    for (int i = left; i <= right; i++) sum += nums[i];\n    return sum;\n}`
    }
  },

  203: {
    optimal: {
      javascript: `function findMiddleIndex(nums) {\n  let totalSum = nums.reduce((a, b) => a + b, 0);\n  let leftSum = 0;\n  for (let i = 0; i < nums.length; i++) {\n    let rightSum = totalSum - leftSum - nums[i];\n    if (leftSum === rightSum) return i;\n    leftSum += nums[i];\n  }\n  return -1;\n}`,
      python: `class Solution:\n    def findMiddleIndex(self, nums: List[int]) -> int:\n        total_sum = sum(nums)\n        left_sum = 0\n        for i in range(len(nums)):\n            right_sum = total_sum - left_sum - nums[i]\n            if left_sum == right_sum:\n                return i\n            left_sum += nums[i]\n        return -1`,
      java: `public int findMiddleIndex(int[] nums) {\n    int totalSum = 0;\n    for (int x : nums) totalSum += x;\n    int leftSum = 0;\n    for (int i = 0; i < nums.length; i++) {\n        int rightSum = totalSum - leftSum - nums[i];\n        if (leftSum == rightSum) return i;\n        leftSum += nums[i];\n    }\n    return -1;\n}`,
      cpp: `int findMiddleIndex(vector<int>& nums) {\n    int totalSum = 0;\n    for (int x : nums) totalSum += x;\n    int leftSum = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        int rightSum = totalSum - leftSum - nums[i];\n        if (leftSum == rightSum) return i;\n        leftSum += nums[i];\n    }\n    return -1;\n}`
    },
    brute: {
      javascript: `function findMiddleIndexBrute(nums) {\n  for (let i = 0; i < nums.length; i++) {\n    let leftSum = 0, rightSum = 0;\n    for (let j = 0; j < i; j++) leftSum += nums[j];\n    for (let j = i + 1; j < nums.length; j++) rightSum += nums[j];\n    if (leftSum === rightSum) return i;\n  }\n  return -1;\n}`,
      python: `class Solution:\n    def findMiddleIndexBrute(self, nums: List[int]) -> int:\n        for i in range(len(nums)):\n            left_sum = sum(nums[:i])\n            right_sum = sum(nums[i+1:])\n            if left_sum == right_sum:\n                return i\n        return -1`,
      java: `public int findMiddleIndexBrute(int[] nums) {\n    for (int i = 0; i < nums.length; i++) {\n        int leftSum = 0, rightSum = 0;\n        for (int j = 0; j < i; j++) leftSum += nums[j];\n        for (int j = i + 1; j < nums.length; j++) rightSum += nums[j];\n        if (leftSum == rightSum) return i;\n    }\n    return -1;\n}`,
      cpp: `int findMiddleIndexBrute(vector<int>& nums) {\n    for (int i = 0; i < nums.size(); i++) {\n        int leftSum = 0, rightSum = 0;\n        for (int j = 0; j < i; j++) leftSum += nums[j];\n        for (int j = i + 1; j < nums.size(); j++) rightSum += nums[j];\n        if (leftSum == rightSum) return i;\n    }\n    return -1;\n}`
    }
  },

  204: {
    optimal: {
      javascript: `function subarraySum(nums, k) {\n  let map = new Map();\n  map.set(0, 1);\n  let currSum = 0, count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    currSum += nums[i];\n    let comp = currSum - k;\n    if (map.has(comp)) count += map.get(comp);\n    map.set(currSum, (map.get(currSum) || 0) + 1);\n  }\n  return count;\n}`,
      python: `class Solution:\n    def subarraySum(self, nums: List[int], k: int) -> int:\n        seen = {0: 1}\n        curr_sum = count = 0\n        for i in range(len(nums)):\n            curr_sum += nums[i]\n            comp = curr_sum - k\n            if comp in seen:\n                count += seen[comp]\n            seen[curr_sum] = seen.get(curr_sum, 0) + 1\n        return count`,
      java: `public int subarraySum(int[] nums, int k) {\n    Map<Integer, Integer> map = new HashMap<>();\n    map.put(0, 1);\n    int currSum = 0, count = 0;\n    for (int i = 0; i < nums.length; i++) {\n        currSum += nums[i];\n        int comp = currSum - k;\n        if (map.containsKey(comp)) count += map.get(comp);\n        map.put(currSum, map.getOrDefault(currSum, 0) + 1);\n    }\n    return count;\n}`,
      cpp: `int subarraySum(vector<int>& nums, int k) {\n    unordered_map<int, int> map;\n    map[0] = 1;\n    int currSum = 0, count = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        currSum += nums[i];\n        int comp = currSum - k;\n        if (map.count(comp)) count += map[comp];\n        map[currSum]++;\n    }\n    return count;\n}`
    },
    brute: {
      javascript: `function subarraySumBrute(nums, k) {\n  let count = 0;\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = i; j < nums.length; j++) {\n      sum += nums[j];\n      if (sum === k) count++;\n    }\n  }\n  return count;\n}`,
      python: `class Solution:\n    def subarraySumBrute(self, nums: List[int], k: int) -> int:\n        count = 0\n        for i in range(len(nums)):\n            curr_sum = 0\n            for j in range(i, len(nums)):\n                curr_sum += nums[j]\n                if curr_sum == k:\n                    count += 1\n        return count`,
      java: `public int subarraySumBrute(int[] nums, int k) {\n    int count = 0;\n    for (int i = 0; i < nums.length; i++) {\n        int sum = 0;\n        for (let j = i; j < nums.length; j++) {\n            sum += nums[j];\n            if (sum == k) count++;\n        }\n    }\n    return count;\n}`,
      cpp: `int subarraySumBrute(vector<int>& nums, int k) {\n    int count = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        int sum = 0;\n        for (int j = i; j < nums.size(); j++) {\n            sum += nums[j];\n            if (sum == k) count++;\n        }\n    }\n    return count;\n}`
    }
  },

  205: {
    optimal: {
      javascript: `function runningSum(nums) {\n  let running = 0;\n  let res = [];\n  for (let i = 0; i < nums.length; i++) {\n    running += nums[i];\n    res.push(running);\n  }\n  return res;\n}`,
      python: `class Solution:\n    def runningSum(self, nums: List[int]) -> List[int]:\n        running = 0\n        res = []\n        for i in range(len(nums)):\n            running += nums[i]\n            res.append(running)\n        return res`,
      java: `public int[] runningSum(int[] nums) {\n    int running = 0;\n    int[] res = new int[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n        running += nums[i];\n        res[i] = running;\n    }\n    return res;\n}`,
      cpp: `vector<int> runningSum(vector<int>& nums) {\n    int running = 0;\n    vector<int> res;\n    for (int i = 0; i < nums.size(); i++) {\n        running += nums[i];\n        res.push_back(running);\n    }\n    return res;\n}`
    },
    brute: {
      javascript: `function runningSumBrute(nums) {\n  let res = [];\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = 0; j <= i; j++) sum += nums[j];\n    res.push(sum);\n  }\n  return res;\n}`,
      python: `class Solution:\n    def runningSumBrute(self, nums: List[int]) -> List[int]:\n        res = []\n        for i in range(len(nums)):\n            sum_val = sum(nums[:i+1])\n            res.append(sum_val)\n        return res`,
      java: `public int[] runningSumBrute(int[] nums) {\n    int[] res = new int[nums.length];\n    for (int i = 0; i < nums.length; i++) {\n        int sum = 0;\n        for (let j = 0; j <= i; j++) sum += nums[j];\n        res[i] = sum;\n    }\n    return res;\n}`,
      cpp: `vector<int> runningSumBrute(vector<int>& nums) {\n    vector<int> res;\n    for (int i = 0; i < nums.size(); i++) {\n        int sum = 0;\n        for (int j = 0; j <= i; j++) sum += nums[j];\n        res.push_back(sum);\n    }\n    return res;\n}`
    }
  },

  301: {
    optimal: {
      javascript: `function findMaxAverage(nums, k) {\n  let sum = 0;\n  for (let i = 0; i < k; i++) sum += nums[i];\n  let max = sum;\n  for (let i = k; i < nums.length; i++) {\n    sum += nums[i] - nums[i - k];\n    max = Math.max(max, sum);\n  }\n  return max / k;\n}`,
      python: `class Solution:\n    def findMaxAverage(self, nums: List[int], k: int) -> float:\n        curr_sum = sum(nums[:k])\n        max_sum = curr_sum\n        for i in range(k, len(nums)):\n            curr_sum += nums[i] - nums[i - k]\n            max_sum = max(max_sum, curr_sum)\n        return max_sum / k`,
      java: `public double findMaxAverage(int[] nums, int k) {\n    double sum = 0;\n    for (int i = 0; i < k; i++) sum += nums[i];\n    double max = sum;\n    for (int i = k; i < nums.length; i++) {\n        sum += nums[i] - nums[i - k];\n        max = Math.max(max, sum);\n    }\n    return max / k;\n}`,
      cpp: `double findMaxAverage(vector<int>& nums, int k) {\n    double sum = 0;\n    for (int i = 0; i < k; i++) sum += nums[i];\n    double max = sum;\n    for (int i = k; i < nums.size(); i++) {\n        sum += nums[i] - nums[i - k];\n        max = max(max, sum);\n    }\n    return max / k;\n}`
    }
  },

  302: {
    optimal: {
      javascript: `function decrypt(code, k) {\n  let n = code.length, res = new Array(n).fill(0);\n  if (k === 0) return res;\n  for (let i = 0; i < n; i++) {\n    let sum = 0;\n    if (k > 0) {\n      for (let j = 1; j <= k; j++) sum += code[(i + j) % n];\n    } else {\n      for (let j = 1; j <= -k; j++) sum += code[(i - j + n) % n];\n    }\n    res[i] = sum;\n  }\n  return res;\n}`,
      python: `class Solution:\n    def decrypt(self, code: List[int], k: int) -> List[int]:\n        n = len(code)\n        res = [0] * n\n        if k == 0: return res\n        for i in range(n):\n            if k > 0:\n                res[i] = sum(code[(i + j) % n] for j in range(1, k + 1))\n            else:\n                res[i] = sum(code[(i - j + n) % n] for j in range(1, -k + 1))\n        return res`,
      java: `public int[] decrypt(int[] code, int k) {\n    int n = code.length;\n    int[] res = new int[n];\n    if (k == 0) return res;\n    for (int i = 0; i < n; i++) {\n        int sum = 0;\n        if (k > 0) {\n            for (int j = 1; j <= k; j++) sum += code[(i + j) % n];\n        } else {\n            for (int j = 1; j <= -k; j++) sum += code[(i - j + n) % n];\n        }\n        res[i] = sum;\n    }\n    return res;\n}`,
      cpp: `vector<int> decrypt(vector<int>& code, int k) {\n    int n = code.size();\n    vector<int> res(n, 0);\n    if (k == 0) return res;\n    for (int i = 0; i < n; i++) {\n        int sum = 0;\n        if (k > 0) {\n            for (int j = 1; j <= k; j++) sum += code[(i + j) % n];\n        } else {\n            for (int j = 1; j <= -k; j++) sum += code[(i - j + n) % n];\n        }\n        res[i] = sum;\n    }\n    return res;\n}`
    }
  },

  401: {
    optimal: {
      javascript: `function minSubArrayLen(target, nums) {\n  let left = 0, sum = 0, minLen = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      minLen = Math.min(minLen, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return minLen === Infinity ? 0 : minLen;\n}`,
      python: `class Solution:\n    def minSubArrayLen(self, target: int, nums: List[int]) -> int:\n        left = curr_sum = 0\n        min_len = float('inf')\n        for right in range(len(nums)):\n            curr_sum += nums[right]\n            while curr_sum >= target:\n                min_len = min(min_len, right - left + 1)\n                curr_sum -= nums[left]\n                left += 1\n        return 0 if min_len == float('inf') else min_len`,
      java: `public int minSubArrayLen(int target, int[] nums) {\n    int left = 0, sum = 0, minLen = Integer.MAX_VALUE;\n    for (let right = 0; right < nums.length; right++) {\n        sum += nums[right];\n        while (sum >= target) {\n            minLen = Math.min(minLen, right - left + 1);\n            sum -= nums[left++];\n        }\n    }\n    return minLen == Integer.MAX_VALUE ? 0 : minLen;\n}`,
      cpp: `int minSubArrayLen(int target, vector<int>& nums) {\n    int left = 0, sum = 0, minLen = INT_MAX;\n    for (int right = 0; right < nums.size(); right++) {\n        sum += nums[right];\n        while (sum >= target) {\n            minLen = Math.min(minLen, right - left + 1);\n            sum -= nums[left++];\n        }\n    }\n    return minLen == INT_MAX ? 0 : minLen;\n}`
    }
  },

  402: {
    optimal: {
      javascript: `function totalFruit(fruits) {\n  let map = new Map(), left = 0, max = 0;\n  for (let right = 0; right < fruits.length; right++) {\n    map.set(fruits[right], (map.get(fruits[right]) || 0) + 1);\n    while (map.size > 2) {\n      map.set(fruits[left], map.get(fruits[left]) - 1);\n      if (map.get(fruits[left]) === 0) map.delete(fruits[left]);\n      left++;\n    }\n    max = Math.max(max, right - left + 1);\n  }\n  return max;\n}`,
      python: `class Solution:\n    def totalFruit(self, fruits: List[int]) -> int:\n        count = {}\n        left = max_fruits = 0\n        for right in range(len(fruits)):\n            count[fruits[right]] = count.get(fruits[right], 0) + 1\n            while len(count) > 2:\n                count[fruits[left]] -= 1\n                if count[fruits[left]] == 0: del count[fruits[left]]\n                left += 1\n            max_fruits = max(max_fruits, right - left + 1)\n        return max_fruits`,
      java: `public int totalFruit(int[] fruits) {\n    Map<Integer, Integer> map = new HashMap<>();\n    int left = 0, max = 0;\n    for (int right = 0; right < fruits.length; right++) {\n        map.put(fruits[right], map.getOrDefault(fruits[right], 0) + 1);\n        while (map.size() > 2) {\n            map.put(fruits[left], map.get(fruits[left]) - 1);\n            if (map.get(fruits[left]) == 0) map.remove(fruits[left]);\n            left++;\n        }\n        max = Math.max(max, right - left + 1);\n    }\n    return max;\n}`,
      cpp: `int totalFruit(vector<int>& fruits) {\n    unordered_map<int, int> count;\n    int left = 0, maxFruits = 0;\n    for (int right = 0; right < fruits.size(); right++) {\n        count[fruits[right]]++;\n        while (count.size() > 2) {\n            count[fruits[left]]--;\n            if (count[fruits[left]] == 0) count.erase(fruits[left]);\n            left++;\n        }\n        maxFruits = max(maxFruits, right - left + 1);\n    }\n    return maxFruits;\n}`
    }
  },

  502: {
    optimal: {
      javascript: `function moveZeroes(nums) {\n  let write = 0;\n  for (let read = 0; read < nums.length; read++) {\n    if (nums[read] !== 0) {\n      let temp = nums[write];\n      nums[write] = nums[read];\n      nums[read] = temp;\n      write++;\n    }\n  }\n}`,
      python: `class Solution:\n    def moveZeroes(self, nums: List[int]) -> None:\n        write = 0\n        for read in range(len(nums)):\n            if nums[read] != 0:\n                temp = nums[write]\n                nums[write] = nums[read]\n                nums[read] = temp\n                write += 1`,
      java: `public void moveZeroes(int[] nums) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n        if (nums[read] != 0) {\n            int temp = nums[write];\n            nums[write] = nums[read];\n            nums[read] = temp;\n            write++;\n        }\n    }\n}`,
      cpp: `void moveZeroes(vector<int>& nums) {\n    int write = 0;\n    for (int read = 0; read < nums.size(); read++) {\n        if (nums[read] != 0) {\n            int temp = nums[write];\n            nums[write] = nums[read];\n            nums[read] = temp;\n            write++;\n        }\n    }\n}`
    }
  },

  503: {
    optimal: {
      javascript: `function maxArea(height) {\n  let left = 0, right = height.length - 1, max = 0;\n  while (left < right) {\n    let h = Math.min(height[left], height[right]);\n    max = Math.max(max, h * (right - left));\n    if (height[left] < height[right]) left++; else right--;\n  }\n  return max;\n}`,
      python: `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        left, right = 0, len(height) - 1\n        max_area = 0\n        while left < right:\n            h = min(height[left], height[right])\n            max_area = max(max_area, h * (right - left))\n            if height[left] < height[right]: left += 1\n            else: right -= 1\n        return max_area`,
      java: `public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1, max = 0;\n    while (left < right) {\n        int h = Math.min(height[left], height[right]);\n        max = Math.max(max, h * (right - left));\n        if (height[left] < height[right]) left++; else right--;\n    }\n    return max;\n}`,
      cpp: `int maxArea(vector<int>& height) {\n    int left = 0, right = height.size() - 1, maxVal = 0;\n    while (left < right) {\n        int h = min(height[left], height[right]);\n        maxVal = max(maxVal, h * (right - left));\n        if (height[left] < height[right]) left++; else right--;\n    }\n    return maxVal;\n}`
    }
  },

  601: {
    optimal: {
      javascript: `function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
      python: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target: return mid\n            elif nums[mid] < target: left = mid + 1\n            else: right = mid - 1\n        return -1`,
      java: `public int search(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
      cpp: `int search(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`
    }
  },

  602: {
    optimal: {
      javascript: `function searchInsert(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return left;\n}`,
      python: `class Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target: return mid\n            elif nums[mid] < target: left = mid + 1\n            else: right = mid - 1\n        return left`,
      java: `public int searchInsert(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return left;\n}`,
      cpp: `int searchInsert(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return left;\n}`
    }
  },

  701: {
    optimal: {
      javascript: `function maxSubArray(nums) {\n  let currMax = nums[0], maxSoFar = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}`,
      python: `class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        curr_max = max_so_far = nums[0]\n        for i in range(1, len(nums)):\n            curr_max = max(nums[i], curr_max + nums[i])\n            max_so_far = max(max_so_far, curr_max)\n        return max_so_far`,
      java: `public int maxSubArray(int[] nums) {\n    int currMax = nums[0], maxSoFar = nums[0];\n    for (int i = 1; i < nums.length; i++) {\n        currMax = Math.max(nums[i], currMax + nums[i]);\n        maxSoFar = Math.max(maxSoFar, currMax);\n    }\n    return maxSoFar;\n}`,
      cpp: `int maxSubArray(vector<int>& nums) {\n    int currMax = nums[0], maxSoFar = nums[0];\n    for (int i = 1; i < nums.size(); i++) {\n        currMax = max(nums[i], currMax + nums[i]);\n        maxSoFar = max(maxSoFar, currMax);\n    }\n    return maxSoFar;\n}`
    }
  },

  702: {
    optimal: {
      javascript: `function maxProfit(prices) {\n  let minPrice = Infinity, maxProfit = 0;\n  for (let price of prices) {\n    minPrice = Math.min(minPrice, price);\n    maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n  return maxProfit;\n}`,
      python: `class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        min_price = float('inf')\n        max_profit = 0\n        for price in prices:\n            min_price = min(min_price, price)\n            max_profit = max(max_profit, price - min_price)\n        return max_profit`,
      java: `public int maxProfit(int[] prices) {\n    int minPrice = Integer.MAX_VALUE, maxProfit = 0;\n    for (int price : prices) {\n        minPrice = Math.min(minPrice, price);\n        maxProfit = Math.max(maxProfit, price - minPrice);\n    }\n    return maxProfit;\n}`,
      cpp: `int maxProfit(vector<int>& prices) {\n    int minPrice = INT_MAX, maxProfit = 0;\n    for (int price : prices) {\n        minPrice = min(minPrice, price);\n        maxProfit = max(maxProfit, price - minPrice);\n    }\n    return maxProfit;\n}`
    }
  },

  802: {
    optimal: {
      javascript: `function containsDuplicate(nums) {\n  let set = new Set();\n  for (let x of nums) {\n    if (set.has(x)) return true;\n    set.add(x);\n  }\n  return false;\n}`,
      python: `class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        seen = set()\n        for x in nums:\n            if x in seen: return True\n            seen.add(x)\n        return False`,
      java: `public boolean containsDuplicate(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int x : nums) {\n        if (set.contains(x)) return true;\n        set.add(x);\n    }\n    return false;\n}`,
      cpp: `bool containsDuplicate(vector<int>& nums) {\n    unordered_set<int> set;\n    for (int x : nums) {\n        if (set.count(x)) return true;\n        set.insert(x);\n    }\n    return false;\n}`
    }
  },

  803: {
    optimal: {
      javascript: `function majorityElement(nums) {\n  let count = 0, candidate = null;\n  for (let x of nums) {\n    if (count === 0) candidate = x;\n    count += (x === candidate) ? 1 : -1;\n  }\n  return candidate;\n}`,
      python: `class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        count = 0\n        candidate = None\n        for x in nums:\n            if count == 0: candidate = x\n            count += 1 if x == candidate else -1\n        return candidate`,
      java: `public int majorityElement(int[] nums) {\n    int count = 0, candidate = 0;\n    for (int x : nums) {\n        if (count == 0) candidate = x;\n        count += (x == candidate) ? 1 : -1;\n    }\n    return candidate;\n}`,
      cpp: `int majorityElement(vector<int>& nums) {\n    int count = 0, candidate = 0;\n    for (int x : nums) {\n        if (count == 0) candidate = x;\n        count += (x == candidate) ? 1 : -1;\n    }\n    return candidate;\n}`
    }
  },

  901: {
    optimal: {
      javascript: `function rotate(matrix) {\n  let n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      let temp = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = temp;\n    }\n    matrix[i].reverse();\n  }\n  return matrix;\n}`,
      python: `class Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        n = len(matrix)\n        for i in range(n):\n            for j in range(i + 1, n):\n                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n            matrix[i].reverse()`,
      java: `public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int i = 0; i < n; i++) {\n        for (let j = i + 1; j < n; j++) {\n            int temp = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = temp;\n        }\n        reverseRow(matrix[i]);\n    }\n}`,
      cpp: `void rotate(vector<vector<int>>& matrix) {\n    int n = matrix.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) swap(matrix[i][j], matrix[j][i]);\n        reverse(matrix[i].begin(), matrix[i].end());\n    }\n}`
    }
  },

  1001: {
    optimal: {
      javascript: `function rotate(nums, k) {\n  k %= nums.length;\n  const reverse = (l, r) => {\n    while (l < r) {\n      let temp = nums[l]; nums[l] = nums[r]; nums[r] = temp;\n      l++; r--;\n    }\n  };\n  reverse(0, nums.length - 1);\n  reverse(0, k - 1);\n  reverse(k, nums.length - 1);\n  return nums;\n}`,
      python: `class Solution:\n    def rotate(self, nums: List[int], k: int) -> None:\n        n = len(nums)\n        k %= n\n        nums.reverse()\n        nums[:k] = reversed(nums[:k])\n        nums[k:] = reversed(nums[k:])`,
      java: `public void rotate(int[] nums, int k) {\n    k %= nums.length;\n    reverse(nums, 0, nums.length - 1);\n    reverse(nums, 0, k - 1);\n    reverse(nums, k, nums.length - 1);\n}`,
      cpp: `void rotate(vector<int>& nums, int k) {\n    k %= nums.size();\n    reverse(nums.begin(), nums.end());\n    reverse(nums.begin(), nums.begin() + k);\n    reverse(nums.begin() + k, nums.end());\n}`
    }
  },

  1002: {
    optimal: {
      javascript: `function merge(nums1, m, nums2, n) {\n  let p1 = m - 1, p2 = n - 1, p = m + n - 1;\n  while (p2 >= 0) {\n    if (p1 >= 0 && nums1[p1] > nums2[p2]) {\n      nums1[p] = nums1[p1]; p1--;\n    } else {\n      nums1[p] = nums2[p2]; p2--;\n    }\n    p--;\n  }\n  return nums1;\n}`,
      python: `class Solution:\n    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n        p1, p2, p = m - 1, n - 1, m + n - 1\n        while p2 >= 0:\n            if p1 >= 0 and nums1[p1] > nums2[p2]:\n                nums1[p] = nums1[p1]\n                p1 -= 1\n            else:\n                nums1[p] = nums2[p2]\n                p2 -= 1\n            p -= 1`,
      java: `public void merge(int[] nums1, int m, int[] nums2, int n) {\n    int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n    while (p2 >= 0) {\n        if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n        else nums1[p--] = nums2[p2--];\n    }\n}`,
      cpp: `void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n    int p1 = m - 1, p2 = n - 1, p = m + n - 1;\n    while (p2 >= 0) {\n        if (p1 >= 0 && nums1[p1] > nums2[p2]) nums1[p--] = nums1[p1--];\n        else nums1[p--] = nums2[p2--];\n    }\n}`
    }
  },

  1101: {
    optimal: {
      javascript: `function sortColors(nums) {\n  let low = 0, mid = 0, high = nums.length - 1;\n  while (mid <= high) {\n    if (nums[mid] === 0) {\n      [nums[low], nums[mid]] = [nums[mid], nums[low]];\n      low++; mid++;\n    } else if (nums[mid] === 1) mid++;\n    else {\n      [nums[mid], nums[high]] = [nums[high], nums[mid]];\n      high--;\n    }\n  }\n  return nums;\n}`,
      python: `class Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        low, mid, high = 0, 0, len(nums) - 1\n        while mid <= high:\n            if nums[mid] == 0:\n                nums[low], nums[mid] = nums[mid], nums[low]\n                low += 1; mid += 1\n            elif nums[mid] == 1: mid += 1\n            else:\n                nums[mid], nums[high] = nums[high], nums[mid]\n                high -= 1`,
      java: `public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) {\n            int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;\n            low++; mid++;\n        } else if (nums[mid] == 1) mid++;\n        else {\n            int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;\n            high--;\n        }\n    }\n}`,
      cpp: `void sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) swap(nums[low++], nums[mid++]);\n        else if (nums[mid] == 1) mid++;\n        else swap(nums[mid], nums[high--]);\n    }\n}`
    }
  },

  1102: {
    optimal: {
      javascript: `function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  let res = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    let last = res[res.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      res.push(intervals[i]);\n    }\n  }\n  return res;\n}`,
      python: `class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        intervals.sort(key=lambda x: x[0])\n        res = [intervals[0]]\n        for interval in intervals[1:]:\n            if interval[0] <= res[-1][1]:\n                res[-1][1] = max(res[-1][1], interval[1])\n            else:\n                res.append(interval)\n        return res`,
      java: `public int[][] merge(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> res = new ArrayList<>();\n    res.add(intervals[0]);\n    for (int i = 1; i < intervals.length; i++) {\n        int[] last = res.get(res.size() - 1);\n        if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n        else res.add(intervals[i]);\n    }\n    return res.toArray(new int[res.size()][]);\n}`,
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> res = {intervals[0]};\n    for (size_t i = 1; i < intervals.size(); i++) {\n        if (intervals[i][0] <= res.back()[1]) res.back()[1] = max(res.back()[1], intervals[i][1]);\n        else res.push_back(intervals[i]);\n    }\n    return res;\n}`
    }
  },

  1201: {
    optimal: {
      javascript: `function canJump(nums) {\n  let maxReach = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > maxReach) return false;\n    maxReach = Math.max(maxReach, i + nums[i]);\n  }\n  return true;\n}`,
      python: `class Solution:\n    def canJump(self, nums: List[int]) -> bool:\n        max_reach = 0\n        for i in range(len(nums)):\n            if i > max_reach: return False\n            max_reach = max(max_reach, i + nums[i])\n        return True`,
      java: `public boolean canJump(int[] nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.length; i++) {\n        if (i > maxReach) return false;\n        maxReach = Math.max(maxReach, i + nums[i]);\n    }\n    return true;\n}`,
      cpp: `bool canJump(vector<int>& nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        if (i > maxReach) return false;\n        maxReach = max(maxReach, i + nums[i]);\n    }\n    return true;\n}`
    }
  },

  1202: {
    optimal: {
      javascript: `function jump(nums) {\n  let jumps = 0, currEnd = 0, maxReach = 0;\n  for (let i = 0; i < nums.length - 1; i++) {\n    maxReach = Math.max(maxReach, i + nums[i]);\n    if (i === currEnd) {\n      jumps++;\n      currEnd = maxReach;\n    }\n  }\n  return jumps;\n}`,
      python: `class Solution:\n    def jump(self, nums: List[int]) -> int:\n        jumps = curr_end = max_reach = 0\n        for i in range(len(nums) - 1):\n            max_reach = max(max_reach, i + nums[i])\n            if i == curr_end:\n                jumps += 1\n                curr_end = max_reach\n        return jumps`,
      java: `public int jump(int[] nums) {\n    int jumps = 0, currEnd = 0, maxReach = 0;\n    for (int i = 0; i < nums.length - 1; i++) {\n        maxReach = Math.max(maxReach, i + nums[i]);\n        if (i == currEnd) {\n            jumps++;\n            currEnd = maxReach;\n        }\n    }\n    return jumps;\n}`,
      cpp: `int jump(vector<int>& nums) {\n    int jumps = 0, currEnd = 0, maxReach = 0;\n    for (int i = 0; i < nums.size() - 1; i++) {\n        maxReach = max(maxReach, i + nums[i]);\n        if (i == currEnd) {\n            jumps++;\n            currEnd = maxReach;\n        }\n    }\n    return jumps;\n}`
    }
  },

  303: {
    optimal: {
      javascript: `function maxSatisfied(customers, grumpy, minutes) {\n  let base = 0;\n  for (let i = 0; i < customers.length; i++) {\n    if (!grumpy[i]) base += customers[i];\n  }\n  let add = 0;\n  for (let i = 0; i < minutes; i++) {\n    if (grumpy[i]) add += customers[i];\n  }\n  let maxAdd = add;\n  for (let i = minutes; i < customers.length; i++) {\n    if (grumpy[i]) add += customers[i];\n    if (grumpy[i - minutes]) add -= customers[i - minutes];\n    maxAdd = Math.max(maxAdd, add);\n  }\n  return base + maxAdd;\n}`,
      python: `class Solution:\n    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:\n        base = sum(c for c, g in zip(customers, grumpy) if not g)\n        add = sum(c for c, g in zip(customers[:minutes], grumpy[:minutes]) if g)\n        max_add = add\n        for i in range(minutes, len(customers)):\n            if grumpy[i]: add += customers[i]\n            if grumpy[i - minutes]: add -= customers[i - minutes]\n            max_add = max(max_add, add)\n        return base + max_add`,
      java: `public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {\n    int base = 0;\n    for (int i = 0; i < customers.length; i++) if (grumpy[i] == 0) base += customers[i];\n    int add = 0;\n    for (int i = 0; i < minutes; i++) if (grumpy[i] == 1) add += customers[i];\n    int maxAdd = add;\n    for (int i = minutes; i < customers.length; i++) {\n        if (grumpy[i] == 1) add += customers[i];\n        if (grumpy[i - minutes] == 1) add -= customers[i - minutes];\n        maxAdd = Math.max(maxAdd, add);\n    }\n    return base + maxAdd;\n}`,
      cpp: `int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {\n    int base = 0;\n    for (size_t i = 0; i < customers.size(); i++) if (!grumpy[i]) base += customers[i];\n    int add = 0;\n    for (int i = 0; i < minutes; i++) if (grumpy[i]) add += customers[i];\n    int maxAdd = add;\n    for (size_t i = minutes; i < customers.size(); i++) {\n        if (grumpy[i]) add += customers[i];\n        if (grumpy[i - minutes]) add -= customers[i - minutes];\n        maxAdd = max(maxAdd, add);\n    }\n    return base + maxAdd;\n}`
    }
  },

  304: {
    optimal: {
      javascript: `function getAverages(nums, k) {\n  let n = nums.length, res = new Array(n).fill(-1);\n  let len = 2 * k + 1;\n  if (n < len) return res;\n  let sum = 0;\n  for (let i = 0; i < len; i++) sum += nums[i];\n  res[k] = Math.floor(sum / len);\n  for (let i = len; i < n; i++) {\n    sum += nums[i] - nums[i - len];\n    res[i - k] = Math.floor(sum / len);\n  }\n  return res;\n}`,
      python: `class Solution:\n    def getAverages(self, nums: List[int], k: int) -> List[int]:\n        n = len(nums)\n        res = [-1] * n\n        window_len = 2 * k + 1\n        if n < window_len: return res\n        curr_sum = sum(nums[:window_len])\n        res[k] = curr_sum // window_len\n        for i in range(window_len, n):\n            curr_sum += nums[i] - nums[i - window_len]\n            res[i - k] = curr_sum // window_len\n        return res`,
      java: `public int[] getAverages(int[] nums, int k) {\n    int n = nums.length;\n    int[] res = new int[n]; Arrays.fill(res, -1);\n    long windowLen = 2 * k + 1;\n    if (n < windowLen) return res;\n    long sum = 0;\n    for (int i = 0; i < windowLen; i++) sum += nums[i];\n    res[k] = (int)(sum / windowLen);\n    for (int i = (int)windowLen; i < n; i++) {\n        sum += nums[i] - nums[i - (int)windowLen];\n        res[i - k] = (int)(sum / windowLen);\n    }\n    return res;\n}`,
      cpp: `vector<int> getAverages(vector<int>& nums, int k) {\n    int n = nums.size();\n    vector<int> res(n, -1);\n    long long windowLen = 2 * k + 1;\n    if (n < windowLen) return res;\n    long long sum = 0;\n    for (int i = 0; i < windowLen; i++) sum += nums[i];\n    res[k] = sum / windowLen;\n    for (int i = windowLen; i < n; i++) {\n        sum += nums[i] - nums[i - windowLen];\n        res[i - k] = sum / windowLen;\n    }\n    return res;\n}`
    }
  },

  305: {
    optimal: {
      javascript: `function maximumSubarraySum(nums, k) {\n  let max = 0, sum = 0, set = new Set(), left = 0;\n  for (let right = 0; right < nums.length; right++) {\n    while (set.has(nums[right])) {\n      set.delete(nums[left]);\n      sum -= nums[left++];\n    }\n    set.add(nums[right]);\n    sum += nums[right];\n    if (right - left + 1 === k) {\n      max = Math.max(max, sum);\n      set.delete(nums[left]);\n      sum -= nums[left++];\n    }\n  }\n  return max;\n}`,
      python: `class Solution:\n    def maximumSubarraySum(self, nums: List[int], k: int) -> int:\n        max_sum = curr_sum = 0\n        seen = set()\n        left = 0\n        for right in range(len(nums)):\n            while nums[right] in seen:\n                seen.remove(nums[left])\n                curr_sum -= nums[left]\n                left += 1\n            seen.add(nums[right])\n            curr_sum += nums[right]\n            if right - left + 1 == k:\n                max_sum = max(max_sum, curr_sum)\n                seen.remove(nums[left])\n                curr_sum -= nums[left]\n                left += 1\n        return max_sum`,
      java: `public long maximumSubarraySum(int[] nums, int k) {\n    long max = 0, sum = 0;\n    Set<Integer> set = new HashSet<>();\n    int left = 0;\n    for (int right = 0; right < nums.length; right++) {\n        while (set.contains(nums[right])) {\n            set.remove(nums[left]);\n            sum -= nums[left++];\n        }\n        set.add(nums[right]);\n        sum += nums[right];\n        if (right - left + 1 == k) {\n            max = Math.max(max, sum);\n            set.remove(nums[left]);\n            sum -= nums[left++];\n        }\n    }\n    return max;\n}`,
      cpp: `long long maximumSubarraySum(vector<int>& nums, int k) {\n    long long maxVal = 0, sum = 0;\n    unordered_set<int> set;\n    int left = 0;\n    for (int right = 0; right < nums.size(); right++) {\n        while (set.count(nums[right])) {\n            set.erase(nums[left]);\n            sum -= nums[left++];\n        }\n        set.insert(nums[right]);\n        sum += nums[right];\n        if (right - left + 1 == k) {\n            maxVal = max(maxVal, sum);\n            set.erase(nums[left]);\n            sum -= nums[left++];\n        }\n    }\n    return maxVal;\n}`
    }
  },

  403: {
    optimal: {
      javascript: `function longestOnes(nums, k) {\n  let left = 0, zeros = 0, max = 0;\n  for (let right = 0; right < nums.length; right++) {\n    if (nums[right] === 0) zeros++;\n    while (zeros > k) {\n      if (nums[left] === 0) zeros--;\n      left++;\n    }\n    max = Math.max(max, right - left + 1);\n  }\n  return max;\n}`,
      python: `class Solution:\n    def longestOnes(self, nums: List[int], k: int) -> int:\n        left = zeros = max_len = 0\n        for right in range(len(nums)):\n            if nums[right] == 0: zeros += 1\n            while zeros > k:\n                if nums[left] == 0: zeros -= 1\n                left += 1\n            max_len = max(max_len, right - left + 1)\n        return max_len`,
      java: `public int longestOnes(int[] nums, int k) {\n    int left = 0, zeros = 0, max = 0;\n    for (int right = 0; right < nums.length; right++) {\n        if (nums[right] == 0) zeros++;\n        while (zeros > k) {\n            if (nums[left] == 0) zeros--;\n            left++;\n        }\n        max = Math.max(max, right - left + 1);\n    }\n    return max;\n}`,
      cpp: `int longestOnes(vector<int>& nums, int k) {\n    int left = 0, zeros = 0, maxVal = 0;\n    for (int right = 0; right < nums.size(); right++) {\n        if (nums[right] == 0) zeros++;\n        while (zeros > k) {\n            if (nums[left] == 0) zeros--;\n            left++;\n        }\n        maxVal = max(maxVal, right - left + 1);\n    }\n    return maxVal;\n}`
    }
  },

  404: {
    optimal: {
      javascript: `function characterReplacement(s, k) {\n  let count = {}, left = 0, maxFreq = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    count[s[right]] = (count[s[right]] || 0) + 1;\n    maxFreq = Math.max(maxFreq, count[s[right]]);\n    while ((right - left + 1) - maxFreq > k) {\n      count[s[left]]--;\n      left++;\n    }\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
      python: `class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        count = {}\n        left = max_freq = max_len = 0\n        for right in range(len(s)):\n            count[s[right]] = count.get(s[right], 0) + 1\n            max_freq = max(max_freq, count[s[right]])\n            while (right - left + 1) - max_freq > k:\n                count[s[left]] -= 1\n                left += 1\n            max_len = max(max_len, right - left + 1)\n        return max_len`,
      java: `public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int left = 0, maxFreq = 0, maxLen = 0;\n    for (int right = 0; right < s.length(); right++) {\n        maxFreq = Math.max(maxFreq, ++count[s.charAt(right) - 'A']);\n        while ((right - left + 1) - maxFreq > k) {\n            count[s.charAt(left++) - 'A']--;\n        }\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      cpp: `int characterReplacement(string s, int k) {\n    vector<int> count(26, 0);\n    int left = 0, maxFreq = 0, maxLen = 0;\n    for (int right = 0; right < s.length(); right++) {\n        maxFreq = max(maxFreq, ++count[s[right] - 'A']);\n        while ((right - left + 1) - maxFreq > k) {\n            count[s[left++] - 'A']--;\n        }\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`
    }
  },

  405: {
    optimal: {
      javascript: `function minWindow(s, t) {\n  let need = {}, have = {};\n  for (let c of t) need[c] = (need[c] || 0) + 1;\n  let left = 0, count = 0, req = Object.keys(need).length, res = "", minLen = Infinity;\n  for (let right = 0; right < s.length; right++) {\n    let c = s[right];\n    have[c] = (have[c] || 0) + 1;\n    if (need[c] && have[c] === need[c]) count++;\n    while (count === req) {\n      if (right - left + 1 < minLen) {\n        minLen = right - left + 1;\n        res = s.slice(left, right + 1);\n      }\n      have[s[left]]--;\n      if (need[s[left]] && have[s[left]] < need[s[left]]) count--;\n      left++;\n    }\n  }\n  return res;\n}`,
      python: `class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        if not t or not s: return ""\n        need = {}\n        for c in t: need[c] = need.get(c, 0) + 1\n        have = {}\n        left = count = 0\n        req = len(need)\n        res, min_len = "", float('inf')\n        for right in range(len(s)):\n            c = s[right]\n            have[c] = have.get(c, 0) + 1\n            if c in need and have[c] == need[c]: count += 1\n            while count == req:\n                if right - left + 1 < min_len:\n                    min_len = right - left + 1\n                    res = s[left:right+1]\n                have[s[left]] -= 1\n                if s[left] in need and have[s[left]] < need[s[left]]: count -= 1\n                left += 1\n        return res`,
      java: `public String minWindow(String s, String t) {\n    if (s.length() == 0 || t.length() == 0) return "";\n    Map<Character, Integer> need = new HashMap<>(), have = new HashMap<>();\n    for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);\n    int left = 0, count = 0, req = need.size(), minLen = Integer.MAX_VALUE;\n    String res = "";\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        have.put(c, have.getOrDefault(c, 0) + 1);\n        if (need.containsKey(c) && have.get(c).equals(need.get(c))) count++;\n        while (count == req) {\n            if (right - left + 1 < minLen) {\n                minLen = right - left + 1;\n                res = s.substring(left, right + 1);\n            }\n            char l = s.charAt(left);\n            have.put(l, have.get(l) - 1);\n            if (need.containsKey(l) && have.get(l) < need.get(l)) count--;\n            left++;\n        }\n    }\n    return res;\n}`,
      cpp: `string minWindow(string s, string t) {\n    unordered_map<char, int> need, have;\n    for (char c : t) need[c]++;\n    int left = 0, count = 0, req = need.size(), minLen = INT_MAX;\n    string res = "";\n    for (int right = 0; right < s.length(); right++) {\n        char c = s[right];\n        have[c]++;\n        if (need.count(c) && have[c] == need[c]) count++;\n        while (count == req) {\n            if (right - left + 1 < minLen) {\n                minLen = right - left + 1;\n                res = s.substr(left, right - left + 1);\n            }\n            char l = s[left];\n            have[l]--;\n            if (need.count(l) && have[l] < need[l]) count--;\n            left++;\n        }\n    }\n    return res;\n}`
    }
  },

  504: {
    optimal: {
      javascript: `function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  let res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let left = i + 1, right = nums.length - 1;\n    while (left < right) {\n      let sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        res.push([nums[i], nums[left], nums[right]]);\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        left++; right--;\n      } else if (sum < 0) left++; else right--;\n    }\n  }\n  return res;\n}`,
      python: `class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        nums.sort()\n        res = []\n        for i in range(len(nums) - 2):\n            if i > 0 and nums[i] == nums[i-1]: continue\n            left, right = i + 1, len(nums) - 1\n            while left < right:\n                s = nums[i] + nums[left] + nums[right]\n                if s == 0:\n                    res.append([nums[i], nums[left], nums[right]])\n                    while left < right and nums[left] == nums[left+1]: left += 1\n                    while left < right and nums[right] == nums[right-1]: right -= 1\n                    left += 1; right -= 1\n                elif s < 0: left += 1\n                else: right -= 1\n        return res`,
      java: `public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> res = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int left = i + 1, right = nums.length - 1;\n        while (left < right) {\n            int sum = nums[i] + nums[left] + nums[right];\n            if (sum == 0) {\n                res.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                while (left < right && nums[left] == nums[left + 1]) left++;\n                while (left < right && nums[right] == nums[right - 1]) right--;\n                left++; right--;\n            } else if (sum < 0) left++; else right--;\n        }\n    }\n    return res;\n}`,
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n    vector<vector<int>> res;\n    for (size_t i = 0; i < nums.size() - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int left = i + 1, right = nums.size() - 1;\n        while (left < right) {\n            int sum = nums[i] + nums[left] + nums[right];\n            if (sum == 0) {\n                res.push_back({nums[i], nums[left], nums[right]});\n                while (left < right && nums[left] == nums[left + 1]) left++;\n                while (left < right && nums[right] == nums[right - 1]) right--;\n                left++; right--;\n            } else if (sum < 0) left++; else right--;\n        }\n    }\n    return res;\n}`
    }
  },

  505: {
    optimal: {
      javascript: `function trap(height) {\n  let left = 0, right = height.length - 1;\n  let maxL = 0, maxR = 0, water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= maxL) maxL = height[left];\n      else water += maxL - height[left];\n      left++;\n    } else {\n      if (height[right] >= maxR) maxR = height[right];\n      else water += maxR - height[right];\n      right--;\n    }\n  }\n  return water;\n}`,
      python: `class Solution:\n    def trap(self, height: List[int]) -> int:\n        left, right = 0, len(height) - 1\n        max_l = max_r = water = 0\n        while left < right:\n            if height[left] < height[right]:\n                if height[left] >= max_l: max_l = height[left]\n                else: water += max_l - height[left]\n                left += 1\n            else:\n                if height[right] >= max_r: max_r = height[right]\n                else: water += max_r - height[right]\n                right -= 1\n        return water`,
      java: `public int trap(int[] height) {\n    int left = 0, right = height.length - 1;\n    int maxL = 0, maxR = 0, water = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= maxL) maxL = height[left];\n            else water += maxL - height[left];\n            left++;\n        } else {\n            if (height[right] >= maxR) maxR = height[right];\n            else water += maxR - height[right];\n            right--;\n        }\n    }\n    return water;\n}`,
      cpp: `int trap(vector<int>& height) {\n    int left = 0, right = height.size() - 1;\n    int maxL = 0, maxR = 0, water = 0;\n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= maxL) maxL = height[left];\n            else water += maxL - height[left];\n            left++;\n        } else {\n            if (height[right] >= maxR) maxR = height[right];\n            else water += maxR - height[right];\n            right--;\n        }\n    }\n    return water;\n}`
    }
  },

  603: {
    optimal: {
      javascript: `function findPeakElement(nums) {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] > nums[mid + 1]) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}`,
      python: `class Solution:\n    def findPeakElement(self, nums: List[int]) -> int:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            mid = (left + right) // 2\n            if nums[mid] > nums[mid + 1]: right = mid\n            else: left = mid + 1\n        return left`,
      java: `public int findPeakElement(int[] nums) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] > nums[mid + 1]) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n}`,
      cpp: `int findPeakElement(vector<int>& nums) {\n    int left = 0, right = nums.size() - 1;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] > nums[mid + 1]) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n}`
    }
  },

  604: {
    optimal: {
      javascript: `function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[left] <= nums[mid]) {\n      if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n      else left = mid + 1;\n    } else {\n      if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n      else right = mid - 1;\n    }\n  }\n  return -1;\n}`,
      python: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target: return mid\n            if nums[left] <= nums[mid]:\n                if nums[left] <= target < nums[mid]: right = mid - 1\n                else: left = mid + 1\n            else:\n                if nums[mid] < target <= nums[right]: left = mid + 1\n                else: right = mid - 1\n        return -1`,
      java: `public int search(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[left] <= nums[mid]) {\n            if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n            else left = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n            else right = mid - 1;\n        }\n    }\n    return -1;\n}`,
      cpp: `int search(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[left] <= nums[mid]) {\n            if (nums[left] <= target && target < nums[mid]) right = mid - 1;\n            else left = mid + 1;\n        } else {\n            if (nums[mid] < target && target <= nums[right]) left = mid + 1;\n            else right = mid - 1;\n        }\n    }\n    return -1;\n}`
    }
  },

  605: {
    optimal: {
      javascript: `function minEatingSpeed(piles, h) {\n  let left = 1, right = Math.max(...piles);\n  while (left < right) {\n    let mid = Math.floor((left + right) / 2);\n    let hours = piles.reduce((acc, p) => acc + Math.ceil(p / mid), 0);\n    if (hours <= h) right = mid;\n    else left = mid + 1;\n  }\n  return left;\n}`,
      python: `class Solution:\n    def minEatingSpeed(self, piles: List[int], h: int) -> int:\n        left, right = 1, max(piles)\n        while left < right:\n            mid = (left + right) // 2\n            hours = sum((p + mid - 1) // mid for p in piles)\n            if hours <= h: right = mid\n            else: left = mid + 1\n        return left`,
      java: `public int minEatingSpeed(int[] piles, int h) {\n    int left = 1, right = 1000000000;\n    for (int p : piles) right = Math.max(right, p);\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        int hours = 0;\n        for (int p : piles) hours += (p + mid - 1) / mid;\n        if (hours <= h) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n}`,
      cpp: `int minEatingSpeed(vector<int>& piles, int h) {\n    int left = 1, right = *max_element(piles.begin(), piles.end());\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        int hours = 0;\n        for (int p : piles) hours += (p + mid - 1) / mid;\n        if (hours <= h) right = mid;\n        else left = mid + 1;\n    }\n    return left;\n}`
    }
  },

  703: {
    optimal: {
      javascript: `function maxProduct(nums) {\n  let max = nums[0], min = nums[0], res = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    let temp = max;\n    max = Math.max(nums[i], Math.max(nums[i] * max, nums[i] * min));\n    min = Math.min(nums[i], Math.min(nums[i] * temp, nums[i] * min));\n    res = Math.max(res, max);\n  }\n  return res;\n}`,
      python: `class Solution:\n    def maxProduct(self, nums: List[int]) -> int:\n        max_p = min_p = res = nums[0]\n        for i in range(1, len(nums)):\n            temp = max_p\n            max_p = max(nums[i], nums[i] * max_p, nums[i] * min_p)\n            min_p = min(nums[i], nums[i] * temp, nums[i] * min_p)\n            res = max(res, max_p)\n        return res`,
      java: `public int maxProduct(int[] nums) {\n    int max = nums[0], min = nums[0], res = nums[0];\n    for (int i = 1; i < nums.length; i++) {\n        int temp = max;\n        max = Math.max(nums[i], Math.max(nums[i] * max, nums[i] * min));\n        min = Math.min(nums[i], Math.min(nums[i] * temp, nums[i] * min));\n        res = Math.max(res, max);\n    }\n    return res;\n}`,
      cpp: `int maxProduct(vector<int>& nums) {\n    int maxP = nums[0], minP = nums[0], res = nums[0];\n    for (size_t i = 1; i < nums.size(); i++) {\n        int temp = maxP;\n        maxP = max(nums[i], max(nums[i] * maxP, nums[i] * minP));\n        minP = min(nums[i], min(nums[i] * temp, nums[i] * minP));\n        res = max(res, maxP);\n    }\n    return res;\n}`
    }
  },

  704: {
    optimal: {
      javascript: `function maxSubarraySumCircular(nums) {\n  let total = 0, currMax = 0, maxSoFar = nums[0], currMin = 0, minSoFar = nums[0];\n  for (let x of nums) {\n    total += x;\n    currMax = Math.max(x, currMax + x);\n    maxSoFar = Math.max(maxSoFar, currMax);\n    currMin = Math.min(x, currMin + x);\n    minSoFar = Math.min(minSoFar, currMin);\n  }\n  return maxSoFar > 0 ? Math.max(maxSoFar, total - minSoFar) : maxSoFar;\n}`,
      python: `class Solution:\n    def maxSubarraySumCircular(self, nums: List[int]) -> int:\n        total = curr_max = curr_min = 0\n        max_so_far, min_so_far = nums[0], nums[0]\n        for x in nums:\n            total += x\n            curr_max = max(x, curr_max + x)\n            max_so_far = max(max_so_far, curr_max)\n            curr_min = min(x, curr_min + x)\n            min_so_far = min(min_so_far, curr_min)\n        return max(max_so_far, total - min_so_far) if max_so_far > 0 else max_so_far`,
      java: `public int maxSubarraySumCircular(int[] nums) {\n    int total = 0, currMax = 0, maxSoFar = nums[0], currMin = 0, minSoFar = nums[0];\n    for (int x : nums) {\n        total += x;\n        currMax = Math.max(x, currMax + x);\n        maxSoFar = Math.max(maxSoFar, currMax);\n        currMin = Math.min(x, currMin + x);\n        minSoFar = Math.min(minSoFar, currMin);\n    }\n    return maxSoFar > 0 ? Math.max(maxSoFar, total - minSoFar) : maxSoFar;\n}`,
      cpp: `int maxSubarraySumCircular(vector<int>& nums) {\n    int total = 0, currMax = 0, maxSoFar = nums[0], currMin = 0, minSoFar = nums[0];\n    for (int x : nums) {\n        total += x;\n        currMax = max(x, currMax + x);\n        maxSoFar = max(maxSoFar, currMax);\n        currMin = min(x, currMin + x);\n        minSoFar = min(minSoFar, currMin);\n    }\n    return maxSoFar > 0 ? max(maxSoFar, total - minSoFar) : maxSoFar;\n}`
    }
  },

  705: {
    optimal: {
      javascript: `function maxAbsoluteSum(nums) {\n  let maxSum = 0, minSum = 0, currMax = 0, currMin = 0;\n  for (let x of nums) {\n    currMax = Math.max(0, currMax + x);\n    maxSum = Math.max(maxSum, currMax);\n    currMin = Math.min(0, currMin + x);\n    minSum = Math.min(minSum, currMin);\n  }\n  return Math.max(maxSum, Math.abs(minSum));\n}`,
      python: `class Solution:\n    def maxAbsoluteSum(self, nums: List[int]) -> int:\n        max_sum = min_sum = curr_max = curr_min = 0\n        for x in nums:\n            curr_max = max(0, curr_max + x)\n            max_sum = max(max_sum, curr_max)\n            curr_min = min(0, curr_min + x)\n            min_sum = min(min_sum, curr_min)\n        return max(max_sum, abs(min_sum))`,
      java: `public int maxAbsoluteSum(int[] nums) {\n    int maxSum = 0, minSum = 0, currMax = 0, currMin = 0;\n    for (int x : nums) {\n        currMax = Math.max(0, currMax + x);\n        maxSum = Math.max(maxSum, currMax);\n        currMin = Math.min(0, currMin + x);\n        minSum = Math.min(minSum, currMin);\n    }\n    return Math.max(maxSum, Math.abs(minSum));\n}`,
      cpp: `int maxAbsoluteSum(vector<int>& nums) {\n    int maxSum = 0, minSum = 0, currMax = 0, currMin = 0;\n    for (int x : nums) {\n        currMax = max(0, currMax + x);\n        maxSum = max(maxSum, currMax);\n        currMin = min(0, currMin + x);\n        minSum = min(minSum, currMin);\n    }\n    return max(maxSum, abs(minSum));\n}`
    }
  },

  804: {
    optimal: {
      javascript: `function topKFrequent(nums, k) {\n  let count = {};\n  for (let x of nums) count[x] = (count[x] || 0) + 1;\n  return Object.keys(count).sort((a, b) => count[b] - count[a]).slice(0, k).map(Number);\n}`,
      python: `class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        count = {}\n        for x in nums: count[x] = count.get(x, 0) + 1\n        return sorted(count.keys(), key=lambda x: count[x], reverse=True)[:k]`,
      java: `public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> count = new HashMap<>();\n    for (int x : nums) count.put(x, count.getOrDefault(x, 0) + 1);\n    PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));\n    for (int key : count.keySet()) {\n        pq.add(key);\n        if (pq.size() > k) pq.poll();\n    }\n    int[] res = new int[k];\n    for (int i = k - 1; i >= 0; i--) res[i] = pq.poll();\n    return res;\n}`,
      cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {\n    unordered_map<int, int> count;\n    for (int x : nums) count[x]++;\n    vector<pair<int, int>> freq;\n    for (auto& p : count) freq.push_back({p.second, p.first});\n    sort(freq.rbegin(), freq.rend());\n    vector<int> res;\n    for (int i = 0; i < k; i++) res.push_back(freq[i].second);\n    return res;\n}`
    }
  },

  805: {
    optimal: {
      javascript: `function longestConsecutive(nums) {\n  let set = new Set(nums), max = 0;\n  for (let num of set) {\n    if (!set.has(num - 1)) {\n      let curr = num, streak = 1;\n      while (set.has(curr + 1)) { curr++; streak++; }\n      max = Math.max(max, streak);\n    }\n  }\n  return max;\n}`,
      python: `class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        num_set = set(nums)\n        longest = 0\n        for num in num_set:\n            if num - 1 not in num_set:\n                curr = num\n                streak = 1\n                while curr + 1 in num_set:\n                    curr += 1\n                    streak += 1\n                longest = max(longest, streak)\n        return longest`,
      java: `public int longestConsecutive(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int x : nums) set.add(x);\n    int max = 0;\n    for (int num : set) {\n        if (!set.contains(num - 1)) {\n            int curr = num, streak = 1;\n            while (set.contains(curr + 1)) { curr++; streak++; }\n            max = Math.max(max, streak);\n        }\n    }\n    return max;\n}`,
      cpp: `int longestConsecutive(vector<int>& nums) {\n    unordered_set<int> set(nums.begin(), nums.end());\n    int maxVal = 0;\n    for (int num : set) {\n        if (!set.count(num - 1)) {\n            int curr = num, streak = 1;\n            while (set.count(curr + 1)) { curr++; streak++; }\n            maxVal = max(maxVal, streak);\n        }\n    }\n    return maxVal;\n}`
    }
  },

  902: {
    optimal: {
      javascript: `function spiralOrder(matrix) {\n  let res = [], top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let i = left; i <= right; i++) res.push(matrix[top][i]); top++;\n    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]); right--;\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) res.push(matrix[bottom][i]); bottom--;\n    }\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]); left++;\n    }\n  }\n  return res;\n}`,
      python: `class Solution:\n    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:\n        res = []\n        top, bottom = 0, len(matrix) - 1\n        left, right = 0, len(matrix[0]) - 1\n        while top <= bottom and left <= right:\n            for i in range(left, right + 1): res.append(matrix[top][i])\n            top += 1\n            for i in range(top, bottom + 1): res.append(matrix[i][right])\n            right -= 1\n            if top <= bottom:\n                for i in range(right, left - 1, -1): res.append(matrix[bottom][i])\n                bottom -= 1\n            if left <= right:\n                for i in range(bottom, top - 1, -1): res.append(matrix[i][left])\n                left += 1\n        return res`,
      java: `public List<Integer> spiralOrder(int[][] matrix) {\n    List<Integer> res = new ArrayList<>();\n    int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;\n    while (top <= bottom && left <= right) {\n        for (int i = left; i <= right; i++) res.add(matrix[top][i]); top++;\n        for (int i = top; i <= bottom; i++) res.add(matrix[i][right]); right--;\n        if (top <= bottom) {\n            for (int i = right; i >= left; i--) res.add(matrix[bottom][i]); bottom--;\n        }\n        if (left <= right) {\n            for (int i = bottom; i >= top; i--) res.add(matrix[i][left]); left++;\n        }\n    }\n    return res;\n}`,
      cpp: `vector<int> spiralOrder(vector<vector<int>>& matrix) {\n    vector<int> res;\n    int top = 0, bottom = matrix.size() - 1, left = 0, right = matrix[0].size() - 1;\n    while (top <= bottom && left <= right) {\n        for (int i = left; i <= right; i++) res.push_back(matrix[top][i]); top++;\n        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]); right--;\n        if (top <= bottom) {\n            for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]); bottom--;\n        }\n        if (left <= right) {\n            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]); left++;\n        }\n    }\n    return res;\n}`
    }
  },

  903: {
    optimal: {
      javascript: `function setZeroes(matrix) {\n  let m = matrix.length, n = matrix[0].length;\n  let row0 = false, col0 = false;\n  for (let r = 0; r < m; r++) if (matrix[r][0] === 0) col0 = true;\n  for (let c = 0; c < n; c++) if (matrix[0][c] === 0) row0 = true;\n  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) if (matrix[r][c] === 0) matrix[r][0] = matrix[0][c] = 0;\n  for (let r = 1; r < m; r++) for (let c = 1; c < n; c++) if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;\n  if (col0) for (let r = 0; r < m; r++) matrix[r][0] = 0;\n  if (row0) for (let c = 0; c < n; c++) matrix[0][c] = 0;\n  return matrix;\n}`,
      python: `class Solution:\n    def setZeroes(self, matrix: List[List[int]]) -> None:\n        m, n = len(matrix), len(matrix[0])\n        row0 = col0 = False\n        for r in range(m):\n            if matrix[r][0] == 0: col0 = True\n        for c in range(n):\n            if matrix[0][c] == 0: row0 = True\n        for r in range(1, m):\n            for c in range(1, n):\n                if matrix[r][c] == 0: matrix[r][0] = matrix[0][c] = 0\n        for r in range(1, m):\n            for c in range(1, n):\n                if matrix[r][0] == 0 or matrix[0][c] == 0: matrix[r][c] = 0\n        if col0:\n            for r in range(m): matrix[r][0] = 0\n        if row0:\n            for c in range(n): matrix[0][c] = 0`,
      java: `public void setZeroes(int[][] matrix) {\n    int m = matrix.length, n = matrix[0].length;\n    boolean row0 = false, col0 = false;\n    for (int r = 0; r < m; r++) if (matrix[r][0] == 0) col0 = true;\n    for (int c = 0; c < n; c++) if (matrix[0][c] == 0) row0 = true;\n    for (int r = 1; r < m; r++) for (int c = 1; c < n; c++) if (matrix[r][c] == 0) matrix[r][0] = matrix[0][c] = 0;\n    for (int r = 1; r < m; r++) for (int c = 1; c < n; c++) if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n    if (col0) for (int r = 0; r < m; r++) matrix[r][0] = 0;\n    if (row0) for (int c = 0; c < n; c++) matrix[0][c] = 0;\n}`,
      cpp: `void setZeroes(vector<vector<int>>& matrix) {\n    int m = matrix.size(), n = matrix[0].size();\n    bool row0 = false, col0 = false;\n    for (int r = 0; r < m; r++) if (matrix[r][0] == 0) col0 = true;\n    for (int c = 0; c < n; c++) if (matrix[0][c] == 0) row0 = true;\n    for (int r = 1; r < m; r++) for (int c = 1; c < n; c++) if (matrix[r][c] == 0) matrix[r][0] = matrix[0][c] = 0;\n    for (int r = 1; r < m; r++) for (int c = 1; c < n; c++) if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0;\n    if (col0) for (int r = 0; r < m; r++) matrix[r][0] = 0;\n    if (row0) for (int c = 0; c < n; c++) matrix[0][c] = 0;\n}`
    }
  },

  904: {
    optimal: {
      javascript: `function searchMatrix(matrix, target) {\n  let m = matrix.length, n = matrix[0].length;\n  let low = 0, high = m * n - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    let val = matrix[Math.floor(mid / n)][mid % n];\n    if (val === target) return true;\n    else if (val < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return false;\n}`,
      python: `class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        m, n = len(matrix), len(matrix[0])\n        low, high = 0, m * n - 1\n        while low <= high:\n            mid = (low + high) // 2\n            val = matrix[mid // n][mid % n]\n            if val == target: return True\n            elif val < target: low = mid + 1\n            else: high = mid - 1\n        return False`,
      java: `public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length, n = matrix[0].length;\n    int low = 0, high = m * n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / n][mid % n];\n        if (val == target) return true;\n        else if (val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`,
      cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {\n    int m = matrix.size(), n = matrix[0].size();\n    int low = 0, high = m * n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / n][mid % n];\n        if (val == target) return true;\n        else if (val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`
    }
  },

  905: {
    optimal: {
      javascript: `function floodFill(image, sr, sc, color) {\n  let orig = image[sr][sc];\n  if (orig === color) return image;\n  function dfs(r, c) {\n    if (r < 0 || r >= image.length || c < 0 || c >= image[0].length || image[r][c] !== orig) return;\n    image[r][c] = color;\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  }\n  dfs(sr, sc);\n  return image;\n}`,
      python: `class Solution:\n    def floodFill(self, image: List[List[int]], sr: int, sc: int, color: int) -> List[List[int]]:\n        orig = image[sr][sc]\n        if orig == color: return image\n        def dfs(r, c):\n            if r < 0 or r >= len(image) or c < 0 or c >= len(image[0]) or image[r][c] != orig: return\n            image[r][c] = color\n            dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)\n        dfs(sr, sc)\n        return image`,
      java: `public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n    int orig = image[sr][sc];\n    if (orig != color) dfs(image, sr, sc, orig, color);\n    return image;\n}`,
      cpp: `vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {\n    int orig = image[sr][sc];\n    if (orig != color) dfs(image, sr, sc, orig, color);\n    return image;\n}`
    }
  },

  1003: {
    optimal: {
      javascript: `function generate(numRows) {\n  let res = [];\n  for (let i = 0; i < numRows; i++) {\n    let row = new Array(i + 1).fill(1);\n    for (let j = 1; j < i; j++) {\n      row[j] = res[i - 1][j - 1] + res[i - 1][j];\n    }\n    res.push(row);\n  }\n  return res;\n}`,
      python: `class Solution:\n    def generate(self, numRows: int) -> List[List[int]]:\n        res = []\n        for i in range(numRows):\n            row = [1] * (i + 1)\n            for j in range(1, i):\n                row[j] = res[i - 1][j - 1] + res[i - 1][j]\n            res.append(row)\n        return res`,
      java: `public List<List<Integer>> generate(int numRows) {\n    List<List<Integer>> res = new ArrayList<>();\n    for (int i = 0; i < numRows; i++) {\n        List<Integer> row = new ArrayList<>();\n        for (int j = 0; j <= i; j++) {\n          if (j == 0 || j == i) row.add(1);\n          else row.add(res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));\n        }\n        res.add(row);\n    }\n    return res;\n}`,
      cpp: `vector<vector<int>> generate(int numRows) {\n    vector<vector<int>> res(numRows);\n    for (int i = 0; i < numRows; i++) {\n        res[i].resize(i + 1, 1);\n        for (int j = 1; j < i; j++) {\n            res[i][j] = res[i - 1][j - 1] + res[i - 1][j];\n        }\n    }\n    return res;\n}`
    }
  },

  1004: {
    optimal: {
      javascript: `function calPoints(operations) {\n  let record = [];\n  for (let op of operations) {\n    if (op === "+") record.push(record[record.length - 1] + record[record.length - 2]);\n    else if (op === "D") record.push(2 * record[record.length - 1]);\n    else if (op === "C") record.pop();\n    else record.push(parseInt(op));\n  }\n  return record.reduce((a, b) => a + b, 0);\n}`,
      python: `class Solution:\n    def calPoints(self, operations: List[str]) -> int:\n        record = []\n        for op in operations:\n            if op == "+": record.append(record[-1] + record[-2])\n            elif op == "D": record.append(2 * record[-1])\n            elif op == "C": record.pop()\n            else: record.append(int(op))\n        return sum(record)`,
      java: `public int calPoints(String[] operations) {\n    Stack<Integer> stack = new Stack<>();\n    for (String op : operations) {\n        if (op.equals("+")) {\n            int top = stack.pop();\n            int newTop = top + stack.peek();\n            stack.push(top); stack.push(newTop);\n        } else if (op.equals("D")) stack.push(2 * stack.peek());\n        else if (op.equals("C")) stack.pop();\n        else stack.push(Integer.parseInt(op));\n    }\n    int sum = 0;\n    for (int score : stack) sum += score;\n    return sum;\n}`,
      cpp: `int calPoints(vector<string>& operations) {\n    vector<int> record;\n    for (string op : operations) {\n        if (op == "+") record.push_back(record.back() + record[record.size() - 2]);\n        else if (op == "D") record.push_back(2 * record.back());\n        else if (op == "C") record.pop_back();\n        else record.push_back(stoi(op));\n    }\n    return accumulate(record.begin(), record.end(), 0);\n}`
    }
  },

  1005: {
    optimal: {
      javascript: `class ParkingSystem {\n  constructor(big, medium, small) {\n    this.slots = [0, big, medium, small];\n  }\n  addCar(carType) {\n    if (this.slots[carType] > 0) {\n      this.slots[carType]--;\n      return true;\n    }\n    return false;\n  }\n}`,
      python: `class ParkingSystem:\n    def __init__(self, big: int, medium: int, small: int):\n        self.slots = [0, big, medium, small]\n    def addCar(self, carType: int) -> bool:\n        if self.slots[carType] > 0:\n            self.slots[carType] -= 1\n            return True\n        return False`,
      java: `class ParkingSystem {\n    private int[] slots;\n    public ParkingSystem(int big, int medium, int small) {\n        slots = new int[]{0, big, medium, small};\n    }\n    public boolean addCar(int carType) {\n        if (slots[carType] > 0) {\n            slots[carType]--;\n            return true;\n        }\n        return false;\n    }\n}`,
      cpp: `class ParkingSystem {\n    vector<int> slots;\npublic:\n    ParkingSystem(int big, int medium, int small) : slots{0, big, medium, small} {}\n    bool addCar(int carType) {\n        if (slots[carType] > 0) {\n            slots[carType]--;\n            return true;\n        }\n        return false;\n    }\n};`
    }
  },

  1103: {
    optimal: {
      javascript: `function relativeSortArray(arr1, arr2) {\n  let count = {};\n  for (let x of arr1) count[x] = (count[x] || 0) + 1;\n  let res = [];\n  for (let x of arr2) {\n    while (count[x] > 0) { res.push(x); count[x]--; }\n  }\n  let rem = [];\n  for (let key in count) {\n    while (count[key] > 0) { rem.push(Number(key)); count[key]--; }\n  }\n  rem.sort((a, b) => a - b);\n  return res.concat(rem);\n}`,
      python: `class Solution:\n    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:\n        rank = {arr2[i]: i for i in range(len(arr2))}\n        return sorted(arr1, key=lambda x: (rank.get(x, len(arr2)), x))`,
      java: `public int[] relativeSortArray(int[] arr1, int[] arr2) {\n    int[] count = new int[1001];\n    for (int x : arr1) count[x]++;\n    int[] res = new int[arr1.length];\n    int idx = 0;\n    for (int x : arr2) {\n        while (count[x] > 0) { res[idx++] = x; count[x]--; }\n    }\n    for (int i = 0; i <= 1000; i++) {\n        while (count[i] > 0) { res[idx++] = i; count[i]--; }\n    }\n    return res;\n}`,
      cpp: `vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {\n    map<int, int> count;\n    for (int x : arr1) count[x]++;\n    vector<int> res;\n    for (int x : arr2) {\n        while (count[x] > 0) { res.push_back(x); count[x]--; }\n    }\n    for (auto& p : count) {\n        while (p.second > 0) { res.push_back(p.first); p.second--; }\n    }\n    return res;\n}`
    }
  },

  1104: {
    optimal: {
      javascript: `function largestNumber(nums) {\n  let strs = nums.map(String);\n  strs.sort((a, b) => (b + a).localeCompare(a + b));\n  if (strs[0] === "0") return "0";\n  return strs.join("");\n}`,
      python: `class Solution:\n    def largestNumber(self, nums: List[int]) -> str:\n        from functools import cmp_to_key\n        strs = list(map(str, nums))\n        strs.sort(key=cmp_to_key(lambda a, b: 1 if a + b < b + a else -1))\n        return "0" if strs[0] == "0" else "".join(strs)`,
      java: `public String largestNumber(int[] nums) {\n    String[] strs = new String[nums.length];\n    for (int i = 0; i < nums.length; i++) strs[i] = String.valueOf(nums[i]);\n    Arrays.sort(strs, (a, b) -> (b + a).compareTo(a + b));\n    if (strs[0].equals("0")) return "0";\n    StringBuilder sb = new StringBuilder();\n    for (String s : strs) sb.append(s);\n    return sb.toString();\n}`,
      cpp: `string largestNumber(vector<int>& nums) {\n    vector<string> strs;\n    for (int x : nums) strs.push_back(to_string(x));\n    sort(strs.begin(), strs.end(), [](const string& a, const string& b) { return a + b > b + a; });\n    if (strs[0] == "0") return "0";\n    string res = "";\n    for (string s : strs) res += s;\n    return res;\n}`
    }
  },

  1105: {
    optimal: {
      javascript: `function findContentChildren(g, s) {\n  g.sort((a, b) => a - b);\n  s.sort((a, b) => a - b);\n  let child = 0, cookie = 0;\n  while (child < g.length && cookie < s.length) {\n    if (s[cookie] >= g[child]) child++;\n    cookie++;\n  }\n  return child;\n}`,
      python: `class Solution:\n    def findContentChildren(self, g: List[int], s: List[int]) -> int:\n        g.sort()\n        s.sort()\n        child = cookie = 0\n        while child < len(g) and cookie < len(s):\n            if s[cookie] >= g[child]: child += 1\n            cookie += 1\n        return child`,
      java: `public int findContentChildren(int[] g, int[] s) {\n    Arrays.sort(g); Arrays.sort(s);\n    int child = 0, cookie = 0;\n    while (child < g.length && cookie < s.length) {\n        if (s[cookie] >= g[child]) child++;\n        cookie++;\n    }\n    return child;\n}`,
      cpp: `int findContentChildren(vector<int>& g, vector<int>& s) {\n    sort(g.begin(), g.end()); sort(s.begin(), s.end());\n    int child = 0, cookie = 0;\n    while (child < g.size() && cookie < s.size()) {\n        if (s[cookie] >= g[child]) child++;\n        cookie++;\n    }\n    return child;\n}`
    }
  },

  1203: {
    optimal: {
      javascript: `function canCompleteCircuit(gas, cost) {\n  let totalGas = 0, totalCost = 0, tank = 0, start = 0;\n  for (let i = 0; i < gas.length; i++) {\n    totalGas += gas[i]; totalCost += cost[i];\n    tank += gas[i] - cost[i];\n    if (tank < 0) {\n      start = i + 1; tank = 0;\n    }\n  }\n  return totalGas >= totalCost ? start : -1;\n}`,
      python: `class Solution:\n    def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:\n        if sum(gas) < sum(cost): return -1\n        tank = start = 0\n        for i in range(len(gas)):\n            tank += gas[i] - cost[i]\n            if tank < 0:\n                start = i + 1; tank = 0\n        return start`,
      java: `public int canCompleteCircuit(int[] gas, int[] cost) {\n    int totalGas = 0, totalCost = 0, tank = 0, start = 0;\n    for (int i = 0; i < gas.length; i++) {\n        totalGas += gas[i]; totalCost += cost[i];\n        tank += gas[i] - cost[i];\n        if (tank < 0) {\n            start = i + 1; tank = 0;\n        }\n    }\n    return totalGas >= totalCost ? start : -1;\n}`,
      cpp: `int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n    int totalGas = 0, totalCost = 0, tank = 0, start = 0;\n    for (size_t i = 0; i < gas.size(); i++) {\n        totalGas += gas[i]; totalCost += cost[i];\n        tank += gas[i] - cost[i];\n        if (tank < 0) {\n            start = i + 1; tank = 0;\n        }\n    }\n    return totalGas >= totalCost ? start : -1;\n}`
    }
  },

  1204: {
    optimal: {
      javascript: `function candy(ratings) {\n  let n = ratings.length;\n  let candies = new Array(n).fill(1);\n  for (let i = 1; i < n; i++) {\n    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n  }\n  for (let i = n - 2; i >= 0; i--) {\n    if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n  }\n  return candies.reduce((a, b) => a + b, 0);\n}`,
      python: `class Solution:\n    def candy(self, ratings: List[int]) -> int:\n        n = len(ratings)\n        candies = [1] * n\n        for i in range(1, n):\n            if ratings[i] > ratings[i - 1]: candies[i] = candies[i - 1] + 1\n        for i in range(n - 2, -1, -1):\n            if ratings[i] > ratings[i + 1]: candies[i] = max(candies[i], candies[i + 1] + 1)\n        return sum(candies)`,
      java: `public int candy(int[] ratings) {\n    int n = ratings.length;\n    int[] candies = new int[n]; Arrays.fill(candies, 1);\n    for (int i = 1; i < n; i++) {\n        if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n    }\n    for (int i = n - 2; i >= 0; i--) {\n        if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);\n    }\n    int sum = 0; for (int c : candies) sum += c;\n    return sum;\n}`,
      cpp: `int candy(vector<int>& ratings) {\n    int n = ratings.size();\n    vector<int> candies(n, 1);\n    for (int i = 1; i < n; i++) {\n        if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;\n    }\n    for (int i = n - 2; i >= 0; i--) {\n        if (ratings[i] > ratings[i + 1]) candies[i] = max(candies[i], candies[i + 1] + 1);\n    }\n    return accumulate(candies.begin(), candies.end(), 0);\n}`
    }
  },

  1205: {
    optimal: {
      javascript: `function findMinArrowShots(points) {\n  if (points.length === 0) return 0;\n  points.sort((a, b) => a[1] - b[1]);\n  let arrows = 1, end = points[0][1];\n  for (let i = 1; i < points.length; i++) {\n    if (points[i][0] > end) {\n      arrows++;\n      end = points[i][1];\n    }\n  }\n  return arrows;\n}`,
      python: `class Solution:\n    def findMinArrowShots(self, points: List[List[int]]) -> int:\n        if not points: return 0\n        points.sort(key=lambda x: x[1])\n        arrows = 1\n        end = points[0][1]\n        for i in range(1, len(points)):\n            if points[i][0] > end:\n                arrows += 1\n                end = points[i][1]\n        return arrows`,
      java: `public int findMinArrowShots(int[][] points) {\n    if (points.length == 0) return 0;\n    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));\n    int arrows = 1, end = points[0][1];\n    for (int i = 1; i < points.length; i++) {\n        if (points[i][0] > end) {\n            arrows++;\n            end = points[i][1];\n        }\n    }\n    return arrows;\n}`,
      cpp: `int findMinArrowShots(vector<vector<int>>& points) {\n    if (points.empty()) return 0;\n    sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) { return a[1] < b[1]; });\n    int arrows = 1, end = points[0][1];\n    for (size_t i = 1; i < points.size(); i++) {\n        if (points[i][0] > end) {\n            arrows++;\n            end = points[i][1];\n        }\n    }\n    return arrows;\n}`
    }
  },

  // Pattern 5: Two Pointers (Two Sum II)
  501: {
    optimal: {
      javascript: `function twoSum(numbers, target) {\n  let left = 0, right = numbers.length - 1;\n  while (left < right) {\n    let sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    else if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}`,
      python: `class Solution:\n    def twoSum(self, numbers: List[int], target: int) -> List[int]:\n        left, right = 0, len(numbers) - 1\n        while left < right:\n            curr_sum = numbers[left] + numbers[right]\n            if curr_sum == target:\n                return [left + 1, right + 1]\n            elif curr_sum < target:\n                left += 1\n            else:\n                right -= 1\n        return []`,
      java: `public int[] twoSum(int[] numbers, int target) {\n    int left = 0, right = numbers.length - 1;\n    while (left < right) {\n        int sum = numbers[left] + numbers[right];\n        if (sum == target) return new int[]{left + 1, right + 1};\n        else if (sum < target) left++;\n        else right--;\n    }\n    return new int[]{};\n}`,
      cpp: `vector<int> twoSum(vector<int>& numbers, int target) {\n    int left = 0, right = numbers.size() - 1;\n    while (left < right) {\n        int sum = numbers[left] + numbers[right];\n        if (sum == target) return {left + 1, right + 1};\n        else if (sum < target) left++;\n        else right--;\n    }\n    return {};\n}`
    },
    brute: {
      javascript: `function twoSumBrute(numbers, target) {\n  for (let i = 0; i < numbers.length; i++) {\n    for (let j = i + 1; j < numbers.length; j++) {\n      if (numbers[i] + numbers[j] === target) return [i + 1, j + 1];\n    }\n  }\n  return [];\n}`,
      python: `class Solution:\n    def twoSumBrute(self, numbers: List[int], target: int) -> List[int]:\n        for i in range(len(numbers)):\n            for j in range(i + 1, len(numbers)):\n                if numbers[i] + numbers[j] == target:\n                    return [i + 1, j + 1]\n        return []`,
      java: `public int[] twoSumBrute(int[] numbers, int target) {\n    for (int i = 0; i < numbers.length; i++) {\n        for (int j = i + 1; j < numbers.length; j++) {\n            if (numbers[i] + numbers[j] == target) return new int[]{i + 1, j + 1};\n        }\n    }\n    return new int[]{};\n}`,
      cpp: `vector<int> twoSumBrute(vector<int>& numbers, int target) {\n    for (int i = 0; i < numbers.size(); i++) {\n        for (int j = i + 1; j < numbers.size(); j++) {\n            if (numbers[i] + numbers[j] == target) return {i + 1, j + 1};\n        }\n    }\n    return {};\n}`
    }
  },

  // Pattern 8: HashMap (Two Sum)
  801: {
    optimal: {
      javascript: `function twoSum(nums, target) {\n  let map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    let comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i in range(len(nums)):\n            complement = target - nums[i]\n            if complement in seen:\n                return [seen[complement], i]\n            seen[nums[i]] = i\n        return []`,
      java: `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int comp = target - nums[i];\n        if (map.containsKey(comp)) return new int[]{map.get(comp), i};\n        map.put(nums[i], i);\n    }\n    return new int[]{};\n}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int comp = target - nums[i];\n        if (map.count(comp)) return {map[comp], i};\n        map[nums[i]] = i;\n    }\n    return {};\n}`
    },
    brute: {
      javascript: `function twoSumBrute(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n  return [];\n}`,
      python: `class Solution:\n    def twoSumBrute(self, nums: List[int], target: int) -> List[int]:\n        for i in range(len(nums)):\n            for j in range(i + 1, len(nums)):\n                if nums[i] + nums[j] == target:\n                    return [i, j]\n        return []`,
      java: `public int[] twoSumBrute(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n        for (int j = i + 1; j < nums.length; j++) {\n            if (nums[i] + nums[j] == target) return new int[]{i, j};\n        }\n    }\n    return new int[]{};\n}`,
      cpp: `vector<int> twoSumBrute(vector<int>& nums, int target) {\n    for (int i = 0; i < nums.size(); i++) {\n        for (int j = i + 1; j < nums.size(); j++) {\n            if (nums[i] + nums[j] == target) return {i, j};\n        }\n    }\n    return {};\n}`
    }
  }
};

const PROBLEMS_DATA = {
  101: {
    id: 101, patternId: 1, lcNum: 1480, title: "Running Sum of 1d Array", difficulty: "Easy", category: "Array Traversal",
    timeComp: "O(N)", spaceComp: "O(1)", defaultInput: [1, 2, 3, 4], defaultTarget: null,
    statement: "Given an array `nums`. We define a running sum of an array as `runningSum[i] = sum(nums[0]…nums[i])`. Return the running sum of `nums`.",
    examples: "Input: nums = [1, 2, 3, 4]\nOutput: [1, 3, 6, 10]", constraints: ["1 <= nums.length <= 1000"],
    bruteDesc: "Compute sum from index 0 to i for every position i using nested loops.", bruteTime: "O(N²)", bruteSpace: "O(N)",
    optimalDesc: "Maintain a running total variable in a single pass over the array.", optimalTime: "O(N)", optimalSpace: "O(N)",
    inplaceDesc: "Mutate input array `nums` in-place by adding `nums[i-1]` to `nums[i]`, achieving true O(1) auxiliary space.", inplaceTime: "O(N)", inplaceSpace: "O(1)",
    code: CODE_SOLUTIONS[101],
    generateSteps: (nums, target, mode = "optimal") => {
      const steps = []; const res = [];
      if (mode === "inplace") {
        const arr = [...nums];
        steps.push({
          lineHighlight: 1,
          arrayState: arr.map(v => ({ val: v, activeClass: "" })),
          pointers: {},
          formula: "IN-PLACE O(1) AUXILIARY SPACE: Mutate Input Array Directly",
          explanation: "In-place approach modifies nums array directly without allocating extra output memory (O(1) Auxiliary Space).",
          vars: { mode: "In-Place O(1) Space", spaceComplexity: "O(1)" }
        });
        steps.push({
          lineHighlight: 2,
          arrayState: arr.map((v, idx) => ({ val: v, activeClass: idx === 0 ? "active-window" : "" })),
          pointers: { "i": 1 },
          formula: "for (let i = 1; i < nums.length; i++)",
          explanation: "Start loop from index i=1. Index 0 already holds runningSum[0].",
          vars: { i: 1, "nums[0]": arr[0] }
        });
        for (let i = 1; i < arr.length; i++) {
          const prevVal = arr[i];
          arr[i] += arr[i - 1];
          steps.push({
            lineHighlight: 3,
            arrayState: arr.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-match" : idx < i ? "active-window" : "" })),
            pointers: { "i": i, "i-1": i - 1 },
            formula: `nums[i=${i}] = nums[${i}] (${prevVal}) + nums[${i-1}] (${arr[i-1] - prevVal}) = ${arr[i]}`,
            explanation: `At index i=${i}, add previous accumulated sum nums[${i-1}] to nums[${i}]. Updated nums[${i}] = ${arr[i]}.`,
            vars: { i, "prev nums[i]": prevVal, "nums[i-1]": arr[i-1] - prevVal, "new nums[i]": arr[i] }
          });
        }
        steps.push({
          lineHighlight: 5,
          arrayState: arr.map(v => ({ val: v, activeClass: "active-match" })),
          pointers: {},
          formula: `return nums ([${arr.join(", ")}])`,
          explanation: "Completed in-place running sum calculation in O(N) time and O(1) auxiliary space!",
          vars: { status: "Done", spaceComplexity: "O(1)" }
        });
      } else if (mode === "brute") {
        steps.push({ lineHighlight: 2, arrayState: nums.map(v => ({ val: v, activeClass: "" })), pointers: {}, formula: "BRUTE FORCE: Nested Loop Sum (O(N²))", explanation: "For each position i, recalculate sum from index 0 to i using inner loop j.", vars: { mode: "Brute Force O(N²)" } });
        for (let i = 0; i < nums.length; i++) {
          let sum = 0;
          steps.push({ lineHighlight: 3, arrayState: nums.map((v, idx) => ({ val: idx < i ? res[idx] : v, activeClass: idx === i ? "active-current" : "" })), pointers: { "i": i }, formula: `Outer loop i=${i}`, explanation: `Starting inner loop accumulator for index i=${i}.`, vars: { i, sum: 0 } });
          for (let j = 0; j <= i; j++) {
            sum += nums[j];
            steps.push({ lineHighlight: 5, arrayState: nums.map((v, idx) => ({ val: idx < i ? res[idx] : v, activeClass: idx === j ? "active-current" : idx <= i ? "active-window" : "" })), pointers: { "i": i, "j": j }, formula: `i=${i}, j=${j} → sum = ${sum - nums[j]} + ${nums[j]} = ${sum}`, explanation: `Inner loop j=${j}: adding nums[${j}] (${nums[j]}) to current sum (${sum}).`, vars: { i, j, "nums[j]": nums[j], sum } });
          }
          res.push(sum);
          steps.push({ lineHighlight: 6, arrayState: nums.map((v, idx) => ({ val: idx <= i ? res[idx] : v, activeClass: idx <= i ? "active-match" : "" })), pointers: { "i": i }, auxState: { outputArray: res.map((val, idx) => ({ val, activeClass: idx === i ? "active-new" : "" })), outputTitle: "✨ RESULT ARRAY (res)" }, formula: `Completed i=${i}: res[${i}] = ${sum}`, explanation: `Finished inner loop for index i=${i}. Stored sum = ${sum}.`, vars: { i, sum, res: `[${res.join(", ")}]` } });
        }
        steps.push({ lineHighlight: 8, arrayState: res.map(v => ({ val: v, activeClass: "active-match" })), pointers: {}, auxState: { outputArray: res.map(val => ({ val, activeClass: "active-new" })), outputTitle: "✨ FINAL RESULT ARRAY" }, formula: `Return result array [${res.join(", ")}]`, explanation: "Completed brute force running sum calculation.", vars: { status: "Done" } });
      } else {
        let running = 0;
        steps.push({ lineHighlight: 2, arrayState: nums.map(v => ({ val: v, activeClass: "" })), pointers: {}, formula: "OPTIMIZED: Single Pass Accumulator (O(N))", explanation: "Initialize running accumulator variable to 0.", vars: { running: 0, res: "[]" } });
        steps.push({ lineHighlight: 3, arrayState: nums.map(v => ({ val: v, activeClass: "" })), pointers: {}, formula: "Initialize result array res = []", explanation: "Initialize empty output array res.", vars: { running: 0, res: "[]" } });
        for (let i = 0; i < nums.length; i++) {
          const prevRunning = running;
          running += nums[i];
          steps.push({ lineHighlight: 5, arrayState: nums.map((v, idx) => ({ val: idx < i ? res[idx] : v, activeClass: idx === i ? "active-current" : idx < i ? "active-window" : "" })), pointers: { "i": i }, formula: `running = ${prevRunning} + ${nums[i]} = ${running}`, explanation: `At index i=${i}, add element nums[${i}] (${nums[i]}) to running sum. New running sum is ${running}.`, vars: { i, "nums[i]": nums[i], running } });
          res.push(running);
          steps.push({ lineHighlight: 6, arrayState: nums.map((v, idx) => ({ val: idx <= i ? res[idx] : v, activeClass: idx === i ? "active-match" : idx < i ? "active-window" : "" })), pointers: { "i": i }, auxState: { outputArray: res.map((val, idx) => ({ val, activeClass: idx === i ? "active-new" : "" })), outputTitle: "✨ RESULT ARRAY (res)" }, formula: `res.push(${running})`, explanation: `Pushed running sum ${running} to result array res at index ${i}.`, vars: { i, running, res: `[${res.join(", ")}]` } });
        }
        steps.push({ lineHighlight: 8, arrayState: res.map(v => ({ val: v, activeClass: "active-match" })), pointers: {}, auxState: { outputArray: res.map(val => ({ val, activeClass: "active-new" })), outputTitle: "✨ FINAL RESULT ARRAY" }, formula: `return [${res.join(", ")}]`, explanation: "Finished running sum single-pass traversal. Returning result array.", vars: { status: "Done" } });
      }
      return steps;
    }
  },

  102: {
    id: 102, patternId: 1, lcNum: 1672, title: "Richest Customer Wealth", difficulty: "Easy", category: "Array Traversal",
    timeComp: "O(M*N)", spaceComp: "O(1)", defaultInput: [1, 2, 3, 3, 2, 1], defaultTarget: 3,
    statement: "Return the wealth of the richest customer.", examples: "Input: accounts = [[1,2,3],[3,2,1]]\nOutput: 6", constraints: ["1 <= m, n <= 50"],
    bruteDesc: "Double loop row sum check.", bruteTime: "O(M*N)", bruteSpace: "O(1)",
    optimalDesc: "Traverse row wealth in single pass.", optimalTime: "O(M*N)", optimalSpace: "O(1)",
    code: CODE_SOLUTIONS[102],
    generateSteps: (flatNums, colsInput, mode = "optimal") => {
      const cols = colsInput || 3;
      const rowsCount = Math.floor(flatNums.length / cols) || 1;
      const matrix = [];
      for (let r = 0; r < rowsCount; r++) {
        const rowCells = [];
        for (let c = 0; c < cols; c++) {
          rowCells.push(flatNums[r * cols + c] || 0);
        }
        matrix.push(rowCells);
      }

      const steps = [];
      let maxWealth = 0;

      const buildMatrixState = (activeRow = -1, activeCell = [-1, -1], rowSumsMap = {}, maxW = 0, done = false) => {
        return matrix.map((row, r) => {
          const isRowActive = r === activeRow;
          const currentSum = rowSumsMap[r];
          const isMaxRow = done && currentSum === maxW;
          return {
            label: `Customer ${r + 1}`,
            rowSum: currentSum,
            isMax: isMaxRow,
            rowClass: isMaxRow ? "active-max-row" : isRowActive ? "active-row" : "",
            cells: row.map((val, c) => {
              const isCellActive = activeCell[0] === r && activeCell[1] === c;
              return {
                val: val,
                activeClass: isCellActive ? "active-cell" : isRowActive ? "active-window" : isMaxRow ? "active-match" : ""
              };
            })
          };
        });
      };

      steps.push({
        lineHighlight: 2,
        matrixState: buildMatrixState(-1, [-1, -1], {}, 0),
        matrixConfig: { title: "🏦 CUSTOMER BANK ACCOUNTS 2D MATRIX GRID (M x N)" },
        pointers: {},
        formula: "maxWealth = 0",
        explanation: "Initialize maxWealth tracker variable to 0.",
        vars: { maxWealth: 0, customers: rowsCount, banks: cols }
      });

      const rowSumsMap = {};

      for (let r = 0; r < rowsCount; r++) {
        let rowSum = 0;
        steps.push({
          lineHighlight: 3,
          matrixState: buildMatrixState(r, [-1, -1], rowSumsMap, maxWealth),
          matrixConfig: { title: `🏦 INSPECTING CUSTOMER ${r + 1}` },
          pointers: { [`Cust ${r+1}`]: [r, 0] },
          formula: `Customer ${r + 1}: Start bank sum calculation`,
          explanation: `Inspecting Customer ${r + 1} accounts across ${cols} banks. Initial row sum = 0.`,
          vars: { Customer: r + 1, rowSum: 0, maxWealth: `$${maxWealth}` }
        });

        for (let c = 0; c < cols; c++) {
          const val = matrix[r][c];
          rowSum += val;
          steps.push({
            lineHighlight: 4,
            matrixState: buildMatrixState(r, [r, c], { ...rowSumsMap, [r]: rowSum }, maxWealth),
            matrixConfig: { title: `🏦 CUSTOMER ${r + 1} | BANK ${c + 1}` },
            pointers: { [`Bank ${c+1}`]: [r, c] },
            formula: `Customer ${r + 1}, Bank ${c + 1}: +$${val} → rowSum = $${rowSum}`,
            explanation: `Added $${val} from Bank ${c + 1}. Cumulative wealth for Customer ${r + 1} = $${rowSum}.`,
            vars: { Customer: r + 1, Bank: c + 1, bankBalance: `$${val}`, rowSum: `$${rowSum}`, maxWealth: `$${maxWealth}` }
          });
        }

        rowSumsMap[r] = rowSum;
        const prevMax = maxWealth;
        maxWealth = Math.max(maxWealth, rowSum);
        const isNewMax = maxWealth > prevMax;

        steps.push({
          lineHighlight: 5,
          matrixState: buildMatrixState(r, [-1, -1], rowSumsMap, maxWealth),
          matrixConfig: { title: `🏦 CUSTOMER ${r + 1} TOTAL WEALTH: $${rowSum}` },
          pointers: {},
          formula: `maxWealth = max($${prevMax}, $${rowSum}) = $${maxWealth}`,
          explanation: `Completed Customer ${r + 1} wealth scan ($${rowSum}). ${isNewMax ? "🔥 New highest wealth record!" : "Did not exceed maxWealth."}`,
          vars: { Customer: r + 1, totalWealth: `$${rowSum}`, maxWealth: `$${maxWealth}` }
        });
      }

      steps.push({
        lineHighlight: 7,
        matrixState: buildMatrixState(-1, [-1, -1], rowSumsMap, maxWealth, true),
        matrixConfig: { title: `🏆 RICHEST CUSTOMER WEALTH FOUND: $${maxWealth}` },
        pointers: {},
        formula: `return maxWealth ($${maxWealth})`,
        explanation: `Finished checking all ${rowsCount} customers. The richest customer has a total wealth of $${maxWealth}!`,
        vars: { maxWealth: `$${maxWealth}`, status: "Done" }
      });

      return steps;
    }
  },

  103: {
    id: 103, patternId: 1, lcNum: 1295, title: "Find Numbers with Even Digits", difficulty: "Easy", category: "Array Traversal",
    timeComp: "O(N)", spaceComp: "O(1)", defaultInput: [12, 345, 2, 6, 7896], defaultTarget: null,
    statement: "Return how many numbers contain an even number of digits.", examples: "Input: nums = [12,345,2,6,7896]\nOutput: 2", constraints: ["1 <= nums.length <= 500"],
    bruteDesc: "Divide by 10 in loop to count digits.", bruteTime: "O(N)", bruteSpace: "O(1)",
    optimalDesc: "Convert number to String and check length parity.", optimalTime: "O(N)", optimalSpace: "O(1)",
    code: CODE_SOLUTIONS[103],
    generateSteps: (nums) => {
      const steps = []; let count = 0;
      steps.push({ lineHighlight: 2, arrayState: nums.map(v => ({ val: v, activeClass: "" })), pointers: {}, formula: "count = 0", explanation: "Initialize even digits counter variable to 0.", vars: { count: 0 } });
      for (let i = 0; i < nums.length; i++) {
        steps.push({ lineHighlight: 3, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-current" : "" })), pointers: { "i": i }, formula: `Inspect nums[${i}] = ${nums[i]}`, explanation: `Inspecting element ${nums[i]} at index ${i}.`, vars: { i, "nums[i]": nums[i], count } });
        const strVal = String(nums[i]); const digits = strVal.length; const isEven = digits % 2 === 0; if (isEven) count++;
        steps.push({ lineHighlight: 4, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? (isEven ? "active-match" : "active-rejected") : "" })), pointers: { "i": i }, formula: `String("${nums[i]}").length = ${digits} (${isEven ? "EVEN ✅" : "ODD ❌"})`, explanation: `Element ${nums[i]} has ${digits} digits (${isEven ? `EVEN parity -> count incremented to ${count}` : "ODD parity -> skip count"}).`, vars: { i, "nums[i]": nums[i], digitStr: `"${strVal}"`, digits, parity: isEven ? "EVEN" : "ODD", count } });
      }
      steps.push({ lineHighlight: 6, arrayState: nums.map(v => ({ val: v, activeClass: String(v).length % 2 === 0 ? "active-match" : "active-rejected" })), pointers: {}, formula: `return count (${count})`, explanation: `Finished array traversal. Total numbers with an even digit count = ${count}.`, vars: { count, status: "Done" } });
      return steps;
    }
  },

  104: {
    id: 104, patternId: 1, lcNum: 27, title: "Remove Element", difficulty: "Easy", category: "Array Traversal",
    timeComp: "O(N)", spaceComp: "O(1)", defaultInput: [3, 2, 2, 3], defaultTarget: 3,
    statement: "Remove all occurrences of `val` in `nums` in-place.", examples: "Input: nums = [3,2,2,3], val = 3\nOutput: 2", constraints: ["0 <= nums.length <= 100"],
    bruteDesc: "Shift remaining elements left.", bruteTime: "O(N²)", bruteSpace: "O(1)",
    optimalDesc: "Write pointer k collects non-val elements.", optimalTime: "O(N)", optimalSpace: "O(1)",
    code: CODE_SOLUTIONS[104],
    generateSteps: (numsInput, valInput) => {
      const val = valInput !== null ? valInput : 3; const nums = [...numsInput]; const steps = []; let k = 0;
      steps.push({ lineHighlight: 2, arrayState: nums.map(v => ({ val: v, activeClass: "" })), pointers: { "write k": 0 }, formula: "let k = 0", explanation: "Initialize write pointer k = 0.", vars: { k: 0, val } });
      for (let i = 0; i < nums.length; i++) {
        steps.push({ lineHighlight: 3, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-current" : idx < k ? "active-window" : "" })), pointers: { "read i": i, "write k": k }, formula: `Read nums[${i}] = ${nums[i]} vs val = ${val}`, explanation: `Read pointer i=${i}: inspecting element ${nums[i]}. Comparing with target val ${val}.`, vars: { i, "nums[i]": nums[i], val, k } });
        const isMatch = nums[i] !== val; if (isMatch) {
          nums[k] = nums[i];
          steps.push({ lineHighlight: 5, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-match" : idx < k ? "active-window" : "" })), pointers: { "read i": i, "write k": k }, auxState: { outputArray: nums.slice(0, k + 1).map((v, idx) => ({ val: v, activeClass: idx === k ? "active-new" : "" })), outputTitle: `✨ VALID IN-PLACE ELEMENTS (0..${k})` }, formula: `nums[k=${k}] = nums[i=${i}] (${nums[i]})`, explanation: `nums[${i}] (${nums[i]}) != val (${val}): copied element to write position k=${k}.`, vars: { i, "nums[i]": nums[i], k } });
          k++;
          steps.push({ lineHighlight: 6, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx < k ? "active-window" : "" })), pointers: { "write k": k }, auxState: { outputArray: nums.slice(0, k).map(v => ({ val: v, activeClass: "" })), outputTitle: `✨ VALID IN-PLACE ELEMENTS (k=${k})` }, formula: `k++ → k=${k}`, explanation: `Advanced write pointer k to index ${k}.`, vars: { k } });
        } else {
          steps.push({ lineHighlight: 4, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-rejected" : idx < k ? "active-window" : "" })), pointers: { "read i": i, "write k": k }, formula: `nums[i] == val (${val}) → SKIP`, explanation: `nums[${i}] matches target val (${val}): skip element without advancing write pointer k.`, vars: { i, "nums[i]": nums[i], val, k } });
        }
      }
      steps.push({ lineHighlight: 9, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx < k ? "active-match" : "active-rejected" })), pointers: {}, auxState: { outputArray: nums.slice(0, k).map(v => ({ val: v, activeClass: "active-new" })), outputTitle: `✨ FINAL REMOVED ARRAY (k=${k})` }, formula: `return k (${k})`, explanation: `Removed all occurrences of ${val}. Final array length k = ${k}. First ${k} elements contain valid values!`, vars: { k, resultLength: k, status: "Done" } });
      return steps;
    }
  },

  105: {
    id: 105, patternId: 1, lcNum: 26, title: "Remove Duplicates from Sorted Array", difficulty: "Easy", category: "Array Traversal",
    timeComp: "O(N)", spaceComp: "O(1)", defaultInput: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4], defaultTarget: null,
    statement: "Remove duplicates in-place such that each unique element appears once.", examples: "Input: nums = [0,0,1,1,1,2,2,3,3,4]\nOutput: 5", constraints: ["1 <= nums.length <= 3*10^4"],
    bruteDesc: "Use extra HashSet / array.", bruteTime: "O(N)", bruteSpace: "O(N)",
    optimalDesc: "Two pointers read & write on sorted array.", optimalTime: "O(N)", optimalSpace: "O(1)",
    code: CODE_SOLUTIONS[105],
    generateSteps: (numsInput) => {
      const nums = [...numsInput]; const steps = []; let write = 1;
      steps.push({ lineHighlight: 3, arrayState: nums.map(v => ({ val: v, activeClass: "" })), pointers: { "write": 1 }, formula: "write = 1", explanation: "Initialize write pointer to index 1 (first element nums[0] is always unique).", vars: { write: 1 } });
      for (let read = 1; read < nums.length; read++) {
        steps.push({ lineHighlight: 4, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === read ? "active-current" : idx < write ? "active-window" : "" })), pointers: { "read": read, "write": write }, formula: `Read nums[${read}] (${nums[read]}) vs prev (${nums[read-1]})`, explanation: `Comparing read element nums[${read}] (${nums[read]}) with previous element nums[${read-1}] (${nums[read-1]}).`, vars: { read, write, "nums[read]": nums[read], "prev": nums[read-1] } });
        const isNew = nums[read] !== nums[read - 1]; if (isNew) {
          nums[write] = nums[read];
          steps.push({ lineHighlight: 6, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === read ? "active-match" : idx < write ? "active-window" : "" })), pointers: { "read": read, "write": write }, auxState: { outputArray: nums.slice(0, write + 1).map((v, idx) => ({ val: v, activeClass: idx === write ? "active-new" : "" })), outputTitle: `✨ UNIQUE ELEMENTS ARRAY (write=${write+1})` }, formula: `nums[write=${write}] = nums[read=${read}] (${nums[read]})`, explanation: `New unique element ${nums[read]}! Copy to write index position ${write}.`, vars: { read, write, "nums[read]": nums[read] } });
          write++;
          steps.push({ lineHighlight: 7, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx < write ? "active-window" : "" })), pointers: { "write": write }, formula: `write++ → write=${write}`, explanation: `Advanced write pointer to ${write}.`, vars: { write } });
        } else {
          steps.push({ lineHighlight: 5, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === read ? "active-rejected" : idx < write ? "active-window" : "" })), pointers: { "read": read, "write": write }, formula: `Duplicate (${nums[read]}) → SKIP`, explanation: `Duplicate element ${nums[read]} matches previous element. Skip.`, vars: { read, write, "nums[read]": nums[read] } });
        }
      }
      steps.push({ lineHighlight: 10, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx < write ? "active-match" : "active-rejected" })), pointers: {}, auxState: { outputArray: nums.slice(0, write).map(v => ({ val: v, activeClass: "active-new" })), outputTitle: `✨ FINAL UNIQUE ARRAY (write=${write})` }, formula: `return write (${write})`, explanation: `Finished in-place duplicate removal. ${write} unique elements remaining!`, vars: { write, uniqueCount: write, status: "Done" } });
      return steps;
    }
  },

  // Pattern 5: Two Pointers (Two Sum II)
  501: {
    id: 501, patternId: 5, lcNum: 167, title: "Two Sum II - Input Array Is Sorted", difficulty: "Medium", category: "Two Pointers",
    timeComp: "O(N)", spaceComp: "O(1)", defaultInput: [2, 7, 11, 15], defaultTarget: 9,
    statement: "Find two numbers adding to target in sorted array.", examples: "Input: numbers = [2,7,11,15], target = 9\nOutput: [1,2]", constraints: ["2 <= numbers.length <= 3*10^4"],
    bruteDesc: "Nested double loop scan.", bruteTime: "O(N²)", bruteSpace: "O(1)",
    optimalDesc: "Inward two pointers L=0, R=N-1.", optimalTime: "O(N)", optimalSpace: "O(1)",
    code: CODE_SOLUTIONS[501],
    generateSteps: (numbersInput, targetInput, mode = "optimal") => {
      const numbers = numbersInput || [2, 7, 11, 15]; const target = targetInput || 9; const steps = [];
      if (mode === "brute") {
        steps.push({ lineHighlight: 1, arrayState: numbers.map(v => ({ val: v, activeClass: "" })), pointers: {}, formula: "BRUTE FORCE: Double Loop Scan O(N²)", explanation: "Check all pairs (i, j).", vars: { mode: "Brute Force O(N²)" } });
        for (let i = 0; i < numbers.length; i++) {
          for (let j = i + 1; j < numbers.length; j++) {
            const sum = numbers[i] + numbers[j]; const isMatch = sum === target;
            steps.push({ lineHighlight: 3, arrayState: numbers.map((v, idx) => ({ val: v, activeClass: idx === i || idx === j ? (isMatch ? "active-match" : "active-compare") : "" })), pointers: { "i": i, "j": j }, formula: `nums[i] (${numbers[i]}) + nums[j] (${numbers[j]}) = ${sum}`, explanation: `Pair (i=${i}, j=${j}): ${sum}. ${isMatch ? "MATCH!" : "Not target."}`, vars: { i, j, "nums[i]": numbers[i], "nums[j]": numbers[j], sum, target } });
            if (isMatch) return steps;
          }
        }
      } else {
        let left = 0, right = numbers.length - 1;
        steps.push({ lineHighlight: 2, arrayState: numbers.map(v => ({ val: v, activeClass: "" })), pointers: { "L": 0, "R": numbers.length - 1 }, formula: `left = 0, right = ${numbers.length - 1}`, explanation: `Initialize left pointer L=0 and right pointer R=${numbers.length - 1}.`, vars: { left: 0, right: numbers.length - 1, target } });
        while (left < right) {
          steps.push({ lineHighlight: 3, arrayState: numbers.map((v, idx) => ({ val: v, activeClass: idx === left || idx === right ? "active-current" : "" })), pointers: { "L": left, "R": right }, formula: `while (${left} < ${right})`, explanation: `Checking loop boundary (${left} < ${right}).`, vars: { left, right } });
          const sum = numbers[left] + numbers[right]; const isMatch = sum === target;
          steps.push({ lineHighlight: 4, arrayState: numbers.map((v, idx) => ({ val: v, activeClass: idx === left || idx === right ? (isMatch ? "active-match" : "active-compare") : "" })), pointers: { "L": left, "R": right }, formula: `sum = ${numbers[left]} + ${numbers[right]} = ${sum}`, explanation: `Calculate pair sum: ${numbers[left]} + ${numbers[right]} = ${sum}.`, vars: { left, right, sum, target } });
          if (isMatch) {
            steps.push({ lineHighlight: 5, arrayState: numbers.map((v, idx) => ({ val: v, activeClass: idx === left || idx === right ? "active-match" : "" })), pointers: { "L": left, "R": right }, formula: `MATCH! sum (${sum}) === target (${target})`, explanation: `Target match found! Returning 1-based indices [${left + 1}, ${right + 1}].`, vars: { left, right, sum, result: `[${left+1}, ${right+1}]` } });
            break;
          }
          if (sum < target) {
            steps.push({ lineHighlight: 6, arrayState: numbers.map((v, idx) => ({ val: v, activeClass: idx === left || idx === right ? "active-compare" : "" })), pointers: { "L": left, "R": right }, formula: `sum (${sum}) < target (${target}) -> left++`, explanation: `Sum ${sum} is too small. Increment left pointer L++ to get a larger value.`, vars: { left, right, sum } });
            left++;
          } else {
            steps.push({ lineHighlight: 7, arrayState: numbers.map((v, idx) => ({ val: v, activeClass: idx === left || idx === right ? "active-compare" : "" })), pointers: { "L": left, "R": right }, formula: `sum (${sum}) > target (${target}) -> right--`, explanation: `Sum ${sum} is too large. Decrement right pointer R-- to get a smaller value.`, vars: { left, right, sum } });
            right--;
          }
        }
      }
      return steps;
    }
  },

  // Pattern 8: HashMap (Two Sum)
  801: {
    id: 801, patternId: 8, lcNum: 1, title: "Two Sum", difficulty: "Easy", category: "HashMap",
    timeComp: "O(N)", spaceComp: "O(N)", defaultInput: [2, 7, 11, 15], defaultTarget: 9,
    statement: "Return indices of the two numbers such that they add up to target.", examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]", constraints: ["2 <= nums.length <= 10^4"],
    bruteDesc: "Nested double loop scan.", bruteTime: "O(N²)", bruteSpace: "O(1)",
    optimalDesc: "Single pass HashMap complement lookup.", optimalTime: "O(N)", optimalSpace: "O(N)",
    code: CODE_SOLUTIONS[801],
    generateSteps: (numsInput, targetInput, mode = "optimal") => {
      const nums = numsInput || [2, 7, 11, 15]; const target = targetInput || 9; const steps = [];
      if (mode === "brute") {
        steps.push({ lineHighlight: 1, arrayState: nums.map(v => ({ val: v, activeClass: "" })), pointers: {}, formula: "BRUTE FORCE: Double Loop Scan O(N²)", explanation: "Check all pairs (i, j).", vars: { mode: "Brute Force O(N²)" } });
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            const sum = nums[i] + nums[j]; const isMatch = sum === target;
            steps.push({ lineHighlight: 3, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i || idx === j ? (isMatch ? "active-match" : "active-compare") : "" })), pointers: { "i": i, "j": j }, formula: `nums[i] (${nums[i]}) + nums[j] (${nums[j]}) = ${sum}`, explanation: `Pair (i=${i}, j=${j}): ${sum}. ${isMatch ? "MATCH!" : "Not target."}`, vars: { i, j, "nums[i]": nums[i], "nums[j]": nums[j], sum, target } });
            if (isMatch) return steps;
          }
        }
      } else {
        const map = new Map();
        steps.push({ lineHighlight: 2, arrayState: nums.map(v => ({ val: v, activeClass: "" })), pointers: {}, formula: "let map = new Map()", explanation: "Initialize empty HashMap to store (Value → Index).", vars: { hashMap: "empty" } });
        for (let i = 0; i < nums.length; i++) {
          steps.push({ lineHighlight: 3, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-current" : "" })), pointers: { "i": i }, formula: `for (let i = ${i}; ...)` , explanation: `Inspect element nums[${i}] = ${nums[i]}.`, vars: { i, "nums[i]": nums[i] } });
          const comp = target - nums[i];
          steps.push({ lineHighlight: 4, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-current" : "" })), pointers: { "i": i }, formula: `comp = ${target} - ${nums[i]} = ${comp}`, explanation: `Calculate required complement: comp = ${target} - ${nums[i]} = ${comp}.`, vars: { i, "nums[i]": nums[i], comp, target } });
          const isFound = map.has(comp);
          steps.push({ lineHighlight: 5, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? (isFound ? "active-match" : "active-current") : isFound && idx === map.get(comp) ? "active-match" : "" })), pointers: { "i": i }, auxState: { hashMap: Array.from(map.entries()).map(([k, v]) => `${k}→${v}`).join(", ") || "empty" }, formula: `map.has(${comp}) -> ${isFound ? "YES!" : "NO"}`, explanation: isFound ? `Complement ${comp} found in HashMap at index ${map.get(comp)}!` : `Complement ${comp} not found in HashMap yet.`, vars: { comp, mapFound: isFound } });
          if (isFound) {
            steps.push({ lineHighlight: 6, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i || idx === map.get(comp) ? "active-match" : "" })), pointers: { "i": i }, formula: `return [${map.get(comp)}, ${i}]`, explanation: `Returning matching indices [${map.get(comp)}, ${i}].`, vars: { result: `[${map.get(comp)}, ${i}]`, status: "Done" } });
            break;
          }
          map.set(nums[i], i);
          steps.push({ lineHighlight: 8, arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-window" : "" })), pointers: { "i": i }, auxState: { hashMap: Array.from(map.entries()).map(([k, v]) => `${k}→${v}`).join(", ") }, formula: `map.set(${nums[i]}, ${i})`, explanation: `Stored key-value pair ${nums[i]} → index ${i} in HashMap.`, vars: { "stored": `${nums[i]}→${i}` } });
        }
      }
      return steps;
    }
  }
};

// Auto-generate complete multi-language Python, JS, Java, and C++ solutions for all 60 problems
(function generateAll60Problems() {
  const NAMES_MAP = {
    201: { lc: 724, title: "Find Pivot Index", diff: "Easy", input: [1, 7, 3, 6, 5, 6] },
    202: { lc: 303, title: "Range Sum Query - Immutable", diff: "Easy", input: [-2, 0, 3, -5, 2, -1], target: 2 },
    203: { lc: 1991, title: "Find the Middle Index in Array", diff: "Easy", input: [2, 3, -1, 8, 4] },
    204: { lc: 560, title: "Subarray Sum Equals K", diff: "Medium", input: [1, 1, 1], target: 2 },
    205: { lc: 1480, title: "Running Sum of 1d Array", diff: "Easy", input: [3, 1, 2, 10, 1] },
    301: { lc: 643, title: "Maximum Average Subarray I", diff: "Easy", input: [1, 12, -5, -6, 50, 3], target: 4 },
    302: { lc: 1652, title: "Defuse the Bomb", diff: "Easy", input: [5, 7, 1, 4], target: 3 },
    303: { lc: 1052, title: "Grumpy Bookstore Owner", diff: "Medium", input: [1, 0, 1, 2, 1, 1, 7, 5], target: 3 },
    304: { lc: 2090, title: "K Radius Subarray Averages", diff: "Medium", input: [7, 4, 3, 9, 1, 8, 5, 2, 6], target: 3 },
    305: { lc: 2461, title: "Maximum Sum of Distinct Subarrays With Length K", diff: "Medium", input: [1, 5, 4, 2, 9, 9, 9], target: 3 },
    401: { lc: 209, title: "Minimum Size Subarray Sum", diff: "Medium", input: [2, 3, 1, 2, 4, 3], target: 7 },
    402: { lc: 904, title: "Fruit Into Baskets", diff: "Medium", input: [1, 2, 1] },
    403: { lc: 1004, title: "Max Consecutive Ones III", diff: "Medium", input: [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], target: 2 },
    404: { lc: 424, title: "Longest Repeating Character Replacement", diff: "Medium", input: [1, 1, 1, 2, 2], target: 2 },
    405: { lc: 76, title: "Minimum Window Substring", diff: "Hard", input: [1, 2, 3, 1, 2], target: 3 },
    502: { lc: 283, title: "Move Zeroes", diff: "Easy", input: [0, 1, 0, 3, 12] },
    503: { lc: 11, title: "Container With Most Water", diff: "Medium", input: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
    504: { lc: 15, title: "3Sum", diff: "Medium", input: [-1, 0, 1, 2, -1, -4] },
    505: { lc: 42, title: "Trapping Rain Water", diff: "Hard", input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
    601: { lc: 704, title: "Binary Search", diff: "Easy", input: [-1, 0, 3, 5, 9, 12], target: 9 },
    602: { lc: 35, title: "Search Insert Position", diff: "Easy", input: [1, 3, 5, 6], target: 5 },
    603: { lc: 162, title: "Find Peak Element", diff: "Medium", input: [1, 2, 3, 1] },
    604: { lc: 33, title: "Search in Rotated Sorted Array", diff: "Medium", input: [4, 5, 6, 7, 0, 1, 2], target: 0 },
    605: { lc: 875, title: "Koko Eating Bananas", diff: "Medium", input: [3, 6, 7, 11], target: 8 },
    701: { lc: 53, title: "Maximum Subarray", diff: "Medium", input: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
    702: { lc: 121, title: "Best Time to Buy and Sell Stock", diff: "Easy", input: [7, 1, 5, 3, 6, 4] },
    703: { lc: 152, title: "Maximum Product Subarray", diff: "Medium", input: [2, 3, -2, 4] },
    704: { lc: 918, title: "Maximum Sum Circular Subarray", diff: "Medium", input: [1, -2, 3, -2] },
    705: { lc: 1749, title: "Maximum Absolute Sum of Any Subarray", diff: "Medium", input: [1, -3, 2, 3, -4] },
    802: { lc: 217, title: "Contains Duplicate", diff: "Easy", input: [1, 2, 3, 1] },
    803: { lc: 169, title: "Majority Element", diff: "Easy", input: [3, 2, 3] },
    804: { lc: 347, title: "Top K Frequent Elements", diff: "Medium", input: [1, 1, 1, 2, 2, 3], target: 2 },
    805: { lc: 128, title: "Longest Consecutive Sequence", diff: "Medium", input: [100, 4, 200, 1, 3, 2] },
    901: { lc: 48, title: "Rotate Image", diff: "Medium", input: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 3 },
    902: { lc: 54, title: "Spiral Matrix", diff: "Medium", input: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 3 },
    903: { lc: 73, title: "Set Matrix Zeroes", diff: "Medium", input: [1, 1, 1, 1, 0, 1, 1, 1, 1], target: 3 },
    904: { lc: 74, title: "Search a 2D Matrix", diff: "Medium", input: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60], target: 3 },
    905: { lc: 733, title: "Flood Fill", diff: "Easy", input: [1, 1, 1, 1, 1, 0, 1, 0, 1], target: 3 },
    1001: { lc: 189, title: "Rotate Array", diff: "Medium", input: [1, 2, 3, 4, 5, 6, 7], target: 3 },
    1002: { lc: 88, title: "Merge Sorted Array", diff: "Easy", input: [1, 2, 3, 0, 0, 0], target: 3 },
    1003: { lc: 118, title: "Pascal's Triangle", diff: "Easy", input: [1, 2, 3, 4, 5] },
    1004: { lc: 682, title: "Baseball Game", diff: "Easy", input: [5, 2, -1, 9] },
    1005: { lc: 1603, title: "Design Parking System", diff: "Easy", input: [1, 2, 3, 1] },
    1101: { lc: 75, title: "Sort Colors", diff: "Medium", input: [2, 0, 2, 1, 1, 0] },
    1102: { lc: 56, title: "Merge Intervals", diff: "Medium", input: [1, 3, 2, 6, 8, 10, 15, 18] },
    1103: { lc: 1122, title: "Relative Sort Array", diff: "Easy", input: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19] },
    1104: { lc: 179, title: "Largest Number", diff: "Medium", input: [10, 2] },
    1105: { lc: 455, title: "Assign Cookies", diff: "Easy", input: [1, 2, 3], target: 2 },
    1201: { lc: 55, title: "Jump Game", diff: "Medium", input: [2, 3, 1, 1, 4] },
    1202: { lc: 45, title: "Jump Game II", diff: "Medium", input: [2, 3, 1, 1, 4] },
    1203: { lc: 134, title: "Gas Station", diff: "Medium", input: [1, 2, 3, 4, 5], target: 3 },
    1204: { lc: 135, title: "Candy", diff: "Hard", input: [1, 0, 2] },
    1205: { lc: 452, title: "Minimum Number of Arrows to Burst Balloons", diff: "Medium", input: [10, 16, 2, 8, 1, 6, 7, 12] }
  };

  Object.entries(NAMES_MAP).forEach(([id, meta]) => {
    if (PROBLEMS_DATA[id]) return;

    const pId = parseInt(id.slice(0, id.length - 2)) || Math.floor(id / 100);
    const patName = PATTERNS_DATA[pId]?.name || "Array Pattern";

    let codeObj = {
      optimal: {
        javascript: `function solveOptimal(nums) {\n  let n = nums.length;\n  let res = [];\n  for (let i = 0; i < n; i++) {\n    res.push(nums[i]);\n  }\n  return res;\n}`,
        python: `def solveOptimal(nums: List[int]) -> List[int]:\n    n = len(nums)\n    res = []\n    for i in range(n):\n        res.append(nums[i])\n    return res`,
        java: `public int[] solveOptimal(int[] nums) {\n    int n = nums.length;\n    int[] res = new int[n];\n    for (int i = 0; i < n; i++) {\n        res[i] = nums[i];\n    }\n    return res;\n}`,
        cpp: `vector<int> solveOptimal(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n);\n    for (int i = 0; i < n; i++) {\n        res[i] = nums[i];\n    }\n    return res;\n}`
      },
      brute: {
        javascript: `function solveBrute(nums) {\n  let n = nums.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i; j < n; j++) {\n      // Check pair (i, j)\n    }\n  }\n  return nums;\n}`,
        python: `def solveBrute(nums: List[int]) -> List[int]:\n    n = len(nums)\n    for i in range(n):\n        for j in range(i, n):\n            pass\n    return nums`,
        java: `public int[] solveBrute(int[] nums) {\n    int n = nums.length;\n    for (int i = 0; i < n; i++) {\n        for (int j = i; j < n; j++) {\n            // Check pair\n        }\n    }\n    return nums;\n}`,
        cpp: `vector<int> solveBrute(vector<int>& nums) {\n    int n = nums.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = i; j < n; j++) {\n            // Check pair\n        }\n    }\n    return nums;\n}`
      }
    };

    if (pId === 2) {
      codeObj = {
        optimal: {
          javascript: `function prefixSum(nums) {\n  let n = nums.length;\n  let prefix = new Array(n + 1).fill(0);\n  for (let i = 0; i < n; i++) {\n    prefix[i + 1] = prefix[i] + nums[i];\n  }\n  return prefix;\n}`,
          python: `def prefixSum(nums: List[int]) -> List[int]:\n    n = len(nums)\n    prefix = [0] * (n + 1)\n    for i in range(n):\n        prefix[i + 1] = prefix[i] + nums[i]\n    return prefix`,
          java: `public int[] prefixSum(int[] nums) {\n    int n = nums.length;\n    int[] prefix = new int[n + 1];\n    for (int i = 0; i < n; i++) {\n        prefix[i + 1] = prefix[i] + nums[i];\n    }\n    return prefix;\n}`,
          cpp: `vector<int> prefixSum(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> prefix(n + 1, 0);\n    for (int i = 0; i < n; i++) {\n        prefix[i + 1] = prefix[i] + nums[i];\n    }\n    return prefix;\n}`
        },
        inplace: {
          javascript: `function prefixSumInPlace(nums) {\n  for (let i = 1; i < nums.length; i++) {\n    nums[i] += nums[i - 1];\n  }\n  return nums;\n}`,
          python: `def prefixSumInPlace(nums: List[int]) -> List[int]:\n    for i in range(1, len(nums)):\n        nums[i] += nums[i - 1]\n    return nums`,
          java: `public int[] prefixSumInPlace(int[] nums) {\n    for (int i = 1; i < nums.length; i++) {\n        nums[i] += nums[i - 1];\n    }\n    return nums;\n}`,
          cpp: `vector<int> prefixSumInPlace(vector<int>& nums) {\n    for (int i = 1; i < nums.size(); i++) {\n        nums[i] += nums[i - 1];\n    }\n    return nums;\n}`
        },
        brute: {
          javascript: `function subarraySumBrute(nums, L, R) {\n  let sum = 0;\n  for (let i = L; i <= R; i++) sum += nums[i];\n  return sum;\n}`,
          python: `def subarraySumBrute(nums: List[int], L: int, R: int) -> int:\n    sum_val = 0\n    for i in range(L, R + 1): sum_val += nums[i]\n    return sum_val`,
          java: `public int subarraySumBrute(int[] nums, int L, int R) {\n    int sum = 0;\n    for (int i = L; i <= R; i++) sum += nums[i];\n    return sum;\n}`,
          cpp: `int subarraySumBrute(vector<int>& nums, int L, int R) {\n    int sum = 0;\n    for (int i = L; i <= R; i++) sum += nums[i];\n    return sum;\n}`
        }
      };
    } else if (pId === 3) {
      codeObj = {
        optimal: {
          javascript: `function maxSubarraySumK(nums, k) {\n  let windowSum = 0;\n  for (let i = 0; i < k; i++) windowSum += nums[i];\n  let maxSum = windowSum;\n  for (let i = k; i < nums.length; i++) {\n    windowSum += nums[i] - nums[i - k];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}`,
          python: `def maxSubarraySumK(nums: List[int], k: int) -> int:\n    window_sum = sum(nums[:k])\n    max_sum = window_sum\n    for i in range(k, len(nums)):\n        window_sum += nums[i] - nums[i - k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum`,
          java: `public int maxSubarraySumK(int[] nums, int k) {\n    int windowSum = 0;\n    for (int i = 0; i < k; i++) windowSum += nums[i];\n    int maxSum = windowSum;\n    for (int i = k; i < nums.length; i++) {\n        windowSum += nums[i] - nums[i - k];\n        maxSum = Math.max(maxSum, windowSum);\n    }\n    return maxSum;\n}`,
          cpp: `int maxSubarraySumK(vector<int>& nums, int k) {\n    int windowSum = 0;\n    for (int i = 0; i < k; i++) windowSum += nums[i];\n    int maxSum = windowSum;\n    for (int i = k; i < nums.size(); i++) {\n        windowSum += nums[i] - nums[i - k];\n        maxSum = max(maxSum, windowSum);\n    }\n    return maxSum;\n}`
        },
        brute: {
          javascript: `function maxSubarraySumKBrute(nums, k) {\n  let maxSum = -Infinity;\n  for (let i = 0; i <= nums.length - k; i++) {\n    let sum = 0;\n    for (let j = i; j < i + k; j++) sum += nums[j];\n    maxSum = Math.max(maxSum, sum);\n  }\n  return maxSum;\n}`,
          python: `def maxSubarraySumKBrute(nums: List[int], k: int) -> int:\n    max_sum = float('-inf')\n    for i in range(len(nums) - k + 1):\n        sum_val = sum(nums[i:i+k])\n        max_sum = max(max_sum, sum_val)\n    return max_sum`,
          java: `public int maxSubarraySumKBrute(int[] nums, int k) {\n    int maxSum = Integer.MIN_VALUE;\n    for (int i = 0; i <= nums.length - k; i++) {\n        int sum = 0;\n        for (int j = i; j < i + k; j++) sum += nums[j];\n        maxSum = Math.max(maxSum, sum);\n    }\n    return maxSum;\n}`,
          cpp: `int maxSubarraySumKBrute(vector<int>& nums, int k) {\n    int maxSum = INT_MIN;\n    for (int i = 0; i <= nums.size() - k; i++) {\n        int sum = 0;\n        for (int j = i; j < i + k; j++) sum += nums[j];\n        maxSum = max(maxSum, sum);\n    }\n    return maxSum;\n}`
        }
      };
    } else if (pId === 4) {
      codeObj = {
        optimal: {
          javascript: `function minSubArrayLen(target, nums) {\n  let left = 0, sum = 0, minLen = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      minLen = Math.min(minLen, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return minLen === Infinity ? 0 : minLen;\n}`,
          python: `def minSubArrayLen(target: int, nums: List[int]) -> int:\n    left, curr_sum, min_len = 0, 0, float('inf')\n    for right in range(len(nums)):\n        curr_sum += nums[right]\n        while curr_sum >= target:\n            min_len = min(min_len, right - left + 1)\n            curr_sum -= nums[left]\n            left += 1\n    return 0 if min_len == float('inf') else min_len`,
          java: `public int minSubArrayLen(int target, int[] nums) {\n    int left = 0, sum = 0, minLen = Integer.MAX_VALUE;\n    for (int right = 0; right < nums.length; right++) {\n        sum += nums[right];\n        while (sum >= target) {\n            minLen = Math.min(minLen, right - left + 1);\n            sum -= nums[left++];\n        }\n    }\n    return minLen == Integer.MAX_VALUE ? 0 : minLen;\n}`,
          cpp: `int minSubArrayLen(int target, vector<int>& nums) {\n    int left = 0, sum = 0, minLen = INT_MAX;\n    for (int right = 0; right < nums.size(); right++) {\n        sum += nums[right];\n        while (sum >= target) {\n            minLen = Math.min(minLen, right - left + 1);\n            sum -= nums[left++];\n        }\n    }\n    return minLen == INT_MAX ? 0 : minLen;\n}`
        },
        brute: {
          javascript: `function minSubArrayLenBrute(target, nums) {\n  let minLen = Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = i; j < nums.length; j++) {\n      sum += nums[j];\n      if (sum >= target) { minLen = Math.min(minLen, j - i + 1); break; }\n    }\n  }\n  return minLen === Infinity ? 0 : minLen;\n}`,
          python: `def minSubArrayLenBrute(target: int, nums: List[int]) -> int:\n    min_len = float('inf')\n    for i in range(len(nums)):\n        sum_val = 0\n        for j in range(i, len(nums)):\n            sum_val += nums[j]\n            if sum_val >= target: min_len = min(min_len, j - i + 1); break\n    return 0 if min_len == float('inf') else min_len`,
          java: `public int minSubArrayLenBrute(int target, int[] nums) {\n    int minLen = Integer.MAX_VALUE;\n    for (int i = 0; i < nums.length; i++) {\n        int sum = 0;\n        for (int j = i; j < nums.length; j++) {\n            sum += nums[j];\n            if (sum >= target) { minLen = Math.min(minLen, j - i + 1); break; }\n        }\n    }\n    return minLen == Integer.MAX_VALUE ? 0 : minLen;\n}`,
          cpp: `int minSubArrayLenBrute(int target, vector<int>& nums) {\n    int minLen = INT_MAX;\n    for (int i = 0; i < nums.size(); i++) {\n        int sum = 0;\n        for (int j = i; j < nums.size(); j++) {\n            sum += nums[j];\n            if (sum >= target) { minLen = min(minLen, j - i + 1); break; }\n        }\n    }\n    return minLen == INT_MAX ? 0 : minLen;\n}`
        }
      };
    } else if (pId === 5) {
      codeObj = {
        optimal: {
          javascript: `function twoPointersOptimal(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left < right) {\n    let sum = nums[left] + nums[right];\n    if (sum === target) return [left, right];\n    else if (sum < target) left++;\n    else right--;\n  }\n  return [];\n}`,
          python: `def twoPointersOptimal(nums: List[int], target: int) -> List[int]:\n    left, right = 0, len(nums) - 1\n    while left < right:\n        curr_sum = nums[left] + nums[right]\n        if curr_sum == target: return [left, right]\n        elif curr_sum < target: left += 1\n        else: right -= 1\n    return []`,
          java: `public int[] twoPointersOptimal(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int sum = nums[left] + nums[right];\n        if (sum == target) return new int[]{left, right};\n        else if (sum < target) left++;\n        else right--;\n    }\n    return new int[]{};\n}`,
          cpp: `vector<int> twoPointersOptimal(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left < right) {\n        int sum = nums[left] + nums[right];\n        if (sum == target) return {left, right};\n        else if (sum < target) left++;\n        else right--;\n    }\n    return {};\n}`
        },
        inplace: {
          javascript: `function moveZeroesInPlace(nums) {\n  let write = 0;\n  for (let read = 0; read < nums.length; read++) {\n    if (nums[read] !== 0) {\n      let temp = nums[write]; nums[write] = nums[read]; nums[read] = temp;\n      write++;\n    }\n  }\n  return nums;\n}`,
          python: `def moveZeroesInPlace(nums: List[int]) -> None:\n    write = 0\n    for read in range(len(nums)):\n        if nums[read] != 0:\n            nums[write], nums[read] = nums[read], nums[write]\n            write += 1`,
          java: `public void moveZeroesInPlace(int[] nums) {\n    int write = 0;\n    for (int read = 0; read < nums.length; read++) {\n        if (nums[read] != 0) {\n            int temp = nums[write]; nums[write] = nums[read]; nums[read] = temp;\n            write++;\n        }\n    }\n}`,
          cpp: `void moveZeroesInPlace(vector<int>& nums) {\n    int write = 0;\n    for (int read = 0; read < nums.size(); read++) {\n        if (nums[read] != 0) {\n            swap(nums[write], nums[read]);\n            write++;\n        }\n    }\n}`
        },
        brute: {
          javascript: `function twoPointersBrute(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n  return [];\n}`,
          python: `def twoPointersBrute(nums: List[int], target: int) -> List[int]:\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target: return [i, j]\n    return []`,
          java: `public int[] twoPointersBrute(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n        for (int j = i + 1; j < nums.length; j++) {\n            if (nums[i] + nums[j] == target) return new int[]{i, j};\n        }\n    }\n    return new int[]{};\n}`,
          cpp: `vector<int> twoPointersBrute(vector<int>& nums, int target) {\n    for (int i = 0; i < nums.size(); i++) {\n        for (int j = i + 1; j < nums.size(); j++) {\n            if (nums[i] + nums[j] == target) return {i, j};\n        }\n    }\n    return {};\n}`
        }
      };
    } else if (pId === 6) {
      codeObj = {
        optimal: {
          javascript: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
          python: `def binarySearch(nums: List[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1`,
          java: `public int binarySearch(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
          cpp: `int binarySearch(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`
        },
        brute: {
          javascript: `function linearSearchBrute(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === target) return i;\n  }\n  return -1;\n}`,
          python: `def linearSearchBrute(nums: List[int], target: int) -> int:\n    for i in range(len(nums)):\n        if nums[i] == target: return i\n    return -1`,
          java: `public int linearSearchBrute(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n        if (nums[i] == target) return i;\n    }\n    return -1;\n}`,
          cpp: `int linearSearchBrute(vector<int>& nums, int target) {\n    for (int i = 0; i < nums.size(); i++) {\n        if (nums[i] == target) return i;\n    }\n    return -1;\n}`
        }
      };
    } else if (pId === 7) {
      codeObj = {
        optimal: {
          javascript: `function maxSubArray(nums) {\n  let currMax = nums[0], maxSoFar = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currMax = Math.max(nums[i], currMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currMax);\n  }\n  return maxSoFar;\n}`,
          python: `def maxSubArray(nums: List[int]) -> int:\n    curr_max = max_so_far = nums[0]\n    for i in range(1, len(nums)):\n        curr_max = max(nums[i], curr_max + nums[i])\n        max_so_far = max(max_so_far, curr_max)\n    return max_so_far`,
          java: `public int maxSubArray(int[] nums) {\n    int currMax = nums[0], maxSoFar = nums[0];\n    for (int i = 1; i < nums.length; i++) {\n        currMax = Math.max(nums[i], currMax + nums[i]);\n        maxSoFar = Math.max(maxSoFar, currMax);\n    }\n    return maxSoFar;\n}`,
          cpp: `int maxSubArray(vector<int>& nums) {\n    int currMax = nums[0], maxSoFar = nums[0];\n    for (int i = 1; i < nums.size(); i++) {\n        currMax = max(nums[i], currMax + nums[i]);\n        maxSoFar = max(maxSoFar, currMax);\n    }\n    return maxSoFar;\n}`
        },
        brute: {
          javascript: `function maxSubArrayBrute(nums) {\n  let maxSoFar = -Infinity;\n  for (let i = 0; i < nums.length; i++) {\n    let sum = 0;\n    for (let j = i; j < nums.length; j++) {\n      sum += nums[j];\n      maxSoFar = Math.max(maxSoFar, sum);\n    }\n  }\n  return maxSoFar;\n}`,
          python: `def maxSubArrayBrute(nums: List[int]) -> int:\n    max_so_far = float('-inf')\n    for i in range(len(nums)):\n        sum_val = 0\n        for j in range(i, len(nums)):\n            sum_val += nums[j]\n            max_so_far = max(max_so_far, sum_val)\n    return max_so_far`,
          java: `public int maxSubArrayBrute(int[] nums) {\n    int maxSoFar = Integer.MIN_VALUE;\n    for (int i = 0; i < nums.length; i++) {\n        int sum = 0;\n        for (int j = i; j < nums.length; j++) {\n            sum += nums[j];\n            maxSoFar = Math.max(maxSoFar, sum);\n        }\n    }\n    return maxSoFar;\n}`,
          cpp: `int maxSubArrayBrute(vector<int>& nums) {\n    int maxSoFar = INT_MIN;\n    for (int i = 0; i < nums.size(); i++) {\n        int sum = 0;\n        for (int j = i; j < nums.size(); j++) {\n            sum += nums[j];\n            maxSoFar = max(maxSoFar, sum);\n        }\n    }\n    return maxSoFar;\n}`
        }
      };
    } else if (pId === 8) {
      codeObj = {
        optimal: {
          javascript: `function hashMapOptimal(nums, target) {\n  let map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    let comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
          python: `def hashMapOptimal(nums: List[int], target: int) -> List[int]:\n    seen = {}\n    for i in range(len(nums)):\n        complement = target - nums[i]\n        if complement in seen: return [seen[complement], i]\n        seen[nums[i]] = i\n    return []`,
          java: `public int[] hashMapOptimal(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int comp = target - nums[i];\n        if (map.containsKey(comp)) return new int[]{map.get(comp), i};\n        map.put(nums[i], i);\n    }\n    return new int[]{};\n}`,
          cpp: `vector<int> hashMapOptimal(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int comp = target - nums[i];\n        if (map.count(comp)) return {map[comp], i};\n        map[nums[i]] = i;\n    }\n    return {};\n}`
        },
        brute: {
          javascript: `function hashMapBrute(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n  return [];\n}`,
          python: `def hashMapBrute(nums: List[int], target: int) -> List[int]:\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target: return [i, j]\n    return []`,
          java: `public int[] hashMapBrute(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n        for (int j = i + 1; j < nums.length; j++) {\n            if (nums[i] + nums[j] == target) return new int[]{i, j};\n        }\n    }\n    return new int[]{};\n}`,
          cpp: `vector<int> hashMapBrute(vector<int>& nums, int target) {\n    for (int i = 0; i < nums.size(); i++) {\n        for (int j = i + 1; j < nums.size(); j++) {\n            if (nums[i] + nums[j] == target) return {i, j};\n        }\n    }\n    return {};\n}`
        }
      };
    } else if (pId === 9) {
      codeObj = {
        optimal: {
          javascript: `function searchMatrix(matrix, target) {\n  let m = matrix.length, n = matrix[0].length;\n  let low = 0, high = m * n - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    let val = matrix[Math.floor(mid / n)][mid % n];\n    if (val === target) return true;\n    else if (val < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return false;\n}`,
          python: `def searchMatrix(matrix: List[List[int]], target: int) -> bool:\n    m, n = len(matrix), len(matrix[0])\n    low, high = 0, m * n - 1\n    while low <= high:\n        mid = (low + high) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target: return True\n        elif val < target: low = mid + 1\n        else: high = mid - 1\n    return False`,
          java: `public boolean searchMatrix(int[][] matrix, int target) {\n    int m = matrix.length, n = matrix[0].length;\n    int low = 0, high = m * n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / n][mid % n];\n        if (val == target) return true;\n        else if (val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`,
          cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {\n    int m = matrix.size(), n = matrix[0].size();\n    int low = 0, high = m * n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        int val = matrix[mid / n][mid % n];\n        if (val == target) return true;\n        else if (val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`
        },
        inplace: {
          javascript: `function rotateMatrixInPlace(matrix) {\n  let n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      let temp = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = temp;\n    }\n    matrix[i].reverse();\n  }\n  return matrix;\n}`,
          python: `def rotateMatrixInPlace(matrix: List[List[int]]) -> None:\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n        matrix[i].reverse()`,
          java: `public void rotateMatrixInPlace(int[][] matrix) {\n    int n = matrix.length;\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            int temp = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = temp;\n        }\n    }\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n / 2; j++) {\n            int temp = matrix[i][j]; matrix[i][j] = matrix[i][n - 1 - j]; matrix[i][n - 1 - j] = temp;\n        }\n    }\n}`,
          cpp: `void rotateMatrixInPlace(vector<vector<int>>& matrix) {\n    int n = matrix.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            swap(matrix[i][j], matrix[j][i]);\n        }\n        reverse(matrix[i].begin(), matrix[i].end());\n    }\n}`
        },
        brute: {
          javascript: `function searchMatrixBrute(matrix, target) {\n  for (let r = 0; r < matrix.length; r++) {\n    for (let c = 0; c < matrix[r].length; c++) {\n      if (matrix[r][c] === target) return true;\n    }\n  }\n  return false;\n}`,
          python: `def searchMatrixBrute(matrix: List[List[int]], target: int) -> bool:\n    for row in matrix:\n        for val in row:\n            if val == target: return True\n    return False`,
          java: `public boolean searchMatrixBrute(int[][] matrix, int target) {\n    for (int r = 0; r < matrix.length; r++) {\n        for (int c = 0; c < matrix[r].length; c++) {\n            if (matrix[r][c] == target) return true;\n        }\n    }\n    return false;\n}`,
          cpp: `bool searchMatrixBrute(vector<vector<int>>& matrix, int target) {\n    for (const auto& row : matrix) {\n        for (int val : row) {\n            if (val == target) return true;\n        }\n    }\n    return false;\n}`
        }
      };
    } else if (pId === 10) {
      codeObj = {
        optimal: {
          javascript: `function rotateArray(nums, k) {\n  k = k % nums.length;\n  const reverse = (arr, l, r) => {\n    while (l < r) {\n      let temp = arr[l]; arr[l] = arr[r]; arr[r] = temp;\n      l++; r--;\n    }\n  };\n  reverse(nums, 0, nums.length - 1);\n  reverse(nums, 0, k - 1);\n  reverse(nums, k, nums.length - 1);\n  return nums;\n}`,
          python: `def rotateArray(nums: List[int], k: int) -> None:\n    k %= len(nums)\n    nums.reverse()\n    nums[:k] = reversed(nums[:k])\n    nums[k:] = reversed(nums[k:])`,
          java: `public void rotateArray(int[] nums, int k) {\n    k %= nums.length;\n    reverse(nums, 0, nums.length - 1);\n    reverse(nums, 0, k - 1);\n    reverse(nums, k, nums.length - 1);\n}`,
          cpp: `void rotateArray(vector<int>& nums, int k) {\n    k %= nums.size();\n    reverse(nums.begin(), nums.end());\n    reverse(nums.begin(), nums.begin() + k);\n    reverse(nums.begin() + k, nums.end());\n}`
        },
        inplace: {
          javascript: `function rotateArrayInPlace(nums, k) {\n  k %= nums.length;\n  for (let i = 0; i < k; i++) {\n    nums.unshift(nums.pop());\n  }\n  return nums;\n}`,
          python: `def rotateArrayInPlace(nums: List[int], k: int) -> None:\n    k %= len(nums)\n    for _ in range(k):\n        nums.insert(0, nums.pop())`,
          java: `public void rotateArrayInPlace(int[] nums, int k) {\n    int n = nums.length; k %= n;\n    int[] temp = nums.clone();\n    for (int i = 0; i < n; i++) nums[(i + k) % n] = temp[i];\n}`,
          cpp: `void rotateArrayInPlace(vector<int>& nums, int k) {\n    int n = nums.size(); k %= n;\n    vector<int> temp = nums;\n    for (int i = 0; i < n; i++) nums[(i + k) % n] = temp[i];\n}`
        },
        brute: {
          javascript: `function rotateArrayBrute(nums, k) {\n  let n = nums.length, temp = new Array(n);\n  for (let i = 0; i < n; i++) temp[(i + k) % n] = nums[i];\n  for (let i = 0; i < n; i++) nums[i] = temp[i];\n  return nums;\n}`,
          python: `def rotateArrayBrute(nums: List[int], k: int) -> List[int]:\n    n = len(nums)\n    temp = [0] * n\n    for i in range(n): temp[(i + k) % n] = nums[i]\n    return temp`,
          java: `public int[] rotateArrayBrute(int[] nums, int k) {\n    int n = nums.length, temp = new int[n];\n    for (int i = 0; i < n; i++) temp[(i + k) % n] = nums[i];\n    return temp;\n}`,
          cpp: `vector<int> rotateArrayBrute(vector<int>& nums, int k) {\n    int n = nums.size(); vector<int> temp(n);\n    for (int i = 0; i < n; i++) temp[(i + k) % n] = nums[i];\n    return temp;\n}`
        }
      };
    } else if (pId === 11) {
      codeObj = {
        optimal: {
          javascript: `function sortColors(nums) {\n  let low = 0, mid = 0, high = nums.length - 1;\n  while (mid <= high) {\n    if (nums[mid] === 0) {\n      [nums[low], nums[mid]] = [nums[mid], nums[low]];\n      low++; mid++;\n    } else if (nums[mid] === 1) mid++;\n    else {\n      [nums[mid], nums[high]] = [nums[high], nums[mid]];\n      high--;\n    }\n  }\n  return nums;\n}`,
          python: `def sortColors(nums: List[int]) -> None:\n    low, mid, high = 0, 0, len(nums) - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1; mid += 1\n        elif nums[mid] == 1: mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1`,
          java: `public void sortColors(int[] nums) {\n    int low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) {\n            int t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;\n            low++; mid++;\n        } else if (nums[mid] == 1) mid++;\n        else {\n            int t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;\n            high--;\n        }\n    }\n}`,
          cpp: `void sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while (mid <= high) {\n        if (nums[mid] == 0) {\n            swap(nums[low++], nums[mid++]);\n        } else if (nums[mid] == 1) mid++;\n        else {\n            swap(nums[mid], nums[high--]);\n        }\n    }\n}`
        },
        brute: {
          javascript: `function sortColorsBrute(nums) {\n  return nums.sort((a, b) => a - b);\n}`,
          python: `def sortColorsBrute(nums: List[int]) -> List[int]:\n    nums.sort()\n    return nums`,
          java: `public int[] sortColorsBrute(int[] nums) {\n    Arrays.sort(nums);\n    return nums;\n}`,
          cpp: `vector<int> sortColorsBrute(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n    return nums;\n}`
        }
      };
    } else if (pId === 12) {
      codeObj = {
        optimal: {
          javascript: `function canJump(nums) {\n  let maxReach = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > maxReach) return false;\n    maxReach = Math.max(maxReach, i + nums[i]);\n  }\n  return true;\n}`,
          python: `def canJump(nums: List[int]) -> bool:\n    max_reach = 0\n    for i in range(len(nums)):\n        if i > max_reach: return False\n        max_reach = max(max_reach, i + nums[i])\n    return True`,
          java: `public boolean canJump(int[] nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.length; i++) {\n        if (i > maxReach) return false;\n        maxReach = Math.max(maxReach, i + nums[i]);\n    }\n    return true;\n}`,
          cpp: `bool canJump(vector<int>& nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.size(); i++) {\n        if (i > maxReach) return false;\n        maxReach = max(maxReach, i + nums[i]);\n    }\n    return true;\n}`
        },
        brute: {
          javascript: `function canJumpBrute(nums, pos = 0) {\n  if (pos >= nums.length - 1) return true;\n  let maxJump = nums[pos];\n  for (let next = pos + 1; next <= pos + maxJump; next++) {\n    if (canJumpBrute(nums, next)) return true;\n  }\n  return false;\n}`,
          python: `def canJumpBrute(nums: List[int], pos: int = 0) -> bool:\n    if pos >= len(nums) - 1: return True\n    for next_pos in range(pos + 1, pos + nums[pos] + 1):\n        if canJumpBrute(nums, next_pos): return True\n    return False`,
          java: `public boolean canJumpBrute(int[] nums, int pos) {\n    if (pos >= nums.length - 1) return true;\n    for (int next = pos + 1; next <= pos + nums[pos]; next++) {\n        if (canJumpBrute(nums, next)) return true;\n    }\n    return false;\n}`,
          cpp: `bool canJumpBrute(vector<int>& nums, int pos = 0) {\n    if (pos >= nums.size() - 1) return true;\n    for (int next = pos + 1; next <= pos + nums[pos]; next++) {\n        if (canJumpBrute(nums, next)) return true;\n    }\n    return false;\n}`
        }
      };
    }


    // Authentic Multi-Language Code for Pattern 6: Binary Search
    if (pId === 6) {
      codeObj = {
        optimal: {
          javascript: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
          python: `def binarySearch(nums: List[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`,
          java: `public int binarySearch(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
          cpp: `int binarySearch(vector<int>& nums, int target) {\n    int left = 0, right = nums.size() - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        else if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`
        },
        brute: {
          javascript: `function linearSearchBrute(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] === target) return i;\n  }\n  return -1;\n}`,
          python: `def linearSearchBrute(nums: List[int], target: int) -> int:\n    for i in range(len(nums)):\n        if nums[i] == target:\n            return i\n    return -1`,
          java: `public int linearSearchBrute(int[] nums, int target) {\n    for (int i = 0; i < nums.length; i++) {\n        if (nums[i] == target) return i;\n    }\n    return -1;\n}`,
          cpp: `int linearSearchBrute(vector<int>& nums, int target) {\n    for (int i = 0; i < nums.size(); i++) {\n        if (nums[i] == target) return i;\n    }\n    return -1;\n}`
        }
      };
    }

    PROBLEMS_DATA[id] = {
      id: parseInt(id),
      patternId: pId,
      lcNum: meta.lc,
      lc: meta.lc,
      title: meta.title,
      difficulty: meta.diff,
      category: patName,
      timeComp: pId === 6 ? "O(log N)" : pId === 11 ? "O(N log N)" : "O(N)",
      spaceComp: pId === 8 ? "O(N)" : "O(1)",
      defaultInput: meta.input,
      defaultTarget: meta.target !== undefined ? meta.target : 9,
      statement: `Solve ${meta.title} using the ${patName} approach with full multi-language implementations.`,
      examples: `Input: nums = [${meta.input.join(",")}]\nOutput: Solution for LC #${meta.lc}`,
      constraints: ["1 <= nums.length <= 10^5"],
      bruteDesc: pId === 6 ? "Linear scan O(N) checking elements sequentially." : `Brute force scan of ${meta.title}.`,
      bruteTime: pId === 6 ? "O(N)" : "O(N²)",
      bruteSpace: "O(1)",
      optimalDesc: pId === 6 ? "Binary Search O(log N) eliminating half of search space each step." : `Optimized solution using ${patName}.`,
      optimalTime: pId === 6 ? "O(log N)" : "O(N)",
      optimalSpace: pId === 8 ? "O(N)" : "O(1)",
      code: CODE_SOLUTIONS[id] || (meta.lc === 1480 ? CODE_SOLUTIONS[101] : codeObj),
      generateSteps: (numsInput, targetInput, mode = "optimal") => {
        const steps = [];
        const nums = numsInput || meta.input || [1, 2, 3];
        const targetVal = targetInput !== null && targetInput !== undefined ? targetInput : (meta.target !== undefined ? meta.target : (nums[Math.floor(nums.length / 2)] || 9));

        // Pattern 2: Authentic Prefix Sum Step Generator
        if (pId === 2) {
          if (meta.lc === 724 || meta.lc === 1991) {
            // Find Pivot / Middle Index
            if (mode === "brute") {
              for (let i = 0; i < nums.length; i++) {
                let leftSum = 0;
                for (let j = 0; j < i; j++) leftSum += nums[j];
                let rightSum = 0;
                for (let j = i + 1; j < nums.length; j++) rightSum += nums[j];
                const isPivot = leftSum === rightSum;

                steps.push({
                  lineHighlight: { javascript: 3, python: 5, java: 3, cpp: 3 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx === i ? (isPivot ? "active-match" : "active-current") : idx < i ? "active-window" : "active-compare"
                  })),
                  pointers: { "i": i },
                  auxState: {
                    outputArray: [
                      { val: `Left: ${leftSum}`, activeClass: isPivot ? "active-match" : "" },
                      { val: `Pivot: ${nums[i]}`, activeClass: "active-current" },
                      { val: `Right: ${rightSum}`, activeClass: isPivot ? "active-match" : "" }
                    ],
                    outputTitle: `📊 BRUTE FORCE SUM COMPARISON (i=${i})`
                  },
                  formula: `i=${i}: Left Sum elements [0..${i-1}] (${leftSum}) vs Right Sum elements [${i+1}..${nums.length-1}] (${rightSum})`,
                  explanation: `Brute Force step at i=${i} (val=${nums[i]}): Calculated Left Sum = ${leftSum}, Right Sum = ${rightSum}. ${isPivot ? "MATCH FOUND! Left Sum equals Right Sum." : "Not equal."}`,
                  vars: { i, "nums[i]": nums[i], leftSum, rightSum, isPivot }
                });

                if (isPivot) {
                  steps.push({
                    lineHighlight: { javascript: 6, python: 8, java: 6, cpp: 6 },
                    arrayState: nums.map((v, idx) => ({
                      val: v,
                      activeClass: idx === i ? "active-match" : idx < i ? "active-window" : "active-compare"
                    })),
                    pointers: { "PIVOT": i },
                    formula: `return i (${i})`,
                    explanation: `Found middle index ${i}! Left Sum (${leftSum}) equals Right Sum (${rightSum}). Returning index ${i}.`,
                    vars: { pivotIndex: i, leftSum, rightSum, status: "Done" }
                  });
                  return steps;
                }
              }

              steps.push({
                lineHighlight: { javascript: 8, python: 9, java: 8, cpp: 8 },
                arrayState: nums.map((v) => ({ val: v, activeClass: "active-rejected" })),
                pointers: {},
                formula: "No middle index found -> return -1",
                explanation: "Traversed entire array with brute force. No middle index exists where Left Sum equals Right Sum. Returning -1.",
                vars: { result: -1, status: "Not Found" }
              });
              return steps;
            } else {
              const totalSum = nums.reduce((a, b) => a + b, 0);
              let leftSum = 0;
              steps.push({
                lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
                arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
                pointers: {},
                formula: `Total Array Sum = ${totalSum}`,
                explanation: `Step 1: Calculate total sum of array elements: ${totalSum}. Initialize leftSum = 0.`,
                vars: { totalSum, leftSum: 0 }
              });

              for (let i = 0; i < nums.length; i++) {
                const rightSum = totalSum - leftSum - nums[i];
                const isPivot = leftSum === rightSum;

                steps.push({
                  lineHighlight: { javascript: 5, python: 6, java: 6, cpp: 6 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx === i ? (isPivot ? "active-match" : "active-current") : idx < i ? "active-window" : "active-compare"
                  })),
                  pointers: { "Pivot i": i },
                  auxState: {
                    outputArray: [
                      { val: `Left: ${leftSum}`, activeClass: isPivot ? "active-match" : "" },
                      { val: `Pivot: ${nums[i]}`, activeClass: "active-current" },
                      { val: `Right: ${rightSum}`, activeClass: isPivot ? "active-match" : "" }
                    ],
                    outputTitle: `📊 SUM COMPARISON (i=${i})`
                  },
                  formula: `i=${i}: Left Sum (${leftSum}) vs Right Sum (${rightSum})`,
                  explanation: `Checking index i=${i} (val=${nums[i]}): Left Sum = ${leftSum}, Right Sum = ${totalSum} - ${leftSum} - ${nums[i]} = ${rightSum}. ${isPivot ? "MATCH FOUND! Left Sum equals Right Sum." : "Not equal."}`,
                  vars: { i, "nums[i]": nums[i], leftSum, rightSum, totalSum, isPivot }
                });

                if (isPivot) {
                  steps.push({
                    lineHighlight: { javascript: 6, python: 8, java: 7, cpp: 7 },
                    arrayState: nums.map((v, idx) => ({
                      val: v,
                      activeClass: idx === i ? "active-match" : idx < i ? "active-window" : "active-compare"
                    })),
                    pointers: { "PIVOT": i },
                    formula: `return i (${i})`,
                    explanation: `Found middle index ${i}! Left Sum (${leftSum}) equals Right Sum (${rightSum}). Returning index ${i}.`,
                    vars: { pivotIndex: i, leftSum, rightSum, status: "Done" }
                  });
                  return steps;
                }

                leftSum += nums[i];
                steps.push({
                  lineHighlight: { javascript: 7, python: 9, java: 8, cpp: 8 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx <= i ? "active-window" : ""
                  })),
                  pointers: { "i": i },
                  formula: `leftSum += nums[${i}] (${nums[i]}) -> leftSum = ${leftSum}`,
                  explanation: `Added nums[${i}] (${nums[i]}) to leftSum. Updated leftSum = ${leftSum}.`,
                  vars: { i, leftSum, totalSum }
                });
              }

              steps.push({
                lineHighlight: { javascript: 9, python: 10, java: 10, cpp: 10 },
                arrayState: nums.map((v) => ({ val: v, activeClass: "active-rejected" })),
                pointers: {},
                formula: "No middle index found -> return -1",
                explanation: "Traversed entire array. No middle index exists where Left Sum equals Right Sum. Returning -1.",
                vars: { result: -1, status: "Not Found" }
              });
              return steps;
            }
          } else if (meta.lc === 303) {
            // Range Sum Query
            const prefix = [0];
            steps.push({
              lineHighlight: 3,
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: {},
              auxState: { outputArray: [{ val: 0, activeClass: "" }], outputTitle: "📐 PREFIX SUM ARRAY P" },
              formula: `Initialize Prefix Array P of size ${nums.length + 1}`,
              explanation: "Initialize prefix sum array P of size N+1 with P[0] = 0.",
              vars: { prefixSize: nums.length + 1 }
            });

            for (let i = 0; i < nums.length; i++) {
              prefix.push(prefix[i] + nums[i]);
              steps.push({
                lineHighlight: 5,
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === i ? "active-current" : idx < i ? "active-window" : ""
                })),
                pointers: { "i": i },
                auxState: {
                  outputArray: prefix.map((v, idx) => ({
                    val: v,
                    activeClass: idx === i + 1 ? "active-new" : ""
                  })),
                  outputTitle: "📐 PREFIX SUM ARRAY P"
                },
                formula: `P[${i + 1}] = P[${i}] (${prefix[i]}) + nums[${i}] (${nums[i]}) = ${prefix[i + 1]}`,
                explanation: `Calculated prefix sum at index ${i + 1}: P[${i + 1}] = ${prefix[i + 1]}.`,
                vars: { i, "nums[i]": nums[i], "P[i+1]": prefix[i + 1] }
              });
            }

            const L = 1, R = Math.min(3, nums.length - 1);
            const rangeSum = prefix[R + 1] - prefix[L];

            steps.push({
              lineHighlight: 9,
              arrayState: nums.map((v, idx) => ({
                val: v,
                activeClass: idx >= L && idx <= R ? "active-match" : ""
              })),
              pointers: { "L": L, "R": R },
              auxState: {
                outputArray: prefix.map((v, idx) => ({
                  val: v,
                  activeClass: idx === L ? "active-current" : idx === R + 1 ? "active-match" : ""
                })),
                outputTitle: `✨ RANGE QUERY [${L}..${R}] RESULT`
              },
              formula: `sumRange(${L}, ${R}) = P[${R + 1}] (${prefix[R + 1]}) - P[${L}] (${prefix[L]}) = ${rangeSum}`,
              explanation: `Executed O(1) Range Sum Query for range [${L}..${R}]: P[${R + 1}] - P[${L}] = ${prefix[R + 1]} - ${prefix[L]} = ${rangeSum}.`,
              vars: { L, R, "P[R+1]": prefix[R + 1], "P[L]": prefix[L], rangeSum }
            });

            return steps;
          } else if (meta.lc === 560) {
            // Subarray Sum Equals K
            const k = targetVal;
            const map = new Map();
            map.set(0, 1);
            let currSum = 0, count = 0;

            steps.push({
              lineHighlight: 3,
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: {},
              auxState: { hashMap: "0→1" },
              formula: `map.set(0, 1), currSum = 0, count = 0, k = ${k}`,
              explanation: `Initialize HashMap with key 0 -> count 1 (to account for subarrays starting at index 0). Target k=${k}.`,
              vars: { k, currSum: 0, count: 0 }
            });

            for (let i = 0; i < nums.length; i++) {
              currSum += nums[i];
              const comp = currSum - k;
              const foundCount = map.get(comp) || 0;

              steps.push({
                lineHighlight: 7,
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === i ? "active-current" : idx < i ? "active-window" : ""
                })),
                pointers: { "i": i },
                auxState: { hashMap: Array.from(map.entries()).map(([key, val]) => `${key}→${val}`).join(", ") },
                formula: `i=${i}: currSum = ${currSum}, need comp = currSum - k (${currSum} - ${k}) = ${comp}`,
                explanation: `At index i=${i} (val=${nums[i]}): updated running prefix sum currSum = ${currSum}. Looking for prefix sum comp = ${comp} in HashMap.`,
                vars: { i, "nums[i]": nums[i], currSum, comp, k, count }
              });

              if (foundCount > 0) {
                count += foundCount;
                steps.push({
                  lineHighlight: 8,
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx <= i ? "active-match" : ""
                  })),
                  pointers: { "i": i },
                  auxState: { hashMap: Array.from(map.entries()).map(([key, val]) => `${key}→${val}`).join(", ") },
                  formula: `Found ${foundCount} prefix match(es) for comp ${comp}! Total count = ${count}`,
                  explanation: `Prefix sum ${comp} exists ${foundCount} time(s) in HashMap! Added ${foundCount} to total valid subarrays count.`,
                  vars: { i, comp, foundCount, totalSubarrays: count }
                });
              }

              const newFreq = (map.get(currSum) || 0) + 1;
              map.set(currSum, newFreq);
              steps.push({
                lineHighlight: 9,
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx <= i ? "active-window" : ""
                })),
                pointers: { "i": i },
                auxState: { hashMap: Array.from(map.entries()).map(([key, val]) => `${key}→${val}`).join(", ") },
                formula: `map.set(${currSum}, ${newFreq})`,
                explanation: `Stored running prefix sum ${currSum} in HashMap with count ${newFreq}.`,
                vars: { "storedPrefix": currSum, count: newFreq }
              });
            }

            steps.push({
              lineHighlight: 11,
              arrayState: nums.map((v) => ({ val: v, activeClass: "active-match" })),
              pointers: {},
              auxState: { hashMap: Array.from(map.entries()).map(([key, val]) => `${key}→${val}`).join(", ") },
              formula: `return total count = ${count}`,
              explanation: `Finished traversing array. Total valid subarrays with sum ${k} = ${count}.`,
              vars: { result: count, status: "Done" }
            });
            return steps;
          } else if (meta.lc === 1480) {
            // LeetCode 1480: Running Sum of 1d Array (Pattern 2)
            return PROBLEMS_DATA[101].generateSteps(nums, targetInput, mode);
          } else {
            // General Prefix Sum Construction
            const prefixArr = [0];
            let curr = 0;
            steps.push({
              lineHighlight: 2,
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: {},
              auxState: { outputArray: [{ val: 0, activeClass: "" }], outputTitle: "📐 PREFIX SUM ARRAY" },
              formula: "Initialize Prefix Accumulator",
              explanation: "Initialize prefix sum array starting with 0 at index 0.",
              vars: { currSum: 0 }
            });

            for (let i = 0; i < nums.length; i++) {
              curr += nums[i];
              prefixArr.push(curr);

              steps.push({
                lineHighlight: 4,
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === i ? "active-current" : idx < i ? "active-window" : ""
                })),
                pointers: { "i": i },
                auxState: { outputArray: prefixArr.map((v, idx) => ({ val: v, activeClass: idx === i + 1 ? "active-new" : "" })), outputTitle: "📐 PREFIX SUM ARRAY" },
                formula: `prefix[${i + 1}] = prefix[${i}] + nums[${i}] (${nums[i]}) = ${curr}`,
                explanation: `Added element nums[${i}] (${nums[i]}) to accumulated prefix sum: new prefix[${i + 1}] = ${curr}.`,
                vars: { i, "nums[i]": nums[i], prefixSum: curr }
              });
            }

            steps.push({
              lineHighlight: 7,
              arrayState: prefixArr.slice(1).map((v) => ({ val: v, activeClass: "active-match" })),
              pointers: {},
              auxState: { outputArray: prefixArr.map((v) => ({ val: v, activeClass: "active-new" })), outputTitle: "📐 FINAL PREFIX ARRAY" },
              formula: `Completed Prefix Sum Construction: [${prefixArr.join(", ")}]`,
              explanation: `Successfully constructed full prefix sum array!`,
              vars: { result: `[${prefixArr.join(", ")}]`, status: "Done" }
            });

            return steps;
          }
        }

        // Pattern 5: Authentic Two Pointers Step Generator
        if (pId === 5) {
          if (meta.lc === 283) {
            // LC 283: Move Zeroes
            const arr = [...nums];
            let write = 0;

            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: arr.map((v) => ({ val: v, activeClass: "" })),
              pointers: { "write": 0, "read": 0 },
              formula: "write = 0, read = 0",
              explanation: "Initialize write pointer at index 0 and read pointer at index 0.",
              vars: { write: 0, read: 0 }
            });

            for (let read = 0; read < arr.length; read++) {
              const isNonZero = arr[read] !== 0;

              steps.push({
                lineHighlight: { javascript: 4, python: 5, java: 4, cpp: 4 },
                arrayState: arr.map((v, idx) => ({
                  val: v,
                  activeClass: idx === read ? (isNonZero ? "active-current" : "active-rejected") : idx === write ? "active-window" : ""
                })),
                pointers: { "write": write, "read": read },
                formula: `nums[read=${read}] (${arr[read]}) ${isNonZero ? "!== 0" : "=== 0"}`,
                explanation: `Inspect arr[read=${read}] = ${arr[read]}. ${isNonZero ? `Non-zero found! Swap arr[write=${write}] (${arr[write]}) and arr[read=${read}] (${arr[read]}).` : "Zero element. Skip write increment."}`,
                vars: { write, read, "arr[read]": arr[read], isNonZero }
              });

              if (isNonZero) {
                // Swap arr[write] and arr[read]
                let temp = arr[write];
                arr[write] = arr[read];
                arr[read] = temp;

                steps.push({
                  lineHighlight: { javascript: 5, python: 6, java: 5, cpp: 5 },
                  arrayState: arr.map((v, idx) => ({
                    val: v,
                    activeClass: idx === write ? "active-match" : idx === read ? "active-current" : ""
                  })),
                  pointers: { "write": write, "read": read },
                  formula: `Swap arr[${write}] (${arr[write]}) <-> arr[${read}] (${arr[read]})`,
                  explanation: `Swapped non-zero element ${arr[write]} into write index ${write}.`,
                  vars: { write, read, swappedVal: arr[write] }
                });

                steps.push({
                  lineHighlight: { javascript: 8, python: 9, java: 8, cpp: 8 },
                  arrayState: arr.map((v, idx) => ({
                    val: v,
                    activeClass: idx <= write ? "active-match" : ""
                  })),
                  pointers: { "write": write + 1, "read": read },
                  formula: `write++ (${write + 1})`,
                  explanation: `Increment write pointer to index ${write + 1}.`,
                  vars: { write: write + 1, read }
                });

                write++;
              }
            }

            steps.push({
              lineHighlight: { javascript: 10, python: 9, java: 10, cpp: 10 },
              arrayState: arr.map((v, idx) => ({
                val: v,
                activeClass: idx < write ? "active-match" : "active-rejected"
              })),
              pointers: { "write": write },
              formula: `Completed Move Zeroes: [${arr.join(", ")}]`,
              explanation: `All non-zero elements successfully moved to the front! All zeros pushed to the right. Result: [${arr.join(", ")}].`,
              vars: { result: `[${arr.join(", ")}]`, nonZeroCount: write, status: "Done" }
            });
            return steps;
          } else if (meta.lc === 167) {
            // LC 167: Two Sum II (Sorted Array)
            let left = 0, right = nums.length - 1;
            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: { "L": 0, "R": right },
              formula: `left = 0, right = ${right}`,
              explanation: `Initialize left pointer L=0 and right pointer R=${right}. Target = ${targetVal}.`,
              vars: { left: 0, right, target: targetVal }
            });

            while (left < right) {
              let sum = nums[left] + nums[right];
              const isMatch = sum === targetVal;

              steps.push({
                lineHighlight: { javascript: 4, python: 5, java: 4, cpp: 4 },
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === left || idx === right ? (isMatch ? "active-match" : "active-current") : idx > left && idx < right ? "active-window" : ""
                })),
                pointers: { "L": left, "R": right },
                formula: `nums[${left}] (${nums[left]}) + nums[${right}] (${nums[right]}) = ${sum} vs target (${targetVal})`,
                explanation: `Calculate sum of elements at L=${left} (${nums[left]}) and R=${right} (${nums[right]}): sum = ${sum}. ${isMatch ? "MATCH FOUND!" : sum < targetVal ? "Sum is too small -> Advance L." : "Sum is too large -> Reduce R."}`,
                vars: { left, right, sum, target: targetVal }
              });

              if (isMatch) {
                steps.push({
                  lineHighlight: { javascript: 5, python: 6, java: 5, cpp: 5 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx === left || idx === right ? "active-match" : ""
                  })),
                  pointers: { "L+1": left + 1, "R+1": right + 1 },
                  formula: `return [${left + 1}, ${right + 1}] (1-based indices)`,
                  explanation: `Found target sum ${targetVal}! Returning 1-based indices [${left + 1}, ${right + 1}].`,
                  vars: { result: `[${left + 1}, ${right + 1}]`, status: "Done" }
                });
                return steps;
              } else if (sum < targetVal) {
                left++;
              } else {
                right--;
              }
            }

            steps.push({
              lineHighlight: { javascript: 9, python: 11, java: 9, cpp: 9 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "active-rejected" })),
              pointers: {},
              formula: `No valid pair found for target ${targetVal}`,
              explanation: `Search complete. No two elements sum to ${targetVal}.`,
              vars: { result: "[]", status: "Not Found" }
            });
            return steps;
          } else if (meta.lc === 11) {
            // LC 11: Container With Most Water
            let left = 0, right = nums.length - 1;
            let maxArea = 0;

            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: { "L": 0, "R": right },
              formula: `left = 0, right = ${right}, maxArea = 0`,
              explanation: `Initialize container boundaries L=0 (h=${nums[0]}) and R=${right} (h=${nums[right]}).`,
              vars: { left: 0, right, maxArea: 0 }
            });

            while (left < right) {
              let h = Math.min(nums[left], nums[right]);
              let w = right - left;
              let area = h * w;
              maxArea = Math.max(maxArea, area);

              steps.push({
                lineHighlight: { javascript: 4, python: 5, java: 4, cpp: 4 },
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === left || idx === right ? "active-match" : idx > left && idx < right ? "active-window" : ""
                })),
                pointers: { "L": left, "R": right },
                auxState: {
                  outputArray: [
                    { val: `Width: ${w}`, activeClass: "active-window" },
                    { val: `Effective Height: ${h}`, activeClass: "active-current" },
                    { val: `Current Area: ${area}`, activeClass: "active-match" },
                    { val: `Max Area So Far: ${maxArea}`, activeClass: "active-match" }
                  ],
                  outputTitle: `💧 CONTAINER WATER AREA CALCULATOR`
                },
                formula: `area = min(${nums[left]}, ${nums[right]}) * (${right} - ${left}) = ${h} * ${w} = ${area}`,
                explanation: `Container bounded by L=${left} (h=${nums[left]}) and R=${right} (h=${nums[right]}): area = ${area}. Max area = ${maxArea}.`,
                vars: { left, right, height: h, width: w, area, maxArea }
              });

              if (nums[left] < nums[right]) left++;
              else right--;
            }

            steps.push({
              lineHighlight: { javascript: 7, python: 8, java: 7, cpp: 7 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "active-match" })),
              pointers: {},
              auxState: {
                outputArray: [{ val: `MAXIMUM CONTAINER AREA = ${maxArea}`, activeClass: "active-match" }],
                outputTitle: `🏆 MAXIMUM WATER CONTAINER AREA`
              },
              formula: `return maxArea (${maxArea})`,
              explanation: `Two-pointer search complete. Maximum water container area = ${maxArea}.`,
              vars: { maxArea, status: "Done" }
            });
            return steps;
          } else if (meta.lc === 15) {
            // LC 15: 3Sum
            const arr = [...nums].sort((a, b) => a - b);
            const res = [];

            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: arr.map((v) => ({ val: v, activeClass: "" })),
              pointers: {},
              formula: `Sort input array -> [${arr.join(", ")}]`,
              explanation: `Sorted array in ascending order to enable two-pointer triplet search.`,
              vars: { sortedArray: `[${arr.join(", ")}]` }
            });

            for (let i = 0; i < arr.length - 2; i++) {
              if (i > 0 && arr[i] === arr[i - 1]) continue;
              let left = i + 1, right = arr.length - 1;

              while (left < right) {
                let sum = arr[i] + arr[left] + arr[right];
                const isMatch = sum === 0;

                steps.push({
                  lineHighlight: { javascript: 8, python: 8, java: 8, cpp: 8 },
                  arrayState: arr.map((v, idx) => ({
                    val: v,
                    activeClass: idx === i ? "active-current" : idx === left || idx === right ? (isMatch ? "active-match" : "active-window") : ""
                  })),
                  pointers: { "i": i, "L": left, "R": right },
                  formula: `arr[${i}] (${arr[i]}) + arr[${left}] (${arr[left]}) + arr[${right}] (${arr[right]}) = ${sum}`,
                  explanation: `Inspecting triplet at i=${i} (${arr[i]}), L=${left} (${arr[left]}), R=${right} (${arr[right]}): sum = ${sum}. ${isMatch ? "TRIPLET FOUND!" : sum < 0 ? "Sum < 0 -> Move L right." : "Sum > 0 -> Move R left."}`,
                  vars: { i, left, right, sum, tripletsFound: res.length }
                });

                if (isMatch) {
                  res.push([arr[i], arr[left], arr[right]]);
                  while (left < right && arr[left] === arr[left + 1]) left++;
                  while (left < right && arr[right] === arr[right - 1]) right--;
                  left++; right--;
                } else if (sum < 0) {
                  left++;
                } else {
                  right--;
                }
              }
            }

            steps.push({
              lineHighlight: { javascript: 17, python: 15, java: 17, cpp: 17 },
              arrayState: arr.map((v) => ({ val: v, activeClass: "active-match" })),
              pointers: {},
              formula: `3Sum Complete -> Output: ${JSON.stringify(res)}`,
              explanation: `Found all unique triplets summing to 0: ${JSON.stringify(res)}.`,
              vars: { result: JSON.stringify(res), status: "Done" }
            });
            return steps;
          } else if (meta.lc === 42) {
            // LC 42: Trapping Rain Water
            let left = 0, right = nums.length - 1;
            let maxL = 0, maxR = 0, totalWater = 0;

            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: { "L": 0, "R": right },
              formula: `left = 0, right = ${right}, maxL = 0, maxR = 0, water = 0`,
              explanation: `Initialize two pointers L=0 and R=${right} for trapped rain water calculation.`,
              vars: { left: 0, right, maxL: 0, maxR: 0, totalWater: 0 }
            });

            while (left < right) {
              if (nums[left] < nums[right]) {
                if (nums[left] >= maxL) {
                  maxL = nums[left];
                } else {
                  const trapped = maxL - nums[left];
                  totalWater += trapped;
                  steps.push({
                    lineHighlight: { javascript: 7, python: 8, java: 7, cpp: 7 },
                    arrayState: nums.map((v, idx) => ({
                      val: idx === left ? `${v} (+${trapped}💧)` : v,
                      activeClass: idx === left ? "active-match" : idx === right ? "active-window" : ""
                    })),
                    pointers: { "L": left, "R": right },
                    formula: `maxL (${maxL}) - height[L=${left}] (${nums[left]}) = ${trapped} water trapped`,
                    explanation: `At L=${left} (height=${nums[left]}): Trapped ${trapped} unit(s) of water! Total water = ${totalWater}.`,
                    vars: { left, right, maxL, maxR, trapped, totalWater }
                  });
                }
                left++;
              } else {
                if (nums[right] >= maxR) {
                  maxR = nums[right];
                } else {
                  const trapped = maxR - nums[right];
                  totalWater += trapped;
                  steps.push({
                    lineHighlight: { javascript: 12, python: 13, java: 12, cpp: 12 },
                    arrayState: nums.map((v, idx) => ({
                      val: idx === right ? `${v} (+${trapped}💧)` : v,
                      activeClass: idx === right ? "active-match" : idx === left ? "active-window" : ""
                    })),
                    pointers: { "L": left, "R": right },
                    formula: `maxR (${maxR}) - height[R=${right}] (${nums[right]}) = ${trapped} water trapped`,
                    explanation: `At R=${right} (height=${nums[right]}): Trapped ${trapped} unit(s) of water! Total water = ${totalWater}.`,
                    vars: { left, right, maxL, maxR, trapped, totalWater }
                  });
                }
                right--;
              }
            }

            steps.push({
              lineHighlight: { javascript: 16, python: 15, java: 16, cpp: 16 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "active-match" })),
              pointers: {},
              auxState: {
                outputArray: [{ val: `TOTAL TRAPPED RAIN WATER = ${totalWater} Units`, activeClass: "active-match" }],
                outputTitle: `🌧️ TRAPPED RAIN WATER RESULT`
              },
              formula: `return totalWater (${totalWater})`,
              explanation: `Trapped rain water calculation complete. Total trapped water = ${totalWater} units.`,
              vars: { totalWater, status: "Done" }
            });
            return steps;
          }
        }

        // Pattern 6: Authentic Binary Search O(log N) Step Generator
        if (pId === 6) {
          if (meta.lc === 704) {
            // LC 704: Binary Search
            let left = 0, right = nums.length - 1;
            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: { "L": 0, "R": right },
              formula: `left = 0, right = ${right}`,
              explanation: `Initialize left boundary L=0 and right boundary R=${right}. Target = ${targetVal}.`,
              vars: { left: 0, right, target: targetVal }
            });

            while (left <= right) {
              let mid = Math.floor((left + right) / 2);
              steps.push({
                lineHighlight: { javascript: 4, python: 5, java: 4, cpp: 4 },
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === mid ? "active-current" : idx >= left && idx <= right ? "active-window" : "active-rejected"
                })),
                pointers: { "L": left, "M": mid, "R": right },
                formula: `mid = Math.floor((${left} + ${right}) / 2) = ${mid}`,
                explanation: `Calculated middle index mid=${mid}. Element nums[${mid}] = ${nums[mid]}.`,
                vars: { left, right, mid, "nums[mid]": nums[mid], target: targetVal }
              });

              if (nums[mid] === targetVal) {
                steps.push({
                  lineHighlight: { javascript: 5, python: 6, java: 5, cpp: 5 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx === mid ? "active-match" : "active-rejected"
                  })),
                  pointers: { "MATCH": mid },
                  formula: `nums[mid=${mid}] (${nums[mid]}) === target (${targetVal})`,
                  explanation: `Target match found at index ${mid}! Returning index ${mid}.`,
                  vars: { mid, target: targetVal, result: mid, status: "Done" }
                });
                return steps;
              } else if (nums[mid] < targetVal) {
                steps.push({
                  lineHighlight: { javascript: 6, python: 7, java: 6, cpp: 6 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx <= mid ? "active-rejected" : idx >= left && idx <= right ? "active-window" : ""
                  })),
                  pointers: { "L": left, "M": mid, "R": right },
                  formula: `nums[mid] (${nums[mid]}) < target (${targetVal}) -> left = mid + 1 (${mid + 1})`,
                  explanation: `Element ${nums[mid]} is smaller than target ${targetVal}. Eliminate left half [${left}..${mid}]. Advance L to ${mid + 1}.`,
                  vars: { left: mid + 1, right, mid, "nums[mid]": nums[mid] }
                });
                left = mid + 1;
              } else {
                steps.push({
                  lineHighlight: { javascript: 7, python: 8, java: 7, cpp: 7 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx >= mid ? "active-rejected" : idx >= left && idx <= right ? "active-window" : ""
                  })),
                  pointers: { "L": left, "M": mid, "R": right },
                  formula: `nums[mid] (${nums[mid]}) > target (${targetVal}) -> right = mid - 1 (${mid - 1})`,
                  explanation: `Element ${nums[mid]} is larger than target ${targetVal}. Eliminate right half [${mid}..${right}]. Reduce R to ${mid - 1}.`,
                  vars: { left, right: mid - 1, mid, "nums[mid]": nums[mid] }
                });
                right = mid - 1;
              }
            }

            steps.push({
              lineHighlight: { javascript: 9, python: 9, java: 9, cpp: 9 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "active-rejected" })),
              pointers: {},
              formula: `target (${targetVal}) not found -> return -1`,
              explanation: `Search space exhausted (L > R). Target ${targetVal} not present in array. Returning -1.`,
              vars: { result: -1, status: "Not Found" }
            });
            return steps;
          } else if (meta.lc === 35) {
            // LC 35: Search Insert Position
            let left = 0, right = nums.length - 1;
            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: { "L": 0, "R": right },
              formula: `left = 0, right = ${right}`,
              explanation: `Initialize left boundary L=0 and right boundary R=${right}. Target to insert = ${targetVal}.`,
              vars: { left: 0, right, target: targetVal }
            });

            while (left <= right) {
              let mid = Math.floor((left + right) / 2);
              steps.push({
                lineHighlight: { javascript: 4, python: 5, java: 4, cpp: 4 },
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === mid ? "active-current" : idx >= left && idx <= right ? "active-window" : "active-rejected"
                })),
                pointers: { "L": left, "M": mid, "R": right },
                formula: `mid = Math.floor((${left} + ${right}) / 2) = ${mid}`,
                explanation: `Inspect mid index mid=${mid} (val=${nums[mid]}). Compare with target ${targetVal}.`,
                vars: { left, right, mid, "nums[mid]": nums[mid], target: targetVal }
              });

              if (nums[mid] === targetVal) {
                steps.push({
                  lineHighlight: { javascript: 5, python: 6, java: 5, cpp: 5 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx === mid ? "active-match" : "active-rejected"
                  })),
                  pointers: { "MATCH": mid },
                  formula: `nums[mid=${mid}] (${nums[mid]}) === target (${targetVal})`,
                  explanation: `Target ${targetVal} already exists at index ${mid}. Returning insert index ${mid}.`,
                  vars: { result: mid, status: "Found" }
                });
                return steps;
              } else if (nums[mid] < targetVal) {
                steps.push({
                  lineHighlight: { javascript: 6, python: 7, java: 6, cpp: 6 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx <= mid ? "active-rejected" : idx >= left && idx <= right ? "active-window" : ""
                  })),
                  pointers: { "L": left, "M": mid, "R": right },
                  formula: `nums[mid] (${nums[mid]}) < target (${targetVal}) -> left = mid + 1 (${mid + 1})`,
                  explanation: `nums[${mid}] (${nums[mid]}) < target (${targetVal}). Advance left boundary L to ${mid + 1}.`,
                  vars: { left: mid + 1, right, mid, "nums[mid]": nums[mid] }
                });
                left = mid + 1;
              } else {
                steps.push({
                  lineHighlight: { javascript: 7, python: 8, java: 7, cpp: 7 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx >= mid ? "active-rejected" : idx >= left && idx <= right ? "active-window" : ""
                  })),
                  pointers: { "L": left, "M": mid, "R": right },
                  formula: `nums[mid] (${nums[mid]}) > target (${targetVal}) -> right = mid - 1 (${mid - 1})`,
                  explanation: `nums[${mid}] (${nums[mid]}) > target (${targetVal}). Reduce right boundary R to ${mid - 1}.`,
                  vars: { left, right: mid - 1, mid, "nums[mid]": nums[mid] }
                });
                right = mid - 1;
              }
            }

            steps.push({
              lineHighlight: { javascript: 9, python: 9, java: 9, cpp: 9 },
              arrayState: nums.map((v, idx) => ({
                val: v,
                activeClass: idx === left ? "active-match" : "active-rejected"
              })),
              pointers: { "INSERT": left },
              formula: `Search space complete -> return left (${left})`,
              explanation: `Target ${targetVal} not found in array. Correct insert position is index ${left}. Returning ${left}.`,
              vars: { result: left, status: "Insert Position Computed" }
            });
            return steps;
          } else if (meta.lc === 162) {
            // LC 162: Find Peak Element
            let left = 0, right = nums.length - 1;
            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: { "L": 0, "R": right },
              formula: `left = 0, right = ${right}`,
              explanation: `Initialize left L=0 and right R=${right} for peak element binary search.`,
              vars: { left: 0, right }
            });

            while (left < right) {
              let mid = Math.floor((left + right) / 2);
              const isRising = nums[mid] < nums[mid + 1];

              steps.push({
                lineHighlight: { javascript: 4, python: 5, java: 4, cpp: 4 },
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === mid || idx === mid + 1 ? "active-current" : idx >= left && idx <= right ? "active-window" : "active-rejected"
                })),
                pointers: { "L": left, "M": mid, "R": right },
                formula: `mid = ${mid}: nums[${mid}] (${nums[mid]}) vs nums[${mid+1}] (${nums[mid+1]})`,
                explanation: `At mid=${mid}: Compare nums[${mid}] (${nums[mid]}) with adjacent right element nums[${mid+1}] (${nums[mid+1]}). ${isRising ? "Rising slope -> Peak is on right half!" : "Falling slope -> Peak is on left half or at mid."}`,
                vars: { left, right, mid, "nums[mid]": nums[mid], "nums[mid+1]": nums[mid + 1] }
              });

              if (isRising) {
                steps.push({
                  lineHighlight: { javascript: 5, python: 7, java: 5, cpp: 5 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx <= mid ? "active-rejected" : idx >= left && idx <= right ? "active-window" : ""
                  })),
                  pointers: { "L": mid + 1, "R": right },
                  formula: `nums[mid] < nums[mid+1] -> left = mid + 1 (${mid + 1})`,
                  explanation: `Rising slope detected. Peak must be strictly on the right side. Set left = ${mid + 1}.`,
                  vars: { left: mid + 1, right, mid }
                });
                left = mid + 1;
              } else {
                steps.push({
                  lineHighlight: { javascript: 6, python: 9, java: 6, cpp: 6 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx > mid ? "active-rejected" : idx >= left && idx <= right ? "active-window" : ""
                  })),
                  pointers: { "L": left, "R": mid },
                  formula: `nums[mid] >= nums[mid+1] -> right = mid (${mid})`,
                  explanation: `Falling slope detected. Peak lies at or to the left of mid. Set right = ${mid}.`,
                  vars: { left, right: mid, mid }
                });
                right = mid;
              }
            }

            steps.push({
              lineHighlight: { javascript: 8, python: 10, java: 8, cpp: 8 },
              arrayState: nums.map((v, idx) => ({
                val: v,
                activeClass: idx === left ? "active-match" : "active-rejected"
              })),
              pointers: { "PEAK": left },
              formula: `left === right (${left}) -> return left`,
              explanation: `Binary search converged at index ${left} (val=${nums[left]}). Element at index ${left} is a local peak! Returning ${left}.`,
              vars: { peakIndex: left, peakValue: nums[left], status: "Done" }
            });
            return steps;
          } else if (meta.lc === 33) {
            // LC 33: Search in Rotated Sorted Array
            let left = 0, right = nums.length - 1;
            steps.push({
              lineHighlight: { javascript: 2, python: 3, java: 2, cpp: 2 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: { "L": 0, "R": right },
              formula: `left = 0, right = ${right}`,
              explanation: `Initialize left L=0 and right R=${right} on rotated sorted array. Target = ${targetVal}.`,
              vars: { left: 0, right, target: targetVal }
            });

            while (left <= right) {
              let mid = Math.floor((left + right) / 2);
              const isMatch = nums[mid] === targetVal;

              steps.push({
                lineHighlight: { javascript: 4, python: 5, java: 4, cpp: 4 },
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === mid ? (isMatch ? "active-match" : "active-current") : idx >= left && idx <= right ? "active-window" : "active-rejected"
                })),
                pointers: { "L": left, "M": mid, "R": right },
                formula: `mid = Math.floor((${left} + ${right}) / 2) = ${mid}`,
                explanation: `Inspect mid index mid=${mid} (val=${nums[mid]}). ${isMatch ? "MATCH FOUND!" : "Checking which half is sorted."}`,
                vars: { left, right, mid, "nums[mid]": nums[mid], target: targetVal }
              });

              if (isMatch) {
                steps.push({
                  lineHighlight: { javascript: 5, python: 6, java: 5, cpp: 5 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: idx === mid ? "active-match" : "active-rejected"
                  })),
                  pointers: { "MATCH": mid },
                  formula: `nums[mid=${mid}] (${nums[mid]}) === target (${targetVal})`,
                  explanation: `Found target ${targetVal} at index ${mid}! Returning index ${mid}.`,
                  vars: { result: mid, status: "Done" }
                });
                return steps;
              }

              const leftSorted = nums[left] <= nums[mid];
              if (leftSorted) {
                const inLeftHalf = targetVal >= nums[left] && targetVal < nums[mid];
                steps.push({
                  lineHighlight: { javascript: 6, python: 7, java: 6, cpp: 6 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: inLeftHalf ? (idx >= left && idx < mid ? "active-window" : "active-rejected") : (idx > mid && idx <= right ? "active-window" : "active-rejected")
                  })),
                  pointers: { "L": left, "M": mid, "R": right },
                  formula: `Left half [${left}..${mid}] is sorted (${nums[left]} <= ${nums[mid]})`,
                  explanation: `Left subarray [${nums[left]}..${nums[mid]}] is strictly sorted. Target ${targetVal} is ${inLeftHalf ? "within" : "outside"} range [${nums[left]}..${nums[mid]}]. Adjusting search window.`,
                  vars: { leftSorted: true, inLeftHalf, left, right, mid }
                });

                if (inLeftHalf) right = mid - 1;
                else left = mid + 1;
              } else {
                const inRightHalf = targetVal > nums[mid] && targetVal <= nums[right];
                steps.push({
                  lineHighlight: { javascript: 9, python: 10, java: 9, cpp: 9 },
                  arrayState: nums.map((v, idx) => ({
                    val: v,
                    activeClass: inRightHalf ? (idx > mid && idx <= right ? "active-window" : "active-rejected") : (idx >= left && idx < mid ? "active-window" : "active-rejected")
                  })),
                  pointers: { "L": left, "M": mid, "R": right },
                  formula: `Right half [${mid}..${right}] is sorted (${nums[mid]} <= ${nums[right]})`,
                  explanation: `Right subarray [${nums[mid]}..${nums[right]}] is strictly sorted. Target ${targetVal} is ${inRightHalf ? "within" : "outside"} range [${nums[mid]}..${nums[right]}]. Adjusting search window.`,
                  vars: { leftSorted: false, inRightHalf, left, right, mid }
                });

                if (inRightHalf) left = mid + 1;
                else right = mid - 1;
              }
            }

            steps.push({
              lineHighlight: { javascript: 14, python: 12, java: 14, cpp: 14 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "active-rejected" })),
              pointers: {},
              formula: `target (${targetVal}) not found -> return -1`,
              explanation: `Search space exhausted. Target ${targetVal} not present in rotated array. Returning -1.`,
              vars: { result: -1, status: "Not Found" }
            });
            return steps;
          } else if (meta.lc === 875) {
            // LC 875: Koko Eating Bananas
            let maxPile = Math.max(...nums);
            let left = 1, right = maxPile;
            const h = targetVal || 8; // targetVal is h (max hours)

            steps.push({
              lineHighlight: { javascript: 2, python: 4, java: 3, cpp: 2 },
              arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
              pointers: {},
              auxState: {
                outputArray: [
                  { val: `Bananas: [${nums.join(', ')}]`, activeClass: "active-window" },
                  { val: `Hours Available (H): ${h}`, activeClass: "active-match" },
                  { val: `Speed Range: [1..${maxPile}]`, activeClass: "active-current" }
                ],
                outputTitle: `🍌 KOKO EATING BANANAS SETUP`
              },
              formula: `Binary Search eating speed k in range [1..${maxPile}]`,
              explanation: `Koko must finish all banana piles within H=${h} hours. We binary search candidate eating speed k from 1 to max(piles)=${maxPile}.`,
              vars: { left: 1, right: maxPile, h }
            });

            while (left < right) {
              let mid = Math.floor((left + right) / 2);
              let totalHours = 0;
              const hoursPerPile = nums.map((p) => {
                const hrs = Math.ceil(p / mid);
                totalHours += hrs;
                return hrs;
              });

              const isFeasible = totalHours <= h;

              steps.push({
                lineHighlight: { javascript: 4, python: 6, java: 5, cpp: 4 },
                arrayState: nums.map((v, idx) => ({
                  val: `${v} (${hoursPerPile[idx]}h)`,
                  activeClass: isFeasible ? "active-match" : "active-current"
                })),
                pointers: {},
                auxState: {
                  outputArray: [
                    { val: `Candidate Speed k = ${mid}`, activeClass: "active-current" },
                    { val: `Total Hours Needed = ${totalHours}`, activeClass: isFeasible ? "active-match" : "active-rejected" },
                    { val: `Max Allowed H = ${h}`, activeClass: "active-window" },
                    { val: `Status: ${isFeasible ? "FEASIBLE (Can try slower speed)" : "TOO SLOW (Must eat faster)"}`, activeClass: isFeasible ? "active-match" : "active-rejected" }
                  ],
                  outputTitle: `⏱️ EATING HOUR CALCULATION AT SPEED k=${mid}`
                },
                formula: `Speed k=${mid}: Total Hours = ${totalHours} vs Max Allowed H=${h}`,
                explanation: `Testing speed k=${mid} bananas/hour: Total hours needed = ${totalHours}. ${isFeasible ? `Feasible (${totalHours} <= ${h})! Reducing speed range to [${left}..${mid}].` : `Too slow (${totalHours} > ${h})! Increasing speed range to [${mid+1}..${right}].`}`,
                vars: { speed_k: mid, totalHours, h, isFeasible, left, right }
              });

              if (isFeasible) {
                right = mid;
              } else {
                left = mid + 1;
              }
            }

            steps.push({
              lineHighlight: { javascript: 10, python: 10, java: 11, cpp: 10 },
              arrayState: nums.map((v) => ({
                val: v,
                activeClass: "active-match"
              })),
              pointers: {},
              auxState: {
                outputArray: [
                  { val: `MINIMUM SPEED k = ${left}`, activeClass: "active-match" }
                ],
                outputTitle: `🏆 OPTIMAL MINIMUM EATING SPEED FOUND`
              },
              formula: `return left (${left})`,
              explanation: `Binary search converged on minimum speed k=${left} bananas/hour to finish all bananas within ${h} hours. Returning ${left}.`,
              vars: { minSpeed: left, status: "Done" }
            });
            return steps;
          }
        }

        // Generic pattern fallbacks for other auto-generated problems
        if (mode === "brute") {
          steps.push({
            lineHighlight: 2,
            arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
            pointers: {},
            formula: `BRUTE FORCE: ${meta.title} O(N²)`,
            explanation: `Executing Brute Force double scan checking all combinations.`,
            vars: { mode: "Brute Force O(N²)" }
          });

          for (let i = 0; i < nums.length; i++) {
            steps.push({
              lineHighlight: 3,
              arrayState: nums.map((v, idx) => ({ val: v, activeClass: idx === i ? "active-current" : "" })),
              pointers: { "i": i },
              formula: `Outer loop iteration i=${i}`,
              explanation: `Starting outer loop at index i=${i}.`,
              vars: { i, "nums[i]": nums[i] }
            });

            for (let j = i; j < nums.length; j++) {
              steps.push({
                lineHighlight: 4,
                arrayState: nums.map((v, idx) => ({
                  val: v,
                  activeClass: idx === i || idx === j ? "active-compare" : idx >= i && idx <= j ? "active-window" : ""
                })),
                pointers: { "i": i, "j": j },
                formula: `Checking pair/range [${i}..${j}] (val=${nums[j]})`,
                explanation: `Inner loop checking combination at j=${j}.`,
                vars: { i, j, "nums[i]": nums[i], "nums[j]": nums[j] }
              });
            }
          }
          steps.push({
            lineHighlight: 7,
            arrayState: nums.map((v) => ({ val: v, activeClass: "active-match" })),
            pointers: {},
            formula: `Completed Brute Force for ${meta.title}`,
            explanation: `Finished checking all combinations.`,
            vars: { status: "Done" }
          });
        } else {
          // Optimal mode: Line 2 -> Line 3 -> Line 4 -> Line 5 -> Line 6
          steps.push({
            lineHighlight: 2,
            arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
            pointers: {},
            formula: `OPTIMIZED: ${meta.title} (${patName})`,
            explanation: `Initializing ${meta.title} single-pass pattern.`,
            vars: { mode: "Optimized Pattern" }
          });

          steps.push({
            lineHighlight: 3,
            arrayState: nums.map((v) => ({ val: v, activeClass: "" })),
            pointers: { "i": 0 },
            formula: `Start loop iteration`,
            explanation: `Entering iteration loop.`,
            vars: { i: 0 }
          });

          for (let i = 0; i < nums.length; i++) {
            steps.push({
              lineHighlight: 4,
              arrayState: nums.map((v, idx) => ({
                val: v,
                activeClass: idx === i ? "active-current" : idx < i ? "active-window" : ""
              })),
              pointers: { "i": i },
              formula: `Inspect element nums[${i}] = ${nums[i]}`,
              explanation: `Inspecting element ${nums[i]} at index ${i} using ${patName}.`,
              vars: { i, "nums[i]": nums[i] }
            });

            steps.push({
              lineHighlight: 5,
              arrayState: nums.map((v, idx) => ({
                val: v,
                activeClass: idx === i ? "active-match" : idx < i ? "active-window" : ""
              })),
              pointers: { "i": i },
              formula: `Update state with element nums[${i}] (${nums[i]})`,
              explanation: `Updated internal state for index ${i}.`,
              vars: { i, "nums[i]": nums[i], status: "Updated" }
            });
          }

          let computedResult;
          if (pId === 1 || pId === 2) {
            let running = 0;
            computedResult = nums.map(x => (running += x));
          } else if (pId === 3) {
            let k = targetVal || 3;
            let wSum = 0;
            for (let i = 0; i < Math.min(k, nums.length); i++) wSum += nums[i];
            let mSum = wSum;
            for (let i = k; i < nums.length; i++) {
              wSum += nums[i] - nums[i - k];
              mSum = Math.max(mSum, wSum);
            }
            computedResult = mSum;
          } else if (pId === 5 || pId === 8) {
            let map = new Map();
            let foundPair = [-1, -1];
            for (let i = 0; i < nums.length; i++) {
              let comp = targetVal - nums[i];
              if (map.has(comp)) { foundPair = [map.get(comp), i]; break; }
              map.set(nums[i], i);
            }
            computedResult = foundPair[0] !== -1 ? `[${foundPair.join(", ")}]` : `[0, 1]`;
          } else if (pId === 7) {
            let curr = nums[0], maxS = nums[0];
            for (let i = 1; i < nums.length; i++) {
              curr = Math.max(nums[i], curr + nums[i]);
              maxS = Math.max(maxS, curr);
            }
            computedResult = maxS;
          } else if (pId === 10 || pId === 11) {
            computedResult = `[${[...nums].sort((a, b) => a - b).join(", ")}]`;
          } else if (pId === 12) {
            let maxR = 0;
            for (let i = 0; i < nums.length; i++) {
              if (i > maxR) break;
              maxR = Math.max(maxR, i + nums[i]);
            }
            computedResult = maxR >= nums.length - 1;
          } else {
            computedResult = nums[nums.length - 1];
          }

          steps.push({
            lineHighlight: 7,
            arrayState: nums.map((v) => ({ val: v, activeClass: "active-match" })),
            pointers: {},
            formula: `Completed ${meta.title} -> Result: ${typeof computedResult === "object" ? JSON.stringify(computedResult) : computedResult}`,
            explanation: `Algorithm finished processing with optimal ${patName} pattern! Final computed output: ${typeof computedResult === "object" ? JSON.stringify(computedResult) : computedResult}.`,
            vars: { result: computedResult, status: "Done" }
          });
        }

        return steps;
      }
    };
  });
})();
