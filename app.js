const seedPosts=[
{id:1,name:"نرگس راد",handle:"narges.rad",avatar:"ن",avatarClass:"avatar-lilac",time:"۱۲ دقیقه پیش",text:"گاهی باید از شلوغیِ دنیا فاصله بگیری و به صدای آرامِ درونت گوش بدهی. جواب خیلی از سؤال‌ها همان‌جاست؛ جایی که مدت‌هاست سراغش نرفته‌ای.",tags:["آرامش","خودشناسی"],likes:128,comments:14,liked:false,saved:false,following:true},
{id:2,name:"مهتاب آذر",handle:"mahtab.az",avatar:"م",avatarClass:"avatar-peach",time:"۴۵ دقیقه پیش",text:"قرار نیست هر روز فوق‌العاده باشی؛ همین که با وجود تمام خستگی‌ها ادامه می‌دهی، خودش یک جور شجاعت است.",tags:["زندگی","حال_خوب"],likes:96,comments:8,liked:false,saved:false,following:false},
{id:3,name:"سامان نیک",handle:"saman.n",avatar:"س",avatarClass:"avatar-blue",time:"۱ ساعت پیش",text:"آدم‌ها را با لحظه‌های خوبشان به خاطر بسپار، اما برای ماندنشان فقط به خاطره‌ها تکیه نکن.",tags:["آدم‌ها","نگاه"],likes:74,comments:21,liked:true,saved:true,following:true},
{id:4,name:"رها زمانی",handle:"raha.z",avatar:"ر",avatarClass:"avatar-mint",time:"۳ ساعت پیش",text:"شاید خوشبختی همین باشد: یک پنجره‌ی باز، یک فنجان چای و خیالی که برای چند دقیقه آرام گرفته است.",tags:["خوشبختی","روزمرگی"],likes:53,comments:5,liked:false,saved:false,following:false}
];
let posts=JSON.parse(localStorage.getItem("cafePosts")||"null")||seedPosts;
let currentPage="home",currentFilter="all";
const $=s=>document.querySelector(s);
const postList=$("#postList");
const pageInfo={
home:["جایی برای حالِ خوب","گاهی یک جمله، تمام چیزی‌ست که لازم داریم.","شنبه، ۱ آذر ۱۴۰۵"],
featured:["برگزیده‌های کافه","جمله‌هایی که ارزش دوباره خواندن دارند.","انتخاب‌هایی برای مکث"],
popular:["روبورس","جمله‌هایی که این روزها بیشتر خوانده می‌شوند.","نبض کلمات در کافه"],
latest:["تازه‌های کافه","آخرین حرف‌هایی که به کافه رسیده‌اند.","همین حالا، همین‌جا"],
explore:["کشف کن، الهام بگیر","موضوع یا نویسنده‌ی مورد علاقه‌ات را پیدا کن.","دنیای کلمات منتظر توست"],
notifications:["خبرهای تازه","اتفاق‌های کوچک و قشنگ اطراف تو.","از دنیای کافه جا نمان"],
messages:["گفت‌وگوها","گاهی یک گفت‌وگوی خوب، شروع یک دوستی‌ست.","پیام‌های تو"],
profile:["صفحه‌ی شخصی من","کلماتی که از تو به‌جا مانده‌اند.","آرمان نویسنده · @arman.words"]
};
function render(){
 const info=pageInfo[currentPage]||pageInfo.home;
 $("#pageTitle").textContent=info[0];$("#pageSubtitle").textContent=info[1];$("#pageEyebrow").textContent=info[2];
 $("#welcomeBanner").style.display=["home","featured","popular","latest"].includes(currentPage)?"flex":"none";
 document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===currentPage));
 let list=[...posts];
 if(currentPage==="featured")list=list.filter(p=>p.likes>=70);
 if(currentPage==="popular")list.sort((a,b)=>b.likes-a.likes);
 if(currentPage==="latest")list.reverse();
 if(currentPage==="profile")list=list.filter(p=>p.name==="آرمان نویسنده");
 if(currentPage==="explore"){postList.innerHTML=`<div class="empty-state">⌕<b>چه چیزی ذهنت را مشغول کرده؟</b>از نوار جستجو برای پیدا کردن جمله‌ها و نویسنده‌ها استفاده کن.</div>`;return}
 if(currentPage==="notifications"){postList.innerHTML=`<div class="post-card"><div class="person"><span class="avatar avatar-peach">م</span><span><b>مهتاب آذر</b><small>جمله‌ات را پسندید · ۸ دقیقه پیش</small></span></div></div><div class="post-card"><div class="person"><span class="avatar avatar-mint">ر</span><span><b>رها زمانی</b><small>تو را دنبال کرد · ۲ ساعت پیش</small></span></div></div><div class="post-card"><div class="person"><span class="avatar avatar-blue">س</span><span><b>سامان نیک</b><small>به جمله‌ات پاسخ داد: «چه زیبا گفتی» · دیروز</small></span></div></div>`;return}
 if(currentPage==="messages"){postList.innerHTML=`<div class="post-card"><div class="person"><span class="avatar avatar-lilac">ن</span><span><b>نرگس راد</b><small>ممنون از جمله‌ی قشنگت 🌱</small></span><span class="post-time">۱۰:۴۲</span></div></div><div class="post-card"><div class="person"><span class="avatar avatar-peach">م</span><span><b>مهتاب آذر</b><small>سلام، خوشحالم که اینجایی.</small></span><span class="post-time">دیروز</span></div></div>`;return}
 if(currentFilter==="following")list=list.filter(p=>p.following);
 if(currentFilter==="saved")list=list.filter(p=>p.saved);
 postList.innerHTML=list.length?list.map(card).join(""):`<div class="empty-state">✧<b>هنوز چیزی اینجا نیست</b>وقتی جمله‌ای را ذخیره کنی، اینجا پیدایش می‌کنی.</div>`;
}
function card(p){return `<article class="post-card" data-id="${p.id}"><div class="post-head"><span class="avatar ${p.avatarClass}">${p.avatar}</span><div class="post-author"><b>${escapeHtml(p.name)}</b><small>@${escapeHtml(p.handle)} · ${p.time}</small></div><button class="more-btn" title="بیشتر">•••</button></div><p class="post-text">${escapeHtml(p.text)}</p><div class="post-tags">${p.tags.map(t=>`<span>#${escapeHtml(t)}</span>`).join("")}</div><div class="post-actions"><button class="action-btn ${p.liked?"liked":""}" data-action="like" data-id="${p.id}"><strong>♡</strong> ${p.likes}</button><button class="action-btn" data-action="comment" data-id="${p.id}"><strong>◯</strong> ${p.comments} دیدگاه</button><button class="action-btn ${p.saved?"saved":""}" data-action="save" data-id="${p.id}"><strong>♧</strong> ذخیره</button><button class="action-btn" data-action="share" data-id="${p.id}"><strong>↗</strong> اشتراک</button><span class="post-time">${p.time}</span></div></article>`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function persist(){localStorage.setItem("cafePosts",JSON.stringify(posts))}
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2300)}
function openCompose(){$("#composeModal").classList.add("show");setTimeout(()=>$("#postInput").focus(),100)}
function closeCompose(){$("#composeModal").classList.remove("show")}
document.addEventListener("click",e=>{
 const page=e.target.closest("[data-page]");if(page){currentPage=page.dataset.page;currentFilter="all";document.querySelectorAll(".feed-tab").forEach(x=>x.classList.toggle("active",x.dataset.filter==="all"));render();return}
 const action=e.target.closest("[data-action]");if(action){let a=action.dataset.action,id=Number(action.dataset.id);
 if(a==="compose"){openCompose();return}if(a==="close"){closeCompose();return}
 let p=posts.find(x=>x.id===id);if(!p)return;
 if(a==="like"){p.liked=!p.liked;p.likes+=p.liked?1:-1;persist();render()}
 if(a==="save"){p.saved=!p.saved;persist();render();toast(p.saved?"به ذخیره‌شده‌ها اضافه شد":"از ذخیره‌شده‌ها حذف شد")}
 if(a==="comment")toast("بخش دیدگاه‌ها در نسخه بعدی به گفت‌وگوی کامل متصل می‌شود.");
 if(a==="share"){navigator.clipboard?.writeText(p.text);toast("متن جمله برای اشتراک‌گذاری کپی شد.")}
 return}
 const follow=e.target.closest(".follow-btn");if(follow){follow.classList.toggle("following");follow.textContent=follow.classList.contains("following")?"دنبال می‌کنی":"دنبال‌کردن";toast("وضعیت دنبال‌کردن تغییر کرد")}
});
document.querySelectorAll(".feed-tab").forEach(b=>b.addEventListener("click",()=>{currentFilter=b.dataset.filter;document.querySelectorAll(".feed-tab").forEach(x=>x.classList.toggle("active",x===b));render()}));
$("#postInput").addEventListener("input",e=>$("#charCount").textContent=`${e.target.value.length} / ۵۰۰`);
$("#publishBtn").addEventListener("click",()=>{let text=$("#postInput").value.trim();if(text.length<3){toast("یک جمله‌ی کوتاه‌تر از این هم می‌تواند شروع خوبی باشد؛ کمی بیشتر بنویس.");return}let tag=$("#tagInput").value.trim().replace(/^#/,"");posts.unshift({id:Date.now(),name:"آرمان نویسنده",handle:"arman.words",avatar:"آ",avatarClass:"avatar-me",time:"همین حالا",text,tags:tag?[tag]:[],likes:0,comments:0,liked:false,saved:false,following:true});persist();$("#postInput").value="";$("#tagInput").value="";$("#charCount").textContent="۰ / ۵۰۰";closeCompose();currentPage="home";currentFilter="all";render();toast("جمله‌ات با موفقیت منتشر شد ✨")});
$("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light");localStorage.setItem("cafeTheme",document.body.classList.contains("light")?"light":"dark")});
if(localStorage.getItem("cafeTheme")==="light")document.body.classList.add("light");
$("#globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){let q=e.target.value.trim();if(!q)return;currentPage="home";render();let found=posts.filter(p=>(p.text+" "+p.name+" "+p.tags.join(" ")).includes(q));postList.innerHTML=found.length?found.map(card).join(""):`<div class="empty-state">نتیجه‌ای برای «${escapeHtml(q)}» پیدا نشد.</div>`;$("#pageTitle").textContent="نتایج جستجو";$("#pageSubtitle").textContent=`جستجو برای: ${q}`;}});
$("#sortBtn").addEventListener("click",()=>{posts.reverse();render();toast("ترتیب نمایش تغییر کرد.")});
$("#composeModal").addEventListener("click",e=>{if(e.target.id==="composeModal")closeCompose()});
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#globalSearch").focus()}if(e.key==="Escape")closeCompose()});
render();