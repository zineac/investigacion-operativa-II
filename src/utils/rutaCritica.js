function calcularTiempoEsperado(optimista, probable, pesimista) {
  return (optimista + 4 * probable + pesimista) / 6;
}

export const calcularRutaCritica = (actividades) => {
  const tiemposEsperados = {}; // Para almacenar el tiempo esperado de cada actividad
  const tiemposInicio = {};    // Para almacenar el tiempo más temprano de inicio de cada actividad
  const tiemposFin = {};       // Para almacenar el tiempo más temprano de fin de cada actividad

  // Paso 1: Inicializar tiempos para actividades sin predecesores
  actividades.forEach(actividad => {
    tiemposEsperados[actividad.actividad] = calcularTiempoEsperado(actividad.optimista, actividad.probable, actividad.pesimista);
    if (actividad.predecesores.length === 0) {
      tiemposInicio[actividad.actividad] = 0;
      tiemposFin[actividad.actividad] = tiemposEsperados[actividad.actividad];
    }
  });

  // Paso 2: Calcular los tiempos de inicio y fin para el resto de las actividades
  actividades.forEach(actividad => {
    if (actividad.predecesores.length > 0) {
      let maxFinPredecesor = 0;
      actividad.predecesores.forEach(predecesor => {
        maxFinPredecesor = Math.max(maxFinPredecesor, tiemposFin[predecesor]);
      });
      tiemposInicio[actividad.actividad] = maxFinPredecesor;
      tiemposFin[actividad.actividad] = tiemposInicio[actividad.actividad] + tiemposEsperados[actividad.actividad];
    }
  });

  // Paso 3: Identificar la ruta crítica
  const rutaCritica = [];
  let maxTiempoFin = 0;
  let actividadFinal = '';

  // Encontrar la actividad con el mayor tiempo de fin
  actividades.forEach(actividad => {
    if (tiemposFin[actividad.actividad] > maxTiempoFin) {
      maxTiempoFin = tiemposFin[actividad.actividad];
      actividadFinal = actividad.actividad;
    }
  });

  // Trazar hacia atrás desde la actividad final para obtener la ruta crítica
  rutaCritica.push(actividadFinal);
  while (actividades.find(act => act.actividad === actividadFinal).predecesores.length > 0) {
    const predecesores = actividades.find(act => act.actividad === actividadFinal).predecesores;
    let maxPredecesorFin = 0;
    let predecesorCritico = '';
    predecesores.forEach(predecesor => {
      if (tiemposFin[predecesor] > maxPredecesorFin) {
        maxPredecesorFin = tiemposFin[predecesor];
        predecesorCritico = predecesor;
      }
    });
    rutaCritica.push(predecesorCritico);
    actividadFinal = predecesorCritico;
  }

  // Invertir la ruta crítica para mostrarla desde el inicio
  const rutaCriticaFinal = rutaCritica.reverse();

  // Duración total de la ruta crítica
  const duracionTotal = maxTiempoFin;

  return { rutaCritica: rutaCriticaFinal, duracionTotal };
}
