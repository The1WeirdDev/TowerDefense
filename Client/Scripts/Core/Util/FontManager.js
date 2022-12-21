//I used a lot of code from stack overflow to get font rendering done
//So big thanks to them
class FontManager {
    static font_roboto = null;

    static fonts_to_load = 0;
    static fonts_loaded = 0;
    static fonts_failed_to_load = 0;

    static Init() {
        FontManager.LoadFont("Shared/Res/Fonts/Roboto.ttf", (new_font) => {
            FontManager.font_roboto = new_font;
        });
    }

    static CleanUp() {
        FontManager.font_roboto = null;
    }

    static LoadFont(location, _callback) {
        FontManager.fonts_to_load = FontManager.fonts_to_load + 1;

        opentype.load(location, function(err, font) {
            if (err) {
                FontManager.fonts_failed_to_load++;
                console.log(`Font could not be loaded: from "${location}"" reason "${err}"`);
            } else {
                _callback(font);
                FontManager.fonts_to_load--;
                FontManager.fonts_loaded++;
            }
        });
    }

    static AreAllFontsLoadedSuccessfully() {
        return FontManager.fonts_to_load == 0 && FontManager.fonts_loaded != 0;
    }
}