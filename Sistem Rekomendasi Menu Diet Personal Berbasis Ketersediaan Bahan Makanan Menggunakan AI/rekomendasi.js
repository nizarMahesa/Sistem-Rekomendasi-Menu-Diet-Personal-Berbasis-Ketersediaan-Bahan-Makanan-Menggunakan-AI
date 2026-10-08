// ============================================
// REKOMENDASI.JS
// ============================================
var user = JSON.parse(localStorage.getItem('user'));
var bahanUser = JSON.parse(localStorage.getItem('bahanUser')) || [];
if (!user) window.location.href = 'index.html';

var showChooseBahanNotice = (bahanUser.length === 0);
var selectedCompare = [];
var currentFilter = { search:'', veg:false, kategori:'', minKal:0, maxKal:0, sort:'skor' };

var GUIDE_DATA = {
  protein: ['Dada Ayam','Telur','Ikan','Tahu','Tempe','Daging Sapi','Udang','Cumi','Edamame','Yogurt'],
  sayur:   ['Brokoli','Bayam','Pak Choy','Sawi','Selada','Kubis','Asparagus','Timun','Wortel','Tomat','Jamur','Buncis','Kangkung'],
  karbo:   ['Oatmeal','Nasi Merah','Ubi Jalar','Kentang','Quinoa','Roti Gandum','Jagung','Beras Cokelat'],
  buah:    ['Apel','Alpukat','Pir','Pisang','Melon','Semangka','Jeruk','Pepaya','Jambu','Kiwi'],
  camilan: ['Almond','Walnut','Biji Chia','Popcorn','Selai Kacang','Cokelat Hitam'],
  minuman: ['Air Putih','Teh Hijau','Kopi Hitam','Infused Water']
};

var target = user.target;
var alergiList = (user.alergi || '').toLowerCase().split(',').map(function(s){ return s.trim(); }).filter(function(s){ return s !== ''; });

// ============================================
// RENDER GUIDE
// ============================================
function renderGuidePreview(){
  var el = document.getElementById('guidePreview');
  if(!el) return;
  var out = '';
  for(var kat in GUIDE_DATA){
    out += '<b>' + kat.charAt(0).toUpperCase() + kat.slice(1) + '</b>: ' + GUIDE_DATA[kat].slice(0,5).join(', ') + '...<br>';
  }
  el.innerHTML = out;
}

// ============================================
// THUMBNAIL
// ============================================
function getMenuThumbnail(menu){
  return window.generateMenuThumbnail ? window.generateMenuThumbnail(menu) : '';
}

// ============================================
// ALGORITMA REKOMENDASI
// ============================================
function hitungRekomendasi(){
  var hasil = [];
  MENU.forEach(function(menu){
    var bahanMenuNama = menu.bahan.map(function(id){
      var b = BAHAN.find(function(x){ return x.id === id; });
      return b ? b.nama.toLowerCase() : '';
    });

    var kenaAlergi = alergiList.some(function(al){
      return bahanMenuNama.some(function(bn){ return bn.indexOf(al) !== -1; });
    });
    if(kenaAlergi) return;

    var cocok = menu.bahan.filter(function(id){ return bahanUser.indexOf(id) !== -1; }).length;
    var totalBahan = menu.bahan.length;
    var persenBahan = cocok / totalBahan;
    var skorBahan = persenBahan * 40;

    var targetPerMenu = target / 3;
    var selisih = Math.abs(menu.kalori - targetPerMenu);
    var skorKalori = Math.max(0, 30 - (selisih / 10));

    var skorGizi = Math.min(30, (menu.protein / 30) * 30);

    hasil.push({
      menu: menu,
      skor: Math.round((skorBahan + skorKalori + skorGizi) * 10) / 10,
      cocok: cocok, totalBahan: totalBahan,
      persenBahan: Math.round(persenBahan * 100)
    });
  });
  hasil.sort(function(a,b){ return b.skor - a.skor; });
  return hasil.slice(0, 10);
}

