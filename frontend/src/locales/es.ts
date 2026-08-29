/**
 * Spanish language strings for the Tennis App.
 * Organized by feature/component for better maintainability.
 *
 * @fileoverview Contains all Spanish text strings used throughout the application
 * @author Your Name
 * @version 1.0.0
 */

export default {
  /**
   * Common strings used across multiple components
   */
  common: {
    loading: 'Cargando...',
    error: 'Ha ocurrido un error',
    retry: 'Reintentar',
    close: 'Cerrar',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    add: 'Añadir',
    search: 'Buscar',
    filter: 'Filtrar',
    clear: 'Limpiar',
    confirm: 'Confirmar',
    yes: 'Sí',
    no: 'No',
    today: 'Hoy',
    yesterday: 'Ayer',
    daysAgo: 'Hace {days} días',
    actions: 'Acciones'
  },

  /**
   * Place-related strings
   */
  places: {
    /**
     * Place information dialog strings
     */
    infoDialog: {
      title: 'Información del Lugar',
      fields: {
        id: 'ID',
        name: 'Nombre',
        address: 'Dirección',
        surface: 'Superficie'
      },
      matches: {
        title: 'Partidos jugados en este lugar',
        loading: 'Cargando partidos...',
        empty: 'Aún no se han jugado partidos en este lugar.',
        error: 'Error al cargar los partidos',
        retry: 'Reintentar',
        columns: {
          player1: 'Jugador 1',
          player2: 'Jugador 2',
          date: 'Fecha',
          winner: 'Ganador'
        },
        changePlace: 'Cambiar lugar'
      },
      editPlace: {
        title: 'Cambiar Lugar del Partido',
        currentPlace: 'Lugar actual',
        newPlace: 'Nuevo lugar',
        selectPlace: 'Selecciona un nuevo lugar',
        updatePlace: 'Actualizar Lugar',
        warning: 'Esta acción cambiará permanentemente el lugar donde se jugó este partido. Esta acción no se puede deshacer.',
        success: 'Lugar del partido actualizado correctamente',
        error: 'No se pudo actualizar el lugar del partido'
      }
    },
    /**
     * Places panel strings
     */
    panel: {
      title: 'Lugares',
      addButton: 'Añadir Lugar',
      editButton: 'Editar',
      deleteButton: 'Eliminar',
      noPlaces: 'No se encontraron lugares'
    },
    /**
     * Add/edit place dialog strings
     */
    form: {
      createTitle: 'Crear lugar',
      editTitle: 'Actualizar lugar',
      name: 'Nombre',
      address: 'Dirección',
      city: 'Ciudad',
      error: 'No se pudo guardar el lugar. Inténtalo de nuevo.'
    }
  },

  /**
   * Match-related strings
   */
  matches: {
    /**
     * Matches panel strings
     */
    panel: {
      title: 'Últimos partidos',
      addButton: 'Añadir Partido',
      columns: {
        player1: 'Jugador 1',
        player2: 'Jugador 2',
        place: 'Pista',
        result: 'Resultado'
      },
      loading: 'Cargando partidos...',
      empty: 'No se encontraron partidos',
      error: 'Error al cargar los partidos'
    },
    /**
     * Match info dialog strings
     */
    infoDialog: {
      title: 'Información del Partido',
      statistics: 'Estadísticas',
      sets: 'Sets',
      games: 'Juegos',
      matchLine: 'Línea de partido',
      close: 'Cerrar'
    }
  },

  /**
   * Competition-related strings
   */
  competitions: {
    /**
     * Add competition dialog strings
     */
    form: {
      createTitle: 'Crear competición',
      name: 'Nombre',
      startDate: 'Fecha inicio',
      endDate: 'Fecha fin',
      error: 'No se pudo crear la competición. Inténtalo de nuevo.'
    }
  },

  /**
   * Player-related strings
   */
  players: {
    /**
     * Players panel strings
     */
    panel: {
      title: 'Jugadores',
      addButton: 'Añadir Jugador',
      columns: {
        name: 'Nombre',
        ranking: 'Ranking',
        matches: 'Partidos'
      }
    },
    /**
     * Add/edit player dialog strings
     */
    form: {
      createTitle: 'Crear jugador',
      editTitle: 'Actualizar jugador',
      name: 'Nombre',
      forehand: 'Mano preferida',
      handRight: 'Derecha',
      handLeft: 'Izquierda',
      error: 'No se pudo guardar el jugador. Inténtalo de nuevo.'
    },
    /**
     * Player information dialog strings
     */
    infoDialog: {
      fields: {
        id: 'ID',
        forehand: 'Mano preferida'
      },
      stats: {
        title: 'Estadísticas',
        matchesPlayed: 'Partidos jugados',
        matchesWon: 'Partidos ganados',
        winPercentage: '% de victorias',
        setsWon: 'Sets ganados',
        gamesWon: 'Juegos ganados',
        pointsWinPercentage: '% de puntos ganados'
      },
      matches: {
        title: 'Partidos recientes',
        empty: 'Este jugador todavía no tiene partidos registrados.'
      }
    }
  },

  /**
   * Navigation and menu strings
   */
  navigation: {
    home: 'Inicio',
    players: 'Jugadores',
    matches: 'Partidos',
    places: 'Lugares',
    competitions: 'Competiciones',
    statistics: 'Estadísticas'
  },

  /**
   * Form validation messages
   */
  validation: {
    required: 'Este campo es obligatorio',
    email: 'Por favor ingresa un email válido',
    minLength: 'La longitud mínima es {min} caracteres',
    maxLength: 'La longitud máxima es {max} caracteres',
    numeric: 'Por favor ingresa un número válido',
    positiveNumber: 'Por favor ingresa un número positivo'
  },

  /**
   * Success and error messages
   */
  messages: {
    success: {
      saved: 'Datos guardados exitosamente',
      deleted: 'Datos eliminados exitosamente',
      updated: 'Datos actualizados exitosamente',
      created: 'Datos creados exitosamente'
    },
    error: {
      saveFailed: 'Error al guardar los datos',
      deleteFailed: 'Error al eliminar los datos',
      updateFailed: 'Error al actualizar los datos',
      createFailed: 'Error al crear los datos',
      networkError: 'Error de red',
      serverError: 'Error del servidor',
      unknownError: 'Ha ocurrido un error desconocido'
    }
  }
} as const;
