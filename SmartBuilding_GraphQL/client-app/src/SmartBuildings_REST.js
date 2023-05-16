import React, { useState, useEffect } from 'react';

function BuildingData() {
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const [newRoom, setNewRoom] = useState({
    valueId: '',
    timestamp: '',
    light: '',
    humidity: '',
    temperature: '',
    co2: ''
  });


  useEffect(() => {
    fetchBuildingData();
  }, []);

  async function fetchBuildingData() {
    try {
      const response = await fetch(`http://127.0.0.1:3000/Room/${id}`);
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleIdChange(event) {
    setId(event.target.value);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewRoom(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function addNewRoom(event) {
    event.preventDefault();

    try {
      await fetch('http://127.0.0.1:3000/Room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoom)
      });
      
      // Clear the form inputs after successful addition
      setNewRoom({
        valueId: '',
        timestamp: '',
        light: '',
        humidity: '',
        temperature: '',
        co2: ''
      });

      // Fetch the updated building data
      fetchBuildingData();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function updateRoom(event) {
    event.preventDefault();

    try {
      await fetch('http://127.0.0.1:3000/Room', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoom)
      });
      
      // Clear the form inputs after successful addition
      setNewRoom({
        valueId: '',
        timestamp: '',
        light: '',
        humidity: '',
        temperature: '',
        co2: ''
      });

      // Fetch the updated building data
      fetchBuildingData();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function deleteRoom() {
    try {
      await fetch(`http://127.0.0.1:3000/Room/${id}`, {
        method: 'DELETE'
      });
      
      // Fetch the updated building data
      fetchBuildingData();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <div>
      <h2>Fetch Or Delete Room</h2>
        <label htmlFor="idInput">Enter ID:</label>
        <input type="text" id="idInput" value={id} onChange={handleIdChange} />
        <br></br>
        <button onClick={fetchBuildingData}>Fetch Data</button>
        <button onClick={deleteRoom}>Delete Data</button>
      </div>

      <form>
        <h2>Add Or Update Room</h2>
        <label  htmlFor="newIdInput">ID:</label>
        <input type="text" id="newIdInput" name="valueId" value={newRoom.valueId} onChange={handleInputChange} />
        <br></br>
        <label htmlFor="newTimestampInput">Timestamp:</label>
        <input type="text" id="newTimestampInput" name="timestamp" value={newRoom.timestamp} onChange={handleInputChange} />
        <br></br>
        <label htmlFor="newLightInput">Light:</label>
        <input type="text" id="newLightInput" name="light" value={newRoom.light} onChange={handleInputChange} />
        <br></br>
        <label htmlFor="newHumidityInput">Humidity:</label>
        <input type="text" id="newHumidityInput" name="humidity" value={newRoom.humidity} onChange={handleInputChange} />
        <br></br>
        <label htmlFor="newTemperatureInput">Temperature:</label>
        <input type="text" id="newTemperatureInput" name="temperature" value={newRoom.temperature} onChange={handleInputChange} />
        <br></br>
        <label htmlFor="newCO2Input">CO2:</label>
        <input type="text" id="newCO2Input" name="co2" value={newRoom.co2} onChange={handleInputChange} />
        <br></br>
        <button type="submit" onClick={addNewRoom}>Add Room</button>
        <button type="submit" onClick={updateRoom}>Update Room</button>
      </form>

      {data.map(entry => (
        <div key={entry.ValueId}>
          <p>ID: {entry.ValueId}</p>
          <p>Timestamp: {entry.Timestamp}</p>
          <p>Light: {entry.Light}</p>
          <p>Humidity: {entry.Humidity}</p>
          <p>Temperature: {entry.Temperature}</p>
          <p>CO2: {entry.CO2}</p>
        </div>
      ))}
    </div>
  );
}

export default BuildingData;

