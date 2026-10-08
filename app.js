// ============ DARK MODE ============
function applyDarkMode(enabled){
  if(enabled){
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('darkMode','1');
  } else {
    document.documentElement.classList.remove('dark-mode');
    localStorage.removeItem('darkMode');
  }
}

document.addEventListener('DOMContentLoaded', function(){
  if(localStorage.getItem('darkMode')) applyDarkMode(true);

  // Dark toggle
  const darkToggle = document.getElementById('darkToggle');
  if(darkToggle){
    darkToggle.setAttribute('aria-pressed', String(!!localStorage.getItem('darkMode')));
    darkToggle.textContent = localStorage.getItem('darkMode') ? '☀️' : '🌙';
    darkToggle.addEventListener('click', () => {
      const on = !document.documentElement.classList.contains('dark-mode');
      applyDarkMode(on);
      darkToggle.setAttribute('aria-pressed', String(on));
      darkToggle.textContent = on ? '☀️' : '🌙';
    });
  }

  // Auto-save draft
  ['nama','umur','berat','tinggi','aktivitas','tujuan','alergi'].forEach(id => {
    const el = document.getElementById(id);
    if(el){
      el.value = localStorage.getItem('draft_' + id) || el.value;
      el.addEventListener('input', () => localStorage.setItem('draft_' + id, el.value));
    }
  });

  // Demo button
  const demoBtn = document.getElementById('demoBtn');
  if(demoBtn){
    demoBtn.addEventListener('click', () => {
      document.getElementById('nama').value = 'Budi';
      document.getElementById('umur').value = '30';
      document.getElementById('jk').value = 'L';
      document.getElementById('berat').value = '70';
      document.getElementById('tinggi').value = '175';
      document.getElementById('aktivitas').value = 'sedang';
      document.getElementById('tujuan').value = 'maintain';
      const el = document.getElementById('formErrors');
      if(el){ el.style.display='none'; el.textContent=''; }
    });
  }

  const fy = document.getElementById('footerYear');
  if(fy) fy.textContent = new Date().getFullYear();
});

// ============ FORM SUBMIT ============
const formProfil = document.getElementById('formProfil');
if(formProfil){
  formProfil.addEventListener('submit', function(e){
    e.preventDefault();

    const namaEl = document.getElementById('nama');
    const nama   = namaEl.value.trim();
    const umur   = parseInt(document.getElementById('umur').value, 10);
    const jk     = document.getElementById('jk').value;
    const berat  = parseFloat(document.getElementById('berat').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value);
    const aktivitas = document.getElementById('aktivitas').value;
    const tujuan = document.getElementById('tujuan').value;
    const alergi = document.getElementById('alergi').value.trim();

    let hasErr = false;
    if(!nama){
      document.getElementById('err-nama').style.display='block';
      namaEl.classList.add('is-invalid');
      hasErr = true;
    } else {
      document.getElementById('err-nama').style.display='none';
      namaEl.classList.remove('is-invalid');
    }
    if(!umur || umur<10 || umur>120) hasErr = true;
    if(!berat || berat<=0) hasErr = true;
    if(!tinggi || tinggi<=0) hasErr = true;

    if(hasErr){
      const fe = document.getElementById('formErrors');
      if(fe){ fe.style.display='block'; fe.textContent='Terdapat input yang belum benar. Periksa kembali.'; }
      return;
    }

    let bmr;
    if(jk === 'L'){
      bmr = (10 * berat) + (6.25 * tinggi) - (5 * umur) + 5;
    } else {
      bmr = (10 * berat) + (6.25 * tinggi) - (5 * umur) - 161;
    }

    const faktor = { rendah:1.2, ringan:1.375, sedang:1.55, berat:1.725 };
    const tdee = bmr * faktor[aktivitas];

    let target;
    if(tujuan === 'turun')      target = tdee - 500;
    else if(tujuan === 'naik')  target = tdee + 500;
    else                         target = tdee;
    target = Math.round(target);

    const user = { nama, umur, jk, berat, tinggi, aktivitas, tujuan, alergi, target };
    localStorage.setItem('user', JSON.stringify(user));

    // Hapus draft
    ['nama','umur','berat','tinggi','aktivitas','tujuan','alergi'].forEach(id => {
      localStorage.removeItem('draft_' + id);
    });

    const toastEl = document.getElementById('liveToast');
    if(toastEl && typeof bootstrap !== 'undefined'){
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
      setTimeout(() => window.location.href = 'bahan.html', 900);
    } else {
      window.location.href = 'bahan.html';
    }
  });
}