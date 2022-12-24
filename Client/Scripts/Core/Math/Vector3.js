class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static Add(v1, v2) {
        return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    static Multiply(v1, v2) {
        return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }

    Add(value) {
        this.x += value.x;
        this.y += value.y;
        this.z += value.z;
    }

    Multiply(value) {
        this.x *= value.x;
        this.y *= value.y;
        this.z *= value.z;
    }
}