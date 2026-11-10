// 新视觉方案 · 其余 40 屏（PRD v2.5.6）。和核心页共用组件与样式，尺寸同样按 390 × 844 dp。
import { sbar, nav, abar, segs, LINES } from './screens.js';

// ---------- 小组件 ----------
const T = (k) => (k ? `background:var(--${k}-tint);color:var(--${k}-deep)` : 'background:var(--chip);color:var(--ink)');
const tile = (icon, k) => `<div class="tile" style="${T(k)}"><i class="ti ${icon}"></i></div>`;
const medal = (icon, k) => `<div class="medal" style="${T(k)}"><i class="ti ${icon}"></i></div>`;
const nt = (icon, html, cls = '') => `<div class="nt ${cls}"><i class="ti ${icon}"></i><p>${html}</p></div>`;
const fld = (label, inner, cls = '') => `<div class="fld"><span>${label}</span><div class="inp ${cls}">${inner}</div></div>`;
const GO = '<i class="ti ti-chevron-right go"></i>';
const row = (icon, k, title, sub, right = GO, cls = '') =>
  `<div class="li ${cls}">${icon ? tile(icon, k) : ''}<div class="tx"><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div>${right}</div>`;
const val = (v) => `<span class="v">${v}<i class="ti ti-chevron-right"></i></span>`;
const chipK = (k, html) => `<span class="chip sm tint" style="${T(k)}">${html}</span>`;
const pwd = '<span class="dots">••••••••</span><i class="ti ti-eye-off end"></i>';
const EV = '<div class="ev"><button class="g"><i class="ti ti-circle-check"></i>答对了</button><button class="y"><i class="ti ti-circle-half-2"></i>差一点</button><button class="n"><i class="ti ti-circle-x"></i>不会</button></div>';

// 每日时间分配（PRD 7.1）：复习 / 新课 / 跟读 / 练习 / 休息与小结
const PLAN = { 60: [5, 15, 20, 15, 5], 45: [5, 10, 15, 10, 5], 30: [5, 10, 10, 5, 0] };
const KS = ['review', 'listen', 'speak', 'practice'];
const bud = (m, scale) => `<div class="budget"${scale ? ` style="width:${(m / 60) * 100}%"` : ''}>${PLAN[m].map((f, i) => (f ? `<i style="flex:${f};background:${i < 4 ? `var(--${KS[i]})` : 'var(--line-2)'}"></i>` : '')).join('')}</div>`;
const LEG = `<div class="legend">${[['review', '复习'], ['listen', '新课'], ['speak', '跟读'], ['practice', '练习'], ['', '休息']].map(([k, n]) => `<span><b style="background:${k ? `var(--${k})` : 'var(--line-2)'}"></b>${n}</span>`).join('')}</div>`;

const logo = `<div class="logo">${['listen', 'speak', 'practice', 'review'].map((k) => `<i style="background:var(--${k})"></i>`).join('')}</div>`;

const player = ({ k = 'listen', spd = '1.0×', prog = '3 / 7', time = '0:14 / 0:37', w = 40, modes = false } = {}) => `<div class="player${modes ? '' : ' nm'}">
  <div class="prog"><span>${prog}</span><div class="bar"><i style="width:${w}%;background:var(--${k})"></i></div><span>${time}</span></div>
  <div class="ctl"><span class="chip sm">${spd}</span><button class="ibtn" aria-label="上一句"><i class="ti ti-player-skip-back"></i></button><button class="play" aria-label="暂停"><i class="ti ti-player-pause"></i></button><button class="ibtn" aria-label="下一句"><i class="ti ti-player-skip-forward"></i></button><span class="chip sm"><i class="ti ti-repeat-once"></i>单句</span></div></div>`;

// 单元学习进度：先听看懂 → 跟读 → 练习 → 换情境（两课学完后）
const track = () => `<div class="track">${[
  ['ti-headphones', 'listen', '先听看懂', 'done', '已完成'],
  ['ti-speakerphone', 'speak', '跟读', 'now', '进行中'],
  ['ti-pencil', 'practice', '练习', '', '未开始'],
  ['ti-lock', null, '换情境', 'lock', '两课学完后'],
].map(([ic, k, t, s, sub]) => `<div class="tk ${s}"><span class="tk-i" style="${T(k)}"><i class="ti ${s === 'done' ? 'ti-check' : ic}"></i></span><b>${t}</b><small>${sub}</small></div>`).join('')}</div>`;

const ST = { g: ['ti-circle-check', '初步巩固 · 自评'], y: ['ti-refresh', '待巩固'], k: ['ti-player-play', '学习中'], '': ['ti-circle-dashed', '未开始'] };
const stt = (c) => `<span class="stt ${c}"><i class="ti ${ST[c][0]}"></i>${ST[c][1]}</span>`;

