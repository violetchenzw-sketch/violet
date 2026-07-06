const STORAGE_KEY = "goal-assistant-state";

const tabs = {
  wechat: { mode: "work", title: "公众号爆款拆解", kicker: "工作 / 提升自己" },
  douyin: { mode: "work", title: "抖音视频爆款分析", kicker: "工作 / 提升自己" },
  xhs: { mode: "work", title: "小红书图文结构分析", kicker: "工作 / 提升自己" },
  novel: { mode: "work", title: "豆瓣热门小说", kicker: "工作 / 提升自己" },
  study: { mode: "work", title: "学习截图摘取", kicker: "工作 / 提升自己" },
  dance: { mode: "fun", title: "跳舞每周排期", kicker: "娱乐 / 做个有趣的大人" },
  music: { mode: "fun", title: "音乐双周排期", kicker: "娱乐 / 做个有趣的大人" },
  reading: { mode: "fun", title: "每月阅读列表", kicker: "娱乐 / 做个有趣的大人" },
  "daily-summary": { mode: "summary", title: "每日数据总结", kicker: "总结 / 每日回顾" }
};

const state = loadState();

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindUploads();
  bindForms();
  renderEmptyResults();
  renderNovels(false);
  renderSchedules();
  updateStats();
  initDailyTracker();
  switchTab("wechat");
});

function defaultState() {
  return {
    outputs: 0,
    dance: [],
    music: [],
    reading: [],
    dailyLogs: {} // { "YYYY-MM-DD": { wechat: n, douyin: n, xhs: n, study: n, novel: n, dance: n, music: n, reading: n } }
  };
}

function loadState() {
  try {
    return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function bindNavigation() {
  document.querySelectorAll("[data-mode-button]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.modeButton;
      const firstTab = mode === "work" ? "wechat" : mode === "fun" ? "dance" : "daily-summary";
      switchTab(firstTab);
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });
}

function switchTab(tabName) {
  const tab = tabs[tabName];
  if (!tab) return;

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `panel-${tabName}`);
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabName);
  });

  document.querySelectorAll(".nav-group").forEach((group) => {
    group.classList.toggle("is-open", group.dataset.mode === tab.mode);
  });

  document.querySelectorAll("[data-mode-button]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.modeButton === tab.mode);
  });

  document.getElementById("page-title").textContent = tab.title;
  document.getElementById("mode-kicker").textContent = tab.kicker;
  const modeLabels = { work: "工作模式", fun: "娱乐模式", summary: "总结模式" };
  document.getElementById("status-pill").textContent = modeLabels[tab.mode] || "总结模式";

  if (tabName === "daily-summary") renderDailySummary();
}

function bindUploads() {
  document.querySelectorAll("[data-file]").forEach((input) => {
    input.addEventListener("change", () => {
      const key = input.dataset.file;
      const target = document.querySelector(`[data-file-name="${key}"]`);
      if (!target) return;

      if (!input.files.length) {
        target.textContent = "未选择文件";
        return;
      }

      const names = Array.from(input.files).map((file) => file.name);
      target.textContent = names.length > 1 ? `${names.length} 个文件：${names.join("、")}` : names[0];
    });
  });
}

function bindForms() {
  document.querySelector('[data-form="wechat"]').addEventListener("submit", handleWechat);
  document.querySelector('[data-form="douyin"]').addEventListener("submit", handleDouyin);
  document.querySelector('[data-form="xhs"]').addEventListener("submit", handleXhs);
  document.querySelector('[data-form="study"]').addEventListener("submit", handleStudy);
  document.querySelector('[data-form="dance"]').addEventListener("submit", handleDance);
  document.querySelector('[data-form="music"]').addEventListener("submit", handleMusic);
  document.querySelector('[data-form="reading"]').addEventListener("submit", handleReading);
  document.getElementById("refresh-novels").addEventListener("click", renderNovels);
  document.getElementById("auto-books").addEventListener("click", addRecommendedBooks);
}

function renderEmptyResults() {
  ["wechat", "douyin", "xhs", "study"].forEach((key) => {
    const el = document.getElementById(`${key}-result`);
    el.innerHTML = `
      <div class="empty-result">
        <div>
          <strong>等待输入</strong>
          <p>提交后会在这里输出可直接行动的结论。</p>
        </div>
      </div>
    `;
  });
}

