import {gql} from "@apollo/client";

export const typeDefs = gql`
  extend type OrganisationsListMobileModel {
    color: String @client
  }
  
  extend type ModuleSimplePageMobileModel {
    name: String @client
  }
`;