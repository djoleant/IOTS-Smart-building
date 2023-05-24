const mqtt = require("mqtt");

// MQTT broker URL
const brokerUrl = "mqtt://localhost";

// MQTT client options
const options = {
  clientId: "mqtt_publisher", // unique identifier for the client
};

// Connect to the MQTT broker
const client = mqtt.connect(brokerUrl, options);

// Handle MQTT connection events
client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

client.on("error", (error) => {
  console.error("Error:", error);
});

// Reading sensor data from database

const dummyObject = {
  humidity: "20",
  temperature: "30",
};


// Prepare message for publishing

const topic = "smartbuilding";
//const message = 'Hello, MQTT!';
const message = JSON.stringify(dummyObject);


// Publish a message to a topic
client.publish(topic, message, (error) => {
  if (error) {
    console.error("Failed to publish message:", error);
  } else {
    console.log("Message published successfully");
    client.end(); // Close the MQTT connection after publishing
  }
});
