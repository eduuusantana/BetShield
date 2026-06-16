// Seleciona os elementos principais
var menuBtn = document.getElementById('menuBtn');
var nav     = document.getElementById('nav');
var header  = document.getElementById('header');


// 1. ABRIR E FECHAR O MENU
menuBtn.addEventListener('click', function() {
  menuBtn.classList.toggle('open');
  nav.classList.toggle('open');
});


// 2. FECHAR O MENU AO CLICAR EM UM LINK
var links = nav.querySelectorAll('.nav__link');

links.forEach(function(link) {
  link.addEventListener('click', function() {
    menuBtn.classList.remove('open');
    nav.classList.remove('open');
  });
});


// 3. FECHAR O MENU AO CLICAR FORA DELE
document.addEventListener('click', function(e) {
  var clicouNoBtn = menuBtn.contains(e.target);
  var clicouNoNav = nav.contains(e.target);

  if (!clicouNoBtn && !clicouNoNav) {
    menuBtn.classList.remove('open');
    nav.classList.remove('open');
  }
});


// 4. HEADER MUDA AO ROLAR A PÁGINA
window.addEventListener('scroll', function() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// 5. SCROLL SUAVE AO CLICAR NOS LINKS
links.forEach(function(link) {
  link.addEventListener('click', function(e) {
    var destino = this.getAttribute('href');

    if (destino === '#') return;

    var secao = document.querySelector(destino);

    if (!secao) return;

    e.preventDefault();

    var topoHeader   = header.offsetHeight;
    var posicaoSecao = secao.offsetTop - topoHeader - 16;

    window.scrollTo({ top: posicaoSecao, behavior: 'smooth' });
  });
});


// 6. FORMULÁRIO DE NOTIFICAÇÃO
function handleFormSubmit(e) {
  e.preventDefault();

  var form  = e.target;
  var input = form.querySelector('.cta__input');
  var btn   = form.querySelector('button[type="submit"]');

  if (!input.value) return;

  btn.textContent = 'Enviando...';
  btn.disabled    = true;

  setTimeout(function() {
    btn.textContent      = '✅ Notificação registrada!';
    btn.style.background = '#16a34a';
    input.value          = '';

    setTimeout(function() {
      btn.textContent      = 'Quero ser notificado';
      btn.style.background = '';
      btn.disabled         = false;
    }, 4000);
  }, 900);
}
