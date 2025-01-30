/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSolarPlant = /* GraphQL */ `
  mutation CreateSolarPlant(
    $input: CreateSolarPlantInput!
    $condition: ModelSolarPlantConditionInput
  ) {
    createSolarPlant(input: $input, condition: $condition) {
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
export const updateSolarPlant = /* GraphQL */ `
  mutation updateSolarPlant(
    $id: ID
    $index: Int!
    $sendSMS: Boolean    
  ) {
    updateSolarPlant(
      input: {
        id: $id
        index: $index
        sendSMS: $sendSMS
      }
    ) {
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
export const deleteSolarPlant = /* GraphQL */ `
  mutation DeleteSolarPlant(
    $input: DeleteSolarPlantInput!
    $condition: ModelSolarPlantConditionInput
  ) {
    deleteSolarPlant(input: $input, condition: $condition) {
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
