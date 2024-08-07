function run(numeroProtocolo,bodyConsultaProtocoloLista) {
    try {
        var data = JSON.parse(bodyConsultaProtocoloLista).data;
        var listaDeOcorencias = data.filter(item => item.idProtocolo === numeroProtocolo);
        if (listaDeOcorencias.length === 0) {
            return [];
        }
        else{
            return listaDeOcorencias;
        }
    }
    catch (err) {
        return err.message;
    }
};


var objUnico = {
    "data": [
        {
            "id": "29650",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T11:47:33",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T11:48:11"
        },
        {
            "id": "29651",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T11:54:21",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:15:28"
        },
        {
            "id": "29652",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:18:58",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:19:11"
        },
        {
            "id": "29653",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:19:35",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:19:42"
        },
        {
            "id": "29654",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:22:45",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:23:04"
        },
        {
            "id": "29655",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:25:56",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:26:07"
        },
        {
            "id": "29656",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:27:27",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:27:54"
        },
        {
            "id": "29657",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:28:43",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:29:43"
        },
        {
            "id": "29658",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:33:18",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:35:06"
        },
        {
            "id": "29659",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:36:29",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:36:58"
        },
        {
            "id": "29660",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:39:20",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:41:01"
        },
        {
            "id": "29661",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:41:35",
            "descricaoStatus": "ENCERRADO",
            "descricaoMotivo": "ARRECADAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-23",
            "dataHoraEncerramento": "2024-05-20T12:42:23"
        },
        {
            "id": "29662",
            "idProtocolo": "20240510035612",
            "dataHoraAbertura": "2024-05-20T12:46:16",
            "descricaoStatus": "ABERTO",
            "descricaoMotivo": "ANTECIPAÇÃO",
            "descricaoSubmotivo": "CANCELAMENTO DE ARV EVENTUAL",
            "motivoResolucao": null,
            "dataPrevistaEncerramento": "2024-05-20",
            "dataHoraEncerramento": null
        }
    ]
}
var objLista = {
    "data": [
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
}

var numeroProtocolo = "20240214033441";
console.log(run(numeroProtocolo,JSON.stringify(objLista)));