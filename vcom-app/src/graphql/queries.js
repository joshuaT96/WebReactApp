/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVcomContent = /* GraphQL */ `
  query GetVcomContent($id: ID!) {
    getVcomContent(id: $id) {
      index
      active
      plantName
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listVcomContents = /* GraphQL */ `
  query ListVcomContents(
    $filter: ModelVcomContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVcomContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        index
        active
        plantName
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
