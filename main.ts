let radioGroup = 1  // Default group ID
let groupLimit = 3  // Maximum number of groups, it is worth keeping it as low as possible to change between projects easily
let systemMsg = "Open:bit console"  // The first message on the display at startup
let msgMillis = control.millis()
radio.setGroup(radioGroup)
Kitronik_VIEWTEXT32.clearDisplay()
Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Top, systemMsg)

input.onButtonPressed(Button.A, function() {
    radio.setGroup(radioGroup = (++radioGroup) % groupLimit)
    Kitronik_VIEWTEXT32.clearDisplay()
    systemMsg = "Radio group : "+ convertToText(radioGroup)
    msgMillis = control.millis()
})

radio.onReceivedString(function(receivedString: string) {
    let msg=receivedString.split(":")
    if(msg==null)return
    if(msg.length<2)return
    if (msg[0] == "DT") Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Top, msg[1])
    if (msg[0] == "DB") Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Bottom, msg[1])
    if (msg[0] == "CD") Kitronik_VIEWTEXT32.clearDisplay()
})

basic.forever(function() {
    if(systemMsg!=null){
        if (control.millis() - msgMillis > 1000) {
            Kitronik_VIEWTEXT32.clearDisplay()
            systemMsg=null
        }
    }
    basic.pause(100)
})