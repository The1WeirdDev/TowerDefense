class Mesh2D{
    mesh = null;
    color = null;
    transform = null;
    z_index = 0;

    constructor(color, vertices, indices, texture_coords, texture_location){
        if(color)
            this.color = color;
        else{
            this.color = new Vector4(1, 1, 1, 1);
        }

        //Creating Mesh
        if(texture_coords){
            this.mesh = new TexturedMesh();
            this.mesh.CreateMesh([vertices, indices, texture_coords, texture_location]);
        }
        else{
            this.mesh = new BasicMesh();
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

    LoadTexture(texture_location){
        this.mesh.LoadTexture(texture_location);
    }
}