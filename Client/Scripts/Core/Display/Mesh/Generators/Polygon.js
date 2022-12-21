
// bezier discretization
const MAX_BEZIER_STEPS = 10;
const BEZIER_STEP_SIZE = 3.0;
// this is for inside checks - doesn't have to be particularly
// small because glyphs have finite resolution
const EPSILON = 1e-6;

// class for converting path commands into point data
class Polygon {
    points = [];
    children = [];
    area = 0.0;

    MoveTo(p) {
        this.points.push(p);
    }

    LineTo(p) {
        this.points.push(p);
    }

    Close() {
        let cur = this.points[this.points.length - 1];
        this.points.forEach(next => {
            this.area += 0.5 * Maths.Cross(cur, next);
            cur = next;
        });
    }

    ConicTo(p, p1) {
        const p0 = this.points[this.points.length - 1];
        const dist = Maths.Distance(p0, p1) + Maths.Distance(p1, p);
        const steps = Math.max(2, Math.min(MAX_BEZIER_STEPS, dist / BEZIER_STEP_SIZE));
        for (let i = 1; i <= steps; ++i) {
            const t = i / steps;
            this.points.push(Maths.Lerp(Maths.Lerp(p0, p1, t), Maths.Lerp(p1, p, t), t));
        }
    }

    CubicTo(p, p1, p2) {
        const p0 = this.points[this.points.length - 1];
        const dist = Maths.Distance(p0, p1) + Maths.Distance(p1, p2) + Maths.Distance(p2, p);
        const steps = Math.max(2, Math.min(MAX_BEZIER_STEPS, dist / BEZIER_STEP_SIZE));
        for (let i = 1; i <= steps; ++i) {
            const t = i / steps;
            const a = Maths.Lerp(Maths.Lerp(p0, p1, t), Maths.Lerp(p1, p2, t), t);
            const b = Maths.Lerp(Maths.Lerp(p1, p2, t), Maths.Lerp(p2, p, t), t);
            this.points.push(Maths.Lerp(a, b, t));
        }
    }

    Inside(p) {
        let count = 0, cur = this.points[this.points.length - 1];
        this.points.forEach(next => {
            const p0 = (cur.y < next.y ? cur : next);
            const p1 = (cur.y < next.y ? next : cur);
            if (p0.y < p.y + EPSILON && p1.y > p.y + EPSILON) {
                if ((p1.x - p0.x) * (p.y - p0.y) > (p.x - p0.x) * (p1.y - p0.y)) {
                    count += 1;
                }
            }
            cur = next;
        });
        return (count % 2) !== 0;
    }
}