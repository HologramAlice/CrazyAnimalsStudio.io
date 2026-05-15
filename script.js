/* ─── i18n ─────────────────────────────────── */
const translations = {
    ru: {
        'nav-projects':          'Проекты',
        'nav-about':             'О нас',
        'nav-join':              'Вступить',
        'hero-tag':              'CAS_v1 · СПБ · EST. 2024',
        'hero-sub':              'Инди-геймдев из Питера.',
        'hero-btn-projects':     '// Проекты',
        'marquee-city':          'Питер · СПБ',
        'marquee-indie':         'инди-геймдев',
        'tag-current-build':     '// 製作中 · текущая разработка',
        'active-badge':          '● 開発中 · ACTIVE',
        'tag-thoughts':          'мысли',
        'btn-follow':            'следить ↗',
        'art-not-ready-featured':'// арт ещё не готов · 未定',
        'tag-about':             '// スタジオ · о студии',
        'stat-games':            'выпущено игр',
        'stat-ideas':            'идей',
        'stat-members':          'участников',
        'stat-engine':           'движок',
        'roles-sub':             '自分たちのペースで · своим темпом',
        'role-dev':              'Разработка',
        'role-narrative':        'Нарратив',
        'role-sound':            'Звук',
        'tag-all-projects':      '// 全プロジェクト · все проекты',
        'status-active':         '開発中 · В РАЗРАБОТКЕ',
        'status-ideas':          'アイデア · ИДЕИ',
        'art-pending':           '// арт не готов · 未定',
        'art-pending-short':     '// арт не готов',
        'bc-final':              '// blood_candy · финал',
        'join-tag-word':         'вступить',
        'join-desc':             'Ищем: разработчиков, художников, нарративщиков, звуковых дизайнеров.<br>// Стек прога: Unity 6 · Git &amp; GitLab · C#<br>// Стек художника: Aseprite · Blender',
        'join-perk-1':           'реальные проекты с первого дня',
        'join-perk-2':           'нормальный git-workflow',
        'join-perk-4':           'долгосрочно · 長期的',
        'join-placeholder':      'Чем занимаешься. Что умеешь. Зачем сюда.',
        'footer-copy':           '© 2026 · Санкт-Петербург',
        'stat-many':             'много',
        'role-writing':          'Сценарий',
        'badge-active':          'АКТИВЕН',
        'badge-idea':            'Идея',
    },
    en: {
        'nav-projects':          'Projects',
        'nav-about':             'About',
        'nav-join':              'Join',
        'hero-tag':              'CAS_v1 · SPB · EST. 2024',
        'hero-sub':              'Indie gamedev from Saint Petersburg.',
        'hero-btn-projects':     '// Projects',
        'marquee-city':          'SPB · Russia',
        'marquee-indie':         'indie-gamedev',
        'tag-current-build':     '// 製作中 · current build',
        'active-badge':          '● 開発中 · ACTIVE',
        'tag-thoughts':          'thoughts',
        'btn-follow':            'follow ↗',
        'art-not-ready-featured':'// art not ready yet',
        'tag-about':             '// スタジオ · about',
        'stat-games':            'games released',
        'stat-ideas':            'ideas',
        'stat-members':          'members',
        'stat-engine':           'engine',
        'roles-sub':             '自分たちのペースで · at our own pace',
        'role-dev':              'Development',
        'role-narrative':        'Narrative',
        'role-sound':            'Sound',
        'tag-all-projects':      '// 全プロジェクト · all projects',
        'status-active':         '開発中 · IN DEVELOPMENT',
        'status-ideas':          'アイデア · IDEAS',
        'art-pending':           '// art not ready · 未定',
        'art-pending-short':     '// art not ready',
        'bc-final':              '// blood_candy · final',
        'join-tag-word':         'join',
        'join-desc':             'Looking for: developers, artists, narrative designers, sound designers.<br>// Dev stack: Unity 6 · Git &amp; GitLab · C#<br>// Art stack: Aseprite · Blender',
        'join-perk-1':           'real projects from day one',
        'join-perk-2':           'proper git-workflow',
        'join-perk-4':           'long-term · 長期的',
        'join-placeholder':      'What you do. What you know. Why here.',
        'footer-copy':           '© 2026 · Saint Petersburg',
        'stat-many':             'a lot',
        'role-writing':          'Screenwriting',
        'badge-active':          'ACTIVE',
        'badge-idea':            'Idea',
    }
};

