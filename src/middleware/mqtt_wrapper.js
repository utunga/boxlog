const mqtt = require('mqtt');

const MQTT_USER = process.env.MQTT_USER || "boxleap@gmail.com";
const MQTT_PASS = process.env.MQTT_PASS;
const MQTT_RELAY = process.env.MQTT_RELAY ||  "mqtt://mqtt.dioty.co:1883";

module.exports = {
    send: function(message) {
        // Create a client connection
        var client = mqtt.connect(MQTT_RELAY, {
            username: MQTT_USER,
            password: MQTT_PASS
        });

        client.on('connect', function() { // Check you have a connection

            var topic = "/boxleap@gmail.com/esptest"
             // Publish a message to a Topic
            client.publish(topic, message, function() {
                console.log("Message " + message + " posted to mqtt...");
                client.end(); // Close the connection after publish
            });
        });
    }
}

