module.exports = class OutputHandler {
    static GetDateAsString(date) {
        return date.getFullYear().toString() + "/" + date.getMonth().toString() + "/" + date.getDate().toString();
    }

    static GetTimeAsString(date) {
        var am_or_pm = "AM";
        var hour = date.getHours();

        if (hour > 12) {
            //hour -= 12;
            am_or_pm = "PM";
        }

        return hour + ":" + date.getMinutes().toString() + am_or_pm;
    }

    static Log(data) {
        var date = new Date();
        console.log(OutputHandler.GetDateAsString(date) + " " + OutputHandler.GetTimeAsString(date) + " Server : " + data);
    }
}