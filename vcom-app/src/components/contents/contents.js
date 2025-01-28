import React, { useEffect, useState } from 'react';
import { listSolarPlants } from '../../graphql/queries';
import { createSolarPlant} from '../../graphql/mutations';
import { updateSolarPlant } from '../../graphql/mutations';
//import { deleteSolarPlant } from '../../graphql/mutations';
import './tableStyles.css';
import { generateClient } from 'aws-amplify/api';
import { CheckboxField } from '@aws-amplify/ui-react';
import { Input, Button, Label } from '@aws-amplify/ui-react';

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
  fetchPlants();

  const addPlant = async () => {
    try {
      const input = {
        index: newPlant.index,
        plantName: newPlant.plantName,
        sendSMS: newPlant.sendSMS,
      };
      // log user input
      console.log("user plant input: ", input)

      const result = await client.graphql({
        query: createSolarPlant,
        variables: { input },
      });
      console.log('New plant created:', result);
      fetchPlants(); // Refresh list after adding the new plant
    } catch (err) {
      console.error('Error adding new plant:', err);
    }

    console.log('PlantDisplay contents: ', plantDisplay)
    //reset form fields
    setNewPlant({
      index: '',
      plantName: '',
      sendSMS: false,
    })
  };

  /*
  const updatePlant = async () => {
    try {
      const result = await client.graphql({
        query: updateSolarPlant,
        variables: { input: index, sendSMS: sendSMSValue },
      });
      console.log('SendSMS updated:', result);
      fetchPlants(); // Refresh list after updating the sendSMS attribute
    } catch (err) {
      console.error('Error updating SendSMS:', err);
    }
  };
  */
  

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNewPlant((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (index) => {
    setPlants((prev) =>
      prev.map((plant) =>
        plant.index === index ? { ...plant, sendSMS: !plant.sendSMS } : plant
      )
    );
  };

  //const handleButtonClick = (index) => {
  //  console.log(`Button clicked for plant with index: ${index}`);
  //};
  //console.log('PlantDisplay contents: ', plantDisplay)

  return (    

    <div>
      <h1>Solar Plant Data</h1>
      <table className="tg">
        <thead>
          <tr>
            <th className="tg-wp8o indexColumnWidth">Index</th>
            <th className="tg-wp8o plantNameColunnWidth">Plant Name</th>
            <th className="tg-wp8o smsActiveColumnWidth">SMS function active</th>
          </tr>
        </thead>
        <tbody>
          {plantDisplay.sort((a,b) => a.index - b.index).map((plant) => (
            <tr key={plant.index}>
              <td className="tg-wp8o indexColumnWidth">{plant.index}</td>
              <td className="tg-wp8o plantNameColunnWidth">{plant.plantName}</td>
              <td className="tg-wp8o smsActiveColumnWidth">{plant.sendSMS ? 'Yes' : 'No'}</td>
              <td style={{ display: 'flex', gap: '10px'}}>
                {/*<CheckboxField
                  label="Activate SMS"
                  onChange={() => handleCheckboxChange(plant.index)}
                />*/}
                <Button>
                  Activate SMS
                </Button>
                <Button>
                  Deactivate SMS
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <h2>Add New Solar Plant</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Index:
          <Input
            type="number"
            name="index"
            value={newPlant.index}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Plant Name:
          <Input
            type="text"
            name="plantName"
            value={newPlant.plantName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <CheckboxField
            label="Activate SMS"
            //checked={newPlant.sendSMS}
            onChange={handleCheckboxChange}
          />
        </label>
        <br />
        <Button onClick={addPlant}>Add Plant</Button>
      </form>
      
      <h2>Update Solar Plant</h2>

      
    </div>
  );
};

export default App;
