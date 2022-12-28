class UI {
    //All uis
    static text_labels = [];
    static text_boxes = [];
    static frames = [];
    static buttons = [];
    static uis = [];

    static focused_frame = null;

    static types = {
        None: 0,
        Frame: 1,
        Button: 2,
        TextBox: 3,
        TextLabel: 4,
    };

    //All ui objects will have this
    focused = false;
    z_index = 0;
    transform = null;
    initialized = false;
    type = 0;

    //Callbacks
    on_pressed = null;
    on_releasd = null;
    on_hovered = null;
    on_key_pressed = null;
    on_key_released = null;

    constructor() {
        UI.uis.push(this);
    }
    Draw() { }

    static Update() {
        if (Mouse.IsButtonPressed(0)) {
            var highest_z_index = -1;

            for (var i = 0; i < UI.uis.length; i++) {
                var ui = UI.uis[i];
                ui.focused = false;

                if (ui.initialized) {
                    if (ui.IsHovered()) {
                        if (ui.z_index >= highest_z_index) {
                            highest_z_index = ui.z_index;
                            UI.focused_frame = ui;
                        }
                    }
                }
            }

            if (UI.focused_frame) {
                UI.focused_frame.focused = true;

                if (UI.focused_frame.on_pressed)
                    UI.focused_frame.on_pressed();
            }
        }
    }

    IsHovered() { return false; }
}