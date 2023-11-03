// Gold
// renda mensal de R$5000,00 até R$17.999,99.
// tem limite de transação de 5000 reais por dia.

const ContaGold = require("./ContaGold");

describe("Teste da classe ContaGold", () => {
  test("Verificar se a instância ContaGold está sendo criada", () => {
    const conta = new ContaGold();
    expect(conta instanceof ContaGold).toBe(true);
    conta.destruir();
  });

  test("Instanciar conta gold com valores válidos", () => {
    const conta = new ContaGold("1234", "12345", 1000, 7000);
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de sucesso ao criar conta gold", () => {
    const conta = new ContaGold();

    expect(conta.criarConta("1234", "12345", 1000, 7000)).toBe(
      "Conta criada com sucesso"
    );
    expect(conta.getAgencia()).toBe("1234");
    expect(conta.getConta()).toBe("12345");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de ERRO ao criar conta Gold", () => {
    const conta = new ContaGold();
    const operacao = () => conta.criarConta("1234", "345", 1000, 7000);

    expect(operacao).toThrow("Erro no cadastro, dados inválidos");
    conta.destruir();
  });

  test("retorna mensagem de ERRO ao tentar criar conta Gold com renda incompatível", () => {
    const conta = new ContaGold();
    const operacao = () => conta.criarConta("1111", "12345", 1000, 3000);

    expect(operacao).toThrow("Renda não compatível com Conta Gold");
    conta.destruir();
  });

  test("retorna sucesso ao sacar 100 da conta gold", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 7000);

    conta.sacar(100);
    expect(conta.getSaldo()).toBe(900);
    conta.destruir();
  });

  test("retorna mensagem de erro ao sacar -100 da conta gold", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 7000);

    expect(() => conta.sacar(-100)).toThrow("valor inválido para saque");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de sucesso ao depositar 100 na conta", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 6000);

    conta.depositar(100);
    expect(conta.getSaldo()).toBe(1100);
    conta.destruir();
  });

  test("retona mensagem de erro ao depositar -100 da conta", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 6000);

    expect(() => conta.depositar(-100)).toThrow("valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna mensagem de erro ao depositar valor não numérico da conta", () => {
    const conta = new ContaGold();
    conta.criarConta("1234", "12345", 1000, 6000);

    expect(() => conta.depositar(" ")).toThrow("valor inválido para depósito");
    expect(conta.getSaldo()).toBe(1000);
    conta.destruir();
  });

  test("retorna sucesso ao fazer uma transferência com valor válido, saldo sufuciente, dados válidos", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("1234", "12245", 3000, 6000);
    contaReceptor.criarConta("7894", "45678", 1000, 7000);

    const operacao = contaEmissor.transferir(200, "7894", "45678");

    expect(operacao).toBe("Transferência realizada");
    expect(contaEmissor.getSaldo()).toBe(2800);
    expect(contaReceptor.getSaldo()).toBe(1200);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro ao tentar fazer uma transferência acima do limite diário", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("1234", "12245", 6000, 6000);
    contaReceptor.criarConta("7894", "45678", 1000, 7000);

    expect(() => contaEmissor.transferir(5500, "7894", "45678")).toThrow(
      "Valor de transferência acima do limite diário"
    );
    expect(contaEmissor.getSaldo()).toBe(6000);
    expect(contaReceptor.getSaldo()).toBe(1000);

    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("criar chave pix por cpf com sucesso", () => {
    const conta = new ContaGold();
    const operacao = conta.criarChavePix("12345678978", "CPF");

    expect(operacao).toBe("Chave Pix CPF criada com sucesso");
    expect(conta.chavesPix.cpf).toBe("12345678978");
    conta.destruir();
  });

  test("retorna mensagem de erro ao tentar cadastrar chave pix com cpf inválido", () => {
    const conta = new ContaGold();

    expect(() => conta.criarChavePix("123456", "CPF")).toThrow(
      "Erro: CPF Inválido"
    );
    conta.destruir();
  });

  test("criar chave Pis EMAIL com sucesso", () => {
    const conta = new ContaGold();
    const operacao = conta.criarChavePix("roxanie@email.com.br", "EMAIL");

    expect(operacao).toBe("Chave Pix EMAIL criada com sucesso");
    expect(conta.chavesPix.email).toBe("roxanie@email.com.br");
    conta.destruir();
  });

  test("retorna mensagem de ERROo ao tentar cadastrar chave Pix EMAIL inválido", () => {
    const conta = new ContaGold();

    expect(() => conta.criarChavePix("roxanie@email", "EMAIL")).toThrow(
      "Erro: email Inválido"
    );
    conta.destruir();
  });

  test("criar chave Pix TELEFONE com sucesso", () => {
    const conta = new ContaGold();
    const operacao = conta.criarChavePix("(11)917383003", "TELEFONE");

    expect(operacao).toBe("Chave Pix TELEFONE criada com sucesso");
    expect(conta.chavesPix.telefone).toBe("(11)917383003");
    conta.destruir();
  });

  test("retornar mensagem de ERRO ao tentar cadastrar chave Pix TELEFONE inválido", () => {
    const conta = new ContaGold();

    expect(() => conta.criarChavePix("9173854", "TELEFONE")).toThrow(
      "Erro: telefone Inválido"
    );
    conta.destruir();
  });

  test("retorna mensagem de ERRo ao tentar cadastrar chave Pix Inexistente", () => {
    const conta = new ContaGold();

    expect(conta.criarChavePix("inexistente", "INEXISTENTE")).toBe(
      "Chave inexistente"
    );
    conta.destruir();
  });

  test("retorna sucesso ao fazer uma trnasferência via Pix com valor válido, saldo suficiente, dados válidos e limite diário", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000, 7000);
    contaReceptor.criarConta("1111", "56789", 2000, 6000);

    contaReceptor.criarChavePix("roxanie@email.com.br", "EMAIL");

    const operacao = contaEmissor.transferirPix(
      500,
      "roxanie@email.com.br",
      "email"
    );

    expect(operacao).toBe("Transferência realizada");
    expect(contaEmissor.getSaldo()).toBe(500);
    expect(contaReceptor.getSaldo()).toBe(2500);
    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna ERRO ao tentar realizar uma transfereência via Pix com valor acima do limite diário", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 6500, 7000);
    contaReceptor.criarConta("1111", "56789", 1000, 6000);

    contaReceptor.criarChavePix("roxanie@email.com.br", "EMAIL");

    expect(() =>
      contaEmissor.transferirPix(5200, "roxanie@email.com.br", "email")
    ).toThrow("ERRO: Valor acima do limite diário disponível");
    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna ERRO ao tentar realizar uma transferência via Pix com valor inválido", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 1000, 7000);
    contaReceptor.criarConta("0001", "78945", 500, 5500);

    contaReceptor.criarChavePix("12345678977", "CPF");

    expect(() =>
      contaEmissor.transferirPix(-100, "12345678977", "cpf")
    ).toThrow("Valor inválido para transferência");
    expect(contaEmissor.getSaldo()).toBe(1000);
    expect(contaReceptor.getSaldo()).toBe(500);
    contaEmissor.destruir();
    contaReceptor.destruir();
  });

  test("retorna mensagem de erro ao tentar realizar uma transferência acima do valor disponível no saldo", () => {
    const contaEmissor = new ContaGold();
    const contaReceptor = new ContaGold();

    contaEmissor.criarConta("0001", "12345", 500, 7000);
    contaReceptor.criarConta("0001", "78945", 500, 5500);

    contaReceptor.criarChavePix("12345678977", "CPF");

    expect(() => contaEmissor.transferirPix(520, "12345678977", "cpf")).toThrow(
      "Saldo insuficiente para essa transação"
    );
    expect(contaEmissor.getSaldo()).toBe(500);
    expect(contaReceptor.getSaldo()).toBe(500);
    contaEmissor.destruir();
    contaReceptor.destruir();
  });
});
