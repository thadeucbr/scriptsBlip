const run = (input) => {
    const emojisPattern = /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/gmi;

    return input.match(emojisPattern) ? "Sim" : "Nao";
};

//tests
console.log(run("problemas no token")); 