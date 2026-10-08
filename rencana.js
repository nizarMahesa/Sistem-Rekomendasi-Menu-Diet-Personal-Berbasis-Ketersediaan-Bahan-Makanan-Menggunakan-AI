// Simple 7-day planner using saved mealPlan and MENU
const currentUser = JSON.parse(localStorage.getItem('user')) || null;
if(!currentUser){ window.location.href='index.html'; }

function getSavedPlan(){ return JSON.parse(localStorage.getItem('weeklyPlan')) || null; }
function saveWeekly(plan){ localStorage.setItem('weeklyPlan', JSON.stringify(plan)); }

function generateWeeklyPlan(){
  const saved = JSON.parse(localStorage.getItem('mealPlan')) || [];
  const pool = saved.map(p=> MENU.find(m=>m.id===p.id)).filter(Boolean);
  // fill with top popular if not enough
  const top = MENU.slice(0,20);
  const week = [];
  for(let i=0;i<7;i++){
    const item = pool[i] || top[i%top.length];
    week.push({day: i+1, menuId: item.id});
  }
  saveWeekly(week);
  renderPlan();
}

function clearWeekly(){ localStorage.removeItem('weeklyPlan'); renderPlan(); }

function renderPlan(){
  const container = document.getElementById('planArea');
  const week = getSavedPlan();
  if(!week || week.length===0){
    container.innerHTML = '<div class="text-center py-5"><img src="assets/placeholder.svg" style="width:180px;opacity:.9" alt="kosong"><p class="mt-3 text-muted">Belum ada rencana. Klik "Buat Rencana Otomatis" untuk memulai.</p></div>';
    return;
  }
  let out = '<div class="row">';
  const targetPerDay = Math.round(currentUser.target || 2000);
  week.forEach(w=>{
    const m = MENU.find(x=>x.id===w.menuId);
    const kal = m ? m.kalori : 0;
    const percent = Math.min(100, Math.round((kal/targetPerDay)*100));
    out += `
      <div class="col-md-6 col-lg-4 mb-3">
        <div class="card p-3">
          <div class="d-flex justify-content-between align-items-start">
            <h6>Hari ${w.day}</h6>
            <span class="small text-muted">${kal} kkal</span>
          </div>
          <div class="d-flex gap-3 align-items-center mt-2">
            <div class="menu-thumb-wrap" style="background-image:url('${(m? (window.generateMenuThumbnail?window.generateMenuThumbnail(m):'assets/placeholder.svg') : 'assets/placeholder.svg')}')"></div>
            <div style="flex:1">
              <b>${m?m.nama:'- kosong -'}</b>
              <p class="small text-muted mb-2">${m?m.deskripsi:''}</p>
              <div class="progress" style="height:8px">
                <div class="progress-bar" role="progressbar" style="width:${percent}%"></div>
              </div>
              <div class="small text-muted mt-1">Progress kalori: ${percent}% dari target harian</div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  out += '</div>';
  container.innerHTML = out;
}

// init
document.addEventListener('DOMContentLoaded', ()=>{
  const gen = document.getElementById('genPlanBtn');
  const clr = document.getElementById('clearPlanBtn');
  if(gen) gen.addEventListener('click', ()=>{ generateWeeklyPlan(); if(window.showToast) window.showToast('Rencana 7 hari dibuat.', 'success',1200); });
  if(clr) clr.addEventListener('click', ()=>{ clearWeekly(); if(window.showToast) window.showToast('Rencana dihapus.', 'info',1000); });
  renderPlan();
});