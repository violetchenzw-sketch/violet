const STORAGE_KEY = "violet-thinking-lab-v2";
const DB_NAME = "violet-content-library";
const DB_STORE = "files";
const tabs = {
  wechat:["work","公众号内容拆解","工作与成长 / 观察","不仅记录内容，也记录它为什么打动你。"],
  douyin:["work","视频思考观察","工作与成长 / 分类","看见自己的观看偏好，以及它如何影响行动。"],
  xhs:["work","小红书表达拆解","工作与成长 / 表达","从心动的封面和标题里，找到自己的审美判断。"],
  novel:["work","小说推荐理由","工作与成长 / 阅读","选择适合你的书，而不只是热门的书。"],
  study:["work","学习连接笔记","工作与成长 / 学习","把新知识连接到已有经验。"],
  dance:["fun","跳舞练习计划","兴趣与生活 / 身体","记录动作之外的身体感受和情绪变化。"],
  music:["fun","音乐练习计划","兴趣与生活 / 声音","让喜欢一首歌的理由也被留下。"],
  reading:["fun","每月阅读计划","兴趣与生活 / 阅读","从书单走向真正想回答的问题。"],
  "daily-summary":["summary","每日思考总结","我的观察 / 今日","观察注意力、情绪和行动的流向。"],
  library:["summary","每日内容库","我的观察 / 内容库","回看每天上传的内容，以及当时的思考。"]
};
const firstTabs={work:"wechat",fun:"dance",summary:"daily-summary"};
const state=loadState();
let libraryDateFilter="all";

document.addEventListener("DOMContentLoaded",async()=>{
  bindNavigation();bindFiles();bindForms();bindGlobalActions();renderEmptyResults();renderNovels();renderPlans();updateStats();
  await openDB();switchTab("wechat");
});

