basic.forever(function on_forever() {    
    const lightLevel = input.lightLevel().toString();
    const temp = input.temperature();
    const responseString = `{"temp": ${temp}, "light_intesity": ${lightLevel}}`;
    serial.writeLine(responseString);    
    control.waitMicros(5000000);
});