function applyFilters(list){
  var f = currentFilter;
  var out = list.filter(function(h){
    var m = h.menu;
    if(f.search && m.nama.toLowerCase().indexOf(f.search.toLowerCase()) === -1 &&
       m.deskripsi.toLowerCase().indexOf(f.search.toLowerCase()) === -1) return false;
    if(f.kategori && m.kategori !== f.kategori) return false;
    if(f.veg && !m.vegetarian) return false;
    if(f.minKal && m.kalori < f.minKal) return false;
    if(f.maxKal && m.kalori > f.maxKal) return false;
    return true;
  });
  if(f.sort === 'kalori') out.sort(function(a,b){ return a.menu.kalori - b.menu.kalori; });
  else if(f.sort === 'protein') out.sort(function(a,b){ return b.menu.protein - a.menu.protein; });
  else out.sort(function(a,b){ return b.skor - a.skor; });
  return out;
}

// ============================================
// RENDER REKOMENDASI
// ============================================
function renderRecommendations(){
  var infoEl = document.getElementById('infoRek');
  if(infoEl) infoEl.innerHTML = 'Target kalori: <span class="badge-kalori">' + target + ' kkal/hari</span> | Bahan dipilih: <b>' + bahanUser.length + '</b> item';

  var alergiEl = document.getElementById('alergiBadge');
  if(alergiEl){
    alergiEl.innerHTML = alergiList.length
      ? '<div class="alert alert-warning py-2 small">🚫 Menu mengandung <b>' + alergiList.join(', ') + '</b> disaring otomatis.</div>'
      : '';
  }

  var noticeEl = document.getElementById('rekomendasiNotice');
  if(noticeEl){
    noticeEl.innerHTML = showChooseBahanNotice
      ? '<div class="alert alert-info">Kamu belum memilih bahan. <a href="bahan.html" class="btn btn-sm btn-outline-success ms-2">Pilih Bahan</a> <button class="btn btn-sm btn-success ms-2" onclick="pilihBahanDefault()">Gunakan bahan umum</button></div>'
      : '';
  }

  var top = applyFilters(hitungRekomendasi());
  var hasilEl = document.getElementById('hasilRek');
  if(!hasilEl){ console.warn('❌ #hasilRek tidak ada'); return; }

  if(top.length === 0){
    hasilEl.innerHTML = '<div class="alert alert-warning">Tidak ada menu yang cocok. Coba pilih lebih banyak bahan.</div>';
    return;
  }

  var html = '<div class="row">';
  top.forEach(function(h){
    var m = h.menu;
    var cocokText = (bahanUser.length === 0) ? '—' : h.cocok + '/' + h.totalBahan;
    var persenText = (bahanUser.length === 0) ? '—' : h.persenBahan + '%';
    var thumb = getMenuThumbnail(m);
    var checked = selectedCompare.indexOf(m.id) !== -1 ? 'checked' : '';
    var isSaved = window.isMenuSaved(m.id);

    html += '<div class="col-md-6 mb-3">' +
      '<div class="card menu-card p-3 h-100" style="position:relative">' +
        '<div style="position:absolute;right:12px;top:12px;z-index:5">' +
          '<input type="checkbox" class="compare-check" data-id="' + m.id + '" ' + checked + ' title="Bandingkan">' +
        '</div>' +
        '<div class="d-flex gap-3 align-items-start">' +
          '<div class="menu-thumb-wrap" style="background-image:url(\'' + thumb + '\')"></div>' +
          '<div style="flex:1">' +
            '<div class="d-flex justify-content-between align-items-start">' +
              '<h5 style="margin:0">' + m.nama + '</h5>' +
              '<span class="skor">' + h.skor + '%</span>' +
            '</div>' +
            '<p class="text-muted small mb-2">' + m.deskripsi + '</p>' +
            '<div class="skor-progress"><div class="skor-bar" data-val="' + h.skor + '" style="width:0%"></div></div>' +
            '<div class="mb-2">' +
              '<span class="badge-kalori">' + m.kalori + ' kkal</span> ' +
              '<span class="badge bg-info text-dark">P: ' + m.protein + 'g</span> ' +
              '<span class="badge bg-secondary">K: ' + m.karbo + 'g</span> ' +
              '<span class="badge bg-danger">L: ' + m.lemak + 'g</span> ' +
              '<span class="badge bg-light text-dark">⏱️ ' + (m.waktu || '?') + ' mnt</span>' +
            '</div>' +
            '<p class="small mb-1">✅ Bahan tersedia: <b>' + cocokText + '</b> (' + persenText + ')</p>' +
          '</div>' +
        '</div>' +
        '<div class="d-flex gap-2 mt-3">' +
          '<a href="detail.html?id=' + m.id + '" class="btn btn-sm btn-primary ms-auto">Lihat Resep →</a>' +
          '<button class="btn btn-sm ' + (isSaved ? 'btn-secondary' : 'save-btn') + '" onclick="saveMenuDanRefresh(' + m.id + ', \'' + m.nama.replace(/'/g, "\\'") + '\')" ' + (isSaved ? 'disabled' : '') + '>' +
            (isSaved ? '✓ Tersimpan' : 'Simpan') +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  });
  html += '</div>';
  hasilEl.innerHTML = html;

  // Animate progress
  setTimeout(function(){
    document.querySelectorAll('.skor-bar').forEach(function(bar){
      bar.style.width = bar.getAttribute('data-val') + '%';
    });
  }, 100);

  // Compare checkbox handler
  hasilEl.querySelectorAll('.compare-check').forEach(function(ch){
    ch.addEventListener('change', function(e){
      var id = parseInt(e.target.getAttribute('data-id'));
      if(e.target.checked){
        if(selectedCompare.indexOf(id) === -1) selectedCompare.push(id);
        if(selectedCompare.length > 3) selectedCompare.shift();
      } else {
        selectedCompare = selectedCompare.filter(function(x){ return x !== id; });
      }
    });
  });
}

// ============================================
// SAVE MENU (dipanggil dari onclick)
// ============================================
function saveMenuDanRefresh(id, name){
  window.saveMenu(id, name);
  renderRecommendations();
}
window.saveMenuDanRefresh = saveMenuDanRefresh;

// ============================================
// QUICK ADD
// ============================================
function pilihBahanDefault(){
  bahanUser = [1, 7, 13, 19];
  localStorage.setItem('bahanUser', JSON.stringify(bahanUser));
  showChooseBahanNotice = false;
  renderRecommendations();
}
window.pilihBahanDefault = pilihBahanDefault;

function addAvailableFromGuide(){
  var foundIds = {};
  bahanUser.forEach(function(id){ foundIds[id] = true; });
  var allKeys = [];
  for(var k in GUIDE_DATA){ allKeys = allKeys.concat(GUIDE_DATA[k]); }
  var lowerNames = allKeys.map(function(s){ return s.toLowerCase(); });
  BAHAN.forEach(function(b){
    var name = b.nama.toLowerCase();
    for(var i=0; i<lowerNames.length; i++){
      var key = lowerNames[i];
      if(key.length < 3) continue;
      if(name.indexOf(key) !== -1 || key.indexOf(name) !== -1){
        foundIds[b.id] = true;
        break;
      }
    }
  });
  bahanUser = Object.keys(foundIds).map(function(x){ return parseInt(x); }).sort(function(a,b){ return a-b; });
  localStorage.setItem('bahanUser', JSON.stringify(bahanUser));
  showChooseBahanNotice = false;
  renderRecommendations();
  window.showToast('Bahan ditambahkan dari panduan', 'success', 1600);
}
window.addAvailableFromGuide = addAvailableFromGuide;

function addProteinCommon(){
  var proteinKeys = ['dada ayam','telur','ikan','tahu','tempe','ayam'];
  var found = {};
  bahanUser.forEach(function(id){ found[id] = true; });
  BAHAN.forEach(function(b){
    var name = b.nama.toLowerCase();
    for(var i=0; i<proteinKeys.length; i++){
      if(name.indexOf(proteinKeys[i]) !== -1){ found[b.id] = true; break; }
    }
  });
  bahanUser = Object.keys(found).map(function(x){ return parseInt(x); });
  localStorage.setItem('bahanUser', JSON.stringify(bahanUser));
  showChooseBahanNotice = false;
  renderRecommendations();
  window.showToast('Sumber protein ditambahkan', 'success', 1600);
}
window.addProteinCommon = addProteinCommon;

// ============================================
// PLAN MODAL
// ============================================
function openPlanModal(){
  var plan = JSON.parse(localStorage.getItem('mealPlan')) || [];
  var container = document.getElementById('planList');
  if(!container) return;

  if(plan.length === 0){
    container.innerHTML = '<div class="text-muted small">Belum ada menu disimpan.</div>';
  } else {
    var out = '';
    plan.forEach(function(p){
      var m = MENU.find(function(x){ return x.id === p.id; });
      if(m){
        out += '<div class="plan-item">' +
          '<img src="' + getMenuThumbnail(m) + '" class="plan-thumb" alt="thumb">' +
          '<div class="meta"><b>' + m.nama + '</b><div class="text-muted small">' + m.deskripsi + '</div></div>' +
          '<button class="btn btn-sm btn-outline-danger" onclick="removeFromPlan(' + m.id + ')">Hapus</button>' +
          '</div>';
      }
    });
    container.innerHTML = out;
  }
  var modalEl = document.getElementById('planModal');
  if(modalEl && window.bootstrap){
    new bootstrap.Modal(modalEl).show();
  }
}
window.openPlanModal = openPlanModal;

function removeFromPlan(id){
  var plan = JSON.parse(localStorage.getItem('mealPlan')) || [];
  plan = plan.filter(function(p){ return p.id !== id; });
  localStorage.setItem('mealPlan', JSON.stringify(plan));
  openPlanModal();
  renderRecommendations();
}
window.removeFromPlan = removeFromPlan;

// ============================================
// EXPORT & PRINT
// ============================================
function exportPlanJSON(){
  var plan = JSON.parse(localStorage.getItem('mealPlan')) || [];
  var data = plan.map(function(p){ return { id:p.id, name:p.name }; });
  var blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = 'rencana-makanan.json'; a.click();
  URL.revokeObjectURL(url);
  window.showToast('Export JSON berhasil', 'success', 1600);
}
window.exportPlanJSON = exportPlanJSON;

function exportPlanCSV(){
  var plan = JSON.parse(localStorage.getItem('mealPlan')) || [];
  if(plan.length === 0){ window.showToast('Rencana kosong.', 'info', 1200); return; }
  var rows = [['id','nama']];
  plan.forEach(function(p){ rows.push([p.id, '"' + p.name.replace(/"/g,'""') + '"']); });
  var csv = rows.map(function(r){ return r.join(','); }).join('\n');
  var blob = new Blob([csv], { type:'text/csv' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = 'rencana-makanan.csv'; a.click();
  URL.revokeObjectURL(url);
  window.showToast('Export CSV berhasil', 'success', 1600);
}
window.exportPlanCSV = exportPlanCSV;

function printPlan(){
  var plan = JSON.parse(localStorage.getItem('mealPlan')) || [];
  var w = window.open('', '_blank');
  var html = '<!doctype html><html><head><title>Rencana Makanan</title>' +
    '<style>body{font-family:sans-serif;padding:20px} li{margin-bottom:6px}</style></head><body>' +
    '<h2>Rencana Makanan</h2><ul>';
  plan.forEach(function(p){
    var m = MENU.find(function(x){ return x.id === p.id; });
    html += '<li><strong>' + (m ? m.nama : p.name) + '</strong>' + (m ? ' - ' + m.kalori + ' kkal' : '') + '</li>';
  });
  html += '</ul><script>window.print();<\/script></body></html>';
  w.document.open(); w.document.write(html); w.document.close();
}
window.printPlan = printPlan;

// ============================================
// COMPARE
// ============================================
function openCompareModal(){
  var area = document.getElementById('compareArea');
  if(!area) return;
  if(selectedCompare.length === 0){
    window.showToast('Pilih minimal 1 menu untuk dibandingkan.', 'info', 1400);
    return;
  }
  var out = '';
  var colSize = Math.floor(12 / Math.min(3, selectedCompare.length));
  selectedCompare.slice(0,3).forEach(function(id){
    var m = MENU.find(function(x){ return x.id === id; });
    if(m){
      out += '<div class="col-md-' + colSize + ' mb-3">' +
        '<div class="card p-3 h-100">' +
          '<div class="menu-thumb-wrap mb-2" style="background-image:url(\'' + getMenuThumbnail(m) + '\')"></div>' +
          '<h5>' + m.nama + '</h5>' +
          '<p class="small text-muted">' + m.deskripsi + '</p>' +
          '<ul class="small">' +
            '<li>Kalori: ' + m.kalori + ' kkal</li>' +
            '<li>Protein: ' + m.protein + ' g</li>' +
            '<li>Karbo: ' + m.karbo + ' g</li>' +
            '<li>Lemak: ' + m.lemak + ' g</li>' +
            '<li>Waktu: ' + (m.waktu || '?') + ' menit</li>' +
          '</ul>' +
        '</div>' +
      '</div>';
    }
  });
  area.innerHTML = out;
  if(window.bootstrap){
    new bootstrap.Modal(document.getElementById('compareModal')).show();
  }
}
window.openCompareModal = openCompareModal;

// ============================================
// RANDOM MENU
// ============================================
function randomMenu(){
  var menu = MENU[Math.floor(Math.random() * MENU.length)];
  window.showToast('🎲 Coba: ' + menu.nama, 'info', 2000);
  setTimeout(function(){ window.location.href = 'detail.html?id=' + menu.id; }, 700);
}
window.randomMenu = randomMenu;

// ============================================
// FILTER ACTIONS
// ============================================
function applyFilterAction(){
  var searchEl = document.getElementById('filterSearch');
  var vegEl = document.getElementById('filterVeg');
  var katEl = document.getElementById('filterKategori');
  var minEl = document.getElementById('minKal');
  var maxEl = document.getElementById('maxKal');
  var sortEl = document.getElementById('sortBy');

  currentFilter.search = searchEl ? (searchEl.value || '') : '';
  currentFilter.veg = vegEl ? vegEl.checked : false;
  currentFilter.kategori = katEl ? (katEl.value || '') : '';
  currentFilter.minKal = minEl ? (parseInt(minEl.value || 0, 10) || 0) : 0;
  currentFilter.maxKal = maxEl ? (parseInt(maxEl.value || 0, 10) || 0) : 0;
  currentFilter.sort = sortEl ? (sortEl.value || 'skor') : 'skor';
  renderRecommendations();
}
window.applyFilterAction = applyFilterAction;

function clearFilterAction(){
  var s = document.getElementById('filterSearch'); if(s) s.value = '';
  var v = document.getElementById('filterVeg'); if(v) v.checked = false;
  var k = document.getElementById('filterKategori'); if(k) k.value = '';
  var mi = document.getElementById('minKal'); if(mi) mi.value = '';
  var ma = document.getElementById('maxKal'); if(ma) ma.value = '';
  var so = document.getElementById('sortBy'); if(so) so.value = 'skor';
  currentFilter = { search:'', veg:false, kategori:'', minKal:0, maxKal:0, sort:'skor' };
  renderRecommendations();
}
window.clearFilterAction = clearFilterAction;

function clearAllPlan(){
  localStorage.removeItem('mealPlan');
  openPlanModal();
  renderRecommendations();
}
window.clearAllPlan = clearAllPlan;

// ============================================
// INIT — Jalan otomatis saat DOM siap
// ============================================
function initRekomendasi(){
  console.log('🚀 Init rekomendasi...');
  renderGuidePreview();

  // Render ulang saat window load juga (jaga-jaga)
  renderRecommendations();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRekomendasi);
} else {
  initRekomendasi();
}

window.addEventListener('load', function(){
  setTimeout(function(){
    var el = document.getElementById('hasilRek');
    if(el && el.innerHTML.trim() === ''){
      console.log('🔥 Fallback render di window load');
      renderRecommendations();
    }
  }, 300);
});