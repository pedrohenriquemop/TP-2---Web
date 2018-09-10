let $comprar = $("#comprarPc")
const trabalhos = ["consertar o pecê da tia da prima da irma da amiga da avo da sobrinha da sua mae",
"vender umas memoria rã estragada",
"baixar avast nos pecê da familia",
"desinstalar o baidu dos pecê da familia",
"vender um programa de soma em portugolstudio"]
let dinheiroSpan = $('#dinheiro')
let botaoPc = $('#div-pc')
let valorDoClique = 0.01,valorDoS=0.00;
let dinheiro = 0.0
let upgrades = $('.sandro :not([data-diferente])>li');
let comPopop=$("[data-popopind]");
let qtdCompra=1;


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

function comprar(obj){
  let float=parseFloat(obj.dataset.custo);
  let ret=Math.round(dinheiro*100)/100 >= float;
  if(ret){
    dinheiro -= float;
    dinheiro=Math.round(dinheiro*100)/100;
    dinheiroSpan.html(dinheiro.toFixed(2));
  }
  return ret;
}

for(let i=0; i<upgrades.length; i++){
  upgrades[i].innerHTML+="<div class='descLi'><dl><div><dt>Comprados</dt><dd class='comprados'></div></dd><div><dt>Custo</dt><dd class='custoUpgrade'></dd></div><div><dt>Lucro</dt><dd class='lucro'></dd></div></dl></div>";
  upgrades[i].comprados=0;
  upgrades[i].custoSemArr=Number(upgrades[i].dataset.custo);
  upgrades[i].inflacao=upgrades[i].custoSemArr/10;
  upgrades[i].contribLucro=0;
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
  let sht=e.currentTarget;
  if(comprar(sht)){
    sht.custoSemArr+=sht.inflacao*qtdCompra;
    Add(sht);
    refresh(sht);
  }
}


function Add(obj){
  let thing=parseFloat(obj.dataset.add)*qtdCompra;
  if(obj.parentNode.dataset.autoclick===undefined) valorDoClique += thing;
  else valorDoS+=thing;
  obj.contribLucro+=thing;
  obj.comprados+=Number(qtdCompra);
}

function Pc(e){
  dinheiro += valorDoClique
  dinheiroSpan.html(dinheiro.toFixed(2))
}

function refreshCusto(obj){
  obj.pontCusto.innerHTML =(
    obj.dataset.custo=(
      (obj.custoSemArr+obj.inflacao*(qtdCompra-1)/2)*qtdCompra
    ).toFixed(2))
  +" contos";
}

function refresh(obj){
  refreshCusto(obj);
  obj.pontLucro.innerHTML = parseFloat(obj.dataset.add).toFixed(2)+" contos";
  obj.pontCompr.innerHTML = obj.comprados;
}

upgrades.click(Pagar)

botaoPc.click(function(e){
  Pc(e);

  let x=document.createElement("span");
  x.classList.add("numPt");
  document.body.appendChild(x);
  x.innerHTML="+"+valorDoClique.toFixed(2);
  let top=e.pageY-x.offsetHeight/2;
  x.style.top=top+"px";
  x.style.left=e.pageX-x.offsetWidth/2+"px";
  x.style.top=top-120+"px";
  x.style.opacity="0";
  setTimeout(function(){
    x.remove();
  },1000);
});

comPopop.click(function(e){
  let short=e.currentTarget.dataset;
  if(short.popopqtd!="jafoi"&&e.currentTarget.comprados>=Number(short.popopqtd)){
    abrePopop(Number(short.popopind));
    short.popopqtd="jafoi";
  }
});

setInterval(function () {
  if(valorDoS){
    dinheiro+=valorDoS;
    dinheiroSpan.html(dinheiro.toFixed(2));

    let x=document.createElement("span");
    x.classList.add("numPt");
    x.style.color="#00dfdf";
    botaoPc.append(x);
    x.innerHTML="+"+valorDoS.toFixed(2);
    let top=(botaoPc.height()-x.offsetHeight)/2;
    x.style.top=top+"px";
    x.style.left=(botaoPc.width()-x.offsetWidth)/2+"px";
    x.style.top=top-120+"px";
    x.style.opacity="0";
    setTimeout(function(){
      x.remove();
    },1000);
  }
},1000);


// Upgrades!

let ups=$("[data-diferente=\"up\"]>li");
function mult(chosen,mul,ants=true){
  let tem=chosen[0].parentNode.dataset.autoclick;
  for(let i=0; i<chosen.length; i++){
    let velho=Number(chosen[i].dataset.add);
    let novo=velho*mul;
    if(ants){
      if(tem===undefined) valorDoClique+=(mul-1)*chosen[i].contribLucro;
      else valorDoS+=(mul-1)*chosen[i].contribLucro;
      chosen[i].contribLucro*=mul;
    }
    chosen[i].dataset.add=novo;
    refresh(chosen[i]);
  }
}

const funcoesUps=[
  function(){
    mult(document.querySelectorAll("#ra"),10);
  },
  function(){
    mult(document.querySelectorAll("#html"),5);
  },
  function(){
    let chosen=document.querySelectorAll("#gtx");
    chosen[0].custoSemArr/=100;
    chosen[0].inflacao/=100;
    mult(chosen,1);
  },
  function(){
    let chosen=document.querySelectorAll("#progs li");
    for(let i=0; i<chosen.length; i++){
      mult([chosen[i]],1+chosen[i].comprados*0.0007);
    }
  },
  function(){
    let chosen=document.querySelectorAll("#progs li:not(.portugol)");
    let total=0;
    for(let i=0; i<chosen.length; i++){
      total+=chosen[i].comprados;
      valorDoS-=chosen[i].contribLucro;
      chosen[i].contribLucro=0;
      chosen[i].comprados=0;
      refresh(chosen[i]);
    }

    let renegade=document.querySelector("#special");
    let ganho=renegade.dataset.add*total;
    valorDoS+=ganho;
    renegade.contribLucro+=ganho;
    renegade.comprados+=total;
    refresh(renegade);
  }
];

for(let i=0; i<ups.length; i++){
  ups[i].innerHTML+="<div class='descLi'><p>"+ups[i].dataset.desc+"</p><dl><div><dt>Custo</dt><dd>"+ups[i].dataset.custo+" contos</dd></div></dl></div>";
  ups[i].addEventListener("click",function(){
    if(comprar(this)){
      funcoesUps[i]();
      this.classList.add("oculto");
    }
  });
}


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


// Scroll de comprar mais

let ele=document.querySelector("#qwerty");
let eleSpan=document.querySelector("#num");

ele.addEventListener("input",function(){
  eleSpan.innerHTML=Math.round(ele.value*ele.value);
});

ele.addEventListener("change",function(){
  qtdCompra=Number(eleSpan.innerHTML);
  for(let i=0; i<upgrades.length; i++){
    refreshCusto(upgrades[i]);
  }
});
