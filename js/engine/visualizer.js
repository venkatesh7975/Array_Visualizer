/* ==========================================================================
   ARRAY PATTERNS VISUALIZER — DOM RENDERING & COLORFUL SYNTAX HIGHLIGHTING
   ========================================================================== */

const VisualizerEngine = {
  // DOM References
  arrayContainer: document.getElementById("arrayVisualContainer"),
  matrixContainer: document.getElementById("matrixVisualContainer"),
  auxContainer: document.getElementById("auxVisualContainer"),
  formulaLabel: document.getElementById("formulaLabel"),
  formulaText: document.getElementById("formulaText"),
  explanationText: document.getElementById("explanationText"),
  codeDisplayBox: document.getElementById("codeDisplayBox"),
  varWatchGrid: document.getElementById("varWatchGrid"),
  dryRunTableBody: document.getElementById("dryRunTableBody"),
  executionLogBox: document.getElementById("executionLogBox"),
  stepCounterBadge: document.getElementById("stepCounterBadge"),
  stepActionBadge: document.getElementById("stepActionBadge"),

  currentLang: "javascript",
  canvasScale: 1.0,

  setLanguage(lang) {
    this.currentLang = lang;
  },

  setZoom(scale) {
    this.canvasScale = Math.max(0.5, Math.min(2.0, scale));
    const viewport = document.getElementById("canvasViewport");
    if (viewport) {
      viewport.style.transform = `scale(${this.canvasScale})`;
    }
    const badge = document.getElementById("zoomValBadge");
    if (badge) {
      badge.textContent = `${Math.round(this.canvasScale * 100)}%`;
    }
  },

  renderStep(step, totalSteps, problem) {
    if (!step) return;

    const isFinal = step.stepNum === totalSteps - 1;
    const resVal = step.vars ? (step.vars.result !== undefined ? step.vars.result : (step.vars.output !== undefined ? step.vars.output : step.vars.pivotIndex)) : undefined;

    // 1. Update Step Badges & Formula
    if (this.stepCounterBadge) {
      this.stepCounterBadge.textContent = isFinal ? `Step ${step.stepNum || 0} / ${totalSteps - 1} (COMPLETED)` : `Step ${step.stepNum || 0} / ${totalSteps - 1}`;
      this.stepCounterBadge.className = isFinal ? "badge badge-easy" : "badge badge-info";
    }
    if (this.formulaText) {
      if (isFinal && resVal !== undefined) {
        const displayRes = typeof resVal === "object" ? JSON.stringify(resVal) : String(resVal);
        this.formulaText.innerHTML = `<span style="color: var(--accent-green); font-weight: 900;">🏆 FINAL RESULT: ${this.escapeHtml(displayRes)}</span>`;
      } else {
        this.formulaText.textContent = step.formula || "Executing step...";
      }
    }
    if (this.explanationText) {
      if (isFinal && resVal !== undefined) {
        const displayRes = typeof resVal === "object" ? JSON.stringify(resVal) : String(resVal);
        this.explanationText.innerHTML = `<span style="color: var(--accent-green); font-weight: 800;">Execution Completed!</span> Computed Correct Output: <code style="color: var(--accent-gold); font-size: 0.95rem; font-weight: 900; background: rgba(251, 191, 36, 0.15); padding: 0.15rem 0.5rem; border-radius: 6px;">${this.escapeHtml(displayRes)}</code>. ${this.escapeHtml(step.explanation || "")}`;
      } else {
        this.explanationText.textContent = step.explanation || "";
      }
    }

    // 2. Render 1D Array or 2D Matrix Canvas
    if (step.matrixState) {
      if (this.arrayContainer) this.arrayContainer.style.display = "none";
      if (this.matrixContainer) this.matrixContainer.style.display = "flex";
      this.renderMatrix(step.matrixState, step.pointers || {}, step.matrixConfig || {});
    } else {
      if (this.matrixContainer) this.matrixContainer.style.display = "none";
      if (this.arrayContainer) this.arrayContainer.style.display = "flex";
      this.renderArray(step.arrayState || [], step.pointers || {}, step.window);
    }

    // 3. Render Aux Structures (HashMap / Output Array / Running Totals / Final Result Card)
    this.renderAux(step.auxState || {}, step, isFinal);

    // 4. Render Synchronized Code Line Highlight for Current Approach Mode
    const activeMode = problem.currentMode || "optimal";
    const modeCode = (problem.code && problem.code[activeMode]) ? problem.code[activeMode] : problem.code;
    const codeStr = (modeCode && typeof modeCode === "object") ? (modeCode[this.currentLang] || "") : (modeCode || "");

    this.renderCode(codeStr, step.lineHighlight || 1);

    // 5. Update Parallel Code Dry Run Card inside Code Tab
    this.renderCodeDryRun(step);

    // 6. Update Variable Watch Grid with clear labels & icons
    this.renderVariables(step.vars || {});

    // 7. Highlight Dry Run Table Row
    this.highlightDryRunRow(step.stepNum || 0);

    // 8. Add Entry to Log Stream
    this.appendLogEntry(step);
  },

  renderArray(arrayState, pointers, window) {
    if (!this.arrayContainer) return;
    this.arrayContainer.innerHTML = "";

    // Render Sliding Window Overlay if specified
    if (window && typeof window.left === "number" && typeof window.right === "number") {
      const windowOverlay = document.createElement("div");
      windowOverlay.className = "sliding-window-overlay";
      
      const cellWidth = 68 + 16; // cell width + gap
      const leftPos = window.left * cellWidth + 32; // padding
      const rightPos = (window.right - window.left + 1) * cellWidth - 16;

      windowOverlay.style.left = `${leftPos}px`;
      windowOverlay.style.width = `${Math.max(rightPos, 68)}px`;
      windowOverlay.innerHTML = `<span class="sliding-window-label">Window [${window.left}..${window.right}]</span>`;
      this.arrayContainer.appendChild(windowOverlay);
    }

    arrayState.forEach((cellData, idx) => {
      const cell = document.createElement("div");
      cell.className = `array-cell ${cellData.activeClass || ""}`;

      const indexLabel = document.createElement("span");
      indexLabel.className = "cell-index";
      indexLabel.textContent = idx;

      const valueLabel = document.createElement("span");
      valueLabel.className = "cell-value";
      valueLabel.textContent = cellData.val;

      cell.appendChild(indexLabel);
      cell.appendChild(valueLabel);

      // Check pointers attached to this cell
      const activePtrs = Object.entries(pointers).filter(([_, ptrIdx]) => ptrIdx === idx);
      if (activePtrs.length > 0) {
        const ptrContainer = document.createElement("div");
        ptrContainer.className = "pointer-container";

        activePtrs.forEach(([ptrName, _], pIdx) => {
          const ptrBadge = document.createElement("span");
          const colorClass = pIdx % 4 === 0 ? "ptr-blue" : pIdx % 4 === 1 ? "ptr-purple" : pIdx % 4 === 2 ? "ptr-green" : "ptr-amber";
          ptrBadge.className = `pointer-badge ${colorClass}`;
          ptrBadge.textContent = ptrName;
          ptrContainer.appendChild(ptrBadge);
        });

        cell.appendChild(ptrContainer);
      }

      this.arrayContainer.appendChild(cell);
    });
  },

  renderMatrix(matrixState, pointers, config) {
    if (!this.matrixContainer) return;
    this.matrixContainer.innerHTML = "";

    const gridDiv = document.createElement("div");
    gridDiv.className = "matrix-grid-wrapper";

    if (config.title) {
      const gridTitle = document.createElement("div");
      gridTitle.className = "matrix-title";
      gridTitle.textContent = config.title;
      gridDiv.appendChild(gridTitle);
    }

    const table = document.createElement("div");
    table.className = "matrix-grid-table";

    matrixState.forEach((rowObj, rIdx) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = `matrix-row ${rowObj.rowClass || ""}`;

      const rowHeader = document.createElement("div");
      rowHeader.className = "matrix-row-label";
      rowHeader.textContent = rowObj.label || `Row ${rIdx}`;
      rowDiv.appendChild(rowHeader);

      const cellsDiv = document.createElement("div");
      cellsDiv.className = "matrix-row-cells";

      rowObj.cells.forEach((cellObj, cIdx) => {
        const cell = document.createElement("div");
        cell.className = `matrix-cell ${cellObj.activeClass || ""}`;

        const posTag = document.createElement("span");
        posTag.className = "matrix-cell-pos";
        posTag.textContent = `[${rIdx},${cIdx}]`;

        const valTag = document.createElement("span");
        valTag.className = "matrix-cell-val";
        valTag.textContent = cellObj.val;

        cell.appendChild(posTag);
        cell.appendChild(valTag);

        // Check pointers targeting [rIdx, cIdx]
        const cellPtrs = Object.entries(pointers).filter(([_, pos]) => {
          if (Array.isArray(pos)) return pos[0] === rIdx && pos[1] === cIdx;
          if (typeof pos === "number") return pos === (rIdx * rowObj.cells.length + cIdx);
          return false;
        });

        if (cellPtrs.length > 0) {
          const ptrDiv = document.createElement("div");
          ptrDiv.className = "pointer-container";
          cellPtrs.forEach(([pName, _], pIdx) => {
            const ptrBadge = document.createElement("span");
            const colorClass = pIdx % 4 === 0 ? "ptr-blue" : pIdx % 4 === 1 ? "ptr-purple" : pIdx % 4 === 2 ? "ptr-green" : "ptr-amber";
            ptrBadge.className = `pointer-badge ${colorClass}`;
            ptrBadge.textContent = pName;
            ptrDiv.appendChild(ptrBadge);
          });
          cell.appendChild(ptrDiv);
        }

        cellsDiv.appendChild(cell);
      });

      rowDiv.appendChild(cellsDiv);

      if (rowObj.rowSum !== undefined) {
        const sumBadge = document.createElement("div");
        sumBadge.className = `matrix-row-sum ${rowObj.isMax ? "row-sum-max" : ""}`;
        sumBadge.innerHTML = `<span style="font-size:0.7rem; color:var(--text-muted);">Sum</span><strong>$${rowObj.rowSum}</strong>`;
        rowDiv.appendChild(sumBadge);
      }

      table.appendChild(rowDiv);
    });

    gridDiv.appendChild(table);
    this.matrixContainer.appendChild(gridDiv);
  },

  renderAux(auxState, step, isFinal) {
    if (!this.auxContainer) return;
    this.auxContainer.innerHTML = "";

    const resVal = step && step.vars ? (step.vars.result !== undefined ? step.vars.result : (step.vars.output !== undefined ? step.vars.output : step.vars.pivotIndex)) : undefined;

    // 1. Output Result Array View
    if (auxState && auxState.outputArray) {
      const outputWrapper = document.createElement("div");
      outputWrapper.className = "aux-output-wrapper";

      const title = document.createElement("div");
      title.className = "aux-title";
      title.textContent = auxState.outputTitle || "✨ RESULT ARRAY OUTPUT";

      const arrayBox = document.createElement("div");
      arrayBox.className = "aux-array-box";

      auxState.outputArray.forEach((item, idx) => {
        const itemPill = document.createElement("div");
        itemPill.className = `aux-array-cell ${item.activeClass || ""}`;
        itemPill.innerHTML = `<span class="aux-cell-idx">${idx}</span><span class="aux-cell-val">${item.val !== undefined ? item.val : item}</span>`;
        arrayBox.appendChild(itemPill);
      });

      outputWrapper.appendChild(title);
      outputWrapper.appendChild(arrayBox);
      this.auxContainer.appendChild(outputWrapper);
    }

    // 2. HashMap View
    if (auxState && auxState.hashMap) {
      const hashMapWrapper = document.createElement("div");
      hashMapWrapper.className = "hashmap-grid-view";
      
      const title = document.createElement("div");
      title.className = "hashmap-title";
      title.textContent = "🗺️ HASHMAP MEMORY (Key → Value)";

      const entriesDiv = document.createElement("div");
      entriesDiv.className = "hashmap-entries";

      const entries = auxState.hashMap.split(", ");
      entries.forEach((e) => {
        if (!e) return;
        const [k, v] = e.split("→");
        const pill = document.createElement("div");
        pill.className = "hashmap-pill highlight";
        pill.innerHTML = `<span class="hashmap-key">${k}</span><span class="hashmap-arrow">→</span><span class="hashmap-val">${v !== undefined ? v : ""}</span>`;
        entriesDiv.appendChild(pill);
      });

      hashMapWrapper.appendChild(title);
      hashMapWrapper.appendChild(entriesDiv);
      this.auxContainer.appendChild(hashMapWrapper);
    }

    // 3. Final Output Result Card (Prominent display on completion or when result is ready)
    if (isFinal && resVal !== undefined && (!auxState || !auxState.outputArray)) {
      const resultCard = document.createElement("div");
      resultCard.className = "aux-output-wrapper";
      resultCard.style.borderColor = "var(--accent-green)";
      resultCard.style.boxShadow = "0 0 20px var(--accent-green-glow)";

      const title = document.createElement("div");
      title.className = "aux-title";
      title.style.color = "var(--accent-green)";
      title.textContent = "🏆 FINAL COMPUTED OUTPUT RESULT";

      const displayRes = typeof resVal === "object" ? JSON.stringify(resVal) : String(resVal);

      const valBox = document.createElement("div");
      valBox.style.fontFamily = "var(--font-code)";
      valBox.style.fontSize = "1.2rem";
      valBox.style.fontWeight = "900";
      valBox.style.color = "#ffffff";
      valBox.style.padding = "0.4rem 0.8rem";
      valBox.style.background = "rgba(16, 185, 129, 0.2)";
      valBox.style.borderRadius = "8px";
      valBox.style.display = "inline-block";
      valBox.textContent = displayRes;

      resultCard.appendChild(title);
      resultCard.appendChild(valBox);
      this.auxContainer.appendChild(resultCard);
    }
  },

  normalizeCodeIndent(codeStr) {
    if (!codeStr) return "";
    const rawLines = codeStr.split("\n");
    while (rawLines.length > 0 && rawLines[0].trim() === "") rawLines.shift();
    while (rawLines.length > 0 && rawLines[rawLines.length - 1].trim() === "") rawLines.pop();
    if (rawLines.length === 0) return "";

    let minIndent = Infinity;
    rawLines.forEach(line => {
      if (line.trim().length > 0) {
        const match = line.match(/^(\s*)/);
        const indent = match ? match[1].length : 0;
        if (indent < minIndent) minIndent = indent;
      }
    });

    if (minIndent === Infinity || minIndent === 0) return rawLines.join("\n");
    return rawLines.map(line => line.length >= minIndent ? line.slice(minIndent) : line).join("\n");
  },

  renderCode(codeString, highlightLine) {
    if (!this.codeDisplayBox) return;
    const activeLine = (typeof highlightLine === "object" && highlightLine !== null)
      ? (highlightLine[this.currentLang] || highlightLine.javascript || 1)
      : highlightLine;
    const cleanCode = this.normalizeCodeIndent(codeString);
    const lines = cleanCode.split("\n");
    let html = "";

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      const isActive = lineNum === activeLine;
      const highlightedLine = this.highlightSyntax(line, this.currentLang);
      html += `<div class="code-line ${isActive ? "active-line" : ""}"><span class="line-num">${lineNum}</span><span class="line-text">${highlightedLine}</span></div>`;
    });

    this.codeDisplayBox.innerHTML = html;

    // Scroll active line into view smoothly
    const activeLineElem = this.codeDisplayBox.querySelector(".active-line");
    if (activeLineElem) {
      activeLineElem.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  },

  renderCodeDryRun(step) {
    const lineBadge = document.getElementById("codeDryRunLineBadge");
    const varsDiv = document.getElementById("codeDryRunVars");
    const opDiv = document.getElementById("codeDryRunOp");
    const expDiv = document.getElementById("codeDryRunExp");

    if (lineBadge) lineBadge.textContent = `Line ${step.lineHighlight || 1}`;
    if (opDiv) opDiv.textContent = step.formula || "";
    if (expDiv) expDiv.textContent = step.explanation || "";

    if (varsDiv) {
      varsDiv.innerHTML = "";
      if (step.vars) {
        Object.entries(step.vars).forEach(([k, v]) => {
          const icon = this.getVarIcon(k);
          const pill = document.createElement("div");
          pill.className = "hashmap-pill highlight";
          pill.style.padding = "0.25rem 0.55rem";
          pill.style.fontSize = "0.78rem";
          pill.innerHTML = `<span style="font-size:0.75rem;">${icon}</span> <span class="hashmap-key">${this.escapeHtml(k)}</span> <span class="hashmap-arrow">=</span> <span class="hashmap-val">${this.escapeHtml(String(v))}</span>`;
          varsDiv.appendChild(pill);
        });
      }
    }
  },

  highlightSyntax(line, lang) {
    if (!line) return "";

    const keywords = new Set([
      "function", "let", "const", "var", "if", "else", "for", "while", "return", "class", "new",
      "def", "import", "from", "in", "and", "or", "not", "is", "elif",
      "public", "private", "protected", "static", "void", "int", "double", "float", "boolean", "long",
      "auto", "vector", "string", "struct", "template", "typename", "push_back", "append"
    ]);

    const types = new Set([
      "number", "boolean", "string", "int", "double", "float", "char", "vector", "Map", "Set", "HashMap", "ArrayList", "unordered_map", "List", "Array"
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

  renderVariables(varsObj) {
    if (!this.varWatchGrid) return;
    this.varWatchGrid.innerHTML = "";

    Object.entries(varsObj).forEach(([vName, vVal]) => {
      const icon = this.getVarIcon(vName);
      const highlightClass = (String(vName).toLowerCase().includes("res") || String(vName).toLowerCase().includes("ans")) ? "highlight-green" : String(vName).toLowerCase().includes("sum") ? "highlight-amber" : "";
      
      const card = document.createElement("div");
      card.className = "var-card";
      card.innerHTML = `<div class="var-name"><span>${icon}</span><span>${this.escapeHtml(vName)}</span></div><div class="var-val ${highlightClass}">${this.escapeHtml(String(vVal))}</div>`;
      this.varWatchGrid.appendChild(card);
    });
  },

  getVarIcon(name) {
    const n = String(name).toLowerCase();
    if (n.includes("read") || n.includes("write") || n === "i" || n === "j") return "📍";
    if (n.includes("left") || n.includes("low")) return "👈";
    if (n.includes("right") || n.includes("high")) return "👉";
    if (n.includes("mid")) return "🎯";
    if (n.includes("sum") || n.includes("running")) return "➕";
    if (n.includes("max") || n.includes("min")) return "📊";
    if (n.includes("target")) return "🎯";
    if (n.includes("comp")) return "🧩";
    if (n.includes("res") || n.includes("ans") || n.includes("status")) return "🎉";
    if (n.includes("mode")) return "⚡";
    return "🔍";
  },

  populateDryRunTable(steps) {
    if (!this.dryRunTableBody) return;
    this.dryRunTableBody.innerHTML = "";

    // 1. Collect all variable names across all steps
    const varNamesSet = new Set();
    steps.forEach((st) => {
      if (st.vars) {
        Object.keys(st.vars).forEach((k) => varNamesSet.add(k));
      }
    });
    const varNames = Array.from(varNamesSet);

    // 2. Build Header Row
    const headerRow = document.getElementById("dryRunHeaderRow");
    if (headerRow) {
      let headerHtml = `<th style="width:45px;">Step</th><th style="width:45px;">Line</th>`;
      varNames.forEach((v) => {
        headerHtml += `<th>${this.escapeHtml(v)}</th>`;
      });
      headerHtml += `<th>Operation</th><th>Explanation</th>`;
      headerRow.innerHTML = headerHtml;
    }

    // 3. Render Step Rows
    steps.forEach((st, idx) => {
      const tr = document.createElement("tr");
      tr.id = `dryRunRow-${idx}`;
      tr.style.cursor = "pointer";
      tr.title = `Click to jump to Step ${idx}`;

      let rowHtml = `<td style="font-weight:800; color:var(--accent-cyan);">${st.stepNum}</td><td style="font-family:var(--font-code); color:var(--accent-purple); font-weight:700;">L${st.lineHighlight || 1}</td>`;

      varNames.forEach((v) => {
        const val = (st.vars && st.vars[v] !== undefined) ? st.vars[v] : "-";
        const isHighlight = String(v).toLowerCase().includes("sum") || String(v).toLowerCase().includes("res");
        rowHtml += `<td><span class="${isHighlight ? "dry-run-highlight" : "dry-run-val"}">${this.escapeHtml(String(val))}</span></td>`;
      });

      rowHtml += `<td style="color:var(--accent-cyan); font-weight:600;">${this.escapeHtml(st.formula || "")}</td>`;
      rowHtml += `<td style="color:var(--text-main);">${this.escapeHtml(st.explanation || "")}</td>`;

      tr.innerHTML = rowHtml;

      tr.addEventListener("click", () => {
        if (typeof StepEngine !== "undefined") {
          StepEngine.jumpToStep(idx);
        }
      });

      this.dryRunTableBody.appendChild(tr);
    });
  },

  highlightDryRunRow(stepIndex) {
    if (!this.dryRunTableBody) return;
    const rows = this.dryRunTableBody.querySelectorAll("tr");
    rows.forEach((r, idx) => {
      r.classList.toggle("current-row", idx === stepIndex);
    });

    const activeRow = document.getElementById(`dryRunRow-${stepIndex}`);
    if (activeRow) {
      activeRow.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  },

  appendLogEntry(step) {
    if (!this.executionLogBox) return;
    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.textContent = `[Step ${step.stepNum}] ${step.formula || ""} — ${step.explanation || ""}`;
    this.executionLogBox.appendChild(entry);
    this.executionLogBox.scrollTop = this.executionLogBox.scrollHeight;
  },

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
};
