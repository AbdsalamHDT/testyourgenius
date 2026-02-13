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
    healthyAdult: 0, healthyAdultCount: 0,
    resilience: 0, resilienceCount: 0,
  };
  QUESTIONS.forEach(q => {
    const val = state.answers[q.id]; if (val == null) return;
    const scored = q.reverse ? (8 - val) : val;
    if (q.module === "A") {
      const { primary, secondary } = q.map;
      if (primary && primary !== "ImpulsivityNoise") raw.islands[primary] = (raw.islands[primary] || 0) + scored;
      if (secondary) raw.islands[secondary] = (raw.islands[secondary] || 0) + scored * 0.5;
    }
    if (q.module === "B") { const { dimension, polarity } = q.map; if (polarity === "+") raw.needs[dimension].pos += val; else raw.needs[dimension].neg += val; }
    if (q.module === "C") { const { dimension } = q.map; raw.attachment[dimension] += scored; raw.attachment[dimension + "Count"]++; }
    if (q.module === "D") {
      const { mode } = q.map;
      if (mode === "HealthyAdult") { raw.healthyAdult += scored; raw.healthyAdultCount++; }
      else if (mode === "Resilience") { raw.resilience += scored; raw.resilienceCount++; }
      else { if (!raw.stressModes[mode]) raw.stressModes[mode] = { total: 0, count: 0 }; raw.stressModes[mode].total += scored; raw.stressModes[mode].count++; }
    }
  });
  return raw;
}

function normalizeResults(raw) {
  const allIslands = ["Grounded","Sensitive","Driven","Curious","Expressive","Independent"];
  const islands = {}; allIslands.forEach(k => { islands[k] = raw.islands[k] || 0; });
  const islandEntries = Object.entries(islands).sort((a,b) => b[1] - a[1]);
  const primaryIsland = islandEntries[0][0], secondaryIsland = islandEntries[1][0];
  const gap = islandEntries[0][1] - islandEntries[1][1];
  let confidenceLevel = "Medium", confidenceScore = Math.min(100, Math.round((gap / 14) * 100)), confidenceReason = "";
  if (gap >= 8) { confidenceLevel = "High"; confidenceReason = "Your primary island scored well above the rest, indicating a clear dominant style."; }
  else if (gap <= 3) { confidenceLevel = "Low"; confidenceReason = "Your top two islands scored very similarly — you likely draw from both patterns."; }
  else { confidenceReason = "Your primary island is distinct but shares some overlap with your secondary style."; }

  const needsBalance = {}, needsRaw = {};
  for (const dim of ["Autonomy","Competence","Relatedness"]) {
    const p = raw.needs[dim].pos, n = raw.needs[dim].neg;
    const key = dim.toLowerCase();
    needsBalance[key] = Math.max(-1, Math.min(1, (p - n) / 14));
    needsRaw[key + "Plus"] = p; needsRaw[key + "Minus"] = n;
  }

  const anxietyAvg = raw.attachment.AnxietyCount ? raw.attachment.Anxiety / raw.attachment.AnxietyCount : 0;
  const avoidanceAvg = raw.attachment.AvoidanceCount ? raw.attachment.Avoidance / raw.attachment.AvoidanceCount : 0;

  const modes = {};
  Object.entries(raw.stressModes).forEach(([k, d]) => { modes[k] = d.total / d.count; });
  const healthyAdult = raw.healthyAdultCount ? raw.healthyAdult / raw.healthyAdultCount : 0;
  const resilience = raw.resilienceCount ? raw.resilience / raw.resilienceCount : 0;

  const topModes = Object.entries(modes).map(([key, score]) => ({ key, score })).sort((a, b) => b.score - a.score).slice(0, 3);

  const ARCHETYPE_MAP = { Grounded:"The Steady Builder", Sensitive:"The Deep Feeler", Driven:"The Relentless Achiever", Curious:"The Systems Thinker", Expressive:"The Creative Spark", Independent:"The Self-Reliant Lone Wolf" };

  // Secondary influences
  const secondaryInfluences = deriveSecondaryInfluences(secondaryIsland, topModes);

  return {
    islands, primaryIsland, secondaryIsland,
    needsBalance, needsRaw,
    attachment: { anxiety: anxietyAvg, avoidance: avoidanceAvg },
    modes, topModes,
    healthyAdult, resilience,
    confidence: { level: confidenceLevel, score: confidenceScore, reason: confidenceReason },
    archetypePrimary: { island: primaryIsland, name: ARCHETYPE_MAP[primaryIsland] || "The Explorer" },
    archetypeSecondary: secondaryInfluences
  };
}

function deriveSecondaryInfluences(secondaryIsland, topModes) {
  const influences = [];
  const ISLAND_INFLUENCE = { Grounded:"The Calm Anchor", Sensitive:"The Empathic Mirror", Driven:"The Quiet Achiever", Curious:"The Pattern Finder", Expressive:"The Expressive Channel", Independent:"The Boundary Keeper" };
  const ISLAND_REASONS = { Grounded:"Your secondary Grounded energy gives you a stabilising presence others rely on.", Sensitive:"Your secondary Sensitive energy means you absorb emotional signals others miss.", Driven:"Your secondary Driven energy fuels a quiet ambition beneath the surface.", Curious:"Your secondary Curious energy means you're always looking for the deeper pattern.", Expressive:"Your secondary Expressive energy gives you a natural ability to communicate what others feel.", Independent:"Your secondary Independent energy means you instinctively protect your inner space." };
  influences.push({ name: ISLAND_INFLUENCE[secondaryIsland] || "The Explorer", reason: ISLAND_REASONS[secondaryIsland] || `Your secondary ${secondaryIsland} style adds depth to your primary pattern.` });

  const topKey = topModes.length > 0 ? topModes[0].key : null;
  const MODE_INFLUENCES = {
    PunitiveInnerCritic: { name:"The Quiet Improver", reason:"Your strong inner critic reveals a deep desire for growth — it's harsh, but it comes from caring about standards." },
    DemandingParent: { name:"The Quiet Improver", reason:"Your demanding inner voice pushes you toward excellence, but it needs softening with self-compassion." },
    DemandingPressure: { name:"The Quiet Improver", reason:"You constantly raise the bar for yourself — this drive is powerful when balanced with rest." },
    DetachedProtector: { name:"The Boundary Keeper", reason:"You build walls to stay safe — this protection served you, but it now limits connection." },
    DetachedWithdrawal: { name:"The Boundary Keeper", reason:"Withdrawal is your shield — you handle pain by handling it alone." },
    DetachedSelfSoother: { name:"The Comfort Seeker", reason:"You reach for numbing when overwhelmed — this is your nervous system asking for gentler rest." },
    AnxiousHypervigilance: { name:"The Vigilant Heart", reason:"You scan constantly for danger signals — your sensitivity is high because your care is real." },
    VulnerableActivation: { name:"The Vigilant Heart", reason:"You feel things at full volume — vulnerability is close to the surface and needs a safe container." },
    CompliantSurrender: { name:"The Gentle Giver", reason:"You keep the peace by giving in — your kindness is real, but it costs you when your own needs stay silent." },
    NeedsInhibition: { name:"The Gentle Giver", reason:"You suppress your needs to avoid burdening others — generosity that needs boundaries." },
    EmotionalInhibition: { name:"The Gentle Giver", reason:"You hide your emotions to protect others from your pain — a quiet form of care that exhausts you." },
    Overcontrol: { name:"The Control Seeker", reason:"You manage uncertainty by controlling details — order is your anchor when the world feels unpredictable." },
    PerfectionParalysis: { name:"The Control Seeker", reason:"Perfectionism freezes you — you'd rather not start than risk doing it wrong." },
    DrivePressure: { name:"The Quiet Improver", reason:"You feel anxious unless you're progressing — rest feels like falling behind." },
    AngryProtector: { name:"The Fire Wall", reason:"Anger is your emergency boundary — it flares when something crosses a line you can't articulate calmly." },
    PressureExplosion: { name:"The Fire Wall", reason:"You hold everything in until it breaks through — the explosion is release, not aggression." },
    OvercompensatorAvoidant: { name:"The Boundary Keeper", reason:"You trust only yourself — self-reliance is your fortress, but it can become a prison." },
    OvercompensatorDrive: { name:"The Quiet Improver", reason:"Under pressure, you work harder rather than ask for help — productivity is your armour." },
    TrustWound: { name:"The Vigilant Heart", reason:"Trust doesn't come easily — past experiences taught you to protect yourself first." }
  };
  if (topKey && MODE_INFLUENCES[topKey]) {
    const inf = MODE_INFLUENCES[topKey];
    if (inf.name !== influences[0].name) influences.push(inf);
    else {
      const secondKey = topModes.length > 1 ? topModes[1].key : null;
      if (secondKey && MODE_INFLUENCES[secondKey]) influences.push(MODE_INFLUENCES[secondKey]);
    }
  }
  return influences.slice(0, 2);
}

