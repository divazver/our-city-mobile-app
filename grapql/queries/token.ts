import {gql} from "@apollo/client";

export const CONFIGURATION_QUERY = gql`
    query GetAppToken{
        createMobileAppToken
    }
`;