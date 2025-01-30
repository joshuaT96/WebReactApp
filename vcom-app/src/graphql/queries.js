/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSolarPlant = /* GraphQL */ `
  query GetSolarPlant($id: ID!) {
    getSolarPlant(id: $id) {
      index
      plantName
      sendSMS
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSolarPlants = /* GraphQL */ `
  query ListSolarPlants(
    $filter: ModelSolarPlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSolarPlants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        index
        plantName
        sendSMS
        
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