function defaultState(){return{records:[],plans:{dance:[],music:[],reading:[]},readNovels:{}}}
function loadState(){try{const data=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");return{...defaultState(),...data,plans:{...defaultState().plans,...(data.plans||{})}}}catch{return defaultState()}}
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function newId(){return `${Date.now()}-${Math.random().toString(16).slice(2)}`}

function bindNavigation(){
  document.querySelectorAll("[data-mode-button]").forEach(btn=>btn.addEventListener("click",()=>{
    const group=btn.closest(".nav-group");const wasOpen=group.classList.contains("is-open");
    document.querySelectorAll(".nav-group").forEach(g=>{g.classList.remove("is-open");g.querySelector("[data-mode-button]")?.setAttribute("aria-expanded","false")});
    if(!wasOpen){group.classList.add("is-open");btn.setAttribute("aria-expanded","true");const activeMode=tabs[currentTab()]?.[0];if(activeMode!==btn.dataset.modeButton)switchTab(firstTabs[btn.dataset.modeButton])}
  }));
  document.querySelectorAll("[data-tab]").forEach(btn=>btn.addEventListener("click",()=>switchTab(btn.dataset.tab)));
}
function currentTab(){return document.querySelector(".panel.is-active")?.id.replace("panel-","")||"wechat"}
function switchTab(name){
  const tab=tabs[name];if(!tab)return;
  document.querySelectorAll(".panel").forEach(p=>p.classList.toggle("is-active",p.id===`panel-${name}`));
  document.querySelectorAll("[data-tab]").forEach(b=>b.classList.toggle("is-active",b.dataset.tab===name));
  document.querySelectorAll(".nav-group").forEach(g=>{const open=g.dataset.mode===tab[0];g.classList.toggle("is-open",open);g.querySelector("[data-mode-button]")?.setAttribute("aria-expanded",String(open))});
  document.querySelectorAll("[data-mode-button]").forEach(b=>b.classList.toggle("is-active",b.dataset.modeButton===tab[0]));
  document.getElementById("page-title").textContent=tab[1];document.getElementById("mode-kicker").textContent=tab[2];document.getElementById("page-intro").textContent=tab[3];
  if(name==="daily-summary")renderSummary();if(name==="library")renderLibrary();window.scrollTo({top:0,behavior:"smooth"});
}

function bindFiles(){document.querySelectorAll("input[data-file]").forEach(input=>input.addEventListener("change",()=>{const out=input.closest("label")?.querySelector("[data-file-name]");if(out)out.textContent=input.files.length?Array.from(input.files).map(f=>f.name).join("、"):"未选择文件"}))}
function bindForms(){
  document.querySelectorAll("[data-capture-form]").forEach(form=>form.addEventListener("submit",handleCapture));
  document.querySelectorAll("[data-plan-form]").forEach(form=>form.addEventListener("submit",handlePlan));
}
function formDataObject(form){const data=new FormData(form);return Object.fromEntries([...data.entries()].filter(([,v])=>typeof v==="string"))}

async function handleCapture(event){
  event.preventDefault();const form=event.currentTarget;const type=form.dataset.captureForm;const values=formDataObject(form);const input=form.querySelector("input[data-file]");
  if(!values.title?.trim()&&!input?.files?.length&&!values.url?.trim()){toast("请至少填写标题、链接或上传文件");return}
  const record={id:newId(),date:todayKey(),createdAt:new Date().toISOString(),type,title:values.title?.trim()||input?.files?.[0]?.name||"未命名内容",category:values.category||"未分类",emotion:values.emotion||"未记录",reason:values.reason?.trim()||"暂未填写",viewpoint:values.viewpoint?.trim()||"暂未形成观点",action:values.action?.trim()||"",url:values.url?.trim()||"",files:[]};
  if(input?.files?.length){try{record.files=await saveFiles(input.files,record.id)}catch(error){toast(error.message||"文件保存失败，请换一个较小的文件");return}}
  state.records.unshift(record);saveState();renderThoughtResult(type,record);form.reset();resetFileLabel(form);updateStats();toast("内容与思考已保存");
}
async function handlePlan(event){
  event.preventDefault();const form=event.currentTarget;const type=form.dataset.planForm;const values=formDataObject(form);const input=form.querySelector("input[data-file]");
  if(!values.title?.trim()){toast("请先填写名称");return}
  const item={id:newId(),date:todayKey(),createdAt:new Date().toISOString(),type,title:values.title.trim(),author:values.author?.trim()||"",category:values.category?.trim()||"未分类",emotion:values.emotion||"未记录",reason:values.reason?.trim()||"",action:values.action?.trim()||"",status:"pending",files:[]};
  if(input?.files?.length){try{item.files=await saveFiles(input.files,item.id)}catch(error){toast(error.message||"文件保存失败，请换一个较小的文件");return}}
  state.plans[type].unshift(item);state.records.unshift({...item,viewpoint:"计划内容",url:""});saveState();form.reset();resetFileLabel(form);renderPlans();updateStats();toast("已加入计划");
}
function resetFileLabel(form){const out=form.querySelector("[data-file-name]");if(out)out.textContent="可重新选择文件"}
function renderThoughtResult(type,r){const target=document.getElementById(`${type}-result`);if(!target)return;target.innerHTML=`<div class="thought-card"><div class="thought-hero"><span class="label purple">你的思考卡</span><h3>${escapeHtml(r.title)}</h3><div class="tag-row"><span class="tag">${escapeHtml(r.category)}</span><span class="tag">情绪 · ${escapeHtml(r.emotion)}</span></div></div>${thoughtSection("为什么吸引你",r.reason)}${thoughtSection("你的判断",r.viewpoint)}${thoughtSection("行动转化",r.action||"还没有写下行动。可以问自己：明天能做的最小一步是什么？")}</div>`}
function thoughtSection(title,text){return `<section class="thought-section"><h4>${title}</h4><p>${escapeHtml(text)}</p></section>`}
function renderEmptyResults(){["wechat","douyin","xhs","study"].forEach(type=>{const el=document.getElementById(`${type}-result`);if(el)el.innerHTML=`<div class="empty-result"><div><b>等待你的观察</b><p>保存后，这里会生成一张属于你的思考卡。</p></div></div>`})}

const novels=[
  {title:"太白金星有点烦",author:"马伯庸",rating:"9.0",theme:"职场 · 规则 · 选择",reason:"如果你常在复杂协作中感到疲惫，它会用轻巧的神话外壳，帮你重新理解规则与个人选择。",question:"当系统目标和个人价值冲突时，你会怎么选？"},
  {title:"我在北京送快递",author:"胡安焉",rating:"8.2",theme:"劳动 · 普通人 · 尊严",reason:"适合想理解真实工作经验的人。它不贩卖逆袭，而是认真看见普通人的辛劳与判断。",question:"你如何定义一份工作的价值？"},
  {title:"明亮的夜晚",author:"崔恩荣",rating:"8.8",theme:"女性 · 代际 · 关系",reason:"如果你正在理解母女关系或女性之间的支持，这本书温柔但不回避复杂。",question:"哪些情感在你的家庭中从未被说出口？"},
  {title:"置身事内",author:"兰小欢",rating:"9.0",theme:"经济 · 制度 · 中国",reason:"适合想把社会新闻背后的结构看得更清楚的人，帮助你从事件走向机制。",question:"个人选择如何被制度环境塑造？"},
  {title:"活着",author:"余华",rating:"9.4",theme:"生命 · 苦难 · 韧性",reason:"当你想理解人在失去之后如何继续生活，它会提供朴素而有力的视角。",question:"活着本身是否就具有意义？"},
  {title:"盐镇",author:"易小荷",rating:"8.6",theme:"女性 · 小镇 · 命运",reason:"适合关注女性处境和城乡变化的人，它用真实调查让抽象问题变得具体。",question:"沉默是忍耐、保护，还是被迫的选择？"}
];
function renderNovels(){const target=document.getElementById("novel-list");target.innerHTML=novels.map((n,i)=>{const read=!!state.readNovels[n.title];return `<article class="novel-card ${read?"is-read":""}"><div class="novel-top"><span class="label ${i%2?"pink":"yellow"}">推荐 ${i+1}</span><span class="rating">★ ${n.rating}</span></div><h3>${n.title}</h3><p>${n.author} · ${n.theme}</p><div class="reason-box"><b>推荐给你的理由</b><br>${n.reason}</div><p><b>带着这个问题读：</b>${n.question}</p><label class="read-toggle"><input type="checkbox" data-novel-read="${n.title}" ${read?"checked":""}> 已阅读</label></article>`}).join("");target.querySelectorAll("[data-novel-read]").forEach(cb=>cb.addEventListener("change",()=>{state.readNovels[cb.dataset.novelRead]=cb.checked;saveState();renderNovels();updateStats()}))}

function renderPlans(){["dance","music","reading"].forEach(type=>{const target=document.getElementById(`${type}-list`);const items=state.plans[type]||[];if(!items.length){target.innerHTML=`<div class="empty-result"><div><b>还没有计划</b><p>先添加一个真正想做的项目。</p></div></div>`;return}target.innerHTML=items.map(x=>`<article class="schedule-item"><div><strong>${escapeHtml(x.title)}</strong><small>${escapeHtml(x.category)} · ${escapeHtml(x.emotion)}${x.reason?`<br>${escapeHtml(x.reason)}`:""}</small></div><div class="schedule-actions"><span class="state ${x.status==="done"?"done":""}">${x.status==="done"?"已完成":"进行中"}</span><button class="icon-button" data-toggle-plan="${type}" data-id="${x.id}" title="切换状态">✓</button><button class="icon-button" data-delete-plan="${type}" data-id="${x.id}" title="删除">×</button></div></article>`).join("")});document.querySelectorAll("[data-toggle-plan]").forEach(b=>b.onclick=()=>togglePlan(b.dataset.togglePlan,b.dataset.id));document.querySelectorAll("[data-delete-plan]").forEach(b=>b.onclick=()=>deletePlan(b.dataset.deletePlan,b.dataset.id))}
function togglePlan(type,id){const item=state.plans[type].find(x=>x.id===id);if(item)item.status=item.status==="done"?"pending":"done";saveState();renderPlans();updateStats()}
function deletePlan(type,id){state.plans[type]=state.plans[type].filter(x=>x.id!==id);saveState();renderPlans();updateStats()}

function updateStats(){const today=state.records.filter(r=>r.date===todayKey());document.getElementById("today-count").textContent=today.length;document.getElementById("action-count").textContent=today.filter(r=>r.action).length;const books=state.plans.reading||[];document.getElementById("reading-progress").textContent=`${books.filter(b=>b.status==="done").length}/4`;const emotions=frequency(today.map(r=>r.emotion).filter(Boolean));document.getElementById("emotion-stat").textContent=emotions[0]?.[0]||"—"}
function frequency(values){const m={};values.forEach(v=>m[v]=(m[v]||0)+1);return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function renderSummary(){const today=state.records.filter(r=>r.date===todayKey());document.getElementById("summary-date").textContent=`${todayKey()} · 每日总结`;const cats=frequency(today.map(r=>r.category));const emotions=frequency(today.map(r=>r.emotion));const actionRate=today.length?Math.round(today.filter(r=>r.action).length/today.length*100):0;document.getElementById("insight-grid").innerHTML=`<article class="insight-card"><span>注意力方向</span><strong>${escapeHtml(cats[0]?.[0]||"等待记录")}</strong><p>${cats.length>1?`你还关注了 ${cats.slice(1,3).map(x=>x[0]).join("、")}。`:"多记录几条，就能看见稳定偏好。"}</p></article><article class="insight-card"><span>情绪倾向</span><strong>${escapeHtml(emotions[0]?.[0]||"等待记录")}</strong><p>${emotions[0]?`这种情绪今天出现了 ${emotions[0][1]} 次。`:"内容为什么打动你，往往藏在情绪里。"}</p></article><article class="insight-card"><span>行动转化</span><strong>${actionRate}%</strong><p>${actionRate>=60?"你很擅长把输入转化为下一步。":"可以尝试给每条收藏写一个最小行动。"}</p></article>`;const feed=document.getElementById("daily-feed");feed.innerHTML=today.length?today.map(r=>`<article class="feed-item"><div><b>${escapeHtml(r.title)}</b><br><small>${escapeHtml(r.category)} · ${escapeHtml(r.emotion)}</small></div><button data-open-record="${r.id}">查看内容 →</button></article>`).join(""):`<div class="empty-result"><div><b>今天还没有记录</b><p>从任意子菜单保存一条内容，就会出现在这里。</p></div></div>`;feed.querySelectorAll("[data-open-record]").forEach(b=>b.onclick=()=>{libraryDateFilter=todayKey();switchTab("library");setTimeout(()=>document.querySelector(`[data-view-record="${b.dataset.openRecord}"]`)?.scrollIntoView({behavior:"smooth",block:"center"}),50)})}

function bindGlobalActions(){document.getElementById("refresh-novels").onclick=()=>{renderNovels();toast("推荐理由已刷新")};document.getElementById("open-today-library").onclick=()=>{libraryDateFilter=todayKey();switchTab("library")};document.getElementById("library-filter").onchange=renderLibrary;document.getElementById("viewer-close").onclick=closeViewer;document.getElementById("viewer").addEventListener("click",e=>{if(e.target.id==="viewer")closeViewer()})}
async function renderLibrary(){const target=document.getElementById("content-library");const type=document.getElementById("library-filter").value;let records=state.records.filter(r=>(type==="all"||r.type===type)&&(libraryDateFilter==="all"||r.date===libraryDateFilter));if(!records.length){target.innerHTML=`<div class="empty-result"><div><b>暂无内容</b><p>上传后的文件和思考会保存在这里。</p></div></div>`;return}target.innerHTML=records.map(r=>`<article class="content-card" data-record-card="${r.id}"><div class="content-preview" data-preview="${r.id}">${previewIcon(r)}</div><div class="content-body"><div class="tag-row"><span class="tag">${escapeHtml(r.category)}</span><span class="tag">${escapeHtml(r.emotion)}</span></div><h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.reason||"暂无推荐理由")}</p><div class="content-actions"><button class="small-button primary" data-view-record="${r.id}">查看内容</button><button class="small-button" data-delete-record="${r.id}">删除</button></div></div></article>`).join("");for(const r of records)await hydratePreview(r);target.querySelectorAll("[data-view-record]").forEach(b=>b.onclick=()=>viewRecord(b.dataset.viewRecord));target.querySelectorAll("[data-delete-record]").forEach(b=>b.onclick=()=>deleteRecord(b.dataset.deleteRecord))}
function previewIcon(r){if(r.url)return"↗";const mime=r.files?.[0]?.type||"";if(mime.startsWith("video"))return"▶";if(mime.startsWith("audio"))return"♫";if(mime.includes("pdf"))return"PDF";if(mime.startsWith("image"))return"▧";return"✦"}
async function hydratePreview(record){const file=record.files?.[0];if(!file||!file.type.startsWith("image"))return;const stored=await dbGet(file.id);if(!stored)return;const url=URL.createObjectURL(stored.blob);const target=document.querySelector(`[data-preview="${record.id}"]`);if(target)target.innerHTML=`<img src="${url}" alt="${escapeHtml(record.title)}">`}
async function viewRecord(id){const r=state.records.find(x=>x.id===id);if(!r)return;if(r.url&&!r.files?.length){window.open(r.url,"_blank","noopener");return}const file=r.files?.[0];if(!file){toast("这条记录没有上传文件");return}const stored=await dbGet(file.id);if(!stored){toast("本地文件已不存在");return}const url=URL.createObjectURL(stored.blob);const box=document.getElementById("viewer-content");if(file.type.startsWith("image"))box.innerHTML=`<img src="${url}" alt="${escapeHtml(r.title)}">`;else if(file.type.startsWith("video"))box.innerHTML=`<video src="${url}" controls playsinline></video>`;else if(file.type.startsWith("audio"))box.innerHTML=`<audio src="${url}" controls></audio>`;else if(file.type.includes("pdf"))box.innerHTML=`<iframe src="${url}" title="${escapeHtml(r.title)}"></iframe>`;else box.innerHTML=`<a href="${url}" download="${escapeHtml(file.name)}" style="color:white">下载文件</a>`;document.getElementById("viewer").showModal()}
function closeViewer(){document.getElementById("viewer").close();document.getElementById("viewer-content").innerHTML=""}
async function deleteRecord(id){const record=state.records.find(r=>r.id===id);if(record)for(const f of record.files||[])await dbDelete(f.id);state.records=state.records.filter(r=>r.id!==id);saveState();renderLibrary();updateStats();toast("记录已删除")}

function openDB(){return new Promise((resolve,reject)=>{const req=indexedDB.open(DB_NAME,1);req.onupgradeneeded=()=>req.result.createObjectStore(DB_STORE,{keyPath:"id"});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function saveFiles(fileList,parentId){const files=Array.from(fileList);const total=files.reduce((sum,file)=>sum+file.size,0);if(total>120*1024*1024)throw new Error("手机端建议单次上传不超过 120MB，请压缩视频后再试");const meta=[];for(const file of files){const id=`${parentId}-${newId()}`;await dbPut({id,blob:file,name:file.name,type:file.type||"application/octet-stream"});meta.push({id,name:file.name,type:file.type||"application/octet-stream",size:file.size})}return meta}
async function dbPut(value){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,"readwrite");tx.objectStore(DB_STORE).put(value);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)})}
async function dbGet(id){const db=await openDB();return new Promise((resolve,reject)=>{const req=db.transaction(DB_STORE).objectStore(DB_STORE).get(id);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
async function dbDelete(id){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(DB_STORE,"readwrite");tx.objectStore(DB_STORE).delete(id);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)})}
function toast(text){const el=document.getElementById("toast");el.textContent=text;el.classList.add("is-visible");clearTimeout(el.timer);el.timer=setTimeout(()=>el.classList.remove("is-visible"),1900)}
function escapeHtml(value){return String(value??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
