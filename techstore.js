class Produto {
  constructor(id, nome, preco, stock) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.stock = stock;
  }
}

class TechStore {
  constructor(nome) {
    this.nome = nome;
    this.produtos = [];
    this.historicoVendas = [];
  }

  //adicionar produtos ao store
  adicionarProduto = function (produto) {
    this.produtos.push(produto);
  };

  //adicionar historico
  adicionarHistoricoDeVendas = function (historico) {
    this.historicoVendas.push(historico);
  };

  //Atualizar Preço: Alterar o preço de um produto específico através do seu identificador.
  alterarPreco = function (id, novoPreco) {
    let produto = this.produtos.find((p) => p.id === id);
    if (produto) {
      produto.preco = novoPreco;
    }
  };

  //Registar Venda: Diminuir o stock E registar a transação no Histórico de Vendas.
  registarVenda = function (id, quantidade) {
    let produto = this.produtos.find((p) => p.id === id);
    if (produto) {
      produto.stock -= quantidade;
    }
  };

  //Valor Total do Inventário: Calcular quanto dinheiro está investido em stock.
  valorTotalDeInventario = function () {
    let somaTotal = this.produtos.reduce(
      (acc, p) => acc + p.stock * p.preco,
      0
    );
    return somaTotal;
  };

  //Limpeza de Stock: Remover automaticamente produtos com 0 unidades.
  limpezaDoStock = function () {
    this.produtos
      .filter((p) => p.stock === 0)
      .forEach((p) => {
        this.produtos.splice(p.id, 1);
      });
  };

  //Produto "Premium": Identificar e devolver os dados do produto mais caro.
  produtoPremium = function () {
    const produtoPremium = this.produtos.reduce(
      (max, a) => (a.preco > max.preco ? a : max),
      techStore[0]
    );
    return produtoPremium;
  };

  //Repor Stock: Adicionar unidades a um produto já existente.
  reporStock = function (id, novoStock) {
    const produto = this.produtos.find((p) => p.id === id);
    if (produto) {
      produto.stock += novoStock;
    }
  };
}

//alterarPreco(1, 25);
//console.log(techStore);

//console.log(reporStock(4, 7));
//console.log(techStore)
//console.log("Produto mais caro:", produtoPremium());

//Caça ao Bug (Simulação): Implementem propositadamente um erro de lógica no vosso código.
//Adicionem um comentário a explicar o impacto desse erro no negócio
//e mostrem (com print ou comentário) como usaram o Debugger para o detetar e corrigir.
console.log("\n--- SIMULAÇÃO ---");

const techStore = new TechStore("--- TECH STORE ---");
techStore.adicionarProduto(new Produto(1, "Apple Watch", 399.99, 5));
techStore.adicionarProduto(new Produto(2, "Pen Drive 1TB", 79.99, 20));
techStore.adicionarProduto(new Produto(3, "Cartão SD", 34.99, 11));
techStore.adicionarProduto(new Produto(4, "iPhone 17 PRO MAX", 1399.99, 3));
console.log(techStore.produtos);

console.log("\nalterar preco");
techStore.alterarPreco(2, 53.23);
console.log(techStore.produtos);

console.log("\nLimpeza do stock");
techStore.limpezaDoStock();
console.log(techStore.produtos);

let valorInventario = techStore.valorTotalDeInventario();
console.log(`Valor do inventário: ${valorInventario.toFixed(2)} EUR`);
