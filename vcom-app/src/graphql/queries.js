/* eslint-disable */
// this is an auto generated file. This will be overwritten

/* --------------------------------------SolarPlant-----------------------------------------------*/
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

/* --------------------------------------VCOMSMSBESSData-----------------------------------------------*/
export const listVCOMSMSBESSData = /* GraphQL */ `
  query ListVCOMSMSBESSData(
    $filter: TableVCOMSMSBESSDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVCOMSMSBESSData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        index
        commsLost
        commsLostCounter
        genPowerAbbreviation
        genRunning
        key
        plantName
        sendSMS
        soc
        socAbbreviation
        socMinLevel
        
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;


/* --------------------------------------VCOMSMSTechnician-----------------------------------------------*/
export const listVCOMSMSTechnicianDetails = /* GraphQL */ `
  query ListVCOMSMSTechnicianDetails(
    $filter: TableVCOMSMSTechnicianDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVCOMSMSTechnicianDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        code
        cellNumber
        name

      }
      nextToken
      __typename
    }
  }
`;