// ---------- 开始使用 ----------
const start = [
  {
    id: 'login', name: '登录', note: '已有账号直接登录',
    render: () => `<div class="screen">${sbar()}<div class="auth">${logo}<span class="eyebrow">每日开口</span><h1 class="h1">欢迎回来</h1><p class="lead">继续今天的英语开口练习</p>
${fld('账号或邮箱', 'leon')}${fld('密码', pwd)}
<button class="btn pri gap">登录</button><div class="links"><button>忘记密码</button><b></b><button>注册账号</button></div></div>
<div class="fill"></div><p class="legal"><i class="ti ti-device-mobile"></i>学习记录保存在这台手机上，断网也能学</p></div>`,
  },
  {
    id: 'login-error', name: '登录 · 输入错误', note: '不提示是账号还是密码错',
    render: () => `<div class="screen">${sbar()}<div class="auth">${logo}<span class="eyebrow">每日开口</span><h1 class="h1">欢迎回来</h1><p class="lead">你的学习记录还在这里</p>
${nt('ti-alert-circle', '账号或密码不正确，请再试一次', 'err')}
${fld('账号或邮箱', 'leon')}${fld('密码', '<span class="ph">输入密码</span><i class="ti ti-eye-off end"></i>', 'focus')}
<button class="btn pri gap">登录</button><div class="links"><button>忘记密码</button></div></div>
<div class="fill"></div><p class="legal"><i class="ti ti-device-mobile"></i>学习记录保存在这台手机上，断网也能学</p></div>`,
  },
  {
    id: 'register', name: '注册', note: '邮箱验证后才能完成注册',
    render: () => `<div class="screen">${sbar()}${abar('创建账号')}<div class="form">
<p class="lead0">账号只用于登录、找回密码和语音服务验证，学习记录保存在这台手机上。</p>
${fld('账号', 'leon')}
${fld('邮箱 · 用于找回密码', 'leon@example.com<button class="code off">已发送 · 52 秒</button>')}
${fld('邮箱验证码', '<span class="ph">输入 6 位验证码</span>', 'focus')}
${fld('设置密码', pwd)}
${fld('再输入一次密码', '<span class="dots">••••••••</span>')}
<p class="hint2"><i class="ti ti-info-circle"></i>一个邮箱只能注册一个账号</p></div>
<div class="fill"></div><div class="dock"><button class="btn pri">验证并注册</button></div></div>`,
  },
  {
    id: 'forgot', name: '找回密码', note: '验证码 10 分钟内有效',
    render: () => `<div class="screen">${sbar()}${abar('找回密码')}<div class="form">
<p class="lead0">输入注册邮箱，我们会发一个 10 分钟内有效的验证码。</p>
${fld('注册邮箱', 'leon@example.com<button class="code off">已发送 · 48 秒</button>')}
${fld('验证码', '<span>482916</span>')}
${fld('新密码', '<span class="ph">设置新密码</span>', 'focus')}
${fld('再输入一次新密码', '<span class="ph">再输入一次</span>')}</div>
<div class="fill"></div><div class="dock"><button class="btn pri">重设密码</button></div></div>`,
  },
  {
    id: 'onboarding', name: '首次设置 · 时长', note: '三步中的第 1 步，不申请麦克风',
    render: () => `<div class="screen">${sbar()}${abar('首次设置')}<div class="pad">
<div class="segs ink"><i class="d"></i><i></i><i></i></div>
<h1 class="h2">每天愿意花多少时间？</h1><p class="lead">不用凑满，忙的时候选短一点，之后也能在设置里改。</p>
<div class="opts">${[[60, '推荐', true, '复习 5 · 新课 15 · 跟读 20 · 练习 15 · 休息 5 分钟'], [45, '适中'], [30, '忙时', false, '']].map(([m, tag, on, d]) => `<div class="opt${on ? ' on' : ''}"><div class="opt-h"><span class="radio"></span><b>${m} 分钟</b><span class="chip sm">${tag}</span></div>${bud(m, true)}${d ? `<p>${d}</p>` : ''}</div>`).join('')}</div>
<div style="margin-top:12px">${LEG}</div></div>
<div class="fill"></div><div class="dock"><button class="btn pri">继续</button><p class="note">接下来：每日提醒（可跳过）· 试听一句示范</p></div></div>`,
  },
  {
    id: 'import', name: '装入课程资料', note: '装入进度，只需一次',
    render: () => `<div class="screen">${sbar()}${abar('装入课程资料')}<div class="pad">
<div class="hero-c">${medal('ti-package')}<h1 class="h2">一次装入，之后离线学习</h1><p class="lead">新概念英语第一册 · 72 个单元（144 课）</p></div>
<div class="card file"><div class="file-h"><i class="ti ti-file-zip"></i><div class="tx"><b>NCE1-课程资料包.zip</b><span>138 MB · 正在装入</span></div><span class="pct">64%</span></div><div class="bar"><i style="width:64%;background:var(--ink)"></i></div><p class="file-n">已就绪 46 / 72 个单元</p></div>
<div class="card inc"><b class="inc-t">资料包包含</b>${[['ti-file-text', '课文与译文'], ['ti-headphones', '美音原声'], ['ti-vocabulary', '生词表与注释'], ['ti-photo', '练习课书页']].map(([ic, t]) => `<span><i class="ti ${ic}"></i>${t}</span>`).join('')}</div></div>
<div class="fill"></div><div class="dock"><button class="btn pri off">装入完成后开始学习</button><p class="note">只需装入一次；缺失的课不影响其他课</p></div></div>`,
  },
  {
    id: 'import-missing', name: '装入结果 · 缺课', note: '缺失的课不影响其他课',
    render: () => `<div class="screen">${sbar()}${abar('装入结果')}<div class="pad">
<div class="hero-c">${medal('ti-circle-check', 'review')}<h1 class="h2">大部分课程已就绪</h1><p class="lead">已就绪 70 / 72 个单元（140 / 144 课）</p></div>
<div class="list">${row('ti-file-text', null, '课文、译文、生词和书页', '144 / 144 课', '<i class="ti ti-circle-check okc"></i>')}${row('ti-headphones', null, '原声音频', '缺第 137～140 课', '<i class="ti ti-alert-triangle warnc"></i>')}</div>
${nt('ti-info-circle', '第 137～140 课的音频没找到，课文和书页已保留。其他课不受影响，可以先开始学习。')}</div>
<div class="fill"></div><div class="dock"><button class="btn pri">先开始学习</button><button class="btn sec">重新检查资料包</button></div></div>`,
  },
  {
    id: 'mic-intro', name: '麦克风说明', note: '第一次用语音功能前出现', stage: 'M2',
    render: () => `<div class="screen">${sbar()}${abar('声音怎么用', '<span></span>', 'ti-x')}<div class="pad">
<div class="hero-c">${medal('ti-microphone', 'speak')}<h1 class="h2">只在你主动开始时录音</h1><p class="lead">听读、跟读、练习和复习都不用麦克风</p></div>
<div class="list">${row('ti-microphone', 'speak', '检查发音', '只录当前这一次，处理完即删除', '')}${row('ti-messages', 'speak', 'AI 对话', '会话期间使用麦克风，不保存录音', '')}${row('ti-speakerphone', null, '普通跟读', '不录音，放心开口', '')}</div>
${nt('ti-shield-check', '拒绝授权也能完成全部 M1 学习。')}</div>
<div class="fill"></div><div class="dock"><button class="btn pri">允许并继续</button><button class="btn txt">暂不使用</button></div></div>`,
  },
];

// ---------- 今日与课程 ----------
const UNITS = [['3–4', 'Sorry, sir.', '对不起，先生'], ['5–6', 'Nice to meet you.', '很高兴见到你'], ['7–8', 'Are you a teacher?', '你是教师吗？'], ['9–10', 'How are you today?', '你今天好吗？']];
const VOC = [['excuse me', '对不起', '重点短语'], ['excuse', '原谅'], ['me', '我（宾格）'], ['yes', '是的'], ['is', '是'], ['this', '这'], ['your', '你的，你们的'], ['handbag', '（女用）手提包', '重点'], ['pardon', '原谅，请再说一遍', '重点'], ['it', '它'], ['thank you', '感谢你（们）', '重点'], ['very much', '非常地']];