// ── DESCRIPTIONS & TEMPLATES ────────────────────────────────────

const MODE_DESC = {
  VulnerableActivation: { when:"feel overwhelmed, small, or powerless", protects:"Signals genuine distress so your system can seek safety.", cost:"Can make you feel helpless even when you have resources." },
  PunitiveInnerCritic: { when:"attack yourself with harsh self-blame", protects:"Tries to prevent future mistakes by punishing past ones.", cost:"Erodes self-worth and makes recovery from setbacks harder." },
  DetachedSelfSoother: { when:"numb out with distractions or comfort", protects:"Shields you from emotional overload by turning down the volume.", cost:"Delays processing and can create avoidance loops." },
  DetachedProtector: { when:"shut down feelings to avoid pain", protects:"Creates emotional distance so nothing can hurt you.", cost:"Blocks both pain and joy — you feel less of everything." },
  AnxiousHypervigilance: { when:"scan for signs of rejection or danger", protects:"Keeps you alert to threats before they fully arrive.", cost:"Exhausts your nervous system and amplifies false alarms." },
  Overcontrol: { when:"try to control every detail to feel safe", protects:"Creates predictability in an unpredictable world.", cost:"Rigidity blocks adaptation and increases pressure when things shift." },
  DemandingPressure: { when:"push yourself relentlessly, resenting rest", protects:"Ensures you never fall behind or waste potential.", cost:"Burns out your body and makes rest feel like failure." },
  DemandingParent: { when:"hold yourself and others to impossible standards", protects:"Aims for excellence to earn love or respect.", cost:"Nothing ever feels good enough — for you or others." },
  PerfectionParalysis: { when:"freeze because nothing feels good enough", protects:"Prevents the shame of producing imperfect work.", cost:"Keeps you stuck and unfulfilled while anxiety grows." },
  DrivePressure: { when:"feel anxious unless you're progressing", protects:"Keeps you moving toward goals and relevance.", cost:"You can't rest without guilt — downtime feels dangerous." },
  CompliantSurrender: { when:"people-please to keep the peace", protects:"Maintains harmony and avoids conflict.", cost:"Your own needs stay invisible — resentment builds silently." },
  NeedsInhibition: { when:"suppress your own needs to avoid conflict", protects:"Keeps relationships smooth by minimising friction.", cost:"You lose touch with what you actually want." },
  AngryProtector: { when:"become sharp or irritable with others", protects:"Sets emergency boundaries when you feel threatened.", cost:"Damages relationships and creates guilt cycles." },
  EmotionalInhibition: { when:"hide emotions so you won't be a burden", protects:"Protects others from your pain and protects you from vulnerability.", cost:"Isolation increases and authentic connection fades." },
  PressureExplosion: { when:"explode after holding too much inside", protects:"Releases unbearable internal pressure.", cost:"Creates damage that feeds guilt and withdrawal." },
  DetachedWithdrawal: { when:"withdraw and handle everything alone", protects:"Removes you from situations that feel overwhelming.", cost:"Builds walls that become harder to take down over time." },
  OvercompensatorAvoidant: { when:"rely only on yourself, trusting no one", protects:"Ensures you're never dependent or let down.", cost:"Loneliness grows even when people are reaching out." },
  OvercompensatorDrive: { when:"work harder instead of resting or asking for help", protects:"Proves your worth through output and achievement.", cost:"You become a machine — efficient but disconnected." },
  TrustWound: { when:"struggle to believe people will be there for you", protects:"Prevents the pain of being let down again.", cost:"Keeps real intimacy at a distance even with safe people." }
};

