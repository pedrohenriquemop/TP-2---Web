let dinheiroSpan = $('#dinheiro');
let botaoPc = $('#pc');
let divPc = $('#div-pc');
let valorDoClique,valorDoSeg;
let dinheiro;
let upgrades = $('.abaDeProdutos :not([data-diferente])>li'); /* "Diferente" é um atributo que pode ser incluído nos elementos UL
para indicar que as opções de compra dentro dele não vão ter o comportamento padrão. As peças e os programadores têm esse
comportamento, enquanto os upgardes não, pois eles têm peculiaridades como poderem ser comprados apenas uma vez, não
proporcionarem lucro diretamente, etc. */
let comPopop=$("[data-indicepopup]"); /* "Indicepopup" é um atributo que indica qual é o popup que está vinculado àquele upgrade.
É um número que é 0 para o primeiro popup, 1 para o segundo e assim por diante, baseado an ordem em que os divs dos popups
(com a classe fundoPop) aparecem no HTML. Esses popups serão exibidos assim que, após uma compra, a propriedade "comprados" do
elemento for maior ou igual ao valor do seu atributo "qtdpopup". Voltando a essa linha de código, seu objetivo é colocar em uma
variável todos os produtos que tenham um popup vinculado a ele (até então, só as memórias rã e o programador de Portugol). */
let qtdCompra=1; /* Quantos produtos estão sendo comprados por clique. Seu valor pode ser alterado pelo usuário através do input
de id "qtosComprar". */
let dinGasto,tempo; /* Variáveis que guardam o tempo de jogo e todo o dinheiro gasto. */
let nAtivouCronometro=true;


// Contagem de tempo

let pararJogo;

function setaTempo(){ /* Retoma contagem de tempo e lucro por segundo. */
  pararJogo=setInterval(function () {
    tempo++;

    if(valorDoSeg){
      dinheiro+=valorDoSeg;
      mudaDin();

      let x=document.createElement("span");
      x.classList.add("numPt");
      x.style.color="#00dfdf";
      divPc.append(x);
      x.innerHTML="+"+valorDoSeg.formata(2);
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
}

function pausa(){
  clearInterval(pararJogo);
}

setaTempo();


// Variáveis conquistas

/* ESTA FUNÇÃO AINDA ESTÁ EM DESENVOLVIMENTO. */

let achClicks=0;
let divsAtualmente=0;

function achievementUnlock(conq){
  conq.tem=true;

  /*let x=document.createElement("section");
  x.className="sans caxaPop ach";
  x.innerHTML="<h2>Conquista desbloqueada!</h2>\
  <h3>"+conq.nom+"</h3>\
  <p>"+conq.dsc+"</p>\
  <div class='btn1 right'><button>VER</button></div>";
  document.body.appendChild(x);*/
}


// Menu!

let lisMenu=document.querySelectorAll("#menu>li");
let divsCentral=document.querySelectorAll(".abaDeProdutos");
const width=100/lisMenu.length+"%";
for(let i=0; i<lisMenu.length; i++) lisMenu[i].style.width=width; /* Ajusta a largura das abas do menu para que fiquem iguais. */

for(let i=0; i<lisMenu.length; i++) /* Troca entre as abas (upgrades, peças, programadores). Se você for adicionar uma nova aba,
(teoricamente) você não vai precisar mexer em nada aqui, só ir no HTML e acrescentar dentro do <div id="central"> um elemento
<section> com determinado ID, e em seguida acrescentar na <ul id="menu"> um elemento <li> com o atributo "data-mostra" igual ao id
que você inventou. */
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
      alfaceCrespa(); // TOP SECRET NÃO MEXE NISSO
      addEventListener("resize",alfaceCrespa);
    }
    else removeEventListener("resize",alfaceCrespa);
  });


// Conquistas. EM DESENVOLVIMENTO

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
      dsc:"Clique 3 vezes em 10 segundos."
    }
  ]
];

for(let i=0; i<conqs[0].length; i++){
  conqs[0][i].tem=false;
}
for(let i=0; i<conqs[1].length; i++){
  conqs[1][i].tem=false;
}


// Popups genéricos

function abre(el){ /* Abre um popup. O parâmetro "el" deve ser o elemento HTML desse popup (um <div> com a classe "fundoPop"). */
  el.classList.remove("pseudoOculto");
  pausa();
}

function fecha(el){
  el.classList.add("pseudoOculto");
  setaTempo();
}

