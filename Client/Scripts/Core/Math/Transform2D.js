class Transform2D {
    position = null;
    rotation = 0;
    scale = null;

    constructor(x, y, width, height) {
        if (x == NaN || y == NaN || x == null || y == null)
            this.position = new Vector2(0, 0);
        else
            this.position = new Vector2(x, y);

        if (width == NaN || height == NaN || width == null || height == null)
            this.scale = new Vector2(1, 1);
        else
            this.scale = new Vector2(width, height);
    }
}