const ARCHETYPE_NARRATIVES = {
  Grounded: { narrative:"You move through life with a quiet steadiness that others instinctively trust. Your mind gravitates toward what's real, tested, and reliable. Where others chase novelty, you build foundations. You're the person who shows up — consistently, calmly, and without drama. This doesn't mean you lack depth; it means your depth is expressed through dependability and presence rather than intensity.", strengths:["Calm under pressure — you're the anchor when things get chaotic","Consistent and reliable — people trust your follow-through","Practical problem-solving — you focus on what actually works","Emotionally steady — you don't get swept up in reactive spirals","Patient with process — you understand that real growth takes time"], growth:["You may resist change even when it's needed — comfort zones can become traps","Expressing vulnerability may feel unnecessary, but it deepens connection","Your stability can sometimes read as rigidity to those who need flexibility"] },
  Sensitive: { narrative:"You experience the world with the volume turned up. Emotions, atmospheres, unspoken tensions — you absorb them all. This isn't weakness; it's a finely tuned perceptual system that lets you understand people at a depth most can't access. You often know what someone needs before they say it. The challenge is that this sensitivity has a cost — you carry weight that isn't always yours.", strengths:["Deep empathy — you understand people at an intuitive level","Emotional intelligence — you read rooms and relationships with precision","Creative sensitivity — your inner world is rich and nuanced","Loyalty — when you care, you care completely","Conflict awareness — you sense tension early and can de-escalate naturally"], growth:["You may absorb others' emotions and lose track of your own","Setting boundaries feels like rejection, but it's actually self-respect","Your sensitivity needs regular decompression — burnout sneaks up quietly"] },
  Driven: { narrative:"You're wired for forward motion. Goals, progress, achievement — these aren't just preferences, they're how you make sense of the world. You measure yourself by what you've built, and standing still feels like going backward. This intensity is your engine, but it can also become your prison when you can't separate your worth from your output.", strengths:["Goal clarity — you know what you're aiming for and why","Execution power — you don't just plan, you follow through","Resilience under challenge — obstacles motivate rather than stop you","High standards — your work reflects genuine care for quality","Self-discipline — you can delay gratification for long-term gain"], growth:["Your identity may be too fused with achievement — rest isn't failure","You may dismiss others who move slower, missing what they offer","Burnout is your blind spot — you'll push past your limits without noticing"] },
  Curious: { narrative:"Your mind is a pattern-recognition machine. You see connections others miss, question assumptions others accept, and think in systems rather than soundbites. You're drawn to complexity — not to show off, but because simplistic answers feel dishonest to you. Your challenge is that not everything needs to be understood before it can be experienced.", strengths:["Systems thinking — you see how parts connect to form the whole","Intellectual honesty — you question your own beliefs as much as others'","Learning agility — you absorb new frameworks quickly and deeply","Innovation — you spot opportunities hidden in complexity","Strategic patience — you think before acting, which often saves you"], growth:["Analysis paralysis — thinking can become a substitute for doing","You may undervalue emotional data because it's less 'logical'","Your need to understand everything can delay commitment and action"] },
  Expressive: { narrative:"You process life through expression. Words, images, energy, presence — you turn inner experience into something others can feel. You light up rooms not through artifice but through genuine emotional broadcast. People are drawn to your energy because it gives them permission to feel more openly too. The risk is that you may perform even when you're hurting.", strengths:["Emotional expressiveness — you make the invisible visible","Natural influence — your energy shifts group dynamics positively","Creative communication — you find unique ways to share ideas","Social intelligence — you read and respond to group energy intuitively","Authenticity — when you're real, you're magnetic"], growth:["You may confuse being seen with being understood — depth requires slowing down","Your energy can mask pain — make sure expression includes honesty, not just performance","Validation-seeking can quietly drive your behaviour if you're not careful"] },
  Independent: { narrative:"You trust yourself first — not out of arrogance, but because experience taught you that relying on others has a cost. Your autonomy isn't isolation; it's a deliberate choice to stay sovereign over your inner world. You solve problems alone, set boundaries firmly, and value freedom above almost everything. The challenge is knowing when self-reliance becomes self-imprisonment.", strengths:["Self-reliance — you can function and decide without external validation","Boundary clarity — you know where you end and others begin","Focus — fewer dependencies mean fewer distractions","Courage — you'll walk alone when the crowd is wrong","Honest self-assessment — you don't sugarcoat your own flaws"], growth:["Your independence can become isolation — connection isn't weakness","Asking for help is a skill, not a failure — practice it deliberately","You may dismiss emotional needs as unnecessary, but they're real and valid"] }
};

// ── MIND ORIENTATION COMPUTED TRAITS ────────────────────────────

function computeMindOrientation(r) {
  const isl = r.islands;
  const maxIsland = Math.max(...Object.values(isl), 1);
  const norm = k => Math.min(100, Math.round((isl[k] || 0) / maxIsland * 100));

  // Thinking Style
  const curiousVsGrounded = Math.round(((norm("Curious") - norm("Grounded")) + 100) / 2);
  const expressiveVsStructured = Math.round(((norm("Expressive") - norm("Grounded")) + 100) / 2);
  const independentVsCollab = Math.round(((norm("Independent") - norm("Sensitive")) + 100) / 2);

  // Drive & Standards
  const drivenIntensity = Math.min(100, Math.round(((isl.Driven || 0) / maxIsland * 70) + ((r.modes.DrivePressure || 0) / 7 * 30)));
  const perfSensitivity = Math.min(100, Math.round((((r.modes.PerfectionParalysis || 0) + (r.modes.DemandingParent || 0) + (r.modes.PunitiveInnerCritic || 0)) / 3 / 7) * 100));
  const flexibility = Math.min(100, Math.round((1 - (r.modes.Overcontrol || 0) / 7) * 100));

  // Emotional Texture
  const sensitivity = Math.min(100, Math.round(((isl.Sensitive || 0) / maxIsland * 60) + ((r.modes.VulnerableActivation || 0) / 7 * 40)));
  const calmUnderPressure = Math.min(100, Math.round(((r.healthyAdult / 7) * 60) + ((isl.Grounded || 0) / maxIsland * 40)));
  const ruminationRisk = Math.min(100, Math.round(((r.attachment.anxiety / 7) * 50) + ((r.modes.AnxiousHypervigilance || 0) / 7 * 50)));

  return {
    thinking: [
      { label:"Curious vs Grounded", value: curiousVsGrounded, leftLabel:"Grounded", rightLabel:"Curious" },
      { label:"Expressive vs Structured", value: expressiveVsStructured, leftLabel:"Structured", rightLabel:"Expressive" },
      { label:"Independent vs Collaborative", value: independentVsCollab, leftLabel:"Collaborative", rightLabel:"Independent" },
    ],
    drive: [
      { label:"Driven Intensity", value: drivenIntensity },
      { label:"Perfection Sensitivity", value: perfSensitivity },
      { label:"Flexibility", value: flexibility },
    ],
    emotional: [
      { label:"Sensitivity", value: sensitivity },
      { label:"Calm Under Pressure", value: calmUnderPressure },
      { label:"Rumination Risk", value: ruminationRisk },
    ]
  };
}

function meterLevel(v) {
  if (v <= 25) return "Low"; if (v <= 50) return "Moderate"; if (v <= 75) return "High"; return "Very High";
}

// ── YOU IN CONTEXT GENERATOR ────────────────────────────────────

