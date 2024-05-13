const a = "{\\\"type\\\":\\\"audio/ogg\\\",\\\"uri\\\":\\\"https://blipmediastore.blob.core.windows.net/secure-medias/Media_8d8e8553-4714-4296-b0cc-79ef00f4e6b8962550132238898?sv=2023-11-03&st=2024-05-10T18%3A33%3A39Z&se=2024-05-10T19%3A03%3A39Z&sr=b&sp=r&sig=sKO4oP1kEGw0VBroYr9O9pdUUrSoyp7sviS%2FuixByaA%3D&secure=true\\\"}"

const b = JSON.parse(a.replace(/\\/g, ''))

console.log(b)