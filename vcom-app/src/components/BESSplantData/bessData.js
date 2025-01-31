import React, { useEffect, useState } from 'react';
import { listVCOMSMSBESSData } from '../../graphql/queries';
import { generateClient } from 'aws-amplify/api';
import { Button } from 'react-bootstrap';
import './BESSplantStyles.css'

const client = generateClient();

const App = () => {

    const [BESSDisplay, setBESS] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBESS();
        console.log('page loaded');
    }, [])

    const fetchBESS = async () => {
        try{
            const BESSData = await client.graphql({query: listVCOMSMSBESSData})
            const BESSPlants = BESSData.data.listVCOMSMSBESSData.items;
            setBESS(BESSPlants);
        }catch (err) {
            console.error('Error fetching BESS data', err)
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form>
                    <h2>BESS PLANT DATA</h2>
                    <table>
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            {BESSDisplay.sort((a, b) => a.index - b.index).map((BESSPlant) => (
                                <tr key={BESSPlant.index}>
                                    <td>{BESSPlant.commsLost}</td>
                                    <td>{BESSPlant.commsLostCounter}</td>
                                    <td>{BESSPlant.genPowerAbbreviation}</td>
                                    <td>{BESSPlant.genRunning}</td>
                                    <td>{BESSPlant.key}</td>
                                    <td>{BESSPlant.plantName}</td>
                                    <td>{BESSPlant.sendSMS}</td>
                                    <td>{BESSPlant.soc}</td>
                                    <td>{BESSPlant.socAbbreviation}</td>
                                    <td>{BESSPlant.socMinLevel}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </form>
            )}
        </div>     
    );
}

export default App