function generateYouInContext(r) {
  const pri = r.primaryIsland, sec = r.secondaryIsland;
  const anx = r.attachment.anxiety, avd = r.attachment.avoidance;
  const nb = r.needsBalance;
  const tm0 = r.topModes.length > 0 ? r.topModes[0].key : "";
  const ha = r.healthyAdult;

  const blocks = [];

  // Relationships
  const relBullets = [];
  if (pri === "Sensitive" || sec === "Sensitive") relBullets.push("You pick up on emotional shifts before anyone says a word.");
  if (pri === "Grounded" || sec === "Grounded") relBullets.push("You bring stability to relationships — people feel safe around you.");
  if (pri === "Independent" || sec === "Independent") relBullets.push("You need space in relationships and may pull back when things feel too close.");
  if (pri === "Expressive" || sec === "Expressive") relBullets.push("You express care openly and notice when others don't match your energy.");
  if (anx > 4.5) relBullets.push("You tend to monitor relationship signals closely — silence can feel like rejection.");
  if (avd > 4.5) relBullets.push("You may keep emotional distance as a default, even with people you trust.");
  if (anx <= 3.5 && avd <= 3.5) relBullets.push("You're relatively secure in closeness — you can tolerate uncertainty without spiralling.");
  if (nb.relatedness < -0.1) relBullets.push("You may feel unseen even in close relationships — a gap between being present and being understood.");
  blocks.push({ title:"In Relationships", bullets: relBullets.slice(0, 7) });

  // Decisions
  const decBullets = [];
  if (pri === "Curious" || sec === "Curious") decBullets.push("You gather more data than most before deciding — thoroughness is your default.");
  if (pri === "Driven" || sec === "Driven") decBullets.push("You decide fast when the goal is clear — hesitation frustrates you.");
  if (pri === "Grounded" || sec === "Grounded") decBullets.push("You favour practical, low-risk choices grounded in what's worked before.");
  if (pri === "Independent" || sec === "Independent") decBullets.push("You prefer to decide alone — too many opinions cloud your clarity.");
  if (nb.autonomy < -0.1) decBullets.push("You may avoid decisions to sidestep the pressure of being responsible for the outcome.");
  if (nb.competence < -0.1) decBullets.push("Fear of making the wrong choice can freeze you — perfectionism disguised as caution.");
  if (["Overcontrol","PerfectionParalysis"].includes(tm0)) decBullets.push("You may over-research or over-plan as a way to feel safe before committing.");
  if (ha > 5) decBullets.push("Your Healthy Adult voice helps you weigh options without catastrophising.");
  blocks.push({ title:"When Making Decisions", bullets: decBullets.slice(0, 7) });

  // Learning
  const learnBullets = [];
  if (pri === "Curious" || sec === "Curious") learnBullets.push("You learn best by understanding the system behind the facts — not just memorising.");
  if (pri === "Sensitive" || sec === "Sensitive") learnBullets.push("You absorb learning through emotional connection — dry content loses you fast.");
  if (pri === "Driven" || sec === "Driven") learnBullets.push("You're motivated when learning has a clear payoff or skill-building trajectory.");
  if (pri === "Expressive" || sec === "Expressive") learnBullets.push("You learn by teaching or sharing — you process by externalising ideas.");
  if (pri === "Independent" || sec === "Independent") learnBullets.push("You prefer self-directed learning — structured courses may feel constraining.");
  if (pri === "Grounded" || sec === "Grounded") learnBullets.push("Step-by-step methods suit you — you build mastery through repetition and practice.");
  if (nb.competence > 0.2) learnBullets.push("You trust your ability to learn new things — challenge feels stimulating rather than threatening.");
  if (nb.competence < -0.1) learnBullets.push("You may avoid learning new skills if failure feels too personal.");
  blocks.push({ title:"When Learning", bullets: learnBullets.slice(0, 7) });

  // Under Stress
  const stressBullets = [];
  if (r.topModes.length > 0) stressBullets.push(`Your first reflex under stress is to ${MODE_DESC[r.topModes[0].key]?.when || "activate a protective pattern"}.`);
  if (r.topModes.length > 1) stressBullets.push(`Your secondary pattern is to ${MODE_DESC[r.topModes[1].key]?.when || "shift into another protective mode"}.`);
  if (anx > 4.5) stressBullets.push("Stress amplifies your attachment alarm — you may seek reassurance urgently.");
  if (avd > 4.5) stressBullets.push("Under pressure, you default to isolation — even when support is available.");
  if (pri === "Driven") stressBullets.push("You respond to stress by working harder — productivity becomes your coping mechanism.");
  if (pri === "Sensitive") stressBullets.push("Stress hits you somatically — you feel it in your body before your mind catches up.");
  if (ha > 5) stressBullets.push("Your Healthy Adult is relatively strong — you can often pause before reacting.");
  if (r.resilience > 5) stressBullets.push("You recover from setbacks without losing your core sense of self.");
  blocks.push({ title:"Under Stress", bullets: stressBullets.slice(0, 7) });

  // Habit Change
  const habitBullets = [];
  if (pri === "Driven" || sec === "Driven") habitBullets.push("You start strong with new habits but risk burning out through over-intensity.");
  if (pri === "Grounded" || sec === "Grounded") habitBullets.push("You sustain habits well once they're routinised — consistency is your strength.");
  if (pri === "Curious" || sec === "Curious") habitBullets.push("You need to understand why a habit matters, or you'll silently drop it.");
  if (["PerfectionParalysis","Overcontrol"].includes(tm0)) habitBullets.push("Perfectionism sabotages habit change — incomplete progress feels like failure.");
  if (["DetachedSelfSoother","DetachedProtector"].includes(tm0)) habitBullets.push("Old comfort habits pull you back when stress rises — awareness is your first defence.");
  if (nb.autonomy < -0.1) habitBullets.push("You may abandon habits that feel imposed rather than chosen — ownership matters.");
  if (nb.competence < -0.1) habitBullets.push("Past failures at habit change may make you sceptical — start smaller than you think.");
  if (ha > 4) habitBullets.push("Your Healthy Adult can anchor new habits if you frame them as choices, not obligations.");
  blocks.push({ title:"When Trying to Change Habits", bullets: habitBullets.slice(0, 7) });

  return blocks;
}

// ── GROWTH BLUEPRINT GENERATOR ──────────────────────────────────

