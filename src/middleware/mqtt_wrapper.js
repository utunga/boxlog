const mqtt = require('mqtt');

const MQTT_USER = process.env.MQTT_USER || "boxleap@gmail.com";
const MQTT_PASS = process.env.MQTT_PASS;
const MQTT_RELAY = process.env.MQTT_RELAY ||  "mqtt://mqtt.dioty.co:1883";

module.exports = {
    send: function(message, box_id, callbackFn) {

        // Create a client connection
        var client = mqtt.connect(MQTT_RELAY, {
            username: MQTT_USER,
            password: MQTT_PASS
        });


        client.on('connect', function() { // Check you have a connection

            // subscribe to replies first...
            //(00:04:47) /boxleap@gmail.com/esptestreply: .........got it, LED is on
            //FIXME this should be at box level not contract event level
            ///     but for now we just pass the box_id we got given  back to the call back
            client.subscribe("/boxleap@gmail.com/esptestreply", function() {
                // When a message arrives, log it, and call the callback
                client.on('message', function(topic, message, packet) {
                    console.log("Received '" + message + "' on '" + topic + "'");
                    callbackFn(box_id, message);
                });
            });

            var topic = "/boxleap@gmail.com/esptest"
             // Publish a message to a Topic
            client.publish(topic, message, function() {
                console.log("Message " + message + " posted to mqtt...");
                client.end(); // Close the connection after publish
            });

     

        });
    }
}

