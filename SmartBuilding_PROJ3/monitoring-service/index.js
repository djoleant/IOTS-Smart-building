const mqtt = require('mqtt')
const clientId = 'monitoring'
const username = 'monitoring'
const password = 'monitoring'
const edgexTopic = 'edgex/sensor_value'
let currentState = 'OFF'

const address = 'tcp://broker.hivemq.com:1883'

const mqttClient = mqtt.connect(address, {
    clientId,
    username,
    password
})

mqttClient.subscribe(edgexTopic, () => {
    console.log(`monitoroin service subscribed to ${edgexTopic}`)
})

mqttClient.on('message', (topic, payload) => {
    if (topic !== edgexTopic) return;

    const data = JSON.parse(payload.toString())
    if (data.device !== 'SensorValueCluster2') return;
    const co2 = data.readings[0].value
    console.log(`CO2 concentration is ${co2}`)

    if (co2 < 490 && currentState === 'OFF')
    {
        currentState = 'ON'
        console.log('CURRENT STATE CHANGED TO ON')
        sendAlert()
        return
    }
    
    if (co2 > 500 && currentState === 'ON')
    {
        currentState = 'OFF'
        console.log('CURRENT STATE CHANGED TO OFF')
        sendAlert()
    }
})

async function sendAlert()
{
	const url =
		'http://172.28.48.1:48082/api/v1/device/02d737ac-3970-49cf-b7e9-8023ba767655/command/6829a512-1f2c-4360-8770-279f99b9fce0';


	const body = {
		state: currentState,
	};
	try {
		const res = await fetch(url, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ body }),
		});
		console.log(res);
	} catch (ex) {
		console.log(ex);
	}
}