const fs = require('fs')
const path = require('path');
const templates = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'templates.json'), 'utf8'))

const humano = [
  "um_cred_nacessou15d_oferta_014",
  "tomador_credito_104",
  "credito_novo_modelo_frase_curta_104",
  "credito_n_acessou_novomodelo_oferta_104",
  "credito_n_acessou_novomodelo_104",
  "um_cred_nacessou15d_014",
  "pdd_chemp_ad_7d_3103",
  "pdd_giro_30d_3103",
  "pdd_chemp_ad_30d_3103",
  "pdd_giro_60d_3103",
  "pdd_chemp_ad_60d_3103",
  "pdd_chemp_ad_30d_1904",
  "pdd_chemp_ad_60d_1904_atualizado",
  "cred1_nacessou15d_oferta_1904",
  "credito_n_acessou_nvomodelo_oferta_1904",
  "girocartoes_contratacao_abandono_1",
  "girocartoes_contratacao_abandono_2",
  "girocartoes_contratacao_abandono_3",
  "reneg_abandono_1",
  "reneg_abandono_2",
  "reneg_abandono_3",
  "girocartoes_contratacao_abandono_4",
  "girocartoes_contratacao_abandono_5",
  "girocartoes_contratacao_abandono_6",
  "pdd_giro_60d_1904_v1",
  "pdd_giro_7d_3103_v1",
  "pdd_giro_30d_1904_v4",
  "credito_fgi_30_06",
  "credito_fgi_05_07",
  "arvbau_cliente_com_avulsa_ano_geren_atualizado",
  "arvbau_cliente_cancelou_automatica_geren_atualizado",
  "arvbau_cliente_possui_dquinze_dtrinta_geren_atualizados",
  "arvbau_cliente_nunca_antecipou_geren_atualizado",
  "arvbau_cliente_cancelou_automatica_autos",
  "arvbau_cliente_possui_dquinze_dtrinta_autoser",
  "arvbau_cliente_nunca_antecipou_autoser",
  "arvbau_cliente_com_avulsa_ano_autoser",
  "arv_automatico_contratacao_abandono_1",
  "arv_automatico_contratacao_abandono_2",
  "arv_automatico_contratacao_abandono_3",
  "arv_eventual_contratacao_abandono_1",
  "arv_eventual_contratacao_abandono_2",
  "oferta_renegociacao_v2",
  "oferta_arv_v2",
  "oferta_cobranca_v2",
  "oferta_cartao_v2",
  "oferta_giro_v2",
  "receptivo_v2",
  "generico_v2",
  "prospect_open_finance",
  "taxa_esp_arv_emp1_in_1809",
  "taxa_esp_arv_emp1_at_1809",
  "business_apresentacao_gerente",
  "mutirao_vencidos_golden_month",
  "emp_cred_pre_aprovado_v2",
  "link_queda60d_img",
  "arv_ev_aband_espec",
  "arv_aut_aband_espec",
  "arv_aut_aband_autoss",
  "arv_ev_gener_espec",
  "arv_ev_nvo_explic_valor_tx_espec",
  "arv_aut_nvo_explic_valor_espec",
  "emp1_dia_das_maes_credito_pre_aprovado"
]

for (key in templates) { 
  if (humano.includes(key)) {
    const buttons = Object.keys(templates[key])
    if (buttons.length > 1) {
      templates[key][buttons[0]] = '5ffd35a8-bdac-49e1-a44f-a8709c5fcffe'
    } else {
      templates[key] = 'HUmano sem botão'
    }
  }
}

fs.writeFileSync(path.resolve(__dirname, 'templatesX.json'), JSON.stringify(templates))