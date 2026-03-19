/* ================================================================
   assessment.js — Assessment Flow Engine (v3 + UX overhaul)
   Depends on tyg-data.js for QUESTIONS, MODULES, LIKERT_LABELS,
   BLOCK_SIZE, STORAGE_KEY, and scoring/report data.
   ================================================================ */

// ── BLOCKS PRE-COMPUTATION ──────────────────────────────────────────────────

function buildBlocks() {
  const blocks = [];
  for (let i = 0; i < QUESTIONS.length; i += BLOCK_SIZE) {
    blocks.push(QUESTIONS.slice(i, i + BLOCK_SIZE));
  }
  return blocks;
}

const BLOCKS = buildBlocks();
const TOTAL_BLOCKS = BLOCKS.length;

// ── STATE ───────────────────────────────────────────────────────────

let state = {
  currentBlockIndex: 0,
  answers: {},
  startedAt: null,
  lastSavedAt: null,
  completed: false,
  _pauseShown: false,
};

// Track navigation direction for slide animations
let _navDirection = "forward"; // "forward" or "back"

// ── DOM REFERENCES ────────────────────────────────────────────────────

const progressBar     = document.getElementById("progress-bar");
const microProgress   = document.getElementById("micro-progress");
const microFill       = document.getElementById("micro-progress-fill");
const bodyEl          = document.getElementById("assessment-body");
const footerEl        = document.getElementById("assessment-footer");
const resumeOverlay   = document.getElementById("resume-overlay");
const btnResume       = document.getElementById("btn-resume");
const btnRestart      = document.getElementById("btn-restart");
const headerLabel     = document.getElementById("assess-header-label");

// Shared reference so renderBlock can trigger the HTA popup
let _showHtaPopup = null;

// Auto-advance timer reference
let _autoAdvanceTimer = null;

// Transition lock — prevents double-navigation
let _transitioning = false;

// ── PERSISTENCE ─────────────────────────────────────────────────────

