import type { Match, MatchSubmit } from '@/interfaces/MatchesInterfaces';
import { ref } from 'vue';
import * as yup from 'yup';

// Definir el esquema de validación con Yup
const matchSchema = yup.object({
   // mayor que 0,
    place: yup.number().required('El lugar es requerido').min(1),
    surface: yup.string().required('La superficie es requerida'),
    date: yup.date().required('La fecha es requerida').min(new Date("2024-01-01")),
    player1: yup.number().required('El jugador 1 es requerido').min(1),
    player2: yup.number().required('El jugador 2 es requerido').min(1),
});

// Validar los datos del formulario
const validateMatch = async (match: MatchSubmit ) => {
  try {
    await matchSchema.validateSync(match, { abortEarly: false });
    alert('Formulario válido');
  } catch (error : any) {
    throw error;
  }
};

export { validateMatch };