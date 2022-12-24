class Vector4 {
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    static Add(v1, v2) {
        return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
    }

    static Multiply(v1, v2) {
        return new Vector4(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z, v1.w * v2.w);
    }

    Add(value) {
        this.x += value.x;
        this.y += value.y;
        this.z += value.z;
        this.w += value.w;
    }

    Multiply(value) {
        this.x *= value.x;
        this.y *= value.y;
        this.z *= value.z;
        this.w *= value.w;
    }
}