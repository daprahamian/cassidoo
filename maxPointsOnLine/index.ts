export type Point = [number, number];

// Because this uses atan, calculateAngle([a, b], [c, d]) === calculateAngle([a, b], [-c, -d]).
function calculateAngle([x1, y1]: Point, [x2, y2]: Point) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const tan = dy / dx;
    return Math.atan(tan);
}

export function maxPointsOnLine(points: Point[]) : number {
    if (points.length < 3) {
        return points.length;
    }

    let max = 2;

    for (let i = 0; i < points.length; i += 1) {
        const center = points[i];
        const angles = new Map<number, number>();
        for (let j = 0; j < points.length; j += 1) {
            if (i === j) continue;
            const point = points[j];
            // Because we are storing the atan of the point, 
            // points opposite each other (and therefore on the same line)
            // will wind up in the same angles bucket
            const angle = calculateAngle(center, point);
            angles.set(angle, (angles.get(angle) ?? 1) + 1);
        }
        max = Math.max(max, ...angles.values())
    }
    return max;
}
