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

    const panelLeft = document.getElementById("panelLeft");
    const panelRight = document.getElementById("panelRight");

    if (resizerLeft && panelLeft) {
      this.setupResizer(resizerLeft, panelLeft, "left");
    }
    if (resizerRight && panelRight) {
      this.setupResizer(resizerRight, panelRight, "right");
    }

    // Bind Collapse Toggle Buttons
    document.getElementById("toggleLeftPanelBtn")?.addEventListener("click", () => this.togglePanel("left"));
    document.getElementById("toggleRightPanelBtn")?.addEventListener("click", () => this.togglePanel("right"));
    document.getElementById("quickLeftToggleBtn")?.addEventListener("click", () => this.togglePanel("left"));
    document.getElementById("quickRightToggleBtn")?.addEventListener("click", () => this.togglePanel("right"));

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

  setupResizer(resizerElem, panelElem, side) {
    let startX = 0;
    let startWidth = 0;

    const onMouseDown = (e) => {
      e.preventDefault();
      startX = e.clientX;
      startWidth = panelElem.getBoundingClientRect().width;
      resizerElem.classList.add("dragging");

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      const dx = e.clientX - startX;
      let newWidth = side === "left" ? startWidth + dx : startWidth - dx;

      const minW = 200;
      const maxW = Math.floor(window.innerWidth * 0.7); // Allow dragging up to 70% of screen width
      newWidth = Math.max(minW, Math.min(maxW, newWidth));

      panelElem.style.width = `${newWidth}px`;

      if (side === "left") this.leftWidth = newWidth;
      else this.rightWidth = newWidth;
    };

    const onMouseUp = () => {
      resizerElem.classList.remove("dragging");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    // Double Click to reset panel width
    resizerElem.addEventListener("dblclick", () => {
      const defaultW = side === "left" ? 340 : 400;
      panelElem.style.width = `${defaultW}px`;
      if (side === "left") this.leftWidth = defaultW;
      else this.rightWidth = defaultW;
    });

    resizerElem.addEventListener("mousedown", onMouseDown);

    // Touch Support
    resizerElem.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startWidth = panelElem.getBoundingClientRect().width;
      resizerElem.classList.add("dragging");

      const onTouchMove = (te) => {
        const t = te.touches[0];
        const dx = t.clientX - startX;
        let newWidth = side === "left" ? startWidth + dx : startWidth - dx;
        const maxW = Math.floor(window.innerWidth * 0.7);
        newWidth = Math.max(200, Math.min(maxW, newWidth));
        panelElem.style.width = `${newWidth}px`;
      };

      const onTouchEnd = () => {
        resizerElem.classList.remove("dragging");
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
  }
};
