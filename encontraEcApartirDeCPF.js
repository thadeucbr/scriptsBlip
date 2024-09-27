const cpf_a_ser_consultado = '39053633804';

const createHeaders = (token = null, contentType = "application/json") => {
  const headers = {
    "User-Agent": "Fiddler",
    "Content-Type": contentType,
    "accept": "*/*",
    "Connection": "keep-alive",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    headers["Safra-Bot-ID"] = "Postman";
  }

  return headers;
};

const getAccessToken = async () => {
  const headers = createHeaders(null, "application/x-www-form-urlencoded");
  const body = new URLSearchParams({
    "client_id": "BLIP",
    "grant_type": "client_credentials",
    "client_secret": "ee1f5004-2400-4ab1-9af7-d9168d517204"
  });

  const requestOptions = {
    method: "POST",
    headers,
    body,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://sts-api-hml.safra.com.br/api/oauth/token", requestOptions);
    const result = await response.json();
    return result.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to retrieve access token');
  }
};

const fetchJsonData = async (url, token) => {
  const headers = createHeaders(token);
  const requestOptions = {
    method: "GET",
    headers,
    redirect: "follow"
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}, status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

const getContas = async (cpf, token) => {
  const url = `https://api-hml.safra.com.br/chat-assistente/contas-pessoa-juridica/v1/shortnames-vinculados?cpf=${cpf}`;
  try {
    const data = await fetchJsonData(url, token);
    const contasPromises = data.data.map(({ contas }) =>
      Promise.all(contas.map(({ agencia, conta }) => 
        fetchJsonData(`https://api-hml.safra.com.br/chat-assistente/contas-pessoa-juridica/v1/contas?agencia=${agencia}&conta=${conta}`, token)
      ))
    );

    const contasResults = await Promise.all(contasPromises);
    return contasResults.flat();
  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }
};

const filterContas = (contas) => {
  return contas
    .filter(item => item?.data?.situacaoUsuario !== 'BLOQUEADO')
    .map(item => {
      const { tipoPessoa, baseDocumento, filialCnpj, digitoCpf, codigoAgencia, numeroConta } = item.data;
      const conta = { codigoAgencia, numeroConta };

      if (tipoPessoa === 'PJ') {
        let doc = `${baseDocumento}000${filialCnpj}${digitoCpf < 10 ? '0' : ''}${digitoCpf}`;
        conta.doc = doc.padStart(14, '0');
      }

      return conta;
    })
    .filter(it => it.codigoAgencia && it.numeroConta);
};

const getEstabelecimento = async (conta, token) => {
  const url = `https://api-hml.safra.com.br/chat-assistente/safra-pay/v1/estabelecimentos?cpfCnpj=${conta.doc}`;
  try {
    const result = await fetchJsonData(url, token);
    if (result.data.length > 0) {
      console.log(conta);
    } else {
      console.log('Estabelecimento não encontrado', result);
    }
  } catch (error) {
    console.error('Error fetching establishment:', error);
  }
};

const start = async (cpf) => {
  try {
    const token = await getAccessToken();
    const contas = await getContas(cpf, token);
    const contasFiltradas = filterContas(contas);

    for (const conta of contasFiltradas) {
      await getEstabelecimento(conta, token);
    }
  } catch (error) {
    console.error('Error in main execution:', error);
  }
};

(async () => {
  await start(cpf_a_ser_consultado);
})();
