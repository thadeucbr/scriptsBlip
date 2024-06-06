const fs = require('fs');
const path = require('path');
function obtemTemplatesWaba(key = "Key cm91dGVyYmV0YXdoYXRzYXBwcGo6Y28yQ3UxSGtoMW9tQVhTejNJSUI=") {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", key);
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "id": "a456-42665544000-0123e4567-e89b-12d3",
    "to": "postmaster@wa.gw.msging.net",
    "method": "get",
    "uri": "/message-templates"
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("https://msging.net/commands", requestOptions)
    .then((response) => response.text())
    .then((result) => fs.writeFileSync(path.resolve(__dirname,'templatesWaba.json'), result))
    .catch((error) => console.error(error));
}

module.exports = obtemTemplatesWaba;