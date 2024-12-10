import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

import awsExports from '../../aws-exports';
import awsConfig from '../../aws-exports';
import { Amplify } from 'aws-amplify';


// Configure AWS SDK
AWS.config.update({
  region: awsExports.aws_dynamodb_all_tables_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
  }),
});


// Initialize the DynamoDB DocumentClient
const docClient = new AWS.DynamoDB.DocumentClient();

function Contents() {
  const [items, setItems] = useState([]); // State to hold DynamoDB data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    async function fetchData() {
      const params = {
        TableName: awsConfig.aws_dynamodb_table_schemas[0].tableName, // DynamoDB table name
      };

      try {
        setLoading(true); // Start loading
        const data = await docClient.scan(params).promise();
        setItems(data.Items || []); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data from DynamoDB:', error);
        setError(error.message); // Update state with error message
      } finally {
        setLoading(false); // End loading
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <Container>
      {loading ? (
        <div>Loading data...</div> // Loading state feedback
      ) : error ? (
        <div>Error: {error}</div> // Display error message
      ) : (
        <Stack direction="vertical" gap={4}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <Stack key={index} direction="horizontal" gap={2}>
                <div className="p-2">Hello {item.plantName || 'Unnamed Plant'}</div>
              </Stack>
            ))
          ) : (
            <div>No items found in the database.</div> // Handle empty data
          )}
        </Stack>
      )}
    </Container>
  );
}

export default Contents;
