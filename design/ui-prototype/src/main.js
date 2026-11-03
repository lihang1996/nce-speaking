import { screens } from './screens.js';

const nav = document.getElementById('screenNav');
const select = document.getElementById('screenSelect');
const device = document.getElementById('device');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('navBackdrop');
const menuButton = document.getElementById('menuButton');
let current = Math.max(0, screens.findIndex(s => s.id === (location.hash || '#today').slice(1)));
if (current < 0) current = 0;

const groups = [...new Set(screens.map(s => s.group))];
nav.innerHTML = groups.map(group => `<div class="nav-group"><span class="nav-group-title">${group}</span>${screens.map((s,i) => s.group === group ? `<button class="screen-link" data-index="${i}"><span class="num">${String(i+1).padStart(2,'0')}</span><span>${s.name}</span></button>` : '').join('')}</div>`).join('');
select.innerHTML = screens.map((s,i) => `<option value="${i}">${String(i+1).padStart(2,'0')} · ${s.name}</option>`).join('');

function render(index, pushHash = true) {
  current = Math.max(0, Math.min(screens.length - 1, Number(index)));
  const screen = screens[current];
  device.innerHTML = screen.render();
  document.getElementById('pageTitle').textContent = screen.name;
  document.getElementById('pageGroup').textContent = `${screen.group} · ${screen.stage}`;
  document.getElementById('pageCounter').textContent = `${String(current+1).padStart(2,'0')} / ${screens.length}`;
  select.value = String(current);
  nav.querySelectorAll('.screen-link').forEach((el,i) => {
    el.classList.toggle('active', i === current);
    if (i === current) el.setAttribute('aria-current','page'); else el.removeAttribute('aria-current');
  });
  document.getElementById('prevPage').disabled = current === 0;
  document.getElementById('nextPage').disabled = current === screens.length - 1;
  document.title = `${screen.name} · 每日开口 UI 设计稿`;
  if (pushHash && location.hash !== `#${screen.id}`) history.pushState(null,'',`#${screen.id}`);
  closeMenu();
}

function go(id) {
  const index = screens.findIndex(s => s.id === id);
  if (index >= 0) render(index);
}
function closeMenu() {
  sidebar.classList.remove('open');
  backdrop.classList.remove('show');
  menuButton.setAttribute('aria-expanded','false');
}
let toastTimer;
function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

nav.addEventListener('click', e => { const b = e.target.closest('[data-index]'); if (b) render(b.dataset.index); });
select.addEventListener('change', () => render(select.value));
document.getElementById('prevPage').addEventListener('click', () => render(current - 1));
document.getElementById('nextPage').addEventListener('click', () => render(current + 1));
menuButton.addEventListener('click', () => {
  const open = !sidebar.classList.contains('open');
  sidebar.classList.toggle('open', open);
  backdrop.classList.toggle('show', open);
  menuButton.setAttribute('aria-expanded',String(open));
});
backdrop.addEventListener('click', closeMenu);
window.addEventListener('popstate', () => { const i = screens.findIndex(s => s.id === location.hash.slice(1)); if(i>=0) render(i,false); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });

const messages = {
  audio:'正在播放美声示范',speed:'已切换播放速度',pause:'已暂停，回来后可继续当前轮次','show-text':'课文已显示','add-word':'已加入复习，不会重复创建','send-code':'验证码已发送，10 分钟内有效','reset-password':'密码已重设，请使用新密码登录','import-file':'已打开资料包选择入口','retry-import':'已重新检查，缺失课程仍不影响其他课','show-notes':'本课注释：Pardon? 全句为 I beg your pardon.','switch-role':'已交换角色，现在由你演 A','more-hint':'提示：handbag 意思是“手提包”','practice-none':'已记录为无法判断，不推断会或不会','practice-bad':'已标记为不会，并加入复习','review-none':'已记录无有效评价，默认次日复核','review-close':'已记录“差一点”，按复习规则安排','review-bad':'已记录“不会”，回到 S0','review-good':'答对了，本次复习已完成','skip-review':'今天不再推送本题，待处理负担不变','remove-word':'已移出自动推荐，历史与目标分母不变',sort:'已按下次复习时间排序',setting:'设置项已选中',duration:'每日时长已更新','page':'已翻页','chat-help':'已提供辅助，本轮对话继续','delete-course':'再次确认后才会删除本课记录','delete-all':'再次确认后才会删除全部数据','delete-account':'删除账号前会再次说明影响',logout:'已退出登录，本机学习数据仍保留','budget-adjust':'可设置新的每月预算，不会自动扣费'
};

document.addEventListener('click', e => {
  const goButton = e.target.closest('[data-go]');
  if (goButton) { go(goButton.dataset.go); return; }
  const button = e.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'login') {
    const user = document.getElementById('login-user');
    const pass = document.getElementById('login-pass');
    if (!user?.value.trim() || !pass?.value) { toast('请输入账号和密码'); return; }
    go('today'); return;
  }
  if (action === 'toggle') {
    const toggle = button.querySelector('.toggle');
    toggle?.classList.toggle('on');
    toast(toggle?.classList.contains('on') ? '每日提醒已开启' : '每日提醒已关闭'); return;
  }
  if (action === 'review-good') { go('review-empty'); toast(messages[action]); return; }
  if (action === 'show-text') { go('listening'); return; }
  if (action === 'restore-confirm') { go('backup'); toast('恢复完成，已继续原轮次和当日额度'); return; }
  toast(messages[action] || '此操作状态已在设计稿中展示');
});

render(current, false);
