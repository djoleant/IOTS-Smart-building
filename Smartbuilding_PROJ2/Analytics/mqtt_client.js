const mqtt = require('mqtt');

const brokerUrl = 'mqtt://localhost';
const options = {
  clientId: 'mqtt_subscriber', // unique identifier for the client
};

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to the topic
  const topic = 'smartbuilding';
  client.subscribe(topic, (error) => {
    if (error) {
      console.error('Failed to subscribe to topic:', error);
    } else {
      console.log('Subscribed to topic:', topic);
    }
  });
});

client.on('message', (topic, message) => {
  console.log('Received message from topic:', topic);
  console.log('Message:', message.toString());
});

client.on('error', (error) => {
  console.error('Error:', error);
});



