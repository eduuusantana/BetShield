/* Menu Mobile */
const botaoMenu = document.getElementById('botaoMenu');
const navegacao = document.getElementById('navegacao');

botaoMenu.addEventListener('click', function () {
  this.classList.toggle('aberto');
  navegacao.classList.toggle('aberto');
});

navegacao.querySelectorAll('.link-navegacao').forEach(function (link) {
  link.addEventListener('click', function () {
    botaoMenu.classList.remove('aberto');
    navegacao.classList.remove('aberto');
  });
});

/* Cabeçalho */
var cabecalho = document.getElementById('cabecalho');

window.addEventListener('scroll', function () {
  if (window.scrollY > 40) {
    cabecalho.classList.add('rolado');
  } else {
    cabecalho.classList.remove('rolado');
  }
});

/* Scroll Suave */
document.querySelectorAll('a[href^="#"]').forEach(function (ancora) {
  ancora.addEventListener('click', function (e) {
    var idDestino = this.getAttribute('href');
    if (idDestino === '#') return;

    var destino = document.querySelector(idDestino);
    if (!destino) return;

    e.preventDefault();

    var alturaCabecalho = cabecalho.offsetHeight;
    var topoDestino = destino.getBoundingClientRect().top + window.pageYOffset - alturaCabecalho - 16;

    window.scrollTo({ top: topoDestino, behavior: 'smooth' });
  });
});

/* Animações */
var seletoresAnimacao = [
  '.cartao-problema',
  '.texto-solucao',
  '.visual-solucao',
  '.etapa',
  '.cartao-beneficio',
  '.cartao-publico',
  '.item-diferencial',
  '.item-roadmap',
  '.cartao-mvv',
  '.cabecalho-secao',
  '.citacao-problema',
  '.container-comparacao'
];

seletoresAnimacao.forEach(function (seletor) {
  document.querySelectorAll(seletor).forEach(function (elemento) {
    elemento.classList.add('revelar');
  });
});

var observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.revelar').forEach(function (elemento) {
  var irmaos = Array.from(elemento.parentElement.children).filter(function (item) {
    return item.classList.contains('revelar');
  });

  var atraso = irmaos.indexOf(elemento) * 80;
  elemento.style.transitionDelay = atraso + 'ms';

  observador.observe(elemento);
});

/* Contador */
var contadorElemento = document.getElementById('contadorBloqueios');
var contadorMeta = 247;
var contadorIniciado = false;

function animarContador(elemento, meta, duracao) {
  var inicio = 0;
  var passo = Math.ceil(meta / (duracao / 16));

  var temporizador = setInterval(function () {
    inicio += passo;

    if (inicio >= meta) {
      elemento.textContent = meta;
      clearInterval(temporizador);
    } else {
      elemento.textContent = inicio;
    }
  }, 16);
}

if (contadorElemento) {
  var observadorContador = new IntersectionObserver(function (entradas) {
    if (entradas[0].isIntersecting && !contadorIniciado) {
      contadorIniciado = true;
      animarContador(contadorElemento, contadorMeta, 1200);
      observadorContador.disconnect();
    }
  }, { threshold: 0.5 });

  observadorContador.observe(contadorElemento);
}

/* Formulário */
function enviarFormulario(e) {
  e.preventDefault();

  var formulario = e.target;
  var campoEmail = formulario.querySelector('.input-cta');
  var botao = formulario.querySelector('button[type="submit"]');
  var email = campoEmail.value.trim();

  if (!email) return;

  botao.textContent = 'Enviando...';
  botao.disabled = true;

  setTimeout(function () {
    botao.textContent = '✅ Notificação registrada!';
    botao.style.background = '#16a34a';
    campoEmail.value = '';

    setTimeout(function () {
      botao.textContent = 'Quero ser notificado';
      botao.style.background = '';
      botao.disabled = false;
    }, 4000);
  }, 900);
}

/* Link Ativo */
var secoes = document.querySelectorAll('section[id]');
var linksNavegacao = document.querySelectorAll('.link-navegacao');

window.addEventListener('scroll', function () {
  var posicaoScroll = window.scrollY + cabecalho.offsetHeight + 60;

  secoes.forEach(function (secao) {
    var topoSecao = secao.offsetTop;
    var fimSecao = topoSecao + secao.offsetHeight;

    if (posicaoScroll >= topoSecao && posicaoScroll < fimSecao) {
      linksNavegacao.forEach(function (link) {
        link.classList.remove('ativo');

        if (link.getAttribute('href') === '#' + secao.id) {
          link.classList.add('ativo');
        }
      });
    }
  });
});

var estilo = document.createElement('style');
estilo.textContent = '.link-navegacao.ativo { color: var(--color-blue-glow) !important; opacity: 1 !important; }';
document.head.appendChild(estilo);

/* Fechar Menu */
document.addEventListener('click', function (e) {
  var clicouBotao = botaoMenu.contains(e.target);
  var clicouNavegacao = navegacao.contains(e.target);

  if (!clicouBotao && !clicouNavegacao && navegacao.classList.contains('aberto')) {
    botaoMenu.classList.remove('aberto');
    navegacao.classList.remove('aberto');
  }
});