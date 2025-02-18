function verificaSePassaramXHoras(horarioEvento, horarioAtual) {//horarioEvento e horarioAtual devem ser strings no formato provindo de {{calendar.datetime}}
    try {
        const horaAtual = new Date(horarioAtual);
        const horaEvento = new Date(horarioEvento);

        horaEvento.setHours(horaEvento.getHours() + 24);

        if (horaAtual < horaEvento) {
            return 'Não fazem 24 horas';
        } else {
            return 'Mais de 24 horas';
        }
    }
    catch (e) {
        return e.message;
    }
}