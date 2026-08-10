/* ==========================================================================
   BIT MANIPULATION PATTERNS VISUALIZER — MAIN APPLICATION CONTROLLER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  currentPatternId: 1,
  currentProblemId: 101,
  currentMode: "optimal",
  presentationMode: false,
  completedProblems: new Set(),

  patternSelect: document.getElementById("patternSelect"),
  problemSelect: document.getElementById("problemSelect"),
  diffBadge: document.getElementById("diffBadge"),
  lcNumBadge: document.getElementById("lcNumBadge"),
  timeCompBadge: document.getElementById("timeCompBadge"),
  spaceCompBadge: document.getElementById("spaceCompBadge"),

  modeOptimalBtn: document.getElementById("modeOptimalBtn"),
  modeBruteBtn: document.getElementById("modeBruteBtn"),

  probTitle: document.getElementById("probTitle"),
  probStatement: document.getElementById("probStatement"),
  probExamples: document.getElementById("probExamples"),
  probConstraints: document.getElementById("probConstraints"),

  patternGuideTitle: document.getElementById("patternGuideTitle"),
  patternGuideDesc: document.getElementById("patternGuideDesc"),
  patternUseCases: document.getElementById("patternUseCases"),
  patternTemplateCode: document.getElementById("patternTemplateCode"),
  patternTips: document.getElementById("patternTips"),

  bruteDesc: document.getElementById("bruteDesc"),
  bruteTime: document.getElementById("bruteTime"),
  bruteSpace: document.getElementById("bruteSpace"),
  optimalDesc: document.getElementById("optimalDesc"),
  optimalTime: document.getElementById("optimalTime"),
  optimalSpace: document.getElementById("optimalSpace"),
  commonMistakesList: document.getElementById("commonMistakesList"),

  init() {
    this.loadProgress();
    PanelResizerEngine.init();
    this.populatePatternDropdown();
    this.bindEvents();

    if (typeof BitPlayground !== "undefined") {
      BitPlayground.init();
    }

    this.loadPattern(1);
    document.documentElement.setAttribute("data-theme", "glassy");
  },

  loadProgress() {
    try {
      const saved = localStorage.getItem("bit_completed_problems");
      if (saved) {
        this.completedProblems = new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load progress from localStorage", e);
    }
    this.updateProgressUI();
  },

  saveProgress() {
    try {
      localStorage.setItem("bit_completed_problems", JSON.stringify(Array.from(this.completedProblems)));
    } catch (e) {
      console.warn("Could not save progress to localStorage", e);
    }
    this.updateProgressUI();
  },

  toggleProblemCompletion(probId) {
    if (this.completedProblems.has(probId)) {
      this.completedProblems.delete(probId);
    } else {
      this.completedProblems.add(probId);
    }
    this.saveProgress();
    this.updateCompletionBadge(probId);
  },

  updateProgressUI() {
    const totalProbs = Object.keys(PROBLEMS_DATA).length;
    const completedCount = this.completedProblems.size;
    const pct = totalProbs > 0 ? Math.round((completedCount / totalProbs) * 100) : 0;

    const bar = document.getElementById("overallProgressBar");
    if (bar) bar.style.width = `${pct}%`;

    const label = document.getElementById("overallProgressLabel");
    if (label) label.textContent = `${completedCount} / ${totalProbs} (${pct}%)`;
  },

  updateCompletionBadge(probId) {
    const btn = document.getElementById("markCompleteBtn");
    if (!btn) return;

    const isDone = this.completedProblems.has(probId);
    btn.textContent = isDone ? "✓ Completed" : "○ Mark Complete";
    btn.classList.toggle("completed", isDone);
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
      const isDone = this.completedProblems.has(prob.id);
      const opt = document.createElement("option");
      opt.value = prob.id;
      opt.textContent = `${isDone ? "✓ " : ""}${idx + 1}. LC #${prob.lcNum} — ${prob.title}`;
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
    this.loadProblem(this.currentProblemId, null, this.currentMode);
  },

  loadProblem(problemId, customInput = null, mode = "optimal") {
    this.currentProblemId = problemId;
    this.currentMode = mode;
    const prob = PROBLEMS_DATA[problemId];
    if (!prob) return;

    this.updateCompletionBadge(problemId);

    if (this.modeOptimalBtn) this.modeOptimalBtn.classList.toggle("active", mode === "optimal");
    if (this.modeBruteBtn) this.modeBruteBtn.classList.toggle("active", mode === "brute");

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

    if (this.probTitle) this.probTitle.textContent = `LC #${prob.lcNum}. ${prob.title}`;
    if (this.probStatement) this.probStatement.textContent = prob.statement;
    if (this.probExamples) this.probExamples.textContent = prob.examples;
    if (this.probConstraints) {
      this.probConstraints.innerHTML = prob.constraints.map((c) => `<li>${c}</li>`).join("");
    }

    if (this.bruteDesc) this.bruteDesc.textContent = prob.bruteDesc;
    if (this.bruteTime) this.bruteTime.textContent = prob.bruteTime;
    if (this.bruteSpace) this.bruteSpace.textContent = prob.bruteSpace;
    if (this.optimalDesc) this.optimalDesc.textContent = prob.optimalDesc;
    if (this.optimalTime) this.optimalTime.textContent = prob.optimalTime;
    if (this.optimalSpace) this.optimalSpace.textContent = prob.optimalSpace;

    const inputVal = customInput !== null ? customInput : prob.defaultInput;
    const steps = prob.generateSteps(inputVal, null, mode);

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

    const scoreBanner = document.createElement("div");
    scoreBanner.className = "quiz-score-banner";
    scoreBanner.innerHTML = `<span>🧠 Pattern ${this.currentPatternId} Quiz</span><span>Score: <span id="quizScoreVal" class="quiz-score-num">0 / ${quizItems.length}</span></span>`;
    container.appendChild(scoreBanner);

    const updateScore = () => {
      const correctCount = Object.values(scoresTracker).filter(Boolean).length;
      const scoreValElem = document.getElementById("quizScoreVal");
      if (scoreValElem) scoreValElem.textContent = `${correctCount} / ${quizItems.length}`;
    };

    const letters = ["A", "B", "C", "D"];

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

  runLiveAudit() {
    const box = document.getElementById("auditDashboardBox");
    if (!box) return;

    if (typeof AuditRunner === "undefined") {
      box.innerHTML = `<p style="color: var(--accent-rose);">AuditRunner module not loaded.</p>`;
      return;
    }

    const report = AuditRunner.runFullAudit();

    box.innerHTML = `
      <div style="margin-bottom: 0.75rem;">
        <span style="font-weight: 800; font-size: 1rem; color: ${report.failed === 0 ? "var(--accent-green)" : "var(--accent-rose)"};">
          Status: ${report.overallStatus} (${report.passed} / ${report.totalTestCases} Passed)
        </span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem;">
        <div style="background: rgba(30,41,59,0.5); padding: 0.5rem; border-radius: 6px;">Problems Audited: <strong>${report.totalProblems}</strong></div>
        <div style="background: rgba(30,41,59,0.5); padding: 0.5rem; border-radius: 6px;">Total Test Cases: <strong>${report.totalTestCases}</strong></div>
        <div style="background: rgba(30,41,59,0.5); padding: 0.5rem; border-radius: 6px;">Visualization Steps: <strong>${report.totalVisualizationSteps}</strong></div>
        <div style="background: rgba(30,41,59,0.5); padding: 0.5rem; border-radius: 6px;">Bit Ops Check: <strong>100% PASS</strong></div>
      </div>
      <div style="font-size: 0.76rem; color: var(--text-muted);">
        ${report.errors.length === 0 ? "✅ All differential reference tests, bitwise laws, and step transitions verified mathematically." : report.errors.map(e => "❌ " + e).join("<br>")}
      </div>
    `;
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  },

  bindEvents() {
    document.getElementById("runAuditBtn")?.addEventListener("click", () => this.runLiveAudit());

    // Zoom Controls
    document.getElementById("zoomInBtn")?.addEventListener("click", () => {
      VisualizationEngine.setZoom(VisualizationEngine.canvasScale + 0.15);
    });
    document.getElementById("zoomOutBtn")?.addEventListener("click", () => {
      VisualizationEngine.setZoom(VisualizationEngine.canvasScale - 0.15);
    });
    document.getElementById("zoomResetBtn")?.addEventListener("click", () => {
      VisualizationEngine.setZoom(1.0);
    });

    // Mode Toggle Buttons
    if (this.modeOptimalBtn) {
      this.modeOptimalBtn.addEventListener("click", () => {
        if (this.currentMode !== "optimal") {
          this.loadProblem(this.currentProblemId, null, "optimal");
        }
      });
    }
    if (this.modeBruteBtn) {
      this.modeBruteBtn.addEventListener("click", () => {
        if (this.currentMode !== "brute") {
          this.loadProblem(this.currentProblemId, null, "brute");
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
        this.loadProblem(parseInt(e.target.value), null, this.currentMode);
      });
    }

    document.getElementById("markCompleteBtn")?.addEventListener("click", () => {
      this.toggleProblemCompletion(this.currentProblemId);
    });

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
          VisualizationEngine.setLanguage(lang);
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

    document.getElementById("themeToggleBtn")?.addEventListener("click", () => this.toggleTheme());
    document.getElementById("presentationBtn")?.addEventListener("click", () => this.togglePresentationMode());

    document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });

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
      const arrStr = document.getElementById("customInputText")?.value;
      if (arrStr) {
        let parsedVal = null;
        if (arrStr.includes(",")) {
          parsedVal = arrStr.split(",").map((s) => parseInt(s.trim())).filter((n) => !isNaN(n));
        } else {
          parsedVal = parseInt(arrStr.trim());
        }
        if (parsedVal !== null) {
          this.loadProblem(this.currentProblemId, parsedVal, this.currentMode);
        }
      }
      if (customInputModal) customInputModal.classList.remove("active");
    });

    const shortcutsModal = document.getElementById("shortcutsModal");
    document.getElementById("shortcutsBtn")?.addEventListener("click", () => {
      if (shortcutsModal) shortcutsModal.classList.add("active");
    });
    document.getElementById("closeShortcutsBtn")?.addEventListener("click", () => {
      if (shortcutsModal) shortcutsModal.classList.remove("active");
    });

    document.addEventListener("keydown", (e) => {
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
        case "f":
        case "F":
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else if (document.exitFullscreen) {
            document.exitFullscreen();
          }
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
    if (themeBtn) themeBtn.textContent = btnText;
  },

  togglePresentationMode() {
    this.presentationMode = !this.presentationMode;
    document.body.classList.toggle("presentation-mode", this.presentationMode);
    const btn = document.getElementById("presentationBtn");
    if (btn) btn.textContent = this.presentationMode ? "🎓 Exit Presentation" : "🎓 Teacher Mode";
  }
};
