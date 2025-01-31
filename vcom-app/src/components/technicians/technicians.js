import React, { useEffect, useState } from 'react';
import { listSolarPlants, listVCOMSMSTechnicianDetails } from '../../graphql/queries';
import { updateSolarPlant } from '../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { Button } from 'react-bootstrap';
import './techniciansStyles.css'

const client = generateClient();

const App = () => {

    const [technicianDisplay, setTechs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTechnicians();
        //console.log('page loaded')
    })

    const fetchTechnicians = async () => {
        try {
            const techData = await client.graphql({ query: listVCOMSMSTechnicianDetails})
            const technicians = techData.data.listVCOMSMSTechnicianDetails.items;
            setTechs(technicians);



        } catch (err) {
            console.error('Error fetching technician data', err)
        } finally {
            setIsLoading(false);
        }
    }






    return (


        <form>
            <h2>TECHNICIANS INFORMATION PAGE</h2>
            <table>
                <thead>
                    <tr>
                        <th className='codeColumn'>Code</th>
                        <th className='contactNumberColumn'>Contact Number</th>
                        <th className='technicianColumn'>Technician</th>
                    </tr>
                </thead>
                <tbody>
                {technicianDisplay.sort((a, b) => a.code - b.code).map((technician) => (
                    <tr key={technician.code}>
                        <td>{technician.code}</td>
                        <td>{technician.cellNumber}</td>
                        <td>{technician.name}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </form>
    );

}

export default App

