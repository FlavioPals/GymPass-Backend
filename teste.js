const produtos = [
    {name:'caneta1', price: 10, fragil: true},
    {name:'caneta2', price: 20, fragil: true },
    {name:'caneta3', price: 30, fragil: false},
    {name:'caneta4', price: 40, fragil: false},
]



function adicionarDesconto(produtos, desconto){
    for(let i = 0; i < produtos.length; i++){
        console.log(produtos[i].price * desconto)
    }
}
adicionarDesconto(produtos, 0.5)
let p = []
console.log(
    produtos.reduce(
        (p, a) => [p.push(a)],
    )
)