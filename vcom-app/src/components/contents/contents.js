import React, { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

import { Amplify } from 'aws-amplify';
import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import awsExports from '../../aws-exports';

Amplify.configure(awsExports);

// Example GraphQL query
const listItems = `
  query ListItems {
    listItems {
      items {
        id
        name
      }
    }
  }
`;

function Contents() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Use graphqlOperation for GraphQL queries
        const result = await GraphQLAPI.graphql(graphqlOperation(listItems));
        setItems(result.data.listItems.items);
        console.log(result)
      } catch (error) {
        //console.error('Error fetching data:', error);
        console.log("error")
      }
    }

    fetchData();
  }, []);

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
