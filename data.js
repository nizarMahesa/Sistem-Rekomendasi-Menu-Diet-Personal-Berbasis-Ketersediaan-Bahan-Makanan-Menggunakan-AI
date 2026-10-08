// ============================================
// DATA BAHAN
// ============================================
const BAHAN = [
  { id: 1,  nama: "Telur",             kategori: "protein", kalori: 155, protein: 13,   karbo: 1.1, lemak: 11 },
  { id: 2,  nama: "Ayam Dada",         kategori: "protein", kalori: 165, protein: 31,   karbo: 0,   lemak: 3.6 },
  { id: 3,  nama: "Tahu",              kategori: "protein", kalori: 76,  protein: 8,    karbo: 1.9, lemak: 4.8 },
  { id: 4,  nama: "Tempe",             kategori: "protein", kalori: 193, protein: 19,   karbo: 9,   lemak: 11 },
  { id: 5,  nama: "Ikan Salmon",       kategori: "protein", kalori: 208, protein: 20,   karbo: 0,   lemak: 13 },
  { id: 6,  nama: "Daging Sapi",       kategori: "protein", kalori: 250, protein: 26,   karbo: 0,   lemak: 15 },
  { id: 7,  nama: "Beras Merah",       kategori: "karbo",   kalori: 111, protein: 2.6,  karbo: 23,  lemak: 0.9 },
  { id: 8,  nama: "Beras Putih",       kategori: "karbo",   kalori: 130, protein: 2.7,  karbo: 28,  lemak: 0.3 },
  { id: 9,  nama: "Oat",               kategori: "karbo",   kalori: 389, protein: 16.9, karbo: 66,  lemak: 6.9 },
  { id: 10, nama: "Roti Gandum",       kategori: "karbo",   kalori: 247, protein: 13,   karbo: 41,  lemak: 4.2 },
  { id: 11, nama: "Kentang",           kategori: "karbo",   kalori: 77,  protein: 2,    karbo: 17,  lemak: 0.1 },
  { id: 12, nama: "Jagung",            kategori: "karbo",   kalori: 86,  protein: 3.2,  karbo: 19,  lemak: 1.2 },
  { id: 13, nama: "Bayam",             kategori: "sayur",   kalori: 23,  protein: 2.9,  karbo: 3.6, lemak: 0.4 },
  { id: 14, nama: "Brokoli",           kategori: "sayur",   kalori: 34,  protein: 2.8,  karbo: 7,   lemak: 0.4 },
  { id: 15, nama: "Wortel",            kategori: "sayur",   kalori: 41,  protein: 0.9,  karbo: 10,  lemak: 0.2 },
  { id: 16, nama: "Tomat",             kategori: "sayur",   kalori: 18,  protein: 0.9,  karbo: 3.9, lemak: 0.2 },
  { id: 17, nama: "Kangkung",          kategori: "sayur",   kalori: 19,  protein: 3.4,  karbo: 3.1, lemak: 0.2 },
  { id: 18, nama: "Buncis",            kategori: "sayur",   kalori: 31,  protein: 1.8,  karbo: 7,   lemak: 0.1 },
  { id: 19, nama: "Pisang",            kategori: "buah",    kalori: 89,  protein: 1.1,  karbo: 23,  lemak: 0.3 },
  { id: 20, nama: "Apel",              kategori: "buah",    kalori: 52,  protein: 0.3,  karbo: 14,  lemak: 0.2 },
  { id: 21, nama: "Alpukat",           kategori: "buah",    kalori: 160, protein: 2,    karbo: 9,   lemak: 15 },
  { id: 22, nama: "Jeruk",             kategori: "buah",    kalori: 47,  protein: 0.9,  karbo: 12,  lemak: 0.1 },
  { id: 23, nama: "Susu Rendah Lemak", kategori: "lain",    kalori: 42,  protein: 3.4,  karbo: 5,   lemak: 1 },
  { id: 24, nama: "Minyak Zaitun",     kategori: "lain",    kalori: 884, protein: 0,    karbo: 0,   lemak: 100 },
  { id: 25, nama: "Bawang Merah",      kategori: "lain",    kalori: 40,  protein: 1.1,  karbo: 9,   lemak: 0.1 },
  { id: 26, nama: "Bawang Putih",      kategori: "lain",    kalori: 149, protein: 6.4,  karbo: 33,  lemak: 0.5 }
];

