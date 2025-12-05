/* Classe que representa um produto */
class Produto {
  constructor(id, nome, preco, stock, categoria) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.stock = stock;
    this.categoria = categoria;
    this.desconto = false;
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
    const produto = this.produtos.find((p) => p.id === id);
    //atualiza o preço do produto
    produto.preco = novoPreco;
    //retorna o produto com o preço atualizado
    return produto;
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
        id: produto.id,
        produto: produto.nome,
        preco: (produto.preco).toFixed(2),
        quantVendida: quantidade,
        desconto: produto.desconto ? "40%" : "N/A",
        valorTotal: (produto.preco * quantidade).toFixed(2),
        DataDeVenda: formatarData(new Date(Date.now())), //data mm/dd/aaaa formata para dd/mm/aaaa
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
    //retorna o produto com o stock atualizado
    return produto;
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
    //aplica 40% de desconto a todos os produtos
    for (let produto of this.produtos) {
      //60% do preço original
      const novoPreco = produto.preco * 0.6;
      //marca o produto como em desconto
      produto.desconto = true;
      //atualiza o preço do produto
      this.alterarPreco(produto.id, novoPreco);
    }
  };

  /* Listar Produtos em Desconto: Listar todos os produtos que estão com desconto. */
  listarProdutosEmDesconto = function () {
    return this.produtos.filter((p) => p.desconto);
  };

  /* Relatório de Vendas Diárias: Gerar um relatório formatado das vendas do dia. */
  relatorio = function () {
    //se não houver vendas
    if (this.historicoVendas.length === 0) {
      //retorna mensagem de nenhuma venda registrada
      return "Nenhuma venda registrada.";
    }
    //para repetir o separador '=' em 70 vezes
    let linha = `${"=".repeat(70)}\n`
    /* \t-> tabulação e \n -> nova linha */
    linha += `\t\t--- RELATÓRIO DE VENDAS DIARIA ---\n`;
    linha += `${"=".repeat(70)}\n`;
    linha += `${this.nome}`;
    linha += `\t\t\t Data do Relatório: ${formatarData(new Date(Date.now()))}\n`;
    linha += `${"=".repeat(70)}\n`;
    linha += `Produto                           │  Qtde  │    Preço    │ Valor Total\n`;
    linha += `${"=".repeat(70)}\n`;
    //agrupar vendas por produto
    const vendasAgrupadas = {};
    //percorrer o historico de vendas
    this.historicoVendas.forEach((venda) => {
      //se o produto já foi vendido antes
      if (vendasAgrupadas[venda.id]) {
        //atualiza a quantidade vendida e o valor total
        vendasAgrupadas[venda.id].quantVendida += venda.quantVendida;
        //soma ao valor total das vendas anteriores
        vendasAgrupadas[venda.id].valorTotal = (parseFloat(vendasAgrupadas[venda.id].valorTotal) + parseFloat(venda.valorTotal)).toFixed(2);
      } //se for a primeira venda desse produto
      else {
        //adiciona a nova venda ao objeto de vendas agrupadas
        vendasAgrupadas[venda.id] = { ...venda };
      }
    });
    Object.values(vendasAgrupadas).forEach((venda) => {
      linha += `├─ ${venda.produto.padEnd(30)} │ ${venda.quantVendida.toString().padStart(3)} un │ ${venda.preco.padStart(10)}€ │ ${venda.valorTotal.padStart(10)}€\n`;
    });
    linha += `${"=".repeat(70)}\n`;
    linha += `TOTAL ${"\t".repeat(7)}      ${this.historicoVendas.
      reduce((sum, v) => sum + parseFloat(v.valorTotal), 0).toFixed(2)}€\n`;
    linha += `${"=".repeat(70)}\n`;
    return linha;
  };
}

//função para formatar data no fromato dd/mm/aaaa
function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

//Caça ao Bug (Simulação): Implementem propositadamente um erro de lógica no vosso código.
//Adicionem um comentário a explicar o impacto desse erro no negócio
//e mostrem (com print ou comentário) como usaram o Debugger para o detetar e corrigir.
function main() {
  console.log("\n\t\t\t--- SIMULAÇÃO ---");

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
  console.log("\nLista de todos os Produtos");
  console.table(techStore.produtos);

  console.log("\nalterar preco");
  console.table(techStore.alterarPreco(2, 133.23));

  console.log("\nregistar vendas antes do Black Friday");
  console.table(techStore.registarVenda(2, 3));
  console.table(techStore.registarVenda(5, 3));
  console.table(techStore.registarVenda(4, 8));
  console.table(techStore.registarVenda(1, 1));

  console.log("\nReposição de Stock");
  console.table(techStore.reporStock(3, 5));
  console.table(techStore.reporStock(9, 2));

  console.log("\nLimpeza do stock");
  techStore.limpezaDoStock();
  console.table(techStore.produtos);

  console.log("\nValor Total do Inventário antes do Black Friday");
  console.log(techStore.valorTotalDeInventario().toFixed(2));

  console.log("\nProduto Premium");
  console.table(techStore.produtoPremium());

  console.log("\nBlack Friday 40%");
  techStore.descontoBlackFriday();
  console.table(techStore.produtos);

  console.log("\nProdutos vendidos no Black Friday 40%");
  console.table(techStore.registarVenda(9, 8));
  console.table(techStore.registarVenda(7, 1));
  console.table(techStore.registarVenda(1, 2));
  console.table(techStore.registarVenda(3, 6));
  console.table(techStore.registarVenda(5, 2));
  console.table(techStore.registarVenda(8, 4));
  console.table(techStore.registarVenda(6, 4));

  console.log("\nHistorico de Vendas já com os descontos aplicados do Black Friday");
  console.table(techStore.historicoVendas);

  console.log("\nReposição de Stock após o Black Friday");
  console.table(techStore.reporStock(1, 7));
  console.table(techStore.reporStock(9, 3));

  console.log("\nLimpeza do stock após o Black Friday");
  techStore.limpezaDoStock();
  console.table(techStore.produtos);

  console.log("\nValor Total do Inventário após o Black Friday");
  console.log(techStore.valorTotalDeInventario().toFixed(2));

  console.log("\nLista de Produtos em Desconto");
  console.table(techStore.listarProdutosEmDesconto());

  console.log("\nFiltro de Categoria: Telemóveis");
  console.table(techStore.filtrarCategoria("Telemovéis"));

  console.log("\nRelatório de Vendas do Dia");
  console.log(techStore.relatorio());

  console.log("\t\t\t--- FIM DA SIMULAÇÃO ---\n");
}

//Executa a simulação
main();