function generateGrowthBlueprint(r) {
  const topKey = r.topModes.length > 0 ? r.topModes[0].key : null;
  const nb = r.needsBalance;
  let weakestNeed = "autonomy", weakestVal = 2;
  ["autonomy","competence","relatedness"].forEach(d => { if (nb[d] < weakestVal) { weakestVal = nb[d]; weakestNeed = d; } });

  const criticModes = ["PunitiveInnerCritic","DemandingParent","DemandingPressure"];
  const detachModes = ["DetachedProtector","DetachedWithdrawal","DetachedSelfSoother"];
  const anxiousModes = ["AnxiousHypervigilance","VulnerableActivation"];
  const controlModes = ["Overcontrol","PerfectionParalysis","DrivePressure"];
  const peopleModes = ["CompliantSurrender","NeedsInhibition","EmotionalInhibition"];

  let lever = { title:"", explanation:"", actions:[], boundary:"", trap:"" };
  if (topKey && criticModes.includes(topKey)) {
    lever = { title:"Shift from punishment to standards + care", explanation:`Your ${camelToWords(topKey)} pattern drives you hard, but punishing yourself for every misstep erodes resilience. The lever: keep the standards, soften the voice.`, actions:["Once a day, catch a self-critical thought and rewrite it as advice you'd give a friend.","After a mistake, say: \"That was hard, and I'm still okay.\"","Each evening, name one thing you handled well — even something small."], boundary:"\"I can hold myself to high standards without punishing myself for being human.\"", trap:"Trying to be perfect at self-compassion — that's the same pattern in disguise." };
  } else if (topKey && detachModes.includes(topKey)) {
    lever = { title:"Reconnect through small honesty", explanation:`Your ${camelToWords(topKey)} pattern shields you from pain by shutting down or numbing. The lever: start with tiny acts of emotional honesty — not big reveals.`, actions:["Share one real feeling with someone this week — even just \"I had a hard day.\"","When you reach for a distraction, pause for 10 seconds and notice what you're avoiding.","Write down one emotion you felt today that you normally wouldn't name."], boundary:"\"I can let someone see me without giving them everything.\"", trap:"Confusing isolation with peace — detachment feels calm but keeps you stuck." };
  } else if (topKey && anxiousModes.includes(topKey)) {
    lever = { title:"Calm the alarm before seeking reassurance", explanation:`Your ${camelToWords(topKey)} pattern keeps your threat-detection system on high alert. The lever: learn to soothe the alarm before acting on it.`, actions:["When anxiety spikes, place a hand on your chest and take 3 slow breaths before reaching out.","Write down what you're afraid of — then ask: is this actually happening right now?","Practice waiting 20 minutes before sending a reassurance-seeking message."], boundary:"\"I can feel anxious and still choose not to act from that place.\"", trap:"Seeking constant reassurance — it soothes momentarily but reinforces the alarm." };
  } else if (topKey && controlModes.includes(topKey)) {
    lever = { title:"Act at 70% clarity", explanation:`Your ${camelToWords(topKey)} pattern demands certainty before action. The lever: learn to move before you're fully ready — momentum creates clarity faster than planning.`, actions:["Start one task this week at 'good enough' instead of waiting for perfect conditions.","Set a 15-minute timer for a task you've been avoiding — stop when it rings.","At day's end, write one thing you progressed on, even imperfectly."], boundary:"\"I don't need certainty to begin. Starting is enough.\"", trap:"Replacing one form of control with another — flexibility is the goal, not a new system." };
  } else if (topKey && peopleModes.includes(topKey)) {
    lever = { title:"Practise voicing one need per day", explanation:`Your ${camelToWords(topKey)} pattern keeps your needs hidden, prioritising others' comfort. The lever: start naming what you need — even silently at first.`, actions:["Say \"I need a moment\" before automatically agreeing to something.","Identify one thing you did purely because you wanted to, not because someone expected it.","Write down one need you usually suppress and share it with someone safe."], boundary:"\"Saying what I need is not selfish — it's honest.\"", trap:"Swinging to the opposite extreme — being aggressive rather than assertive." };
  } else {
    lever = { title:"Strengthen your Healthy Adult voice", explanation:"Your stress patterns are relatively balanced, but strengthening your inner adult — the part that can observe without reacting — will make the biggest difference.", actions:["When a stress pattern shows up, name it: \"That's my [pattern], not my whole self.\"","Once a day, ask: \"What would my calmest self do right now?\"","Do one thing this week that aligns with how you want to live, not how you're expected to."], boundary:"\"I'm allowed to respond differently than I always have.\"", trap:"Expecting change to feel comfortable — growth often starts with mild discomfort." };
  }

  // Reflection prompts
  const prompts = [];
  if (nb.autonomy < -0.1) prompts.push({ id:"bp-aut", text:"Where do you feel most pressured or controlled right now? What would 10% more choice look like?" });
  if (nb.relatedness < -0.1) prompts.push({ id:"bp-rel", text:"When was the last time you felt truly seen? What made that moment different?" });
  if (nb.competence < -0.1) prompts.push({ id:"bp-comp", text:"What challenge are you avoiding because you're afraid you'll fail? What would 'good enough' look like?" });
  if (r.attachment.anxiety > 4.5) prompts.push({ id:"bp-anx", text:"When you feel the urge to check if someone still cares, what are you really looking for?" });
  if (r.attachment.avoidance > 4.5) prompts.push({ id:"bp-avd", text:"Think of someone you trust. What would change if you let them see one thing you usually keep hidden?" });
  const fallbackPrompts = [
    { id:"bp-stress", text:"Think of the last time you felt overwhelmed. What was the first thing you did — was it a choice or a reflex?" },
    { id:"bp-island", text:`Your primary pattern is ${r.primaryIsland}. When does it serve you, and when does it hold you back?` },
    { id:"bp-adult", text:"Imagine your wisest self giving you advice. What would they say about this week?" }
  ];
  for (const fb of fallbackPrompts) { if (prompts.length >= 3) break; if (!prompts.find(p => p.id === fb.id)) prompts.push(fb); }

  // Worlds
  const worlds = [];
  let refReason = "Your patterns suggest depth of thought";
  if (r.topModes.length > 0) refReason = `Your ${camelToWords(r.topModes[0].key)} pattern would benefit from structured reflection`;
  worlds.push({ name:"Reflection World", icon:"🪞", desc:"Guided journaling and inner dialogue exercises.", reason:refReason });
  let histReason = "Learning through stories builds pattern recognition";
  if (r.primaryIsland === "Curious" || r.primaryIsland === "Sensitive") histReason = `As a ${r.primaryIsland} type, you learn naturally through other people's stories`;
  worlds.push({ name:"History World", icon:"📜", desc:"Wisdom through stories of real people who faced similar patterns.", reason:histReason });
  let decReason = "Practise making values-aligned choices under pressure";
  if (nb.autonomy < 0) decReason = "Your under-nourished autonomy need means practising intentional decisions would help most";
  worlds.push({ name:"Decision World", icon:"⚖️", desc:"Clarity through ethical dilemmas and scenario-based choices.", reason:decReason });

  return { lever, prompts: prompts.slice(0, 3), worlds };
}

// ── CONNECTION LABEL ────────────────────────────────────────────

function getConnectionLabel(anx, avd) {
  if (anx <= 4 && avd <= 4) return { label:"Grounded Secure", desc:"You feel relatively comfortable with closeness and independence." };
  if (anx > 4 && avd <= 4) return { label:"Reassurance-Seeking", desc:"You value connection deeply and notice quickly when it feels at risk." };
  if (anx <= 4 && avd > 4) return { label:"Self-Protective", desc:"You safeguard your independence, sometimes keeping emotional walls up." };
  return { label:"Guarded & Sensitive", desc:"You want closeness but something in you pulls back to stay safe." };
}

function getConnectionHelp(nb) {
  let weakest = "autonomy", weakVal = 2;
  ["autonomy","competence","relatedness"].forEach(d => { if (nb[d] < weakVal) { weakVal = nb[d]; weakest = d; } });
  const helps = {
    autonomy: ["Give yourself permission to choose differently — even small choices count","Notice where you're performing obligation vs genuine desire"],
    competence: ["Start with challenges you can complete in under 15 minutes — stack small wins","Separate 'not good enough' feelings from actual evidence"],
    relatedness: ["Initiate one honest moment with someone safe this week","Let yourself be seen before you feel ready — start small"]
  };
  return { need: weakest, tips: helps[weakest] || helps.autonomy };
}

