using MQTTnet.Client;
using MQTTnet;
using System.Text;
using AnalyticsService;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Drawing;
using InfluxDB.Client;
using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;
using System.Net.Sockets;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

var sensorDummyTopic = "sensor_dummy/values";
var eKuiperTopic = "eKuiper/carbonalarm"; // broker.emqx.io
string address = "172.28.48.1";
var port = 1883;
var client = InfluxDBClientFactory.Create(url: "http://172.28.48.1:8086", "admin", "adminadmin".ToCharArray());
int i = 1;

var mqttService = MqttService.Instance();

await mqttService.ConnectAsync(address, port);
await mqttService.SubsribeToTopicsAsync(new List<string> { sensorDummyTopic, eKuiperTopic });

async Task ApplicationMessageReceivedAsync(MqttApplicationMessageReceivedEventArgs e)
{
    string payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
    if (e.ApplicationMessage.Topic == sensorDummyTopic)
    {
        mqttService.PublishMessage("analytics/values", payload);
        return;
    }

    Console.WriteLine($"eKuiper send: {payload}");
    var data = (JObject)JsonConvert.DeserializeObject(payload);
    string timestamp = data.SelectToken("timestamp").Value<string>();
    string co2 = data.SelectToken("co2").Value<string>();
    string temperature = data.SelectToken("temperature").Value<string>();
    string humidity = data.SelectToken("humidity").Value<string>();
    string light = data.SelectToken("light").Value<string>();
    Console.WriteLine($"Write in InfluxDb check 1");
    await WriteToDatabase(timestamp, co2, temperature, humidity, light);
    Console.WriteLine($"Write in InfluxDb called");
}

async Task WriteToDatabase(string timestamp, string co2, string temperature, string humidity, string light)
{
    var point = PointData
        .Measurement("sensor")
        .Tag("timestamp", timestamp.ToString())
        .Field("co2", co2)
        .Field("temperature", temperature)
        .Field("humidity", humidity)
        .Field("light", light)
        .Timestamp(DateTime.UtcNow, WritePrecision.Ns);

    Console.WriteLine($"Write in InfluxDb check");

    await client.GetWriteApiAsync().WritePointAsync(point, "iot2", "organization");
    Console.WriteLine($"Write in InfluxDb: sensor{i}");
    i++;
}
// {
//     var point = PointData
//         .Measurement("temperature")
//         .Tag("room", roomId)
//         .Tag("date", date)
//         .Field("celsius_degrees", temp)
//         .Timestamp(DateTime.UtcNow, WritePrecision.Ns);

//     await client.GetWriteApiAsync().WritePointAsync(point, "iot2", "organization");
//     Console.WriteLine($"Write in InfluxDb: temperature{i}");
//     i++;
// }

mqttService.AddApplicationMessageReceived(ApplicationMessageReceivedAsync);

while (true) ;