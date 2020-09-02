const PHI = (1 + 5 ** 0.5) / 2;

// (5 ** 0.5) ** 2 !== 5. Yay FP error. Compute error of PHI, and use it as
// default precision (could also use sufficiently small # like Math.sin(Math.PI))
const DEFAULT_PRECISON = ((PHI * 2) - 1) ** 2 / 5 - 1;

export function isGoldenRatio(a: number, b: number, precision: number = DEFAULT_PRECISON): boolean {
    const [min, max] = a > b ? [b, a] : [a, b];
    const diff = Math.abs(((min + max) / max) - PHI)
    return diff <= precision;
}
