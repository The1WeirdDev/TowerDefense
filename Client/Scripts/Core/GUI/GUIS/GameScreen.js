class GameScreen{
    static initialized = true;

    static Init(){
        if(GameScreen.initialized == false){

            GameScreen.initialized = true;
        }
    }
    static Update(){}
    static Draw(){
        MeshRenderer.DrawMesh(GameScreen.mesh);
    }
    static CleanUp(){
        if(GameScreen.initialized){

        }
    }
}