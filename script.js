let $comprar = $("#comprarPc")
const trabalhos = ["consertar o pecê da tia da prima da irma da amiga da avo da sobrinha da sua mae",
"vender umas memoria rã estragada",
"baixar avast nos pecê da familia",
"desinstalar o baidu dos pecê da familia",
"vender um programa de soma em portugolstudio"]
let dinheiroSpan = $('#dinheiro')
let botaoPc = $('#pc')
let valorDoClique = 0.01
let dinheiro = 0.0
let upgrades = $('#upgrades ul li')

refresh()

function Pagar(e){
  if(dinheiro - parseFloat(e.currentTarget.dataset.custo) >= 0){
    dinhero -= parseFloat(e.currentTarget.dataset.custo)
    return 1;
  }
  else return 0;
}

function Add(e){
  valorDoClique += parseFloat(e.currentTarget.dataset.add)
}

function Pc(e){
  dinheiro += valorDoClique
  refresh()
}

function refresh(){
  dinheiroSpan.html(dinheiro.toFixed(2))
}
if(upgrades.click(Pagar)) upgrades.click(Add)
botaoPc.click(Pc)