function saveProgress() {
  state.lastSavedAt = Date.now();
  try {
    const data = {
      currentBlockIndex: state.currentBlockIndex,
      answers: state.answers,
      startedAt: state.startedAt,
      lastSavedAt: state.lastSavedAt,
      completed: state.completed,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) { /* silent */ }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function clearProgress() {
  state = {
    currentBlockIndex: 0,
    answers: {},
    startedAt: Date.now(),
    lastSavedAt: null,
    completed: false,
    _pauseShown: false,
  };
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* silent */ }
}

function restoreUIState(saved) {
  state.currentBlockIndex = saved.currentBlockIndex || 0;
  state.answers = saved.answers || {};
  state.startedAt = saved.startedAt || Date.now();
  state.lastSavedAt = saved.lastSavedAt || null;
  state.completed = saved.completed || false;
  state._pauseShown = false;
}

// ── INIT ────────────────────────────────────────────────────────────

function initAssessment() {
  if (!bodyEl) return;

  // ── How-to-answer popup logic ──
  const htaOverlay = document.getElementById("hta-overlay");
  const htaCloseBtn = document.getElementById("hta-close");

  function showHtaPopup() {
    if (htaOverlay) {
      htaOverlay.classList.remove("hta-closing");
      htaOverlay.style.display = "flex";
    }
  }
  _showHtaPopup = showHtaPopup;
  function hideHtaPopup() {
    if (htaOverlay) {
      htaOverlay.classList.add("hta-closing");
      setTimeout(() => { htaOverlay.style.display = "none"; }, 250);
    }
  }

  if (htaCloseBtn) htaCloseBtn.addEventListener("click", hideHtaPopup);
  if (htaOverlay) htaOverlay.addEventListener("click", (e) => { if (e.target === htaOverlay) hideHtaPopup(); });

  // ── Save & Exit button ──
  const btnSaveExit = document.getElementById("btn-save-exit");
  if (btnSaveExit) {
    btnSaveExit.addEventListener("click", () => {
      if (Object.keys(state.answers).length > 0) saveProgress();
      window.location.href = "start.html";
    });
  }

  // ── Keyboard shortcuts (global) ──
  document.addEventListener("keydown", handleKeyboard);

  const saved = loadProgress();

  if (saved && !saved.completed && Object.keys(saved.answers || {}).length > 0) {
    // Show resume modal — returning user
    resumeOverlay.style.display = "flex";

    btnResume.addEventListener("click", () => {
      restoreUIState(saved);
      resumeOverlay.style.display = "none";
      renderRouter();
    });

    btnRestart.addEventListener("click", () => {
      clearProgress();
      resumeOverlay.style.display = "none";
      showHtaPopup();
      renderRouter();
    });
  } else {
    if (saved && saved.completed) {
      saveResultData(saved.answers);
      var dest = localStorage.getItem('tyg_unlocked') === 'true' ? 'report.html' : (localStorage.getItem('tyg_user') ? 'unlock.html' : 'signup.html');
      window.location.href = dest;
      return;
    } else {
      state.startedAt = Date.now();
      showHtaPopup();
    }
    renderRouter();
  }

  window.addEventListener("beforeunload", () => {
    if (!state.completed && Object.keys(state.answers).length > 0) {
      saveProgress();
    }
  });
}

// ── KEYBOARD SHORTCUTS ──────────────────────────────────────────────

function handleKeyboard(e) {
  // Don't capture when overlay/modal is open
  if (document.getElementById("hta-overlay")?.style.display === "flex") return;
  if (document.getElementById("resume-overlay")?.style.display === "flex") return;

  const key = e.key;

  // 1-7 keys: answer the first unanswered question (or focused question)
  if (key >= "1" && key <= "7") {
    const block = BLOCKS[state.currentBlockIndex];
    if (!block) return;

    // Find the first unanswered question in the block
    let targetQ = null;
    for (const q of block) {
      if (!state.answers[q.id]) { targetQ = q; break; }
    }
    if (!targetQ) return;

    const val = parseInt(key, 10);
    const container = document.querySelector(`.block-question-item[data-qid="${targetQ.id}"]`);
    if (!container) return;

    const btn = container.querySelector(`.likert-btn[data-value="${val}"]`);
    if (btn) btn.click();
    e.preventDefault();
  }

  // Enter key: click Next if enabled
  if (key === "Enter" && !_transitioning) {
    const nextBtn = document.getElementById("btn-block-next");
    if (nextBtn && !nextBtn.disabled) { nextBtn.click(); e.preventDefault(); }
    const pauseBtn = document.getElementById("btn-pause-continue");
    if (pauseBtn) { pauseBtn.click(); e.preventDefault(); }
  }
}

// ── RENDER ROUTER ─────────────────────────────────────────────────────

function saveAssessmentDuration() {
  if (state.startedAt) {
    try {
      var duration = Date.now() - state.startedAt;
      localStorage.setItem('tyg_assessment_duration', JSON.stringify({ ms: duration, minutes: Math.round(duration / 60000), timestamp: Date.now() }));
    } catch(e) { /* silent */ }
  }
}

function renderRouter() {
  // Clear any pending auto-advance
  if (_autoAdvanceTimer) { clearTimeout(_autoAdvanceTimer); _autoAdvanceTimer = null; }

  if (state.completed) {
    saveAssessmentDuration();
    saveResultData(state.answers);
    var dest = localStorage.getItem('tyg_unlocked') === 'true' ? 'report.html' : (localStorage.getItem('tyg_user') ? 'unlock.html' : 'signup.html');
    window.location.href = dest;
    return;
  }

  if (state.currentBlockIndex >= TOTAL_BLOCKS) {
    state.completed = true;
    saveProgress();
    saveAssessmentDuration();
    saveResultData(state.answers);
    var dest = localStorage.getItem('tyg_unlocked') === 'true' ? 'report.html' : (localStorage.getItem('tyg_user') ? 'unlock.html' : 'signup.html');
    window.location.href = dest;
    return;
  }

  const block = BLOCKS[state.currentBlockIndex];
  const currentModule = block[0].module;

  // Check if we crossed a module boundary → show pause
  if (state.currentBlockIndex > 0 && !state._pauseShown) {
    const prevBlock = BLOCKS[state.currentBlockIndex - 1];
    const prevModule = prevBlock[prevBlock.length - 1].module;
    if (prevModule !== currentModule) {
      renderPause(currentModule, prevModule);
      return;
    }
  }
  state._pauseShown = false;

  renderBlock();
}

// ── PROGRESS INDICATOR ──────────────────────────────────────────────────

function updateProgressIndicator(activeModule) {
  const currentModIdx = MODULES.findIndex(m => m.id === activeModule);

  const moduleQuestions = QUESTIONS.filter(q => q.module === activeModule);
  const moduleFirstQIndex = QUESTIONS.indexOf(moduleQuestions[0]);
  const moduleFirstBlock = Math.floor(moduleFirstQIndex / BLOCK_SIZE);
  const moduleBlocks = Math.ceil(moduleQuestions.length / BLOCK_SIZE);
  const blockWithinModule = state.currentBlockIndex - moduleFirstBlock + 1;

  let html = "";
  MODULES.forEach((mod, i) => {
    const cls = i < currentModIdx ? "done" : i === currentModIdx ? "active" : "";
    html += `<div class="progress-chapter ${cls}">
      <span class="progress-dot"></span>
      <span>${mod.title}</span>
    </div>`;
    if (i < MODULES.length - 1) {
      html += `<div class="progress-divider ${i < currentModIdx ? "done" : ""}"></div>`;
    }
  });

  progressBar.innerHTML = html;
  progressBar.style.display = "flex";
  footerEl.style.display = "block";

  // Update micro-progress fill (based on actual answers, not block position)
  if (microProgress && microFill) {
    microProgress.style.display = "block";
    const answeredInModule = moduleQuestions.filter(q => state.answers[q.id] != null).length;
    const pct = Math.round((answeredInModule / moduleQuestions.length) * 100);
    microFill.style.width = pct + "%";
  }

  // Update slim header label
  if (headerLabel) {
    const overall = Math.round((Object.keys(state.answers).length / QUESTIONS.length) * 100);
    headerLabel.innerHTML = `<span>${overall}%</span> complete`;
  }
}

// ── ANIMATED TRANSITION HELPER ──────────────────────────────────────

function animateTransition(callback) {
  if (_transitioning) return; // block overlapping transitions
  _transitioning = true;

  const card = document.getElementById("qcard");
  if (!card) { _transitioning = false; callback(); return; }

  // Remove any lingering slide-in classes so they don't interfere
  card.classList.remove("slide-in-right", "slide-in-left");

  const outClass = _navDirection === "forward" ? "slide-out-left" : "slide-out-right";
  const outAnim = _navDirection === "forward" ? "slideOutLeft" : "slideOutRight";

  // Force a reflow so the browser registers the class removal before adding new one
  void card.offsetWidth;
  card.classList.add(outClass);

  let done = false;
  function finish() {
    if (done) return;
    done = true;
    _transitioning = false;
    callback();
  }

  card.addEventListener("animationend", function handler(e) {
    if (e.animationName !== outAnim) return;
    card.removeEventListener("animationend", handler);
    finish();
  });

  // Safety fallback — if animationend never fires (hidden element, etc.)
  setTimeout(finish, 400);
}

// ── RENDER BLOCK (4 questions) ──────────────────────────────────────────

function renderBlock() {
  const block = BLOCKS[state.currentBlockIndex];
  if (!block || block.length === 0) return;

  const activeModule = block[0].module;
  updateProgressIndicator(activeModule);

  const modQuestions = QUESTIONS.filter(q => q.module === activeModule);
  const modStart = QUESTIONS.indexOf(modQuestions[0]);
  const blockStartInModule = (state.currentBlockIndex * BLOCK_SIZE) - modStart;
  const rangeStart = blockStartInModule + 1;
  const rangeEnd = Math.min(blockStartInModule + block.length, modQuestions.length);

  let questionsHtml = "";
  block.forEach((q, idx) => {
    const globalNum = blockStartInModule + idx + 1;
    const selectedVal = state.answers[q.id] || null;

    let likertBtns = "";
    for (let v = 1; v <= 7; v++) {
      const sel = selectedVal === v ? "selected" : "";
      likertBtns += `<button class="likert-btn ${sel}" data-qid="${q.id}" data-value="${v}" aria-label="${LIKERT_LABELS[v-1]}">${v}</button>`;
    }

    const answeredCls = selectedVal ? "answered" : "";

    questionsHtml += `
      <div class="block-question-item ${answeredCls}" data-qid="${q.id}">
        <div class="question-number">${globalNum} / ${modQuestions.length}</div>
        <p class="question-text">${q.text}</p>
        <div class="likert-row">
          <span class="likert-edge-label">Disagree</span>
          <div class="likert-scale" role="group" aria-label="Rating for question ${q.id}">
            ${likertBtns}
          </div>
          <span class="likert-edge-label">Agree</span>
        </div>
      </div>`;
  });

  const inClass = _navDirection === "forward" ? "slide-in-right" : "slide-in-left";

  const html = `
    <div class="question-block ${inClass}" id="qcard">
      <div class="question-block-header">
        <div class="question-module-tag">Module ${activeModule} — ${block[0].chapterTitle}</div>
        <div class="question-block-counter">Questions ${rangeStart}–${rangeEnd} of ${modQuestions.length}</div>
      </div>
      <button class="hta-reopen" id="hta-reopen" style="display:flex;" aria-label="How to answer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        How to answer
      </button>
      ${questionsHtml}
      <div class="assessment-nav" style="margin-top:var(--space-5);">
        ${state.currentBlockIndex > 0 ? '<button class="btn-back" id="btn-block-back">Back</button>' : ''}
        <button class="btn-continue" id="btn-block-next" ${!isBlockComplete(block) ? 'disabled' : ''}>Next</button>
      </div>
    </div>`;

  bodyEl.innerHTML = html;
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Bind likert buttons
  bodyEl.querySelectorAll(".likert-btn").forEach(btn => {
    btn.addEventListener("click", () => handleAnswerSelection(btn));
  });

  // Next (with slide animation)
  document.getElementById("btn-block-next").addEventListener("click", () => {
    if (_transitioning) return;
    if (!isBlockComplete(block)) return;
    if (_autoAdvanceTimer) { clearTimeout(_autoAdvanceTimer); _autoAdvanceTimer = null; }
    _navDirection = "forward";
    animateTransition(() => {
      state.currentBlockIndex++;
      saveProgress();
      renderRouter();
    });
  });

  // Back (with slide animation)
  const backBtn = document.getElementById("btn-block-back");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (_transitioning) return;
      if (_autoAdvanceTimer) { clearTimeout(_autoAdvanceTimer); _autoAdvanceTimer = null; }
      _navDirection = "back";
      animateTransition(() => {
        state.currentBlockIndex--;
        state._pauseShown = false;
        saveProgress();
        renderRouter();
      });
    });
  }

  // Bind inline HTA reopen button
  const htaBtn = document.getElementById("hta-reopen");
  if (htaBtn && _showHtaPopup) htaBtn.addEventListener("click", _showHtaPopup);
}

