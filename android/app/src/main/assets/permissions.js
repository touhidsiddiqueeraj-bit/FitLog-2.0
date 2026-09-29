/* ============================================================
   FitLog — Permissions Module v2
   ============================================================ */

const FitLogPermissions = (() => {

  const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const IS_STANDALONE = window.matchMedia('(display-mode: standalone)').matches
                     || window.navigator.standalone === true;

  const STORAGE_KEY = 'fitlog_perms_asked';
  const MOTION_KEY  = 'fitlog_motion_perm';

  function _askedBefore() { return localStorage.getItem(STORAGE_KEY) === '1'; }
  function _markAsked()   { localStorage.setItem(STORAGE_KEY, '1'); }

  const PERMISSIONS = [
    {
      id: 'notifications',
      icon: '🔔',
      title: 'Notifications',
      desc: 'Daily workout reminders & streak alerts',
      check: async () => {
        if (!('Notification' in window)) return 'unsupported';
        if (IS_IOS && !IS_STANDALONE) return 'unsupported';
        return Notification.permission;
      },
      request: async () => {
        if (!('Notification' in window)) return 'unsupported';
        if (IS_IOS && !IS_STANDALONE) return 'unsupported';
        if (Notification.permission !== 'default') return Notification.permission;
        try { return await Notification.requestPermission(); }
        catch(e) { return 'denied'; }
      }
    },
    {
      id: 'motion',
      icon: '📱',
      title: 'Motion & Fitness',
      desc: 'Step counter & pedometer tracking',
      check: async () => {
        if (typeof DeviceMotionEvent === 'undefined') return 'unsupported';
        if (typeof DeviceMotionEvent.requestPermission !== 'function') return 'granted';
        return localStorage.getItem(MOTION_KEY) || 'default';
      },
      request: async () => {
        if (typeof DeviceMotionEvent === 'undefined') return 'unsupported';
        if (typeof DeviceMotionEvent.requestPermission !== 'function') return 'granted';
        try {
          const r = await DeviceMotionEvent.requestPermission();
          localStorage.setItem(MOTION_KEY, r);
          return r;
        } catch(e) { return 'denied'; }
      }
    },
    {
      id: 'camera',
      icon: '📷',
      title: 'Camera',
      desc: 'Barcode scanning & meal photo analysis',
      check: async () => {
        if (!navigator.mediaDevices) return 'unsupported';
        if (navigator.permissions) {
          try {
            const s = await navigator.permissions.query({ name: 'camera' });
            return s.state === 'prompt' ? 'default' : s.state;
          } catch(e) {}
        }
        return 'default';
      },
      request: async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return 'unsupported';
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          stream.getTracks().forEach(t => t.stop());
          return 'granted';
        } catch(e) {
          return e.name === 'NotAllowedError' ? 'denied' : 'error';
        }
      }
    }
  ];

  function _badge(status) {
    if (status === 'granted')     return '<span style="color:#00E5BB;font-size:.72rem;font-weight:700">✓ Allowed</span>';
    if (status === 'denied')      return '<span style="color:#FF5E7D;font-size:.72rem;font-weight:700">✕ Denied</span>';
    if (status === 'unsupported') return '<span style="color:rgba(180,190,220,.4);font-size:.72rem">Not available</span>';
    return '<span style="color:rgba(180,190,220,.7);font-size:.72rem">Tap to allow →</span>';
  }

  function _buildRow(perm, status) {
    const tappable = status !== 'granted' && status !== 'denied' && status !== 'unsupported';
    return `
      <div class="perm-row" id="perm-row-${perm.id}" style="
        display:flex;align-items:center;gap:14px;padding:14px 16px;
        background:${status==='granted'?'rgba(0,229,187,0.07)':'rgba(255,255,255,0.04)'};
        border:1px solid ${status==='granted'?'rgba(0,229,187,0.22)':'rgba(255,255,255,0.09)'};
        border-radius:16px;cursor:${tappable?'pointer':'default'};
        transition:background .2s,border-color .2s;-webkit-tap-highlight-color:transparent;
      " ${tappable?`onclick="FitLogPermissions._requestSingle('${perm.id}')"`:''}>
        <div style="font-size:1.7rem;flex-shrink:0;line-height:1">${perm.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:.88rem;font-weight:700">${perm.title}</div>
          <div style="font-size:.72rem;color:rgba(180,190,220,.65);margin-top:2px">${perm.desc}</div>
        </div>
        <div id="perm-badge-${perm.id}" style="flex-shrink:0">${_badge(status)}</div>
      </div>`;
  }

  let _onDone = null;

  async function showModal(opts = {}) {
    const { force = false, onDone = null } = opts;
    _onDone = onDone;

    if (!force && _askedBefore()) {
      if (_onDone) { _onDone(); _onDone = null; }
      return;
    }

    // Resolve all statuses
    const statuses = {};
    for (const p of PERMISSIONS) {
      statuses[p.id] = await p.check();
    }

    // Skip only if ALL are already decided and not forced
    const allDecided = PERMISSIONS.every(p => {
      const s = statuses[p.id];
      return s === 'granted' || s === 'denied' || s === 'unsupported';
    });
    if (!force && allDecided) {
      _markAsked();
      if (_onDone) { _onDone(); _onDone = null; }
      return;
    }

    const existing = document.getElementById('fitlog-perm-overlay');
    if (existing) existing.remove();

    const rows = PERMISSIONS.map(p => _buildRow(p, statuses[p.id])).join('');
    const iosHint = IS_IOS ? `<p style="font-size:.7rem;color:rgba(180,190,220,.5);text-align:center;margin-top:8px;line-height:1.5">On iOS, some permissions require <strong style="color:rgba(180,190,220,.75)">Settings → Safari → [site]</strong></p>` : '';

    const overlay = document.createElement('div');
    overlay.id = 'fitlog-perm-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(4,6,16,0.88);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);display:flex;align-items:flex-end;justify-content:center;animation:fadeInBg .25s ease;';
    overlay.innerHTML = `
      <div style="width:100%;max-width:500px;background:rgba(8,12,28,0.98);border:1px solid rgba(255,255,255,0.11);border-top:2px solid rgba(0,229,187,0.35);border-radius:26px 26px 0 0;padding:26px 20px calc(26px + env(safe-area-inset-bottom,0px));box-shadow:0 -12px 60px rgba(0,0,0,0.7);animation:modalUp .32s cubic-bezier(0.34,1.2,0.64,1);">
        <div style="width:36px;height:4px;background:rgba(255,255,255,0.14);border-radius:2px;margin:0 auto 22px"></div>
        <div style="text-align:center;margin-bottom:22px">
          <div style="font-size:2rem;margin-bottom:8px">🔐</div>
          <div style="font-size:1.1rem;font-weight:800;font-family:'Sora',sans-serif;background:linear-gradient(135deg,#00E5BB,#6C8CFF);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:6px">Allow Permissions</div>
          <div style="font-size:.8rem;color:rgba(180,190,220,.65);line-height:1.55">FitLog needs access to a few features.<br>You can change these anytime in Settings.</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px">${rows}</div>
        ${iosHint}
        <div style="display:flex;gap:8px;margin-top:18px">
          <button id="perm-allow-all-btn" onclick="FitLogPermissions._allowAll()" style="flex:2;padding:15px;border-radius:14px;border:none;cursor:pointer;background:linear-gradient(135deg,#00E5BB,#00D4F5);color:#060812;font-size:.9rem;font-weight:800;font-family:'Space Grotesk',sans-serif;box-shadow:0 4px 24px rgba(0,229,187,0.35);-webkit-tap-highlight-color:transparent;">✅ Allow All</button>
          <button onclick="FitLogPermissions._dismiss()" style="flex:1;padding:15px;border-radius:14px;cursor:pointer;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(180,190,220,.65);font-size:.85rem;font-weight:600;font-family:'Space Grotesk',sans-serif;-webkit-tap-highlight-color:transparent;">Not Now</button>
        </div>
      </div>`;

    document.body.appendChild(overlay);
  }

  async function _requestSingle(id) {
    const perm = PERMISSIONS.find(p => p.id === id);
    if (!perm) return;
    const badge = document.getElementById('perm-badge-' + id);
    const row   = document.getElementById('perm-row-' + id);
    if (badge) badge.innerHTML = '<span style="color:rgba(180,190,220,.5);font-size:.72rem">Requesting…</span>';
    const result = await perm.request();
    if (badge) badge.innerHTML = _badge(result);
    if (row) {
      row.style.background = result==='granted' ? 'rgba(0,229,187,0.07)' : 'rgba(255,255,255,0.04)';
      row.style.borderColor = result==='granted' ? 'rgba(0,229,187,0.22)' : 'rgba(255,255,255,0.09)';
      if (result==='granted'||result==='denied'||result==='unsupported') {
        row.style.cursor = 'default';
        row.removeAttribute('onclick');
      }
    }
    return result;
  }

  async function _allowAll() {
    const btn = document.getElementById('perm-allow-all-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Requesting…'; }
    for (const perm of PERMISSIONS) {
      const current = await perm.check();
      if (current === 'default') {
        await _requestSingle(perm.id);
        await new Promise(r => setTimeout(r, 700));
      }
    }
    _dismiss();
  }

  function _dismiss() {
    _markAsked();
    const overlay = document.getElementById('fitlog-perm-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity .25s';
      setTimeout(() => overlay.remove(), 260);
    }
    if (_onDone) { _onDone(); _onDone = null; }
  }

  function openSettings() { showModal({ force: true }); }
  function requestAfterOnboarding(onDone) { setTimeout(() => showModal({ onDone }), 600); }
  async function isGranted(id) {
    const perm = PERMISSIONS.find(p => p.id === id);
    if (!perm) return false;
    return (await perm.check()) === 'granted';
  }

  return { showModal, openSettings, requestAfterOnboarding, isGranted, _requestSingle, _allowAll, _dismiss, IS_IOS, IS_STANDALONE };

})();
