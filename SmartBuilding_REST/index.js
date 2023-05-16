const express = require('express');
const db = require('./db-info.js');


    const app = express();
    app.use(express.json());
    const port = 3000;
    
    // app.get('/Rooms', async (req, res) => {
    //   const results = await db.promise().query('SELECT * FROM Rooms');
    //   res.status(200).send(results[0]);
    // })
    var cors = require('cors') 
    app.use(cors()) 
    
    app.get('/Room/:valueId', async (req, res) => {
        const results = await db.promise().query(`SELECT * FROM Rooms WHERE ValueId = '${req.params.valueId}'`);
        res.status(200).send(results[0]);
    })
    
    app.post('/Room', async (req, res) => {
        try {
            console.log(req)
            const { valueId, timestamp, light, humidity, temperature, co2 } = req.body;
            await db.promise().query(`INSERT INTO Rooms(ValueId,Timestamp,Light,Humidity,Temperature,CO2) VALUES('${valueId}', '${timestamp}', '${light}', '${humidity}', '${temperature}', '${co2}')`);
            const results = await db.promise().query(`SELECT * FROM Rooms WHERE ValueId = '${valueId}'`);
            res.status(201).send(results[0]);
        }
        catch (err) {
            res.status(400).send(err);
        }
    })
    
    app.put('/Room', async (req, res) => {
        try {
            const { valueId, timestamp, light, humidity, temperature, co2 } = req.body;
            await db.promise().query(`UPDATE Rooms SET ValueId='${valueId}',Timestamp='${timestamp}',Light='${light}',Humidity='${humidity}',Temperature='${temperature}',CO2='${co2}' WHERE ValueId = '${valueId}'`);
            const results = await db.promise().query(`SELECT * FROM Rooms WHERE ValueId = '${valueId}'`);
            res.status(201).send(results[0]);
        }
        catch (err) {
            res.status(400).send(err);
        }
    })
    
    
    app.delete('/Room/:valueId', async (req, res) => {
        await db.promise().query(`DELETE FROM Rooms WHERE ValueId = '${req.params.valueId}'`);
        res.status(200).send({ msg: 'Successfully deleted' });
    })
    
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })


