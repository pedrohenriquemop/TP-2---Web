let $comprar = $("#comprarPc")
const trabalhos = ["consertar o pecê da tia da prima da irma da amiga da avo da sobrinha da sua mae",
"vender umas memoria rã estragada",
"baixar avast nos pecê da familia",
"desinstalar o baidu dos pecê da familia",
"vender um programa de soma em portugolstudio"]
let dinheiroSpan = $('#dinheiro')
let botaoPc = $('#pc')
let valorDoClique = 0.01,valorDoS=0.00;
let dinheiro = 0.0
let upgrades = $('.sandro li')
let comPopop=$("[data-popopind]");


// Menu!

let lisMenu=document.querySelectorAll("#menu>li");
let divsCentral=document.querySelectorAll(".sandro");
const width=100/lisMenu.length+"%";
for(let i=0; i<lisMenu.length; i++) lisMenu[i].style.width=width;

for(let i=0; i<lisMenu.length; i++)
  lisMenu[i].addEventListener("click",function(e){
    const id=e.currentTarget.dataset.mostra;

    for(let i=0; i<lisMenu.length; i++){
      if(lisMenu[i]==e.currentTarget) lisMenu[i].classList.add("atual");
      else lisMenu[i].classList.remove("atual");
    }

    for(let i=0; i<divsCentral.length; i++){
      if(divsCentral[i].id==id) divsCentral[i].classList.add("visivel");
      else divsCentral[i].classList.remove("visivel");
    }

    if(id=="progs"){
      alfaceCrespa();
      addEventListener("resize",alfaceCrespa);
    }
    else removeEventListener("resize",alfaceCrespa);
  });


// Popups!

let divPop=document.querySelector("#popops");
let txtPop=document.querySelectorAll("#popops section");
let btnPop=document.querySelector("#oquei");

function abrePopop(ind){
  let li;
  for(let i=0; i<txtPop.length; i++){
    if(i!=ind) txtPop[i].classList.add("oculto");
    else {
      txtPop[i].classList.remove("oculto");
      li=txtPop[i].dataset.mostra;
    }
  }

  if(li){
    for(let i=0; i<lisMenu.length; i++){
      if(lisMenu[i].dataset.mostra==li) lisMenu[i].classList.remove("oculto");
    }
  }

  divPop.classList.remove("oculto");
}

function torradaMoida(){
  divPop.classList.add("oculto");
}
btnPop.addEventListener("click",torradaMoida);


// Adiciona estatísticas de compra nas li's!

for(let i=0; i<upgrades.length; i++){
  upgrades[i].innerHTML+="<dl><dt>Comprados</dt><dd class='comprados'></dd><dt>Custo</dt><dd class='custoUpgrade'></dd><dt>Lucro</dt><dd class='lucro'></dd></dl>";
  upgrades[i].comprados=0;
  upgrades[i].custoSemArr=upgrades[i].dataset.custo;
}
const custos = $('.custoUpgrade'),
  lucros=$('.lucro'),
  comprados=$(".comprados");
for(let i=0; i<upgrades.length; i++) {
  upgrades[i].pontCusto=custos[i];
  upgrades[i].pontLucro=lucros[i];
  upgrades[i].pontCompr=comprados[i];
  refresh(upgrades[i]);
}

function Pagar(e){
  if(dinheiro - parseFloat(e.currentTarget.dataset.custo) >= 0){
    dinheiro -= parseFloat(e.currentTarget.dataset.custo);
    e.currentTarget.custoSemArr *= 1.1
    e.currentTarget.dataset.custo=e.currentTarget.custoSemArr.toFixed(2);
    Add(e.currentTarget);
    refresh(e.currentTarget);
  }
}

function Add(obj){
  if(obj.parentNode.dataset.autoclick===undefined) valorDoClique += parseFloat(obj.dataset.add)
  else valorDoS+=parseFloat(obj.dataset.add);
  obj.comprados++;
}

function Pc(e){
  dinheiro += valorDoClique
  dinheiroSpan.html(dinheiro.toFixed(2))
}

function refresh(obj){
  dinheiroSpan.html(dinheiro.toFixed(2))
  obj.pontCusto.innerHTML = parseFloat(obj.dataset.custo).toFixed(2)+" contos";
  obj.pontLucro.innerHTML = parseFloat(obj.dataset.add).toFixed(2)+" contos";
  obj.pontCompr.innerHTML = obj.comprados;
}

upgrades.click(Pagar)
botaoPc.click(Pc)
comPopop.click(function(e){
  let short=e.currentTarget.dataset;
  if(short.popopqtd!="jafoi"&&e.currentTarget.comprados>=Number(short.popopqtd)){
    abrePopop(Number(short.popopind));
    short.popopqtd="jafoi";
  }
});

setInterval(function () {
  dinheiro+=valorDoS;
  dinheiroSpan.html(dinheiro.toFixed(2));
},1000)


// Setinha!!!

let liEspecifica=document.querySelector("#special");
let setas=document.querySelectorAll(".seta");
/*let portu=document.querySelector("#portu");
let parar;*/

function remover(){
  liEspecifica.classList.remove("special");
  liEspecifica.removeEventListener("click",remover);
}
liEspecifica.addEventListener("click",remover);

function alfaceCrespa(){
  for(let i=0; i<setas.length; i++) setas[i].style.bottom=(liEspecifica.offsetHeight-setas[i].offsetHeight)/2+"px";
}
/*function ajuste(e){
  portu.style.left=e.pageX-portu.offsetWidth/2+"px";
  portu.style.top=e.pageY-portu.offsetHeight/2+"px";
}

liEspecifica.addEventListener("mousemove",ajuste);
liEspecifica.addEventListener("click",function(e){
  portu.classList.add("crescendo");
  parar=setInterval(function () {
    ajuste(e);
  }, 10);
  setTimeout(function(){
    portu.classList.remove("crescendo");
    clearInterval(parar);
  },3000);
});*/