const today = [
  {
    id: 'today-recovery', name: '今日 · 中断恢复', note: '几天没学，回来的第一天',
    render: () => `<div class="screen">${sbar()}
<div class="hello"><div><small>11 月 4 日 · 周三</small><h1>欢迎回来，Leon</h1></div><div class="me">L</div></div>
<p class="lead pad" style="margin-top:-8px">几天没学也没关系，不用补欠账，从一小步继续就好。</p>
<div class="sec-t"><b>今天的恢复计划</b><span>明天起照常</span></div>
<div class="steps">
  <div class="step now rv"><div class="row"><div class="tile" style="background:var(--card);color:var(--review-deep)"><i class="ti ti-cards"></i></div><div class="tx"><span class="eyebrow">现在 · 约 5 分钟</span><b>复习 · 10 项</b><span>默认量，想多做可以继续</span></div></div><button class="btn pri">开始复习<i class="ti ti-arrow-right"></i></button></div>
  <div class="step">${tile('ti-headphones', 'listen')}<div class="tx"><b>重温 · 第 1 课听读</b><span>先听 · 看懂</span></div></div>
  <div class="step">${tile('ti-speakerphone', 'speak')}<div class="tx"><b>重温 · 第 1 课跟读</b><span>逐句 → 影子 → 分角色</span></div></div>
  <div class="step lock">${tile('ti-lock', null)}<div class="tx"><b>新课</b><span>今天不开新单元，明天起照常</span></div></div>
</div>
<div class="pad">${nt('ti-info-circle', '回来时有 12 项已到期：每天最多占一半复习位置，慢慢处理，不挡新课。')}</div>
<div class="fill"></div>${nav('today')}</div>`,
  },
  {
    id: 'plan', name: '今日计划', note: '调整今天的时长',
    render: () => `<div class="screen">${sbar()}${abar('今日计划')}
<div class="seg n3"><span>30 分钟</span><span>45 分钟</span><span class="on">60 分钟</span></div>
<div class="sum"><div class="sum-top"><span class="big">2<small>/ 4 项已完成</small></span><span class="r">还剩约 35 分钟</span></div>${bud(60)}${LEG}</div>
<div class="list mx" style="margin-top:12px">${[
  ['ti-cards', 'review', '复习 · 8 项', '已完成', '5 分钟', 'done'],
  ['ti-headphones', 'listen', '新课 · 第 1 课', '先听、看懂、点词跟读', '15 分钟', 'done'],
  ['ti-speakerphone', 'speak', '跟读 · 进行中', '逐句、影子、分角色', '20 分钟', 'now'],
  ['ti-pencil', 'practice', '练习 · 4 题', '普通题与换情境', '15 分钟', ''],
  ['ti-coffee', null, '休息与结束小结', '', '5 分钟', ''],
].map(([ic, k, t, s, m, st]) => row(st === 'done' ? 'ti-check' : ic, k, t, s, `<span class="v">${m}</span>`, st)).join('')}</div>
<div class="pad">${nt('ti-info-circle', '时间只是建议，可以提前结束，也可以主动继续。语块训练和换情境占用练习时间，不另外加时。')}</div></div>`,
  },
  {
    id: 'courses', name: '课程', note: '课程列表，以单元为单位',
    render: () => `<div class="screen">${sbar()}
<div class="hello"><div><small>新概念英语第一册 · 72 个单元</small><h1>课程</h1></div><button class="me" aria-label="课程状态"><i class="ti ti-chart-bar"></i></button></div>
<div class="unit-now"><span class="eyebrow">当前单元 · 第 1–2 课</span><h2 class="en">Excuse me!</h2><p>对不起 · 第 1 课课文，第 2 课练习</p>${track()}<button class="btn pri">继续跟读<i class="ti ti-arrow-right"></i></button></div>
<div class="sec-t"><b>全部单元</b><span>已就绪 72 / 72</span></div>
<div class="list mx">${UNITS.map(([n, en, zh]) => `<div class="li"><span class="num">${n}</span><div class="tx"><b class="en">${en}</b><span>${zh}</span></div><span class="st">未开始</span></div>`).join('')}</div>
<div class="fill"></div>${nav('courses')}</div>`,
  },
  {
    id: 'course-detail', name: '课程详情', note: '一个学习单元 = 单数课 + 双数练习课',
    render: () => `<div class="screen">${sbar()}${abar('第 1–2 课', '<button class="ibtn" aria-label="更多"><i class="ti ti-dots"></i></button>')}
<div class="pad"><span class="eyebrow muted">学习单元 · 学习中</span><h1 class="lt en">Excuse me!</h1><p class="lead">第 1 课 课文 · 第 2 课 看图说句子</p></div>
<div class="card mx" style="margin-top:16px">${track()}</div>
<div class="sec-t"><b>本单元内容</b></div>
<div class="grid3">${[['ti-headphones', 'listen', '听读'], ['ti-vocabulary', 'listen', '生词'], ['ti-book-2', null, '原书页'], ['ti-pencil', 'practice', '练习'], ['ti-arrows-shuffle', 'practice', '换情境', '两课学完后'], ['ti-notes', null, '注释']]
  .map(([ic, k, t, s]) => `<div class="g3${s ? ' lock' : ''}">${tile(ic, s ? null : k)}<b>${t}</b>${s ? `<small><i class="ti ti-lock"></i>${s}</small>` : ''}</div>`).join('')}</div>
<div class="fill"></div><div class="dock"><button class="btn pri">继续跟读<i class="ti ti-arrow-right"></i></button></div></div>`,
  },
  {
    id: 'listen-blind', name: '先听后看', note: '文字先藏起来，整课听两遍',
    render: () => `<div class="screen"><div class="top listen">${sbar()}${abar('先听后看', '<button class="ibtn" aria-label="原书页"><i class="ti ti-book-2"></i></button>')}
<div class="lhero"><span class="eyebrow" style="color:var(--listen-deep)">第 1 遍 / 共 2 遍 · 只听不看</span><h1 class="lt en">Excuse me!</h1>
<div class="q"><span class="k">边听边想</span><span class="v en">Whose handbag is it?</span></div></div></div>
<div class="body"><div class="blind">${LINES.map(([r], i) => `<div class="bl"><span class="av ${r.toLowerCase()}">${r}</span><i style="width:${[38, 18, 62, 26, 62, 30, 56][i]}%"></i></div>`).join('')}
<div class="blind-c"><i class="ti ti-eye-off"></i><b>课文先藏起来</b><span>整课听两遍，再看文字核对</span><button class="btn sec">听完了，显示课文</button></div></div></div>
${player({ prog: '第 1 遍', time: '0:14 / 0:37', w: 38 })}</div>`,
  },
  {
    id: 'word', name: '单词弹层', note: '点课文里的词打开',
    render: () => `<div class="screen"><div class="top listen">${sbar()}${abar('第 1 课', '<button class="ibtn" aria-label="原书页"><i class="ti ti-book-2"></i></button>')}
<div class="lhero"><h1 class="lt en">Excuse me!</h1></div></div>
<div class="body">${LINES.slice(0, 4).map(([r, en, zh], i) => `<div class="line"><span class="av ${r.toLowerCase()}">${r}</span><div class="tx2"><div class="en">${i === 2 ? 'Is this your <u>handbag</u>?' : en}</div></div></div>`).join('')}</div>
<div class="scrim"></div>
<div class="sheet"><span class="handle"></span>
  <div class="sh-h"><div><p class="sh-w en">handbag</p><p class="sh-p">/ˈhændbæɡ/ · n.</p></div><button class="ibtn sm" aria-label="关闭"><i class="ti ti-x"></i></button></div>
  <p class="sh-m">（女用）手提包</p>
  <div class="sh-ex"><p class="en">Is this your handbag?</p><small>这是您的手提包吗？</small></div>
  <div class="acts4"><button><i class="ti ti-volume" style="color:var(--listen-deep)"></i>发音</button><button><i class="ti ti-gauge" style="color:var(--listen-deep)"></i>慢速</button><button><i class="ti ti-speakerphone" style="color:var(--speak-deep)"></i>跟读 3 遍</button><button><i class="ti ti-quote" style="color:var(--listen-deep)"></i>听原句</button></div>
  <p class="kstat"><i class="ti ti-circle-check"></i>本课重点词 · 学完这一课后自动加入复习</p>
</div></div>`,
  },
  {
    id: 'vocabulary', name: '本课生词', note: '11 个生词和 1 个重点短语',
    render: () => `<div class="screen"><div class="top listen">${sbar()}${abar('第 1 课生词', '<span class="chip sm"><i class="ti ti-player-play"></i>连续播放</span>')}
<div class="lhero"><h1 class="h2">11 个生词</h1><p class="pcap">其中 3 个重点词和 1 个重点短语，学完这一课后自动加入复习；其余可以手动加入。</p></div></div>
<div class="body fade"><div class="wl">${VOC.map(([w, m, tag]) => `<div class="wr"><div class="tx"><b class="en">${w}${tag ? `<em class="kt${tag === '重点短语' ? ' ph' : ''}">${tag}</em>` : ''}</b><span>${m}</span></div><button class="pbtn" aria-label="播放 ${w}"><i class="ti ti-volume"></i></button></div>`).join('')}</div></div>
<div class="dock"><button class="btn sec"><i class="ti ti-adjustments-horizontal"></i>调整重点词</button></div></div>`,
  },
  {
    id: 'book', name: '原书页', note: '扫描页，这里用示意代替',
    render: () => `<div class="screen">${sbar()}${abar('原书页 · 第 2 课', '<button class="ibtn" aria-label="放大"><i class="ti ti-zoom-in"></i></button>')}
<div class="pad"><div class="paper"><p class="pl en">Lesson 2</p><h2 class="en">Is this your … ?</h2>
<div class="pics">${[['ti-pencil', 'pencil'], ['ti-ballpen', 'pen'], ['ti-book', 'book'], ['ti-clock', 'watch'], ['ti-shirt', 'shirt'], ['ti-car', 'car']].map(([ic, w]) => `<div><i class="ti ${ic}"></i><span class="en">${w}</span></div>`).join('')}</div><p class="pg en">2</p></div></div>
<div class="fill"></div><div class="pager"><button class="ibtn" aria-label="上一页"><i class="ti ti-chevron-left"></i></button><span>双指可放大</span><button class="ibtn" aria-label="下一页"><i class="ti ti-chevron-right"></i></button></div></div>`,
  },
];

