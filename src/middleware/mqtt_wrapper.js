const mqtt = require('mqtt');

function boxStatusMessage(app, boxId, message) {
    app.service('box-status').create({
        box_id: boxId,
        status: message
    });
}
    
module.exports =  {

    send: function(app, message, boxId) {

        var mqtt_pass = app.get('mqtt_pass');
        var mqtt_user = app.get('mqtt_user');
        var mqtt_relay = app.get('mqtt_relay');

        // Create a client connection
        var client = mqtt.connect(mqtt_relay, {
            username: mqtt_user,
            password: mqtt_pass
        });

        client.on('error', function(err) {
            var msg = `Error connecting to mqtt... ${mqtt_user}:${mqtt_pass} ${mqtt_relay}`;
            console.log(msg);
            console.log(err);
            boxStatusMessage(app, boxId, msg);
        });

        client.on('connect', () => { // Check you have a connection

            // subscribe to replies first...
            //(00:04:47) /boxleap@gmail.com/esptestreply: .........got it, LED is on
            //FIXME this should be at box level not contract event level
            ///     but for now we just pass the box_id we got given  back to the call back
            client.subscribe("/boxleap@gmail.com/esptestreply", 
                function(err) {
                    if (err) {
                        console.log("Error subscribing to mqtt...");
                        console.log(err);
                        return;
                    }
                    // When a message arrives, log it, and call the callback
                    client.on('message', function(topic, message, packet) {
                        console.log("Received '" + message + "' on '" + topic + "'");
                        boxStatusMessage(app, boxId, message);
                    });
                });

            var topic = "/boxleap@gmail.com/esptest"
             // Publish a message to a Topic
            client.publish(topic, message,
                function(err) {
                    if (err) {
                        console.log("Error subscribing to mqtt...");
                        console.log(err);
                        return;
                    }
                    console.log("Message " + message + " posted to mqtt...");
                    boxStatusMessage(app, boxId, message + " posted to mqtt");
                    client.end(); // Close the connection after publish
                });

        });
    }
}

