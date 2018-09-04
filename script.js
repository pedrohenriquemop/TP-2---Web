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
let upgrades = $('#upgrades li')
let $precoUpgrades = $('#upgrades li span')
let podeComprar = false

refresh()

function Pagar(e){
  if(dinheiro - parseFloat(e.currentTarget.dataset.custo) >= 0){
    dinheiro -= parseFloat(e.currentTarget.dataset.custo);
    e.currentTarget.dataset.custo *= 1.6
    refresh(e.currentTarget);
    Add(e.currentTarget);
  }
}

function Add(obj){
  valorDoClique += parseFloat(obj.dataset.add)
}

function Pc(e){
  dinheiro += valorDoClique
  refresh()
}

function refresh(obj){
  dinheiroSpan.html(dinheiro.toFixed(2))
  let custos = document.querySelectorAll('.custoUpgrade')
  for(let i = 0; i < custos.legth; i++){
    custos[i].innerHTML = toString(parseFloat(custos[i].parentNode.dataset.custo).toFixed(2))
  }
}
upgrades.click(Pagar)
botaoPc.click(Pc)
