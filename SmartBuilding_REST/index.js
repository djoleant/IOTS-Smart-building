const express = require('express');
const sql = require('mssql');

(async () => {
    await sql.connect({
        server: '(localhost)\\SmartBuildingDB',
        database: 'SmartBuildingDB'
    });
    const app = express();
    app.use(express.json());
    const port = 3000;
    
    // app.get('/Rooms', async (req, res) => {
    //   const results = await sql.query('SELECT * FROM Rooms');
    //   res.status(200).send(results[0]);
    // })
    
    app.get('/Room/:id', async (req, res) => {
        const results = await sql.query(`SELECT * FROM Rooms WHERE ID = '${req.params.valueId}'`);
        res.status(200).send(results[0]);
    })
    
    app.post('/Room', async (req, res) => {
        try {
            const { valueId, timestamp, light, humidity, temperature, co2 } = req.body;
            await sql.query(`INSERT INTO Rooms(ValueId,Timestamp,Light,Humidity,Temperature,CO2) VALUES('${valueId}', '${timestamp}', '${light}', '${humidity}', '${temperature}', '${co2}')`);
            const results = await sql.query(`SELECT * FROM SENSOR_VALUES WHERE ID = '${valueId}'`);
            res.status(201).send(results[0]);
        }
        catch (err) {
            res.status(400).send(err);
        }
    })
    
    app.put('/Room', async (req, res) => {
        try {
            const { valueId, timestamp, light, humidity, temperature, co2 } = req.body;
            await sql.query(`UPDATE Rooms SET ValueId='${valueId}',Timestamp='${timestamp}',Light='${light}',Humidity='${humidity}',Temperature='${temperature}',CO2='${co2}' WHERE ValueId = '${valueId}'`);
            const results = await sql.query(`SELECT * FROM Rooms WHERE ID = '${valueId}'`);
            res.status(201).send(results[0]);
        }
        catch (err) {
            res.status(400).send(err);
        }
    })
    
    
    app.delete('/Room/:id', async (req, res) => {
        await sql.query(`DELETE FROM Rooms WHERE ValueId = '${req.params.valueId}'`);
        res.status(200).send({ msg: 'Successfully deleted' });
    })
    
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

})()    

