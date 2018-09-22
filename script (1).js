let dinheiroSpan = $('#dinheiro')
let botaoPc = $('#pc');
let divPc = $('#div-pc')
let valorDoClique,valorDoS;
let dinheiro;
let upgrades = $('.sandro :not([data-diferente])>li');
let comPopop=$("[data-popopind]");
let qtdCompra=1;
let dinGasto,tempo;


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


// Conquistas

let conqs=[
  // Não ocultas
  [
    {
      nom:"Nova Era da Informática",
      dsc:"Compre um programador de Portugol."
    }
  ],

  // Ocultas
  [
    {
      nom:"Ráquer do anônimous",
      dsc:"Parabéns, agora vai raquear um banco e ganhar dinheiro infinito na vida real!"
    },
    {
      nom:"Não foi Macro, né?",
      dsc:"Clique 69 vezes em 10 segundos."
    }
  ]
];


// Popups genéricos

function abre(el){
  el.classList.remove("oculto");
  clearInterval(pararTempo);
}

function fecha(el){
  el.classList.add("oculto");
  setaTempo();
}

let pops=document.querySelectorAll(".fundoPop"),btnsFechar=document.querySelectorAll(".jsfechar");
for(let i=0; i<pops.length; i++){
  btnsFechar[i].addEventListener("click",function () {
    fecha(pops[i]);
  });
}


// Popups!

let divPop=document.querySelector("#popops");
let txtPop=document.querySelectorAll("#popops section");
let btnPop=document.querySelector("#oquei");

function unlock(li){
  if(li){
    for(let i=0; i<lisMenu.length; i++){
      if(lisMenu[i].dataset.mostra==li) lisMenu[i].classList.remove("oculto");
    }
  }
}
function abrePopop(ind){
  let li;
  for(let i=0; i<txtPop.length; i++){
    if(i!=ind) txtPop[i].classList.add("oculto");
    else {
      txtPop[i].classList.remove("oculto");
      li=txtPop[i].dataset.mostra;
    }
  }

  unlock(li);
  abre(divPop);
}


// Adiciona estatísticas de compra nas li's!

for(let i=0; i<upgrades.length; i++){
  upgrades[i].innerHTML+="<div class='descLi'><dl><div><dt>Comprados</dt><dd class='comprados'></div></dd><div><dt>Custo</dt><dd class='custoUpgrade'></dd></div><div><dt>Lucro</dt><dd class='lucro'></dd></div></dl></div>";
}
const custos = $('.custoUpgrade'),
  lucros=$('.lucro'),
  comprados=$(".comprados");
for(let i=0; i<upgrades.length; i++) {
  upgrades[i].pontCusto=custos[i];
  upgrades[i].pontLucro=lucros[i];
  upgrades[i].pontCompr=comprados[i];
  upgrades[i].custoSemArr
}

Number.prototype.formata=function(cd=-1){
  let ret="",str;
  if(cd!=-1){
    str=this.toFixed(cd);
    let posPonto=str.indexOf(".");
    let i;
    for(i=0; i<posPonto-2; i++){
      ret+=str[i];
      if((posPonto-i)%3==1) ret+=",";
    }
    for(; i<posPonto+3; i++){
      ret+=str[i];
    }
    return ret;
  }

  // Se for inteiro

  str=String(this);
  for(i=0; i<str.length; i++){
    ret+=str[i];
    if((posPonto-i)%3==1) ret+=",";
  }
  return ret;
}

function mudaDin(){
  dinheiroSpan.html(dinheiro.formata(2));
}

