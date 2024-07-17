const dynamicContent = {
  "recipient_type": "individual",
  "type": "document",
  "document": {
    "link": "<MEDIA_URL>", // REQUIRED - URL of image asset on your public server. For better performance, we recommend that you upload your media asset instead.
    // "caption": "<DOCUMENT_CAPTION>", // OPTIONAL - Document caption text.
    "filename": "<DOCUMENT_FILENAME>" // OPTIONAL - Document filename, with extension. The WhatsApp client will use an appropriate file type icon based on the extension.
  }
}
function run() {
  try {
    dynamicContent.document.link = 'https://google.com.br/teste.pdf'
    // dynamicContent.document.caption = 'teste'
    dynamicContent.document.filename = `super_teste_de_pdf.pdf`
    return dynamicContent
  } catch (err) {
    return false
  }
}