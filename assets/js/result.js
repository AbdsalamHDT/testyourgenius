/* ================================================================
   result.js — Report Page Engine
   Loads result data from localStorage, renders the full report.
   Depends on tyg-data.js being loaded first.
   ================================================================ */

(function () {
  'use strict';

  // ── DOM REFERENCES ──────────────────────────────────────────────

  const bodyEl = document.getElementById('result-body');
  const shellEl = document.getElementById('result-shell');

  // ── FALLBACK ────────────────────────────────────────────────────

  function showFallback() {
    if (bodyEl) {
      bodyEl.innerHTML = `
        <div class="result-fallback">
          <div class="result-fallback-icon">✦</div>
          <h2>No Results Found</h2>
          <p>It looks like you haven't completed the assessment yet, or your result data has expired.</p>
          <a href="assessment.html" class="btn-primary" style="display:inline-block;text-decoration:none;margin-top:var(--space-5);">Start the Assessment</a>
        </div>`;
    }
  }

  // ── INIT ────────────────────────────────────────────────────────

  function initResult() {
    if (!bodyEl) return;

    const stored = loadResultData();
    if (!stored || !stored.answers || Object.keys(stored.answers).length === 0) {
      showFallback();
      return;
    }

    // Compute everything from saved answers
    const answers = stored.answers;
    const raw = computeResults(answers);
    const r = normalizeResults(raw);

    // Add report-mode class to shell
    if (shellEl) shellEl.classList.add('report-mode');

    renderReport(r);
  }

  // ══════════════════════════════════════════════════════════════════
  //  RENDER REPORT (migrated from assessment.js renderResults)
  // ══════════════════════════════════════════════════════════════════

  function renderReport(r) {
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
        <div class="rpt-hero-icon-wrap" data-island="${r.primaryIsland}">
          <canvas class="archetype-particles"></canvas>
          ${getArchetypeIconHtml(r.archetypePrimary.name, 120, false)}
        </div>
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
        <div class="rpt-arch-icon-wrap" data-island="${r.primaryIsland}">
          <canvas class="archetype-particles"></canvas>
          ${getArchetypeIconHtml(r.archetypePrimary.name, 88, true)}
        </div>
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
      s2 += `<div class="rpt-influence-card">${getArchetypeIconHtml(inf.name, 40, true)}<div><h4>${inf.name}</h4><p>${inf.reason}</p></div></div>`;
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
    const worldVideoMap = { "Reflection World": "world-mirror", "History World": "world-history", "Decision World": "world-decision" };
    blueprint.worlds.forEach(w => {
      const vid = worldVideoMap[w.name] || "world-mirror";
      s7 += `<div class="rpt-world-card">
        <div class="rpt-world-media">
          <video class="world-video" autoplay muted loop playsinline preload="metadata">
            <source src="assets/videos/worlds/${vid}.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="rpt-world-body">
          <h4>${w.name}</h4>
          <p>${w.desc}</p>
          <p class="rpt-world-reason">Best for you because: ${w.reason}</p>
          <button class="rpt-world-btn" onclick="alert('Coming soon.')">Explore</button>
        </div>
      </div>`;
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

    // ── LAUNCH PARTICLES ──
    initArchetypeParticles();
  }

  // ══════════════════════════════════════════════════════════════════
  //  EVENT BINDINGS (migrated from assessment.js bindReportEvents)
  // ══════════════════════════════════════════════════════════════════

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
        clearResultData();
        try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
        window.location.href = "assessment.html";
      });
    }
  }

  // ── BOOT ────────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initResult);
  } else {
    initResult();
  }

})();
