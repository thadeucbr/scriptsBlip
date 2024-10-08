function run(inputContent, templates, broadcastOrigem) {
    try {
        const parsedTemplates = JSON.parse(templates)
        const broadcast = parsedTemplates[broadcastOrigem]
        let blockDestionationId = '2263fe56-a32f-46e4-9eed-70ebb05ade8f'// [BC.0.0.1] Entrada organica
        if (broadcast) {
            let id = broadcast[inputContent]
            if (id) {
                blockDestionationId = id
            }
            else if (broadcast["inicio display"]) {
                blockDestionationId = "34c56f71-e624-4181-93bf-37099360c830"; // Redirecionar Inicio Display Independente de Existir Botão
            }
            else {
                blockDestionationId = broadcast
            }

        }

        if (blockDestionationId.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)) {
            return blockDestionationId
        }
        return '2263fe56-a32f-46e4-9eed-70ebb05ade8f'// [BC.0.0.1] Entrada organica
    } catch (err) {
        return '2263fe56-a32f-46e4-9eed-70ebb05ade8f'// [BC.0.0.1] Entrada organica
    }
}

//tests

let inputContent = 'Agora não posso';
let templates = {
    "bd_safrapay_11": {

    },
    "novaurapj_vop1000maior60dias": {

    },
    "safrapay_varejo_maquinaadicional_pedido_cancelado_v1_": {
        "Falar com atendente": "449e71de-a279-4ed5-9d44-33d273412a70",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "novaurapj_tecnico_naoliga": {},
    "safrapay_varejo_maquinaadicional_aguardando_serial_v1_": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_maquinaadicional_pedido_entregue_v1_": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "devolucao_maquinas": {
        "Falar agora": "",
        "Não posso agora": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_eventual_contratacao_abandono_2": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_eventual_contratacao_abandono_1": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_automatico_contratacao_abandono_3": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_automatico_contratacao_abandono_2": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_automatico_contratacao_abandono_1": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "preventivo_credito_3d_3103_v2": {
        "Preciso de ajuda": "",
        "Estou ciente": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "connect_lanc_img": {
        "Quero Saber Mais": "",
        "Não tenho Interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_avulsa_3003": {
        "Quero falar": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_maquinaadicional_pedido_gerado_previsao_entrega_v1_": {},
    "new_age_acesse_uso": {
        "Safra Empresas": ""
    },
    "boas_vindas_mbj_ibj_v2": {
        "Material Boas Vindas": ""
    },
    "link_rentabilizacao": {
        "Gerar Link Pagamento": ""
    },
    "link_vestuario": {
        "Gerar Link Pagamento": ""
    },
    "link_turismo": {
        "Gerar Link Pagamento": ""
    },
    "link_prospeccao": {
        "Gerar Link Pagamento": ""
    },
    "link_onboarding_d10": {
        "Gerar Link Pagamento": "",
        "Chamar Especialista": ""
    },
    "link_onboarding_d5_": {
        "Gerar Link Pagamento": ""
    },
    "link_onboarding_d2_copia": {
        "Gerar Link Pagamento": ""
    },
    "reativacao_emp1": {
        "Falar agora": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "reativacao_emp1_v2": {
        "Falar agora": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "boas_vindas_resumo": {
        "Falar com Gerente": "",
        "Falar Depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_black_november": {
        "Possuo interesse": "",
        "Não possuo interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_pos_black_november": {
        "Possuo interesse": "",
        "Não possuo interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "seguro_empresarial_emp1": {
        "Quero saber mais": "",
        "Não possuo interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "giro_fimdeano_emp": {
        "Quero saber mais": "",
        "Não possuo interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "link_pagamento_fimdeano": {
        "Quero saber mais": "",
        "Não possuo interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_fimdeano": {
        "Quero saber mais": "",
        "Não tenho interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "cartoes_credito_ativo_0505": {
        "Quero saber mais": "",
        "Não possuo interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "link_queda60d_img": {
        "Quero Falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não tenho interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arvbau_cliente_com_avulsa_ano_geren_atualizado": {
        "Quero Falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arvbau_cliente_cancelou_automatica_geren_atualizado": {
        "Quero Falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arvbau_cliente_possui_dquinze_dtrinta_geren_atualizados": {
        "Quero Falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arvbau_cliente_nunca_antecipou_geren_atualizado": {
        "Quero Falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "taxa_esp_arv_emp1_at_1809": {
        "Quero aproveitar!": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso.": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "taxa_esp_arv_emp1_in_1809": {
        "Quero aproveitar!": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso.": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_aut_nvo_explic_valor_espec": {
        "Saber Mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_ev_nvo_explic_valor_tx_espec": {
        "Saber Mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_ev_gener_espec": {
        "Saber Mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_aut_aband_espec": {
        "Consultar Oferta": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_ev_aband_espec": {
        "Consultar Oferta": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "um_cred_nacessou15d_oferta_014": {
        "Quero falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Falar depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "tomador_credito_104": {
        "Quero simular": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Falar depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "credito_novo_modelo_frase_curta_104": {
        "Quero conhecer": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Falar depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "credito_n_acessou_novomodelo_oferta_104": {
        "Quero falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Falar depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "credito_n_acessou_novomodelo_104": {
        "Quero simular": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Falar depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "um_cred_nacessou15d_014": {
        "Quero falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Falar depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "pdd_chemp_ad_30d_1904": {
        "Ver minhas opções": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Estou ciente": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "pdd_chemp_ad_60d_1904_atualizado": {
        "Ver opções": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Pagar no App": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "cred1_nacessou15d_oferta_1904": {
        "Quero falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Falar depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "credito_n_acessou_nvomodelo_oferta_1904": {
        "Quero falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Falar depois": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "reneg_abandono_3": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "reneg_abandono_2": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "reneg_abandono_1": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "girocartoes_contratacao_abandono_3": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "girocartoes_contratacao_abandono_2": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "girocartoes_contratacao_abandono_1": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "girocartoes_contratacao_abandono_4": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "girocartoes_contratacao_abandono_5": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "girocartoes_contratacao_abandono_6": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "pdd_giro_60d_1904_v1": {
        "Ver opções": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Pagar no App": ""
    },
    "pdd_giro_7d_3103_v1": {
        "Ver opções": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Pagar no App": ""
    },
    "pdd_giro_30d_1904_v4": {
        "Ver minhas opções": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Estou ciente": "?"
    },
    "credito_fgi_30_06": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "credito_fgi_05_07": {
        "Saber mais": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "oferta_arv_v2": {
        "Sim": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "generico_v2": {
        "Sim": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "receptivo_v2": {
        "Sim": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "oferta_giro_v2": {
        "SIm": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "oferta_cartao_v2": {
        "Sim": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "oferta_cobranca_v2": {
        "Sim": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "oferta_renegociacao_v2": {
        "Sim": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "business_apresentacao_gerente": {
        "Sim": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "mutirao_vencidos_golden_month": {
        "Quero falar": "5ffd35a8-bdac-49e1-a44f-a8709c5fcffe",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "business_oferta_cobranca": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "business_oferta_arv": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "business_oferta_renegociacao": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "business_oferta_giro": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "business_apresentacao_gerentes": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "business_generico": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "pesquisa_pix_emp": {
        "Responder Pesquisa": ""
    },
    "safrapay_varejo_manutencaoaluguel_pedido_cancelado_cobrancas_v1_": {
        "Falar com atendente": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_suprimentos_pedido_cancelado_v1_": {
        "Falar com atendente": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_desinstalacao_pedido_cancelado_v1_": {
        "Falar com atendente": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "arv_day_01_v1": {
        "Quero simular": "",
        "Não posso agora": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "novaurapj_tecnico_comunicacao": {},
    "novaurapj_tecnico_simcard": {},
    "novaurapj_tecnico_configuracaowifi": {},
    "novaurapj_financeiro_recebimentos": {},
    "novaurapj_financeiro_antecipacao": {},
    "novaurapj_financeiro_extrato": {},
    "novaurapj_financeiro_dadoscadastrais": {},
    "novaurapj_solucoesdigitais_linkpagamento": {},
    "novaurapj_solucoesdigitais_gateway": {},
    "safrapay_varejo_maquinaadicional_mercadoria_recebida_na_base_v1_": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_maquinaadicional_em_transito_entrega_v1_": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_maquinaadicional_ultima_tentativa_entrega_v1_": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_maquinaadicional_problema_entrega_v1_": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_manutencaoaluguel_problema_retirada_pedido_v1_": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_suprimentos_em_transito_entrega_v1_": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_suprimentos_ultima_tentativa_entrega_v1_": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_manutencaoaluguel_ultima_tentativa_visita_v1": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_desinstalacao_ultima_tentativa_retirada_v1": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_manutencaoaluguel_em_transito_tecnico_v1": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_desinstalacao_em_transito_tecnico_v1": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_desinstalacao_pedido_reagendamento_v2": {
        "Saber mais": "",
        "Finalizar": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_manutencaoaluguel_pedido_entregue_maquina_v1_": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_suprimentos_entrega_suprimento_v1_": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "safrapay_varejo_desinstalacao_entrega_maquina_v1_": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "caca_pos_nao_inatividade": {
        "Falar agora": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "mesa_arv_estabelecimento_natal": {
        "Tenho interesse": "",
        "Não tenho interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "mesa_arv_estabelecimento": {
        "Tenho interesse": "",
        "Não tenho interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "taxa_esp_mesaarv_bus_1809_v2": {
        "Quero aproveitar!": "",
        "Agora não posso.": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "connect_lanc_vid": {
        "Quero Saber Mais": "",
        "Não tenho Interesse": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "connect_lan_txt": {},
    "antecipacao_avulsa_pag_func_3003": {
        "Quero falar": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_cancelada_3003": {
        "Quero falar": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_cancelada_pag_func_3003": {
        "Quero falar": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_nunca_antecipou_3003": {
        "Quero falar": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_nunca_antecipou_pag_func_3003": {
        "Quero falar": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_d15_d30_3003": {
        "Quero falar": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "antecipacao_d15_d30_pag_func_3003": {
        "Quero falar": "",
        "Agora não posso": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "teste_mislene": {
        "Sim": "",
        "Não": "430460cd-7e3d-4b0a-ba61-e2f6a2da38f7"
    },
    "teste_victor": {
        "inicio display": "34c56f71-e624-4181-93bf-37099360c830"
    },
    "safrapay_varejo_manutencaoaluguel_pedido_gerado_atendimento_v1_": {},
    "safrapay_varejo_suprimentos_pedido_gerado_previsao_entrega_v1_": {},
    "safrapay_varejo_desinstalacao_pedido_gerado_atendimento_v1_": {},
    "safrapay_digital_manutencaoaluguel_pedido_gerado_atendimento_": {},
    "safrapay_digital_maquina_adicional_pedido_gerado_previsao_entrega_": {},
    "safrapay_digital_desinstalacao_pedido_gerado_atendimento_": {},
    "safrapay_digital_suprimentos_pedido_gerado_previsao_entrega_": {}
}
let broadcastOrigem = "teste_victor";

console.log(run(inputContent, JSON.stringify(templates), broadcastOrigem));