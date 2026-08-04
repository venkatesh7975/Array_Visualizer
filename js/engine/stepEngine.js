/* ==========================================================================
   ARRAY PATTERNS VISUALIZER — TIMELINE & PLAYBACK CONTROL ENGINE
   ========================================================================== */

const StepEngine = {
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 1.0,
  timerId: null,
  currentProblem: null,

  // DOM Elements
  playBtn: document.getElementById("playBtn"),
  timelineSlider: document.getElementById("timelineSlider"),
  timelineProgress: document.getElementById("timelineProgress"),
  speedSlider: document.getElementById("speedSlider"),
  speedValLabel: document.getElementById("speedValLabel"),

  init(stepsArray, problem) {
    this.pause();
    this.steps = stepsArray.map((st, idx) => ({ ...st, stepNum: idx }));
    this.currentStepIndex = 0;
    this.currentProblem = problem;

    if (this.timelineSlider) {
      this.timelineSlider.max = Math.max(0, this.steps.length - 1);
      this.timelineSlider.value = 0;
    }

    // Populate Dry Run Table for all steps once
    VisualizerEngine.populateDryRunTable(this.steps);

    this.renderCurrentStep();
  },

  renderCurrentStep() {
    if (this.steps.length === 0) return;
    const step = this.steps[this.currentStepIndex];

    VisualizerEngine.renderStep(step, this.steps.length, this.currentProblem);

    if (this.timelineSlider) {
      this.timelineSlider.value = this.currentStepIndex;
    }
    if (this.timelineProgress) {
      const pct = (this.currentStepIndex / Math.max(1, this.steps.length - 1)) * 100;
      this.timelineProgress.style.width = `${pct}%`;
    }
  },

  play() {
    if (this.isPlaying) return;
    if (this.currentStepIndex >= this.steps.length - 1) {
      this.currentStepIndex = 0; // Restart if at end
    }

    this.isPlaying = true;
    if (this.playBtn) this.playBtn.innerHTML = "⏸ Pause";
    
    const intervalMs = Math.max(200, 1000 / this.playbackSpeed);
    this.timerId = setInterval(() => {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
        this.renderCurrentStep();
      } else {
        this.pause();
      }
    }, intervalMs);
  },

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.playBtn) this.playBtn.innerHTML = "▶ Play";
  },

  togglePlay() {
    if (this.isPlaying) this.pause();
    else this.play();
  },

  nextStep() {
    this.pause();
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.renderCurrentStep();
    }
  },

  prevStep() {
    this.pause();
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.renderCurrentStep();
    }
  },

  reset() {
    this.pause();
    this.currentStepIndex = 0;
    this.renderCurrentStep();
  },

  jumpToStep(stepIdx) {
    this.pause();
    this.currentStepIndex = Math.max(0, Math.min(stepIdx, this.steps.length - 1));
    this.renderCurrentStep();
  },

  setSpeed(speedVal) {
    this.playbackSpeed = parseFloat(speedVal);
    if (this.speedValLabel) {
      this.speedValLabel.textContent = `${this.playbackSpeed.toFixed(1)}x`;
    }
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }
};
