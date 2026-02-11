/* ================================================================
   assessment.js — Questions Data + Full Assessment Engine (v2)
   4 questions per screen, robust auto-save, clean architecture
   ================================================================ */

// ── QUESTIONS DATA ──────────────────────────────────────────────

const QUESTIONS = [
  // ═══════ MODULE A — Core Style (24) ═══════
  { id:"A1",  module:"A", chapterTitle:"Core Style",      text:"I feel best when my life has simple routines I can rely on.",                         reverse:false, map:{ primary:"Grounded" } },
  { id:"A2",  module:"A", chapterTitle:"Core Style",      text:"I notice subtle changes in people's mood quickly.",                                  reverse:false, map:{ primary:"Sensitive" } },
  { id:"A3",  module:"A", chapterTitle:"Core Style",      text:"I naturally set goals and push myself to reach them.",                               reverse:false, map:{ primary:"Driven" } },
  { id:"A4",  module:"A", chapterTitle:"Core Style",      text:"I love exploring ideas just to understand how they work.",                           reverse:false, map:{ primary:"Curious" } },
  { id:"A5",  module:"A", chapterTitle:"Core Style",      text:"I express myself best through creativity (words, visuals, music, style).",           reverse:false, map:{ primary:"Expressive" } },
  { id:"A6",  module:"A", chapterTitle:"Core Style",      text:"I prefer solving problems alone rather than asking for help.",                       reverse:false, map:{ primary:"Independent" } },
  { id:"A7",  module:"A", chapterTitle:"Core Style",      text:"I often act without thinking through consequences.",                                reverse:true,  map:{ primary:"ImpulsivityNoise" } },
  { id:"A8",  module:"A", chapterTitle:"Core Style",      text:"I can stay calm when others panic.",                                                reverse:false, map:{ primary:"Grounded", secondary:"Sensitive" } },
  { id:"A9",  module:"A", chapterTitle:"Core Style",      text:"I'm deeply affected by criticism or rejection.",                                    reverse:false, map:{ primary:"Sensitive" } },
  { id:"A10", module:"A", chapterTitle:"Core Style",      text:"Competition brings out my best.",                                                   reverse:false, map:{ primary:"Driven" } },
  { id:"A11", module:"A", chapterTitle:"Core Style",      text:"I enjoy connecting unrelated concepts into a bigger system.",                        reverse:false, map:{ primary:"Curious", secondary:"Driven" } },
  { id:"A12", module:"A", chapterTitle:"Core Style",      text:"I naturally influence a room with my energy.",                                      reverse:false, map:{ primary:"Expressive" } },
  { id:"A13", module:"A", chapterTitle:"Core Style",      text:"I value stability more than excitement.",                                           reverse:false, map:{ primary:"Grounded" } },
  { id:"A14", module:"A", chapterTitle:"Core Style",      text:"When someone is suffering, I feel it in my body.",                                  reverse:false, map:{ primary:"Sensitive", secondary:"Expressive" } },
  { id:"A15", module:"A", chapterTitle:"Core Style",      text:"I feel uncomfortable when I'm not improving or progressing.",                       reverse:false, map:{ primary:"Driven" } },
  { id:"A16", module:"A", chapterTitle:"Core Style",      text:"I question beliefs most people accept without thinking.",                           reverse:false, map:{ primary:"Curious", secondary:"Independent" } },
  { id:"A17", module:"A", chapterTitle:"Core Style",      text:"Storytelling is one of my strongest ways of communicating.",                        reverse:false, map:{ primary:"Expressive" } },
  { id:"A18", module:"A", chapterTitle:"Core Style",      text:"Freedom is more important to me than belonging.",                                   reverse:false, map:{ primary:"Independent" } },
  { id:"A19", module:"A", chapterTitle:"Core Style",      text:"I'm the person people can count on in a crisis.",                                  reverse:false, map:{ primary:"Grounded" } },
  { id:"A20", module:"A", chapterTitle:"Core Style",      text:"I often put others' needs before my own.",                                         reverse:false, map:{ primary:"Sensitive" } },
  { id:"A21", module:"A", chapterTitle:"Core Style",      text:"I hold myself to high standards.",                                                 reverse:false, map:{ primary:"Driven", secondary:"Grounded" } },
  { id:"A22", module:"A", chapterTitle:"Core Style",      text:"I often notice patterns before others do.",                                        reverse:false, map:{ primary:"Curious" } },
  { id:"A23", module:"A", chapterTitle:"Core Style",      text:"I recharge by being around people and sharing energy.",                             reverse:false, map:{ primary:"Expressive", secondary:"Sensitive" } },
  { id:"A24", module:"A", chapterTitle:"Core Style",      text:"I protect my boundaries even if people don't like it.",                             reverse:false, map:{ primary:"Independent" } },

  // ═══════ MODULE B — Needs Map (12) ═══════
  { id:"B1",  module:"B", chapterTitle:"Needs Map",       text:"I feel I have real choice in how I live my life.",                                  reverse:false, map:{ dimension:"Autonomy",    polarity:"+" } },
  { id:"B2",  module:"B", chapterTitle:"Needs Map",       text:"I often feel controlled by expectations or pressure.",                              reverse:false, map:{ dimension:"Autonomy",    polarity:"-" } },
  { id:"B3",  module:"B", chapterTitle:"Needs Map",       text:"I feel capable of handling most challenges that matter to me.",                     reverse:false, map:{ dimension:"Competence",  polarity:"+" } },
  { id:"B4",  module:"B", chapterTitle:"Needs Map",       text:"I often feel stuck or not good enough, even when I try.",                           reverse:false, map:{ dimension:"Competence",  polarity:"-" } },
  { id:"B5",  module:"B", chapterTitle:"Needs Map",       text:"I feel emotionally connected to at least a few people.",                            reverse:false, map:{ dimension:"Relatedness", polarity:"+" } },
  { id:"B6",  module:"B", chapterTitle:"Needs Map",       text:"I often feel alone, even when people are around.",                                  reverse:false, map:{ dimension:"Relatedness", polarity:"-" } },
  { id:"B7",  module:"B", chapterTitle:"Needs Map",       text:'I can say "no" without feeling guilty.',                                           reverse:false, map:{ dimension:"Autonomy",    polarity:"+" } },
  { id:"B8",  module:"B", chapterTitle:"Needs Map",       text:"I frequently do things mainly to avoid disappointing others.",                      reverse:false, map:{ dimension:"Autonomy",    polarity:"-" } },
  { id:"B9",  module:"B", chapterTitle:"Needs Map",       text:"I feel proud of what I can do (skills, work, learning).",                           reverse:false, map:{ dimension:"Competence",  polarity:"+" } },
  { id:"B10", module:"B", chapterTitle:"Needs Map",       text:"I avoid challenges because I fear failing.",                                       reverse:false, map:{ dimension:"Competence",  polarity:"-" } },
  { id:"B11", module:"B", chapterTitle:"Needs Map",       text:"I feel seen and understood by people close to me.",                                 reverse:false, map:{ dimension:"Relatedness", polarity:"+" } },
  { id:"B12", module:"B", chapterTitle:"Needs Map",       text:"I hide parts of myself to stay accepted.",                                         reverse:false, map:{ dimension:"Relatedness", polarity:"-" } },

  // ═══════ MODULE C — Connection Style (12) ═══════
  { id:"C1",  module:"C", chapterTitle:"Connection Style", text:"I worry that people I love may stop loving me.",                                   reverse:false, map:{ dimension:"Anxiety" } },
  { id:"C2",  module:"C", chapterTitle:"Connection Style", text:"I need reassurance that I matter.",                                                reverse:false, map:{ dimension:"Anxiety" } },
  { id:"C3",  module:"C", chapterTitle:"Connection Style", text:"If someone pulls away, I can't stop thinking about it.",                           reverse:false, map:{ dimension:"Anxiety" } },
  { id:"C4",  module:"C", chapterTitle:"Connection Style", text:"I feel secure in relationships even when things are uncertain.",                    reverse:true,  map:{ dimension:"Anxiety" } },
  { id:"C5",  module:"C", chapterTitle:"Connection Style", text:"I fear being replaced or forgotten.",                                              reverse:false, map:{ dimension:"Anxiety" } },
  { id:"C6",  module:"C", chapterTitle:"Connection Style", text:"I can tolerate distance without panic.",                                           reverse:true,  map:{ dimension:"Anxiety" } },
  { id:"C7",  module:"C", chapterTitle:"Connection Style", text:"I feel uncomfortable depending on others.",                                        reverse:false, map:{ dimension:"Avoidance" } },
  { id:"C8",  module:"C", chapterTitle:"Connection Style", text:"I prefer not to share my deep feelings.",                                          reverse:false, map:{ dimension:"Avoidance" } },
  { id:"C9",  module:"C", chapterTitle:"Connection Style", text:"I keep independence even in close relationships.",                                  reverse:false, map:{ dimension:"Avoidance" } },
  { id:"C10", module:"C", chapterTitle:"Connection Style", text:"It feels natural for me to be emotionally close to someone.",                      reverse:true,  map:{ dimension:"Avoidance" } },
  { id:"C11", module:"C", chapterTitle:"Connection Style", text:"When someone gets too close, I need space.",                                       reverse:false, map:{ dimension:"Avoidance" } },
  { id:"C12", module:"C", chapterTitle:"Connection Style", text:"I find it easy to ask for support when I need it.",                                reverse:true,  map:{ dimension:"Avoidance" } },

  // ═══════ MODULE D — Stress & Coping (24) ═══════
  { id:"D1",  module:"D", chapterTitle:"Stress & Coping",  text:"Under stress, I feel small, overwhelmed, or powerless.",                           reverse:false, map:{ mode:"VulnerableActivation" } },
  { id:"D2",  module:"D", chapterTitle:"Stress & Coping",  text:"I blame myself harshly when something goes wrong.",                                reverse:false, map:{ mode:"PunitiveInnerCritic" } },
  { id:"D3",  module:"D", chapterTitle:"Stress & Coping",  text:"When I'm stressed, I numb out with scrolling, food, gaming, or distractions.",     reverse:false, map:{ mode:"DetachedSelfSoother" } },
  { id:"D4",  module:"D", chapterTitle:"Stress & Coping",  text:"I avoid thinking about painful feelings until they disappear.",                    reverse:false, map:{ mode:"DetachedProtector" } },
  { id:"D5",  module:"D", chapterTitle:"Stress & Coping",  text:"I become more sensitive to signs of rejection or judgment.",                       reverse:false, map:{ mode:"AnxiousHypervigilance" } },
  { id:"D6",  module:"D", chapterTitle:"Stress & Coping",  text:"When I'm stressed, I can still treat myself with kindness.",                      reverse:true,  map:{ mode:"HealthyAdult" } },
  { id:"D7",  module:"D", chapterTitle:"Stress & Coping",  text:"I try to control details because mistakes feel dangerous.",                        reverse:false, map:{ mode:"Overcontrol" } },
  { id:"D8",  module:"D", chapterTitle:"Stress & Coping",  text:"I feel guilty resting when there's more to do.",                                  reverse:false, map:{ mode:"DemandingPressure" } },
  { id:"D9",  module:"D", chapterTitle:"Stress & Coping",  text:"I set standards that are hard for anyone to meet (including me).",                 reverse:false, map:{ mode:"DemandingParent" } },
  { id:"D10", module:"D", chapterTitle:"Stress & Coping",  text:"If I can't do something perfectly, I delay starting.",                             reverse:false, map:{ mode:"PerfectionParalysis" } },
  { id:"D11", module:"D", chapterTitle:"Stress & Coping",  text:"I feel anxious when I'm not progressing.",                                        reverse:false, map:{ mode:"DrivePressure" } },
  { id:"D12", module:"D", chapterTitle:"Stress & Coping",  text:'I can accept "good enough" and still move forward.',                               reverse:true,  map:{ mode:"HealthyAdult" } },
  { id:"D13", module:"D", chapterTitle:"Stress & Coping",  text:"I people-please to keep peace, even if I resent it later.",                       reverse:false, map:{ mode:"CompliantSurrender" } },
  { id:"D14", module:"D", chapterTitle:"Stress & Coping",  text:"I struggle to express needs directly.",                                           reverse:false, map:{ mode:"NeedsInhibition" } },
  { id:"D15", module:"D", chapterTitle:"Stress & Coping",  text:"When stressed, I become irritable or sharp with others.",                         reverse:false, map:{ mode:"AngryProtector" } },
  { id:"D16", module:"D", chapterTitle:"Stress & Coping",  text:"I hide emotions because I don't want to be a burden.",                            reverse:false, map:{ mode:"EmotionalInhibition" } },
  { id:"D17", module:"D", chapterTitle:"Stress & Coping",  text:"I sometimes explode after holding too much inside.",                               reverse:false, map:{ mode:"PressureExplosion" } },
  { id:"D18", module:"D", chapterTitle:"Stress & Coping",  text:"I can communicate boundaries calmly without attacking or collapsing.",             reverse:true,  map:{ mode:"HealthyAdult" } },
  { id:"D19", module:"D", chapterTitle:"Stress & Coping",  text:"When life is heavy, I withdraw and handle it alone.",                              reverse:false, map:{ mode:"DetachedWithdrawal" } },
  { id:"D20", module:"D", chapterTitle:"Stress & Coping",  text:"I feel safest when I rely only on myself.",                                       reverse:false, map:{ mode:"OvercompensatorAvoidant" } },
  { id:"D21", module:"D", chapterTitle:"Stress & Coping",  text:"Under stress, I work harder rather than rest.",                                    reverse:false, map:{ mode:"OvercompensatorDrive" } },
  { id:"D22", module:"D", chapterTitle:"Stress & Coping",  text:"I find it hard to trust that people will be there for me.",                       reverse:false, map:{ mode:"TrustWound" } },
  { id:"D23", module:"D", chapterTitle:"Stress & Coping",  text:"Even in stress, I can reflect and choose a healthier response.",                  reverse:true,  map:{ mode:"HealthyAdult" } },
  { id:"D24", module:"D", chapterTitle:"Stress & Coping",  text:"I recover from setbacks without losing my sense of self.",                        reverse:true,  map:{ mode:"Resilience" } },
];

