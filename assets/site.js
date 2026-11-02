(function(){
  var C = window.SITE_CONFIG || {};
  // Fill config-driven text
  document.querySelectorAll('[data-cfg]').forEach(function(el){
    var k = el.getAttribute('data-cfg'); if (C[k] != null) el.textContent = C[k];
  });
  document.querySelectorAll('[data-cfg-href="email"]').forEach(function(el){ if (C.email) el.href = 'mailto:' + C.email; });
  if (C.brand && C.tagline) document.title = C.brand + ' | ' + C.tagline.replace(/\.$/, '');
  var yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

  // Pricing buttons preselect interest
  var sel = document.getElementById('interest');
  document.querySelectorAll('[data-interest]').forEach(function(a){
    a.addEventListener('click', function(){ if (sel) sel.value = a.getAttribute('data-interest'); });
  });

  // Waitlist form -> mailto (no backend). See README to switch to Formspree.
  var f = document.getElementById('joinForm'), msg = document.getElementById('formMsg');
  if (!f) return;
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var d = new FormData(f), name = (d.get('name')||'').trim(), email = (d.get('email')||'').trim();
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { msg.textContent = 'Please enter your name and a valid email.'; return; }
    var subject = (C.brand || 'Vetted Doors') + ' list: ' + d.get('interest');
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nInterested in: ' + d.get('interest') + '\n\n' + (d.get('message') || '');
    msg.style.color = '#0a5656';
    msg.textContent = 'Opening your email app. If nothing happens, email ' + (C.email || 'hardeep@apas.ai') + '.';
    window.location.href = 'mailto:' + (C.email || 'hardeep@apas.ai') + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
