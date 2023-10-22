let radioGroup=1
radio.setGroup(radioGroup)
Kitronik_VIEWTEXT32.clearDisplay()
Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Top, "Open:bit console")

input.onButtonPressed(Button.A, function() {
    radio.setGroup(radioGroup = (++radioGroup) % 9)
})

radio.onReceivedString(function(receivedString: string) {
    let msg=receivedString.split(":")
    if(msg==null)return
    if(msg.length<2)return
    if (msg[0] == "DT") Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Top, msg[1])
    if (msg[0] == "DB") Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Bottom, msg[1])
})
