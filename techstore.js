/* Classe que representa um produto */
class Produto {
  constructor(id, nome, preco, stock, categoria) {
    this.categoria = categoria;
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.stock = stock;
  }
}

/* Classe que representa uma tech store */
class TechStore {
  constructor(nome) {
    this.nome = nome;
    this.produtos = [];
    this.historicoVendas = [];
  }

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

      const historico = {
        produto: produto.nome,
        preco: produto.preco,
        categoria: produto.categoria,
        quantidadeVendida: quantidade,
        DataDeVenda: Date.parse("04/12/2015"),
      };

      console.log(historico);
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
      this.produtos[0]
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

  //Filtro de Categoria: Listar apenas os produtos de uma categoria específica.
  filtrarCategoria = function (categoria) {
    const listaCategoria = this.produtos.filter(
      (p) => p.categoria === categoria
    );
    return listaCategoria;
  };
}

//Caça ao Bug (Simulação): Implementem propositadamente um erro de lógica no vosso código.
//Adicionem um comentário a explicar o impacto desse erro no negócio
//e mostrem (com print ou comentário) como usaram o Debugger para o detetar e corrigir.
console.log("\n--- SIMULAÇÃO ---");

const techStore = new TechStore("--- TECH STORE ---");
techStore.produtos = [
  new Produto(1, "Apple Watch", 399.99, 5, "SmartWatch"),
  new Produto(2, "Samsung Galaxy 3 Watch", 199.99, 3, "SmartWatch"),
  new Produto(3, "Garmin 5", 299.99, 1, "SmartWatch"),
  new Produto(4, "Pen Drive 1TB", 79.99, 20, "Armazenamento"),
  new Produto(5, "Cartão SD", 34.99, 11, "Armazenamento"),
  new Produto(6, "Disco Externo 2TB SSD", 149.99, 4, "Armazenamento"),
  new Produto(7, "iPhone 17 PRO MAX", 1399.99, 3, "Telemovéis"),
  new Produto(8, "iPhone 16", 799.99, 4, "Telemovéis"),
  new Produto(9, "iPhone 15", 499.99, 1, "Telemovéis"),
];

console.log(techStore.produtos);

console.log("\nalterar preco");
techStore.alterarPreco(2, 53.23);
console.log(techStore.produtos);

console.log("\nregistar vendas")
techStore.registarVenda(2, 3);
console.log(techStore.produtos)

console.log("\nLimpeza do stock");
techStore.limpezaDoStock();
console.log(techStore.produtos);

let valorInventario = techStore.valorTotalDeInventario();
console.log(`Valor do inventário: ${valorInventario.toFixed(2)} EUR`);

//console.log("Categorias: ", techStore.filtrarCategoria("SmartWatch"));

//Criatividade: Definam e implementem 3 operações adicionais úteis.
//1.BlackFriday 40% Desconto em tudo!
/*function descontoBlackFriday(produto) {
  const percentagem = 0.4;
  const produtoComDesconto = produto.preco - produto.preco * percentagem;
  return produtoComDesconto;
}
console.log(
  `Produto com Desconto: ${techStore[7].nome}, ${descontoBlackFriday(
    techStore[7]
  ).toFixed(2)} €`
);

//2.Carrinho de Compras com total para pagamento.
const carrinho = [
  { produto: techStore[0], quantidade: 1 },
  { produto: techStore[3], quantidade: 2 },
  { produto: techStore[7], quantidade: 1 },
];
console.log("Carrinho:", carrinho);

function recibo() {
  let totalArtigos = carrinho.reduce((acc, n) => acc + n.quantidade, 0);
  let totalCompra = carrinho.reduce(
    (acc, n) => acc + n.produto.preco * n.quantidade,
    0
  );
  console.log(
    `Tens ${totalArtigos} artigos. Total a pagar: ${totalCompra.toFixed(2)}€`
  );
}
recibo();

//3.Recibo Formatado para o cliente
function reciboFormatado() {
  console.log("====== TechStore!  ======");
  console.log("A sua tech shop favorita!");
  let totalCompra = 0;

  carrinho.forEach((item) => {
    const nome = item.produto.nome;
    const qtd = item.quantidade;
    const preco = item.produto.preco;
    const subtotal = preco * qtd;
    totalCompra += subtotal;

    console.log(`${nome} (x${qtd})......` + `${subtotal.toFixed(2)}€`);
  });
  console.log(`-------------------------------------`);
  console.log(`TOTAL: ${totalCompra.toFixed(2)}€`);
  console.log("-------------------------------------");
  console.log("Conserve o talão para caso de troca");
  console.log("ou avaria. Obrigado pela preferência!");
}*/
