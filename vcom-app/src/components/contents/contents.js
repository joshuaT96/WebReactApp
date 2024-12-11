import React, { useEffect, useState } from 'react';
import { API } from '@aws-amplify/api-graphql';
import { graphqlOperation } from '@aws-amplify/api-graphql';
import { listSolarPlants } from '../../graphql/queries';
import { createSolarPlant } from '../../graphql/mutations';

import { generateClient } from 'aws-amplify/api';

const client = generateClient();

const App = () => {
  const [plantDisplay, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({ index: 0, plantName: '', sendSMS: false });

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const plantData = await client.graphql({ query: listSolarPlants });
      setPlants(plantData.data.listSolarPlants.items);
    } catch (err) {
      console.error('Error fetching plant data', err);
    }
  };

  const addPlant = async () => {
    try {
      const input = {
        index: newPlant.index,
        plantName: newPlant.plantName,
        sendSMS: newPlant.sendSMS,
      };
      const result = await client.graphql({
        query: createSolarPlant,
        variables: { input },
      });
      console.log('New plant created:', result);
      fetchPlants(); // Refresh the list after adding the new plant
    } catch (err) {
      console.error('Error adding new plant:', err);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewPlant((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <h1>Solar Plant Data</h1>
      <ul>
        {plantDisplay.map((plant) => (
          <li key={plant.index}>
            {plant.plantName}: {plant.sendSMS ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>

      <h2>Add New Solar Plant</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Index:
          <input
            type="number"
            name="index"
            value={newPlant.index}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Plant Name:
          <input
            type="text"
            name="plantName"
            value={newPlant.plantName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Send SMS:
          <input
            type="checkbox"
            name="sendSMS"
            checked={newPlant.sendSMS}
            onChange={handleChange}
          />
        </label>
        <br />
        <button onClick={addPlant}>Add Plant</button>
      </form>
    </div>
  );
};

export default App;