// ============================================
// DATA MENU
// ============================================
const MENU = [
  { id: 1, nama: "Tumis Tahu Bayam + Nasi Merah", deskripsi: "Menu seimbang protein nabati dan sayur hijau", kalori: 420, protein: 18, karbo: 55, lemak: 14, kategori: "makan_siang", vegetarian: true, waktu: 15, caraMasak: "1. Tumis bawang hingga harum\n2. Masukkan tahu, aduk rata\n3. Tambah bayam, masak sebentar\n4. Sajikan dengan nasi merah.", bahan: [3, 13, 25, 7], image: 'https://picsum.photos/seed/menu1/600/400' },
  { id: 2, nama: "Omelet Sayur + Roti Gandum", deskripsi: "Sarapan tinggi protein dan serat", kalori: 380, protein: 20, karbo: 40, lemak: 12, kategori: "sarapan", vegetarian: true, waktu: 10, caraMasak: "1. Kocok telur\n2. Tambah tomat & wortel cincang\n3. Dadar hingga matang\n4. Sajikan dengan roti gandum.", bahan: [1, 16, 15, 10], image: 'https://picsum.photos/seed/menu2/600/400' },
  { id: 3, nama: "Sup Ayam Jagung Wortel", deskripsi: "Sup hangat rendah kalori", kalori: 280, protein: 25, karbo: 30, lemak: 6, kategori: "makan_malam", vegetarian: false, waktu: 30, caraMasak: "1. Rebus ayam hingga empuk\n2. Tambah jagung & wortel\n3. Bumbui garam & merica\n4. Sajikan hangat.", bahan: [2, 12, 15, 26], image: 'https://picsum.photos/seed/menu3/600/400' },
  { id: 4, nama: "Smoothie Pisang Oat", deskripsi: "Snack sehat tinggi serat", kalori: 250, protein: 8, karbo: 45, lemak: 5, kategori: "snack", vegetarian: true, waktu: 5, caraMasak: "1. Blender pisang + oat + susu\n2. Tambah es batu\n3. Sajikan dingin.", bahan: [19, 9, 23], image: 'https://picsum.photos/seed/menu4/600/400' },
  { id: 5, nama: "Nasi Merah + Tempe Bacem + Kangkung", deskripsi: "Menu tradisional sehat", kalori: 450, protein: 22, karbo: 60, lemak: 12, kategori: "makan_siang", vegetarian: true, waktu: 25, caraMasak: "1. Bacem tempe dengan kecap\n2. Tumis kangkung dengan bawang\n3. Sajikan dengan nasi merah.", bahan: [7, 4, 17, 26], image: 'https://picsum.photos/seed/menu5/600/400' },
  { id: 6, nama: "Salad Alpukat Telur", deskripsi: "Salad segar tinggi lemak sehat", kalori: 320, protein: 15, karbo: 15, lemak: 22, kategori: "sarapan", vegetarian: true, waktu: 10, caraMasak: "1. Potong alpukat & telur rebus\n2. Tambah tomat\n3. Beri minyak zaitun & garam.", bahan: [21, 1, 16, 24], image: 'https://picsum.photos/seed/menu6/600/400' },
  { id: 7, nama: "Ayam Panggang Brokoli", deskripsi: "Menu tinggi protein rendah karbo", kalori: 380, protein: 40, karbo: 12, lemak: 18, kategori: "makan_malam", vegetarian: false, waktu: 25, caraMasak: "1. Marinasi ayam dengan bawang\n2. Panggang 20 menit\n3. Kukus brokoli\n4. Sajikan.", bahan: [2, 14, 24], image: 'https://picsum.photos/seed/menu7/600/400' },
  { id: 8, nama: "Sup Ikan Salmon Tomat", deskripsi: "Menu omega-3 untuk kesehatan jantung", kalori: 350, protein: 30, karbo: 12, lemak: 20, kategori: "makan_malam", vegetarian: false, waktu: 20, caraMasak: "1. Tumis tomat & bawang\n2. Tambah air, didihkan\n3. Masukkan salmon\n4. Sajikan hangat.", bahan: [5, 16, 25], image: 'https://picsum.photos/seed/menu8/600/400' },
  { id: 9, nama: "Kentang Rebus + Telur + Buncis", deskripsi: "Menu simpel kaya protein", kalori: 340, protein: 18, karbo: 40, lemak: 10, kategori: "makan_siang", vegetarian: true, waktu: 20, caraMasak: "1. Rebus kentang 15 menit\n2. Rebus telur 8 menit\n3. Tumis buncis\n4. Sajikan.", bahan: [11, 1, 18], image: 'https://picsum.photos/seed/menu9/600/400' },
  { id: 10, nama: "Oatmeal Pisang Alpukat", deskripsi: "Sarapan energi tinggi", kalori: 400, protein: 12, karbo: 55, lemak: 15, kategori: "sarapan", vegetarian: true, waktu: 7, caraMasak: "1. Seduh oat dengan susu panas\n2. Tambah irisan pisang & alpukat\n3. Sajikan.", bahan: [9, 19, 21], image: 'https://picsum.photos/seed/menu10/600/400' }
];

