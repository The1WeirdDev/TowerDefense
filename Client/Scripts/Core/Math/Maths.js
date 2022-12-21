class Maths {
    static Lerp(p1, p2, t) {
        return { x: (1 - t) * p1.x + t * p2.x, y: (1 - t) * p1.y + t * p2.y };
    }

    static Cross(p1, p2) {
        return p1.x * p2.y - p1.y * p2.x;
    }

    static Distance(p1, p2) {
        const dx = p1.x - p2.x, dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    static DegreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}