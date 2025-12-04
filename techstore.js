class Produto {
    constructor(id, nome, preco, stock, categoria) {
        this.categoria=categoria
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.stock = stock;
    }
}

let techStore = [
new Produto(1, "Apple Watch", 399.99, 5,"SmartWatch"),
new Produto(2, "Samsung Galaxy 3 Watch", 199.99, 3,"SmartWatch"),
new Produto(3, "Garmin 5", 299.99, 1,"SmartWatch"),
new Produto(4, "Pen Drive 1TB", 79.99, 20, "Armazenamento"),
new Produto(5, "Cartão SD", 34.99, 11, "Armazenamento"),
new Produto(6, "Disco Externo 2TB SSD", 149.99, 4, "Armazenamento"),
new Produto(7, "iPhone 17 PRO MAX", 1399.99, 3, "Telemovéis"),
new Produto(8, "iPhone 16", 799.99, 4, "Telemovéis"),
new Produto(9, "iPhone 15", 499.99, 1, "Telemovéis"),
]
console.log(techStore);

//Produto "Premium": Identificar e devolver os dados do produto mais caro.
function produtoPremium() {
    const produtoMaisCaro = techStore.reduce((max, a) => a.preco > max.preco ? a : max, techStore[0]);
    return produtoMaisCaro;
}
console.log("Produto mais caro:", produtoPremium())

//Repor Stock: Adicionar unidades a um produto já existente.
function reporStock(id, novoStock) {
    const produto = techStore.find(p => p.id === id);
    if (!produto) {
        console.log("Produto não existe!");
        return null;
    }
    produto.stock += novoStock;
    return produto;
}
console.log(reporStock(7, 7))
console.log(techStore)

//Filtro de Categoria: Listar apenas os produtos de uma categoria específica.
function filtrarCategoria(categoria){
    const listaCategoria=techStore.filter(p => p.categoria === categoria);

    return listaCategoria
}
console.log(filtrarCategoria("Armazenamento"))

//Criatividade: Definam e implementem 3 operações adicionais úteis.
//1.BlackFriday 40% Desconto em tudo!
function descontoBlackFriday(produto){
const percentagem=0.40
const produtoComDesconto = produto.preco-(produto.preco*percentagem);
    return produtoComDesconto
}
console.log(`Produto com Desconto: ${techStore[7].nome}, ${descontoBlackFriday(techStore[7]).toFixed(2)} €`);

//2.Carrinho de Compras com total para pagamento.
const carrinho = [
    { produto: techStore[0], quantidade: 1 },
    { produto: techStore[3], quantidade: 2 },
    { produto: techStore[7], quantidade: 1 }
];
console.log("Carrinho:", carrinho);

function recibo() {
    let totalArtigos = carrinho.reduce((acc, n) => acc + n.quantidade, 0);
    let totalCompra = carrinho.reduce((acc, n) => acc + n.produto.preco * n.quantidade, 0);
    console.log(`Tens ${totalArtigos} artigos. Total a pagar: ${totalCompra.toFixed(2)}€`);
}
recibo()

//3.Recibo Formatado para o cliente
function reciboFormatado() {
    console.log("====== TechStore!  ======");
    console.log("A sua tech shop favorita!") 
    let totalCompra = 0;

    carrinho.forEach(item => {
        const nome = item.produto.nome;
        const qtd = item.quantidade;
        const preco = item.produto.preco;
        const subtotal = preco * qtd;
        totalCompra += subtotal;

        console.log(
            `${nome} (x${qtd})......` +
            `${subtotal.toFixed(2)}€`
        );
    });
    console.log(`-------------------------------------`);
    console.log(`TOTAL: ${totalCompra.toFixed(2)}€`);
    console.log("-------------------------------------");
    console.log("Conserve o talão para caso de troca");
    console.log("ou avaria. Obrigado pela preferência!");
    
}
reciboFormatado()