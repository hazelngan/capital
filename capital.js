var emojis = ['🌽','🥕','🥦','🍅','🌾','🥬','🫘'];
var prices = [4, 3, 5, 4, 3, 4, 6];
var s2c = 0, s3c = 0, s4c = 0, s5clicks = 0, s5done = false;

function go(id) {
  document.querySelectorAll('.sc').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  if (id === 's1-play') initS1();
}

function initS1() {
  document.getElementById('land-status').textContent = 'not yours';
  document.getElementById('land-status').style.color = '#A32D2D';
  document.getElementById('seed-status').textContent = 'not yours';
  document.getElementById('seed-status').style.color = '#A32D2D';
  document.getElementById('tool-status').textContent = 'not yours';
  document.getElementById('tool-status').style.color = '#A32D2D';
  document.getElementById('s1-hint').textContent = 'you cannot begin.';
  document.getElementById('s1-next').style.display = 'none';
  setTimeout(function() {
    document.getElementById('land-status').textContent = 'yours';
    document.getElementById('land-status').style.color = '#3B6D11';
    document.getElementById('s1-hint').textContent = 'you have land. but not enough.';
    setTimeout(function() {
      document.getElementById('seed-status').textContent = 'yours';
      document.getElementById('seed-status').style.color = '#3B6D11';
      setTimeout(function() {
        document.getElementById('tool-status').textContent = 'yours';
        document.getElementById('tool-status').style.color = '#3B6D11';
        document.getElementById('s1-hint').textContent = 'now you can begin.';
        document.getElementById('s1-next').style.display = 'inline-block';
      }, 900);
    }, 900);
  }, 900);
}

function addPlant(id) {
  var f = document.getElementById(id);
  var h = f.querySelector('.hint');
  if (h) h.remove();
  if (f.querySelectorAll('.plant').length < 12) {
    var s = document.createElement('span');
    s.className = 'plant';
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    f.appendChild(s);
  }
}

function workFarm() {
  s2c++;
  addPlant('farm2');
  document.getElementById('s2-hours').textContent = s2c;
  document.getElementById('s2-wage').textContent = s2c * 2;
  if (s2c >= 5) document.getElementById('s2-note').style.opacity = '1';
  if (s2c >= 10) document.getElementById('s2-next').style.display = 'inline-block';
}

function machineClick() {
  s3c++;
  var yours = Math.min(s3c, 10);
  var theirs = Math.max(0, s3c - 10);
  document.getElementById('s3-yours').textContent = yours;
  document.getElementById('s3-theirs').textContent = theirs;
  var ypct = Math.max(20, Math.round((yours / (yours + theirs + 0.001)) * 100));
  document.querySelector('.split-yours').style.flex = ypct;
  document.querySelector('.split-theirs').style.flex = 100 - ypct;
  if (s3c >= 12) document.getElementById('s3-note').style.opacity = '1';
  if (s3c >= 20) document.getElementById('s3-next').style.display = 'inline-block';
}

function growCrop() {
  s4c++;
  var idx = s4c % emojis.length;
  addPlant('farm4');
  document.getElementById('cbox').style.opacity = '1';
  document.getElementById('crop-icon').textContent = emojis[idx];
  document.getElementById('price-tag').textContent = '$' + prices[idx];
  if (s4c >= 8) document.getElementById('s4-next').style.display = 'inline-block';
}

function tryWork() {
  s5clicks++;
  if (s5clicks === 1) document.getElementById('s5-bubbles').style.opacity = '1';
  if (s5clicks >= 4 && !s5done) {
    s5done = true;
    var m = document.getElementById('mach5');
    m.style.opacity = '0.2';
    m.style.cursor = 'default';
    m.onclick = null;
    document.getElementById('m5sub').textContent = 'stopped';
    setTimeout(function() {
      document.getElementById('s5-bubbles').style.display = 'none';
      document.getElementById('s5-silent').style.display = 'flex';
      setTimeout(function() {
        document.getElementById('s5-note').style.opacity = '1';
        setTimeout(function() {
          document.getElementById('s5-next').style.display = 'inline-block';
        }, 1200);
      }, 600);
    }, 800);
  }
}

function resetAll() {
  s2c = 0; s3c = 0; s4c = 0; s5clicks = 0; s5done = false;
  document.getElementById('s2-hours').textContent = '0';
  document.getElementById('s2-wage').textContent = '0';
  document.getElementById('s3-yours').textContent = '0';
  document.getElementById('s3-theirs').textContent = '0';
  document.querySelector('.split-yours').style.flex = '40';
  document.querySelector('.split-theirs').style.flex = '60';
  document.getElementById('s2-note').style.opacity = '0';
  document.getElementById('s3-note').style.opacity = '0';
  document.getElementById('s5-note').style.opacity = '0';
  document.getElementById('s5-bubbles').style.opacity = '0';
  document.getElementById('s5-bubbles').style.display = '';
  document.getElementById('s5-silent').style.display = 'none';
  document.getElementById('s2-next').style.display = 'none';
  document.getElementById('s3-next').style.display = 'none';
  document.getElementById('s4-next').style.display = 'none';
  document.getElementById('s5-next').style.display = 'none';
  document.getElementById('farm2').innerHTML = '<span class="hint" id="farm2-hint">click to work</span>';
  document.getElementById('farm4').innerHTML = '<span class="hint" id="farm4-hint">click to grow</span>';
  document.getElementById('cbox').style.opacity = '.3';
  var m = document.getElementById('mach5');
  m.style.opacity = '1';
  m.style.cursor = 'pointer';
  m.onclick = tryWork;
  m.querySelector('.msub').textContent = 'click';
}