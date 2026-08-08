/* ==========================================================================
   ARRAY PATTERNS VISUALIZER — RESIZABLE & COLLAPSIBLE PANELS ENGINE
   ========================================================================== */

const PanelResizerEngine = {
  leftWidth: 340,
  rightWidth: 400,
  leftCollapsed: false,
  rightCollapsed: false,

  init() {
    const resizerLeft = document.getElementById("resizerLeft");
    const resizerRight = document.getElementById("resizerRight");
    const resizerRightSubPanel = document.getElementById("resizerRightSubPanel");

    const panelLeft = document.getElementById("panelLeft");
    const panelRight = document.getElementById("panelRight");
    const subpanelCodeTop = document.getElementById("subpanelCodeTop");
    const subpanelVarsBottom = document.getElementById("subpanelVarsBottom");

    if (resizerLeft && panelLeft) {
      this.setupResizer(resizerLeft, panelLeft, "left");
    }
    if (resizerRight && panelRight) {
      this.setupResizer(resizerRight, panelRight, "right");
    }
    if (resizerRightSubPanel && subpanelCodeTop && subpanelVarsBottom) {
      this.setupVerticalSubpanelResizer(resizerRightSubPanel, subpanelCodeTop, subpanelVarsBottom);
    }

    // Bind Collapse Toggle Buttons
    document.getElementById("toggleLeftPanelBtn")?.addEventListener("click", () => this.togglePanel("left"));
    document.getElementById("toggleRightPanelBtn")?.addEventListener("click", () => this.togglePanel("right"));
    document.getElementById("quickLeftToggleBtn")?.addEventListener("click", () => this.togglePanel("left"));
    document.getElementById("quickRightToggleBtn")?.addEventListener("click", () => this.togglePanel("right"));

    // Bind Preset Width Cycle Button
    document.getElementById("leftPresetBtn")?.addEventListener("click", () => this.cycleLeftPreset());

    // Global Shortcuts: Ctrl+[ (Left Panel), Ctrl+] (Right Panel)
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "[") {
        e.preventDefault();
        this.togglePanel("left");
      } else if (e.ctrlKey && e.key === "]") {
        e.preventDefault();
        this.togglePanel("right");
      }
    });
  },

  cycleLeftPreset() {
    const panelLeft = document.getElementById("panelLeft");
    if (!panelLeft) return;

    const maxW = Math.floor(window.innerWidth * 0.7);
    let targetW = 360;

    if (this.leftWidth < 300) targetW = 360;
    else if (this.leftWidth < 450) targetW = 540;
    else if (this.leftWidth < 600) targetW = maxW;
    else targetW = 260;

    this.leftWidth = targetW;
    panelLeft.style.width = `${targetW}px`;
    panelLeft.classList.remove("collapsed");
    const resizerLeft = document.getElementById("resizerLeft");
    const toggleBtn = document.getElementById("toggleLeftPanelBtn");
    const quickBtn = document.getElementById("quickLeftToggleBtn");
    if (resizerLeft) resizerLeft.classList.remove("collapsed");
    if (toggleBtn) toggleBtn.textContent = "◀";
    if (quickBtn) quickBtn.classList.add("active");
    this.leftCollapsed = false;
  },

  setupResizer(resizerElem, panelElem, side) {
    let startX = 0;
    let startWidth = 0;
    let rAFPending = false;
    let currentX = 0;

    const onMouseDown = (e) => {
      e.preventDefault();
      startX = e.clientX;
      currentX = e.clientX;
      startWidth = panelElem.getBoundingClientRect().width;
      resizerElem.classList.add("dragging");
      document.body.classList.add("is-resizing");

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const updateWidth = () => {
      const dx = currentX - startX;
      let newWidth = side === "left" ? startWidth + dx : startWidth - dx;

      const minW = 180; // Allow dragging down to 180px
      const maxW = Math.floor(window.innerWidth * 0.8); // Allow dragging up to 80% of screen width
      newWidth = Math.max(minW, Math.min(maxW, newWidth));

      panelElem.style.width = `${newWidth}px`;

      if (side === "left") this.leftWidth = newWidth;
      else this.rightWidth = newWidth;

      rAFPending = false;
    };

    const onMouseMove = (e) => {
      currentX = e.clientX;
      if (!rAFPending) {
        rAFPending = true;
        requestAnimationFrame(updateWidth);
      }
    };

    const onMouseUp = () => {
      resizerElem.classList.remove("dragging");
      document.body.classList.remove("is-resizing");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    // Double Click to cycle preset widths
    resizerElem.addEventListener("dblclick", () => {
      if (side === "left") {
        this.cycleLeftPreset();
      } else {
        const defaultW = 400;
        panelElem.style.width = `${defaultW}px`;
        this.rightWidth = defaultW;
      }
    });

    resizerElem.addEventListener("mousedown", onMouseDown);

    // Touch Support
    resizerElem.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      currentX = touch.clientX;
      startWidth = panelElem.getBoundingClientRect().width;
      resizerElem.classList.add("dragging");
      document.body.classList.add("is-resizing");

      const onTouchMove = (te) => {
        const t = te.touches[0];
        currentX = t.clientX;
        if (!rAFPending) {
          rAFPending = true;
          requestAnimationFrame(updateWidth);
        }
      };

      const onTouchEnd = () => {
        resizerElem.classList.remove("dragging");
        document.body.classList.remove("is-resizing");
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      };

      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
    });
  },

  togglePanel(side) {
    if (side === "left") {
      const panel = document.getElementById("panelLeft");
      const resizer = document.getElementById("resizerLeft");
      const toggleBtn = document.getElementById("toggleLeftPanelBtn");
      const quickBtn = document.getElementById("quickLeftToggleBtn");
      if (!panel) return;

      this.leftCollapsed = !this.leftCollapsed;
      if (this.leftCollapsed) {
        panel.classList.add("collapsed");
        if (resizer) resizer.classList.add("collapsed");
        if (toggleBtn) toggleBtn.textContent = "▶";
        if (quickBtn) quickBtn.classList.remove("active");
      } else {
        panel.classList.remove("collapsed");
        panel.style.width = `${this.leftWidth || 340}px`;
        if (resizer) resizer.classList.remove("collapsed");
        if (toggleBtn) toggleBtn.textContent = "◀";
        if (quickBtn) quickBtn.classList.add("active");
      }
    } else if (side === "right") {
      const panel = document.getElementById("panelRight");
      const resizer = document.getElementById("resizerRight");
      const toggleBtn = document.getElementById("toggleRightPanelBtn");
      const quickBtn = document.getElementById("quickRightToggleBtn");
      if (!panel) return;

      this.rightCollapsed = !this.rightCollapsed;
      if (this.rightCollapsed) {
        panel.classList.add("collapsed");
        if (resizer) resizer.classList.add("collapsed");
        if (toggleBtn) toggleBtn.textContent = "◀";
        if (quickBtn) quickBtn.classList.remove("active");
      } else {
        panel.classList.remove("collapsed");
        panel.style.width = `${this.rightWidth || 400}px`;
        if (resizer) resizer.classList.remove("collapsed");
        if (toggleBtn) toggleBtn.textContent = "▶";
        if (quickBtn) quickBtn.classList.add("active");
      }
    }
  },

  setupVerticalSubpanelResizer(resizerElem, topElem, bottomElem) {
    let startY = 0;
    let startTopHeight = 0;
    let startBottomHeight = 0;
    let rAFPending = false;
    let currentY = 0;

    const onMouseDown = (e) => {
      e.preventDefault();
      startY = e.clientY;
      currentY = e.clientY;
      startTopHeight = topElem.getBoundingClientRect().height;
      startBottomHeight = bottomElem.getBoundingClientRect().height;
      resizerElem.classList.add("dragging");
      document.body.classList.add("is-resizing");

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const updateHeight = () => {
      const dy = currentY - startY;
      let newTopHeight = startTopHeight + dy;
      let newBottomHeight = startBottomHeight - dy;

      const minTopH = 120;
      const minBottomH = 80;

      if (newTopHeight >= minTopH && newBottomHeight >= minBottomH) {
        topElem.style.flex = "none";
        topElem.style.height = `${newTopHeight}px`;
        bottomElem.style.height = `${newBottomHeight}px`;
      }

      rAFPending = false;
    };

    const onMouseMove = (e) => {
      currentY = e.clientY;
      if (!rAFPending) {
        rAFPending = true;
        requestAnimationFrame(updateHeight);
      }
    };

    const onMouseUp = () => {
      resizerElem.classList.remove("dragging");
      document.body.classList.remove("is-resizing");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    resizerElem.addEventListener("mousedown", onMouseDown);

    // Double click to reset split
    resizerElem.addEventListener("dblclick", () => {
      topElem.style.flex = "1";
      topElem.style.height = "auto";
      bottomElem.style.height = "250px";
    });

    // Touch Support for Mobile / Tablet Dragging
    resizerElem.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      startY = touch.clientY;
      currentY = touch.clientY;
      startTopHeight = topElem.getBoundingClientRect().height;
      startBottomHeight = bottomElem.getBoundingClientRect().height;
      resizerElem.classList.add("dragging");
      document.body.classList.add("is-resizing");

      const onTouchMove = (te) => {
        const t = te.touches[0];
        currentY = t.clientY;
        if (!rAFPending) {
          rAFPending = true;
          requestAnimationFrame(updateHeight);
        }
      };

      const onTouchEnd = () => {
        resizerElem.classList.remove("dragging");
        document.body.classList.remove("is-resizing");
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
      };

      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
    });
  }
};
