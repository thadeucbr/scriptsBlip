function run(inputUsuario) {
  const invalidInputMessage = 'input inesperado';
  try {
      if (!inputUsuario) {
          return 'inatividade';
      }

      let regex = /^(\d{1,3}(\.\d{3})*|\d+)(\,\d{1,2})?$/gmi;
      let validInput = new RegExp(regex).test(inputUsuario);

      if (validInput) {
          return "É um valor válido";
      }
      return invalidInputMessage;
  } catch (err) {
      return invalidInputMessage;
  }
}