let pops=document.querySelectorAll(".fundoPop"),btnsFechar=document.querySelectorAll(".jsfechar"); /* Faz com que botões de fechar
fechem seus popups. Para incluir essa função em um botão, basta colocar a classe "jsfechar" nele. O botão deve estar dentro de um
<div> de classe "fundoPop" (o div com o fundo perto semitransparente). */
for(let i=0; i<pops.length; i++){
  btnsFechar[i].addEventListener("click",function () {
    fecha(pops[i]);
  });
}


// Popups!

let divPop=document.querySelector("#unlockPopup");
let txtPop=document.querySelectorAll("#unlockPopup section");

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

for(let i=0; i<upgrades.length; i++){ /* Adiciona nas <li>'s que seguem o comportamento padrão uma indicação de seu preço, lucro
gerado e quantidade de compras. */
  upgrades[i].innerHTML+="<div class='descLi'><dl><div><dt>Comprados</dt><dd class='comprados'></div></dd><div><dt>Custo</dt><dd class='custoUpgrade'></dd></div><div><dt>Lucro</dt><dd class='lucro'></dd></div></dl></div>";
}
const custos = $('.custoUpgrade'),
  lucros=$('.lucro'),
  comprados=$(".comprados");
for(let i=0; i<upgrades.length; i++) {
  upgrades[i].ddCusto=custos[i]; // Elemento HTML que contém o custo de cada produto.
  upgrades[i].ddLucro=lucros[i]; // Elemento HTML que contém o lucro de cada produto.
  upgrades[i].ddCompr=comprados[i];  // Elemento HTML que contém o número de compras já feitas de cada produto.
}

Number.prototype.formata=function(cd=-1){ /* Sendo x um real e y um inteiro, x.formata(y) retorna uma string cujo conteúdo é o
  número x com y casas decimais e seus milhares separados por vírgulas. fitz"berg" ce é foda*/
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

function mudaDin(){ /* Atualiza o <span> com o dinheiro do jogador. Chamada sempre que o dinheiro muda. */
  dinheiroSpan.html(dinheiro.formata(2));
}

function comprar(obj){ /* Verifica se custo do elemento obj é menor ou igual ao dinheiro e, se sim, retorna true e o preço é pago. */
  let float=obj.dataset.custo;
  let ret=dinheiro >= float;
  if(ret){
    dinheiro -= float;
    dinGasto+=float;
    mudaDin();
  }
  return ret;
}


function Pagar(e){ /* Função evocada na compra de peças ou programadores (os que seguem o "comportamento padrão"). Faz os devidos
ajustes no preço, valorDoSeg ou valorDoClique, número de objetos comprados... */
  let sht=e.currentTarget;
  if(comprar(sht)){
    sht.custoSemArr+=sht.inflacao*qtdCompra;
    Add(sht);
    refresh(sht);
  }
}

function Add(obj){
  let aumentoDoLucro=parseFloat(obj.dataset.add)*qtdCompra;
  if(obj.parentNode.dataset.autoclick===undefined) valorDoClique += aumentoDoLucro;
  else valorDoSeg+=aumentoDoLucro;
  obj.contribLucro+=aumentoDoLucro;
  obj.comprados+=Number(qtdCompra);
}

function Pc(){
  dinheiro += valorDoClique;
  mudaDin();

  // Conquista
  if(conqs[1][1].tem==false){
    achClicks++;
    setTimeout(function () {
      achClicks--;
    },10000);
    if(achClicks>=3){
      achievementUnlock(conqs[1][1]);
    }
  }
}

function refreshCusto(obj){ /* Atualiza na tela o custo de "obj". */
  let x=(obj.custoSemArr+obj.inflacao*(qtdCompra-1)/2)*qtdCompra;
  obj.ddCusto.innerHTML =x.formata(2)+" contos";
  obj.dataset.custo=x.toFixed(2);
}

function refresh(obj){ /* Atualiza na tela o custo, lucro e quantidade comprada de "obj". */
  refreshCusto(obj);
  obj.ddLucro.innerHTML = parseFloat(obj.dataset.add).formata(2)+" contos";
  obj.ddCompr.innerHTML = obj.comprados;
}

function refreshAll(){ /* Manda um Refresh em todos os elementos do vetor upgrades e atualiza o <span> com o dinheiro do jogador. */
  for(let i=0; i<upgrades.length; i++){
    refresh(upgrades[i]);
  }
  mudaDin();
}

upgrades.click(Pagar);

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

comPopop.click(function(e){ /* Se a quantidade do produto for maior que seu atributo "qtdpopup", abre seu popup e desbloqueia uma
nova aba */
  let short=e.currentTarget.dataset;
  if(short.qtdpopup!="jafoi"&&e.currentTarget.comprados>=Number(short.qtdpopup)){
    abrePopop(Number(short.indicepopup));
    short.qtdpopup="jafoi";
  }
});


// Scroll de comprar mais

let ele=document.querySelector("#qtosComprar");
let eleSpan=document.querySelector("#num");

function inputUpdateVisual(){
  eleSpan.innerHTML=Math.round(ele.value*ele.value);
}
function inputUpdateVar(){
  qtdCompra=Number(eleSpan.innerHTML);
  for(let i=0; i<upgrades.length; i++){
    refreshCusto(upgrades[i]);
  }
}
function updateAll(){
  inputUpdateVisual();
  inputUpdateVar();
}

ele.addEventListener("input",inputUpdateVisual);
ele.addEventListener("change",inputUpdateVar);


// Upgrades!

let ups=$("[data-diferente=\"up\"]>li"); /* A lista de upgrades tem seu atributo "diferente" igual a "up". Esse atributo indica
que os upgrades têm um comportamento próprio de si, e não seguem aquele modelo de lucro, inflação, etc. */
function mult(chosen,mul,ants=true){ /* O primeiro parâmetro é um vetor de elementos HTML. O segundo é o valor pelo qual o lucro
  de cada um dos elementos será multiplicado. O terceiro, opcional, indica se o lucro dos produtos já comprados deve ser
  multiplicado também, caso em que deve ter o valor "true", ou o upgrade afetará apenas novos produtos, caso em que deve ser
  "false". */
  let tem=chosen[0].parentNode.dataset.autoclick;
  for(let i=0; i<chosen.length; i++){
    let velho=Number(chosen[i].dataset.add);
    let novo=velho*mul;
    if(ants){
      if(tem===undefined) valorDoClique+=(mul-1)*chosen[i].contribLucro;
      else valorDoSeg+=(mul-1)*chosen[i].contribLucro;
      chosen[i].contribLucro*=mul;
    }
    chosen[i].dataset.add=novo;
    refresh(chosen[i]);
  }
}

const funcoesUps=[ /* Vetor com funções que serão executadas na compra de cada upgrade, na ordem pela qual os upgrades aparecem
  no HTML. */
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
      valorDoSeg-=chosen[i].contribLucro;
      chosen[i].contribLucro=0;
      chosen[i].comprados=0;
      refresh(chosen[i]);
    }

    let renegade=document.querySelector("#special");
    let ganho=renegade.dataset.add*total;
    valorDoSeg+=ganho;
    renegade.contribLucro+=ganho;
    renegade.comprados+=total;
    refresh(renegade);
  }
];

function aplicarUp(i){ /* Executa a função do upgrade de índice i e remove-o da lista */
  funcoesUps[i]();
  ups[i].classList.add("oculto");
}

for(let i=0; i<ups.length; i++){
  /* Adicionar no HTML dos upgrades uma descrição breve deles, contida no atributo "desc", e o custo, no atributo "custo". */
  ups[i].innerHTML+="<div class='descLi'><p>"+ups[i].dataset.desc+"</p><dl><div><dt>Custo</dt><dd>"+Number(ups[i].dataset.custo).formata(2)+" contos</dd></div></dl></div>";
  /* Event Listeners dos upgrades */
  ups[i].addEventListener("click",function(){
    if(comprar(this)){
      aplicarUp(i);
    }
  });
}


// Save

let saveBtn=document.querySelector("#save");
function save(){ /* Salva todas as variáveis importantes no Local Storage */
  localStorage.setItem("dinheiro",dinheiro);
  localStorage.setItem("valorDoClique",valorDoClique);
  localStorage.setItem("valorDoSeg",valorDoSeg);

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

let resetBtn=document.querySelector("#reset");
resetBtn.addEventListener("click",function () {
  ele.value=1;
  updateAll();
  zera();
  refreshAll();
});


// Load

function zera(){
  for(let i=0; i<upgrades.length; i++){
    upgrades[i].comprados=0;
    upgrades[i].custoSemArr=Number(upgrades[i].dataset.custo); // custoSemArr = custo sem arredondamento
    upgrades[i].inflacao=upgrades[i].custoSemArr/10; // O tanto que o preço aumenta a cada compra
    upgrades[i].contribLucro=0; /* Para guardar a participação de cada tipo de produto no lucro */
  }

  valorDoClique = 0.01;
  valorDoSeg=0.00;
  dinheiro = 0.0;

  dinGasto=0;
  tempo=0;
}

function load(){
  let moni=localStorage.getItem("dinheiro");
  if(moni!=null){
    dinheiro=Number(moni);
    valorDoClique = Number(localStorage.getItem("valorDoClique"));
    valorDoSeg=Number(localStorage.getItem("valorDoSeg"));

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
      if(comPopop[i].comprados>=Number(comPopop[i].dataset.qtdpopup)){
        comPopop[i].dataset.qtdpopup="jafoi";
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


// Tela Sobre. Nada importante aqui.

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
    if(!sobrePop.classList.contains("oculto")) x.innerHTML=x.v<10? "0"+x.v: x.v;
  }

  if(nAtivouCronometro){
    ptParar=setInterval(function () {
      f(2,100);
    },10);
    nAtivouCronometro=false;
  }
  pausa();
});

let clickme=$("#clickme");
clickme.click(function(){
  dinheiro+=1;
  setTimeout(function () {
    alert("Não dá para saber se você realmente baixou, mas como tem 1% de chance de você ter baixado vamos te dar 1% do dinheiro. Aproveite seu conto!");
  },10);
  mudaDin();
  fimPromo();
  clickme.off("click");
});

// parte das Aleatoriedades *********************************************

let aleatorios = document.querySelectorAll("[data-diferente=\"aleat\"]>li")
let spinnerImg = document.querySelector("#spinner")
let tormentaButton = document.querySelector("#tormenta")
let fogoImg = document.querySelector("#fogo")

for(let i = 0; i < aleatorios.length; i++){ // copiei la de cima fitz
  // Copiou mas tirou o ponto e vírgula, né? kk
  aleatorios[i].innerHTML+="<div class='descLi'><p>"+aleatorios[i].dataset.desc+"</p><dl><div><dt>Custo</dt><dd>"+Number(aleatorios[i].dataset.custo).formata(2)+" contos</dd></div></dl></div>"
}


  //mudaDin()
for(let i = 0; i < aleatorios.length; i++){
  aleatorios[i].addEventListener("click", function(){
  console.log("clickou em aleatorios["+i+"]")
  if(comprar(aleatorios[i])){
    funcoesAleatorias[i]()
    aleatorios[i].classList.add("oculto"); /* A função "fecha" é só para os popups porque ela para o tempo e tem outros efeitos
    colaterais */
  }
  })
}

let girando = 1;
let tormenta = 0;
let tormentaOff = 0;
let rodamento=0;
let girarFunc;

const funcoesAleatorias = [ // array com funcoes para as aleatoriedades, me inspirei na de la de cima tambem
  function(){
    console.log("spinner funcionando");
    tormentaButton.classList.remove('oculto')
    spinnerImg.classList.remove('oculto');
    spinnerImg.addEventListener("click",giraSpinner);
  },
  function(){

  },
  function(){

  },
  function() {

  },
  function(){

  }
];

function giraSpinner(){
  if(girando){
    girando = 0;
    girarFunc =setInterval(function(){
      spinnerImg.style.transform="rotateZ("+rodamento+"deg)";
      rodamento+=7;
      if(tormenta){
        spanTormenta();
      }
    }, 1);
  }
  else{
    girando = 1;
    clearInterval(girarFunc);
  }
}

//Tormenta do spinner

tormentaButton.addEventListener("click", ativaTormenta)

function ativaTormenta(e){
  if(!tormentaOff){
    alert('tormentos')
    tormentaOff = 1;
    tormentaButton.innerHTML = "A <em>Tormenta do Spinner</em> está ativa!"
    fogoImg.classList.remove("oculto")
    tormenta = 1;
    spinnerImg.style.backgroundImage = "aleatoriedades/url(fogo.gif)"
    setTimeout(function(){
      spinnerImg.style.backgroundImage = ""
      fogoImg.classList.add("oculto")
      tormentaButton.innerHTML = "A <em>Tormenta do Spinner</em> está carregando"
      tormenta = 0;
    }, 30000)
    setTimeout(function(){
      tormentaOff = 0
      tormentaButton.innerHTML = "Ativar a <em>Tormenta do Spinner</em>"
    }, 60000);
  }
  else if(tormenta == 0){
    alert('ta carregando po calma ai')
  }
}

function spanTormenta(e){
  let valorTormenta = parseFloat((valorDoClique / 20).toFixed(2));
  if(valorTormenta < 0.05) valorTormenta = 0.05;
  dinheiro+=valorTormenta;
  mudaDin();
  let x=document.createElement("span");
  x.classList.add("numPt");
  x.style.color="#ff0000";
  divPc.append(x);
  x.innerHTML="+"+valorTormenta.formata(2);
  let top=(botaoPc.height()-x.offsetHeight)/2;
  x.style.top=top+"px";
  x.style.left=(botaoPc.width()-x.offsetWidth)/2+"px";
  x.style.top=top-120+"px";
  x.style.opacity="0";
  setTimeout(function(){
    x.remove();
  },100);
}