function handleWechat(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const keyword = form.keyword.value.trim() || "这篇公众号文章";
  const notes = form.notes.value.trim();

  trackDaily("wechat");

  setResult("wechat", `
    ${section("爆款点", `
      <ol>
        <li>标题有明确收益或冲突，读者能立刻判断点开后的回报。</li>
        <li>开头先给结论或反常识判断，减少铺垫，把注意力留住。</li>
        <li>正文用案例、清单、金句交替推进，适合转发和收藏。</li>
      </ol>
    `)}
    ${section("可模仿选题", `
      <ol>
        <li>《${escapeHtml(keyword)}背后的 3 个普通人机会》：现象切入，拆机会，给行动清单。</li>
        <li>《我复盘了${escapeHtml(keyword)}，发现真正有效的是这一步》：复盘切入，提出核心变量。</li>
        <li>《别再只看热闹了，${escapeHtml(keyword)}可以这样迁移到你的工作里》：迁移切入，强调可复制。</li>
      </ol>
    `)}
    ${section("文章结构", `
      <p>强钩子标题 -> 30 秒讲清收益 -> 2 到 3 个案例 -> 方法论拆成 3 步 -> 给模板 -> 评论区问题收尾。</p>
      ${notes ? `<p>你补充的观察：${escapeHtml(notes)}</p>` : ""}
    `)}
  `);
}

function handleDouyin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const url = form.url.value.trim();
  const notes = form.notes.value.trim();

  if (!url) {
    toast("请先粘贴抖音分享链接");
    return;
  }

  trackDaily("douyin");

  setResult("douyin", `
    ${section("内容识别", `
      <p>链接已记录：${escapeHtml(url)}</p>
      <p>当前静态版不会真实下载视频，已按短视频拆解框架生成分析。</p>
    `)}
    ${section("爆款点", `
      <ol>
        <li>前 3 秒需要出现结果、冲突或异常画面，让用户知道为什么不能划走。</li>
        <li>每 5 到 7 秒切换一个信息点，避免单一镜头拖慢完播率。</li>
        <li>评论区问题要能引发站队、补充经验或求教程。</li>
      </ol>
    `)}
    ${section("复刻动作", `
      <ul>
        <li>脚本：一句结果开场，三段递进解释，最后一句明确引导互动。</li>
        <li>画面：封面只保留一个大标题和一个主体，不堆素材。</li>
        <li>发布后：把高赞评论整理成下一条选题。</li>
      </ul>
      ${notes ? `<p>你补充的线索：${escapeHtml(notes)}</p>` : ""}
    `)}
  `);
}

function handleXhs(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const notes = form.notes.value.trim();

  trackDaily("xhs");

  setResult("xhs", `
    ${section("排版结构", `
      <ol>
        <li>封面：标题占画面 25% 到 35%，视觉主体居中，背景少干扰。</li>
        <li>正文：一页一个结论，用短句、数字和分隔线降低阅读成本。</li>
        <li>末页：给清单、模板或避坑总结，强化收藏理由。</li>
      </ol>
    `)}
    ${section("爆款点", `
      <ol>
        <li>人群标签明确，例如新手、打工人、独居女生、低预算。</li>
        <li>标题同时包含痛点和结果，减少抽象形容词。</li>
        <li>图片信息密度高但层级清楚，读者扫一眼能抓到重点。</li>
      </ol>
      ${notes ? `<p>你补充的数据：${escapeHtml(notes)}</p>` : ""}
    `)}
  `);
}

function handleStudy(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const topic = form.topic.value.trim() || "这份资料";
  const notes = form.notes.value.trim();

  trackDaily("study");

  setResult("study", `
    ${section("关键信息", `
      <p>主题：${escapeHtml(topic)}</p>
      <ul>
        <li>核心概念：先定义对象，再说明它解决什么问题。</li>
        <li>重要关系：找出因果、对比、步骤和条件。</li>
        <li>可执行动作：把资料转成下一次能复用的清单。</li>
      </ul>
    `)}
    ${section("整理文本", `
      <p>${notes ? escapeHtml(notes) : "当前静态版无法直接 OCR。你可以把截图文字粘贴到输入框，页面会按复习笔记结构整理；接入 OCR 接口后可自动识别图片文字。"}</p>
    `)}
    ${section("复习卡片", `
      <ol>
        <li>一句话总结：${escapeHtml(topic)}最重要的是把信息转成行动。</li>
        <li>下次复习：先看核心概念，再看例子，最后做一遍输出。</li>
      </ol>
    `)}
  `);
}

