
export const STATUS_LABELS: Record<number, string> = {
  0: "Do zrobienia",
  1: "Zrobione",
};

/** Kolor wizualny zadania na podstawie statusu (do zrobienia = pomarańczowy, zrobione = zielony) */
export const STATUS_COLOR: Record<number, string> = {
  0: "#f59e0b",
  1: "#22c55e",
};

export const PRIORITY_LABELS: Record<number, string> = {
  1: "Niski",
  2: "Średni",
  3: "Wysoki",
};