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
  mutation UpdateSolarPlant(
    $input: UpdateSolarPlantInput!
    $condition: ModelSolarPlantConditionInput
  ) {
    updateSolarPlant(input: $input, condition: $condition) {
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
