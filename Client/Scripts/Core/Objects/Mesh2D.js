class Mesh2D{
    mesh = null;
    color = null;
    transform = null;
    z_index = 0;

    constructor(color, vertices, indices){
        if(color)
            this.color = color;
        else{
            this.color = new Vector4(1, 1, 1, 1);
        }

        //Creatine Mesh
        this.mesh = new BasicMesh();
        if(vertices != null && indices != null){
            this.mesh.CreateMesh([vertices, indices]);
        }

        this.transform = new Transform2D(0, 0, 1, 1);
    }

    Draw(){
        this.mesh.Draw();
    }

    CleanUp(){
        this.mesh.CleanUp();
    }
}