// ── COPY SUMMARY ────────────────────────────────────────────────

function buildTextSummary(r) {
  const conn = getConnectionLabel(r.attachment.anxiety, r.attachment.avoidance);
  const tm = r.topModes.map(m => camelToWords(m.key) + " (" + m.score.toFixed(1) + "/7)").join(", ");
  return `TestYourGenius — My Report\n\nArchetype: ${r.archetypePrimary.name}\nPrimary Island: ${r.primaryIsland}\nSecondary Island: ${r.secondaryIsland}\nConfidence: ${r.confidence.level}\n\nNeeds Balance:\n  Autonomy: ${r.needsBalance.autonomy > 0 ? "+" : ""}${r.needsBalance.autonomy.toFixed(2)}\n  Competence: ${r.needsBalance.competence > 0 ? "+" : ""}${r.needsBalance.competence.toFixed(2)}\n  Relatedness: ${r.needsBalance.relatedness > 0 ? "+" : ""}${r.needsBalance.relatedness.toFixed(2)}\n\nConnection: ${conn.label}\n  Anxiety: ${r.attachment.anxiety.toFixed(1)}/7\n  Avoidance: ${r.attachment.avoidance.toFixed(1)}/7\n\nTop Stress Modes: ${tm}\nHealthy Adult: ${r.healthyAdult.toFixed(1)}/7 | Resilience: ${r.resilience.toFixed(1)}/7\n\nThis is not a diagnosis — it's a map for self-understanding.`;
}

// ── REFLECTION STORAGE ──────────────────────────────────────────

const REFLECTION_KEY = "tyg_reflections";
function loadReflections() { try { const d = localStorage.getItem(REFLECTION_KEY); return d ? JSON.parse(d) : {}; } catch(e) { return {}; } }
function saveReflection(id, text) { const all = loadReflections(); all[id] = { text, timestamp: Date.now() }; try { localStorage.setItem(REFLECTION_KEY, JSON.stringify(all)); } catch(e) {} }

// ── REPORT NAV SECTIONS ─────────────────────────────────────────

const REPORT_SECTIONS = [
  { id:"sec-overview", label:"Overview", icon:"◉" },
  { id:"sec-archetype", label:"Archetype", icon:"✦" },
  { id:"sec-mind", label:"Mind", icon:"◎" },
  { id:"sec-connection", label:"Connection", icon:"∞" },
  { id:"sec-stress", label:"Stress", icon:"⚡" },
  { id:"sec-context", label:"In Context", icon:"◈" },
  { id:"sec-growth", label:"Growth", icon:"↗" },
];

// ══════════════════════════════════════════════════════════════════
//  RENDER REPORT
// ══════════════════════════════════════════════════════════════════