function setResult(key, html) {
  const el = document.getElementById(`${key}-result`);
  el.innerHTML = `
    ${html}
    <div class="copy-row">
      <button class="plain-button" type="button" data-copy="${key}">复制结果</button>
    </div>
  `;

  el.querySelector("[data-copy]").addEventListener("click", () => {
    copyText(el.innerText);
  });

  state.outputs += 1;
  saveState();
  updateStats();
  toast("分析结果已生成");
}

function section(title, content) {
  return `<section class="result-section"><h3>${title}</h3>${content}</section>`;
}

function renderNovels(showMessage = true) {
// 从 localStorage 读取已读状态
function getReadStatus() {
  try {
    return JSON.parse(localStorage.getItem('novelReadStatus') || '{}');
  } catch {
    return {};
  }
}

// 保存到 localStorage
function setReadStatus(status) {
  localStorage.setItem('novelReadStatus', JSON.stringify(status));
}

let readStatus = getReadStatus();

const novels = [
  {
    title: "太白金星有点烦",
    author: "马伯庸",
    rating: "9.0",
    summary: "太白金星李长庚最近有点烦。天庭和西天联合推出了「西天取经」的重大项目，他受命策划九九八十一难，确保唐僧能安全走完流程，平稳取经。老神仙本以为一切尽在掌控，谁知天大的麻烦才刚刚开始——费用报销、工作汇报、人事安排、各路大仙塞来的条子、各地妖怪暗藏的心思，捋不出的千头万缕，做不完的繁杂琐事……当大闹天宫的真相重新浮出水面，牵扯出无数因果，李长庚发觉自己成就金仙的道路越加渺茫。",
    url: "https://book.douban.com/subject/36328762/",
    read: !!readStatus["太白金星有点烦"]
  },
    {
      title: "我在北京送快递",
 {
  title: "我在北京送快递",
  author: "胡安焉",
  rating: "8.2",
  summary: "进入社会工作至今的二十年间，胡安焉走南闯北，辗转于广东、广西、云南、上海、北京等地，做过快递员、夜班拣货工人、便利店店员、保安、自行车店销售、服装店销售、加油站加油工……他将日常的点滴和工作的甘苦化作真诚的自述，记录了一个平凡人在工作中的辛劳、私心、温情与正气。",
  url: "https://book.douban.com/subject/36274718/",
  read: !!readStatus["我在北京送快递"]
},
    {
      title: "长安的荔枝",
   {
  title: "长安的荔枝",
  author: "马伯庸",
  rating: "8.5",
  summary: "大唐天宝十四年，长安城的小吏李善德突然接到一个任务：要在贵妃诞日之前，从岭南运来新鲜荔枝。荔枝「一日色变，两日香变，三日味变」，而岭南距长安五千余里，山水迢迢，这是个不可能完成的任务。可为了家人，李善德决心放手一搏。",
  url: "https://book.douban.com/subject/36104107/",
  read: !!readStatus["长安的荔枝"]
},
    {
      title: "额尔古纳河右岸",
 {
  title: "额尔古纳河右岸",
  author: "迟子建",
  rating: "9.1",
  summary: "这是第一部描述我国东北少数民族鄂温克人生存现状及百年沧桑的长篇小说。似一壁饱得天地之灵气，令人惊叹却难得其解的神奇岩画；又似一卷时而安恬、时而激越，向世人诉说人生挚爱与心灵悲苦的民族史诗。",
  url: "https://book.douban.com/subject/1437752/",
  read: !!readStatus["额尔古纳河右岸"]
},
    {
      title: "活着",
      {
  title: "活着",
  author: "余华",
  rating: "9.4",
  summary: "《活着》讲述了农村人福贵悲惨的人生遭遇。福贵本是个阔少爷，可他嗜赌如命，终于赌光了家业，一贫如洗。他的父亲被他活活气死，母亲则在穷困中患了重病。此后更加悲惨的命运一次又一次降临到福贵身上，他的妻子、儿女和孙子相继死去，最后只剩福贵和一头老牛相依为命，但他依旧活着，仿佛比往日更加洒脱与坚强。",
  url: "https://book.douban.com/subject/4913064/",
  read: !!readStatus["活着"]
},
    {
      title: "盐镇",
      {
  title: "盐镇",
  author: "易小荷",
  rating: "8.6",
  summary: "在四川南部的古老盐业小镇，女人们过着看似波澜不惊实则惊心动魄的生活。十六七岁就步入婚姻，怀孕、家暴、背叛……她们默默忍受着，直到耗尽一生。古镇的兴衰、婚姻的变故、代际的创伤，都汇聚在这些女性的命运之中。作者历时一年沉浸式调查，打捞出十二位女性在城乡之间、历史与现实中挣扎求存的故事。",
  url: "https://book.douban.com/subject/36247024/",
  read: !!readStatus["盐镇"]
}]
  ];

  // 过滤掉已读的
const unreadNovels = novels.filter(n => !n.read);

document.getElementById("novel-list").innerHTML = unreadNovels.map((novel, index) => `
    <article class="list-item novel-card">
      <div class="novel-header">
        <span class="novel-rank">Top ${index + 1}</span>
        <span class="novel-rating">⭐ ${novel.rating}</span>
      </div>
      <div class="novel-controls">
        <label class="novel-checkbox-label">
          <input type="checkbox" class="novel-read-checkbox" data-title="${escapeHtml(novel.title)}" ${novel.read ? 'checked' : ''}>
          已阅读
        </label>
      </div>
      <strong>${escapeHtml(novel.title)}</strong>
      <span class="novel-author">${escapeHtml(novel.author)}</span>
      <p class="novel-summary">${escapeHtml(novel.summary)}</p>
      <a class="novel-link" href="${novel.url}" target="_blank" rel="noopener">📖 豆瓣详情页 →</a>
    </article>
  `).join("");

// 绑定勾选事件
requestAnimationFrame(() => {
  document.querySelectorAll('.novel-read-checkbox').forEach(cb => {
    cb.addEventListener('change', e => {
      const title = e.target.dataset.title;
      readStatus[title] = e.target.checked;
      setReadStatus(readStatus);
      // 重新渲染
      renderNovels(false);
    });
  });
});

  if (showMessage) { trackDaily("novel"); toast("榜单已刷新"); }
}

function handleDance(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const title = form.title.value.trim() || getUploadedName("dance") || "新舞蹈";
  const week = nextWeekLabel(state.dance.length, 1);

  state.dance.push({
    id: Date.now(),
    title,
    period: week,
    status: "pending"
  });

  trackDaily("dance");
  form.reset();
  resetFileName("dance", "MP4 / MOV");
  persistAndRender("已加入跳舞周计划");
}

function handleMusic(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const title = form.title.value.trim() || getUploadedName("music") || "新歌曲";
  const period = nextWeekLabel(state.music.length, 2);

  state.music.push({
    id: Date.now(),
    title,
    period,
    status: "pending"
  });

  trackDaily("music");
  form.reset();
  resetFileName("music", "图片 / PDF");
  persistAndRender("已加入音乐双周计划");
}

function handleReading(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const title = form.title.value.trim();
  const author = form.author.value.trim() || "作者待补";

  if (!title) {
    toast("请输入书名");
    return;
  }

  addBook(title, author, "手动添加");
  trackDaily("reading");
  form.reset();
  persistAndRender("已加入本月阅读列表");
}

function addRecommendedBooks() {
  const recommendations = [
    ["我在北京送快递", "胡安焉", "热门新书"],
    ["明亮的夜晚", "崔恩荣", "网友推荐"],
    ["杀死一只知更鸟", "哈珀·李", "经典好书"],
    ["置身事内", "兰小欢", "高分好书"]
  ];

  recommendations.forEach(([title, author, source]) => addBook(title, author, source));
  trackDaily("reading");
  persistAndRender("推荐组合已加入");
}

function addBook(title, author, source) {
  const exists = state.reading.some((book) => book.title === title);
  if (exists) return;

  state.reading.push({
    id: Date.now() + Math.random(),
    title,
    author,
    source,
    month: new Date().getMonth() + 1,
    status: "pending"
  });
}

function renderSchedules() {
  renderSchedule("dance", state.dance);
  renderSchedule("music", state.music);
  renderSchedule("reading", currentMonthBooks());
}

function renderSchedule(key, items) {
  const target = document.getElementById(`${key}-list`);
  if (!target) return;

  if (!items.length) {
    target.innerHTML = `<div class="empty-result"><div><strong>暂无计划</strong><p>添加后会自动显示在这里。</p></div></div>`;
    return;
  }

  target.innerHTML = items.map((item) => `
    <article class="schedule-item">
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <small>${escapeHtml(item.period || item.source || "")}${item.author ? ` / ${escapeHtml(item.author)}` : ""}</small>
      </div>
      <div class="schedule-actions">
        <span class="state ${item.status === "done" ? "done" : ""}">${item.status === "done" ? "完成" : "进行中"}</span>
        <button class="icon-button" type="button" title="切换状态" data-toggle="${key}" data-id="${item.id}">✓</button>
        <button class="icon-button" type="button" title="删除" data-delete="${key}" data-id="${item.id}">×</button>
      </div>
    </article>
  `).join("");

  target.querySelectorAll("[data-toggle]").forEach((button) => {
    button.addEventListener("click", () => toggleItem(button.dataset.toggle, button.dataset.id));
  });

  target.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteItem(button.dataset.delete, button.dataset.id));
  });
}

function toggleItem(key, id) {
  const list = key === "reading" ? state.reading : state[key];
  const item = list.find((entry) => String(entry.id) === String(id));
  if (!item) return;

  item.status = item.status === "done" ? "pending" : "done";
  persistAndRender(item.status === "done" ? "已标记完成" : "已恢复为进行中");
}

function deleteItem(key, id) {
  state[key] = state[key].filter((entry) => String(entry.id) !== String(id));
  persistAndRender("已删除");
}

function persistAndRender(message) {
  saveState();
  renderSchedules();
  updateStats();
  toast(message);
}

function updateStats() {
  document.getElementById("work-output-count").textContent = state.outputs;

  const activePlans = [...state.dance, ...state.music, ...currentMonthBooks()]
    .filter((item) => item.status !== "done").length;
  document.getElementById("plan-count").textContent = activePlans;

  const doneBooks = currentMonthBooks().filter((book) => book.status === "done").length;
  document.getElementById("reading-progress").textContent = `${doneBooks}/4`;
}

function currentMonthBooks() {
  const month = new Date().getMonth() + 1;
  return state.reading.filter((book) => book.month === month);
}

function nextWeekLabel(index, span) {
  const start = index * span + 1;
  if (span === 1) return `第 ${start} 周`;
  return `第 ${start}-${start + span - 1} 周`;
}

function getUploadedName(key) {
  const input = document.querySelector(`[data-file="${key}"]`);
  return input?.files?.[0]?.name.replace(/\.[^.]+$/, "");
}

function resetFileName(key, text) {
  const target = document.querySelector(`[data-file-name="${key}"]`);
  if (target) target.textContent = text;
}

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(el.timer);
  el.timer = setTimeout(() => el.classList.remove("is-visible"), 1800);
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => toast("结果已复制")).catch(() => fallbackCopy(text));
    return;
  }

  fallbackCopy(text);
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  document.body.removeChild(area);
  toast("结果已复制");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ===================== 每日总结 =====================

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function ensureTodayLog() {
  const key = todayKey();
  if (!state.dailyLogs[key]) {
    state.dailyLogs[key] = { wechat: 0, douyin: 0, xhs: 0, study: 0, novel: 0, dance: 0, music: 0, reading: 0 };
  }
  return state.dailyLogs[key];
}

