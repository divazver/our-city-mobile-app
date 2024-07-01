import {gql} from "@apollo/client";

export const GET_NEWS_LIST = gql`
    query moduleNewsMobile($id: String!, $organisationID: String!){
      moduleNewsMobile(moduleGetInput: { 
      moduleServiceId: $id, 
      organisationId: $organisationID
      }) {
        context
        featuredImage
        id
        shorText
        title
        urlLink
        videoLink
        createdBy
        createdAt
        gallery {
          name
          urlLink
        }
        metaData {
          keyValue
          metaValue
        }
        tags {
          color
          name
        }   
      }
    }
`;

export const GET_NEWS_BY_ID = gql`
    query moduleNewsByIdMobile($id: String!){
      moduleNewsByIdMobile(id: $id) {
        context
        createdAt
        createdBy
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