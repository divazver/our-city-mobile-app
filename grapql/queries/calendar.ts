import {gql} from "@apollo/client";

export const GET_EVENTS_LIST = gql`
    query moduleNewsMobile($id: String!, $organisationID: String!){
      moduleEventMobile(data: { 
      moduleServiceId: $id, 
      organisationId: $organisationID
      }) {
        context
        dateFrom
        dateTo
        featuredImage
        id
        shorText
        title
        urlLink
        videoLink
        gallery {
          name
          urlLink
        }
        tags {
          color
          name
        }
      }
    }
`;