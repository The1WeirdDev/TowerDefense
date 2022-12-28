var gl = null;
window.onload = Start;
window.onbeforeunload = CleanUp;

/*
canvas.addEventListener("keyup", (e) => { GameHandler.OnKeyUp(e); });
canvas.addEventListener("keydown", (e) => { GameHandler.OnKeyDown(e); });
canvas.addEventListener("mouseup", (e) => { GameHandler.OnMouseButtonUp(e); });
canvas.addEventListener("mousedown", (e) => { GameHandler.OnMouseButtonDown(e); });
canvas.addEventListener("mousemove", (e) => { GameHandler.OnMouseMove(e); });
*/

var shader = null;
var resize_check = true;

function Start() {
    //Loading fonts then Starting the game
    FontManager.Init();

    var inte = setInterval(() => {
        if (FontManager.AreAllFontsLoadedSuccessfully()) {
            clearInterval(inte);
            Init();
        }
    }, 1000 / 30);
}

function Init() {
    Display.Init();
    Time.Init();
    Mouse.Init();
    Keyboard.Init();
    ScreenHandler.Init();

    shader = new ShapeTexturelessShader();

    /*
    ShaderManager.text_label_shader.Start();
    ShaderManager.text_label_shader.LoadMatrix4(ShaderManager.text_label_shader_projection_matrix_location, ortho_matrix);
    ShaderManager.text_label_shader.LoadVector2(ShaderManager.text_label_shader_scale_location, text_label.scale);
    ShaderManager.text_label_hader.Stop();
    */

    AddListeners();
    setInterval(Update, 1000 / 60);

}

function AddListeners() {
    window.addEventListener("resize", () => {
        if (resize_check) {

            Display.OnResized();
            resize_check = false;

            setTimeout(function() {
                resize_check = true;
                Display.OnResized();
            }, 500)
        }
    });
}

function Update() {
    Display.Update();
    Time.Update();
    Mouse.Update();
    Keyboard.Update();
    UI.Update();
    ScreenHandler.Update();

    Draw();
}

function Draw() {
    var ortho_matrix = MatrixHandler.CreateOrthographicProjectionMatrix(10);

    shader.Start();
    shader.LoadMatrix4(shader.projection_matrix_location, ortho_matrix);
    shader.Stop();

    ScreenHandler.Draw();
}

function CleanUp() {
    shader.CleanUp();

    ScreenHandler.CleanUp();
    NetworkHandler.CleanUp();

    FontManager.CleanUp();
    //ShaderManager.CleanUp();
    //MenuHandler.Draw();
}