// ── ANSWER SELECTION ────────────────────────────────────────────────────

function handleAnswerSelection(btn) {
  const qid = btn.dataset.qid;
  const val = parseInt(btn.dataset.value, 10);

  // Track whether this question was previously unanswered
  const wasFirstAnswer = state.answers[qid] == null;

  state.answers[qid] = val;
  saveProgress();

  // Update UI for this question's buttons
  const container = btn.closest(".block-question-item");
  container.querySelectorAll(".likert-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  container.classList.add("answered");

  // Update micro-progress in real-time
  const block = BLOCKS[state.currentBlockIndex];
  if (block) {
    const activeModule = block[0].module;
    const moduleQuestions = QUESTIONS.filter(q => q.module === activeModule);
    const answeredInModule = moduleQuestions.filter(q => state.answers[q.id] != null).length;
    if (microFill) {
      microFill.style.width = Math.round((answeredInModule / moduleQuestions.length) * 100) + "%";
    }
    if (headerLabel) {
      const overall = Math.round((Object.keys(state.answers).length / QUESTIONS.length) * 100);
      headerLabel.innerHTML = `<span>${overall}%</span> complete`;
    }
  }

  // Check if entire block is complete → enable Next + auto-advance
  const nextBtn = document.getElementById("btn-block-next");
  if (nextBtn && block) {
    const complete = isBlockComplete(block);
    nextBtn.disabled = !complete;

    // Auto-advance only when block FIRST becomes complete (wasFirstAnswer ensures
    // this was a new answer, not a re-answer on an already-complete block)
    if (complete && wasFirstAnswer && !_transitioning) {
      if (_autoAdvanceTimer) clearTimeout(_autoAdvanceTimer);
      nextBtn.classList.add("auto-flash");
      _autoAdvanceTimer = setTimeout(() => {
        _autoAdvanceTimer = null;
        if (_transitioning) return;
        _navDirection = "forward";
        animateTransition(() => {
          state.currentBlockIndex++;
          saveProgress();
          renderRouter();
        });
      }, 800);
    }
  }
}

function isBlockComplete(block) {
  return block.every(q => state.answers[q.id] != null);
}

// ── PAUSE SCREEN (with motivational micro-copy) ─────────────────────

function renderPause(nextModule, prevModule) {
  const mod = MODULES.find(m => m.id === nextModule);
  const prevMod = MODULES.find(m => m.id === prevModule);
  updateProgressIndicator(nextModule);

  // Compute completed modules count
  const completedIdx = MODULES.findIndex(m => m.id === nextModule);
  const totalModules = MODULES.length;
  const pctDone = Math.round((completedIdx / totalModules) * 100);

  // Motivational messages
  const messages = [
    "You're finding your rhythm.",
    "Great self-awareness so far.",
    "Each answer reveals something real.",
    "You're doing great — keep going.",
  ];
  const msg = messages[Math.min(completedIdx - 1, messages.length - 1)] || messages[0];

  const inClass = _navDirection === "forward" ? "slide-in-right" : "slide-in-left";

  const html = `
    <div class="pause-screen ${inClass}" id="qcard">
      <div class="pause-celebration">✦</div>
      <h2>${prevMod ? prevMod.title : "Section"} Complete</h2>
      <div class="pause-stat">${pctDone}% done</div>
      <p>${msg}<br>Up next: <strong>${mod.title}</strong></p>
      <div class="assessment-nav">
        <button class="btn-continue" id="btn-pause-continue">Continue</button>
      </div>
    </div>`;

  bodyEl.innerHTML = html;
  window.scrollTo({ top: 0, behavior: "smooth" });

  document.getElementById("btn-pause-continue").addEventListener("click", () => {
    _navDirection = "forward";
    animateTransition(() => {
      state._pauseShown = true;
      renderRouter();
    });
  });
}

// ── BOOT ────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", initAssessment);
