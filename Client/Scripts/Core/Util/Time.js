class Time {
    static date;
    static last_time;
    static delta_time;
    static start_time;

    static lastTimeMessage = 0;

    static Init() {
        let d = new Date();
        Time.date = d;
        Time.start_time = d.getTime() / 1000.0;
        Time.last_time = Time.start_time;
        Time.delta_time = Time.start_time - Time.last_time;

    }

    static Update() {
        Time.date = new Date();

        var time = Time.date.getTime() / 1000.0;
        Time.delta_time = time - Time.last_time;
        Time.last_time = time;

        if (Time.delta_time == NaN)
            Time.delta_time = 0;

        Time.elapsed_time += Time.delta_time;
    }

    static GetElapsedTime() {
        let _date = new Date();
        let t = _date.getTime() / 1000.0;
        return t - Time.start_time;
    }
    static GetFps() {
        return 1.0 / Time.delta_time;
    }
}
