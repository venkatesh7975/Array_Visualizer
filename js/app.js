/* ==========================================================================
   ARRAY PATTERNS VISUALIZER — MAIN APPLICATION CONTROLLER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  currentPatternId: 1,
  currentProblemId: 101,
  currentMode: "optimal", // "optimal" or "brute"

  // DOM References
  patternSelect: document.getElementById("patternSelect"),
  problemSelect: document.getElementById("problemSelect"),
  diffBadge: document.getElementById("diffBadge"),
  lcNumBadge: document.getElementById("lcNumBadge"),
  timeCompBadge: document.getElementById("timeCompBadge"),
  spaceCompBadge: document.getElementById("spaceCompBadge"),

  modeOptimalBtn: document.getElementById("modeOptimalBtn"),
  modeBruteBtn: document.getElementById("modeBruteBtn"),

  // Overview Tab DOMs
  probTitle: document.getElementById("probTitle"),
  probStatement: document.getElementById("probStatement"),
  probExamples: document.getElementById("probExamples"),
  probConstraints: document.getElementById("probConstraints"),

  // Pattern Guide Tab DOMs
  patternGuideTitle: document.getElementById("patternGuideTitle"),
  patternGuideDesc: document.getElementById("patternGuideDesc"),
  patternUseCases: document.getElementById("patternUseCases"),
  patternTemplateCode: document.getElementById("patternTemplateCode"),
  patternTips: document.getElementById("patternTips"),

  // Brute vs Optimal Tab DOMs
  bruteDesc: document.getElementById("bruteDesc"),
  bruteTime: document.getElementById("bruteTime"),
  bruteSpace: document.getElementById("bruteSpace"),
  optimalDesc: document.getElementById("optimalDesc"),
  optimalTime: document.getElementById("optimalTime"),
  optimalSpace: document.getElementById("optimalSpace"),
  commonMistakesList: document.getElementById("commonMistakesList"),

  init() {
    // 1. Initialize Resizable Panels
    PanelResizerEngine.init();

    // 2. Populate 12 Pattern Dropdown Options
    this.populatePatternDropdown();

    // 3. Bind Event Listeners
    this.bindEvents();

    // 4. Load Pattern & Problem 101
    this.loadPattern(1);

    // 5. Set Default Theme to Glassy Premier
    document.documentElement.setAttribute("data-theme", "glassy");
  },

  populatePatternDropdown() {
    if (!this.patternSelect) return;
    this.patternSelect.innerHTML = "";

    Object.values(PATTERNS_DATA).forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = `${p.icon} Pattern ${p.id}: ${p.name}`;
      this.patternSelect.appendChild(opt);
    });
  },

  populateProblemDropdown(patternId) {
    if (!this.problemSelect) return;
    this.problemSelect.innerHTML = "";

    const probs = Object.values(PROBLEMS_DATA).filter((prob) => prob.patternId === patternId);
    probs.forEach((prob, idx) => {
      const opt = document.createElement("option");
      opt.value = prob.id;
      opt.textContent = `Prob ${idx + 1}: LC #${prob.lcNum} — ${prob.title}`;
      this.problemSelect.appendChild(opt);
    });

    if (probs.length > 0) {
      this.currentProblemId = probs[0].id;
      this.problemSelect.value = probs[0].id;
    }
  },

  loadPattern(patternId) {
    this.currentPatternId = patternId;
    if (this.patternSelect) this.patternSelect.value = patternId;

    const pData = PATTERNS_DATA[patternId];
    if (pData) {
      if (this.patternGuideTitle) this.patternGuideTitle.textContent = `Pattern ${pData.id}: ${pData.name}`;
      if (this.patternGuideDesc) this.patternGuideDesc.textContent = pData.goal;

      if (this.patternUseCases) {
        this.patternUseCases.innerHTML = pData.useCases.map((u) => `<li>${u}</li>`).join("");
      }
      if (this.patternTemplateCode) {
        this.patternTemplateCode.textContent = pData.template;
      }
      if (this.patternTips) {
        this.patternTips.innerHTML = pData.tips.map((t) => `<li>${t}</li>`).join("");
      }
      if (this.commonMistakesList) {
        this.commonMistakesList.innerHTML = pData.mistakes.map((m) => `<div class="mistake-item">⚠️ ${m}</div>`).join("");
      }

      this.renderQuiz(pData.quiz || []);
    }

    this.populateProblemDropdown(patternId);
    this.loadProblem(this.currentProblemId, null, null, this.currentMode);
  },

  loadProblem(problemId, customInput = null, customTarget = null, mode = "optimal") {
    this.currentProblemId = problemId;
    this.currentMode = mode;
    const prob = PROBLEMS_DATA[problemId];
    if (!prob) return;

    prob.currentMode = mode; // Attach mode to problem object

    // Update Mode Toggle Buttons Styling
    if (this.modeOptimalBtn && this.modeBruteBtn) {
      this.modeOptimalBtn.classList.toggle("active", mode === "optimal");
      this.modeBruteBtn.classList.toggle("active", mode === "brute");
    }

    // Header Badges based on mode
    if (this.diffBadge) {
      this.diffBadge.textContent = prob.difficulty;
      this.diffBadge.className = `badge badge-${prob.difficulty.toLowerCase()}`;
    }
    if (this.lcNumBadge) this.lcNumBadge.textContent = `LC #${prob.lcNum}`;
    
    if (this.timeCompBadge) {
      this.timeCompBadge.textContent = `⏱️ ${mode === "optimal" ? prob.optimalTime : prob.bruteTime}`;
    }
    if (this.spaceCompBadge) {
      this.spaceCompBadge.textContent = `💾 ${mode === "optimal" ? prob.optimalSpace : prob.bruteSpace}`;
    }

    // Overview Tab
    if (this.probTitle) this.probTitle.textContent = `${prob.lcNum}. ${prob.title}`;
    if (this.probStatement) this.probStatement.textContent = prob.statement;
    if (this.probExamples) this.probExamples.textContent = prob.examples;
    if (this.probConstraints) {
      this.probConstraints.innerHTML = prob.constraints.map((c) => `<li>${c}</li>`).join("");
    }

    // Approaches Tab
    if (this.bruteDesc) this.bruteDesc.textContent = prob.bruteDesc;
    if (this.bruteTime) this.bruteTime.textContent = prob.bruteTime;
    if (this.bruteSpace) this.bruteSpace.textContent = prob.bruteSpace;
    if (this.optimalDesc) this.optimalDesc.textContent = prob.optimalDesc;
    if (this.optimalTime) this.optimalTime.textContent = prob.optimalTime;
    if (this.optimalSpace) this.optimalSpace.textContent = prob.optimalSpace;

    // Generate Steps for Visualizer
    const inputNums = customInput || prob.defaultInput;
    const targetVal = customTarget !== null ? customTarget : prob.defaultTarget;
    const steps = prob.generateSteps(inputNums, targetVal, mode);

    StepEngine.init(steps, prob);
  },

  renderQuiz(quizItems) {
    const container = document.getElementById("quizContainer");
    if (!container) return;
    container.innerHTML = "";

    if (!quizItems || quizItems.length === 0) {
      container.innerHTML = `<p class="text-muted">No quiz items available for this pattern.</p>`;
      return;
    }

    const scoresTracker = {};

    // 1. Render Score Banner at Top
    const scoreBanner = document.createElement("div");
    scoreBanner.className = "quiz-score-banner";
    scoreBanner.innerHTML = `<span>🧠 Pattern ${this.currentPatternId} Quiz</span><span>Score: <span id="quizScoreVal" class="quiz-score-num">0 / ${quizItems.length}</span></span>`;
    container.appendChild(scoreBanner);

    const updateScore = () => {
      const correctCount = Object.values(scoresTracker).filter(Boolean).length;
      const scoreValElem = document.getElementById("quizScoreVal");
      if (scoreValElem) {
        scoreValElem.textContent = `${correctCount} / ${quizItems.length}`;
      }
    };

    const letters = ["A", "B", "C", "D"];

    // 2. Render Quiz Cards
    quizItems.forEach((q, qIdx) => {
      const card = document.createElement("div");
      card.className = "quiz-card";
      
      const qText = document.createElement("div");
      qText.className = "quiz-q";
      qText.textContent = `${qIdx + 1}. ${q.q}`;

      const optionsDiv = document.createElement("div");
      optionsDiv.className = "quiz-options";

      q.options.forEach((optText, oIdx) => {
        const optBtn = document.createElement("div");
        optBtn.className = "quiz-opt";
        optBtn.innerHTML = `<span class="quiz-opt-letter">${letters[oIdx]}.</span> <span>${this.escapeHtml(optText)}</span>`;

        optBtn.addEventListener("click", () => {
          optionsDiv.querySelectorAll(".quiz-opt").forEach((b) => b.className = "quiz-opt");
          
          if (oIdx === q.ans) {
            optBtn.className = "quiz-opt correct";
            scoresTracker[qIdx] = true;
          } else {
            optBtn.className = "quiz-opt wrong";
            if (optionsDiv.children[q.ans]) {
              optionsDiv.children[q.ans].className = "quiz-opt correct";
            }
            scoresTracker[qIdx] = false;
          }

          // Show Solution Explanation Box
          let expBox = card.querySelector(".quiz-exp-box");
          if (!expBox) {
            expBox = document.createElement("div");
            expBox.className = "quiz-exp-box";
            card.appendChild(expBox);
          }
          const isCorrect = (oIdx === q.ans);
          expBox.innerHTML = `<div class="quiz-exp-title">${isCorrect ? "✅ Correct Solution Explanation" : "💡 Solution Explanation"}</div><div>${this.escapeHtml(q.exp || "Correct answer: " + q.options[q.ans])}</div>`;

          updateScore();
        });

        optionsDiv.appendChild(optBtn);
      });

      card.appendChild(qText);
      card.appendChild(optionsDiv);
      container.appendChild(card);
    });
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },

  bindEvents() {
    // Canvas Zoom / Scale View Controls
    document.getElementById("zoomInBtn")?.addEventListener("click", () => {
      VisualizerEngine.setZoom(VisualizerEngine.canvasScale + 0.15);
    });
    document.getElementById("zoomOutBtn")?.addEventListener("click", () => {
      VisualizerEngine.setZoom(VisualizerEngine.canvasScale - 0.15);
    });
    document.getElementById("zoomResetBtn")?.addEventListener("click", () => {
      VisualizerEngine.setZoom(1.0);
    });

    // Mode Toggle Buttons (Optimized vs Brute Force)
    if (this.modeOptimalBtn) {
      this.modeOptimalBtn.addEventListener("click", () => {
        if (this.currentMode !== "optimal") {
          this.loadProblem(this.currentProblemId, null, null, "optimal");
        }
      });
    }
    if (this.modeBruteBtn) {
      this.modeBruteBtn.addEventListener("click", () => {
        if (this.currentMode !== "brute") {
          this.loadProblem(this.currentProblemId, null, null, "brute");
        }
      });
    }

    // Pattern & Problem Selectors
    if (this.patternSelect) {
      this.patternSelect.addEventListener("change", (e) => {
        this.loadPattern(parseInt(e.target.value));
      });
    }
    if (this.problemSelect) {
      this.problemSelect.addEventListener("change", (e) => {
        this.loadProblem(parseInt(e.target.value), null, null, this.currentMode);
      });
    }

    // Left Tabs Switching
    const leftTabs = document.getElementById("leftTabs");
    if (leftTabs) {
      leftTabs.addEventListener("click", (e) => {
        if (e.target.classList.contains("tab-btn")) {
          leftTabs.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
          e.target.classList.add("active");
          const targetTabId = e.target.getAttribute("data-tab");

          const panelLeft = document.getElementById("panelLeft");
          panelLeft.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"));
          const activeContent = document.getElementById(targetTabId);
          if (activeContent) activeContent.classList.add("active");
        }
      });
    }

    // Right Tabs Switching
    const rightTabs = document.getElementById("rightTabs");
    if (rightTabs) {
      rightTabs.addEventListener("click", (e) => {
        if (e.target.classList.contains("tab-btn")) {
          rightTabs.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
          e.target.classList.add("active");
          const targetTabId = e.target.getAttribute("data-tab");

          const panelRight = document.getElementById("panelRight");
          panelRight.querySelectorAll(".tab-content").forEach((tc) => tc.classList.remove("active"));
          const activeContent = document.getElementById(targetTabId);
          if (activeContent) activeContent.classList.add("active");
        }
      });
    }

    // Language Selector for Code
    const langSelector = document.getElementById("langSelector");
    if (langSelector) {
      langSelector.addEventListener("click", (e) => {
        if (e.target.classList.contains("lang-btn")) {
          langSelector.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));
          e.target.classList.add("active");
          const lang = e.target.getAttribute("data-lang");
          VisualizerEngine.setLanguage(lang);
          StepEngine.renderCurrentStep();
        }
      });
    }

    // Timeline Controls
    document.getElementById("playBtn")?.addEventListener("click", () => StepEngine.togglePlay());
    document.getElementById("prevBtn")?.addEventListener("click", () => StepEngine.prevStep());
    document.getElementById("nextBtn")?.addEventListener("click", () => StepEngine.nextStep());
    document.getElementById("resetBtn")?.addEventListener("click", () => StepEngine.reset());

    const timelineSlider = document.getElementById("timelineSlider");
    if (timelineSlider) {
      timelineSlider.addEventListener("input", (e) => {
        StepEngine.jumpToStep(parseInt(e.target.value));
      });
    }

    const speedSlider = document.getElementById("speedSlider");
    if (speedSlider) {
      speedSlider.addEventListener("input", (e) => {
        StepEngine.setSpeed(e.target.value);
      });
    }

    // Theme Toggle Button
    document.getElementById("themeToggleBtn")?.addEventListener("click", () => this.toggleTheme());

    // Fullscreen Toggle Button
    document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });

    // Custom Input Modal
    const customInputModal = document.getElementById("customInputModal");
    document.getElementById("customInputBtn")?.addEventListener("click", () => {
      if (customInputModal) customInputModal.classList.add("active");
    });
    document.getElementById("closeModalBtn")?.addEventListener("click", () => {
      if (customInputModal) customInputModal.classList.remove("active");
    });
    document.getElementById("cancelModalBtn")?.addEventListener("click", () => {
      if (customInputModal) customInputModal.classList.remove("active");
    });

    document.getElementById("applyCustomInputBtn")?.addEventListener("click", () => {
      const arrStr = document.getElementById("customArrayInput")?.value;
      const targetValStr = document.getElementById("customTargetInput")?.value;
      if (arrStr) {
        const nums = arrStr.split(",").map((s) => parseInt(s.trim())).filter((n) => !isNaN(n));
        const targetVal = targetValStr !== "" ? parseInt(targetValStr) : null;
        if (nums.length > 0) {
          this.loadProblem(this.currentProblemId, nums, targetVal, this.currentMode);
        }
      }
      if (customInputModal) customInputModal.classList.remove("active");
    });

    // Shortcuts Modal
    const shortcutsModal = document.getElementById("shortcutsModal");
    document.getElementById("shortcutsBtn")?.addEventListener("click", () => {
      if (shortcutsModal) shortcutsModal.classList.add("active");
    });
    document.getElementById("closeShortcutsBtn")?.addEventListener("click", () => {
      if (shortcutsModal) shortcutsModal.classList.remove("active");
    });

    // Global Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
      // Don't trigger when typing inside inputs
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          StepEngine.togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          StepEngine.prevStep();
          break;
        case "ArrowRight":
          e.preventDefault();
          StepEngine.nextStep();
          break;
        case "ArrowUp":
          e.preventDefault();
          StepEngine.setSpeed(Math.min(3, StepEngine.playbackSpeed + 0.5));
          if (speedSlider) speedSlider.value = StepEngine.playbackSpeed;
          break;
        case "ArrowDown":
          e.preventDefault();
          StepEngine.setSpeed(Math.max(0.5, StepEngine.playbackSpeed - 0.5));
          if (speedSlider) speedSlider.value = StepEngine.playbackSpeed;
          break;
        case "r":
        case "R":
          StepEngine.reset();
          break;
        case "Home":
          StepEngine.jumpToStep(0);
          break;
        case "End":
          StepEngine.jumpToStep(StepEngine.steps.length - 1);
          break;
        case "Escape":
          if (customInputModal) customInputModal.classList.remove("active");
          if (shortcutsModal) shortcutsModal.classList.remove("active");
          break;
      }

      if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
        this.toggleTheme();
      }
    });
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "glassy";
    let nextTheme = "glassy";
    let btnText = "💎 Glassy Premier";

    if (currentTheme === "glassy") {
      nextTheme = "dark";
      btnText = "🌙 Dark Glass";
    } else if (currentTheme === "dark") {
      nextTheme = "light";
      btnText = "☀️ Light Glass";
    } else {
      nextTheme = "glassy";
      btnText = "💎 Glassy Premier";
    }

    document.documentElement.setAttribute("data-theme", nextTheme);
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.textContent = btnText;
    }
  }
};