const MODULES = [
  { id: "A", title: "Core Style" },
  { id: "B", title: "Needs Map" },
  { id: "C", title: "Connection Style" },
  { id: "D", title: "Stress & Coping" },
];

const LIKERT_LABELS = [
  "Strongly disagree", "Disagree", "Somewhat disagree",
  "Neutral",
  "Somewhat agree", "Agree", "Strongly agree"
];

const BLOCK_SIZE = 4;
const STORAGE_KEY = "tyg_assessment_progress";

// ── BLOCKS PRE-COMPUTATION ──────────────────────────────────────

function buildBlocks() {
  const blocks = [];
  for (let i = 0; i < QUESTIONS.length; i += BLOCK_SIZE) {
    blocks.push(QUESTIONS.slice(i, i + BLOCK_SIZE));
  }
  return blocks;
}

const BLOCKS = buildBlocks();
const TOTAL_BLOCKS = BLOCKS.length;

// ── STATE ───────────────────────────────────────────────────────

let state = {
  currentBlockIndex: 0,
  answers: {},
  startedAt: null,
  lastSavedAt: null,
  completed: false,
  _pauseShown: false, // transient, not persisted
};

// ── DOM REFERENCES ──────────────────────────────────────────────

const progressBar     = document.getElementById("progress-bar");
const bodyEl          = document.getElementById("assessment-body");
const footerEl        = document.getElementById("assessment-footer");
const resumeOverlay   = document.getElementById("resume-overlay");
const btnResume       = document.getElementById("btn-resume");
const btnRestart      = document.getElementById("btn-restart");

