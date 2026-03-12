/* ================================================================
   assessment.js — Assessment Flow Engine (v3)
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
  _pauseShown: false, // transient, not persisted
};

// ── DOM REFERENCES ────────────────────────────────────────────────────

const progressBar     = document.getElementById("progress-bar");
const bodyEl          = document.getElementById("assessment-body");
const footerEl        = document.getElementById("assessment-footer");
const resumeOverlay   = document.getElementById("resume-overlay");
const btnResume       = document.getElementById("btn-resume");
const btnRestart      = document.getElementById("btn-restart");

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
  if (!bodyEl) return; // not on assessment page

  const saved = loadProgress();

  if (saved && !saved.completed && Object.keys(saved.answers || {}).length > 0) {
    // Show resume modal
    resumeOverlay.style.display = "flex";

    btnResume.addEventListener("click", () => {
      restoreUIState(saved);
      resumeOverlay.style.display = "none";
      renderRouter();
    });

    btnRestart.addEventListener("click", () => {
      clearProgress();
      resumeOverlay.style.display = "none";
      renderRouter();
    });
  } else {
    // Completed or no saved data
    if (saved && saved.completed) {
      // Already completed — redirect to result page
      saveResultData(saved.answers);
      window.location.href = "result.html";
      return;
    } else {
      state.startedAt = Date.now();
    }
    renderRouter();
  }

  // Save on page leave
  window.addEventListener("beforeunload", () => {
    if (!state.completed && Object.keys(state.answers).length > 0) {
      saveProgress();
    }
  });
}

// ── RENDER ROUTER ─────────────────────────────────────────────────────

function renderRouter() {
  if (state.completed) {
    saveResultData(state.answers);
    window.location.href = "result.html";
    return;
  }

  if (state.currentBlockIndex >= TOTAL_BLOCKS) {
    state.completed = true;
    saveProgress();
    saveResultData(state.answers);
    window.location.href = "result.html";
    return;
  }

  const block = BLOCKS[state.currentBlockIndex];
  const currentModule = block[0].module;

  // Check if we crossed a module boundary → show pause
  if (state.currentBlockIndex > 0 && !state._pauseShown) {
    const prevBlock = BLOCKS[state.currentBlockIndex - 1];
    const prevModule = prevBlock[prevBlock.length - 1].module;
    if (prevModule !== currentModule) {
      renderPause(currentModule);
      return;
    }
  }
  state._pauseShown = false;

  renderBlock();
}

// ── PROGRESS INDICATOR ──────────────────────────────────────────────────

function updateProgressIndicator(activeModule) {
  const currentModIdx = MODULES.findIndex(m => m.id === activeModule);

  // Compute per-module block progress
  const moduleQuestions = QUESTIONS.filter(q => q.module === activeModule);
  const moduleBlocks = Math.ceil(moduleQuestions.length / BLOCK_SIZE);
  const moduleFirstQIndex = QUESTIONS.indexOf(moduleQuestions[0]);
  const moduleFirstBlock = Math.floor(moduleFirstQIndex / BLOCK_SIZE);
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
}

// ── RENDER BLOCK (4 questions) ──────────────────────────────────────────

function renderBlock() {
  const block = BLOCKS[state.currentBlockIndex];
  if (!block || block.length === 0) return;

  const activeModule = block[0].module;
  updateProgressIndicator(activeModule);

  // Compute count text
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

  const html = `
    <div class="question-block fade-enter" id="qcard">
      <div class="question-block-header">
        <div class="question-module-tag">Module ${activeModule} — ${block[0].chapterTitle}</div>
        <div class="question-block-counter">Questions ${rangeStart}–${rangeEnd} of ${modQuestions.length}</div>
      </div>
      ${questionsHtml}
      <div class="assessment-nav" style="margin-top:var(--space-5);">
        ${state.currentBlockIndex > 0 ? '<button class="btn-back" id="btn-block-back">Back</button>' : ''}
        <button class="btn-continue" id="btn-block-next" ${!isBlockComplete(block) ? 'disabled' : ''}>Next</button>
      </div>
    </div>`;

  bodyEl.innerHTML = html;
  bodyEl.scrollTop = 0;

  // Fade in
  requestAnimationFrame(() => {
    const card = document.getElementById("qcard");
    if (card) { card.classList.remove("fade-enter"); card.classList.add("fade-active"); }
  });

  // Bind likert buttons
  bodyEl.querySelectorAll(".likert-btn").forEach(btn => {
    btn.addEventListener("click", () => handleAnswerSelection(btn));
  });

  // Next
  document.getElementById("btn-block-next").addEventListener("click", () => {
    if (!isBlockComplete(block)) return;
    state.currentBlockIndex++;
    saveProgress();
    renderRouter();
  });

  // Back
  const backBtn = document.getElementById("btn-block-back");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      state.currentBlockIndex--;
      state._pauseShown = false;
      saveProgress();
      renderRouter();
    });
  }
}

// ── ANSWER SELECTION ────────────────────────────────────────────────────

function handleAnswerSelection(btn) {
  const qid = btn.dataset.qid;
  const val = parseInt(btn.dataset.value, 10);

  state.answers[qid] = val;
  saveProgress();

  // Update UI for this question's buttons
  const container = btn.closest(".block-question-item");
  container.querySelectorAll(".likert-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  container.classList.add("answered");

  // Check if entire block is complete → enable Next
  const block = BLOCKS[state.currentBlockIndex];
  const nextBtn = document.getElementById("btn-block-next");
  if (nextBtn) {
    nextBtn.disabled = !isBlockComplete(block);
  }
}

function isBlockComplete(block) {
  return block.every(q => state.answers[q.id] != null);
}

// ── PAUSE SCREEN ──────────────────────────────────────────────────────

function renderPause(nextModule) {
  const mod = MODULES.find(m => m.id === nextModule);
  updateProgressIndicator(nextModule);

  const html = `
    <div class="pause-screen fade-enter" id="qcard">
      <div class="pause-icon">✦</div>
      <h2>Take a Breath</h2>
      <p>You've completed the previous section.<br>Continue to <strong>${mod.title}</strong> when you're ready.</p>
      <div class="assessment-nav">
        <button class="btn-continue" id="btn-pause-continue">Continue</button>
      </div>
    </div>`;

  bodyEl.innerHTML = html;
  bodyEl.scrollTop = 0;

  requestAnimationFrame(() => {
    const card = document.getElementById("qcard");
    if (card) { card.classList.remove("fade-enter"); card.classList.add("fade-active"); }
  });

  document.getElementById("btn-pause-continue").addEventListener("click", () => {
    state._pauseShown = true;
    renderRouter();
  });
}

// ── BOOT ────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", initAssessment);
