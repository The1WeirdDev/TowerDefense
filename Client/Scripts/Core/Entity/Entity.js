class Entity {
    transform = null;
    mesh = null;

    constructor() {
        this.transform = new Transform2D();

        //Will not create mesh
        //Some entities will have meshses of different types
    }

    Update() { }
    Draw() { }
    CleanUp() { }
}