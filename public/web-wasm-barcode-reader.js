const v = "barcode-scanner-overlay-styles", y = "rgba(0, 0, 0, 0.55)", x = "#00ff88";
const f = "#00ff88";
function E() {
  if (document.getElementById(v)) return;
  const A = document.createElement("style");
  A.id = v, A.textContent = `
    @keyframes scan-sweep {
      0%, 100% { top: 0; }
      50% { top: calc(100% - 2px); }
    }

    .scan-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 10;
    }

    .scan-overlay__mask {
      position: absolute;
      background: ${y};
    }

    .scan-overlay__region {
      position: absolute;
      /* Dimensions set via CSS custom properties from JS */
      width: var(--scan-w);
      height: var(--scan-h);
      left: var(--scan-x);
      top: var(--scan-y);
    }

    .scan-overlay__bracket {
      position: absolute;
      width: 24px;
      height: 24px;
      border-color: ${x};
      border-style: solid;
      border-width: 0;
    }

    /* Four corners: each gets two border sides to form an L-shape */
    .scan-overlay__bracket--tl {
      top: -1px; left: -1px;
      border-top-width: 3px;
      border-left-width: 3px;
      border-top-left-radius: 4px;
    }
    .scan-overlay__bracket--tr {
      top: -1px; right: -1px;
      border-top-width: 3px;
      border-right-width: 3px;
      border-top-right-radius: 4px;
    }
    .scan-overlay__bracket--bl {
      bottom: -1px; left: -1px;
      border-bottom-width: 3px;
      border-left-width: 3px;
      border-bottom-left-radius: 4px;
    }
    .scan-overlay__bracket--br {
      bottom: -1px; right: -1px;
      border-bottom-width: 3px;
      border-right-width: 3px;
      border-bottom-right-radius: 4px;
    }

    .scan-overlay__line {
      position: absolute;
      left: 10%;
      width: 80%;
      height: 2px;
      background: ${f};
      box-shadow: 0 0 8px ${f}, 0 0 24px ${f};
      animation: scan-sweep 2.5s ease-in-out infinite;
      border-radius: 1px;
    }
  `, document.head.appendChild(A);
}
function I(A, t, e, s, i) {
  const o = [
    // Top bar: full width, from top to scan region top
    { top: "0", left: "0", width: "100%", height: e },
    // Bottom bar: full width, from scan region bottom to container bottom
    { top: `calc(${e} + ${i})`, left: "0", width: "100%", height: `calc(100% - ${e} - ${i})` },
    // Left strip: between top and bottom bars
    { top: e, left: "0", width: t, height: i },
    // Right strip: between top and bottom bars
    { top: e, left: `calc(${t} + ${s})`, width: `calc(100% - ${t} - ${s})`, height: i }
  ];
  for (const c of o) {
    const r = document.createElement("div");
    r.className = "scan-overlay__mask", Object.assign(r.style, c), A.appendChild(r);
  }
}
function S(A, t) {
  E();
  const e = document.createElement("div");
  e.className = "scan-overlay";
  const s = `${(t.widthRatio * 100).toFixed(2)}%`, i = `${(t.heightRatio * 100).toFixed(2)}%`, o = `${((1 - t.widthRatio) / 2 * 100).toFixed(2)}%`, c = `${((1 - t.heightRatio) / 2 * 100).toFixed(2)}%`;
  e.style.setProperty("--scan-w", s), e.style.setProperty("--scan-h", i), e.style.setProperty("--scan-x", o), e.style.setProperty("--scan-y", c), I(e, o, c, s, i);
  const r = document.createElement("div");
  r.className = "scan-overlay__region";
  const l = ["tl", "tr", "bl", "br"];
  for (const a of l) {
    const h = document.createElement("div");
    h.className = `scan-overlay__bracket scan-overlay__bracket--${a}`, r.appendChild(h);
  }
  const n = document.createElement("div");
  return n.className = "scan-overlay__line", r.appendChild(n), e.appendChild(r), A.appendChild(e), e;
}
function R(A) {
  A.remove();
}
const k = "data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=", u = [0, Math.PI / 6, -Math.PI / 6];
class Q {
  constructor(t) {
    var e, s;
    this._isRunning = !1, this.video = null, this.polyCanvas = null, this.polyCtx = null, this.offscreen = null, this.offCtx = null, this.overlayRoot = null, this.stream = null, this.timerId = null, this.wasmApi = null, this.beepAudio = null, this.previewCanvas = null, this.previewCtx = null, this.cameraWidth = 0, this.cameraHeight = 0, this.barcodeWidth = 0, this.barcodeHeight = 0, this.barcodeOffsetX = 0, this.barcodeOffsetY = 0, this.detectedThisTick = !1, this.container = t.container, this.onDetect = t.onDetect, this.onError = t.onError ?? ((i) => console.error("[BarcodeScanner]", i)), this.scanInterval = t.scanInterval ?? 150, this.beepOnDetect = t.beepOnDetect ?? !0, this.facingMode = t.facingMode ?? "environment", this.regionWidth = ((e = t.scanRegion) == null ? void 0 : e.width) ?? 0.702, this.regionHeight = ((s = t.scanRegion) == null ? void 0 : s.height) ?? 0.242, this.previewCanvas = t.previewCanvas ?? null;
  }
  get isRunning() {
    return this._isRunning;
  }
  // ── Public lifecycle ────────────────────────────────────────────
  async start() {
    if (!this._isRunning)
      try {
        this.setupDOM(), await this.loadWasm(), await this.startCamera(), this.setupResultHandler(), this.startScanLoop(), this._isRunning = !0;
      } catch (t) {
        this.stop();
        const e = t instanceof Error ? t : new Error(String(t));
        this.onError(e);
      }
  }
  stop() {
    this.stopScanLoop(), this.stopCamera(), this.teardownDOM(), this._isRunning = !1;
  }
  /**
   * Toggle the device torch (flashlight). Returns the new torch state.
   * Only works on devices that support the torch constraint (most Android phones).
   */
  async toggleTorch() {
    var o;
    const t = (o = this.stream) == null ? void 0 : o.getVideoTracks()[0];
    if (!t || !t.getCapabilities().torch) return !1;
    const i = !t.getSettings().torch;
    return await t.applyConstraints({
      advanced: [{ torch: i }]
    }), i;
  }
  // ── DOM setup / teardown ────────────────────────────────────────
  setupDOM() {
    getComputedStyle(this.container).position === "static" && (this.container.style.position = "relative"), this.cameraWidth = this.container.clientWidth, this.cameraHeight = this.container.clientHeight, this.barcodeWidth = Math.floor(this.cameraWidth * this.regionWidth), this.barcodeHeight = Math.floor(this.cameraHeight * this.regionHeight), this.barcodeOffsetX = Math.floor((this.cameraWidth - this.barcodeWidth) / 2), this.barcodeOffsetY = Math.floor((this.cameraHeight - this.barcodeHeight) / 2), this.video = document.createElement("video"), Object.assign(this.video.style, {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }), this.video.setAttribute("autoplay", ""), this.video.setAttribute("muted", ""), this.video.setAttribute("playsinline", ""), this.video.muted = !0, this.container.appendChild(this.video), this.polyCanvas = document.createElement("canvas"), this.polyCanvas.width = this.cameraWidth, this.polyCanvas.height = this.cameraHeight, Object.assign(this.polyCanvas.style, {
      position: "absolute",
      left: "0",
      top: "0",
      pointerEvents: "none"
    }), this.container.appendChild(this.polyCanvas), this.polyCtx = this.polyCanvas.getContext("2d"), this.offscreen = new OffscreenCanvas(this.barcodeWidth * 2, this.barcodeHeight * 2), this.offCtx = this.offscreen.getContext("2d", { willReadFrequently: !0 }), this.overlayRoot = S(this.container, {
      widthRatio: this.regionWidth,
      heightRatio: this.regionHeight
    }), this.beepOnDetect && (this.beepAudio = new Audio(k)), this.previewCanvas && (this.previewCanvas.width = this.barcodeWidth * 2, this.previewCanvas.height = this.barcodeHeight * 2 * u.length, this.previewCtx = this.previewCanvas.getContext("2d"));
  }
  teardownDOM() {
    var t, e;
    this.overlayRoot && (R(this.overlayRoot), this.overlayRoot = null), (t = this.video) == null || t.remove(), this.video = null, (e = this.polyCanvas) == null || e.remove(), this.polyCanvas = null, this.polyCtx = null, this.offscreen = null, this.offCtx = null, this.beepAudio = null, this.previewCtx = null;
  }
  // ── WASM loading ────────────────────────────────────────────────
  /**
   * Wait for the Emscripten Module to finish initializing.
   * The script is loaded via a classic <script> tag in index.html,
   * so by the time start() runs it may already be ready.
   */
  loadWasm() {
    return new Promise((t, e) => {
      if (typeof Module > "u") {
        e(new Error(
          "WASM Module not loaded. Load the Emscripten glue script (a.out.js) before calling start()."
        ));
        return;
      }
      const s = setTimeout(() => e(new Error("WASM load timeout")), 15e3), i = () => {
        clearTimeout(s);
        try {
          const o = Module.cwrap;
          if (!o) throw new Error("Module.cwrap not available after runtime init");
          this.wasmApi = {
            scan_image: o("scan_image", "", ["number", "number", "number"]),
            create_buffer: o("create_buffer", "number", ["number", "number"]),
            destroy_buffer: o("destroy_buffer", "", ["number"])
          }, t();
        } catch (o) {
          e(o);
        }
      };
      if (Module.cwrap)
        i();
      else {
        const o = Module.onRuntimeInitialized;
        Module.onRuntimeInitialized = () => {
          o == null || o(), i();
        };
      }
    });
  }
  // ── Camera ──────────────────────────────────────────────────────
  async startCamera() {
    if (!this.video) throw new Error("DOM not set up");
    const t = this.cameraWidth * 2, e = {
      video: {
        width: t,
        height: t,
        facingMode: this.facingMode,
        resizeMode: "crop-and-scale",
        aspectRatio: { exact: 1 }
      }
    };
    this.stream = await navigator.mediaDevices.getUserMedia(e), this.video.srcObject = this.stream, await this.video.play();
  }
  stopCamera() {
    if (this.stream) {
      for (const t of this.stream.getTracks())
        t.stop();
      this.stream = null;
    }
    this.video && (this.video.srcObject = null);
  }
  // ── Result handler ──────────────────────────────────────────────
  /**
   * Wire up Module.processResult so the WASM-side library.js callback
   * routes detected barcodes back into our class.
   */
  setupResultHandler() {
    const t = (e, s, i) => {
      var n, a;
      if (!s) return;
      this.detectedThisTick = !0;
      const o = this.barcodeWidth / (((n = this.offscreen) == null ? void 0 : n.width) ?? this.barcodeWidth), c = this.barcodeHeight / (((a = this.offscreen) == null ? void 0 : a.height) ?? this.barcodeHeight), r = [];
      for (let h = 0; h < i.length; h += 2)
        r.push(i[h] * o + this.barcodeOffsetX), r.push(i[h + 1] * c + this.barcodeOffsetY);
      this.drawPoly(r), this.beepOnDetect && this.beepAudio && this.beepAudio.play().catch(() => {
      });
      const l = { symbol: e, data: s, polygon: r };
      this.onDetect(l);
    };
    Module.processResult = t;
  }
  // ── Scan loop ───────────────────────────────────────────────────
  startScanLoop() {
    this.timerId = setInterval(() => this.scanTick(), this.scanInterval);
  }
  stopScanLoop() {
    this.timerId !== null && (clearInterval(this.timerId), this.timerId = null);
  }
  /**
   * One scan tick: capture the barcode region, convert to grayscale,
   * and run through WASM. Uses rotation-based skew correction —
   * tries 0° first, then ±30° only if no barcode was found.
   */
  scanTick() {
    if (!this.video || !this.offCtx || !this.offscreen || !this.wasmApi || !this.polyCtx) return;
    const t = this.video.videoWidth, e = this.video.videoHeight;
    if (t === 0 || e === 0) return;
    const s = t / this.cameraWidth, i = e / this.cameraHeight, o = this.barcodeOffsetX * s, c = this.barcodeOffsetY * i, r = this.barcodeWidth * s, l = this.barcodeHeight * i;
    this.polyCtx.clearRect(0, 0, this.cameraWidth, this.cameraHeight);
    const n = this.offscreen.width, a = this.offscreen.height;
    this.previewCtx && this.previewCtx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
    for (let h = 0; h < u.length; h++) {
      const p = u[h];
      if (this.detectedThisTick = !1, this.offCtx.save(), p !== 0 && (this.offCtx.translate(n / 2, a / 2), this.offCtx.rotate(p), this.offCtx.translate(-n / 2, -a / 2)), this.offCtx.drawImage(
        this.video,
        o,
        c,
        r,
        l,
        0,
        0,
        n,
        a
      ), this.offCtx.restore(), this.previewCtx) {
        const d = h * a;
        this.previewCtx.drawImage(this.offscreen, 0, 0, n, a, 0, d, n, a);
      }
      const C = this.offCtx.getImageData(0, 0, n, a), b = this.toGrayscale(C.data), m = this.wasmApi.create_buffer(n, a);
      if (Module.HEAP8.set(b, m), this.wasmApi.scan_image(m, n, a), this.previewCtx) {
        const d = h * a, g = Math.round(p * 180 / Math.PI), w = `${g >= 0 ? "+" : ""}${g}°`;
        this.detectedThisTick && (this.previewCtx.strokeStyle = "#00ff88", this.previewCtx.lineWidth = 3, this.previewCtx.strokeRect(1, d + 1, n - 2, a - 2)), this.previewCtx.font = "bold 16px monospace", this.previewCtx.fillStyle = this.detectedThisTick ? "#00ff88" : "rgba(255,255,255,0.7)", this.previewCtx.fillText(w, 8, d + 22);
      }
      if (this.detectedThisTick) break;
    }
  }
  /**
   * Convert RGBA pixel data to grayscale using the BT.601 luma formula.
   * Uses integer arithmetic for speed (same formula as the original index.js).
   */
  toGrayscale(t) {
    const e = new Uint8Array(t.length / 4);
    for (let s = 0, i = 0; s < t.length; s += 4, i++)
      e[i] = t[s] * 66 + t[s + 1] * 129 + t[s + 2] * 25 + 4096 >> 8;
    return e;
  }
  // ── Drawing ─────────────────────────────────────────────────────
  /** Draw a polygon outline on the overlay canvas. */
  drawPoly(t) {
    if (!(!this.polyCtx || t.length < 4)) {
      this.polyCtx.beginPath(), this.polyCtx.moveTo(t[0], t[1]);
      for (let e = 2; e < t.length; e += 2)
        this.polyCtx.lineTo(t[e], t[e + 1]);
      this.polyCtx.closePath(), this.polyCtx.lineWidth = 2, this.polyCtx.strokeStyle = "#FF0000", this.polyCtx.stroke();
    }
  }
}
export {
  Q as BarcodeScanner,
  S as createOverlay,
  R as removeOverlay
};