// ---------- 跟读与练习 ----------
const practice = [
  {
    id: 'speaking', name: '口语', note: '跟读入口，M2 语音功能分开放',
    render: () => `<div class="screen">${sbar()}
<div class="hello"><div><small>普通跟读不录音，放心开口</small><h1>口语</h1></div><button class="me" aria-label="麦克风说明"><i class="ti ti-microphone"></i></button></div>
<div class="cur-c"><span class="eyebrow">当前课程 · 第 1 课</span><b class="en">Excuse me!</b><span>选一种舒服的方式，跟着原声说</span></div>
<div class="sec-t"><b>跟读 · 不用麦克风</b></div>
<div class="list mx">${row('ti-list-numbers', 'speak', '逐句跟读', '一句一停 · 上次读到第 3 句', chipK('speak', '继续'))}${row('ti-wave-sine', 'speak', '影子跟读', '同时跟着说，建议从 0.75× 开始')}${row('ti-users', 'speak', '分角色跟读', '你演 B，App 演 A')}</div>
<div class="sec-t"><b>需要麦克风 · M2</b></div>
<div class="list mx">${row('ti-microphone', 'speak', '检查发音', '只录这一次，处理完即删除')}${row('ti-messages', 'speak', 'AI 场景对话', '失物招领 · 约 5 分钟')}</div>
<div class="fill"></div>${nav('speaking')}</div>`,
  },
  {
    id: 'follow', name: '逐句跟读', note: '第 3 句，轮到你说',
    render: () => `<div class="screen"><div class="top speak">${sbar()}${abar('逐句跟读', '<span class="cnt">3 / 7</span>', 'ti-x')}
<div class="phero">${segs(2, 7)}<p class="cap2 l"><i class="ti ti-microphone-off"></i>不录音 · 先听原声，再跟着说</p></div></div>
<div class="body">
  <div class="rl done"><span class="av a">A</span><div class="bub en">Excuse me!</div><i class="ti ti-check"></i></div>
  <div class="rl done"><span class="av b">B</span><div class="bub en">Yes?</div><i class="ti ti-check"></i></div>
  <div class="turn"><div class="turn-h"><span class="av a solid">A</span><b>轮到你说</b><span class="hide"><i class="ti ti-volume"></i>原声已播放</span></div>
  <p class="turn-en en sm">Is this your handbag?</p><p class="turn-zh">这是您的手提包吗？</p>
  <div class="bar"><i style="width:55%;background:var(--speak)"></i></div><p class="turn-n">停顿 = 句长的 1.5 倍，结束后自动播下一句</p></div>
  <div class="rl next"><span class="av b">B</span><div class="bub en">Pardon?</div></div>
</div>
<div class="dock"><div class="three"><button class="btn sec"><i class="ti ti-rotate"></i>重播</button><button class="btn sec"><i class="ti ti-player-pause"></i>暂停</button><button class="btn sec"><i class="ti ti-player-track-next"></i>跳过</button></div><p class="note">整段读完后选一下感受：很顺 / 还行 / 要再练</p></div></div>`,
  },
  {
    id: 'shadow', name: '影子跟读', note: '跟着原声同时说',
    render: () => `<div class="screen"><div class="top speak">${sbar()}${abar('影子跟读', '<span class="chip sm"><i class="ti ti-microphone-off"></i>不录音</span>', 'ti-x')}
<div class="phero"><h1 class="h2">让声音带着你说</h1><p class="pcap">不用等它说完，试着同时跟上。跟丢了没关系，下一句再跟上。</p></div></div>
<div class="body"><div class="kara">${LINES.map(([, en], i) => `<p class="en ${i < 2 ? 'past' : i === 2 ? 'cur' : ''}">${i === 2 ? '<span>Is this your</span> handbag?' : en}</p>`).join('')}</div></div>
${player({ k: 'speak', spd: '0.75×' })}</div>`,
  },
  {
    id: 'practice-hint', name: '练习 · 用了提示', note: '已用两级，还剩一级',
    render: () => `<div class="screen"><div class="top practice">${sbar()}${abar('练习 · 第 1 课', '<span class="cnt">3 / 5</span>')}
<div class="phero">${segs(2, 5)}<span class="chip sm tint" style="color:var(--practice-deep)">看中文说英文</span><h1 class="prompt">这是您的手提包吗？</h1></div></div>
<div class="body end"><div class="hint"><div class="hint-h"><b><i class="ti ti-bulb"></i>已用 2 级提示</b><span>还剩 1 级</span></div>
<div class="ladder"><span class="rung used"><em><i class="ti ti-check"></i></em>首词</span><i class="ti ti-chevron-right"></i><span class="rung used"><em><i class="ti ti-check"></i></em>首语块</span><i class="ti ti-chevron-right"></i><span class="rung"><em>3</em>部分英文</span></div>
<div class="reveal"><span class="lb">首语块</span><p class="en">Is this your <u></u> ?</p></div>
<p class="hint-n">接着往下说就好。用了提示也可以，这题算练习，不算独立答对。</p></div></div>
<div class="dock"><button class="btn pri">我试着说了，核对答案</button><button class="btn sec">再多一点提示</button></div></div>`,
  },
  {
    id: 'practice-answer', name: '练习 · 核对答案', note: '揭晓答案后自评',
    render: () => `<div class="screen"><div class="top practice">${sbar()}${abar('核对答案', '<span class="cnt">3 / 5</span>')}
<div class="phero"><span class="chip sm tint" style="color:var(--practice-deep)">看中文说英文 · 第 1 课</span><h1 class="prompt" style="font-size:26px">这是您的手提包吗？</h1></div></div>
<div class="body"><div class="ans"><span class="lb">参考答案</span><p class="w en s">Is this your handbag?</p><span class="chip sm"><i class="ti ti-player-play"></i>原声示范 · 0:02</span></div>
<p class="ev-t">刚才说得怎么样？</p>${EV}
<button class="btn txt" style="margin-top:6px">无法判断</button><p class="note">先独立作答再核对，才记为独立答对</p></div></div>`,
  },
  {
    id: 'scenario', name: '换情境试一试', note: 'L2 变式，两课学完后进行',
    render: () => `<div class="screen"><div class="top practice">${sbar()}${abar('换情境试一试', '<span></span>', 'ti-x')}
<div class="phero"><span class="chip sm tint" style="color:var(--practice-deep)"><i class="ti ti-arrows-shuffle"></i>新情境 · 失物招领</span><h1 class="prompt" style="font-size:28px">工作人员拿起一支笔</h1><p class="pcap">问问对方：这是不是他的笔？只用学过的词句。</p></div></div>
<div class="body end"><div class="scene"><span class="sc-p"><i class="ti ti-user"></i><small>工作人员</small></span><span class="sc-o"><i class="ti ti-ballpen"></i><small>一支笔</small></span><span class="sc-p"><i class="ti ti-user"></i><small>你</small></span></div><div class="card goal"><span class="lb"><i class="ti ti-target"></i>交流目标</span><p>完成一次询问，并听懂对方的回答</p></div>
${nt('ti-info-circle', '用了提示或看过参考表达，这次只算练习；之后换一道新变式再验证。')}</div>
<div class="dock"><button class="btn pri">我已作答，核对自查点</button><button class="btn sec">需要一点提示</button><button class="btn txt">稍后再试</button></div></div>`,
  },
];

