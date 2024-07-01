import {gql} from "@apollo/client";

export const GET_PAGE_BY_ID = gql`
    query moduleSimplePageMobileByIdMobile($id: String!){
      moduleSimplePageMobileByIdMobile(id: $id) {
        context
        createdAt
        createdBy
        featuredImage @client
        id
        title
        urlLink
        videoLink
        gallery {
          name
          urlLink
        }
      }
    }
`;