let currentLang = 'en';

/* ─── Scramble effect ────────────────────────── */
const SCRAMBLE_CHARS = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯabcdefghijklmnopqrstuvwxyz0123456789#@!_·/><';

function scrambleElement(el, targetText, duration = 420) {
    const steps = 9;
    const interval = duration / steps;
    let step = 0;

    if (el._scrambleTimer) {
        clearInterval(el._scrambleTimer);
        el._scrambleTimer = null;
    }

    el._scrambleTimer = setInterval(() => {
        step++;
        if (step >= steps) {
            el.textContent = targetText;
            clearInterval(el._scrambleTimer);
            el._scrambleTimer = null;
            return;
        }
        const resolved = Math.floor((step / steps) * targetText.length);
        let out = targetText.slice(0, resolved);
        for (let i = resolved; i < targetText.length; i++) {
            const ch = targetText[i];
            if (ch === ' ' || ch === '·' || ch === '/') {
                out += ch;
            } else {
                out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            }
        }
        el.textContent = out;
    }, interval);
}

function setLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('cas-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const val = translations[lang][key];
        if (val === undefined) return;

        if (/<[a-z]/i.test(val)) {
            el.innerHTML = val;
        } else {
            scrambleElement(el, val);
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[lang][key] !== undefined) {
            el.placeholder = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

/* ─── Theme ──────────────────────────────────── */
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('cas-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '◑' : '◐';
}

/* ─── Init ───────────────────────────────────── */
(function init() {
    const savedLang = localStorage.getItem('cas-lang');
    setLang(savedLang || 'en');

    const savedTheme = localStorage.getItem('cas-theme') || 'light';
    applyTheme(savedTheme);
})();

/* ─── 3D Tilt на карточках ───────────────────── */
document.querySelectorAll('.media-card').forEach((card) => {
    const frame = card.querySelector('.media-card-frame');
    let entered = false;

    card.addEventListener('mouseenter', () => {
        frame.style.transition = 'box-shadow 0.25s';
        entered = true;
    });
    card.addEventListener('mousemove', e => {
        if (!entered) return;
        const rect = frame.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        frame.style.transform  = `translateY(-16px) scale(1.05) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
        frame.style.boxShadow  = `
            ${dx * -8}px ${dy * -8 + 28}px 56px rgba(0,0,0,0.25),
            0 8px 16px rgba(0,0,0,0.12),
            0 0 0 1px rgba(200,214,43,0.35)
        `;
    });
    card.addEventListener('mouseleave', () => {
        entered = false;
        frame.style.transition = 'transform 0.4s cubic-bezier(0.22,0.61,0.36,1), box-shadow 0.4s';
        frame.style.transform  = '';
        frame.style.boxShadow  = '';
    });
});

/* ─── Scroll reveal ──────────────────────────── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const delay = parseFloat(e.target.dataset.delay || 0);
            setTimeout(() => {
                e.target.style.opacity   = '1';
                e.target.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.media-card').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition= 'opacity 0.55s ease, transform 0.55s ease';
    el.dataset.delay   = i * 80;
    observer.observe(el);
});

document.querySelectorAll('.stat').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition= 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay   = i * 60;
    observer.observe(el);
});

document.querySelectorAll('.role-bubble').forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(16px) scale(0.9)';
    el.style.transition= 'opacity 0.4s ease, transform 0.4s ease';
    el.dataset.delay   = i * 70;
    observer.observe(el);
});

/* ─── Счётчики в stats ───────────────────────── */
const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el  = e.target;
        const text = el.textContent;
        const num  = parseInt(text);
        if (isNaN(num)) return;
        const suffix = text.replace(String(num), '');
        let start = 0;
        const dur = 900, step = 16;
        const inc = num / (dur / step);
        const timer = setInterval(() => {
            start = Math.min(start + inc, num);
            el.innerHTML = Math.floor(start) + '<span>' + suffix.replace(/\d/g, '') + '</span>';
            if (start >= num) clearInterval(timer);
        }, step);
        counterObs.unobserve(el);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));
