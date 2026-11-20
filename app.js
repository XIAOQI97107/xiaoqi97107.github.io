(() => {
  'use strict';
  const p = window.PROFILE;
  if (!p) return;
  const github = `https://github.com/${encodeURIComponent(p.username)}`;
  document.querySelectorAll('[data-name]').forEach(el => { el.textContent = p.name; });
  document.querySelectorAll('.github-link').forEach(el => { el.href = github; });
  document.title = `${p.name} · 个人作品集`;
  document.querySelector('meta[name="description"]').content = `${p.name} 的个人作品集：项目、技能与联系。`;
  document.getElementById('introduction').textContent = p.introduction;
  document.getElementById('about-copy').textContent = p.about;
  if (p.headline !== '把想法，变成作品。') document.getElementById('hero-title').textContent = p.headline;
  document.getElementById('year').textContent = new Date().getFullYear();
  const safeURL = value => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
    catch { return null; }
  };
  const make = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  const projects = Array.isArray(p.projects) ? p.projects : [];
  document.getElementById('project-empty').hidden = projects.length > 0;
  projects.forEach(project => {
    const card = make('article', '', 'project');
    card.append(make('h3', project.title), make('p', project.description));
    const tags = make('div', '', 'tags');
    (project.tags || []).forEach(tag => tags.append(make('span', tag, 'tag')));
    card.append(tags);
    const url = safeURL(project.url);
    if (url) {
      const link = make('a', '查看项目', 'text-link');
      Object.assign(link, { href: url, target: '_blank', rel: 'noopener noreferrer' });
      card.append(link);
    }
    document.getElementById('project-list').append(card);
  });
  const skills = Array.isArray(p.skills) ? p.skills : [];
  document.getElementById('skills-empty').hidden = skills.length > 0;
  skills.forEach(skill => document.getElementById('skills').append(make('span', skill, 'skill')));
  if (p.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
    const email = document.getElementById('email-link');
    email.href = `mailto:${encodeURIComponent(p.email)}`;
    email.hidden = false;
  }
  const root = document.documentElement;
  const toggle = document.querySelector('.theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)');
  let saved = null;
  try { saved = localStorage.getItem('portfolio-theme'); } catch {}
  let isDark = saved ? saved === 'dark' : preferredDark.matches;
  function setTheme(dark) {
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#171e19' : '#f7f8f5';
  }
  setTheme(isDark);
  toggle.addEventListener('click', () => {
    isDark = !isDark;
    setTheme(isDark);
    saved = isDark ? 'dark' : 'light';
    try { localStorage.setItem('portfolio-theme', saved); } catch {}
  });
  preferredDark.addEventListener('change', event => {
    if (!saved) { isDark = event.matches; setTheme(isDark); }
  });
})();
