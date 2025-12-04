class Produto {
    constructor(id,nome,preco,stock) {
        this.id=id;
        this.nome=nome;
        this.preco=preco;
        this.stock=stock;
    }
}

let techStore=[];
techStore.push(new Produto(1,"Apple Watch",399.99,5));
techStore.push(new Produto(2,"Pen Drive 1TB",79.99,20));
techStore.push(new Produto(3,"Cartão SD", 34.99,11))
techStore.push(new Produto(4,"iPhone 17 PRO MAX", 1399.99,3))
console.log(techStore);

function produtoPremium(){
        const produtoPremium=techStore.reduce((max,a)=>a.preco>max.preco? a:max,techStore[0]);
        console.log("Produto mais caro:",produtoPremium);
        return produtoPremium;
}
produtoPremium()

function reporStock(id, novoStock){
    const produto=techStore.find(p => p.id === id);
    if(!produto){
        console.log("Produto não encontrado!");
        return null;
    }
    produto.stock=novoStock;
    return produto;
}
console.log(reporStock(4,7))