function trackDaily(category) {
  const log = ensureTodayLog();
  if (log[category] !== undefined) {
    log[category] += 1;
  }
  saveState();
}

function initDailyTracker() {
  // 绑定总结面板按钮
  const refreshBtn = document.getElementById("refresh-summary");
  const copyBtn = document.getElementById("copy-summary");
  if (refreshBtn) refreshBtn.addEventListener("click", () => { renderDailySummary(); toast("数据已汇总"); });
  if (copyBtn) copyBtn.addEventListener("click", () => {
    const content = document.getElementById("daily-summary-content")?.innerText;
    if (content) copyText(content);
  });

  // 启动 23:00 定时检查（每分钟检查一次）
  checkAutoSummary();
  setInterval(checkAutoSummary, 60000);
}

function checkAutoSummary() {
  const now = new Date();
  const key = todayKey();

  // 检查是否已到 23:00 且今天还没汇总过
  if (now.getHours() === 23 && now.getMinutes() === 0) {
    const log = state.dailyLogs[key];
    if (!log || !log._autoSummarized) {
      ensureTodayLog();
      state.dailyLogs[key]._autoSummarized = true;
      saveState();
      // 如果当前在总结面板，自动刷新
      if (document.getElementById("panel-daily-summary")?.classList.contains("is-active")) {
        renderDailySummary();
      }
      toast("⏰ 每日 23:00 自动总结已生成");
    }
  } else if (now.getHours() === 0 && now.getMinutes() === 0) {
    // 跨天时清除当天标记，重置自动汇总状态
    const log = state.dailyLogs[key];
    if (log?._autoSummarized) {
      delete log._autoSummarized;
      saveState();
    }
  }
}

