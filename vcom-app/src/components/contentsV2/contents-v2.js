import React, { useEffect, useState } from 'react';
import { listSolarPlants } from '../../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { Button } from 'react-bootstrap';
import './contentsV2Styles.css'

const client = generateClient();

const App = () => {

    const [plantDisplay, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sendSMSStates, setSendSMSStates] = useState({})
    const testData = [{ plantDisplay: 'abcdefghijklmnopqrstuvwxyz' }]; //dummy data for testing the page display
    var testVar = false;

    useEffect(() => {
        fetchPlants();
    }, []);

    const fetchPlants = async () => {
        try {
            const plantData = await client.graphql({ query: listSolarPlants });
            const plants = plantData.data.listSolarPlants.items;
            setPlants(plants);
            console.log('plantDisplay values: ', plantDisplay)

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
        
    }

    const handleDropdownChange = (index, value) => { 
        setSendSMSStates((prev) => ({
            ...prev,
            [index]: value ==='true',
        }))
    }

    const printToConsole = async () => {
        console.log('current sendSMS states: ', sendSMSStates )
        for (let i=0; i<plantDisplay.length; i++) {
            console.log('index: ', i , 'sendSMS: ', plantDisplay[i].sendSMS)
        }
    };

    return (
        <div>
            <h2>Display dynamoDB items</h2>
            {isLoading ? (
                <p>Loading....</p>
            ) : (
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th>Plant Display</th>
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
                                            onChange={(e) =>
                                                handleDropdownChange(plant.index, e.target.value)
                                            }
                                            style={{
                                                backgroundColor: sendSMSStates[plant.index] === plantDisplay[plant.index].sendSMS ? 'white' : 'red'
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

                    <Button className="testButton" onClick={printToConsole} >Print to console</Button>
                    <Button>Update SMS States</Button>
                </form>

            )}
        </div>
    );
}

export default App
