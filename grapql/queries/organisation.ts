import {gql} from "@apollo/client";

export const ORGANISATIONS_LIST_QUERY = gql`
    query GetOrganisationsList{
      organisationsListMobile {
        id
        name
        logo
        logoMini
        color @client
      }
    }
`;

export const ORGANISATIONS_LIST_BY_ID = gql`
query GetOrganisationById($id: String!) {
  organisationByIdMobile(id: $id) {
    id
    logo
    logoMini
    name
    modules {
      description
      icon
      id
      moduleType
      name
      moduleSpecialAnnouncements {
        createdAt
        createdBy
        id
        severity
        textMessage
        urlLink
      }
      moduleSimplePages {
        context
        createdAt
        createdBy
        icon
        id
        name @client
        title
        urlLink
        videoLink
      }
    }
  }
}
`;