function renderDailySummary() {
  const container = document.getElementById("daily-summary-content");
  const titleEl = document.getElementById("summary-date-title");
  if (!container) return;

  const key = todayKey();
  const log = state.dailyLogs[key] || { wechat: 0, douyin: 0, xhs: 0, study: 0, novel: 0, dance: 0, music: 0, reading: 0 };

  const workTotal = log.wechat + log.douyin + log.xhs + log.study + log.novel;
  const funTotal = log.dance + log.music + log.reading;
  const total = workTotal + funTotal;

  if (titleEl) {
    titleEl.textContent = `${key} 数据总结`;
  }

  const date = new Date();
  const dayOfWeek = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;">
      <article class="list-item" style="text-align:center;">
        <span style="font-size:12px;color:var(--muted);">总操作次数</span>
        <strong style="font-size:32px;color:var(--work);">${total}</strong>
      </article>
      <article class="list-item" style="text-align:center;">
        <span style="font-size:12px;color:var(--muted);">工作产出</span>
        <strong style="font-size:32px;color:var(--work);">${workTotal}</strong>
      </article>
      <article class="list-item" style="text-align:center;">
        <span style="font-size:12px;color:var(--muted);">娱乐活动</span>
        <strong style="font-size:32px;color:var(--fun);">${funTotal}</strong>
      </article>
    </div>
    <div class="task-card">
      <div class="card-head">
        <span class="label">工作</span>
        <h2>提升自己 · 详细数据</h2>
      </div>
      <div style="display:grid;gap:8px;">
        ${renderLogItem("📱 公众号分析", log.wechat, "var(--work)")}
        ${renderLogItem("🎵 抖音分析", log.douyin, "var(--work)")}
        ${renderLogItem("📕 小红书分析", log.xhs, "var(--work)")}
        ${renderLogItem("📚 小说查询", log.novel, "var(--work)")}
        ${renderLogItem("📖 学习摘取", log.study, "var(--work)")}
      </div>
    </div>
    <div class="task-card">
      <div class="card-head">
        <span class="label fun">娱乐</span>
        <h2>做个有趣的大人 · 详细数据</h2>
      </div>
      <div style="display:grid;gap:8px;">
        ${renderLogItem("💃 跳舞排期", log.dance, "var(--fun)")}
        ${renderLogItem("🎹 音乐排期", log.music, "var(--fun)")}
        ${renderLogItem("📖 读书添加", log.reading, "var(--fun)")}
      </div>
    </div>
    <div class="task-card" style="background:linear-gradient(135deg,#f8f6ff,#ede8ff);border-color:#d5c8f0;">
      <div class="card-head">
        <span class="label" style="background:#ede8ff;color:#7c5ce7;">💡</span>
        <h2>每日小结</h2>
      </div>
      <p style="color:var(--muted);line-height:1.8;">
        ${total === 0
          ? `今天是 ${key}（周${dayOfWeek}），暂无操作记录。开始工作或娱乐吧，每天积累一点点！`
          : `今天是 ${key}（周${dayOfWeek}），你共完成 <strong style="color:var(--ink);">${total}</strong> 次操作。`
        }
        ${workTotal > 0 ? `<br>工作方面完成了 <strong style="color:var(--work);">${workTotal}</strong> 次内容分析与学习，继续保持！` : ""}
        ${funTotal > 0 ? `<br>娱乐方面完成了 <strong style="color:var(--fun);">${funTotal}</strong> 次活动排期与阅读添加，生活需要平衡。` : ""}
        ${total >= 5 ? `<br>🎉 今天效率很高，给自己点个赞！` : total > 0 ? `<br>👍 不错的一天，明天继续加油！` : ""}
      </p>
    </div>
  `;
}

function renderLogItem(label, count, color) {
  const pct = Math.min(count * 20, 100);
  return `
    <div style="display:flex;align-items:center;gap:12px;">
      <span style="min-width:110px;font-size:14px;">${label}</span>
      <div style="flex:1;background:#e8eaef;border-radius:4px;height:8px;">
        <div style="background:${color};height:8px;border-radius:4px;width:${pct}%;transition:width 0.3s;"></div>
      </div>
      <strong style="min-width:24px;text-align:right;font-size:14px;">${count}</strong>
    </div>
  `;
}
