import {gql} from "@apollo/client";

export const GET_RADIO_QUERY = gql`
query moduleMunicipalRadioMobile($id: String!, $organisationID: String!){
  moduleMunicipalRadioMobile(data: { 
    moduleServiceId: $id, 
    organisationId: $organisationID 
  }) {
        createdAt
        createdBy
        id
        shorText
        messages {
          category
          message @client
        }
      }
    }
`;