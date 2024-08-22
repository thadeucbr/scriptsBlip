
function run(ocorrenciasEncontradas) {
    try {
        ocorrenciasEncontradas = JSON.parse(ocorrenciasEncontradas);
        let msg = "De qual protocolo você quer ver mais detalhes? É só informar o número da opção, exemplo: *4*.\n";
        for (let index = 0; index < ocorrenciasEncontradas.length; index++) {
            msg += `\n*${index + 1}*- ${ocorrenciasEncontradas[index].descricaoMotivo} - ${ocorrenciasEncontradas[index].descricaoSubmotivo}
Status: ${getStatus(ocorrenciasEncontradas[index].descricaoStatus)}\n`;
        }
        msg += "\n*0*- Não encontrei o protocolo"
        return msg;
    }
    catch (e) {
        return e.message;
    }
}
function getStatus(status) {
    if (status == 'ABERTO') {
        return "⚠Em aberto"
    }
    if (status == 'ENCERRADO') {
        return "✔Encerrado"
    } else {
        return "🔍Em análise"
    }
}
// function getDataFormatada(data) {
//     let dataHoraInclusao = new Date(data);
//     let dia = ("0" + dataHoraInclusao.getDate()).slice(-2);
//     let mes = ("0" + (dataHoraInclusao.getMonth() + 1)).slice(-2);
//     let ano = dataHoraInclusao.getFullYear();
//     return `${dia}/${mes}/${ano}`;
// };
function getDataFormatada(data) {
    let partes = data.split(/[-\/]/); 
    let ano = parseInt(partes[0], 10);
    let mes = parseInt(partes[1], 10) - 1; 
    let dia = parseInt(partes[2], 10);
    let dataHora = new Date(ano, mes, dia);

    let diaFormatado = ("0" + dataHora.getDate()).slice(-2);
    let mesFormatado = ("0" + (dataHora.getMonth() + 1)).slice(-2);
    let anoFormatado = dataHora.getFullYear();

    return `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
}

let ocorrencias = [
    {
        "id": "29393",
        "idProtocolo": "20230412025178",
        "dataHoraAbertura": "2024-03-21T18:13:23",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ANTECIPAÇÃO",
        "descricaoSubmotivo": "CANCELAMENTO DE ARV EVENTUAL",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-03-28",
        "dataHoraEncerramento": null
    },
    {
        "id": "29313",
        "idProtocolo": "20240307034032",
        "dataHoraAbertura": "2024-03-07T17:02:39",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ANTECIPAÇÃO",
        "descricaoSubmotivo": "CANCELAMENTO DE ARV EVENTUAL",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-03-14",
        "dataHoraEncerramento": "2024-03-07T17:04:02"
    },
    {
        "id": "29164",
        "idProtocolo": "20240214033441",
        "dataHoraAbertura": "2024-02-20T11:57:39",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ARRECADAÇÃO",
        "descricaoSubmotivo": "CANCELAMENTO",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-02-23",
        "dataHoraEncerramento": "2024-02-21T14:51:55"
    },
    {
        "id": "29165",
        "idProtocolo": "20240214033441",
        "dataHoraAbertura": "2024-02-20T12:00:02",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ARRECADAÇÃO",
        "descricaoSubmotivo": "CANCELAMENTO",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-02-23",
        "dataHoraEncerramento": "2024-02-21T14:51:55"
    },
    {
        "id": "29310",
        "idProtocolo": "20240307034029",
        "dataHoraAbertura": "2024-03-07T16:41:43",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ARRECADAÇÃO",
        "descricaoSubmotivo": "CANCELAMENTO",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-03-12",
        "dataHoraEncerramento": "2024-03-28T15:52:14"
    },
    {
        "id": "29297",
        "idProtocolo": "20240306033982",
        "dataHoraAbertura": "2024-03-06T17:23:28",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ARRECADAÇÃO",
        "descricaoSubmotivo": "CANCELAMENTO",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-03-06",
        "dataHoraEncerramento": null
    },
    {
        "id": "29425",
        "idProtocolo": "20240328034615",
        "dataHoraAbertura": "2024-03-28T15:52:18",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ATENDIMENTO",
        "descricaoSubmotivo": "INFORMAÇÃO INCORRETA",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-03-28",
        "dataHoraEncerramento": "2024-04-08T15:28:39"
    },
    {
        "id": "29309",
        "idProtocolo": "20240307034028",
        "dataHoraAbertura": "2024-03-07T16:35:23",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ATENDIMENTO",
        "descricaoSubmotivo": "CONFIGURAÇÃO LAYOUT",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-03-12",
        "dataHoraEncerramento": null
    },
    {
        "id": "29305",
        "idProtocolo": "20240307034018",
        "dataHoraAbertura": "2024-03-07T12:46:59",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "CAÇA POS",
        "descricaoSubmotivo": "TESTE CAÇA",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-03-09",
        "dataHoraEncerramento": "2024-03-28T15:52:14"
    },
    {
        "id": "29427",
        "idProtocolo": "20240328034615",
        "dataHoraAbertura": "2024-03-28T15:52:53",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "CÂMBIO",
        "descricaoSubmotivo": "PROBLEMAS COM O VISTO",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-04-02",
        "dataHoraEncerramento": "2024-04-08T15:28:39"
    },
    {
        "id": "29424",
        "idProtocolo": "20240328034614",
        "dataHoraAbertura": "2024-03-28T15:49:34",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "TESTE MOTIVO",
        "descricaoSubmotivo": "TESTE BACKOFFICE",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-03-28",
        "dataHoraEncerramento": "2024-03-28T15:52:14"
    },
    {
        "id": "29131",
        "idProtocolo": "20240214033441",
        "dataHoraAbertura": "2024-02-14T14:17:00",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "Canais Digitais",
        "descricaoSubmotivo": "INTERNET BANKING",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-02-19",
        "dataHoraEncerramento": "2024-02-14T14:17:29"
    }
]

//tests

//console.log(run(JSON.stringify(ocorrencias)));

console.log(getDataFormatada("2024/04/04"))//Pq está retornando 25/07/2024