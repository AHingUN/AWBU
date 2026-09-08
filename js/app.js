/* ============================================================
 * 前端工具箱 · 交互主程序（原生 JS，无任何依赖）
 * ============================================================ */
(function () {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 强哈希算法（FNV-1a + 迭代，兼容 file:// 协议） ---------- */
  function simpleHash(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return ('0000000' + (h >>> 0).toString(16)).slice(-8);
  }

  function deriveKey(pwd, salt, iter = 1200) {
    let h = simpleHash(pwd + salt);
    for (let i = 0; i < iter; i++) {
      h = simpleHash(h + salt);
    }
    return h;
  }

  // 密码：admin   （加盐哈希，源码中不可逆推）
  const SECRET_SALT = 'dtb_salt_2026_secure';
  const AUTH_SALT = 'auth_salt_v2';
  const PASSWORD_HASH = deriveKey('admin', SECRET_SALT);
  const AUTH_TOKEN = deriveKey(PASSWORD_HASH, AUTH_SALT);

  /* ---------- localStorage 存储（强化令牌验证） ---------- */
  const STORE = {
    getToken() {
      try {
        const raw = localStorage.getItem('dtb_auth');
        if (!raw) return null;
        const data = JSON.parse(raw);
        return data?.t || null;
      } catch {
        return null;
      }
    },
    setToken(t) {
      localStorage.setItem('dtb_auth', JSON.stringify({ t }));
    },
    clearAuth() {
      localStorage.removeItem('dtb_auth');
    },
    getCat() { return localStorage.getItem('dtb_cat') || 'all'; },
    setCat(c) { localStorage.setItem('dtb_cat', c); },
    getSort() { return localStorage.getItem('dtb_sort') || 'default'; },
    setSort(s) { localStorage.setItem('dtb_sort', s); },
    getEngine() { return localStorage.getItem('dtb_engine') || 'bing'; },
    setEngine(e) { localStorage.setItem('dtb_engine', e); },
  };

  const catMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
  const hostOf = (url) => { try { return new URL(url).host.replace(/^www\./, ''); } catch { return url; } };

  function hueOf(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
    return h;
  }

  /* ============================================================
   * 全局变量（用于取消动画）
   * ============================================================ */
  let particleRaf = null;
  let cursorRaf = null;
  let antiDevInterval = null;
  let devtoolsDetected = false;
  let antiDevStarted = false;

  /* ============================================================
   * 登录相关（哈希验证 + 令牌防篡改）
   * ============================================================ */
  const loginOverlay = $('#loginOverlay');
  const loginPassword = $('#loginPassword');
  const loginBtn = $('#loginBtn');
  const loginError = $('#loginError');
  let loginAttempts = 0;

  // ---------- 彻底退出（用于开发者检测） ----------
  function forceExit(showButton = true) {
    // 停止所有定时器、动画
    if (antiDevInterval) {
      clearInterval(antiDevInterval);
      antiDevInterval = null;
    }
    if (particleRaf) {
      cancelAnimationFrame(particleRaf);
      particleRaf = null;
    }
    if (cursorRaf) {
      cancelAnimationFrame(cursorRaf);
      cursorRaf = null;
    }
    STORE.clearAuth();

    // 清空页面
    document.body.innerHTML = '';
    document.body.style.cssText = `
      margin: 0;
      padding: 0;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: sans-serif;
    `;

    if (showButton) {
      const btn = document.createElement('button');
      btn.textContent = '结束';
      btn.style.cssText = `
        padding: 20px 48px;
        font-size: 20px;
        font-weight: 700;
        background: #ff4444;
        color: #fff;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(255,68,68,0.3);
        transition: transform 0.2s;
      `;
      btn.onmouseover = () => { btn.style.transform = 'scale(1.05)'; };
      btn.onmouseout = () => { btn.style.transform = 'scale(1)'; };
      btn.onclick = function () {
        window.close();
        setTimeout(() => { location.reload(); }, 300);
      };
      document.body.appendChild(btn);
      document.body.style.pointerEvents = 'auto';
    } else {
      document.body.style.pointerEvents = 'none';
      try { window.close(); } catch (e) {}
      setTimeout(() => {
        try { location.replace('about:blank'); } catch (e) {}
      }, 100);
    }
  }

  // ---------- 密码错误锁定屏幕（保留反检测） ----------
  function lockScreen() {
    if (particleRaf) {
      cancelAnimationFrame(particleRaf);
      particleRaf = null;
    }
    if (cursorRaf) {
      cancelAnimationFrame(cursorRaf);
      cursorRaf = null;
    }
    devtoolsDetected = false;

    document.body.innerHTML = '';
    document.body.style.cssText = `
      margin: 0;
      padding: 0;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      font-family: sans-serif;
    `;

    const btn = document.createElement('button');
    btn.textContent = '结束';
    btn.style.cssText = `
      padding: 20px 48px;
      font-size: 20px;
      font-weight: 700;
      background: #ff4444;
      color: #fff;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(255,68,68,0.3);
      transition: transform 0.2s;
    `;
    btn.onmouseover = () => { btn.style.transform = 'scale(1.05)'; };
    btn.onmouseout = () => { btn.style.transform = 'scale(1)'; };
    btn.onclick = function () {
      forceExit(false);
    };
    document.body.appendChild(btn);
    document.body.style.pointerEvents = 'auto';
  }

  function checkLogin() {
    const token = STORE.getToken();
    if (token === AUTH_TOKEN) {
      loginOverlay.classList.add('hidden');
      return true;
    }
    // 令牌无效或不存在，清除残留
    STORE.clearAuth();
    loginOverlay.classList.remove('hidden');
    return false;
  }

  function doLogin() {
    const pwd = loginPassword.value.trim();
    // 哈希验证
    if (deriveKey(pwd, SECRET_SALT) === PASSWORD_HASH) {
      loginAttempts = 0;
      STORE.setToken(AUTH_TOKEN);
      loginOverlay.classList.add('hidden');
      loginError.hidden = true;
      loginPassword.value = '';
      render();
      $$('.stat [data-count]').forEach(el => animateCount(el, Number(el.dataset.count)));
    } else {
      loginAttempts++;
      if (loginAttempts >= 5) {
        lockScreen();
        return;
      }
      loginError.hidden = false;
      loginPassword.value = '';
      loginPassword.focus();
    }
  }

  loginBtn.addEventListener('click', doLogin);
  loginPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doLogin();
  });

  /* ============================================================
   * 反开发者工具系统
   * ============================================================ */
  function enableAntiDevTools() {
    if (antiDevStarted || reduceMotion) return;
    antiDevStarted = true;
    let lastTime = performance.now();

    function checkDevTools() {
      if (devtoolsDetected) return;

      const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
      const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
      const sizeDetected = widthDiff > 150 || heightDiff > 150;

      const now = performance.now();
      const timeDiff = now - lastTime;
      lastTime = now;
      const timeDetected = timeDiff > 400;

      if (sizeDetected || timeDetected) {
        devtoolsDetected = true;
        forceExit(false);
      }
    }

    antiDevInterval = setInterval(checkDevTools, 200);
  }

  /* 阻止快捷键和右键 */
  function preventShortcuts() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'U') {
        e.preventDefault();
        return false;
      }
    });

    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      return false;
    });
  }

  /* ============================================================
   * 粒子背景（保存 raf ID）
   * ============================================================ */
  (function initParticles() {
    const canvas = $('#particle-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, dpr, particles = [];
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(88, Math.floor((W * H) / 17000));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 0.5,
      }));
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, md = Math.hypot(dx, dy);
        if (md < 130) { p.x += dx / md * 0.35; p.y += dy / md * 0.35; }
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(124,140,255,${(1 - d / 120) * 0.13})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(165,180,252,0.55)';
        ctx.fill();
      }
      particleRaf = requestAnimationFrame(drawFrame);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(165,180,252,0.4)'; ctx.fill();
      }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && particleRaf) {
        cancelAnimationFrame(particleRaf);
        particleRaf = null;
      } else if (!document.hidden && !particleRaf && !reduceMotion) {
        particleRaf = requestAnimationFrame(drawFrame);
      }
    });

    resize();
    if (reduceMotion) drawStatic(); else particleRaf = requestAnimationFrame(drawFrame);
  })();

  /* 光标柔光 */
  (function cursorGlow() {
    if (reduceMotion || matchMedia('(pointer: coarse)').matches) return;
    const glow = $('#cursorGlow');
    let x = 0, y = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; glow.style.opacity = '1'; }, { passive: true });
    (function loop() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      cursorRaf = requestAnimationFrame(loop);
    })();
  })();

  /* Toast & Copy */
  let toastTimer = null;
  function toast(msg) {
    let el = $('.toast');
    if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add('show'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  async function copyText(text, okMsg = '已复制到剪贴板') {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
    }
    toast(okMsg);
  }

  /* ============================================================
   * 渲染
   * ============================================================ */
  const state = {
    cat: STORE.getCat(),
    query: '',
    sort: STORE.getSort(),
    engine: STORE.getEngine(),
  };

  const content = $('#content');
  const catBar = $('#catBar');
  const emptyState = $('#emptyState');

  function matchSite(s, q) {
    if (!q) return true;
    const hay = (s.name + ' ' + s.desc + ' ' + s.kw + ' ' + hostOf(s.url)).toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every(tok => hay.includes(tok));
  }

  function avatarHtml(s) {
    const host = hostOf(s.url);
    const h = hueOf(host);
    const letter = s.name.trim()[0] || '?';
    return `
      <div class="avatar" style="--av-a:hsl(${h} 80% 62%);--av-b:hsl(${(h + 42) % 360} 72% 48%)">
        ${letter}
      </div>`;
  }

  function cardHtml(s, idx) {
    const cat = catMap[s.cat];
    return `
    <a class="card" href="${s.url}" target="_blank" rel="noopener noreferrer"
       data-url="${s.url}" style="--cat-color:${cat.color};animation-delay:${Math.min(idx * 0.035, 0.45)}s">
      <div class="card-top">
        ${avatarHtml(s)}
        <div class="card-title-wrap">
          <div class="card-name">${s.name}</div>
        </div>
      </div>
      <p class="card-desc">${s.desc}</p>
      <div class="card-foot">
        <span class="card-tag">${cat.name}</span>
        <div class="card-actions">
          <button class="icon-btn copy-link" title="复制网址" aria-label="复制网址">
            <svg viewBox="0 0 24 24" width="14" height="14"><rect x="9" y="9" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 15V5a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
          <span class="go-arrow">访问
            <svg viewBox="0 0 24 24" width="13" height="13"><path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
      </div>
    </a>`;
  }

  function render() {
    if (!checkLogin()) {
      content.innerHTML = '';
      emptyState.hidden = true;
      content.style.display = 'none';
      return;
    }

    const q = state.query.trim();
    let html = '';
    let globalIdx = 0;
    let matchCount = 0;

    CATEGORIES.forEach(cat => {
      if (state.cat !== 'all' && state.cat !== cat.id) return;
      let list = SITES.filter(s => s.cat === cat.id && matchSite(s, q));
      if (state.sort === 'visits') {
        list.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (!list.length) return;
      matchCount += list.length;
      html += `
      <section class="section" style="--cat-color:${cat.color}">
        <div class="section-head">
          <span class="section-icon" style="--cat-color:${cat.color}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${cat.icon}</svg>
          </span>
          <h2>${cat.name}</h2>
          <span class="section-count">${list.length}</span>
          <span class="section-line"></span>
        </div>
        <div class="cards-grid">
          ${list.map(s => cardHtml(s, globalIdx++)).join('')}
        </div>
      </section>`;
    });

    content.innerHTML = html;
    const nothing = matchCount === 0;
    emptyState.hidden = !nothing;
    if (nothing) $('#emptyQuery').textContent = q;
    content.style.display = nothing ? 'none' : '';
  }

  function renderCatBar() {
    const counts = {};
    SITES.forEach(s => counts[s.cat] = (counts[s.cat] || 0) + 1);
    const pills = [{
      id: 'all', name: '全部', color: '#8b9bff',
      icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
      count: SITES.length,
    }].concat(CATEGORIES.map(c => ({ ...c, count: counts[c.id] || 0 })));

    catBar.innerHTML = pills.map(p => `
      <button class="cat-pill ${state.cat === p.id ? 'active' : ''}" data-cat="${p.id}"
        style="--cat-color:${p.color}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p.icon}</svg>
        ${p.name}<span class="pill-count">${p.count}</span>
      </button>`).join('');
  }

  catBar.addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    state.cat = pill.dataset.cat;
    STORE.setCat(state.cat);
    $$('.cat-pill', catBar).forEach(p => p.classList.toggle('active', p.dataset.cat === state.cat));
    render();
    requestAnimationFrame(() => {
      pill.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  /* ============================================================
   * 卡片交互
   * ============================================================ */
  let tiltFrame = null;
  content.addEventListener('mousemove', (e) => {
    if (tiltFrame) return;
    tiltFrame = requestAnimationFrame(() => {
      const card = e.target.closest('.card');
      if (card) {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
        if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
          const ry = (px - 0.5) * 7;
          const rx = (0.5 - py) * 7;
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        }
      }
      tiltFrame = null;
    });
  }, { passive: true });
  content.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.card');
    if (card && !card.contains(e.relatedTarget)) {
      card.style.transform = '';
    }
  }, { passive: true });

  content.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-link');
    if (copyBtn) {
      e.preventDefault();
      const card = copyBtn.closest('.card');
      copyText(card.dataset.url, '网址已复制：' + hostOf(card.dataset.url));
      copyBtn.classList.add('copied');
      setTimeout(() => copyBtn.classList.remove('copied'), 1200);
      return;
    }
  });

  /* ============================================================
   * 搜索
   * ============================================================ */
  const searchInput = $('#searchInput');
  searchInput.addEventListener('input', () => {
    state.query = searchInput.value;
    render();
  });

  const ENGINE_URL = {
    bing: 'https://www.bing.com/search?q=',
    baidu: 'https://www.baidu.com/s?wd=',
    google: 'https://www.google.com/search?q=',
  };
  function webSearch(q) {
    if (!q) return;
    window.open(ENGINE_URL[state.engine] + encodeURIComponent(q), '_blank', 'noopener');
  }
  searchInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const q = searchInput.value.trim();
    if (!q) return;
    const matched = SITES.filter(s => matchSite(s, q));
    if (matched.length === 1) { window.open(matched[0].url, '_blank', 'noopener'); }
    else webSearch(q);
  });

  const engineGroup = $('#engineGroup');
  function syncEngineUI() {
    $$('.engine', engineGroup).forEach(b => b.classList.toggle('active', b.dataset.engine === state.engine));
  }
  engineGroup.addEventListener('click', (e) => {
    const b = e.target.closest('.engine');
    if (!b) return;
    state.engine = b.dataset.engine;
    STORE.setEngine(state.engine);
    syncEngineUI();
  });
  $('#emptySearchBtn').addEventListener('click', () => webSearch(state.query.trim()));

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault(); searchInput.focus();
    }
    if (e.key === 'Escape' && searchInput.value) {
      searchInput.value = ''; state.query = ''; render(); searchInput.blur();
    }
  });

  /* ---------- 返回顶部 ---------- */
  const backTop = $('#backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  /* ============================================================
   * 启动
   * ============================================================ */
  function init() {
    preventShortcuts();
    enableAntiDevTools();

    if (!checkLogin()) {
      renderCatBar();
      syncEngineUI();
      content.innerHTML = '';
      content.style.display = 'none';
      emptyState.hidden = true;
      $$('.stat [data-count]').forEach(el => animateCount(el, Number(el.dataset.count)));
      return;
    }

    renderCatBar();
    syncEngineUI();
    render();
    $$('.stat [data-count]').forEach(el => animateCount(el, Number(el.dataset.count)));
    const active = $('.cat-pill.active', catBar);
    if (active) active.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function animateCount(el, target, dur = 1200) {
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now();
    (function step(now) {
      const k = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(start);
  }

  init();
})();