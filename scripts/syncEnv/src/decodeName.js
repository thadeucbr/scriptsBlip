import log from '../../shared/log.js';
function decodeName(origin, destination) {
  origin = Buffer.from(origin.split(' ')[1], 'base64').toString('utf8');
  destination = Buffer.from(destination.split(' ')[1], 'base64').toString('utf8');
  log('amarelo', `Iniciando atualização\nOrigem:${origin.split(':')[0]}\nDestino:${destination.split(':')[0]}\n\n`);
}

export default decodeName