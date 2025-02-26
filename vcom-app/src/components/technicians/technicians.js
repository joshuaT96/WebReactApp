import React, { useEffect, useState } from 'react';
import { listVCOMSMSTechnicianDetails } from '../../graphql/queries';
import { createVCOMSMSTechnicianDetails } from '../../graphql/mutations';
import { generateClient } from 'aws-amplify/api';
import { Input, Button } from '@aws-amplify/ui-react';
import './techniciansStyles.css'

const client = generateClient();

const App = () => {

    const [technicianDisplay, setTechs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newTechnician, setNewTechnician] = useState({code: 1234, cellNumber: 'testnumber', name: 'testname'})

    useEffect(() => {
        fetchTechnicians();
        console.log('page loaded')
    }, [])

    const fetchTechnicians = async () => {
        try {
            const techData = await client.graphql({ query: listVCOMSMSTechnicianDetails })
            const technicians = techData.data.listVCOMSMSTechnicianDetails.items;
            setTechs(technicians);
        } catch (err) {
            console.error('Error fetching technician data', err)
        } finally {
            setIsLoading(false);
        }
    }


    const addTechnician = async () => {
        try{
            const input = {
                code: newTechnician.code, 
                cellNumber: newTechnician.cellNumber, 
                name: newTechnician.name
            };
            console.log('user input: ', input)
            const result = await client.graphql({query: createVCOMSMSTechnicianDetails, variables: {input}});
            console.log('new technician created: ', result)
            fetchTechnicians(); //refresh list after new tech was created.
        }catch (err) {
            console.error('Error adding new technician:', err);
        }

        //reset form fields
        setNewTechnician({
            code: 0,
            cellNumber: '',
            name: ''
        })
    };


    const handleChange = (event) => {
        const {name, value} = event.target;
        setNewTechnician((prevTech) => ({
            ...prevTech,
            [name]: value
        }))
    }


    return (



        <div>
            <h2>TECHNICIANS INFORMATION PAGE</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form>
                    
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


                    <form>
                        <Input
                            placeholder='Technician code'
                            size='small'
                            name='code'
                            width={'250px'}
                            value={newTechnician.code}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder='Technician cell number'
                            size='small'
                            name='cellNumber'
                            value={newTechnician.cellNumber}
                            onChange={handleChange}
                        />
                        <Input
                            placeholder='Technician name and surname'
                            size='small'
                            name='name'
                            value={newTechnician.name}
                            onChange={handleChange}
                        />
                        <Button onClick={addTechnician}>Add Technician</Button>
                    </form>

                </form>
            )}
        </div>


    );

}

export default App

