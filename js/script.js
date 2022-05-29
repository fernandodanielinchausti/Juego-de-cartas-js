let form = document.querySelector("#pForm");

let cols = document.querySelectorAll(".col");
let cerrar = document.querySelector("#cerrar");
let verresultados = document.querySelector("#verRes");
let volveratirar = document.querySelector("#volveratirar");
let players = document.querySelector("#players");

let cardsinner = document.querySelector("#cardsinner");

let restext = document.querySelector("#restext");

let p1 = "";
let p2 = "";
let pages = document.querySelectorAll(".page");
let home = document.querySelector(".home");
let animacion = document.querySelector(".animacion");
let carousel = document.querySelector(".carousel");
let resultados = document.querySelector(".resultados");
let juego = document.querySelector("#juego");
let carouselMsg = document.querySelector("#carouselMsg");
let verRes = document.querySelector("#btnShowPopup");
let carouselInner = document.querySelector(".carousel-inner");

let modal = document.querySelector("#exampleModal");
let ver = document.querySelector("#btnVerResult");
let salir = document.querySelector("#btnTirarAgain");

let lista1 = document.querySelector(".lista1");
let lista1h3 = document.querySelector(".lista1 h3");
let lista1ul = document.querySelector(".lista1 ul");
let lista2 = document.querySelector(".lista2");
let lista2h3 = document.querySelector(".lista2 h3");
let lista2ul = document.querySelector(".lista2 ul");
let match = document.querySelector(".match h2");

let matchBool = "";

let btnGuardar = document.querySelector("#btnGuardar");
let btnJugar = document.querySelector("#btnJugar");
let guardadas = document.querySelector(".guardadas ul");

let partidasTotal = [];
let tempMazo = [];
let pos = 0;

const mostrarPagina = (pagina) => {
  pages.forEach((page) => {
    page.style.display = "none";
  });
  pagina.style.display = "block";
  modal.style.display = "none";

  if (pagina === animacion) {
    setTimeout(() => {
      mostrarPagina(carousel);
    }, 3000);
  }
};

const empezarJuego = () => {
  let random = 0;
  let slide = "";
  let active = "";
  //hacemos la tirada y creamos un mazo random dentro del array temoMazo
  while (tempMazo.length < 6) {
    random = Math.floor(Math.random() * cartas.length);
    if (tempMazo.indexOf(cartas[random]) == -1) {
      tempMazo.push(cartas[random]);
    }
  }

  // recorro el tempMazo y relleno el carousel
  tempMazo.forEach((carta, index) => {
    if (index === 0) active = "active";
    else active = "#";

    slide += `<div class="carousel-item ${active} justify-content-center"  data-index="${
      index + 1
    }">
    <img src="${carta.imagen}" class="d-block w-100" alt="${carta.nombre}"/>
    <div class="carousel-caption d-none d-md-block">
      <h5>${carta.nombre}</h5>
      <p>${carta.descripcion}</p>
   </p>
    </div>
  </div>`;
  });
  carouselMsg.innerHTML = `Carta 1/3 para ${p1}`;
  carouselInner.innerHTML = slide;
};
console.log(tempMazo);
const mostrarResultado = (posicion) => {
  let suma = 0;

  if (posicion) {
    tempMazo = partidasTotal[posicion];
  }

  tempMazo.forEach((carta, index) => {
    if (index <= 2) {
      lista1ul.innerHTML += `<li ><img src="${carta.imagen}" /></li>`;
    }
    if (index > 2) {
      lista2ul.innerHTML += `<li><img src="${carta.imagen}"  /></li>`;
    }

    suma = suma + carta.id;
    console.log(suma);
  });

  if (suma > 30) {
    match.innerHTML = `HAY MATCH`;
    matchBool = "HAY MATCH";
  } else {
    match.innerHTML = `NO HAY MATCH`;

    matchBool = "NO HAY MATCH";
  }

  lista1h3.innerHTML = `Cartas de ${p1}`;
  lista2h3.innerHTML = `Cartas de ${p2}`;
};

const guardarPartida = (p1, p2, matchBool) => {
  partidasTotal.push(tempMazo);

  guardadas.innerHTML += `<li><span>${p1} y ${p2} - ${matchBool} </span><button class="btn btn-danger" 
  data-p1="${p1}" data-p2="${p2}" data match="${matchBool}"
  data-pos="${pos++}">Ver partida</button></li>`;
};

juego.addEventListener("slide.bs.carousel", function (e) {
  let cartaNum = e.relatedTarget.getAttribute("data-index");
  if (cartaNum <= 3) {
    carouselMsg.innerHTML = `Carta ${cartaNum}/3 para ${p1}`;
  }
  if (cartaNum > 3 && cartaNum <= 6) {
    carouselMsg.innerHTML = `Carta ${cartaNum - 3}/3 para ${p2}`;
  }
});

const resetPartida = () => {
  lista1ul.innerHTML = ``;
  lista2ul.innerHTML = ``;
  tempMazo = [];
};

guardadas.addEventListener("click", (e) => {
  if (e.target.getAttribute("data-pos")) {
    let posicion = e.target.getAttribute("data-pos");
    p1 = e.target.getAttribute("data-p1");
    p2 = e.target.getAttribute("data-p2");
    matchBool = e.target.getAttribute("data-match");

    mostrarResultado(posicion);
    mostrarPagina(resultados);
  }
});

verRes.addEventListener("click", (e) => {
  modal.style.display = "block";
});

salir.addEventListener("click", (e) => {
  mostrarPagina(home);
});

ver.addEventListener("click", (e) => {
  mostrarResultado();
  mostrarPagina(resultados);
});

btnGuardar.addEventListener("click", (e) => {
  guardarPartida(p1, p2, matchBool);
  resetPartida();
  mostrarPagina(home);
});

btnJugar.addEventListener("click", (e) => {
  resetPartida();
  mostrarPagina(home);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  p1 = e.target.p1.value;
  p2 = e.target.p2.value;
  mostrarPagina(animacion);
  empezarJuego();
  form.reset();
});
