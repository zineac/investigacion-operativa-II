export const calcularRC = (actividades) => {
  const tiemposInicio = {};
  const tiemposFin = {};

  // Paso 1: Inicializar tiempos para actividades sin predecesores
  actividades.forEach(actividad => {
    if (actividad.predecesores.length === 0) {
      tiemposInicio[actividad.actividad] = 0;
      tiemposFin[actividad.actividad] = actividad.tiempoEsperado;
    }
  });

  // Paso 2: Calcular tiempos para actividades con predecesores
  actividades.forEach(actividad => {
    if (actividad.predecesores.length > 0) {
      let maxFinPredecesor = 0;
      actividad.predecesores.forEach(predecesor => {
        maxFinPredecesor = Math.max(maxFinPredecesor, tiemposFin[predecesor]);
      });
      tiemposInicio[actividad.actividad] = maxFinPredecesor;
      tiemposFin[actividad.actividad] = maxFinPredecesor + actividad.tiempoEsperado;
    }
  });

  // Paso 3: Identificar ruta crítica
  const rutaCritica = [];
  let maxTiempoFin = 0;
  let actividadFinal = '';

  actividades.forEach(actividad => {
    if (tiemposFin[actividad.actividad] > maxTiempoFin) {
      maxTiempoFin = tiemposFin[actividad.actividad];
      actividadFinal = actividad.actividad;
    }
  });

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

  return { rutaCritica: rutaCritica.reverse(), duracionTotal: maxTiempoFin };
};
