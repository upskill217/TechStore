/* Classe que representa um produto */
class Produto {
  constructor(id, nome, preco, stock, categoria) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.stock = stock;
    this.categoria = categoria;
  }
}

/* Classe que representa uma tech store */
class TechStore {
  constructor(nome) {
    this.nome = nome;
    this.produtos = [];
    this.historicoVendas = [];
  }

  /* Atualizar Preço: Alterar o preço de um produto específico através do seu identificador. */
  alterarPreco = function (id, novoPreco) {
    //procura o produto pelo id
    let produto = this.produtos.find((p) => p.id === id);
    //se houver produto
    if (produto) {
      //altera o preco do produto
      produto.preco = novoPreco;
    }
  };

  /* Registar Venda: Diminuir o stock E registar a transação no Histórico de Vendas */
  registarVenda = function (id, quantidade) {
    //procura o produto pelo id
    let produto = this.produtos.find((p) => p.id === id);
    //se houver produto e tiver stock suficiente
    if (produto && produto.stock >= quantidade) {
      //diminui o stock do produto
      produto.stock -= quantidade;
      //cria o objeto historico com os dados da venda
      const historico = {
        produto: produto.nome,
        preco: produto.preco,
        quantidadeVendida: quantidade,
        valorTotal: produto.preco * quantidade,
        DataDeVenda: formatarData(new Date("12/04/2015")), //data mm/dd/aaaa formata para dd/mm/aaaa
      }; //adiciona o historico ao array de historicoVendas
      this.historicoVendas.push(historico);
    }
    //retorna o produto vendido
    return produto;
  };

  /* Valor Total do Inventário: Calcular quanto dinheiro está investido em stock */
  valorTotalDeInventario = function () {
    //calcula a soma total do stock * preco de todos os produtos
    let somaTotal = this.produtos.reduce(
      (acc, p) => acc + p.stock * p.preco,
      0
    );
    //devolve a soma total
    return somaTotal;
  };

  /* Limpeza de Stock: Remover automaticamente produtos com 0 unidades. */
  limpezaDoStock = function () {
    //percorre todos os produtos
    for (const produto of this.produtos) {
      //se o stock for 0
      if (produto.stock === 0) {
        //encontra o indice do produto
        const index = this.produtos.indexOf(produto);
        //remove o produto do array
        this.produtos.splice(index, 1);
      }
    }
  };

  /* Produto "Premium": Identificar e devolver os dados do produto mais caro. */
  produtoPremium = function () {
    //inicializa o produto mais caro como o primeiro produto
    let produtoMaisCaro = this.produtos[0];
    //percorre todos os produtos
    for (const produto of this.produtos) {
      //se o preco do produto for maior que o preco do produto mais caro
      if (produto.preco > produtoMaisCaro.preco) {
        //atualiza o produto mais caro
        produtoMaisCaro = produto;
      }
    } //devolve o produto mais caro
    return produtoMaisCaro;
  };

  /* Repor Stock: Adicionar unidades a um produto já existente. */
  reporStock = function (id, novoStock) {
    //procura o produto pelo id
    const produto = this.produtos.find((p) => p.id === id);
    //se houver produto
    if (produto) {
      //adiciona o novo stock ao stock existente
      produto.stock += novoStock;
    }
  };

  /* Filtro de Categoria: Listar apenas os produtos de uma categoria específica. */
  filtrarCategoria = function (categoria) {
    // filtra os produtos pela categoria
    const produtosPelaCategoria = this.produtos.filter(
      (p) => p.categoria === categoria
    );
    // devolve os produtos da categoria
    return produtosPelaCategoria;
  };

  //Criatividade: Definam e implementem 3 operações adicionais úteis.
  //1. BlackFridayDesconto em tudo!
  descontoBlackFriday = function () {
    //percentagem de 40% de desconto
    const percentagem = 0.4;
    //cria uma nova lista com produtos já com descontos, sem alterar a lista original preco com 2 casas decimais
    const produtosComDescontos = this.produtos
      .filter((p) => p.nome)
      .map((p) => ({
        nome: p.nome,
        preco: p.preco,
        precoComDesconto: (p.preco * (1 - percentagem)).toFixed(2),
        stock: p.stock,
      }));
    return produtosComDescontos;
  };
}
//função para formatar data no fromato dd/mm/aaaa
function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

//Caça ao Bug (Simulação): Implementem propositadamente um erro de lógica no vosso código.
//Adicionem um comentário a explicar o impacto desse erro no negócio
//e mostrem (com print ou comentário) como usaram o Debugger para o detetar e corrigir.
function main() {
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

  console.log("\ttodos os produtos");
  console.table(techStore.produtos);

  console.log("\nalterar preco");
  techStore.alterarPreco(2, 53.23);
  console.table(techStore.produtos[1]);

  console.log("\nregistar vendas");
  techStore.registarVenda(2, 3);
  console.table(techStore.produtos);

  console.log("\nHistorico de Vendas");
  console.table(techStore.historicoVendas);

  console.log("\nLimpeza do stock");
  techStore.limpezaDoStock();
  console.table(techStore.produtos);

  let valorInventario = techStore.valorTotalDeInventario();
  console.log(`Valor do inventário: ${valorInventario.toFixed(2)} EUR`);

  console.log("\nProduto Premium");
  console.table(techStore.produtoPremium());

  console.log("\nBlack Friday 40%");
  console.table(techStore.descontoBlackFriday());
}
//Executa a simulação
main();

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
