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

export default log;