const tags = {
  'Transferir para: WhatsApp_Suporte_Tecnico': 'WhatsApp_Suporte_Tecnico',
  'Transferir para: WhatsApp_Safrapay_Digital': 'WhatsApp_Safrapay_Digital',
  'Transferir para: WhatsApp_Prata_Bronze_Empresas': 'WhatsApp_Prata_Bronze_Empresas',
  'Transferir para: WhatsApp_Perda_Roubo': 'WhatsApp_Perda_Roubo',
  'Transferir para: WhatsApp_Middle': 'WhatsApp_Middle',
  'Transferir para: WhatsApp_Large_Corporate': 'WhatsApp_Large_Corporate',
  'Transferir para: WhatsApp_Empresas2': 'WhatsApp_Empresas2',
  'Transferir para: WhatsApp_Empresas1': 'WhatsApp_Empresas1',
  'Transferir para: WhatsApp_Default': 'WhatsApp_Default',
  'Transferir para: WhatsApp_Corporate': 'WhatsApp_Corporate',
  'Transferir para: WhatsApp_Caça_POS': 'WhatsApp_Caça_POS',
  'Transferir para: WhatsApp_Atacado': 'WhatsApp_Atacado',
  'Transferir para: Safra_Limites_Operacionais': 'Safra_Limites_Operacionais',
  'Transferir para: Descred_Safrapay_Digital': 'Descred_Safrapay_Digital',
  'Transferir para: Mesa_de_Vendas': 'Mesa_de_Vendas',
  'Transferir para: Descred_Emp1': 'Descred_Emp1',
}

const filasBroadcasts = {
  'Mesa_de_Vendas': [
    'mesa_arv_estabelecimento_natal',
    'mesa_arv_estabelecimento',
    'antecipacao_avulsa_3003',
    'antecipacao_avulsa_pag_func_3003',
    'antecipacao_cancelada_3003',
    'antecipacao_cancelada_pag_func_3003',
    'antecipacao_nunca_antecipou_3003',
    'antecipacao_nunca_antecipou_pag_func_3003',
    'antecipacao_d15_d30_3003',
    'antecipacao_d15_d30_pag_func_3003',
    'arv_eventual_contratacao_abandono_2',
    'arv_eventual_contratacao_abandono_1',
    'arv_automatico_contratacao_abandono_1',
    'arv_automatico_contratacao_abandono_2',
    'arv_automatico_contratacao_abandono_3',
    'taxa_esp_mesaarv_bus_1809_v2',
  ],
  'WhatsApp_Caça_POS': [
    'devolucao_maquinas',
    'devolucao_maquinas_v2',
    'devolucao_maquinas_v3',
  ],
  'whatsapp_caca_canceladas': [
    'caca_pos_nao_inatividade',
    'caca_pos_nao_inatividade_v2',
    'caca_pos_nao_inatividade_v3',
  ],
}

const filasPorSegmento = {
  digital: [5, 18, 19, 21],
  atacado: [8, 11, 13],
  empresas: [14, 6, 7, 10, 16, 20, 22, 30],
  largeCorporate: [1, 2, 4, 15]
}

const filasPorInput = {
  'Perda ou Roubo': 'WhatsApp_Perda_Roubo',
  'Suporte Tecnico': 'WhatsApp_Suporte_Tecnico',
  'Descredenciamento': 'Descred_Emp1',
  'Vendas Online': 'Whatsapp_TEF_Ecommerce',
}

const segmentosExclusivos = {
  3: 'WhatsApp_Corporate',
  9: 'WhatsApp_Middle',
  17: 'WhatsApp_Empresas2',
}
function run(numeroSegmento, naoCliente, inputIntencao, tag, broadcast, logistica, template) {

  numeroSegmento = parseInt(numeroSegmento)

  if (tag) {
    if (tags[tag]) {
      return tags[tag]
    }
  }

  if (broadcast || template) {
    if (filasBroadcasts.Mesa_de_Vendas.includes(broadcast) || filasBroadcasts.Mesa_de_Vendas.includes(template)) {
      return "Mesa_de_Vendas"
    }
    if (filasBroadcasts.WhatsApp_Caça_POS.includes(broadcast) || filasBroadcasts.WhatsApp_Caça_POS.includes(template)) {
      return "WhatsApp_Caça_POS"
    }
    if (filasBroadcasts.whatsapp_caca_canceladas.includes(broadcast) || filasBroadcasts.whatsapp_caca_canceladas.includes(template)) {
      return "whatsapp_caca_canceladas"
    }
  }

  if (logistica == "sim") {
    return "WhatsApp_Suporte_Tecnico"
  }

  if (filasPorInput[inputIntencao]) { 
    return filasPorInput[inputIntencao]
  }

  if (filasPorSegmento.digital.includes(numeroSegmento)) {
    if (inputIntencao == "Descredenciamento") {
      return "Descred_Safrapay_Digital"
    }
    return "WhatsApp_Safrapay_Digital"
  }

  if (filasPorSegmento.empresas.includes(numeroSegmento)) {
    return "WhatsApp_Empresas1";
  }

  if (segmentosExclusivos[numeroSegmento]) {
    return segmentosExclusivos[numeroSegmento]
  }

  if (filasPorSegmento.atacado.includes(numeroSegmento)) {
    return "WhatsApp_Atacado";
  }

  if (filasPorSegmento.largeCorporate.includes(numeroSegmento)) {
    return "WhatsApp_Large_Corporate"
  }

  if (naoCliente == 'true') {
    return "Mesa_de_Vendas";
  }

  return "WhatsApp_Default";
}