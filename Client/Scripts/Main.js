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

var mouse_position = new Vector2(0, 0);
var mouse_buttons = [];

var shader = null;

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
    ScreenHandler.Init();
    //MenuHandler.Init();
    Time.Init();

    shader = new ShapeTexturelessShader();

    /*
    ShaderManager.text_label_shader.Start();
    ShaderManager.text_label_shader.LoadMatrix4(ShaderManager.text_label_shader_projection_matrix_location, ortho_matrix);
    ShaderManager.text_label_shader.LoadVector2(ShaderManager.text_label_shader_scale_location, text_label.scale);
    ShaderManager.text_label_shader.Stop();
    */

    AddListeners();

    setInterval(Update, 1000 / 60);
}

function AddListeners() {
    Display.canvas.addEventListener("mouseup", (e) => {
        mouse_buttons[e.button] = 0;
    });
    Display.canvas.addEventListener("mousedown", (e) => {
        mouse_buttons[e.button] = 1;
    });

    Display.canvas.addEventListener("mousemove", (e) => {
        const rect = Display.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let _x = (x / rect.width) * 2 - 1;
        let _y = (y / rect.height) * -2 + 1;
        mouse_position.x = _x * 10;
        mouse_position.y = _y * (10 / Display.GetAspectRatio());
    });
}

function Update() {
    Time.Update();
    Display.Update();
    ScreenHandler.Update();

    //button1.transform.position.x += Time.delta_time * 0.25;

    Draw();
}

function Draw() {
    var ortho_matrix = MatrixHandler.CreateOrthographicProjectionMatrix(10);

    shader.Start();
    shader.LoadMatrix4(shader.projection_matrix_location, ortho_matrix);
    shader.Stop();

    ScreenHandler.Draw();

    //var fps = Math.floor(Time.GetFps());

    //UIRenderer.RenderTextLabel(text_label);

    //MenuHandler.Draw();
}

function CleanUp() {
    shader.CleanUp();

    ScreenHandler.CleanUp();
    NetworkHandler.CleanUp();

    FontManager.CleanUp();
    //ShaderManager.CleanUp();
    //MenuHandler.Draw();
}