// ---------- 发音与 AI 对话（M2） ----------
const WAVE = [14, 26, 40, 58, 34, 72, 48, 30, 62, 44, 24, 36, 18];
const bubbles = (n = 3) => [
  ['ai', 'Excuse me! Is this your pen?'],
  ['mine', 'Pardon?'],
  ['ai', 'Is this your pen?<small>这是你的钢笔吗？</small>'],
].slice(0, n).map(([w, t]) => `<div class="cb ${w}">${w === 'ai' ? '<span class="av ai">AI</span>' : ''}<div class="bub en">${t}</div></div>`).join('');

const voice = [
  {
    id: 'pronunciation', name: '检查发音', note: '正在录音，最长 30 秒', stage: 'M2',
    render: () => `<div class="screen"><div class="top speak">${sbar()}${abar('检查发音', '<span class="chip sm">M2</span>', 'ti-x')}
<div class="phero c"><span class="eyebrow" style="color:var(--speak-deep)">读这一句</span><h1 class="lt en" style="font-size:34px">Is this your handbag?</h1>${chipK('listen', '<i class="ti ti-player-play"></i>先听示范')}</div></div>
<div class="body rec"><div class="wave">${WAVE.map((h) => `<i style="height:${h}px"></i>`).join('')}</div><span class="time">0:04 / 0:30</span>
<button class="mic on" aria-label="结束录音"><i class="ti ti-player-stop"></i></button><p class="rec-t">正在录音 · 读完点一下结束</p></div>
<div class="dock">${nt('ti-shield-check', '只录这一次。退出或切到后台会立即停止，处理完即删除。')}</div></div>`,
  },
  {
    id: 'pronunciation-feedback', name: '发音反馈', note: '一次只指出一两点', stage: 'M2',
    render: () => `<div class="screen"><div class="top speak">${sbar()}${abar('这次读得怎么样', '<span></span>', 'ti-x')}
<div class="phero"><span class="chip sm tint" style="color:var(--speak-deep)">本次评测 · 分数只作参考</span><h1 class="prompt" style="font-size:26px">意思很清楚，再练一个小地方</h1><p class="pcap">一次只改一两点，练完再读一遍</p></div></div>
<div class="body">
  <div class="fb"><span class="n">1</span><div><b>handbag 中间再连贯一点</b><p>先慢慢读 hand · bag，再连起来读 handbag。</p><div class="fb-a">${chipK('listen', '<i class="ti ti-player-play"></i>示范')}<span class="chip sm"><i class="ti ti-repeat"></i>重练：单词 → 短语 → 整句</span></div></div></div>
  <div class="fb"><span class="n">2</span><div><b>句尾自然上扬</b><p>这是一般疑问句，句尾轻轻上扬就好，不用每个词都加重。</p></div></div>
</div>
<div class="dock"><button class="btn pri">按这个练法再读一次</button><div class="two"><button class="btn sec">加入复习</button><button class="btn sec">反馈不准确</button></div></div></div>`,
  },
  {
    id: 'chat', name: 'AI 对话', note: '正在听你说', stage: 'M2',
    render: () => `<div class="screen"><div class="top speak">${sbar()}${abar('失物招领 · AI 对话', '<button class="ibtn" aria-label="暂停"><i class="ti ti-player-pause"></i></button>', 'ti-x')}
<div class="phero"><div class="goal-s"><i class="ti ti-target"></i><span>目标：用 <b class="en">Is this your …?</b> 问问物品是谁的</span></div></div></div>
<div class="body"><div class="chat">${bubbles()}</div>
<div class="helps">${['再说一遍', '慢一点', '中文解释', '给我提示', '这句怎么说', '更简单'].map((t) => `<span class="chip sm">${t}</span>`).join('')}</div></div>
<div class="micd"><div class="wave">${WAVE.slice(2, 11).map((h) => `<i style="height:${Math.round(h / 2)}px"></i>`).join('')}</div><button class="mic" aria-label="暂停收音"><i class="ti ti-microphone"></i></button><p class="rec-t">正在听 · 你说完后 AI 再回答</p><button class="btn txt">结束对话，看回顾</button></div></div>`,
  },
  {
    id: 'chat-paused', name: 'AI 对话 · 已暂停', note: '来电或切到后台后', stage: 'M2',
    render: () => `<div class="screen">${sbar()}${abar('对话已暂停', '<span></span>', 'ti-x')}<div class="pad">
<div class="hero-c">${medal('ti-player-pause', 'speak')}<h1 class="h2">刚才的对话还在这里</h1><p class="lead">来电或切到后台时已经停止录音。回来后由你决定继续，不会自动打开麦克风。</p></div>
<div class="card"><span class="lb">已完成的部分 · 失物招领</span><div class="chat">${bubbles(2)}</div></div></div>
<div class="fill"></div><div class="dock"><button class="btn pri"><i class="ti ti-microphone"></i>继续对话</button><button class="btn sec">结束并看回顾</button></div></div>`,
  },
  {
    id: 'chat-review', name: 'AI 对话 · 回顾', note: '完成目标和一个小建议', stage: 'M2',
    render: () => `<div class="screen"><div class="top speak">${sbar()}${abar('对话回顾', '<span></span>', 'ti-x')}
<div class="phero"><span class="eyebrow" style="color:var(--speak-deep)">失物招领 · 约 3 分钟 · 用了 1 次提示</span><h1 class="prompt" style="font-size:26px">你完成了一次真实询问</h1></div></div>
<div class="body"><div class="card" style="margin-top:16px"><span class="lb">完成的目标</span>
<p class="ok-l"><i class="ti ti-circle-check"></i><span>能用 <span class="en">Is this your …?</span> 询问物品</span></p>
<p class="ok-l"><i class="ti ti-circle-check"></i><span>没听清时请对方再说一遍</span></p></div>
<p class="ev-t">一个小建议</p>
<div class="fb" style="margin-top:0"><span class="n"><i class="ti ti-bulb"></i></span><div><b>试着完整说出 <span class="en">Yes, it is.</span></b><p>先听示范，再跟着说一遍。</p><div class="fb-a">${chipK('listen', '<i class="ti ti-player-play"></i>听示范')}${chipK('speak', '<i class="ti ti-speakerphone"></i>去跟读这句')}</div></div></div></div>
<div class="dock"><button class="btn pri">完成</button><button class="btn sec">把这句加入复习</button></div></div>`,
  },
];