function comprar(obj){
  let float=obj.dataset.custo;
  let ret=dinheiro >= float;
  if(ret){
    dinheiro -= float;
    dinGasto+=float;
    mudaDin();
  }
  return ret;
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

function Pc(){
  dinheiro += valorDoClique
  mudaDin();
}

function refreshCusto(obj){
  let x=(obj.custoSemArr+obj.inflacao*(qtdCompra-1)/2)*qtdCompra;
  obj.pontCusto.innerHTML =x.formata(2)+" contos";
  obj.dataset.custo=x.toFixed(2);
}

function refresh(obj){
  refreshCusto(obj);
  obj.pontLucro.innerHTML = parseFloat(obj.dataset.add).formata(2)+" contos";
  obj.pontCompr.innerHTML = obj.comprados;
}

function refreshAll(){
  for(let i=0; i<upgrades.length; i++){
    refresh(upgrades[i]);
  }
  mudaDin();
}

upgrades.click(Pagar)

botaoPc.click(function(e){
  Pc();

  let x=document.createElement("span");
  x.classList.add("numPt");
  document.body.appendChild(x);
  x.innerHTML="+"+valorDoClique.formata(2);
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
    mudaDin();

    let x=document.createElement("span");
    x.classList.add("numPt");
    x.style.color="#00dfdf";
    divPc.append(x);
    x.innerHTML="+"+valorDoS.formata(2);
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

// Contagem de tempo
const tempoIncr=10;
const incr=1/(1000/tempoIncr);
let pararTempo;

function setaTempo(){
  pararTempo=setInterval(function(){
    tempo+=incr;
  },tempoIncr);
}
setaTempo();


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
    let chosen=document.querySelector("#gtx");
    chosen.inflacao/=20;
    refresh(chosen);
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

function aplicarUp(i){
  funcoesUps[i]();
  ups[i].classList.add("oculto");
}

for(let i=0; i<ups.length; i++){
  ups[i].innerHTML+="<div class='descLi'><p>"+ups[i].dataset.desc+"</p><dl><div><dt>Custo</dt><dd>"+Number(ups[i].dataset.custo).formata(2)+" contos</dd></div></dl></div>";
  ups[i].addEventListener("click",function(){
    if(comprar(this)){
      aplicarUp(i);
    }
  });
}


// Save

let saveBtn=document.querySelector("#save");
function save(){
  localStorage.setItem("dinheiro",dinheiro);
  localStorage.setItem("valorDoClique",valorDoClique);
  localStorage.setItem("valorDoS",valorDoS);

  localStorage.setItem("dinGasto",dinGasto);
  localStorage.setItem("tempo",tempo);

  let vdo=[];
  for(let i=0; i<upgrades.length; i++){
    let a=upgrades[i];
    vdo[i]={
      custoSemArr: a.custoSemArr,
      comprados:a.comprados,
      contribLucro: a.contribLucro,
      inflacao: a.inflacao,
    };
  }
  localStorage.setItem("vdo",JSON.stringify(vdo));

  let upsComprados=[];
  for(let i=0; i<ups.length; i++){
    if(ups[i].classList.contains("oculto")){
      upsComprados.push(i);
    }
  }
  localStorage.setItem("ups",JSON.stringify(upsComprados));
}

saveBtn.addEventListener("click",save);


// Reset

let resetBtn=document.querySelector("#reset")
resetBtn.addEventListener("click",function () {
  zera();
  localStorage.clear();
  refreshAll();
});


// Load

function zera(){
  for(let i=0; i<upgrades.length; i++){
    upgrades[i].comprados=0;
    upgrades[i].custoSemArr=Number(upgrades[i].dataset.custo);
    upgrades[i].inflacao=upgrades[i].custoSemArr/10;
    upgrades[i].contribLucro=0;
  }

  valorDoClique = 0.01;
  valorDoS=0.00;
  dinheiro = 0.0;

  dinGasto=0;
  tempo=0;
}

function load(){
  let moni=localStorage.getItem("dinheiro");
  if(moni!=null){
    dinheiro=Number(moni);
    valorDoClique = Number(localStorage.getItem("valorDoClique"));
    valorDoS=Number(localStorage.getItem("valorDoS"));

    dinGasto=Number(localStorage.getItem("dinGasto"));
    tempo=Number(localStorage.getItem("tempo"));

    let vdo=JSON.parse(localStorage.getItem("vdo"));
    for(let i=0; i<upgrades.length; i++){
      upgrades[i].comprados=vdo[i].comprados;
      upgrades[i].custoSemArr=vdo[i].custoSemArr;
      upgrades[i].inflacao=vdo[i].inflacao;
      upgrades[i].contribLucro=vdo[i].contribLucro;
    }

    // Aplica upgrades já comprados
    let iuc=JSON.parse(localStorage.getItem("ups"));
    for(let i=0; i<iuc.length; i++){
      aplicarUp(iuc[i]);
    }

    for(let i=0; i<comPopop.length; i++){
      if(comPopop[i].comprados>=Number(comPopop[i].dataset.popopqtd)){
        comPopop[i].dataset.popopqtd="jafoi";
        unlock(txtPop[i].dataset.mostra);
      }
    }
  }
  else {
    zera();
  }
}
load();
refreshAll();


// Setinha!!!

let liEspecifica=document.querySelector("#special");
let setas=document.querySelectorAll(".seta");
/*let portu=document.querySelector("#portu");
let parar;*/

function remover(){
  if(this.comprados>=1||dinheiro>=this.dataset.custo){
    liEspecifica.classList.remove("special");
    liEspecifica.removeEventListener("click",remover);
  }
}
liEspecifica.addEventListener("click",remover);

function alfaceCrespa(){
  for(let i=0; i<setas.length; i++) setas[i].style.bottom=(liEspecifica.offsetHeight-setas[i].offsetHeight)/2+"px";
}


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


// Tela Sobre

let sobre=$("#sobre"),sobrePop=document.querySelector("#sobrePop");
let promo=document.querySelector("#promo");
let ptt=document.querySelectorAll(".ptt");

for(let i=0; i<3; i++){
  ptt[i].v=Number(ptt[i].innerHTML);
}

function set(i,lim,dec=1){
  let x=ptt[i];
  x.lim=lim;
  x.dec=dec;
}
set(2,100);
set(1,60);
set(0,-1);

let ptParar;

function fimPromo(){
  promo.remove();
  clearInterval(ptParar);
}

sobre.click(function () {
  abre(sobrePop);

  function f(i){
    let x=ptt[i];
    if(x.v==0){
      if(i==0){
        fimPromo();
        return;
      }
      x.v=x.lim-x.dec;
      f(i-1);
    }
    else{
      x.v-=x.dec;
    }
    x.innerHTML=x.v<10? "0"+x.v: x.v;
  }

  ptParar=setInterval(function () {
    f(2,100);
  },10);
  clearInterval(pararTempo);
});
let clickme=$("#clickme");

function noitcnuf(){
  dinheiro+=1;
  setTimeout(function () {
    alert("Não dá para saber se você realmente baixou, mas como tem 1% de chance de você ter baixado vamos te dar 1% do dinheiro. Aproveite seu conto!");
  },10);
  mudaDin();
  fimPromo();
  clickme.off("click");
}
clickme.click(noitcnuf);



// Finalizar

function fim(){
  console.log(tempo,dinGasto);
}
