class Mesh2D{
    mesh = null;
    color = null;

    constructor(color, vertices, indices){
        if(color)
            this.color = color;
        else{
            this.color = new Vector4(1, 1, 1, 1);
        }

        if(vertices && indices){
            
        }
    }
}