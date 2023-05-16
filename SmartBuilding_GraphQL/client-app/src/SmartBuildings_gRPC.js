import React, { useState, useEffect } from 'react';
import { RoomClient } from './room_grpc_web_pb';
import { RoomVals, RoomValsId } from './room_pb';

const client = new RoomClient('grpc://localhost:5078', null, null);

export const RoomInfoComponent = () => {
    const [roomInfo, setRoomInfo] = useState(null);

    useEffect(() => {
        const getRoomInfo = async () => {
            const request = new RoomValsId();
            request.setValueId('1234567');

            try {
                const response = await client.getRoominfo(request, {});
                const roomVals = response;
                setRoomInfo(roomVals);
            } catch (error) {
                console.error('Error retrieving room info:', error);
            }
        };

        getRoomInfo();
    }, []);

    if (!roomInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Room Info</h2>
            <p>Value ID: {roomInfo.valueId}</p>
            <p>Timestamp: {roomInfo.timestamp}</p>
            <p>CO2: {roomInfo.co2}</p>
            <p>Humidity: {roomInfo.humidity}</p>
            <p>Light: {roomInfo.light}</p>
            <p>Temperature: {roomInfo.temperature}</p>
        </div>
    );
};

export const AddRoomInfoComponent = () => {
    const [valueId, setValueId] = useState('');
    const [co2, setCO2] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [light, setLight] = useState(0);
    const [temperature, setTemperature] = useState(0);

    const addRoomInfo = async () => {
        const request = new RoomVals();
        request.setValueId(valueId);
        request.setCo2(co2);
        request.setHumidity(humidity);
        request.setLight(light);
        request.setTemperature(temperature);

        try {
            const response = await client.addRoominfo(request, {});
            const roomValsId = response.toObject();
            console.log('Added room info with ID:', roomValsId.valueId);
        } catch (error) {
            console.error('Error adding room info:', error);
        }
    };

    return (
        <div>
            <h2>Add Room Info</h2>
            <input
                type="text"
                placeholder="Value ID"
                value={valueId}
                onChange={(e) => setValueId(e.target.value)}
            />
            <input
                type="number"
                placeholder="CO2"
                value={co2}
                onChange={(e) => setCO2(parseFloat(e.target.value))}
            />
            <input
                type="number"
                placeholder="Humidity"
                value={humidity}
                onChange={(e) => setHumidity(parseFloat(e.target.value))}
            />
            <input
                type="number"
                placeholder="Light"
                value={light}
                onChange={(e) => setLight(parseFloat(e.target.value))}
            />
            <input
                type="number"
                placeholder="Temperature"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
            <button onClick={addRoomInfo}>Add</button>
        </div>
    );
};

