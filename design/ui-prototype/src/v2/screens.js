// 新视觉方案 · 核心页（PRD v2.5.7）。尺寸按 Android 390 × 844 dp，1px = 1dp。其余页面在 pages.js，共用这里的组件。
const sbar = () => `<div class="sbar"><span>16:20</span><span class="ic"><i class="ti ti-wifi"></i><i class="ti ti-antenna-bars-5"></i><i class="ti ti-battery-3"></i></span></div>`;

const nav = (on) => `<nav class="nav">${[['today', '今日', 'ti-sun'], ['courses', '课程', 'ti-books'], ['speaking', '口语', 'ti-messages'], ['review', '复习', 'ti-cards']]
  .map(([id, name, icon]) => `<div class="it${on === id ? ' on' : ''}"><i class="ti ${icon}"></i>${name}</div>`).join('')}</nav>`;

const abar = (title, right = '<span></span>', left = 'ti-arrow-left') =>
  `<div class="abar"><button class="ibtn" aria-label="返回"><i class="ti ${left}"></i></button><span class="t">${title}</span>${right}</div>`;

const ladder = () => `<div class="hint"><div class="hint-h"><b><i class="ti ti-bulb"></i>需要提示？</b><span>一级一级来</span></div>
<div class="ladder"><span class="rung"><em>1</em>首词</span><i class="ti ti-chevron-right"></i><span class="rung"><em>2</em>首语块</span><i class="ti ti-chevron-right"></i><span class="rung"><em>3</em>部分英文</span></div>
<p class="hint-n">用了提示，这题算练习，不算独立答对</p></div>`;

const segs = (done, total) => `<div class="segs">${Array.from({ length: total }, (_, i) => `<i class="${i < done ? 'd' : i === done ? 'c' : ''}"></i>`).join('')}</div>`;

const LINES = [
  ['A', 'Excuse me!', '对不起。'],
  ['B', 'Yes?', ''],
  ['A', 'Is this your handbag?', '这是您的手提包吗？'],
  ['B', 'Pardon?', ''],
  ['A', 'Is this your handbag?', ''],
  ['B', 'Yes, it is.', ''],
  ['B', 'Thank you very much.', ''],
];

export { sbar, nav, abar, segs, LINES };

export const screens = [
  {
    id: 'today', name: '今日', note: '当前在跟读这一步',
    render: () => `<div class="screen">${sbar()}
<div class="hello"><div><small>11 月 4 日 · 周三</small><h1>下午好，Leon</h1></div><div class="me">L</div></div>
<div class="sum">
  <div class="sum-top"><span class="big">2<small>/ 4 项已完成</small></span><span class="r">还剩约 35 分钟</span></div>
  <div class="budget"><i style="flex:5;background:var(--review)"></i><i style="flex:15;background:var(--listen)"></i><i style="flex:20;background:var(--speak-tint)"><em style="width:35%;background:var(--speak)"></em></i><i style="flex:15;background:var(--practice-tint)"></i></div>
  <div class="legend"><span><b style="background:var(--review)"></b>复习</span><span><b style="background:var(--listen)"></b>新课</span><span><b style="background:var(--speak)"></b>跟读</span><span><b style="background:var(--practice)"></b>练习</span></div>
</div>
<div class="sec-t"><b>今天的学习 · 60 分钟</b><span>调整时长</span></div>
<div class="steps">
  <div class="step done"><div class="tile" style="background:var(--review-tint);color:var(--review-deep)"><i class="ti ti-cards"></i></div><div class="tx"><b>复习 · 8 项</b><span>已完成 · 5 分钟</span></div><i class="ti ti-circle-check ok"></i></div>
  <div class="step done"><div class="tile" style="background:var(--listen-tint);color:var(--listen-deep)"><i class="ti ti-headphones"></i></div><div class="tx"><b>新课 · 第 1 课</b><span>先听 · 看懂 · 点词跟读</span></div><i class="ti ti-circle-check ok"></i></div>
  <div class="step now">
    <div class="row"><div class="tile" style="background:var(--card);color:var(--speak-deep)"><i class="ti ti-speakerphone"></i></div><div class="tx"><span class="eyebrow">现在 · 约 20 分钟</span><b>跟读 · 第 1 课</b><span>逐句 → 影子 → 分角色</span></div></div>
    <div class="mini"><div class="bar"><i style="width:43%;background:var(--speak)"></i></div><span>逐句 3 / 7</span></div>
    <button class="btn pri">继续跟读<i class="ti ti-arrow-right"></i></button>
  </div>
  <div class="step"><div class="tile" style="background:var(--practice-tint);color:var(--practice-deep)"><i class="ti ti-pencil"></i></div><div class="tx"><b>练习 · 4 题</b><span>听力 · 看中文说英文 · 换情境</span></div><span class="mt">15 分钟</span></div>
</div>
<div class="foot"><span><i class="ti ti-coffee"></i>另留约 5 分钟休息与小结</span><span><i class="ti ti-calendar"></i>明天到期 12 项，默认安排 10 项，可以继续</span></div>
<div class="fill"></div>${nav('today')}</div>`,
  },
  {
    id: 'listening', name: '听读', note: '第 3 句正在播放',
    render: () => `<div class="screen"><div class="top listen">${sbar()}
${abar('第 1 课', '<button class="ibtn" aria-label="原书页"><i class="ti ti-book-2"></i></button>')}
<div class="lhero"><span class="eyebrow" style="color:var(--listen-deep)">听读 · 美音原声</span><h1 class="lt en">Excuse me!</h1>
<div class="q"><span class="k">听力问题</span><span class="v en">Whose handbag is it?</span></div></div></div>
<div class="body">
  <div class="dl-head"><b>课文 · 7 句</b><span class="chips"><span class="chip sm"><i class="ti ti-eye-off"></i>先听后看</span><span class="chip sm"><i class="ti ti-language"></i>中文：点开</span></span></div>
  ${LINES.map(([r, en, zh], i) => `<div class="line${i === 2 ? ' cur' : ''}"><span class="av ${r.toLowerCase()}${i === 2 ? ' solid' : ''}">${r}</span><div class="tx2"><div class="en">${en}</div>${zh ? `<small>${zh}</small>` : ''}</div>${i === 2 ? '<i class="ti ti-volume pl"></i>' : ''}</div>`).join('')}
</div>
<div class="player">
  <div class="prog"><span>3 / 7</span><div class="bar"><i style="width:40%;background:var(--listen)"></i></div><span>0:14 / 0:37</span></div>
  <div class="ctl"><span class="chip sm">1.0×</span><button class="ibtn" aria-label="上一句"><i class="ti ti-player-skip-back"></i></button><button class="play" aria-label="暂停"><i class="ti ti-player-pause"></i></button><button class="ibtn" aria-label="下一句"><i class="ti ti-player-skip-forward"></i></button><span class="chip sm"><i class="ti ti-repeat-once"></i>单句</span></div>
  <div class="modes"><button class="mode"><i class="ti ti-list-numbers"></i>逐句跟读</button><button class="mode"><i class="ti ti-wave-sine"></i>影子跟读</button><button class="mode"><i class="ti ti-users"></i>分角色</button></div>
</div></div>`,
  },
  {
    id: 'role', name: '分角色跟读', note: '你演 B，轮到你说',
    render: () => `<div class="screen"><div class="top speak">${sbar()}
${abar('分角色跟读', '<span class="chip sm"><i class="ti ti-arrows-exchange"></i>换角色</span>', 'ti-x')}
<div class="rhero"><div class="seg"><span>我演 A</span><span class="on">我演 B</span></div>
<p class="cap2">App 读 A 的句子，轮到你时会停下来 · <i class="ti ti-microphone-off"></i>不录音</p></div></div>
<div class="body">
  <div class="rl"><span class="av a">A</span><div class="bub en">Excuse me!</div><span class="tick"><i class="ti ti-volume"></i>原声</span></div>
  <div class="turn">
    <div class="turn-h"><span class="av b solid">B</span><b>轮到你说</b><span class="hide"><i class="ti ti-eye-off"></i>隐藏文字</span></div>
    <p class="turn-en en">Yes?</p><p class="turn-zh">什么事？</p>
    <div class="bar"><i style="width:60%;background:var(--speak)"></i></div>
    <p class="turn-n">停顿 = 句长的 1.5 倍，结束后自动播下一句</p>
  </div>
  <div class="rl next"><span class="av a">A</span><div class="bub en">Is this your handbag?</div></div>
  <div class="rl next mine"><div class="bub en">Pardon?</div><span class="av b">B</span></div>
  <div class="rl next"><span class="av a">A</span><div class="bub en">Is this your handbag?</div></div>
</div>
<div class="dock"><button class="btn pri">我说完了，下一句</button><div class="two"><button class="btn sec"><i class="ti ti-rotate"></i>重播本句</button><button class="btn sec"><i class="ti ti-player-pause"></i>暂停</button></div></div></div>`,
  },
  {
    id: 'practice', name: '练习', note: '看中文说英文 · 三个作答入口',
    render: () => `<div class="screen"><div class="top practice">${sbar()}
${abar('练习 · 第 1 课', '<span class="cnt">3 / 5</span>')}
<div class="phero">${segs(2, 5)}<span class="chip sm tint" style="color:var(--practice-deep)">看中文说英文</span>
<h1 class="prompt">这是您的手提包吗？</h1><p class="pcap">先开口说出英文，再核对答案</p></div></div>
<div class="body end">${ladder()}</div>
<div class="dock"><button class="btn pri">我已作答，核对答案</button><button class="btn sec">没能答出，看答案</button><button class="btn txt">先看示范 / 答案</button><p class="note">先看示范只记录“已看示范”，这题不算独立答对</p></div></div>`,
  },
  {
    id: 'review', name: '复习', note: '正式复习',
    render: () => `<div class="screen"><div class="top review">${sbar()}
${abar('今日复习', '<span class="cnt">4 / 8</span>')}
<div class="phero">${segs(3, 8)}<span class="chip sm tint" style="color:var(--review-deep)">看中文说英文 · 第 1 课</span>
<h1 class="prompt">感谢你（们）</h1><p class="pcap">说出英文，再核对 · 约 2 分钟</p></div></div>
<div class="body end">${ladder()}</div>
<div class="dock"><button class="btn pri">我已作答，核对答案</button><button class="btn sec">没能答出，看答案</button><button class="btn txt">先看示范 / 答案</button><p class="note">正式复习中先看答案，按没答出安排</p></div>
<div class="foot-acts"><button><i class="ti ti-player-track-next"></i>跳过本题</button><button><i class="ti ti-archive"></i>移出复习</button><button><i class="ti ti-player-pause"></i>结束</button></div></div>`,
  },
  {
    id: 'review-answer', name: '复习 · 核对与自评', note: '揭晓答案后自评',
    render: () => `<div class="screen"><div class="top review">${sbar()}
${abar('核对答案', '<span class="cnt">4 / 8</span>')}
<div class="phero"><span class="chip sm tint" style="color:var(--review-deep)">看中文说英文 · 第 1 课</span><h1 class="prompt" style="font-size:26px">感谢你（们）</h1></div></div>
<div class="body">
  <div class="ans"><span class="lb">参考答案</span><p class="w en">thank you</p><p class="m">感谢你（们）</p><hr><span class="lb">原句</span><p class="ex en">Thank you very much.</p><span class="chip sm"><i class="ti ti-player-play"></i>原声示范 · 0:02</span></div>
  <p class="ev-t">刚才说得怎么样？</p>
  <div class="ev"><button class="g"><i class="ti ti-circle-check"></i>答对了</button><button class="y"><i class="ti ti-circle-half-2"></i>差一点</button><button class="n"><i class="ti ti-circle-x"></i>不会</button></div>
  <button class="btn txt" style="margin-top:6px">无法判断</button><p class="note">自评只用来安排下次复习，不打分</p>
</div></div>`,
  },
];

// 学习颜色：每种活动 4 个预设，色值都按“深色文字放在浅底上”核过对比度。顺序：主色、浅底、描边、深色文字
export const PALETTES = {
  listen: [['蓝', '#2E6BE6', '#E5EDFC', '#A9C2F5', '#163B7D'], ['青', '#0E8FA8', '#DDF2F6', '#9CD5E1', '#075566'], ['靛', '#4B5BD7', '#E8EAFB', '#B4BBF0', '#2A3385'], ['石墨', '#55606E', '#E9ECEF', '#C2C8CF', '#2B323B']],
  speak: [['珊瑚', '#EE6A3C', '#FFE8DD', '#F6B9A1', '#8C3011'], ['橙黄', '#E8901A', '#FFF0D9', '#F5C98B', '#7A4A06'], ['玫红', '#D9467A', '#FCE4EC', '#F0A8C2', '#7D1E42'], ['砖红', '#C8503A', '#FBE5E0', '#E9AFA3', '#6E2417']],
  practice: [['紫', '#6E56CF', '#EDE9FB', '#C7BCF2', '#3B2C82'], ['葡萄', '#8E4FC4', '#F3E8FB', '#D5B6EE', '#4E2470'], ['蓝紫', '#5B6BD8', '#E8EAFB', '#B7BEF1', '#2F3A8A'], ['墨蓝', '#3F5F8C', '#E4EAF2', '#AFC0D8', '#1F3352']],
  review: [['绿', '#1E9E61', '#E0F2E8', '#A8DBC0', '#0D5A36'], ['薄荷', '#13A39A', '#DDF4F2', '#9ADBD6', '#0A5C57'], ['橄榄', '#6E9A2E', '#EDF4E1', '#C3D9A0', '#3B5714'], ['青绿', '#2A8C7A', '#E0F1ED', '#A5D4C9', '#144D43']],
};
// 色弱友好：避开红绿对比，换成蓝 / 橙黄 / 葡萄紫 / 薄荷
export const CVD = { listen: PALETTES.listen[0], speak: PALETTES.speak[1], practice: PALETTES.practice[1], review: PALETTES.review[1] };
const ACT = [['listen', '听', '听读、原声、听力题'], ['speak', '说', '跟读、分角色、轮到你说'], ['practice', '练', '练习题、换情境'], ['review', '复习', '复习、完成、达标']];

screens.push({
  id: 'colors', name: '设置 · 学习颜色', note: '点颜色，整板实时换色',
  render: () => `<div class="screen">${sbar()}
${abar('学习颜色', '<button class="link" data-reset>恢复默认</button>')}
<div class="cs">
  <p class="cs-intro">四种学习活动各用一种颜色，可以换成你喜欢的。图标和文字一直都在，不只靠颜色区分。</p>
  <div class="cs-prev"><div class="budget"><i style="flex:5;background:var(--review)"></i><i style="flex:15;background:var(--listen)"></i><i style="flex:20;background:var(--speak)"></i><i style="flex:15;background:var(--practice)"></i></div>
  <div class="legend"><span><b style="background:var(--review)"></b>复习</span><span><b style="background:var(--listen)"></b>新课</span><span><b style="background:var(--speak)"></b>跟读</span><span><b style="background:var(--practice)"></b>练习</span></div></div>
  ${ACT.map(([k, n, d]) => `<div class="cs-sec"><div class="cs-sec-h"><b>${n}</b><span>${d}</span></div><div class="tones">${PALETTES[k].map(([name, ...v], i) => `<button class="tone${i === 0 ? ' on' : ''}" data-k="${k}" data-v="${v.join(',')}"><span class="dot" style="background:${v[0]}"><i class="ti ti-check"></i></span>${name}</button>`).join('')}</div></div>`).join('')}
  <button class="cs-row" data-cvd><span><b>色弱友好配色</b><span>避开红绿对比，一键换成更好区分的四色</span></span><i class="switch"></i></button>
</div></div>`,
});

const HEX = {
  listen: ['#2E6BE6', '#E5EDFC', '#163B7D', '#fff'],
  speak: ['#EE6A3C', '#FFE8DD', '#8C3011', '#17191C'],
  practice: ['#6E56CF', '#EDE9FB', '#3B2C82', '#fff'],
  review: ['#1E9E61', '#E0F2E8', '#0D5A36', '#17191C'],
};

export const spec = () => `<div class="spec"><h2>样式规范</h2><p>颜色有固定含义；字号按 390 宽的 Android 设计尺寸给出（1px = 1dp），开发可以直接照做。</p>
<h3>学习活动色</h3><div class="sw-grid">${[['听', '听读、原声、听力题', 'listen'], ['说', '跟读、分角色、轮到你说', 'speak'], ['练', '练习题、换情境', 'practice'], ['复习', '复习、完成、达标', 'review']]
  .map(([n, d, k]) => `<div class="sw"><div class="c" style="background:var(--${k}-tint);color:var(--${k}-deep)"><b>${n}</b><span>${d}</span></div><div class="m"><div style="background:${HEX[k][0]};color:${HEX[k][3]}">${HEX[k][0]}</div><div style="background:${HEX[k][1]};color:${HEX[k][2]}">${HEX[k][1]}</div><div style="background:${HEX[k][2]};color:#fff">${HEX[k][2]}</div></div></div>`).join('')}</div>
<h3>中性色</h3><div class="neu">${[['正文', '#17191C'], ['次要文字', '#565B61'], ['弱化文字', '#6F747A'], ['分隔线', '#E8E4DC'], ['页面底色', '#F5F3EE'], ['卡片', '#FFFFFF']]
  .map(([n, h]) => `<div><i style="background:${h}"></i><span>${n}</span><small>${h}</small></div>`).join('')}</div>
<h3>字号</h3><div class="ty">
<div><small>页面大标题 28 / 800</small><span style="font-size:28px;font-weight:800">下午好，Leon</span></div>
<div><small>课文标题 40 · 衬线</small><span class="en" style="font-size:40px;font-weight:600;line-height:1">Excuse me!</span></div>
<div><small>题目 32 / 800</small><span style="font-size:32px;font-weight:800">感谢你（们）</span></div>
<div><small>课文句子 20 · 衬线</small><span class="en" style="font-size:20px">Is this your handbag?</span></div>
<div><small>正文 15 / 400</small><span style="font-size:15px">先开口说出英文，再核对答案</span></div>
<div><small>说明 13 / 500</small><span style="font-size:13px;color:var(--ink-2);font-weight:500">停顿 = 句长的 1.5 倍</span></div></div>
<h3>组件</h3><div class="cp"><button class="btn pri" style="width:220px">我已作答，核对答案</button><button class="btn sec" style="width:200px">没能答出，看答案</button><button class="btn txt" style="width:auto">先看示范 / 答案</button><span class="chip">1.0×</span><span class="chip"><i class="ti ti-language"></i>中文：点开</span><span class="av a">A</span><span class="av b">B</span><span class="av b solid">B</span></div>
<h3>尺寸</h3><div class="rules"><div><b>20</b><span>左右边距</span></div><div><b>24 / 32</b><span>卡片圆角 / 顶部色块圆角</span></div><div><b>54</b><span>主按钮高度，全圆角</span></div><div><b>≥ 48</b><span>任何可点区域</span></div></div></div>`;