// ---------- 复习与记录 ----------
const WORDS = [['handbag', '（女用）手提包', '明天'], ['pardon', '原谅，请再说一遍', '明天'], ['excuse me', '对不起', '11 月 7 日'], ['thank you', '感谢你（们）', '11 月 7 日'], ['very much', '非常地', '11 月 11 日']];
const SENT = [['Is this your handbag?', '跟原声读顺', '跟读时选了“要再练”'], ['Thank you very much.', '跟原声读顺', '跟读时选了“要再练”'], ['Yes, it is.', '看中文说英文', '练习里标为不会']];

const review = [
  {
    id: 'review-empty', name: '复习 · 今日完成', note: '默认量做完，可以主动继续',
    render: () => `<div class="screen">${sbar()}
<div class="hello"><div><small>11 月 4 日 · 周三</small><h1>复习</h1></div></div>
<div class="done-c"><div class="medal" style="background:var(--card);color:var(--review-deep)"><i class="ti ti-circle-check"></i></div><h2 class="h2">今天的复习完成了</h2><p class="lead">8 个词句有了新的学习记录。想多学可以主动继续，不必为了数量勉强自己。</p>
<div class="tally"><span class="g"><i class="ti ti-circle-check"></i>答对 5</span><span class="y"><i class="ti ti-circle-half-2"></i>差一点 2</span><span class="n"><i class="ti ti-circle-x"></i>不会 1</span></div>
<button class="btn sec">再复习一会儿</button></div>
<div class="sec-t"><b>复习本</b></div>
<div class="list mx">${row('ti-abc', 'review', '生词本', '5 项 · 最早明天再复习')}${row('ti-quote', 'review', '句子本', '3 句要再练')}</div>
<div class="fill"></div>${nav('review')}</div>`,
  },
  {
    id: 'words', name: '生词本', note: '来源课、主要能力、下次时间',
    render: () => `<div class="screen"><div class="top review">${sbar()}${abar('生词本', '<span class="chip sm"><i class="ti ti-arrows-sort"></i>按下次时间</span>')}
<div class="phero"><h1 class="h2">复习中 5 项</h1><p class="pcap">都按“看中文说英文”复习，可以播放、主动训练或移出</p></div></div>
<div class="body"><div class="wl">${WORDS.map(([w, m, d]) => `<div class="wr"><div class="tx"><b class="en">${w}</b><span>${m} · 第 1 课 · 下次 ${d}</span></div><button class="pbtn" aria-label="播放"><i class="ti ti-volume"></i></button><button class="pbtn o" aria-label="更多"><i class="ti ti-dots-vertical"></i></button></div>`).join('')}</div>
${nt('ti-info-circle', '移出只停止自动推荐，历史和当前达标保留；还没达标的项目移出后不会再达标。')}</div>
<div class="dock"><button class="btn pri">主动训练这 5 项</button></div></div>`,
  },
  {
    id: 'sentences', name: '句子本', note: '要再练的句子',
    render: () => `<div class="screen"><div class="top review">${sbar()}${abar('句子本')}
<div class="phero"><h1 class="h2">要再练的 3 句</h1><p class="pcap">来自跟读时选的“要再练”，和练习里标为不会的句子</p></div></div>
<div class="body"><div class="wl">${SENT.map(([s, a, src]) => `<div class="wr tall"><div class="tx"><b class="en">${s}</b><span><em class="ab">${a}</em>第 1 课 · ${src}</span></div><button class="pbtn" aria-label="播放"><i class="ti ti-volume"></i></button></div>`).join('')}</div>
${nt('ti-info-circle', '“跟原声读顺”的句子没有答案可看：跟读后选很顺 / 还行 / 要再练，只排复习，不计入单元目标。')}</div>
<div class="dock"><button class="btn pri">主动练这 3 句</button></div></div>`,
  },
  {
    id: 'calendar', name: '学习记录', note: '学习日历，中断不惩罚',
    render: () => `<div class="screen">${sbar()}${abar('学习记录')}<div class="pad">
<div class="stats"><div class="stat"><b>12<small>天</small></b><span>累计学习</span></div><div class="stat"><b>27<small>分钟</small></b><span>今天学习</span></div></div>
<div class="card cal"><div class="cal-h"><button class="ibtn s" aria-label="上个月"><i class="ti ti-chevron-left"></i></button><b>2026 年 11 月</b><button class="ibtn s" aria-label="下个月"><i class="ti ti-chevron-right"></i></button></div>
<div class="cal-g">${'一二三四五六日'.split('').map((d) => `<span class="wd">${d}</span>`).join('')}${'<span></span>'.repeat(6)}${Array.from({ length: 30 }, (_, i) => i + 1).map((d) => `<span class="d${[2, 3, 4].includes(d) ? ' on' : ''}${d === 4 ? ' today' : ''}${d > 4 ? ' fu' : ''}">${d}</span>`).join('')}</div></div>
<div class="card day"><div class="day-h"><b>11 月 4 日 · 今天</b><span>27 分钟</span></div><div class="day-g"><span><b>2 / 4</b>完成任务</span><span><b>8</b>复习项目</span><span><b>0</b>无结果</span><span><b>0</b>跳过</span></div></div>
<p class="hint2 c"><i class="ti ti-heart"></i>中断不惩罚，能回来时从一小步继续就好</p></div>
<div class="fill"></div><div class="dock"><button class="btn sec">查看课程状态<i class="ti ti-arrow-right"></i></button></div></div>`,
  },
  {
    id: 'course-status', name: '课程状态', note: '示例：学到第 5 课时',
    render: () => `<div class="screen">${sbar()}${abar('课程状态')}<div class="pad">
<div class="sts">${[['g', 1, '初步巩固'], ['y', 1, '待巩固'], ['k', 1, '学习中'], ['', 69, '未开始']].map(([c, n, t]) => `<span class="${c}"><b>${n}</b>${t}</span>`).join('')}</div>
<div class="card unit-st"><div class="us-h"><span class="eyebrow muted">第 1–2 课 · <span class="en">Excuse me!</span></span>${stt('g')}</div>
<div class="us-m"><div><span>当前项目达标</span><b>8 / 10</b></div><div class="bar"><i style="width:80%;background:var(--review)"></i></div></div>
<div class="us-r"><span><i class="ti ti-circle-check" style="color:var(--review-deep)"></i>换情境验证已通过</span><span>最近证据 11 月 3 日</span></div></div>
<div class="list">${[['3–4', 'Sorry, sir.', '4 / 9 达标 · 换情境未验证', 'y'], ['5–6', 'Nice to meet you.', '第 5 课首次学习中', 'k'], ['7–8', 'Are you a teacher?', '', '']].map(([n, en, sub, c]) => `<div class="li"><span class="num">${n}</span><div class="tx"><b class="en">${en}</b>${sub ? `<span>${sub}</span>` : ''}</div>${stt(c)}</div>`).join('')}</div>
${nt('ti-info-circle', '“自评”表示状态来自你自己的核对评价。之后正式复习中答错或要靠提示才完成，会回落待巩固。')}</div></div>`,
  },
  {
    id: 'weekly', name: '每周小结', note: '上周的学习', stage: 'P1',
    render: () => `<div class="screen">${sbar()}${abar('每周小结', '<span class="chip sm">P1</span>')}<div class="pad">
<span class="eyebrow muted">10 月 26 日 – 11 月 1 日</span><h1 class="h2" style="margin-top:4px">你开始更敢开口了</h1>
<div class="card wk"><div class="wk-h"><b>每天学习</b><span>5 天 · 共 236 分钟</span></div><div class="bars">${[['一', 52], ['二', 60], ['三', 0], ['四', 38], ['五', 0], ['六', 46], ['日', 40]].map(([d, m]) => `<div><i${m ? ` style="height:${Math.round(m * 1.3)}px"` : ' class="z"'}></i><span>${d}</span></div>`).join('')}</div></div>
<div class="stats s3" style="margin-top:12px"><div class="stat"><b>18</b><span>独立说出的表达</span></div><div class="stat"><b>3</b><span>完成换情境</span></div><div class="stat"><b>4</b><span>需要再练</span></div></div>
<div class="card one"><span class="lb"><i class="ti ti-target"></i>下周只关注一件事</span><p>在失物招领情境里，试着主动问三样东西是谁的。</p></div></div>
<div class="fill"></div><div class="dock"><button class="btn pri">选一个下周练习</button></div></div>`,
  },
];

