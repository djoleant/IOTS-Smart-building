import React, { useEffect, useState } from 'react';
import { ApolloProvider, useQuery, useMutation } from '@apollo/react-hooks';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const GET_ROOM_VALUES = gql`
query SensorValues {
    sensorValues(where: {light: {eq: 197}, co2: {eq: 367}}, order: null) {
        valueId
        timestamp
        co2
        humidity
        light
        temperature
    }
}

`;



function SmartBuildingApp() {

    const { data, loading, error } = useQuery(GET_ROOM_VALUES);
    console.log(data)
    // useEffect(() => {
    //     setData(data2)
    // })


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(data)
    return (
        <div>
            <h1>Room Value IoT Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Value ID</th>
                        <th>Timestamp</th>
                        <th>CO2</th>
                        <th>Humidity</th>
                        <th>Light</th>
                        <th>Temperature</th>
                    </tr>
                </thead>
                <tbody>
                    {data.sensorValues.map((roomValue) => (
                        <tr key={roomValue.valueId}>
                            <td>{roomValue.valueId}</td>
                            <td>{roomValue.timestamp}</td>
                            <td>{roomValue.co2}</td>
                            <td>{roomValue.humidity}</td>
                            <td>{roomValue.light}</td>
                            <td>{roomValue.temperature}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SmartBuildingApp;
