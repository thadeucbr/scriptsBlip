async function start(cpf, key) {
  async function first(cpf) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${key}`);
    myHeaders.append("User-Agent", "Fiddler");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Safra-Bot-ID", "Postman");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const data = await fetch(`https://api-hml.safra.com.br/chat-assistente/contas-pessoa-juridica/v1/shortnames-vinculados?cpf=${cpf}`, requestOptions)
      .then((response) => response.json())
      .then(async ({ data }) => {
        const results = await Promise.all(data.map(async ({ contas }) => {
          return Promise.all(contas.map(({ agencia, conta }) => teste1(agencia, conta)));
        }));
        return results;
      })
      .catch((error) => console.error(error));
    return data;
  }

  async function teste1(agencia, conta) {
    const myHeaders2 = new Headers();
    myHeaders2.append("Authorization", `Bearer ${key}`);
    myHeaders2.append("User-Agent", "Fiddler");
    myHeaders2.append("Content-Type", "application/json");
    myHeaders2.append("Safra-Bot-ID", "Postman");

    const requestOptions2 = {
      method: "GET",
      headers: myHeaders2,
      redirect: "follow"
    };

    try {
      const response = await fetch(`https://api-hml.safra.com.br/chat-assistente/contas-pessoa-juridica/v1/contas?agencia=${agencia}&conta=${conta}`, requestOptions2);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const contaSelecionada = (await first(cpf))
    .flat()
    .filter((item) => item && item.data && item.data.situacaoUsuario !== 'BLOQUEADO')
    .map(item => {
      const { tipoPessoa, baseDocumento, filialCnpj, digitoCpf, codigoAgencia, numeroConta } = item.data;
      const conta = { codigoAgencia, numeroConta };
      if (tipoPessoa === 'PJ') {
        let doc = baseDocumento + "000" + filialCnpj;
        let digito = digitoCpf;
        if (digitoCpf < 10) {
          digito = "0" + digitoCpf;
        }
        conta['doc'] = baseDocumento + "000" + filialCnpj + digito;
        while (conta['doc'].length < 14) {
          conta['doc'] = `0${conta['doc']}`;
        }
      }
      return conta;
    }).filter((it) => it.codigoAgencia != 0 && it.numeroConta != 0);

  async function getEc(contaSelecionada) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${key}`);
    myHeaders.append("User-Agent", "Fiddler");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Safra-Bot-ID", "Postman");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`https://api-hml.safra.com.br/chat-assistente/safra-pay/v1/estabelecimentos?cpfCnpj=${contaSelecionada.doc}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data.length > 0) {
          console.log(contaSelecionada);
        } else {
          console.log('Não encontrado estabelecimento', result);
        }
      })
      .catch((error) => console.error(error));
  }

  contaSelecionada.forEach(async (conta) => {
    await getEc(conta);
  });
}

start('39053633804', 'HKuMO7ddfpbNsqQv8yTXBwoKtg6Q3DrmYfL69GkkkvA5eP3LxwmCxs');