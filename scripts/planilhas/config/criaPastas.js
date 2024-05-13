const fs = require('fs');
const path = require('path');

function criaPastas() {
  const pastas = ['Scripts', 'Variaveis', 'Trackings', 'Requests', 'Fluxos']; // Lista das pastas

  pastas.forEach(pasta => {
    const caminhoPasta = path.resolve(__dirname, pasta);

    // Verifica se a pasta existe
    if (!fs.existsSync(caminhoPasta)) {
      // Se a pasta não existir, cria a pasta
      fs.mkdirSync(caminhoPasta, { recursive: true });
      console.log(`Pasta ${caminhoPasta} criada com sucesso.`);
    }
  });
}

module.exports = { criaPastas }