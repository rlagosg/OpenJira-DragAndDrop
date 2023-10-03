import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const getFormatDistanceToNow = (date: number) => {
    if (isNaN(date)) {
        // Si date no es un número válido, devuelve un mensaje de error o manejo adecuado.
        return 'Fecha inválida';
    }

    const currentDate = new Date(); // Obtenemos la fecha actual

    // Verificamos si date es un número válido en milisegundos
    if (!isNaN(date)) {
        const providedDate = new Date(date); // Convertimos el número en un objeto de fecha

        if (!isNaN(providedDate.getTime())) {
            const fromNow = formatDistanceToNow(providedDate, { locale: es });
            return `hace ${fromNow}`;
        }
    }

    // Si no podemos convertir date en una fecha válida, maneja el error adecuadamente.
    return 'Fecha inválida';
}
