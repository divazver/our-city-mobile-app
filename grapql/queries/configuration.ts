import {gql} from "@apollo/client";

export const CONFIGURATION_QUERY = gql`
    query GetAppConfiguration{
        configuration @client
    }
`;

export const UPDATE_CONFIGURATION = gql`
    mutation UpdateConfiguration($newConfiguration: SettingsInput!) {
        updateConfiguration(newConfiguration: $newConfiguration) @client
    }
`;

export const RESET_CONFIGURATION = gql`
    mutation ResetConfiguration {
        resetConfiguration @client
    }
`;