function renderResults() {
  progressBar.style.display = "none";
  footerEl.style.display = "none";
  document.getElementById("assessment-app").classList.add("report-mode");

  const raw = computeResults();
  const r = normalizeResults(raw);
  const mind = computeMindOrientation(r);
  const connStyle = getConnectionLabel(r.attachment.anxiety, r.attachment.avoidance);
  const connHelp = getConnectionHelp(r.needsBalance);
  const context = generateYouInContext(r);
  const blueprint = generateGrowthBlueprint(r);
  const savedReflections = loadReflections();
  const arch = ARCHETYPE_NARRATIVES[r.primaryIsland] || ARCHETYPE_NARRATIVES.Grounded;

  // helpers
  const needsDims = ["autonomy","competence","relatedness"];
  const needsLabelsMap = { autonomy:"Autonomy", competence:"Competence", relatedness:"Relatedness" };
  let highestNeed = needsDims[0], highestVal = -2, lowestNeed = needsDims[0], lowestVal = 2;
  needsDims.forEach(d => {
    if (r.needsBalance[d] > highestVal) { highestVal = r.needsBalance[d]; highestNeed = d; }
    if (r.needsBalance[d] < lowestVal) { lowestVal = r.needsBalance[d]; lowestNeed = d; }
  });

  // ── Build sidebar ──
  let sidebarHtml = `<nav class="rpt-sidebar" id="rpt-sidebar" role="navigation" aria-label="Report sections"><ul>`;
  REPORT_SECTIONS.forEach((s, i) => {
    sidebarHtml += `<li><a href="#${s.id}" class="rpt-nav-link${i === 0 ? ' active' : ''}" data-section="${s.id}"><span class="rpt-nav-icon">${s.icon}</span><span class="rpt-nav-text">${s.label}</span></a></li>`;
  });
  sidebarHtml += `</ul></nav>`;

  // ── Build mobile tabs ──
  let tabsHtml = `<div class="rpt-tabs" id="rpt-tabs" role="tablist" aria-label="Report sections">`;
  REPORT_SECTIONS.forEach((s, i) => {
    tabsHtml += `<button class="rpt-tab${i === 0 ? ' active' : ''}" data-section="${s.id}" role="tab" aria-selected="${i === 0}">${s.label}</button>`;
  });
  tabsHtml += `</div>`;

  // ── SECTION 1: OVERVIEW ──
  const fuelLabel = needsLabelsMap[highestNeed];
  const drainLabel = needsLabelsMap[lowestNeed];
  const topModeLabel = r.topModes.length > 0 ? camelToWords(r.topModes[0].key) : "—";

  let s1 = `<section class="rpt-section" id="sec-overview">
    <div class="rpt-hero">
      <p class="rpt-hero-label">Your Report</p>
      <h1 class="rpt-hero-name">${r.archetypePrimary.name}</h1>
      <p class="rpt-hero-sub">A map of patterns — not a diagnosis.</p>
      <div class="rpt-pills"><span class="rpt-pill rpt-pill--pri">${r.primaryIsland}</span><span class="rpt-pill rpt-pill--sec">${r.secondaryIsland}</span></div>
      <div class="rpt-confidence">
        <span class="rpt-badge rpt-badge--${r.confidence.level.toLowerCase()}">${r.confidence.level} Confidence</span>
        <button class="rpt-acc-toggle rpt-conf-why" aria-expanded="false" data-target="conf-detail">Why?</button>
      </div>
      <div class="rpt-acc-body" id="conf-detail" hidden><p>${r.confidence.reason}</p></div>
    </div>
    <div class="rpt-highlights">
      <div class="rpt-hl-card rpt-hl-card--fuel"><span class="rpt-hl-icon">⚡</span><span class="rpt-hl-label">Strongest Fuel</span><strong>${fuelLabel}</strong></div>
      <div class="rpt-hl-card rpt-hl-card--drain"><span class="rpt-hl-icon">🩸</span><span class="rpt-hl-label">Main Drain</span><strong>${drainLabel}</strong></div>
      <div class="rpt-hl-card rpt-hl-card--stress"><span class="rpt-hl-icon">🛡️</span><span class="rpt-hl-label">Top Stress Mode</span><strong>${topModeLabel}</strong></div>
    </div>
  </section>`;

  // ── SECTION 2: ARCHETYPE & INFLUENCES ──
  let s2 = `<section class="rpt-section" id="sec-archetype">
    <h2 class="rpt-title">Archetype &amp; Influences</h2>
    <div class="rpt-arch-primary">
      <h3 class="rpt-arch-name">${r.archetypePrimary.name}</h3>
      <p class="rpt-arch-narrative">${arch.narrative}</p>
      <div class="rpt-arch-cols">
        <div class="rpt-arch-col">
          <h4>Strengths</h4><ul>${arch.strengths.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div class="rpt-arch-col rpt-arch-col--growth">
          <h4>Growth Needs</h4><ul>${arch.growth.map(s => `<li>${s}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
    <h3 class="rpt-subtitle">Secondary Influences</h3>
    <div class="rpt-influences">`;
  r.archetypeSecondary.forEach(inf => {
    s2 += `<div class="rpt-influence-card"><h4>${inf.name}</h4><p>${inf.reason}</p></div>`;
  });
  s2 += `</div></section>`;

  // ── SECTION 3: MIND ORIENTATION ──
  function dualMeter(item) {
    return `<div class="rpt-meter-dual"><span class="rpt-meter-edge">${item.leftLabel}</span><div class="rpt-meter-track"><div class="rpt-meter-thumb" style="left:${item.value}%"></div><div class="rpt-meter-mid"></div></div><span class="rpt-meter-edge">${item.rightLabel}</span></div>`;
  }
  function singleMeter(item) {
    const lvl = meterLevel(item.value);
    return `<div class="rpt-meter-single"><div class="rpt-meter-info"><span>${item.label}</span><span class="rpt-meter-lvl">${lvl} · ${item.value}%</span></div><div class="rpt-meter-track rpt-meter-track--fill"><div class="rpt-meter-bar" style="width:${item.value}%"></div></div></div>`;
  }

  let s3 = `<section class="rpt-section" id="sec-mind">
    <h2 class="rpt-title">Mind Orientation</h2>
    <div class="rpt-mind-grid">
      <div class="rpt-card"><h4>Thinking Style</h4>${mind.thinking.map(dualMeter).join("")}</div>
      <div class="rpt-card"><h4>Drive &amp; Standards</h4>${mind.drive.map(singleMeter).join("")}</div>
      <div class="rpt-card"><h4>Emotional Texture</h4>${mind.emotional.map(singleMeter).join("")}</div>
    </div>
  </section>`;

  // ── SECTION 4: CONNECTION & NEEDS ──
  function balanceMeter(label, balance) {
    const pct = Math.max(2, Math.min(98, ((balance + 1) / 2) * 100));
    return `<div class="rpt-bal-row"><span class="rpt-bal-label">${label}</span><div class="rpt-meter-track"><div class="rpt-meter-mid"></div><div class="rpt-meter-thumb" style="left:${pct}%"></div></div><div class="rpt-bal-ends"><span>Drain</span><span>Fuel</span></div></div>`;
  }
  function attachBar(label, val) {
    const pct = Math.max(2, Math.min(98, (val / 7) * 100));
    return `<div class="rpt-meter-single"><div class="rpt-meter-info"><span>${label}</span><span class="rpt-meter-lvl">${val.toFixed(1)} / 7</span></div><div class="rpt-meter-track rpt-meter-track--fill"><div class="rpt-meter-bar" style="width:${pct}%"></div></div></div>`;
  }

  let s4 = `<section class="rpt-section" id="sec-connection">
    <h2 class="rpt-title">Connection &amp; Needs</h2>
    <div class="rpt-conn-grid">
      <div class="rpt-card"><h4>Needs Balance</h4>${balanceMeter("Autonomy", r.needsBalance.autonomy)}${balanceMeter("Competence", r.needsBalance.competence)}${balanceMeter("Relatedness", r.needsBalance.relatedness)}</div>
      <div class="rpt-card"><h4>Connection Style</h4>${attachBar("Anxiety", r.attachment.anxiety)}${attachBar("Avoidance", r.attachment.avoidance)}<div class="rpt-conn-type"><strong>${connStyle.label}</strong><p>${connStyle.desc}</p></div></div>
    </div>
    <div class="rpt-card rpt-card--help"><h4>What Helps You Most</h4><p class="rpt-help-need">Your most under-nourished need: <strong>${needsLabelsMap[connHelp.need]}</strong></p><ul>${connHelp.tips.map(t => `<li>${t}</li>`).join("")}</ul></div>
  </section>`;

  // ── SECTION 5: STRESS PATTERNS ──
  let s5 = `<section class="rpt-section" id="sec-stress">
    <h2 class="rpt-title">Stress Patterns</h2><div class="rpt-stress-list">`;
  r.topModes.forEach(m => {
    const d = MODE_DESC[m.key] || { when:"activate a protective pattern", protects:"Attempts to keep you safe.", cost:"Has long-term side effects." };
    const pct = Math.max(2, Math.min(98, (m.score / 7) * 100));
    s5 += `<div class="rpt-card rpt-stress-card">
      <div class="rpt-stress-top"><span class="rpt-stress-name">${camelToWords(m.key)}</span><span class="rpt-stress-score">${m.score.toFixed(1)}/7</span></div>
      <div class="rpt-meter-track rpt-meter-track--fill"><div class="rpt-meter-bar rpt-meter-bar--stress" style="width:${pct}%"></div></div>
      <p class="rpt-stress-line"><em>When stressed:</em> ${d.when}.</p>
      <p class="rpt-stress-line"><em>What it protects:</em> ${d.protects}</p>
      <p class="rpt-stress-line"><em>Cost:</em> ${d.cost}</p>
    </div>`;
  });
  s5 += `</div><div class="rpt-healthy-row">
    <div class="rpt-healthy-item"><span>Healthy Adult</span><strong>${r.healthyAdult.toFixed(1)}<small>/7</small></strong></div>
    <div class="rpt-healthy-item"><span>Resilience</span><strong>${r.resilience.toFixed(1)}<small>/7</small></strong></div>
  </div></section>`;

  // ── SECTION 6: YOU IN CONTEXT ──
  let s6 = `<section class="rpt-section" id="sec-context"><h2 class="rpt-title">You in Context</h2>`;
  context.forEach((block, i) => {
    s6 += `<div class="rpt-acc">
      <button class="rpt-acc-toggle" aria-expanded="${i === 0 ? 'true' : 'false'}" data-target="ctx-${i}">${block.title}</button>
      <div class="rpt-acc-body" id="ctx-${i}" ${i === 0 ? '' : 'hidden'}>
        <ul>${block.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
      </div>
    </div>`;
  });
  s6 += `</section>`;

  // ── SECTION 7: GROWTH BLUEPRINT ──
  let s7 = `<section class="rpt-section" id="sec-growth">
    <h2 class="rpt-title">Growth Blueprint</h2>
    <div class="rpt-card rpt-growth-card">
      <span class="rpt-growth-tag">7-Day Reset</span>
      <h3>${blueprint.lever.title}</h3>
      <p class="rpt-growth-exp">${blueprint.lever.explanation}</p>
      <div class="rpt-growth-trap"><strong>⚠ Trap to Avoid:</strong> ${blueprint.lever.trap}</div>
      <h4>3 Micro-Actions</h4>
      <ol class="rpt-growth-actions">${blueprint.lever.actions.map(a => `<li>${a}</li>`).join("")}</ol>
      <h4>Boundary Script</h4>
      <blockquote class="rpt-growth-bq">${blueprint.lever.boundary}</blockquote>
    </div>
    <h3 class="rpt-subtitle">Reflection Prompts</h3>
    <div class="rpt-prompts">`;
  blueprint.prompts.forEach(p => {
    const saved = savedReflections[p.id];
    s7 += `<div class="rpt-prompt-card">
      <p>${p.text}</p>
      <button class="rpt-prompt-btn" data-prompt-id="${p.id}" aria-expanded="${saved ? 'true' : 'false'}">${saved ? 'Edit Response' : 'Write a Response'}</button>
      <div class="rpt-prompt-editor" id="ed-${p.id}" ${saved ? '' : 'hidden'}>
        <textarea class="rpt-prompt-ta" data-prompt-id="${p.id}" placeholder="Write freely — stays on your device…">${saved ? saved.text : ''}</textarea>
        <button class="rpt-prompt-save" data-prompt-id="${p.id}">Save</button>
      </div>
    </div>`;
  });
  s7 += `</div>
    <h3 class="rpt-subtitle">Where to Go Next</h3>
    <div class="rpt-worlds">`;
  blueprint.worlds.forEach(w => {
    s7 += `<div class="rpt-world-card"><span class="rpt-world-icon">${w.icon}</span><h4>${w.name}</h4><p>${w.desc}</p><p class="rpt-world-reason">Best for you because: ${w.reason}</p><button class="rpt-world-btn" onclick="alert('Coming soon.')">Explore</button></div>`;
  });
  s7 += `</div>
    <div class="rpt-footer-actions">
      <button class="rpt-action-btn" disabled>Export PDF — coming soon</button>
      <button class="rpt-action-btn" id="btn-copy-result">Copy Summary</button>
      <button class="rpt-action-btn rpt-action-btn--muted" id="btn-retake">Retake Assessment</button>
    </div>
    <p class="rpt-footer-note">Your data stays on this device. Nothing is sent anywhere.</p>
  </section>`;

  // ── ASSEMBLE ──
  const mainHtml = `${tabsHtml}${sidebarHtml}<main class="rpt-main" id="rpt-main">${s1}${s2}${s3}${s4}${s5}${s6}${s7}</main>`;

  bodyEl.innerHTML = mainHtml;
  bodyEl.scrollTop = 0;
  window.scrollTo(0, 0);

  // ── EVENT BINDINGS ──
  bindReportEvents(r);
}

function bindReportEvents(r) {
  // Accordion toggles
  document.querySelectorAll(".rpt-acc-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const body = document.getElementById(targetId);
      if (!body) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      body.hidden = expanded;
    });
  });

  // Sidebar navigation
  const sidebar = document.getElementById("rpt-sidebar");
  const main = document.getElementById("rpt-main");
  if (sidebar && main) {
    sidebar.querySelectorAll(".rpt-nav-link").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const secId = link.dataset.section;
        const sec = document.getElementById(secId);
        if (sec) {
          sec.scrollIntoView({ behavior: "smooth", block: "start" });
          sidebar.querySelectorAll(".rpt-nav-link").forEach(l => l.classList.remove("active"));
          link.classList.add("active");
          document.querySelectorAll(".rpt-tab").forEach(t => { t.classList.toggle("active", t.dataset.section === secId); t.setAttribute("aria-selected", t.dataset.section === secId); });
        }
      });
    });
  }

  // Mobile tabs
  document.querySelectorAll(".rpt-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const secId = tab.dataset.section;
      const sec = document.getElementById(secId);
      if (sec) {
        sec.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelectorAll(".rpt-tab").forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", false); });
        tab.classList.add("active"); tab.setAttribute("aria-selected", true);
        if (sidebar) sidebar.querySelectorAll(".rpt-nav-link").forEach(l => l.classList.toggle("active", l.dataset.section === secId));
      }
    });
  });

  // Scroll spy
  if (main) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll(".rpt-nav-link").forEach(l => l.classList.toggle("active", l.dataset.section === id));
          document.querySelectorAll(".rpt-tab").forEach(t => { t.classList.toggle("active", t.dataset.section === id); t.setAttribute("aria-selected", t.dataset.section === id); });
          // scroll tab into view
          const activeTab = document.querySelector(`.rpt-tab[data-section="${id}"]`);
          if (activeTab) activeTab.scrollIntoView({ behavior:"smooth", block:"nearest", inline:"center" });
        }
      });
    }, { rootMargin:"-20% 0px -70% 0px", threshold: 0 });
    REPORT_SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
  }

  // Reflection prompts
  document.querySelectorAll(".rpt-prompt-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.dataset.promptId;
      const editor = document.getElementById("ed-" + pid);
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !expanded);
      editor.hidden = expanded;
      if (!expanded) editor.querySelector("textarea").focus();
    });
  });
  document.querySelectorAll(".rpt-prompt-save").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.dataset.promptId;
      const ta = document.querySelector(`textarea[data-prompt-id="${pid}"]`);
      saveReflection(pid, ta.value);
      btn.textContent = "Saved ✓"; setTimeout(() => { btn.textContent = "Save"; }, 1500);
    });
  });

  // Copy
  const copyBtn = document.getElementById("btn-copy-result");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const summary = buildTextSummary(r);
      navigator.clipboard.writeText(summary).then(() => {
        copyBtn.textContent = "Copied ✓"; setTimeout(() => { copyBtn.textContent = "Copy Summary"; }, 2000);
      }).catch(() => {
        const ta = document.createElement("textarea"); ta.value = summary; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
        copyBtn.textContent = "Copied ✓"; setTimeout(() => { copyBtn.textContent = "Copy Summary"; }, 2000);
      });
    });
  }

  // Retake
  const retakeBtn = document.getElementById("btn-retake");
  if (retakeBtn) {
    retakeBtn.addEventListener("click", () => {
      document.getElementById("assessment-app").classList.remove("report-mode");
      clearProgress(); renderRouter();
    });
  }
}

// ── UTILS ───────────────────────────────────────────────────────

function camelToWords(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^ /, '');
}

// ── BOOT ────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", initAssessment);