// ============================================
// UTILITY FUNCTIONS (SEMUA DI SINI — ANTI ERROR)
// ============================================

// Toast
window.showToast = function(msg, type, duration){
  type = type || 'info';
  duration = duration || 1800;
  var colors = { success:'text-bg-success', info:'text-bg-primary', warning:'text-bg-warning', danger:'text-bg-danger' };
  var t = document.createElement('div');
  t.className = 'toast align-items-center ' + (colors[type]||colors.info) + ' border-0 show';
  t.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;min-width:220px;box-shadow:0 8px 24px rgba(0,0,0,0.15);border-radius:8px';
  t.innerHTML = '<div class="d-flex"><div class="toast-body">' + msg + '</div><button type="button" class="btn-close btn-close-white me-2 m-auto" onclick="this.closest(\'.toast\').remove()"></button></div>';
  document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, duration);
};

// Confetti
window.showConfetti = function(x, y, count){
  count = count || 20;
  var colors = ['#ffd966','#0d6efd','#ff6b6b','#4da6ff','#b6e3a5'];
  for(var i=0; i<count; i++){
    var p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    document.body.appendChild(p);
    var angle = Math.random()*Math.PI*2;
    var dist = 80 + Math.random()*120;
    var tx = Math.cos(angle)*dist;
    var ty = Math.sin(angle)*dist;
    p.animate([
      { transform:'translate(0,0) rotate(0deg)', opacity:1 },
      { transform:'translate('+tx+'px,'+ty+'px) rotate('+(Math.random()*720)+'deg)', opacity:0 }
    ], { duration: 1000+Math.random()*500, easing:'cubic-bezier(.2,.7,.3,1)' });
    setTimeout((function(el){ return function(){ el.remove(); }; })(p), 1600);
  }
};

// Generate Thumbnail SVG
window.generateMenuThumbnail = function(menu){
  var first = menu.bahan && menu.bahan.length ? BAHAN.find(function(b){ return b.id === menu.bahan[0]; }) : null;
  var kat = first ? first.kategori : 'lain';
  var colors = {
    protein: ['#ffb3b3','#ff6b6b'],
    karbo:   ['#ffe08a','#ffb703'],
    sayur:   ['#b6e3a5','#4caf50'],
    buah:    ['#f7b7ff','#c77dff'],
    lain:    ['#cfcfcf','#9e9e9e']
  };
  var pair = colors[kat] || colors.lain;
  var c1 = pair[0], c2 = pair[1];
  var label = menu.nama.substring(0, 14).replace(/[<>&"']/g, '');
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="72">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0%" stop-color="' + c1 + '"/>' +
    '<stop offset="100%" stop-color="' + c2 + '"/>' +
    '</linearGradient></defs>' +
    '<rect width="96" height="72" fill="url(#g)"/>' +
    '<text x="48" y="42" font-family="sans-serif" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">' + label + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
};

// Save Menu
window.saveMenu = function(menuId, menuName){
  try {
    var plan = JSON.parse(localStorage.getItem('mealPlan')) || [];
    if(!plan.find(function(p){ return p.id === menuId; })){
      plan.push({ id: menuId, name: menuName, addedAt: Date.now() });
      localStorage.setItem('mealPlan', JSON.stringify(plan));
      window.showConfetti(window.innerWidth * 0.7, window.innerHeight * 0.2, 20);
      window.showToast('Disimpan ke Rencana Makanan ✓', 'success', 2000);
    } else {
      window.showToast('Menu sudah ada di rencana.', 'info', 1600);
    }
  } catch(err){
    console.error(err);
    window.showToast('Gagal menyimpan.', 'danger', 1800);
  }
};

// Cek Menu Tersimpan
window.isMenuSaved = function(menuId){
  var plan = JSON.parse(localStorage.getItem('mealPlan')) || [];
  return plan.some(function(p){ return p.id === menuId; });
};

// Logout
window.logout = function(){
  var keepDark = localStorage.getItem('darkMode');
  localStorage.clear();
  if(keepDark) localStorage.setItem('darkMode', keepDark);
  window.location.href = 'index.html';
};

// Ripple Effect
document.addEventListener('click', function(e){
  var btn = e.target.closest('.btn');
  if(!btn) return;
  var r = document.createElement('span');
  var rect = btn.getBoundingClientRect();
  r.style.cssText = 'position:absolute;border-radius:50%;transform:scale(0);background:rgba(255,255,255,0.5);pointer-events:none;left:' + (e.clientX-rect.left) + 'px;top:' + (e.clientY-rect.top) + 'px;width:10px;height:10px;';
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(r);
  r.animate([
    { transform:'scale(0)', opacity:0.6 },
    { transform:'scale(15)', opacity:0 }
  ], { duration:600 });
  setTimeout(function(){ r.remove(); }, 600);
});