// ---------- 设置与账号 ----------
const cdots = `<span class="v"><span class="cdots">${['listen', 'speak', 'practice', 'review'].map((k) => `<i style="background:var(--${k})"></i>`).join('')}</span><i class="ti ti-chevron-right"></i></span>`;
const backupInner = () => `${sbar()}${abar('数据与备份')}<div class="pad">
<h1 class="h2">学习记录只在这台手机上</h1><p class="lead">手动导出备份，换手机或重装后可以恢复。</p>
<div class="stats" style="margin-top:14px"><div class="stat"><b>18.6<small>MB</small></b><span>学习数据</span></div><div class="stat"><b>今天<small>16:40</small></b><span>上次备份</span></div></div>
<div class="card inc one"><b class="inc-t">备份包含</b>${['课程进度和全部学习记录', '复习安排和达标状态', '目标、换情境验证和当日额度', '报错清单、设置和学习颜色'].map((t) => `<span><i class="ti ti-check"></i>${t}</span>`).join('')}</div>
${row(null, null, '同时包含课程资料包', '约 140 MB，默认不含', '<i class="switch"></i>', 'box')}</div>
<div class="fill"></div><div class="dock"><button class="btn pri"><i class="ti ti-download"></i>导出备份</button><div class="two"><button class="btn sec">从备份恢复</button><button class="btn sec danger-t">删除学习数据</button></div><p class="note">导出后建议另存到电脑或其他设备</p></div>`;

