'use strict';
// {Sib}Код · Воуки · client-only reasoning demonstration; synthetic, deterministic events.
const $=(s)=>document.querySelector(s), $$=(s)=>Array.from(document.querySelectorAll(s));
const stories={
 visitor:{userLabel:'ДЛЯ ГОСТЯ',label:'ПОСЕТИТЕЛЬ / ЕГО ЗАДАЧА',quote:'«Я зашёл за туалетной бумагой. Зачем мне реклама ещё пяти магазинов?»',answer:'Иногда лучшая рекомендация — тишина.',desc:'Одна покупка туалетной бумаги ещё ничего не говорит об интересах человека. Нет убедительного повода — нет сообщения.',user:'Полезные предложения вместо потока случайных акций.',tag:'ПРОВЕРКА ИНТЕРЕСА',time:'01 / 03',icon:'◌',title:'Рекомендация не сформирована',card:'Есть только одна бытовая покупка. Убедительных оснований для предложения пока нет.',foot:'Ноль лишних сообщений — тоже результат',hint:'Отсутствие покупки ещё не означает, что человек не заходил в магазин.'},
 tenant:{userLabel:'ДЛЯ АРЕНДАТОРА',label:'АРЕНДАТОР / ЕГО ЗАДАЧА',quote:'«Почему я должен отдавать свою базу потенциальным конкурентам?»',answer:'Новые клиенты — без передачи базы соседям.',desc:'Кафе и детский центр дополняют друг друга. Платформа помогает приглашать подходящих гостей в соседние точки, не открывая партнёрам контакты и историю покупок.',user:'Новые посетители при сохранении контроля над клиентскими данными.',tag:'ПАРТНЁРСКАЯ КАМПАНИЯ',time:'02 / 03',icon:'⇄',title:'Новая аудитория без обмена базами',card:'Кафе и детский центр могут пригласить заинтересованных гостей друг к другу через маркетинг ТЦ.',foot:'Партнёр получает кампанию, а не чужую базу',hint:'Сотрудничество ценно, когда каждый арендатор видит собственную выгоду.'},
 manager:{userLabel:'ДЛЯ ТОРГОВОГО ЦЕНТРА',label:'УПРАВЛЯЮЩАЯ КОМПАНИЯ / ЕЁ ЗАДАЧА',quote:'«У каждого арендатора есть клиенты. Почему у ТЦ нет общей картины?»',answer:'От отдельных точек — к общему маршруту гостя.',desc:'События разных арендаторов складываются в единую историю. Маркетолог видит, кому и зачем предложить новое место, и оценивает результат кампании.',user:'Общая картина интересов гостей и кампании с измеримым результатом.',tag:'ОБЩИЙ ПРОФИЛЬ',time:'03 / 03',icon:'◈',title:'История гостя → подходящее место',card:'Визиты, покупки и бронирования помогают пригласить гостя в новое для него место.',foot:'Общий эффект вместо разрозненных рассылок',hint:'Результат оцениваем по отклику и действиям у новых арендаторов.'}
};
function activateTab(button, selector, prop, callback){
  const buttons=$$(selector);const i=buttons.indexOf(button);if(i<0)return;
  buttons.forEach((b,j)=>{const chosen=i===j;b.classList.toggle('active',chosen);b.setAttribute('aria-selected',String(chosen));b.tabIndex=chosen?0:-1;});
  callback(button.dataset[prop]);
}
function story(key){const s=stories[key];if(!s)return;const bindings={storyUserLabel:s.userLabel,storyLabel:s.label,storyQuote:s.quote,storyAnswer:s.answer,storyDesc:s.desc,storyUser:s.user,storyCardTag:s.tag,storyCardTime:s.time,storyCardIcon:s.icon,storyCardTitle:s.title,storyCardDesc:s.card,storyCardFooter:s.foot,storyFoot:s.hint};for(const [id,v] of Object.entries(bindings))$('#'+id).textContent=v;$('#story-panel').setAttribute('aria-labelledby','tab-'+key)}
$$('.story-tab').forEach(b=>b.addEventListener('click',()=>activateTab(b,'.story-tab','story',story)));
function arrowTabs(selector,prop,cb){$$(selector).forEach(b=>b.addEventListener('keydown',e=>{const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'];if(!keys.includes(e.key))return;e.preventDefault();const all=$$(selector),index=all.indexOf(b);const dest=e.key==='Home'?0:e.key==='End'?all.length-1:(index+(e.key==='ArrowLeft'||e.key==='ArrowUp'?-1:1)+all.length)%all.length;all[dest].focus();activateTab(all[dest],selector,prop,cb)}))}
arrowTabs('.story-tab','story',story);
// The section outline is declared once in the HTML links.
const chapterLinks=$$('.chapter-link');
const chapters=chapterLinks.map(link=>({id:link.dataset.chapter,question:link.dataset.question}));
$$('.chapter-link');
const currentQuestion=$('#chapterQuestion'),currentCounter=$('#chapterCounter');
const header=$('#siteHeader');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let activeChapter=0,chapterSwapTimer=null,chapterFrame=0;
function updateHeaderHeight(){
 document.documentElement.style.setProperty('--sticky-header',header.offsetHeight+'px');
}
function setChapter(index){
 if(index===activeChapter)return;
 activeChapter=index;
 chapterLinks.forEach((link,i)=>{
  const isActive=i===index;
  link.classList.toggle('is-current',isActive);
  if(isActive)link.setAttribute('aria-current','location');
  else link.removeAttribute('aria-current');
 });
 currentCounter.textContent=String(index+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0');
 clearTimeout(chapterSwapTimer);
 if(reducedMotion.matches){currentQuestion.classList.remove('is-swapping');currentQuestion.textContent=chapters[index].question;return;}
 currentQuestion.classList.add('is-swapping');
 chapterSwapTimer=setTimeout(()=>{
  currentQuestion.textContent=chapters[activeChapter].question;
  currentQuestion.classList.remove('is-swapping');
 },145);
}
function updateReadingPosition(){
 const viewportHeight=window.innerHeight||document.documentElement.clientHeight;
 const totalScrollable=Math.max(0,document.documentElement.scrollHeight-viewportHeight);
 const scrollTop=window.scrollY||document.documentElement.scrollTop||0;
 $('#scrollProgress').style.width=(totalScrollable?Math.min(100,Math.max(0,scrollTop/totalScrollable*100)):0)+'%';

 // Change chapter at the middle of the actual readable viewport, not when
 // the next section happens to touch the sticky header. This works equally
 // when scrolling up or down and for sections of different heights.
 const headerBottom=Math.max(0,Math.min(viewportHeight,header.getBoundingClientRect().bottom));
 const readingLine=headerBottom+(viewportHeight-headerBottom)*0.50;
 let next=0;
 for(let i=1;i<chapters.length;i++){
  const el=document.getElementById(chapters[i].id);
  if(el&&el.getBoundingClientRect().top<=readingLine)next=i;
  else break;
 }
 setChapter(next);
}
function scheduleReadingUpdate(){
 if(chapterFrame)return;
 chapterFrame=requestAnimationFrame(()=>{chapterFrame=0;updateReadingPosition()});
}
// Window scroll is primary; capture phase also catches nested scrolling on
// browsers or embedded document viewers where scrolling isn't on window.
window.addEventListener('scroll',scheduleReadingUpdate,{passive:true});
document.addEventListener('scroll',scheduleReadingUpdate,{passive:true,capture:true});
window.addEventListener('resize',()=>{updateHeaderHeight();scheduleReadingUpdate()},{passive:true});
window.addEventListener('pageshow',scheduleReadingUpdate);
window.addEventListener('hashchange',scheduleReadingUpdate);
if('ResizeObserver' in window){
 const resizeObserver=new ResizeObserver(()=>{updateHeaderHeight();scheduleReadingUpdate()});
 resizeObserver.observe(header);
}
// The active state always follows the visible content. Clicking a chapter
// uses the native anchor scroll; we don't prematurely override its state.
updateHeaderHeight();
scheduleReadingUpdate();
window.addEventListener('load',scheduleReadingUpdate,{once:true});
window.VOUKI={story,setChapter};
