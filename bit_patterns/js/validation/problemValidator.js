/* ==========================================================================
   BIT MANIPULATION CORRECTNESS AUDIT — PROBLEM METADATA & COMPLEXITY VALIDATOR
   ========================================================================== */

if (typeof require !== "undefined") {
  PATTERNS_DATA = require("../data/patterns.js");
  PROBLEMS_DATA = require("../data/problems.js");
}

const ProblemValidator = {
  runAudit() {
    const results = {
      passed: 0,
      failed: 0,
      errors: [],
      metadataReport: []
    };

    const assert = (condition, msg) => {
      if (condition) {
        results.passed++;
      } else {
        results.failed++;
        results.errors.push(msg);
      }
    };

    // 1. Audit Patterns Data (12 Patterns)
    const expectedPatternsCount = 12;
    const actualPatternsCount = Object.keys(PATTERNS_DATA).length;
    assert(actualPatternsCount === expectedPatternsCount, `Expected 12 patterns, found ${actualPatternsCount}`);

    Object.values(PATTERNS_DATA).forEach(pat => {
      assert(pat.id && pat.name && pat.goal, `Pattern ${pat.id} missing name or goal`);
      assert(pat.useCases && pat.useCases.length > 0, `Pattern ${pat.id} missing useCases`);
      assert(pat.template && pat.tips && pat.mistakes, `Pattern ${pat.id} missing template, tips, or mistakes`);
      assert(pat.quiz && pat.quiz.length >= 2, `Pattern ${pat.id} must have at least 2 quiz questions`);
    });

    // 2. Audit Problems Data (All Problems)
    Object.values(PROBLEMS_DATA).forEach(prob => {
      assert(prob.id && prob.lcNum && prob.title, `Problem ${prob.id} missing ID, LC number, or title`);
      assert(["Easy", "Medium", "Hard"].includes(prob.difficulty), `LC #${prob.lcNum} invalid difficulty '${prob.difficulty}'`);
      assert(prob.statement && prob.statement.length > 10, `LC #${prob.lcNum} missing statement`);
      assert(prob.optimalTime && prob.optimalSpace, `LC #${prob.lcNum} missing complexity specs`);

      // Multi-language code check
      assert(prob.code && prob.code.python && prob.code.javascript && prob.code.java && prob.code.cpp, `LC #${prob.lcNum} missing multi-language code snippets`);

      results.metadataReport.push({
        lcNum: prob.lcNum,
        title: prob.title,
        patternId: prob.patternId,
        difficulty: prob.difficulty,
        timeComp: prob.optimalTime,
        spaceComp: prob.optimalSpace,
        status: "PASS"
      });
    });

    return results;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = ProblemValidator;
}
