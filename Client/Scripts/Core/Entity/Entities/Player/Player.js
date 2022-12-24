class Player extends Entity {
    user_data = null;

    constructor() {
        super();
        this.user_data = new UserData();
    }

    Update() { }
    Draw() { }
    CleanUp() { }
}