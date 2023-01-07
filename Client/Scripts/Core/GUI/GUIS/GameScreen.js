class GameScreen{
    static initialized = false;
    static mesh2d = null;

    static Init(){
        if(GameScreen.initialized == false){
            //Create Meshes
            GameScreen.mesh2d = new Mesh2D(null, [0,0, 0, 1, 1,0, 1,1], [0, 1, 2, 2, 1, 3]);

            GameScreen.initialized = true;
        }
    }
    static Update(){}
    static Draw(){
        MeshRenderer.DrawMesh(shader, GameScreen.mesh2d);
    }
    static CleanUp(){
        if(GameScreen.initialized){
            GameScreen.mesh2d.CleanUp();
        }
    }
}