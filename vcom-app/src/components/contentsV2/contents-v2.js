import React, { useEffect, useState } from 'react';
import { listSolarPlants } from '../../graphql/queries';
import { updateSolarPlant } from '../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { Button } from 'react-bootstrap';
import './contentsV2Styles.css'

const client = generateClient();

class ID {
    constructor(value) {
        if (typeof value !== "string" || !value.match(/^[0-9a-fA-F-]{36}$/)) {
            throw new Error("Invalid ID format");
        }
        this.value = value;
    }

    toString() {
        return this.value;
    }
}

const App = () => {
    const [plantDisplay, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sendSMSStates, setSendSMSStates] = useState({})
    const [refreshKey, setRefreshKey] = useState(0); // forces page to re-render

    useEffect(() => {
        fetchPlants();
        console.log('Page reloaded')
    }, [refreshKey]);//re-renders when refreshKey changes

    const fetchPlants = async () => {
        try {
            const plantData = await client.graphql({ query: listSolarPlants });
            const plants = plantData.data.listSolarPlants.items;
            setPlants(plants);

            const initialStates = {};
            plants.forEach((plant) => {
                initialStates[plant.index] = plant.sendSMS || false;
            });
            setSendSMSStates(initialStates);
        } catch (err) {
            console.error('Error fetching plant data', err);
        } finally {
            setIsLoading(false);
        }
    }; 

    const updatePlants = async () => {

        try {
            await Promise.all(
                plantDisplay.map(async (plant) => {

                    console.log(`Updating plant ${plant.index}, plantName: ${plant.plantName}, ID: ${plant.id}`);
    
                    if (plant.index === null || plant.index === undefined) {
                        console.error(`Skipping update for plant due to missing index`, plant);
                        return;
                    }
    
                    const variables = { 
                        input: { 
                            id: plant.id,
                            index: Number(plant.index),
                            sendSMS: Boolean(sendSMSStates[plant.index])
                        } 
                    };    
                    console.log('Variables being sent:', variables);

                    await client.graphql({
                        query: updateSolarPlant,
                        //variables: variables
                        variables: { 
                            id: plant.id,
                            index: Number(plant.index),
                            sendSMS: Boolean(sendSMSStates[plant.index])
                        } 
                    });
                })
            );
            console.log('SMS states updated successfully');
            setRefreshKey(prevKey => prevKey + 1);
        } catch (err) {
            console.error('Error updating DynamoDB table ===>>>', err);
        }
    };
    
    
    
    

    const handleDropdownChange = (index, value) => { 
        setSendSMSStates((prev) => ({
            ...prev,
            [index]: value === 'true',
        }));
    };

    return (
        <div>
            <h2>Display DynamoDB Items</h2>
            {isLoading ? (
                <p>Loading....</p>
            ) : (
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Plant Name</th>
                                <th>Send SMS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plantDisplay.sort((a, b) => a.index - b.index).map((plant) => (
                                <tr key={plant.index}>
                                    <td className='indexColumn'>{plant.index}</td>
                                    <td className='plantNameColumn'>{plant.plantName}</td>
                                    <td className='sendSMSColumn'>
                                        <select
                                            value={sendSMSStates[plant.index] ? 'true' : 'false'}
                                            onChange={(e) => handleDropdownChange(plant.index, e.target.value)}
                                            style={{
                                                backgroundColor: sendSMSStates[plant.index] === plant.sendSMS ? 'white' : 'red'
                                            }}
                                        >
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Button className="testButton" onClick={() => console.log('Current sendSMS states:', sendSMSStates)}>Print to Console</Button>
                    <Button onClick={updatePlants}>Update SMS States</Button>
                </form>
            )}
        </div>
    );
};

export default App;
