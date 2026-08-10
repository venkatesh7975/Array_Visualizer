/* ==========================================================================
   STEP EXECUTION ENGINE — TIMELINE, PLAYBACK & STATE CONTROLLER
   ========================================================================== */

const StepEngine = {
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 1.0,
  timerId: null,
  problemData: null,

  init(steps = [], problemData = null) {
    this.stopPlay();
    this.steps = steps;
    this.problemData = problemData;
    this.currentStepIndex = 0;

    const timelineSlider = document.getElementById("timelineSlider");
    if (timelineSlider) {
      timelineSlider.max = Math.max(0, steps.length - 1);
      timelineSlider.value = 0;
    }

    this.renderCurrentStep();
    this.logSystem(`Initialized ${steps.length} execution steps for ${problemData ? problemData.title : "problem"}.`);
  },

  renderCurrentStep() {
    if (!this.steps || this.steps.length === 0) return;

    const step = this.steps[this.currentStepIndex];
    if (!step) return;

    // 1. Update Step Counter & Action Badges
    const stepCounterBadge = document.getElementById("stepCounterBadge");
    if (stepCounterBadge) {
      stepCounterBadge.textContent = `Step ${this.currentStepIndex + 1} / ${this.steps.length}`;
    }

    const stepActionBadge = document.getElementById("stepActionBadge");
    if (stepActionBadge) {
      stepActionBadge.textContent = step.action || "Executing";
    }

    // 2. Update Timeline Slider & Progress Bar
    const timelineSlider = document.getElementById("timelineSlider");
    if (timelineSlider) {
      timelineSlider.value = this.currentStepIndex;
    }

    const timelineProgress = document.getElementById("timelineProgress");
    if (timelineProgress && this.steps.length > 1) {
      const pct = (this.currentStepIndex / (this.steps.length - 1)) * 100;
      timelineProgress.style.width = `${pct}%`;
    }

    // 3. Update Formula & Step Explanation Callouts
    const formulaText = document.getElementById("formulaText");
    if (formulaText) {
      formulaText.textContent = step.formula || step.explanation || "";
    }

    const explanationText = document.getElementById("explanationText");
    if (explanationText) {
      explanationText.textContent = step.explanation || "";
    }

    // 4. Render Primary Visualization Component
    const arrayVisualContainer = document.getElementById("arrayVisualContainer");
    const auxVisualContainer = document.getElementById("auxVisualContainer");

    if (arrayVisualContainer) {
      if (step.type === "kernighan") {
        VisualizationEngine.renderKernighanCard(
          arrayVisualContainer,
          step.n,
          step.nMinus1,
          step.result,
          step.lowestSetBitPos,
          step.bitLength || 8
        );
      } else if (step.type === "xorTrace") {
        VisualizationEngine.renderXorCancellationCard(
          arrayVisualContainer,
          step.prevXor,
          step.numberAdded,
          step.currentXor,
          step.bitLength || 8
        );
      } else if (step.type === "subsets") {
        VisualizationEngine.renderSubsetsCard(
          arrayVisualContainer,
          step.mask,
          step.subset,
          step.elements,
          step.bitLength || 3
        );
      } else if (step.type === "maskOverlay") {
        VisualizationEngine.renderBitMaskOverlay(
          arrayVisualContainer,
          step.numA,
          step.numB,
          step.opSymbol,
          step.resultNum,
          step.bitLength || 8,
          step.activePos !== undefined ? step.activePos : -1
        );
      } else if (step.bits) {
        VisualizationEngine.renderBitBoxes(
          arrayVisualContainer,
          step.bits,
          step.activeIndices || [],
          step.changedIndices || [],
          {
            label: step.bitLabel || "Binary Value",
            decimalVal: step.decimalVal,
            highlightPos: step.highlightPos
          }
        );
      }
    }

    // Auxiliary Container (Secondary visual e.g., auxiliary bits or mask)
    if (auxVisualContainer) {
      if (step.auxBits) {
        auxVisualContainer.style.display = "block";
        VisualizationEngine.renderBitBoxes(
          auxVisualContainer,
          step.auxBits,
          step.auxActive || [],
          [],
          { label: step.auxLabel || "Mask / State", decimalVal: step.auxDec }
        );
      } else {
        auxVisualContainer.style.display = "none";
      }
    }

    // 5. Render Code & Highlighting
    const codeDisplayBox = document.getElementById("codeDisplayBox");
    if (codeDisplayBox && this.problemData && this.problemData.code) {
      VisualizationEngine.renderSynchronizedCode(
        codeDisplayBox,
        this.problemData.code,
        step.codeLine || 1
      );
    }

    // 6. Update Parallel Code Dry Run Card
    const codeDryRunLineBadge = document.getElementById("codeDryRunLineBadge");
    if (codeDryRunLineBadge) codeDryRunLineBadge.textContent = `Line ${step.codeLine || 1}`;

    const codeDryRunOp = document.getElementById("codeDryRunOp");
    if (codeDryRunOp) codeDryRunOp.textContent = step.opSummary || step.action || "";

    const codeDryRunExp = document.getElementById("codeDryRunExp");
    if (codeDryRunExp) codeDryRunExp.textContent = step.explanation || "";

    const codeDryRunVars = document.getElementById("codeDryRunVars");
    if (codeDryRunVars && step.variables) {
      codeDryRunVars.innerHTML = Object.entries(step.variables).map(([k, v]) => `
        <span class="dry-var-pill"><strong>${k}:</strong> ${v}</span>
      `).join("");
    }

    // 7. Update Live Variable Watch Grid (Tab: Variables)
    const varWatchGrid = document.getElementById("varWatchGrid");
    if (varWatchGrid && step.variables) {
      VisualizationEngine.renderVariableWatchGrid(varWatchGrid, step.variables);
    }

    // 8. Update Execution Log Stream
    this.logStep(step);
  },

  togglePlay() {
    if (this.isPlaying) {
      this.stopPlay();
    } else {
      this.startPlay();
    }
  },

  startPlay() {
    if (this.currentStepIndex >= this.steps.length - 1) {
      this.currentStepIndex = 0;
    }
    this.isPlaying = true;
    const playBtn = document.getElementById("playBtn");
    if (playBtn) playBtn.textContent = "⏸ Pause";

    const intervalMs = 1200 / this.playbackSpeed;
    this.timerId = setInterval(() => {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
        this.renderCurrentStep();
      } else {
        this.stopPlay();
      }
    }, intervalMs);
  },

  stopPlay() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    const playBtn = document.getElementById("playBtn");
    if (playBtn) playBtn.textContent = "▶ Play";
  },

  nextStep() {
    this.stopPlay();
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.renderCurrentStep();
    }
  },

  prevStep() {
    this.stopPlay();
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.renderCurrentStep();
    }
  },

  jumpToStep(idx) {
    this.stopPlay();
    if (idx >= 0 && idx < this.steps.length) {
      this.currentStepIndex = idx;
      this.renderCurrentStep();
    }
  },

  reset() {
    this.stopPlay();
    this.currentStepIndex = 0;
    this.renderCurrentStep();
  },

  setSpeed(speed) {
    this.playbackSpeed = parseFloat(speed);
    const speedValLabel = document.getElementById("speedValLabel");
    if (speedValLabel) speedValLabel.textContent = `${this.playbackSpeed.toFixed(1)}x`;

    if (this.isPlaying) {
      this.stopPlay();
      this.startPlay();
    }
  },

  logStep(step) {
    const logBox = document.getElementById("executionLogBox");
    if (!logBox) return;

    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.textContent = `[Step ${this.currentStepIndex + 1}] ${step.action || "Step"}: ${step.explanation || ""}`;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
  },

  logSystem(msg) {
    const logBox = document.getElementById("executionLogBox");
    if (!logBox) return;

    const entry = document.createElement("div");
    entry.className = "log-entry log-system";
    entry.textContent = `[System] ${msg}`;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = StepEngine;
}
