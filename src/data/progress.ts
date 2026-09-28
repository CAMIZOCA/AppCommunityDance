// Progreso determinístico para alumnos que no sean Sofía (la única con datos
// reales, guardados en el store). Se deriva de un hash simple del id de
// alumno + id de grupo, para que sea estable entre renders y reinicios.
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Devuelve un porcentaje 0-100 estable para (personId, groupId). */
export function hashProgressPercent(personId: string, groupId: string): number {
  return 35 + (hash(`${personId}:${groupId}`) % 61); // rango 35-95
}

/** Cantidad de pasos "aprendidos" derivada del porcentaje, para mostrar n/total. */
export function hashLearnedCount(personId: string, groupId: string, total: number): number {
  const pct = hashProgressPercent(personId, groupId);
  return Math.max(0, Math.min(total, Math.round((pct / 100) * total)));
}
