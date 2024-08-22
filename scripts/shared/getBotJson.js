async function getBotJson(key, retries = 5) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", key);
  myHeaders.append("Content-Type", "application/json");

  const fetchWithRetry = async (requestOptions) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch("https://msging.net/commands", requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      } catch (error) {
        if (attempt < retries - 1) {
          const delayTime = Math.pow(2, attempt) * 1000;
          console.log(`Attempt ${attempt + 1} failed. Retrying in ${delayTime / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delayTime));
        } else {
          throw error;
        }
      }
    }
  };

  let raw = JSON.stringify({
    "id": "f09d5ff3-b6b6-441d-ac75-277e3e7c04e7",
    "method": "get",
    "uri": "/buckets/blip_portal:builder_latestpublications"
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const indexResponse = await fetchWithRetry(requestOptions);
  const parsedData = JSON.parse(indexResponse);
  const { resource } = parsedData;
  const index = resource.publications.sort((a, b) => a.publishedAt - b.publishedAt)[0].index;

  raw = JSON.stringify({
    "id": "f09d5ff3-b6b6-441d-ac75-277e3e7c04e7",
    "method": "get",
    "uri": `/buckets/blip_portal:builder_latestpublications:${index}`
  });

  requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const resourceResponse = await fetchWithRetry(requestOptions);
  return JSON.parse(resourceResponse).resource;
}

export default getBotJson;
