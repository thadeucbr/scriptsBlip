function log(cor, msg) {
  const cores = {
    reset: "\x1b[0m",
    vermelho: "\x1b[31m",
    verde: "\x1b[32m",
    amarelo: "\x1b[33m",
    azul: "\x1b[34m",
    magenta: "\x1b[35m",
    ciano: "\x1b[36m",
    branco: "\x1b[37m",
    marrom: "\x1b[33m",
    preto: "\x1b[30m",
    default: "\x1b[39m"
  }
  console.log(cores[cor], msg, cores.reset)
}

function verificarUltimaPublicacao(key, name) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", key);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id": "e6d265bc-d8a3-4c71-901f-545d37248b58",
    "to": "postmaster@msging.net",
    "method": "get",
    "uri": "/buckets/blip_portal:builder_latestpublications"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://msging.net/commands", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const { resource } = JSON.parse(result)
      const { lastInsertedIndex, publications } = resource
      const lastPublicationDate = new Date(publications.find((publication) => publication.index === lastInsertedIndex).publishedAt)

      const currentDate = new Date();
      const isPublishedToday = lastPublicationDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
        lastPublicationDate.getUTCMonth() === currentDate.getUTCMonth() &&
        lastPublicationDate.getUTCDate() === currentDate.getUTCDate();

      if (isPublishedToday) {
        log('verde', `Fluxo publicado ${name}`)
      } else {
        log('vermelho', `Fluxo ${name} não publicado. Última publicação em ${lastPublicationDate}`)
      }
    })
    .catch((error) => console.error(error));
}

module.exports = verificarUltimaPublicacao;