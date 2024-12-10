import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

import awsExports from '../../aws-exports';

AWS.config.update({
  region: awsExports.aws_dynamodb_all_tables_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsExports.aws_cognito_identity_pool_id,
  }),
});

const docClient = new AWS.DynamoDB.DocumentClient();

function Contents() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const params = {
        TableName: 'VCOM_WEB_TEST',
      };

      try {
        const data = await docClient.scan(params).promise();
        setItems(data.Items || []);
        console.log('DynamoDB Data:', data);
      } catch (error) {
        console.error('Error fetching data from DynamoDB:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Stack direction="vertical" gap={4}>
        {items.map((item, index) => (
          <Stack key={index} direction="horizontal" gap={2}>
            <div className="p-2">Hello {item.plantName || 'Unnamed Plant'}</div>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

export default Contents;
