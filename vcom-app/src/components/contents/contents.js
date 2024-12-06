import React, { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

import { Amplify } from 'aws-amplify';
import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import awsExports from '../../aws-exports';

import { listVcomContents } from '../../graphql/queries';


Amplify.configure(awsExports);

// Example GraphQL query
const listItems = `
  listItems {
    items {
      plantName
      index
      sendSMS
    }
  }
`;

function Contents() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Use graphqlOperation for GraphQL queries
        const result = await GraphQLAPI.graphql({query: listItems});
        setItems(result.data.listItems.items);
        console.log(result)
      } catch (error) {
        //console.error('Error fetching data:', error);
        console.log("error", error)
      }
    }

    fetchData();
  }, []);

  //console.log('AWS Exports:', awsExports);

  return (
    <Container>
      <Stack direction="vertical" gap={4}>
        {items.map((item, index) => (
          <Stack key={index} direction="horizontal" gap={2}>
            <div className="p-2">hello{item.name}</div>
            
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}

export default Contents;
