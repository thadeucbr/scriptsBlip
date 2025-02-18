function verificaSePassaramXHoras(hora) {
    const horaAtual = new Date();
    const horaEvento = new Date(hora);

    horaEvento.setHours(horaEvento.getHours() + 24);

    if (horaAtual < horaEvento) {
        console.log('Não fazem 24 horas');
    } else {
        console.log('Mais de 24 horas');
    }
}