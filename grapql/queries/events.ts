import {gql} from "@apollo/client";

export const GET_EVENTS_LIST = gql`
    query moduleNewsMobile($id: String!, $organisationID: String!, $tags: [String!]){
        moduleEventMobile(data: {
          organisationId: $organisationID
          moduleServiceId: $id
          tagValues: $tags
        }) {
        context
        dateFrom
        dateTo
        featuredImage @client
        id
        shorText @client
        title @client
        urlLink
        videoLink
        createdAt @client
        createdBy @client
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

export const GET_EVENT_BY_ID = gql`
    query moduleEventMobileByIdMobile($id: String!){
        moduleEventMobileByIdMobile(id: $id) {
        context @client
        dateFrom
        dateTo
        featuredImage @client
        id
        shorText @client
        title
        urlLink
        videoLink
        createdAt @client
        createdBy @client
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