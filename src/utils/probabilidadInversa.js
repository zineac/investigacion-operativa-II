// Objeto de mapeo de valores críticos de la distribución normal estándar
const valoresCriticos = {
  0.0: -Infinity,
  0.01: -2.326,
  0.02: -2.054,
  0.03: -1.880,
  0.04: -1.751,
  0.05: -1.645,
  0.06: -1.554,
  0.07: -1.476,
  0.08: -1.403,
  0.09: -1.335,
  0.10: -1.282,
  0.11: -1.227,
  0.12: -1.178,
  0.13: -1.150,
  0.14: -1.055,
  0.15: -1.044,
  0.16: -0.994,
  0.17: -0.954,
  0.18: -0.915,
  0.19: -0.878,
  0.20: -0.842,
  0.21: -0.806,
  0.22: -0.773,
  0.23: -0.743,
  0.24: -0.716,
  0.25: -0.674,
  0.26: -0.645,
  0.27: -0.617,
  0.28: -0.579,
  0.29: -0.553,
  0.30: -0.524,
  0.31: -0.497,
  0.32: -0.468,
  0.33: -0.439,
  0.34: -0.412,
  0.35: -0.385,
  0.36: -0.361,
  0.37: -0.336,
  0.38: -0.310,
  0.39: -0.279,
  0.40: -0.253,
  0.41: -0.227,
  0.42: -0.202,
  0.43: -0.176,
  0.44: -0.154,
  0.45: -0.126,
  0.46: -0.109,
  0.47: -0.092,
  0.48: -0.077,
  0.49: -0.063,
  0.50: 0,
  0.51: 0.063,
  0.52: 0.077,
  0.53: 0.092,
  0.54: 0.109,
  0.55: 0.126,
  0.56: 0.154,
  0.57: 0.176,
  0.58: 0.202,
  0.59: 0.227,
  0.60: 0.253,
  0.61: 0.279,
  0.62: 0.310,
  0.63: 0.336,
  0.64: 0.361,
  0.65: 0.385,
  0.66: 0.412,
  0.67: 0.439,
  0.68: 0.468,
  0.69: 0.497,
  0.70: 0.524,
  0.71: 0.553,
  0.72: 0.579,
  0.73: 0.617,
  0.74: 0.645,
  0.75: 0.674,
  0.76: 0.716,
  0.77: 0.743,
  0.78: 0.773,
  0.79: 0.806,
  0.80: 0.842,
  0.81: 0.878,
  0.82: 0.915,
  0.83: 0.954,
  0.84: 0.994,
  0.85: 1.044,
  0.86: 1.055,
  0.87: 1.150,
  0.88: 1.178,
  0.89: 1.227,
  0.90: 1.282,
  0.91: 1.335,
  0.92: 1.403,
  0.93: 1.476,
  0.94: 1.554,
  0.95: 1.645,
  0.96: 1.751,
  0.97: 1.880,
  0.98: 2.054,
  0.99: 2.326,
  1.0: Infinity,
};

export const inversaDistribucionNormal = (p) => {
  if (p < 0 || p > 1) {
    throw new Error("La probabilidad debe estar entre 0 y 1.");
  }
  return valoresCriticos[p];
};