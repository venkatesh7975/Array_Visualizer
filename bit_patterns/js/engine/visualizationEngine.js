/* ==========================================================================
   BIT VISUALIZATION ENGINE — RENDERER FOR BIT BOXES, MASKS & CODE TRACKER
   ========================================================================== */

const VisualizationEngine = {
  currentLanguage: "python", // "python", "javascript", "java", "cpp"
  canvasScale: 1.0,

  setLanguage(lang) {
    this.currentLanguage = lang;
  },

  setZoom(scale) {
    this.canvasScale = Math.max(0.5, Math.min(2.0, scale));
    const viewport = document.getElementById("canvasViewport");
    if (viewport) {
      viewport.style.transform = `scale(${this.canvasScale})`;
    }
    const valBadge = document.getElementById("zoomValBadge");
    if (valBadge) {
      valBadge.textContent = `${Math.round(this.canvasScale * 100)}%`;
    }
  },

  /**
   * Renders an array of bit boxes (e.g. 8-bit, 16-bit, 32-bit) with position labels.
   */
  renderBitBoxes(container, bits, activeIndices = [], changedIndices = [], options = {}) {
    if (!container) return;
    container.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "bit-array-wrapper";

    const label = options.label || "Binary Bits";
    const titleElem = document.createElement("div");
    titleElem.className = "bit-array-title";
    titleElem.innerHTML = `<span>${label}</span> <span class="bit-len-tag">${bits.length}-bit</span>`;
    wrapper.appendChild(titleElem);

    const grid = document.createElement("div");
    grid.className = `bit-grid bit-grid-${bits.length}`;

    const totalBits = bits.length;

    bits.forEach((bitVal, idx) => {
      const bitPos = totalBits - 1 - idx;
      const box = document.createElement("div");
      
      let boxClass = `bit-box ${bitVal === 1 ? "bit-one" : "bit-zero"}`;
      if (activeIndices.includes(bitPos)) boxClass += " bit-active";
      if (changedIndices.includes(bitPos)) boxClass += " bit-changed";
      if (options.highlightPos === bitPos) boxClass += " bit-target";

      box.className = boxClass;
      box.innerHTML = `
        <span class="bit-val">${bitVal}</span>
        <span class="bit-pos">${bitPos}</span>
      `;
      grid.appendChild(box);
    });

    wrapper.appendChild(grid);

    if (options.decimalVal !== undefined) {
      const decInfo = document.createElement("div");
      decInfo.className = "bit-dec-info";
      decInfo.innerHTML = `Decimal: <strong>${options.decimalVal}</strong> | Hex: <strong>${BitEngine.toHexString(options.decimalVal, bits.length)}</strong>`;
      wrapper.appendChild(decInfo);
    }

    container.appendChild(wrapper);
  },

  /**
   * Renders stacked Bitmask Overlay (Number A, Operator, Number B, Result)
   */
  renderBitMaskOverlay(container, numA, numB, opSymbol, resultNum, bitLength = 8, activePos = -1) {
    if (!container) return;
    container.innerHTML = "";

    const bitsA = BitEngine.toBitArray(numA, bitLength);
    const bitsB = numB !== null ? BitEngine.toBitArray(numB, bitLength) : null;
    const bitsRes = BitEngine.toBitArray(resultNum, bitLength);

    const card = document.createElement("div");
    card.className = "bitmask-card";

    // Row A
    const rowA = document.createElement("div");
    rowA.className = "bitmask-row";
    rowA.innerHTML = `<span class="bitmask-label">A (${numA})</span>` + 
      bitsA.map((b, i) => `<span class="bit-mini ${b ? "one" : "zero"} ${bitLength - 1 - i === activePos ? "active" : ""}">${b}</span>`).join("");
    card.appendChild(rowA);

    // Row Operator + B (if b exists)
    if (bitsB) {
      const rowB = document.createElement("div");
      rowB.className = "bitmask-row";
      rowB.innerHTML = `<span class="bitmask-label">${opSymbol} (${numB})</span>` + 
        bitsB.map((b, i) => `<span class="bit-mini ${b ? "one" : "zero"} ${bitLength - 1 - i === activePos ? "active" : ""}">${b}</span>`).join("");
      card.appendChild(rowB);
    }

    // Divider line
    const divider = document.createElement("div");
    divider.className = "bitmask-divider";
    card.appendChild(divider);

    // Result Row
    const rowRes = document.createElement("div");
    rowRes.className = "bitmask-row bitmask-res-row";
    rowRes.innerHTML = `<span class="bitmask-label">Result (${resultNum})</span>` + 
      bitsRes.map((b, i) => `<span class="bit-mini ${b ? "one-res" : "zero-res"} ${bitLength - 1 - i === activePos ? "active" : ""}">${b}</span>`).join("");
    card.appendChild(rowRes);

    container.appendChild(card);
  },

  /**
   * Renders Brian Kernighan n & (n - 1) step visualizer card
   */
  renderKernighanCard(container, n, nMinus1, result, lowestSetBitPos, bitLength = 8) {
    if (!container) return;
    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "kernighan-card";

    card.innerHTML = `
      <div class="kern-title">🔥 Brian Kernighan Step: <code>n & (n - 1)</code></div>
      <div class="kern-step-wrap">
        <div class="kern-row">
          <span class="kern-tag">n (${n})</span>
          <span class="kern-bits">${BitEngine.toBinaryString(n, bitLength, true)}</span>
        </div>
        <div class="kern-row">
          <span class="kern-tag">n - 1 (${nMinus1})</span>
          <span class="kern-bits">${BitEngine.toBinaryString(nMinus1, bitLength, true)}</span>
        </div>
        <div class="kern-row kern-res">
          <span class="kern-tag">n & (n-1) (${result})</span>
          <span class="kern-bits" style="color: var(--accent-green);">${BitEngine.toBinaryString(result, bitLength, true)}</span>
        </div>
      </div>
      <div class="kern-callout">
        ⚡ Lowest set bit at <strong>position ${lowestSetBitPos}</strong> was cleared to <code>0</code>!
      </div>
    `;

    container.appendChild(card);
  },

  /**
   * Renders XOR Cancellation Visualizer Card
   */
  renderXorCancellationCard(container, prevXor, num, currentXor, bitLength = 8) {
    if (!container) return;
    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "xor-card";

    const isCancelled = (prevXor ^ num) < prevXor;

    card.innerHTML = `
      <div class="xor-title">⚡ XOR Accumulator: <code>prev ^ num</code></div>
      <div class="xor-body">
        <div class="xor-item">
          <span class="xor-lbl">Prev XOR</span>
          <span class="xor-val">${prevXor}</span>
          <span class="xor-bin">${BitEngine.toBinaryString(prevXor, bitLength, true)}</span>
        </div>
        <span class="xor-op">^</span>
        <div class="xor-item">
          <span class="xor-lbl">Current Num</span>
          <span class="xor-val">${num}</span>
          <span class="xor-bin">${BitEngine.toBinaryString(num, bitLength, true)}</span>
        </div>
        <span class="xor-op">=</span>
        <div class="xor-item highlight">
          <span class="xor-lbl">New XOR</span>
          <span class="xor-val">${currentXor}</span>
          <span class="xor-bin">${BitEngine.toBinaryString(currentXor, bitLength, true)}</span>
        </div>
      </div>
      <div class="xor-badge ${isCancelled ? "cancelled" : "accumulated"}">
        ${isCancelled ? "✨ Duplicate pair detected! Values cancelled out." : "➕ Distinct value incorporated into XOR bitmask."}
      </div>
    `;

    container.appendChild(card);
  },

  /**
   * Renders Subsets Bitmask Card
   */
  renderSubsetsCard(container, mask, subset, elements, bitLength = 3) {
    if (!container) return;
    container.innerHTML = "";

    const bits = BitEngine.toBitArray(mask, bitLength);
    const card = document.createElement("div");
    card.className = "subsets-card";

    let elementsMarkup = elements.map((elem, idx) => {
      const bitPos = bitLength - 1 - idx;
      const isSelected = (mask & (1 << bitPos)) !== 0;
      return `
        <div class="subset-elem-box ${isSelected ? "selected" : "unselected"}">
          <span class="elem-val">${elem}</span>
          <span class="elem-bit">Bit ${bitPos}: ${isSelected ? "1" : "0"}</span>
        </div>
      `;
    }).join("");

    card.innerHTML = `
      <div class="subsets-title">🧩 Bitmask <code>${bits.join("")}</code> (Decimal ${mask})</div>
      <div class="subsets-elements-grid">
        ${elementsMarkup}
      </div>
      <div class="subsets-res-box">
        Current Subset: <strong>[ ${subset.join(", ")} ]</strong>
      </div>
    `;

    container.appendChild(card);
  },

  /**
   * Renders Live Variables Watch Grid (Decimal, Binary, Hex)
   */
  renderVariableWatchGrid(container, variables = {}) {
    if (!container) return;
    container.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "var-watch-grid";

    Object.entries(variables).forEach(([key, val]) => {
      const card = document.createElement("div");
      card.className = "var-card";

      let displayVal = val;
      let binaryVal = "";
      let hexVal = "";

      if (typeof val === "number") {
        binaryVal = BitEngine.toBinaryString(val, 8, true);
        hexVal = BitEngine.toHexString(val, 8);
      } else if (Array.isArray(val)) {
        displayVal = `[${val.join(", ")}]`;
      }

      card.innerHTML = `
        <div class="var-name">${key}</div>
        <div class="var-val">${displayVal}</div>
        ${binaryVal ? `<div class="var-sub">Bin: ${binaryVal}</div>` : ""}
        ${hexVal ? `<div class="var-sub">Hex: ${hexVal}</div>` : ""}
      `;
      grid.appendChild(card);
    });

    container.appendChild(grid);
  },

  /**
   * Renders Synchronized Multi-Language Code Block with COLORFUL SYNTAX HIGHLIGHTING & active line
   */
  renderSynchronizedCode(container, codeObj, currentLineIndex = 1) {
    if (!container || !codeObj) return;
    container.innerHTML = "";

    const lang = this.currentLanguage || "python";
    const codeLines = codeObj[lang] || codeObj["python"] || [];
    
    const activeLine = (typeof currentLineIndex === "object" && currentLineIndex !== null)
      ? (currentLineIndex[lang] || currentLineIndex["python"] || 1)
      : currentLineIndex;

    const pre = document.createElement("pre");
    pre.className = "code-block";

    codeLines.forEach((lineText, idx) => {
      const lineNum = idx + 1;
      const isActive = lineNum === activeLine;
      const highlightedLine = this.highlightSyntax(lineText, lang);

      const lineDiv = document.createElement("div");
      lineDiv.className = `code-line ${isActive ? "active-line" : ""}`;
      lineDiv.innerHTML = `
        <span class="line-num">${lineNum}</span>
        <span class="line-code">${highlightedLine}</span>
      `;
      pre.appendChild(lineDiv);
    });

    container.appendChild(pre);

    // Scroll active line into view smoothly
    const activeLineElem = container.querySelector(".active-line");
    if (activeLineElem) {
      activeLineElem.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  },

  /**
   * Colorful Syntax Highlighting Tokenizer matching Array Patterns
   */
  highlightSyntax(line, lang) {
    if (!line) return "";

    const keywords = new Set([
      "function", "let", "const", "var", "if", "else", "for", "while", "return", "class", "new",
      "def", "import", "from", "in", "and", "or", "not", "is", "elif",
      "public", "private", "protected", "static", "void", "int", "double", "float", "boolean", "long", "uint32_t", "unsigned",
      "auto", "vector", "string", "struct", "template", "typename", "push_back", "append", "bool", "True", "False"
    ]);

    const types = new Set([
      "number", "boolean", "string", "int", "double", "float", "char", "vector", "Map", "Set", "HashMap", "ArrayList", "unordered_map", "List", "Array", "uint32_t"
    ]);

    const tokenRegex = /(\/\/[^\n]*|#[^\n]*)|(["'`].*?["'`])|(\b\d+\b)|(\b[a-zA-Z_]\w*\b)/g;

    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        result += this.escapeHtml(line.slice(lastIndex, match.index));
      }

      const [fullMatch, comment, str, num, word] = match;

      if (comment) {
        result += `<span class="syn-comment">${this.escapeHtml(comment)}</span>`;
      } else if (str) {
        result += `<span class="syn-string">${this.escapeHtml(str)}</span>`;
      } else if (num) {
        result += `<span class="syn-num">${this.escapeHtml(num)}</span>`;
      } else if (word) {
        if (keywords.has(word)) {
          result += `<span class="syn-kw">${this.escapeHtml(word)}</span>`;
        } else if (types.has(word)) {
          result += `<span class="syn-type">${this.escapeHtml(word)}</span>`;
        } else {
          const nextCharIdx = match.index + word.length;
          const remaining = line.slice(nextCharIdx).trimStart();
          if (remaining.startsWith("(")) {
            result += `<span class="syn-func">${this.escapeHtml(word)}</span>`;
          } else {
            result += this.escapeHtml(word);
          }
        }
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      result += this.escapeHtml(line.slice(lastIndex));
    }

    return result;
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = VisualizationEngine;
}
