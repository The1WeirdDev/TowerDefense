class Display {
    static canvas = null;

    static width = 0;
    static height = 0;

    static background_color = null;
    static elem = document.documentElement;
    static fullscreen = false;

    static Init() {
        Display.canvas = document.getElementById("game_canvas");
        gl = Display.canvas.getContext("webgl2", { premultipliedAlpha: true, antialias: true });

        document.body.style.background = "black";

        Display.OnResized();
        Display.background_color = new Vector3(0.0, 0.0, 0.0);

        gl.sampleCoverage(2.0, false);

        gl.enable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
    }

    static Update() {
        //For some reason if the color is in rgb order it shows it in rbg
        //So now the order is going to be rbg instead

        gl.cullFace(gl.FRONT);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clearColor(Display.background_color.x, Display.background_color.z, Display.background_color.y, 1);
        gl.viewport(0, 0, Display.canvas.width, Display.canvas.height);
    }

    static OnResized() {
        Display.height = innerHeight;
        Display.width = Display.height * (16 / 9);

        Display.canvas.width = Display.width;
        Display.canvas.height = Display.height;

        Display.canvas.style.position = "absolute";

        if (innerWidth - Display.width > 0)
            Display.canvas.style.left = ((innerWidth - Display.width) / 2) + "px";
        else
            Display.canvas.style.left = "0px";
    }

    static GetAspectRatio() {
        //return Display.width / Display.height;
        return 16 / 9;
    }

    static SetBackgroundColor(r, g, b) {
        Display.background_color.x = r;
        Display.background_color.y = b;
        Display.background_color.z = g;
    }

    //I used this fullscreen code from stackoverflow
    //For some reason the try/catch loops arent working
    /* View in fullscreen */
    static OpenFullscreen() {
        try{
        if (Display.elem.requestFullscreen) {
            Display.fullscreen = true;
            Display.elem.requestFullscreen();
        } else if (Display.elem.webkitRequestFullscreen) { /* Safari */
            Display.fullscreen = true;
            Display.elem.webkitRequestFullscreen();
        } else if (Display.elem.msRequestFullscreen) { /* IE11 */
            Display.fullscreen = true;
            Display.elem.msRequestFullscreen();
        }
        }catch(e){
            console.log("Failed Opening Fullscreen.");
        }
    }

    /* Close fullscreen */
    static CloseFullscreen() {
        try {
            if (document.exitFullscreen) {
                Display.fullscreen = false;
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) { /* Safari */
                Display.fullscreen = false;
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE11 */
                Display.fullscreen = false;
                document.msExitFullscreen();
            }
        } catch (e) {
            console.log("Closing Fullscreen Failed.");
        }
    }
}