/* ============================================================
   FitLog — Permissions Module
   Handles: Notifications, Camera, Motion (iOS + Android),
            Bluetooth (Mi Band), Vibration
   Works on: iOS Safari 13+, Android Chrome, desktop Chrome/Edge
   ============================================================ */

const FitLogPermissions = (() => {

  // ── Detect platform ──────────────────────────────────────────
  const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const IS_ANDROID = /Android/.test(navigator.userAgent);
  const IS_STANDALONE = window.matchMedia('(display-mode: standalone)').matches
                     || window.navigator.standalone === true;

  // ── Storage key ─────────────────────────────────────────────
  const STORAGE_KEY = 'fitlog_perms_asked';

  function _askedBefore() {
    return localStorage.getItem(STORAGE_KEY) === '1';
  }
  function _markAsked() {
    localStorage.setItem(STORAGE_KEY, '1');
  }

  // ── Permission definitions ───────────────────────────────────
  const PERMISSIONS = [
    {
      id: 'notifications',
      icon: '🔔',
      title: 'Notifications',
      desc: 'Daily workout reminders & streak alerts',
      required: false,
      check: () => {
        if (!('Notification' in window)) return 'unsupported';
        return Notification.permission; // 'default' | 'granted' | 'denied'
      },
      request: async () => {
        if (!('Notification' in window)) return 'unsupported';
        if (Notification.permission === 'granted') return 'granted';
        if (Notification.permission === 'denied') return 'denied';
        const result = await Notification.requestPermission();
        return result;
      }
    },
    {
      id: 'motion',
      icon: '📱',
      title: 'Motion & Fitness',
      desc: 'Step counter & pedometer tracking',
      required: false,
      // iOS requires explicit permission; Android grants automatically
      check: () => {
        if (typeof DeviceMotionEvent === 'undefined') return 'unsupported';
        if (typeof DeviceMotionEvent.requestPermission !== 'function') return 'granted'; // Android auto
        return localStorage.getItem('fitlog_motion_perm') || 'default';
      },
      request: async () => {
        if (typeof DeviceMotionEvent === 'undefined') return 'unsupported';
        // Android: no permission API needed
        if (typeof DeviceMotionEvent.requestPermission !== 'function') return 'granted';
        // iOS 13+
        try {
          const result = await DeviceMotionEvent.requestPermission();
          localStorage.setItem('fitlog_motion_perm', result);
          return result; // 'granted' | 'denied'
        } catch (e) {
          return 'denied';
        }
      }
    },
    {
      id: 'camera',
      icon: '📷',
      title: 'Camera',
      desc: 'Barcode scanning & meal photo analysis',
      required: false,
      check: async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return 'unsupported';
        if (navigator.permissions) {
          try {
            const s = await navigator.permissions.query({ name: 'camera' });
            return s.state; // 'granted' | 'prompt' | 'denied'
          } catch (e) { /* not all browsers support camera query */ }
        }
        return 'default';
      },
      request: async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return 'unsupported';
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          // Stop immediately — we just needed the prompt
          stream.getTracks().forEach(t => t.stop());
          return 'granted';
        } catch (e) {
          if (e.name === 'NotAllowedError') return 'denied';
          return 'error';
        }
      }
    }
  ];

  // ── Build the permission UI row ──────────────────────────────
  function _buildRow(perm, status) {
    const isGranted = status === 'granted';
    const isDenied  = status === 'denied';
    const isUnsupported = status === 'unsupported';

    let badge = '';
    if (isGranted)      badge = '<span style="color:#00E5BB;font-size:.72rem;font-weight:700">✓ Allowed</span>';
    else if (isDenied)  badge = '<span style="color:#FF5E7D;font-size:.72rem;font-weight:700">✕ Denied</span>';
    else if (isUnsupported) badge = '<span style="color:rgba(180,190,220,.5);font-size:.72rem">Not supported</span>';
    else                badge = '<span style="color:rgba(180,190,220,.6);font-size:.72rem">Tap to allow</span>';

    const disabled = isGranted || isDenied || isUnsupported;

    return `
      <div class="perm-row" id="perm-row-${perm.id}" style="
        display:flex; align-items:center; gap:12px;
        padding:14px 16px;
        background:${isGranted ? 'rgba(0,229,187,0.06)' : 'rgba(255,255,255,0.04)'};
        border:1px solid ${isGranted ? 'rgba(0,229,187,0.2)' : 'rgba(255,255,255,0.08)'};
        border-radius:16px;
        cursor:${disabled ? 'default' : 'pointer'};
        transition: all .2s;
      " ${disabled ? '' : `onclick="FitLogPermissions._requestSingle('${perm.id}')"`}>
        <div style="font-size:1.6rem;flex-shrink:0">${perm.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:.88rem;font-weight:700;color:var(--text-primary)">${perm.title}</div>
          <div style="font-size:.72rem;color:var(--text-secondary);margin-top:2px">${perm.desc}</div>
        </div>
        <div id="perm-badge-${perm.id}" style="flex-shrink:0;text-align:right">${badge}</div>
      </div>`;
  }

  // ── Show the permissions modal ───────────────────────────────
  async function showModal(opts = {}) {
    const { force = false, onDone = null } = opts;

    // Don't re-show unless forced
    if (!force && _askedBefore()) {
      if (onDone) onDone();
      return;
    }

    // Resolve current statuses
    const statuses = {};
    for (const p of PERMISSIONS) {
      statuses[p.id] = typeof p.check === 'function'
        ? await Promise.resolve(p.check())
        : 'default';
    }

    // Don't show if everything already decided
    const allDecided = PERMISSIONS.every(p =>
      statuses[p.id] === 'granted' || statuses[p.id] === 'denied' || statuses[p.id] === 'unsupported'
    );
    if (!force && allDecided) {
      _markAsked();
      if (onDone) onDone();
      return;
    }

    // Build modal HTML
    const rows = PERMISSIONS.map(p => _buildRow(p, statuses[p.id])).join('');

    // iOS-specific note
    const iosNote = IS_IOS ? `
      <div style="font-size:.72rem;color:rgba(180,190,220,.6);text-align:center;margin-top:4px;line-height:1.5;padding:0 8px">
        On iOS, some permissions require you to allow them in <strong style="color:rgba(180,190,220,.85)">Settings → Safari → FitLog</strong>
      </div>` : '';

    const overlay = document.createElement('div');
    overlay.id = 'fitlog-perm-overlay';
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:3000;
      background:rgba(4,6,16,0.92);
      backdrop-filter:blur(16px);
      -webkit-backdrop-filter:blur(16px);
      display:flex;align-items:flex-end;justify-content:center;
      animation:fadeInBg .3s ease;
    `;

    overlay.innerHTML = `
      <div style="
        width:100%;max-width:480px;
        background:rgba(10,15,30,0.98);
        border:1px solid rgba(255,255,255,0.12);
        border-top-color:rgba(0,229,187,0.3);
        border-radius:28px 28px 0 0;
        padding:28px 20px;
        padding-bottom:calc(28px + env(safe-area-inset-bottom,0px));
        animation:modalUp .35s cubic-bezier(0.34,1.2,0.64,1);
        box-shadow:0 -8px 60px rgba(0,0,0,0.6);
      ">
        <!-- Handle -->
        <div style="width:36px;height:4px;background:rgba(255,255,255,0.15);border-radius:2px;margin:0 auto 20px"></div>

        <!-- Header -->
        <div style="text-align:center;margin-bottom:22px">
          <div style="font-size:2.2rem;margin-bottom:8px">🔐</div>
          <div style="font-size:1.15rem;font-weight:800;font-family:'Sora',sans-serif;
            background:linear-gradient(135deg,#00E5BB,#6C8CFF);
            -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
            margin-bottom:6px">App Permissions</div>
          <div style="font-size:.8rem;color:rgba(180,190,220,.7);line-height:1.5">
            FitLog needs a few permissions to work at its best.<br>You can change these any time in your browser settings.
          </div>
        </div>

        <!-- Permission rows -->
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
          ${rows}
        </div>

        ${iosNote}

        <!-- Actions -->
        <div style="display:flex;gap:8px;margin-top:16px">
          <button onclick="FitLogPermissions._allowAll()" style="
            flex:2;padding:14px;border-radius:14px;border:none;cursor:pointer;
            background:linear-gradient(135deg,#00E5BB,#00D4F5);
            color:#060812;font-size:.9rem;font-weight:800;
            font-family:'Space Grotesk',sans-serif;
            box-shadow:0 4px 20px rgba(0,229,187,0.3);
            transition:transform .15s;
          " onmousedown="this.style.transform='scale(.97)'" onmouseup="this.style.transform=''">
            ✅ Allow All
          </button>
          <button onclick="FitLogPermissions._dismiss()" style="
            flex:1;padding:14px;border-radius:14px;cursor:pointer;
            background:rgba(255,255,255,0.06);
            border:1px solid rgba(255,255,255,0.1);
            color:rgba(180,190,220,.7);font-size:.85rem;font-weight:600;
            font-family:'Space Grotesk',sans-serif;
          ">
            Not Now
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    _currentOnDone = onDone;
  }

  // ── Internal state ───────────────────────────────────────────
  let _currentOnDone = null;

  // ── Request a single permission by id ───────────────────────
  async function _requestSingle(id) {
    const perm = PERMISSIONS.find(p => p.id === id);
    if (!perm) return;

    const row = document.getElementById(`perm-row-${id}`);
    const badge = document.getElementById(`perm-badge-${id}`);
    if (badge) badge.innerHTML = '<span style="color:rgba(180,190,220,.6);font-size:.72rem">Requesting…</span>';

    const result = await perm.request();

    const isGranted = result === 'granted';
    const isDenied  = result === 'denied';

    if (badge) {
      badge.innerHTML = isGranted
        ? '<span style="color:#00E5BB;font-size:.72rem;font-weight:700">✓ Allowed</span>'
        : isDenied
          ? '<span style="color:#FF5E7D;font-size:.72rem;font-weight:700">✕ Denied</span>'
          : '<span style="color:rgba(180,190,220,.5);font-size:.72rem">Skipped</span>';
    }
    if (row && isGranted) {
      row.style.background = 'rgba(0,229,187,0.06)';
      row.style.borderColor = 'rgba(0,229,187,0.2)';
      row.style.cursor = 'default';
      row.removeAttribute('onclick');
    }

    // If denied and we're on iOS, show settings hint
    if (isDenied && IS_IOS && badge) {
      setTimeout(() => {
        badge.innerHTML = '<span style="color:#FF5E7D;font-size:.65rem;font-weight:600">Go to Settings to enable</span>';
      }, 800);
    }
  }

  // ── Allow all permissions sequentially ──────────────────────
  async function _allowAll() {
    for (const perm of PERMISSIONS) {
      const current = typeof perm.check === 'function'
        ? await Promise.resolve(perm.check())
        : 'default';
      if (current !== 'granted' && current !== 'denied' && current !== 'unsupported') {
        await _requestSingle(perm.id);
        // Small gap between prompts so browser doesn't swallow them
        await new Promise(r => setTimeout(r, 400));
      }
    }
    _dismiss();
  }

  // ── Dismiss the modal ────────────────────────────────────────
  function _dismiss() {
    _markAsked();
    const overlay = document.getElementById('fitlog-perm-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity .3s';
      setTimeout(() => overlay.remove(), 300);
    }
    if (_currentOnDone) {
      _currentOnDone();
      _currentOnDone = null;
    }
  }

  // ── Quick check: is a specific permission granted? ───────────
  async function isGranted(id) {
    const perm = PERMISSIONS.find(p => p.id === id);
    if (!perm) return false;
    const status = typeof perm.check === 'function'
      ? await Promise.resolve(perm.check())
      : 'default';
    return status === 'granted';
  }

  // ── Re-open the modal from Settings ─────────────────────────
  function openSettings() {
    showModal({ force: true });
  }

  // ── Auto-trigger after onboarding ───────────────────────────
  // Call this once the user finishes onboarding
  function requestAfterOnboarding(onDone) {
    // Small delay so the onboarding slide-out completes first
    setTimeout(() => showModal({ onDone }), 500);
  }

  // ── iOS: handle DeviceOrientation permission for future use ──
  async function requestOrientationIfNeeded() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        await DeviceOrientationEvent.requestPermission();
      } catch (e) { /* ignore */ }
    }
  }

  return {
    showModal,
    openSettings,
    requestAfterOnboarding,
    isGranted,
    _requestSingle,
    _allowAll,
    _dismiss,
    IS_IOS,
    IS_ANDROID,
    IS_STANDALONE
  };

})();