const USING = `<span class="chip sm tint" style="${T('review')}">使用中</span>${GO}`;
const OKC = '<i class="ti ti-circle-check okc"></i>';
const settings = [
  {
    id: 'settings', name: '设置', note: '从今日页头像进入',
    render: () => `<div class="screen">${sbar()}${abar('设置')}<div class="pad set">
<div class="li box prof"><div class="me">L</div><div class="tx"><b>leon</b><span>leon@example.com · 账号与安全</span></div>${GO}</div>
<p class="grp-t">学习</p><div class="list">${row(null, null, '每日时长', '', val('60 分钟'))}${row(null, null, '每日提醒', '20:30 · 每天最多一次', '<i class="switch on"></i>')}${row(null, null, '中文显示', '', val('点开显示'))}${row(null, null, '跟读停顿', '', val('句长 1.5 倍'))}${row(null, null, '默认语速', '', val('1.0×'))}</div>
<p class="grp-t">显示</p><div class="list">${row(null, null, '字体大小', '', val('标准'))}${row(null, null, '学习颜色', '', cdots)}</div>
<p class="grp-t">数据与 AI 服务</p><div class="list">${row(null, null, '数据与备份', '', val('今天已备份'))}${row(null, null, 'AI 服务', '', val('豆包 · 智谱'))}${row(null, null, '费用与预算', '', val('¥8.6 / ¥30'))}</div></div></div>`,
  },
  {
    id: 'backup', name: '数据与备份', note: '手动导出，默认不含资料包',
    render: () => `<div class="screen">${backupInner()}</div>`,
  },
  {
    id: 'restore', name: '从备份恢复', note: '确认前说明会覆盖什么',
    render: () => `<div class="screen">${backupInner()}<div class="scrim"></div>
<div class="sheet"><span class="handle"></span><h2 class="h2">恢复这份备份？</h2>
<div class="kv"><span>备份时间</span><b>今天 16:40</b><span>学习记录</span><b>12 天</b><span>未结束的轮次</span><b>1 个</b></div>
<p class="lead">备份不绑定账号，可以恢复到当前账号。</p>
${nt('ti-alert-triangle', '恢复会覆盖当前数据。App 会先自动备份当前内容；已用掉的今日额度不会重新获得。', 'warn')}
<button class="btn pri">确认恢复</button><button class="btn sec">取消</button></div></div>`,
  },
  {
    id: 'delete', name: '删除学习数据', note: '按课删除或全部删除',
    render: () => `<div class="screen">${sbar()}${abar('删除学习数据')}<div class="pad">
<h1 class="h2">选择删除范围</h1><p class="lead">删除前会说明影响，删掉的内容不会因升级重新出现。</p>
<div class="opts"><div class="opt on"><div class="opt-h"><span class="radio"></span><b>只删第 1 课的记录</b></div><p>只属于这一课的记录会删除；和其他课共享的词保留进度</p></div>
<div class="opt"><div class="opt-h"><span class="radio"></span><b>删除全部学习数据</b></div><p>包括复习、目标、换情境验证和学习日历</p></div></div>
${nt('ti-info-circle', '之后如果恢复删除前的备份，会先提醒你。')}</div>
<div class="fill"></div><div class="dock"><button class="btn danger"><i class="ti ti-trash"></i>删除第 1 课记录</button><button class="btn sec">先导出备份</button></div></div>`,
  },
  {
    id: 'account', name: '账号与安全', note: '退出登录不删本机数据',
    render: () => `<div class="screen">${sbar()}${abar('账号与安全')}<div class="pad">
<div class="card prof-c"><div class="me lg">L</div><b>leon</b><span>leon@example.com</span><span class="chip sm"><i class="ti ti-mail-check"></i>邮箱已验证</span></div>
<div class="list">${row('ti-key', null, '修改密码', '')}${row('ti-logout', null, '退出登录', '不会删除本机学习数据')}</div>
<div class="list">${row('ti-trash', 'danger', '删除账号', '会一并清除本机学习数据，可以先导出备份', GO, 'danger')}</div>
${nt('ti-info-circle', '登录其他账号前，会先提示备份并清除本机数据。')}</div></div>`,
  },
  {
    id: 'ai-services', name: 'AI 服务', note: '自己填密钥，按地区选服务', stage: 'M2',
    render: () => `<div class="screen">${sbar()}${abar('AI 服务', '<span class="chip sm">M2</span>')}<div class="pad">
${nt('ti-lock', '密钥只保存在这台手机上，不上传、不进备份。费用由服务商直接向你收取。')}
<p class="grp-t">语音服务 · 对话、发音检查</p><div class="list">${row('ti-microphone', 'speak', '豆包', '中国境内 · 密钥 ····3f9a', USING)}${row('ti-microphone', null, 'Gemini', '境外', val('未填写'))}</div>
<p class="grp-t">文本服务 · 判断回答、表达建议</p><div class="list">${row('ti-message-2', 'practice', '智谱', '中国境内 · 密钥 ····a71c', USING)}${row('ti-message-2', null, 'OpenAI（GPT）', '境外', val('未填写'))}${row('ti-message-2', null, 'Claude', '境外 · 密钥 ····9d02', val('已填写'))}</div>
<p class="hint-n" style="margin:14px 4px 0">换地区时在这里切换服务，各家密钥分开保存，不用重填。App 不读取定位。</p></div></div>`,
  },
  {
    id: 'ai-key', name: 'AI 服务 · 填写密钥', note: '测试连接，结果分项显示', stage: 'M2',
    render: () => `<div class="screen">${sbar()}${abar('豆包 · 语音服务', '<span class="chip sm">中国境内</span>')}<div class="pad">
${fld('密钥（API Key）', '<span class="dots">••••••••••••3f9a</span><i class="ti ti-eye-off end"></i>')}
<p class="hint-n" style="margin:8px 4px 0">密钥在服务商的控制台里创建。填好后只显示末 4 位。</p>
<p class="grp-t">测试结果 · 刚刚</p><div class="list">${row(null, null, '密钥有效', '', OKC)}${row(null, null, '实时语音对话', '可以打断', OKC)}${row(null, null, '语音识别', '', OKC)}${row(null, null, '发音检查', '这家服务只能指出到单词', '<i class="ti ti-alert-circle warnc"></i>')}</div>
${nt('ti-coin', '测试会产生一次很小的真实调用，费用由豆包向你收取。')}</div>
<div class="fill"></div><div class="dock"><button class="btn pri">重新测试连接</button><div class="two"><button class="btn sec">更换密钥</button><button class="btn sec" style="color:var(--danger-deep)">删除密钥</button></div></div></div>`,
  },
  {
    id: 'budget', name: '费用与预算', note: '本月估算和明细', stage: 'M2',
    render: () => `<div class="screen">${sbar()}${abar('费用与预算', '<span class="chip sm">M2</span>')}<div class="pad">
<div class="card"><span class="lb">本月估算费用</span><div class="bud-n"><b>¥8.6</b><span>/ 每月预算 ¥30</span></div><div class="bar lg"><i style="width:29%;background:var(--ink)"></i><em style="left:80%"></em></div><div class="bud-l"><span>已用 29%</span><span>用到 80% 时提醒</span></div></div>
<p class="grp-t">本月明细</p><div class="list">${[['ti-messages', 'AI 对话 · 豆包', '3 段 · 42 分钟', '¥5.2'], ['ti-microphone', '发音检查 · 豆包', '18 次', '¥2.1'], ['ti-message-2', '判断与建议 · 智谱', '26 次', '¥1.3']].map(([ic, t, s, v]) => row(ic, null, t, s, `<span class="v">${v}</span>`)).join('')}</div>
${nt('ti-shield-check', '费用按本机用量估算，以服务商账单为准。达到预算后暂停付费语音功能，普通学习不受影响。')}</div>
<div class="fill"></div><div class="dock"><button class="btn sec">调整每月预算</button></div></div>`,
  },
  {
    id: 'budget-limit', name: '预算已用完', note: '付费功能暂停，普通学习照常', stage: 'M2',
    render: () => `<div class="screen">${sbar()}${abar('本月预算已用完', '<span></span>', 'ti-x')}<div class="pad">
<div class="hero-c">${medal('ti-player-pause', 'almost')}<h1 class="h2">付费语音功能已暂停</h1><p class="lead">本月估算费用已达 30 元。不会自动购买、续费，也不会开始新的付费使用。</p></div>
<p class="grp-t">照常可用 · 不用联网</p>
<div class="ok4">${[['ti-headphones', 'listen', '听读'], ['ti-speakerphone', 'speak', '跟读'], ['ti-pencil', 'practice', '练习'], ['ti-cards', 'review', '复习']].map(([ic, k, t]) => `<div>${tile(ic, k)}${t}<i class="ti ti-circle-check okc"></i></div>`).join('')}</div>
<p class="grp-t">本月暂停</p>
<div class="ok4 off">${[['ti-microphone', '检查发音'], ['ti-messages', 'AI 对话']].map(([ic, t]) => `<div>${tile(ic, null)}${t}<i class="ti ti-player-pause okc"></i></div>`).join('')}</div></div>
<div class="fill"></div><div class="dock"><button class="btn pri">继续普通学习</button><div class="two"><button class="btn sec">费用明细</button><button class="btn sec">调整预算</button></div></div></div>`,
  },
];

export const pages = [...start, ...today, ...practice, ...voice, ...review, ...settings];

// 看板分组：核心页（screens.js）和这里的页面按使用流程排在一起
export const groups = [
  ['开始使用', ['login', 'login-error', 'register', 'forgot', 'onboarding', 'import', 'import-missing', 'mic-intro']],
  ['今日与课程', ['today', 'today-recovery', 'plan', 'courses', 'course-detail', 'listening', 'listen-blind', 'word', 'vocabulary', 'book']],
  ['跟读与练习', ['speaking', 'follow', 'shadow', 'role', 'practice', 'practice-hint', 'practice-answer', 'scenario']],
  ['发音与 AI 对话 · M2', ['pronunciation', 'pronunciation-feedback', 'chat', 'chat-paused', 'chat-review']],
  ['复习与记录', ['review', 'review-answer', 'review-empty', 'words', 'sentences', 'calendar', 'course-status', 'weekly']],
  ['设置与账号', ['settings', 'colors', 'backup', 'restore', 'delete', 'account', 'ai-services', 'ai-key', 'budget', 'budget-limit']],
];
