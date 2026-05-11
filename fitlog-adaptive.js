;(function (global) {
  'use strict';

  // ── Tuneable constants ──────────────────────────────────────────────────────

  const STORAGE_KEY_WORKOUTS  = 'fitlog_workouts';   // your app's workout log key
  const STORAGE_KEY_PR        = 'fitlog_adaptive_pr'; // written by this module
  const RECOVERY_HOURS        = 48;                  // min rest before re-training a muscle
  const STALL_SESSIONS        = 3;                   // sessions without progress = stall
  const WEIGHT_KEY            = 'weight';            // key inside a set object for weight
  const REPS_KEY              = 'reps';              // key inside a set object for reps

  // Muscle-group → exercise name keywords (extend freely)
  const MUSCLE_MAP = {
    chest:     ['bench', 'press', 'fly', 'flye', 'push up', 'pushup', 'dip', 'pec'],
    back:      ['row', 'pull', 'lat', 'deadlift', 'chin', 'pulldown', 'shrug', 'hyperextension'],
    shoulders: ['shoulder', 'overhead', 'ohp', 'lateral', 'front raise', 'arnold', 'upright'],
    biceps:    ['bicep', 'curl', 'hammer', 'preacher', 'concentration'],
    triceps:   ['tricep', 'pushdown', 'skull', 'kickback', 'extension', 'close grip'],
    legs:      ['squat', 'leg', 'lunge', 'hack', 'step up', 'glute', 'hip thrust',
                'rdl', 'romanian', 'leg press', 'calf', 'raise'],
    core:      ['plank', 'crunch', 'sit up', 'ab ', 'oblique', 'hanging', 'russian', 'core'],
    cardio:    ['run', 'bike', 'cycle', 'swim', 'jump', 'burpee', 'elliptic', 'treadmill'],
  };

  // ── Utility ─────────────────────────────────────────────────────────────────

  function loadWorkouts() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_WORKOUTS) || '[]');
    } catch { return []; }
  }

  function loadPRs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_PR) || '{}');
    } catch { return {}; }
  }

  function savePRs(prs) {
    localStorage.setItem(STORAGE_KEY_PR, JSON.stringify(prs));
  }

  /** Epley 1-Rep Max: weight × (1 + reps/30) */
  function epley1RM(weight, reps) {
    if (!weight || !reps || reps < 1) return 0;
    return Math.round(weight * (1 + reps / 30) * 10) / 10;
  }

  /** Best set in a workout session for one exercise (highest 1RM) */
  function bestSet(sets) {
    if (!sets || !sets.length) return null;
    return sets.reduce((best, s) => {
      const w = parseFloat(s[WEIGHT_KEY]) || 0;
      const r = parseInt(s[REPS_KEY])    || 0;
      const e = epley1RM(w, r);
      return e > best.e ? { w, r, e } : best;
    }, { w: 0, r: 0, e: 0 });
  }

  /** Returns "YYYY-MM-DD" for a Date object */
  function toDateStr(d) {
    return d.toISOString().slice(0, 10);
  }

  /** Today's date string */
  function today() { return toDateStr(new Date()); }

  /** Hours between two "YYYY-MM-DD" strings (rough, date-level only) */
  function hoursBetween(dateStrA, dateStrB) {
    return Math.abs(new Date(dateStrA) - new Date(dateStrB)) / 3_600_000;
  }

  /** Classify an exercise name into a muscle group */
  function muscleGroup(exerciseName) {
    const lower = (exerciseName || '').toLowerCase();
    for (const [group, keywords] of Object.entries(MUSCLE_MAP)) {
      if (keywords.some(k => lower.includes(k))) return group;
    }
    return 'other';
  }

  /** Format kg with sensible precision */
  function fmt(kg) {
    return kg % 1 === 0 ? kg + ' kg' : kg.toFixed(1) + ' kg';
  }

  // ── Core engines ────────────────────────────────────────────────────────────

  /**
   * PR ENGINE
   * Scans all workout history and maintains a PR record per exercise:
   *   { exerciseName: { weight, reps, e1rm, date } }
   * Returns { prs, newPRs } where newPRs is an array of fresh PRs found.
   */
  function runPREngine(workouts) {
    const prs    = loadPRs();
    const newPRs = [];

    for (const session of workouts) {
      for (const ex of (session.exercises || [])) {
        const name = ex.name;
        const bs   = bestSet(ex.sets);
        if (!bs || bs.e <= 0) continue;

        if (!prs[name] || bs.e > prs[name].e) {
          const isNew = !!prs[name]; // true = improvement, false = first ever
          prs[name] = { weight: bs.w, reps: bs.r, e1rm: bs.e, date: session.date };
          if (isNew) newPRs.push({ name, ...prs[name] });
        }
      }
    }

    savePRs(prs);
    return { prs, newPRs };
  }

  /**
   * PROGRESSIVE OVERLOAD ENGINE
   * For each exercise, looks at the last N sessions (STALL_SESSIONS + 1).
   * Returns an array of recommendations:
   *   { name, status, current1RM, target1RM, suggestion }
   *
   * Status values: 'progressing' | 'stalled' | 'deload' | 'new'
   */
  function runOverloadEngine(workouts) {
    // Group sessions by exercise, chronological
    const byEx = {};
    for (const session of workouts) {
      for (const ex of (session.exercises || [])) {
        if (!byEx[ex.name]) byEx[ex.name] = [];
        const bs = bestSet(ex.sets);
        if (bs && bs.e > 0) byEx[ex.name].push({ date: session.date, ...bs });
      }
    }

    const recommendations = [];

    for (const [name, sessions] of Object.entries(byEx)) {
      if (sessions.length < 2) {
        recommendations.push({
          name, status: 'new',
          current1RM: sessions[0]?.e || 0,
          target1RM: null,
          suggestion: 'Keep logging — need 2+ sessions to build a recommendation.',
        });
        continue;
      }

      const recent = sessions.slice(-STALL_SESSIONS - 1);
      const first  = recent[0].e;
      const last   = recent[recent.length - 1].e;
      const delta  = last - first;

      // Check if 1RM has improved across the window
      const improving = delta > 0.5; // more than 0.5 kg equivalent

      // Check deload condition: 1RM dropped significantly (>5%)
      const deloading = delta < -(first * 0.05);

      // Stall: window full and no meaningful progress
      const stalled = recent.length >= STALL_SESSIONS && !improving && !deloading;

      let status, suggestion, target1RM;

      if (deloading) {
        status     = 'deload';
        target1RM  = Math.round(last * 0.90 * 10) / 10;
        suggestion = `Your numbers have dipped. Consider a deload week at ~90% of current: aim for ${fmt(target1RM)} e1RM.`;
      } else if (stalled) {
        status    = 'stalled';
        // Common overload techniques
        const addWeight = Math.round((last * 1.025) * 10) / 10;
        const addRep    = recent[recent.length - 1].r + 1;
        target1RM = addWeight;
        suggestion = `Stalled for ${STALL_SESSIONS} sessions. Try: add ~2.5% weight → ~${fmt(addWeight - last)} more, or add 1 rep per set. Consider switching to a ${recent[recent.length-1].r <= 6 ? 'higher rep range (8–12)' : 'heavier range (4–6)'} this week.`;
      } else if (improving) {
        status    = 'progressing';
        target1RM = Math.round(last * 1.025 * 10) / 10;
        suggestion = `Great progression (+${fmt(delta)} e1RM). Keep adding 2–5% each session. Next target: ~${fmt(target1RM)} e1RM.`;
      } else {
        status    = 'progressing';
        target1RM = Math.round(last * 1.025 * 10) / 10;
        suggestion = `Consistent. Aim to beat ${fmt(target1RM)} e1RM next session.`;
      }

      recommendations.push({ name, status, current1RM: last, target1RM, suggestion });
    }

    return recommendations;
  }

  /**
   * MUSCLE RECOVERY TRACKER
   * Returns an object keyed by muscle group:
   *   { lastTrained: "YYYY-MM-DD", hoursAgo: number, recovered: boolean }
   */
  function runRecoveryTracker(workouts) {
    const lastByMuscle = {};
    const todayStr     = today();

    for (const session of workouts) {
      for (const ex of (session.exercises || [])) {
        const group = muscleGroup(ex.name);
        if (!lastByMuscle[group] || session.date > lastByMuscle[group]) {
          lastByMuscle[group] = session.date;
        }
      }
    }

    const recovery = {};
    for (const [group, lastDate] of Object.entries(lastByMuscle)) {
      const hoursAgo = hoursBetween(lastDate, todayStr);
      recovery[group] = {
        lastTrained: lastDate,
        hoursAgo:    Math.round(hoursAgo),
        recovered:   hoursAgo >= RECOVERY_HOURS,
      };
    }

    return recovery;
  }

  /**
   * VOLUME ANALYTICS ENGINE
   * Returns weekly set counts per muscle group for the last 4 weeks:
   *   { muscle: [week1_sets, week2_sets, week3_sets, week4_sets] }
   * week4 = current (most recent) week.
   */
  function runVolumeAnalytics(workouts) {
    const todayDate = new Date();
    const weekData  = {};

    for (const session of workouts) {
      const sessionDate = new Date(session.date);
      const weeksAgo    = Math.floor((todayDate - sessionDate) / (7 * 24 * 3_600_000));
      if (weeksAgo > 3) continue; // only last 4 weeks
      const weekIndex = 3 - weeksAgo; // 0 = 4 weeks ago, 3 = current week

      for (const ex of (session.exercises || [])) {
        const group = muscleGroup(ex.name);
        if (!weekData[group]) weekData[group] = [0, 0, 0, 0];
        weekData[group][weekIndex] += (ex.sets || []).length;
      }
    }

    // Add trend metadata
    const analytics = {};
    for (const [group, weeks] of Object.entries(weekData)) {
      const prev    = weeks[2];
      const current = weeks[3];
      const trend   = current > prev + 1 ? 'up'
                    : current < prev - 1 ? 'down'
                    : 'steady';
      analytics[group] = { weeks, trend, current, prev };
    }

    return analytics;
  }

  /**
   * SMART NEXT-SESSION BUILDER
   * Merges recovery + overload signals into a concrete list of
   * suggestions for what to train today.
   */
  function buildNextSession(recovery, overload) {
    const recovered = Object.entries(recovery)
      .filter(([, v]) => v.recovered)
      .map(([g]) => g);

    const suggestions = overload
      .filter(r => recovered.some(g => muscleGroup(r.name) === g) || recovered.length === 0)
      .filter(r => r.status !== 'new')
      .map(r => ({
        exercise:   r.name,
        suggestion: r.suggestion,
        status:     r.status,
        muscle:     muscleGroup(r.name),
      }));

    return suggestions;
  }

  // ── UI renderer ─────────────────────────────────────────────────────────────

  const PANEL_ID = 'fitlog-adaptive-panel';

  const STATUS_ICON = {
    progressing: '📈',
    stalled:     '⚠️',
    deload:      '🔽',
    new:         '🆕',
  };

  const TREND_ICON = {
    up:     '↑',
    steady: '→',
    down:   '↓',
  };

  const TREND_COLOR = {
    up:     'var(--accent-primary, #00E5BB)',
    steady: 'var(--text-secondary, #aaa)',
    down:   '#ff6b6b',
  };

  function createPanel() {
    // Remove any existing panel (e.g. on re-render)
    const existing = document.getElementById(PANEL_ID);
    if (existing) existing.remove();

    // Gather data
    const workouts   = loadWorkouts();
    const { prs }    = runPREngine(workouts);
    const overload   = runOverloadEngine(workouts);
    const recovery   = runRecoveryTracker(workouts);
    const volume     = runVolumeAnalytics(workouts);
    const nextSess   = buildNextSession(recovery, overload);

    // Build panel HTML
    const panel = document.createElement('div');
    panel.id    = PANEL_ID;
    panel.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 16px;
      width: min(92vw, 400px);
      max-height: 80vh;
      overflow-y: auto;
      background: var(--glass-bg, rgba(10,15,30,0.97));
      border: 1px solid var(--glass-border, rgba(255,255,255,0.1));
      border-radius: 20px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      z-index: 9999;
      box-shadow: 0 24px 64px rgba(0,0,0,0.6);
      display: none;
      flex-direction: column;
      font-family: 'Sora', sans-serif;
      color: var(--text-primary, #f0f0f0);
    `;

    panel.innerHTML = `
      <!-- Header -->
      <div style="
        display:flex; align-items:center; justify-content:space-between;
        padding:16px 18px 12px; border-bottom:1px solid var(--glass-border,rgba(255,255,255,0.08));
        position:sticky; top:0;
        background: var(--glass-bg, rgba(10,15,30,0.97));
        border-radius: 20px 20px 0 0;
      ">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:1.3rem">🧠</span>
          <div>
            <div style="font-weight:700;font-size:.95rem;letter-spacing:-.02em">Adaptive Coach</div>
            <div style="font-size:.7rem;color:var(--text-secondary,#888)">100% local · zero data sent</div>
          </div>
        </div>
        <button id="fitlog-adaptive-close" style="
          background:none;border:none;cursor:pointer;
          color:var(--text-secondary,#888);font-size:1.2rem;
          padding:4px 8px;border-radius:8px;
          transition:background .2s;
        " onmouseover="this.style.background='rgba(255,255,255,.08)'"
           onmouseout="this.style.background='none'">✕</button>
      </div>

      <!-- Tab bar -->
      <div id="fa-tabs" style="display:flex;gap:4px;padding:10px 14px 0;border-bottom:1px solid var(--glass-border,rgba(255,255,255,.08))">
        ${['Today','Progress','Recovery','PRs','Volume'].map((t, i) => `
          <button class="fa-tab" data-tab="${i}" style="
            flex:1; padding:6px 2px; font-size:.72rem; font-weight:600;
            background:${i===0 ? 'var(--accent-primary,#00E5BB)' : 'none'};
            color:${i===0 ? '#000' : 'var(--text-secondary,#888)'};
            border:none; border-radius:8px; cursor:pointer;
            transition: all .2s; letter-spacing:-.01em;
          ">${t}</button>
        `).join('')}
      </div>

      <!-- Tab content -->
      <div id="fa-content" style="padding:16px 18px 20px">
        ${renderToday(nextSess, recovery)}
      </div>
    `;

    document.body.appendChild(panel);

    // Tab switching
    const tabContents = [
      renderToday(nextSess, recovery),
      renderProgress(overload),
      renderRecovery(recovery),
      renderPRs(prs),
      renderVolume(volume),
    ];

    panel.querySelectorAll('.fa-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.tab);
        panel.querySelectorAll('.fa-tab').forEach((b, i) => {
          b.style.background = i === idx ? 'var(--accent-primary,#00E5BB)' : 'none';
          b.style.color      = i === idx ? '#000' : 'var(--text-secondary,#888)';
        });
        document.getElementById('fa-content').innerHTML = tabContents[idx];
      });
    });

    // Close
    document.getElementById('fitlog-adaptive-close').addEventListener('click', () => {
      panel.style.display = 'none';
    });

    return panel;
  }

  // ── Tab renderers ───────────────────────────────────────────────────────────

  function renderToday(nextSess, recovery) {
    if (!nextSess.length) {
      const needsData = !loadWorkouts().length;
      return card('📋 Today\'s Plan', `
        <p style="color:var(--text-secondary,#888);font-size:.82rem;line-height:1.6">
          ${needsData
            ? 'Log a few workouts first — the adaptive coach needs at least 2 sessions per exercise to start giving recommendations.'
            : 'All muscle groups need more rest. Good day for light cardio, stretching, or a full rest day.'}
        </p>
      `);
    }

    const rows = nextSess.slice(0, 6).map(s => `
      <div style="
        background:rgba(255,255,255,.04); border-radius:12px;
        padding:12px 14px; margin-bottom:8px;
        border-left:3px solid ${statusColor(s.status)};
      ">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <div style="font-weight:600;font-size:.88rem">${s.exercise}</div>
          <div style="display:flex;gap:6px;align-items:center">
            <span style="font-size:.65rem;padding:2px 8px;border-radius:20px;
              background:${statusColor(s.status)}22;color:${statusColor(s.status)};font-weight:700;letter-spacing:.04em">
              ${s.muscle.toUpperCase()}
            </span>
            <span>${STATUS_ICON[s.status] || ''}</span>
          </div>
        </div>
        <div style="font-size:.78rem;color:var(--text-secondary,#aaa);line-height:1.5">${s.suggestion}</div>
      </div>
    `).join('');

    return card('📋 Recommended Today', rows);
  }

  function renderProgress(overload) {
    if (!overload.length) return empty('Log some workouts to see progression analysis.');

    const byStatus = ['progressing','stalled','deload','new'];
    const sorted   = [...overload].sort((a, b) => byStatus.indexOf(a.status) - byStatus.indexOf(b.status));

    const rows = sorted.map(r => `
      <div style="
        display:flex; align-items:flex-start; gap:10px;
        padding:10px 0; border-bottom:1px solid rgba(255,255,255,.05);
      ">
        <div style="font-size:1.2rem;margin-top:2px;flex-shrink:0">${STATUS_ICON[r.status]}</div>
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:.86rem;margin-bottom:2px;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.name}</div>
          <div style="font-size:.75rem;color:var(--text-secondary,#aaa)">
            ${r.current1RM > 0 ? `e1RM: <strong style="color:${statusColor(r.status)}">${fmt(r.current1RM)}</strong>` : ''}
            ${r.target1RM   ? ` → target ${fmt(r.target1RM)}` : ''}
          </div>
        </div>
        <span style="font-size:.65rem;padding:2px 8px;border-radius:20px;white-space:nowrap;
          background:${statusColor(r.status)}22;color:${statusColor(r.status)};font-weight:700;flex-shrink:0">
          ${r.status}
        </span>
      </div>
    `).join('');

    return card('📊 Progression Analysis', rows);
  }

  function renderRecovery(recovery) {
    const groups  = Object.keys(MUSCLE_MAP);
    const entries = groups.map(g => {
      const data = recovery[g];
      if (!data) return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05)">
          <span style="text-transform:capitalize;font-size:.84rem">${g}</span>
          <span style="font-size:.75rem;color:var(--text-secondary,#aaa)">No data yet</span>
        </div>`;

      const pct     = Math.min(100, Math.round((data.hoursAgo / RECOVERY_HOURS) * 100));
      const barColor = data.recovered ? 'var(--accent-primary,#00E5BB)' : '#ff9f43';
      return `
        <div style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            <span style="text-transform:capitalize;font-size:.84rem;font-weight:600">${g}</span>
            <span style="font-size:.72rem;color:${data.recovered ? 'var(--accent-primary,#00E5BB)' : '#ff9f43'}">
              ${data.recovered ? '✅ Ready' : `⏳ ${data.hoursAgo}h / ${RECOVERY_HOURS}h`}
            </span>
          </div>
          <div style="height:5px;border-radius:10px;background:rgba(255,255,255,.08);overflow:hidden">
            <div style="height:100%;width:${pct}%;background:${barColor};border-radius:10px;transition:width .5s ease"></div>
          </div>
          <div style="font-size:.68rem;color:var(--text-secondary,#777);margin-top:3px">Last trained: ${data.lastTrained}</div>
        </div>`;
    });

    return card('💪 Muscle Recovery', entries.join(''));
  }

  function renderPRs(prs) {
    const entries = Object.entries(prs);
    if (!entries.length) return empty('No PRs recorded yet. Start logging workouts!');

    const sorted = entries.sort((a, b) => new Date(b[1].date) - new Date(a[1].date));
    const rows   = sorted.map(([name, pr]) => `
      <div style="
        display:flex; align-items:center; gap:10px;
        padding:9px 0; border-bottom:1px solid rgba(255,255,255,.05);
      ">
        <span style="font-size:1rem;flex-shrink:0">🏆</span>
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:.84rem;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
          <div style="font-size:.72rem;color:var(--text-secondary,#aaa)">
            ${fmt(pr.weight)} × ${pr.reps} reps
            <span style="color:var(--accent-primary,#00E5BB);font-weight:700">
              (e1RM ${fmt(pr.e1rm)})
            </span>
          </div>
        </div>
        <div style="font-size:.65rem;color:var(--text-secondary,#777);white-space:nowrap">${pr.date}</div>
      </div>
    `).join('');

    return card(`🏆 Personal Records (${entries.length})`, rows);
  }

  function renderVolume(volume) {
    if (!Object.keys(volume).length) return empty('Need at least one week of data for volume analytics.');

    const rows = Object.entries(volume)
      .sort((a, b) => b[1].current - a[1].current)
      .map(([group, data]) => `
        <div style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
            <span style="text-transform:capitalize;font-weight:600;font-size:.84rem">${group}</span>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="font-size:.78rem;color:var(--text-secondary,#aaa)">${data.current} sets this week</span>
              <span style="font-size:1rem;font-weight:700;color:${TREND_COLOR[data.trend]}">${TREND_ICON[data.trend]}</span>
            </div>
          </div>
          <!-- Mini sparkline: 4 bars for 4 weeks -->
          <div style="display:flex;gap:3px;align-items:flex-end;height:28px">
            ${data.weeks.map((sets, i) => {
              const maxSets = Math.max(...data.weeks, 1);
              const h       = Math.max(4, Math.round((sets / maxSets) * 28));
              const isNow   = i === 3;
              return `<div style="
                flex:1; height:${h}px; border-radius:3px;
                background:${isNow ? 'var(--accent-primary,#00E5BB)' : 'rgba(255,255,255,.15)'};
                transition:height .4s ease;
              " title="Week -${3-i}: ${sets} sets"></div>`;
            }).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:3px;font-size:.62rem;color:rgba(255,255,255,.3)">
            <span>4w ago</span><span>3w</span><span>2w</span><span>This week</span>
          </div>
        </div>
      `).join('');

    return card('📉 Volume Analytics (4-week)', rows);
  }

  // ── Small helpers ───────────────────────────────────────────────────────────

  function card(title, body) {
    return `
      <div style="margin-bottom:4px">
        <div style="font-size:.72rem;font-weight:700;letter-spacing:.08em;
          color:var(--text-secondary,#888);text-transform:uppercase;margin-bottom:12px">${title}</div>
        ${body}
      </div>`;
  }

  function empty(msg) {
    return card('', `<p style="color:var(--text-secondary,#888);font-size:.82rem;line-height:1.6;text-align:center;padding:24px 0">${msg}</p>`);
  }

  function statusColor(status) {
    return { progressing: '#00E5BB', stalled: '#ff9f43', deload: '#ff6b6b', new: '#a29bfe' }[status] || '#888';
  }

  // ── FAB trigger button ──────────────────────────────────────────────────────

  function createFAB() {
    const existing = document.getElementById('fitlog-adaptive-fab');
    if (existing) existing.remove();

    const fab = document.createElement('button');
    fab.id    = 'fitlog-adaptive-fab';
    fab.title = 'Adaptive Coach';
    fab.style.cssText = `
      position: fixed;
      bottom: 84px;
      right: 18px;
      width: 52px; height: 52px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-primary,#00E5BB), #00b8d4);
      border: none; cursor: pointer;
      box-shadow: 0 8px 24px rgba(0,229,187,.35);
      font-size: 1.4rem;
      display: flex; align-items: center; justify-content: center;
      z-index: 10000;
      transition: transform .2s, box-shadow .2s;
    `;
    fab.textContent = '🧠';
    fab.addEventListener('mouseover', () => {
      fab.style.transform  = 'scale(1.1)';
      fab.style.boxShadow  = '0 12px 32px rgba(0,229,187,.5)';
    });
    fab.addEventListener('mouseout', () => {
      fab.style.transform  = '';
      fab.style.boxShadow  = '0 8px 24px rgba(0,229,187,.35)';
    });

    let panel = null;
    fab.addEventListener('click', () => {
      if (!panel) panel = createPanel();
      const isOpen = panel.style.display === 'flex';
      panel.style.display = isOpen ? 'none' : 'flex';
      // Scroll to top on open
      if (!isOpen) {
        const content = document.getElementById('fa-content');
        if (content) content.scrollTop = 0;
      }
    });

    document.body.appendChild(fab);
    return fab;
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  //
  //  Other scripts can call:
  //    FitLogAdaptive.refresh()      — re-read localStorage and re-render
  //    FitLogAdaptive.getPRs()       — { exerciseName: { weight, reps, e1rm, date } }
  //    FitLogAdaptive.getOverload()  — array of progression recommendations
  //    FitLogAdaptive.getRecovery()  — muscle recovery status
  //    FitLogAdaptive.getVolume()    — 4-week volume analytics
  //
  //  Your app.js can call FitLogAdaptive.refresh() after logging a workout
  //  so the panel updates instantly without a page reload.

  global.FitLogAdaptive = {
    refresh() {
      const panel = document.getElementById(PANEL_ID);
      if (panel) panel.remove();
      createFAB(); // re-creates and reattaches
    },

    getPRs() {
      return runPREngine(loadWorkouts()).prs;
    },

    getOverload() {
      return runOverloadEngine(loadWorkouts());
    },

    getRecovery() {
      return runRecoveryTracker(loadWorkouts());
    },

    getVolume() {
      return runVolumeAnalytics(loadWorkouts());
    },
  };

  // ── Initialise on DOM ready ─────────────────────────────────────────────────
  function init() {
    createFAB();

    // Listen for storage changes from other tabs
    window.addEventListener('storage', e => {
      if (e.key === STORAGE_KEY_WORKOUTS) FitLogAdaptive.refresh();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}(window));