// ── PERSISTENCE ─────────────────────────────────────────────────

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

// ── INIT ────────────────────────────────────────────────────────

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
    // Completed or no saved data → fresh start
    if (saved && saved.completed) {
      clearProgress();
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

// ── RENDER ROUTER ───────────────────────────────────────────────

function renderRouter() {
  if (state.completed) {
    renderResults();
    return;
  }

  if (state.currentBlockIndex >= TOTAL_BLOCKS) {
    state.completed = true;
    saveProgress();
    renderResults();
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

// ── PROGRESS INDICATOR ──────────────────────────────────────────

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

// ── RENDER BLOCK (4 questions) ──────────────────────────────────

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

// ── ANSWER SELECTION ────────────────────────────────────────────

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

// ── PAUSE SCREEN ────────────────────────────────────────────────

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

// ── SCORING ENGINE ──────────────────────────────────────────────

function computeResults() {
  const raw = {
    islands: {},
    needs: { Autonomy: { pos: 0, neg: 0 }, Competence: { pos: 0, neg: 0 }, Relatedness: { pos: 0, neg: 0 } },
    attachment: { Anxiety: 0, Avoidance: 0, AnxietyCount: 0, AvoidanceCount: 0 },
    stressModes: {},
    healthyAdult: 0,
    healthyAdultCount: 0,
    resilience: 0,
    resilienceCount: 0,
  };

  QUESTIONS.forEach(q => {
    const val = state.answers[q.id];
    if (val == null) return;
    const scored = q.reverse ? (8 - val) : val;

    if (q.module === "A") {
      const { primary, secondary } = q.map;
      if (primary && primary !== "ImpulsivityNoise") {
        raw.islands[primary] = (raw.islands[primary] || 0) + scored;
      }
      if (secondary) {
        raw.islands[secondary] = (raw.islands[secondary] || 0) + scored * 0.5;
      }
    }
    if (q.module === "B") {
      const { dimension, polarity } = q.map;
      if (polarity === "+") raw.needs[dimension].pos += val;
      else raw.needs[dimension].neg += val;
    }
    if (q.module === "C") {
      const { dimension } = q.map;
      raw.attachment[dimension] += scored;
      raw.attachment[dimension + "Count"]++;
    }
    if (q.module === "D") {
      const { mode } = q.map;
      if (mode === "HealthyAdult") { raw.healthyAdult += scored; raw.healthyAdultCount++; }
      else if (mode === "Resilience") { raw.resilience += scored; raw.resilienceCount++; }
      else {
        if (!raw.stressModes[mode]) raw.stressModes[mode] = { total: 0, count: 0 };
        raw.stressModes[mode].total += scored;
        raw.stressModes[mode].count++;
      }
    }
  });

  return raw;
}

function normalizeResults(raw) {
  // Islands
  const allIslands = ["Grounded","Sensitive","Driven","Curious","Expressive","Independent"];
  const islands = {};
  allIslands.forEach(k => { islands[k] = raw.islands[k] || 0; });
  const islandEntries = Object.entries(islands).sort((a,b) => b[1] - a[1]);
  const primaryIsland = islandEntries[0][0];
  const secondaryIsland = islandEntries[1][0];
  const gap = islandEntries[0][1] - islandEntries[1][1];

  let confidenceLevel = "Medium";
  let confidenceScore = Math.round(((gap / 14) * 100));
  if (confidenceScore > 100) confidenceScore = 100;
  let confidenceReason = "";
  if (gap >= 8) { confidenceLevel = "High"; confidenceReason = "Your primary island scored well above the rest, indicating a clear dominant style."; }
  else if (gap <= 3) { confidenceLevel = "Low"; confidenceReason = "Your top two islands scored very similarly — you likely draw from both patterns."; }
  else { confidenceReason = "Your primary island is distinct but shares some overlap with your secondary style."; }

  // Needs
  const needs = {};
  for (const dim of ["Autonomy","Competence","Relatedness"]) {
    const p = raw.needs[dim].pos;
    const n = raw.needs[dim].neg;
    const balance = Math.max(-1, Math.min(1, (p - n) / 14));
    needs["autonomyPlus"] = needs["autonomyPlus"] || 0;
    needs[dim.toLowerCase() + "Plus"] = p;
    needs[dim.toLowerCase() + "Minus"] = n;
    needs[dim.toLowerCase() + "Balance"] = balance;
  }

  // Attachment
  const anxietyAvg = raw.attachment.AnxietyCount ? raw.attachment.Anxiety / raw.attachment.AnxietyCount : 0;
  const avoidanceAvg = raw.attachment.AvoidanceCount ? raw.attachment.Avoidance / raw.attachment.AvoidanceCount : 0;
  const attachment = { anxiety: anxietyAvg, avoidance: avoidanceAvg };

  // Stress Modes
  const modes = {};
  Object.entries(raw.stressModes).forEach(([k, d]) => { modes[k] = d.total / d.count; });
  const healthyAvg = raw.healthyAdultCount ? raw.healthyAdult / raw.healthyAdultCount : 0;
  const resilienceAvg = raw.resilienceCount ? raw.resilience / raw.resilienceCount : 0;
  modes.HealthyAdult = healthyAvg;
  modes.Resilience = resilienceAvg;

  const topModes = Object.entries(modes)
    .filter(([k]) => k !== "HealthyAdult" && k !== "Resilience")
    .map(([key, score]) => ({ key, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Archetype placeholder
  const ARCHETYPE_MAP = {
    Grounded: "The Steady Builder",
    Sensitive: "The Deep Feeler",
    Driven: "The Relentless Achiever",
    Curious: "The Systems Thinker",
    Expressive: "The Creative Spark",
    Independent: "The Self-Reliant Lone Wolf"
  };

  return {
    islands,
    primaryIsland,
    secondaryIsland,
    needs,
    attachment,
    modes,
    topModes,
    confidence: { level: confidenceLevel, score: confidenceScore, reason: confidenceReason },
    archetype: { island: primaryIsland, name: ARCHETYPE_MAP[primaryIsland] || "The Explorer" }
  };
}

// ── MODE DESCRIPTIONS ───────────────────────────────────────────

const MODE_DESC = {
  VulnerableActivation: "feel overwhelmed, small, or powerless",
  PunitiveInnerCritic: "attack yourself with harsh self-blame",
  DetachedSelfSoother: "numb out with distractions or comfort",
  DetachedProtector: "shut down feelings to avoid pain",
  AnxiousHypervigilance: "scan for signs of rejection or danger",
  Overcontrol: "try to control every detail to feel safe",
  DemandingPressure: "push yourself relentlessly, resenting rest",
  DemandingParent: "hold yourself and others to impossible standards",
  PerfectionParalysis: "freeze because nothing feels good enough",
  DrivePressure: "feel anxious unless you're progressing",
  CompliantSurrender: "people-please to keep the peace",
  NeedsInhibition: "suppress your own needs to avoid conflict",
  AngryProtector: "become sharp or irritable with others",
  EmotionalInhibition: "hide emotions so you won't be a burden",
  PressureExplosion: "explode after holding too much inside",
  DetachedWithdrawal: "withdraw and handle everything alone",
  OvercompensatorAvoidant: "rely only on yourself, trusting no one",
  OvercompensatorDrive: "work harder instead of resting or asking for help",
  TrustWound: "struggle to believe people will be there for you"
};

// ── WHY-THIS-FITS GENERATOR ─────────────────────────────────────

function generateWhyBullets(r) {
  const bullets = [];

  // 1) Needs
  const needsDims = ["autonomy","competence","relatedness"];
  const needsLabels = { autonomy: "Autonomy", competence: "Competence", relatedness: "Relatedness" };
  let lowestNeed = null, lowestVal = 2;
  needsDims.forEach(d => {
    if (r.needs[d + "Balance"] < lowestVal) { lowestVal = r.needs[d + "Balance"]; lowestNeed = d; }
  });
  if (lowestNeed && lowestVal < 0) {
    const descs = { autonomy: "feeling controlled or pressured by external expectations", competence: "doubting your abilities or avoiding challenges from fear of failure", relatedness: "feeling unseen or emotionally disconnected from others" };
    bullets.push({ icon: "🎯", title: `Your ${needsLabels[lowestNeed]} need is under-nourished`, desc: `Your pattern suggests ${descs[lowestNeed]}.` });
  } else {
    let highestNeed = null, highestVal = -2;
    needsDims.forEach(d => { if (r.needs[d + "Balance"] > highestVal) { highestVal = r.needs[d + "Balance"]; highestNeed = d; } });
    if (highestNeed) {
      const descs = { autonomy: "You feel a genuine sense of choice in how you live.", competence: "You trust your ability to handle what matters.", relatedness: "You feel meaningfully connected to people around you." };
      bullets.push({ icon: "🎯", title: `${needsLabels[highestNeed]} is your strongest fuel`, desc: descs[highestNeed] });
    }
  }

  // 2) Attachment
  const anx = r.attachment.anxiety;
  const avd = r.attachment.avoidance;
  if (anx > 4.5 && avd > 4.5) {
    bullets.push({ icon: "🔗", title: "You crave closeness but protect yourself from it", desc: "High anxiety and avoidance suggest an inner conflict between wanting connection and fearing vulnerability." });
  } else if (anx > 4.5) {
    bullets.push({ icon: "🔗", title: "You seek reassurance in relationships", desc: "Elevated attachment anxiety means you're highly attuned to signs of disconnection or rejection." });
  } else if (avd > 4.5) {
    bullets.push({ icon: "🔗", title: "You default to self-reliance in closeness", desc: "Higher avoidance suggests you protect your independence, sometimes at the cost of emotional openness." });
  } else {
    bullets.push({ icon: "🔗", title: "Your connection style is relatively grounded", desc: "You can tolerate closeness and distance without significant distress." });
  }

  // 3) Top stress mode
  if (r.topModes.length > 0) {
    const tm = r.topModes[0];
    const desc = MODE_DESC[tm.key] || "activate a protective pattern";
    bullets.push({ icon: "⚡", title: `Under stress, you tend to ${desc}`, desc: `Your strongest stress response is ${camelToWords(tm.key)} (${tm.score.toFixed(1)}/7).` });
  }

  // 4) Island combination
  const combDescs = {
    "Grounded+Sensitive": "You anchor others with stability while absorbing emotional undercurrents deeply.",
    "Grounded+Driven": "You combine reliability with quiet ambition — you build steadily toward meaningful goals.",
    "Grounded+Curious": "You think carefully before acting, blending practicality with intellectual depth.",
    "Grounded+Expressive": "You balance creative energy with a need for calm structure.",
    "Grounded+Independent": "You're self-contained and reliable — you value both autonomy and consistency.",
    "Sensitive+Driven": "You push yourself hard while feeling everything deeply — a powerful but tiring combination.",
    "Sensitive+Curious": "You process the world through emotion and intellect equally, often seeing what others miss.",
    "Sensitive+Expressive": "You channel deep feelings into creative expression, drawing others in with authenticity.",
    "Sensitive+Independent": "You feel deeply but guard your inner world — closeness is selective and meaningful.",
    "Driven+Curious": "You combine intellectual hunger with goal-driven focus — systems thinking meets execution.",
    "Driven+Expressive": "You pursue achievement with charisma, inspiring others toward your vision.",
    "Driven+Independent": "You're fiercely self-directed, expecting high standards from yourself above all.",
    "Curious+Expressive": "You connect ideas and people naturally — your mind is both analytical and creative.",
    "Curious+Independent": "You're a self-guided thinker who questions norms and seeks your own understanding.",
    "Expressive+Independent": "You express yourself boldly from a place of autonomy, valuing freedom in creativity."
  };
  const combo1 = r.primaryIsland + "+" + r.secondaryIsland;
  const combo2 = r.secondaryIsland + "+" + r.primaryIsland;
  const comboDesc = combDescs[combo1] || combDescs[combo2] || `Your blend of ${r.primaryIsland} and ${r.secondaryIsland} creates a unique cognitive signature.`;
  bullets.push({ icon: "🏝️", title: `${r.primaryIsland} + ${r.secondaryIsland} combination`, desc: comboDesc });

  return bullets;
}

// ── CONNECTION STYLE LABEL ──────────────────────────────────────

function getConnectionLabel(anx, avd) {
  if (anx <= 4 && avd <= 4) return { label: "Grounded Secure", desc: "You feel relatively comfortable with closeness and independence." };
  if (anx > 4 && avd <= 4)  return { label: "Reassurance-Seeking", desc: "You value connection deeply and notice quickly when it feels at risk." };
  if (anx <= 4 && avd > 4)  return { label: "Self-Protective", desc: "You safeguard your independence, sometimes keeping emotional walls up." };
  return { label: "Guarded & Sensitive", desc: "You want closeness but something in you pulls back to stay safe." };
}

// ── GROWTH PATH GENERATOR ───────────────────────────────────────

function generateGrowthPath(r) {
  const topKey = r.topModes.length > 0 ? r.topModes[0].key : null;
  const topScore = r.topModes.length > 0 ? r.topModes[0].score : 0;

  // Determine growth lever
  let lever = { title: "", actions: [], boundary: "", trap: "" };

  const criticModes = ["PunitiveInnerCritic","DemandingParent","DemandingPressure"];
  const detachModes = ["DetachedProtector","DetachedWithdrawal","DetachedSelfSoother"];
  const anxiousModes = ["AnxiousHypervigilance","VulnerableActivation"];
  const controlModes = ["Overcontrol","PerfectionParalysis","DrivePressure"];
  const peopleModes = ["CompliantSurrender","NeedsInhibition","EmotionalInhibition"];

  if (topKey && criticModes.includes(topKey)) {
    lever = {
      title: "Shift from punishment to standards + care",
      actions: [
        "Once a day, catch a self-critical thought and rewrite it as advice you'd give a friend.",
        "After a mistake this week, say out loud: \"That was hard, and I'm still okay.\"",
        "Each evening, name one thing you handled well — even something small."
      ],
      boundary: "\"I can hold myself to high standards without punishing myself for being human.\"",
      trap: "Trying to be perfect at self-compassion — that's the same pattern in disguise."
    };
  } else if (topKey && detachModes.includes(topKey)) {
    lever = {
      title: "Reconnect through small honesty",
      actions: [
        "Share one real feeling with someone this week — even just \"I had a hard day.\"",
        "When you reach for a distraction, pause for 10 seconds and notice what you're avoiding.",
        "Write down one emotion you felt today that you normally wouldn't name."
      ],
      boundary: "\"I can let someone see me without giving them everything.\"",
      trap: "Confusing isolation with peace — detachment feels calm but keeps you stuck."
    };
  } else if (topKey && anxiousModes.includes(topKey)) {
    lever = {
      title: "Calm the alarm before seeking reassurance",
      actions: [
        "When anxiety spikes, place a hand on your chest and take 3 slow breaths before reaching out.",
        "Write down what you're actually afraid of — then ask: is this happening right now?",
        "Practice waiting 20 minutes before sending a reassurance-seeking message."
      ],
      boundary: "\"I can feel anxious and still choose not to act from that place.\"",
      trap: "Seeking constant reassurance — it soothes for a moment but reinforces the alarm."
    };
  } else if (topKey && controlModes.includes(topKey)) {
    lever = {
      title: "Act at 70% clarity",
      actions: [
        "Start one task this week at 'good enough' instead of waiting for perfect conditions.",
        "Set a 15-minute timer for a task you've been avoiding — stop when it rings, even if unfinished.",
        "At day's end, write one thing you progressed on, even imperfectly."
      ],
      boundary: "\"I don't need certainty to begin. Starting is enough.\"",
      trap: "Replacing one form of control with another — flexibility is the goal, not a new system."
    };
  } else if (topKey && peopleModes.includes(topKey)) {
    lever = {
      title: "Practise voicing one need per day",
      actions: [
        "Say \"I need a moment\" before automatically agreeing to something this week.",
        "Identify one thing you did this week purely because you wanted to, not because someone expected it.",
        "Write down one need you usually suppress and share it with someone safe."
      ],
      boundary: "\"Saying what I need is not selfish — it's honest.\"",
      trap: "Swinging to the opposite extreme and being aggressive rather than assertive."
    };
  } else {
    // Fallback
    lever = {
      title: "Strengthen your Healthy Adult voice",
      actions: [
        "When a stress pattern shows up, name it: \"That's my [pattern], not my whole self.\"",
        "Once a day, ask: \"What would my calmest, wisest self do right now?\"",
        "Do one thing this week that aligns with how you want to live, not how you're expected to."
      ],
      boundary: "\"I'm allowed to respond differently than I always have.\"",
      trap: "Expecting change to feel comfortable — growth often starts with mild discomfort."
    };
  }

  return lever;
}

// ── REFLECTION PROMPTS GENERATOR ────────────────────────────────

function generateReflectionPrompts(r) {
  const prompts = [];

  if (r.needs.autonomyBalance < -0.1)
    prompts.push({ id: "ref-aut", text: "Where in your life right now do you feel most pressured or controlled? What would it look like to have even 10% more choice there?" });
  if (r.needs.relatednessBalance < -0.1)
    prompts.push({ id: "ref-rel", text: "When was the last time you felt truly seen by someone? What made that moment different from others?" });
  if (r.needs.competenceBalance < -0.1)
    prompts.push({ id: "ref-comp", text: "What challenge have you been avoiding because you're afraid you'll fail? What would 'good enough' look like for it?" });
  if (r.attachment.anxiety > 4.5)
    prompts.push({ id: "ref-anx", text: "When you feel the urge to check whether someone still cares, what are you really looking for? What would reassure the deeper need?" });
  if (r.attachment.avoidance > 4.5)
    prompts.push({ id: "ref-avd", text: "Think of someone you trust. What would change if you let them see one thing you usually keep hidden?" });

  // If we have fewer than 3, add contextual ones
  if (prompts.length < 3) {
    const fallbacks = [
      { id: "ref-stress", text: "Think of the last time you felt overwhelmed. What was the first thing you did? Was it a choice, or a reflex?" },
      { id: "ref-island", text: `Your primary island is ${r.primaryIsland}. When does this pattern serve you well, and when does it hold you back?` },
      { id: "ref-adult", text: "Imagine your wisest, calmest self giving you advice. What would they say about how this week went?" }
    ];
    for (const fb of fallbacks) {
      if (prompts.length >= 3) break;
      if (!prompts.find(p => p.id === fb.id)) prompts.push(fb);
    }
  }

  return prompts.slice(0, 3);
}

// ── WORLD RECOMMENDATIONS ───────────────────────────────────────

function generateWorldRecommendations(r) {
  const worlds = [];

  // Reflection World
  let refReason = "Your patterns suggest depth of thought";
  if (r.topModes.length > 0) refReason = `Your ${camelToWords(r.topModes[0].key)} pattern would benefit from structured reflection`;
  worlds.push({ name: "Reflection World", icon: "🪞", desc: "Guided journaling and inner dialogue exercises.", reason: refReason });

  // History World
  let histReason = "Learning through stories builds pattern recognition";
  if (r.primaryIsland === "Curious" || r.primaryIsland === "Sensitive") histReason = `As a ${r.primaryIsland} type, you naturally learn through understanding other people's stories`;
  worlds.push({ name: "History World", icon: "📜", desc: "Wisdom through stories of real people who faced similar patterns.", reason: histReason });

  // Decision World
  let decReason = "Practice making values-aligned choices under pressure";
  if (r.needs.autonomyBalance < 0) decReason = "Your under-nourished autonomy need suggests practising intentional decisions would help";
  else if (r.primaryIsland === "Driven" || r.primaryIsland === "Independent") decReason = `Your ${r.primaryIsland} style means you thrive when choices are clear and deliberate`;
  worlds.push({ name: "Decision World", icon: "⚖️", desc: "Clarity through ethical dilemmas and scenario-based choices.", reason: decReason });

  return worlds;
}

// ── COPY SUMMARY ────────────────────────────────────────────────

function buildTextSummary(r) {
  const conn = getConnectionLabel(r.attachment.anxiety, r.attachment.avoidance);
  const topModesStr = r.topModes.map(m => camelToWords(m.key) + " (" + m.score.toFixed(1) + "/7)").join(", ");
  return `TestYourGenius — My Result\n\nArchetype: ${r.archetype.name}\nPrimary Island: ${r.primaryIsland}\nSecondary Island: ${r.secondaryIsland}\nConfidence: ${r.confidence.level}\n\nNeeds Balance:\n  Autonomy: ${r.needs.autonomyBalance > 0 ? "+" : ""}${r.needs.autonomyBalance.toFixed(2)}\n  Competence: ${r.needs.competenceBalance > 0 ? "+" : ""}${r.needs.competenceBalance.toFixed(2)}\n  Relatedness: ${r.needs.relatednessBalance > 0 ? "+" : ""}${r.needs.relatednessBalance.toFixed(2)}\n\nConnection Style: ${conn.label}\n  Anxiety: ${r.attachment.anxiety.toFixed(1)}/7\n  Avoidance: ${r.attachment.avoidance.toFixed(1)}/7\n\nTop Stress Modes: ${topModesStr}\nHealthy Adult: ${r.modes.HealthyAdult.toFixed(1)}/7\nResilience: ${r.modes.Resilience.toFixed(1)}/7\n\nThis is not a diagnosis — it's a map for self-understanding.`;
}

// ── REFLECTION STORAGE ──────────────────────────────────────────

const REFLECTION_KEY = "tyg_reflections";

function loadReflections() {
  try { const d = localStorage.getItem(REFLECTION_KEY); return d ? JSON.parse(d) : {}; } catch(e) { return {}; }
}

function saveReflection(id, text) {
  const all = loadReflections();
  all[id] = { text, timestamp: Date.now() };
  try { localStorage.setItem(REFLECTION_KEY, JSON.stringify(all)); } catch(e) { /* silent */ }
}

// ── RENDER RESULTS ──────────────────────────────────────────────

function renderResults() {
  progressBar.style.display = "none";
  footerEl.style.display = "none";

  const raw = computeResults();
  const r = normalizeResults(raw);
  const whyBullets = generateWhyBullets(r);
  const growth = generateGrowthPath(r);
  const prompts = generateReflectionPrompts(r);
  const worlds = generateWorldRecommendations(r);
  const connStyle = getConnectionLabel(r.attachment.anxiety, r.attachment.avoidance);
  const savedReflections = loadReflections();

  // ── A) RESULT HERO ──

  let heroHtml = `
    <section class="rp-hero">
      <p class="rp-hero-label">Your Result</p>
      <h1 class="rp-archetype-name">${r.archetype.name}</h1>
      <p class="rp-hero-subtitle">A map of your patterns — not a diagnosis.</p>
      <div class="rp-pills">
        <span class="rp-pill rp-pill--primary">${r.primaryIsland}</span>
        <span class="rp-pill rp-pill--secondary">${r.secondaryIsland}</span>
      </div>
      <div class="rp-confidence">
        <span class="rp-confidence-badge rp-confidence-badge--${r.confidence.level.toLowerCase()}">${r.confidence.level} Confidence</span>
        <button class="rp-confidence-why" aria-expanded="false" aria-controls="confidence-detail">Why?</button>
      </div>
      <div class="rp-confidence-detail" id="confidence-detail" hidden>
        <p>${r.confidence.reason}</p>
      </div>
    </section>`;

  // ── B) WHY THIS FITS ──

  let whyHtml = `<section class="rp-section"><h2 class="rp-section-title">Why This Fits</h2><div class="rp-why-list">`;
  whyBullets.forEach(b => {
    whyHtml += `
      <div class="rp-why-item">
        <span class="rp-why-icon">${b.icon}</span>
        <div>
          <strong>${b.title}</strong>
          <p class="rp-why-desc">${b.desc}</p>
        </div>
      </div>`;
  });
  whyHtml += `</div></section>`;

  // ── C) INNER MAP DASHBOARD ──

  function needsMeter(label, balance) {
    const pct = ((balance + 1) / 2) * 100;
    const thumbPct = Math.max(2, Math.min(98, pct));
    return `
      <div class="rp-meter-row">
        <span class="rp-meter-label">${label}</span>
        <div class="rp-meter-track">
          <div class="rp-meter-center"></div>
          <div class="rp-meter-thumb" style="left:${thumbPct}%"></div>
        </div>
        <div class="rp-meter-ends"><span>Drain</span><span>Fuel</span></div>
      </div>`;
  }

  const needsDims = ["autonomy","competence","relatedness"];
  const needsLabels = { autonomy:"Autonomy", competence:"Competence", relatedness:"Relatedness" };
  let lowestNeed = needsDims[0], lowestVal = 2;
  needsDims.forEach(d => { if (r.needs[d+"Balance"] < lowestVal) { lowestVal = r.needs[d+"Balance"]; lowestNeed = d; } });
  const underfedNote = lowestVal < 0 ? `<p class="rp-underfed">Most underfed: <strong>${needsLabels[lowestNeed]}</strong></p>` : `<p class="rp-underfed rp-underfed--good">All needs relatively met</p>`;

  let needsCardHtml = `
    <div class="rp-map-card">
      <h3 class="rp-map-card-title">Needs Map</h3>
      ${needsMeter("Autonomy", r.needs.autonomyBalance)}
      ${needsMeter("Competence", r.needs.competenceBalance)}
      ${needsMeter("Relatedness", r.needs.relatednessBalance)}
      ${underfedNote}
    </div>`;

  function attachMeter(label, val) {
    const pct = Math.max(2, Math.min(98, (val / 7) * 100));
    return `
      <div class="rp-meter-row">
        <span class="rp-meter-label">${label}</span>
        <div class="rp-meter-track rp-meter-track--simple">
          <div class="rp-meter-fill" style="width:${pct}%"></div>
        </div>
        <span class="rp-meter-value">${val.toFixed(1)}</span>
      </div>`;
  }

  let connectionCardHtml = `
    <div class="rp-map-card">
      <h3 class="rp-map-card-title">Connection Style</h3>
      ${attachMeter("Anxiety", r.attachment.anxiety)}
      ${attachMeter("Avoidance", r.attachment.avoidance)}
      <div class="rp-conn-label">
        <strong>${connStyle.label}</strong>
        <p>${connStyle.desc}</p>
      </div>
    </div>`;

  let stressCardHtml = `<div class="rp-map-card"><h3 class="rp-map-card-title">Stress Modes</h3>`;
  r.topModes.forEach(m => {
    const pct = Math.max(2, Math.min(98, (m.score / 7) * 100));
    const desc = MODE_DESC[m.key] || "activate a protective pattern";
    stressCardHtml += `
      <div class="rp-stress-item">
        <div class="rp-stress-header">
          <span class="rp-stress-name">${camelToWords(m.key)}</span>
          <span class="rp-stress-score">${m.score.toFixed(1)}</span>
        </div>
        <div class="rp-meter-track rp-meter-track--simple">
          <div class="rp-meter-fill rp-meter-fill--stress" style="width:${pct}%"></div>
        </div>
        <p class="rp-stress-desc">When stressed, you tend to ${desc}.</p>
      </div>`;
  });
  stressCardHtml += `
    <div class="rp-healthy-row">
      <div class="rp-healthy-item"><span>Healthy Adult</span><strong>${r.modes.HealthyAdult.toFixed(1)}</strong></div>
      <div class="rp-healthy-item"><span>Resilience</span><strong>${r.modes.Resilience.toFixed(1)}</strong></div>
    </div>
  </div>`;

  let mapHtml = `
    <section class="rp-section">
      <h2 class="rp-section-title">Your Inner Map</h2>
      <div class="rp-map-grid">
        ${needsCardHtml}
        ${connectionCardHtml}
        ${stressCardHtml}
      </div>
    </section>`;

  // ── D) GROWTH PATH ──

  let growthHtml = `
    <section class="rp-section">
      <h2 class="rp-section-title">Your 7-Day Reset</h2>
      <div class="rp-growth-card">
        <div class="rp-growth-lever">
          <span class="rp-growth-lever-tag">Growth Lever</span>
          <h3>${growth.title}</h3>
        </div>
        <div class="rp-growth-actions">
          <h4>3 Micro-Actions</h4>
          <ol class="rp-growth-list">
            ${growth.actions.map(a => `<li>${a}</li>`).join("")}
          </ol>
        </div>
        <div class="rp-growth-boundary">
          <h4>Boundary to Practise</h4>
          <blockquote>${growth.boundary}</blockquote>
        </div>
        <div class="rp-growth-trap">
          <h4>⚠ Avoid This Trap</h4>
          <p>${growth.trap}</p>
        </div>
      </div>
    </section>`;

  // ── E) REFLECTION PROMPTS ──

  let promptsHtml = `
    <section class="rp-section">
      <h2 class="rp-section-title">Reflection Prompts</h2>
      <div class="rp-prompts-grid">`;
  prompts.forEach((p, idx) => {
    const saved = savedReflections[p.id];
    promptsHtml += `
        <div class="rp-prompt-card">
          <p class="rp-prompt-text">${p.text}</p>
          <button class="rp-prompt-toggle" data-prompt-id="${p.id}" aria-expanded="${saved ? 'true' : 'false'}">
            ${saved ? 'Edit Response' : 'Write a Response'}
          </button>
          <div class="rp-prompt-editor" id="editor-${p.id}" ${saved ? '' : 'hidden'}>
            <textarea class="rp-prompt-textarea" data-prompt-id="${p.id}" placeholder="Write freely — this stays on your device…">${saved ? saved.text : ''}</textarea>
            <button class="rp-prompt-save" data-prompt-id="${p.id}">Save</button>
          </div>
        </div>`;
  });
  promptsHtml += `</div></section>`;

  // ── F) WORLDS CTA ──

  let worldsHtml = `
    <section class="rp-section">
      <h2 class="rp-section-title">Where to Go Next</h2>
      <div class="rp-worlds-grid">`;
  worlds.forEach(w => {
    worldsHtml += `
        <div class="rp-world-card">
          <span class="rp-world-icon">${w.icon}</span>
          <h4>${w.name}</h4>
          <p class="rp-world-desc">${w.desc}</p>
          <p class="rp-world-reason">Best for you because: ${w.reason}</p>
          <button class="rp-world-btn" onclick="alert('Coming soon — this world is being built.')">Explore</button>
        </div>`;
  });
  worldsHtml += `</div></section>`;

  // ── G) SHARE / SAVE ──

  let footerHtml = `
    <section class="rp-section rp-footer-section">
      <div class="rp-footer-actions">
        <button class="rp-action-btn rp-action-btn--disabled" disabled>Download PDF — coming soon</button>
        <button class="rp-action-btn" id="btn-copy-result">Copy My Result</button>
        <button class="rp-action-btn rp-action-btn--muted" id="btn-retake">Retake Assessment</button>
      </div>
      <p class="rp-footer-note">Your data stays on this device. Nothing is sent anywhere.</p>
    </section>`;

  // ── ASSEMBLE ──

  const fullHtml = `
    <div class="rp-container fade-enter" id="qcard">
      ${heroHtml}
      ${whyHtml}
      ${mapHtml}
      ${growthHtml}
      ${promptsHtml}
      ${worldsHtml}
      ${footerHtml}
    </div>`;

  bodyEl.innerHTML = fullHtml;
  bodyEl.scrollTop = 0;
  window.scrollTo(0, 0);

  // Fade in
  requestAnimationFrame(() => {
    const card = document.getElementById("qcard");
    if (card) { card.classList.remove("fade-enter"); card.classList.add("fade-active"); }
  });

  // ── EVENT BINDINGS ──

  // Confidence "Why?"
  const whyBtn = bodyEl.querySelector(".rp-confidence-why");
  if (whyBtn) {
    whyBtn.addEventListener("click", () => {
      const detail = document.getElementById("confidence-detail");
      const expanded = whyBtn.getAttribute("aria-expanded") === "true";
      whyBtn.setAttribute("aria-expanded", !expanded);
      detail.hidden = expanded;
    });
  }

  // Reflection prompts
  bodyEl.querySelectorAll(".rp-prompt-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.dataset.promptId;
      const editor = document.getElementById("editor-" + pid);
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      editor.hidden = expanded;
      if (!expanded) editor.querySelector("textarea").focus();
    });
  });

  bodyEl.querySelectorAll(".rp-prompt-save").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.dataset.promptId;
      const ta = bodyEl.querySelector(`textarea[data-prompt-id="${pid}"]`);
      saveReflection(pid, ta.value);
      btn.textContent = "Saved ✓";
      setTimeout(() => { btn.textContent = "Save"; }, 1500);
    });
  });

  // Copy result
  const copyBtn = document.getElementById("btn-copy-result");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const summary = buildTextSummary(r);
      navigator.clipboard.writeText(summary).then(() => {
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => { copyBtn.textContent = "Copy My Result"; }, 2000);
      }).catch(() => {
        // Fallback
        const ta = document.createElement("textarea");
        ta.value = summary; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => { copyBtn.textContent = "Copy My Result"; }, 2000);
      });
    });
  }

  // Retake
  const retakeBtn = document.getElementById("btn-retake");
  if (retakeBtn) {
    retakeBtn.addEventListener("click", () => {
      clearProgress();
      renderRouter();
    });
  }
}

// ── UTILS ───────────────────────────────────────────────────────

function camelToWords(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^ /, '');
}

// ── BOOT ────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", initAssessment);
