class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static Add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }

    static Multiply(v1, v2) {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }

    Add(value) {
        this.x += value.x;
        this.y += value.y;
    }

    Multiply(value) {
        this.x *= value.x;
        this.y *= value.y;
    }
}