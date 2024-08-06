var obj = {
    "Cambio": "cambioonboarding|welcome",
    "Corretora": "Corretora|welcome",
    "Conta Global": "Conta Global|welcome",
    "Renegociação": "principal|6303085c-1873-4c23-a1e3-3f2e9a4f3f3d",
    "Falar com gerente": "principal|abce8f39-55f4-43ef-82d4-bac762680c9c",
    "Outros assuntos": "principal|bbaeedb9-b42a-4691-b57e-d2bd0a20bcd8",
    "Abra sua conta": "principal|4aad23d1-c5ad-4626-bacf-3ae45e2b16d4"
}
function run(destinoIntencoes, intent) {
    try {
        destinoIntencoes = JSON.parse(destinoIntencoes);
        if (!destinoIntencoes[intent]) return {
            "botDestination": "principal",
            "stateDestination": "welcome",
        }; 
        if (destinoIntencoes[intent] == "-") return {
            "botDestination": "principal",
            "stateDestination": "welcome",
        };
        return {
            "destination": destinoIntencoes[intent].split("|")[0],
            "stateDestination": destinoIntencoes[intent].split("|")[1],
        };

    } catch (err) {
        return {
            "destination": "principal",
            "stateDestination": "welcome",
            "error:": err.message,
        };
    }
}
//tests

console.log(run(JSON.stringify(obj), "Cambio")); // Cambio
console.log(run(JSON.stringify(obj), "Corretora")); // Corretora
console.log(run(JSON.stringify(obj), "Renegociação")); // Renegociação
console.log(run(JSON.stringify(obj), "Conta Global")); // Conta Global
console.log(run(JSON.stringify(obj), "Falar com gerente")); // -