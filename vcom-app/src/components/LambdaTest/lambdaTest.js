//import { useState } from "react";
import React, { useState } from 'react';
import axios from "axios";

const App = () => {
    const [response, setResponse] = useState(null);

    const handleRequest = async () => {
        /*try {
            const response = await axios.post(
                "https://s2lcqf0bc7.execute-api.us-east-1.amazonaws.com/production",
                { key: "value" }, // Payload to send to Lambda
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",  // Allow any origin or specify your React app's URL
                        "Access-Control-Allow-Methods": "POST, OPTIONS",  // Allow POST and OPTIONS methods
                        "Access-Control-Allow-Headers": "Content-Type, Authorization" // Allow headers like Content-Type and Authorization
                    },
                }
            );
            console.log("Lambda Response:", response.data);
        } catch (error) {
            console.error("Error calling Lambda:", error);
        }*/


        const apiUrl = 'https://s2lcqf0bc7.execute-api.us-east-1.amazonaws.com/production';
        
        try {
        const res = await fetch(apiUrl, {
            method: 'POST',  // or 'GET' depending on your method
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'Hello from React!' }), // optional payload
        });

        const data = await res.json();
        setResponse(data);
        } catch (error) {
        console.error('Error calling API Gateway:', error);
        }


    };
    

    return (
        <div>
            <h1>Test Lambda Execution</h1>
            <button onClick={handleRequest}>Execute</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default App;