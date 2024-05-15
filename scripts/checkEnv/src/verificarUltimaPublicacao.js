import log from '../../shared/log.js';
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

      const diffInMinutes = Math.abs(currentDate - lastPublicationDate) / 1000 / 60;

      if (isPublishedToday && diffInMinutes <= 10) {
        log('verde', `Fluxo publicado ${name}`)
      } else {
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;
        const diffInWeeks = diffInDays / 7;
        const diffInMonths = diffInDays / 30;

        let timeAgo;
        if (diffInMinutes < 60) {
          timeAgo = `${Math.round(diffInMinutes)} minutos atrás`;
        } else if (diffInHours < 24) {
          timeAgo = `${Math.round(diffInHours)} horas atrás`;
        } else if (diffInDays < 7) {
          timeAgo = `${Math.round(diffInDays)} dias atrás`;
        } else if (diffInWeeks < 4) {
          timeAgo = `${Math.round(diffInWeeks)} semanas atrás`;
        } else {
          timeAgo = `${Math.round(diffInMonths)} meses atrás`;
        }

        log('vermelho', `Fluxo ${name} não publicado. Última publicação em ${lastPublicationDate} (${timeAgo})`)
      }
    })
    .catch((error) => console.error(error));
}

export default verificarUltimaPublicacao;