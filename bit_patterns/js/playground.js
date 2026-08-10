/* ==========================================================================
   INTERACTIVE BIT PLAYGROUND & BITMASK SANDBOX ENGINE
   ========================================================================== */

const BitPlayground = {
  numA: 13,
  numB: 7,
  selectedOp: "AND", // AND, OR, XOR, NOT, LSHIFT, RSHIFT, CHECK, SET, CLEAR, TOGGLE
  bitLength: 8,
  targetBitPos: 1,

  init() {
    this.bindEvents();
    this.updatePlayground();
  },

  bindEvents() {
    const inputA = document.getElementById("playNumA");
    const inputB = document.getElementById("playNumB");
    const opSelect = document.getElementById("playOpSelect");
    const bitLenSelect = document.getElementById("playBitLenSelect");
    const posInput = document.getElementById("playBitPosInput");

    inputA?.addEventListener("input", (e) => {
      this.numA = parseInt(e.target.value) || 0;
      this.updatePlayground();
    });

    inputB?.addEventListener("input", (e) => {
      this.numB = parseInt(e.target.value) || 0;
      this.updatePlayground();
    });

    opSelect?.addEventListener("change", (e) => {
      this.selectedOp = e.target.value;
      this.updatePlayground();
    });

    bitLenSelect?.addEventListener("change", (e) => {
      this.bitLength = parseInt(e.target.value) || 8;
      this.updatePlayground();
    });

    posInput?.addEventListener("input", (e) => {
      this.targetBitPos = parseInt(e.target.value) || 0;
      this.updatePlayground();
    });
  },

  updatePlayground() {
    const container = document.getElementById("playgroundCanvas");
    const truthTableContainer = document.getElementById("truthTableGrid");
    if (!container) return;

    let resObj = null;

    switch (this.selectedOp) {
      case "AND":
        resObj = BitEngine.bitwiseAND(this.numA, this.numB, this.bitLength);
        break;
      case "OR":
        resObj = BitEngine.bitwiseOR(this.numA, this.numB, this.bitLength);
        break;
      case "XOR":
        resObj = BitEngine.bitwiseXOR(this.numA, this.numB, this.bitLength);
        break;
      case "NOT":
        resObj = BitEngine.bitwiseNOT(this.numA, this.bitLength);
        break;
      case "LSHIFT":
        resObj = BitEngine.leftShift(this.numA, this.numB || 1, this.bitLength);
        break;
      case "RSHIFT":
        resObj = BitEngine.rightShift(this.numA, this.numB || 1, this.bitLength);
        break;
      case "CHECK":
        resObj = BitEngine.checkBit(this.numA, this.targetBitPos);
        break;
      case "SET":
        resObj = BitEngine.setBit(this.numA, this.targetBitPos, this.bitLength);
        break;
      case "CLEAR":
        resObj = BitEngine.clearBit(this.numA, this.targetBitPos, this.bitLength);
        break;
      case "TOGGLE":
        resObj = BitEngine.toggleBit(this.numA, this.targetBitPos, this.bitLength);
        break;
    }

    if (resObj) {
      VisualizationEngine.renderBitMaskOverlay(
        container,
        resObj.a !== undefined ? resObj.a : this.numA,
        resObj.b !== undefined ? resObj.b : (resObj.mask !== undefined ? resObj.mask : null),
        this.selectedOp,
        resObj.result !== undefined ? resObj.result : (resObj.isSet ? 1 : 0),
        this.bitLength,
        this.targetBitPos
      );

      // Render Truth Table / Pair Evaluations
      if (truthTableContainer && resObj.pairEvals) {
        truthTableContainer.innerHTML = resObj.pairEvals.map((p) => `
          <div class="truth-eval-card">
            <span class="truth-pos">Bit ${p.position}</span>
            <span class="truth-exp">${p.expression}</span>
          </div>
        `).join("");
      }
    }
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = BitPlayground;
}
