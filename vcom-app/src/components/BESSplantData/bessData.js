import React, { useEffect, useState } from 'react';
import { listVCOMSMSBESSData } from '../../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { Button } from 'react-bootstrap';
import './BESSplantStyles.css'

const client = generateClient();

const App = () => {

    const [BESSDisplay, setBESS] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sendSMSStates, setSendSMSStates] = useState({})

    useEffect(() => {
        fetchBESS();
  
        //use below statement to access fetched DB values
        //console.log(BESSDisplay[0].genPowerAbbreviation)
    }, [])

    const fetchBESS = async () => {
        try{
            const BESSData = await client.graphql({query: listVCOMSMSBESSData})
            const BESSPlants = BESSData.data.listVCOMSMSBESSData.items;
            setBESS(BESSPlants);

            const initialStates = {};
            BESSPlants.forEach((plant) => {
                initialStates[plant.index] = plant.sendSMS || false;
            });
            setSendSMSStates(initialStates);

        }catch (err) {
            console.error('Error fetching BESS data', err)
        }finally {
            setIsLoading(false);
        }
    }

    const handleDropdownChange = (index, value) => {
        setSendSMSStates((prev) => ({
            ...prev,
            [index]: value === 'true',
        }));
    };

    const updateBESSPlants = async () => {

        try {
            await Promise.all(
                BESSDisplay.map(async (BESSPlant) =>{

                   
                   
                    await client.graphql 
                })       
            )
        } catch (err) {
            console.error('Error updating dynamoDB table:  ', err)
        }
        console.log('button pressed')
    };

    
    return (
        <div>

            <h2>BESS PLANT DATA</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form>
                    
                    <table>
                        <thead>
                        <tr> 
                                <th>Plant Name</th>
                                <th>Notification Active</th>
                                <th>Selection</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BESSDisplay.sort((a, b) => a.index - b.index).map((BESSPlant) => (
                                <tr key={BESSPlant.index}>
                                    {/*  
                                    <td>{BESSPlant.commsLost}</td>
                                    <td>{BESSPlant.commsLostCounter}</td>
                                    
                                    <td>{BESSPlant.genPowerAbbreviation}</td>
                                    <td>{BESSPlant.genRunning}</td>
                                    <td>{BESSPlant.key}</td>
                                    */}
                                    <td className='plantNameColumn' >{BESSPlant.plantName}</td>                                    
                                    <td className='plantSMSColumn'>{BESSPlant.sendSMS ? ('Yes'):('No')}</td>
                                    <td>

                                    <select
                                            value={sendSMSStates[BESSPlant.sendSMS] ? ('Yes'):('No')}
                                            onChange={(e) => handleDropdownChange(BESSPlant.index, e.target.value)}
                                            style={{
                                                backgroundColor: sendSMSStates[BESSPlant.index] === BESSPlant.sendSMS ? 'white' : 'red'
                                            }}
                                        >
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>

                                    </td>
                                    {/*
                                    <td>{BESSPlant.socAbbreviation}</td>
                                    <td>{BESSPlant.socMinLevel}</td>
                                    */}

                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <Button onClick={updateBESSPlants}>Update SMS States</Button>
                </form>
            )}
        </div>     
    );
}

export default App


