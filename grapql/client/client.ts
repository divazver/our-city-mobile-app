import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {typeDefs} from "@/grapql/typeDefs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {cache, configurationVar} from "@/grapql/cache/cache";
import {setContext} from "@apollo/client/link/context";


const httpLink = createHttpLink({
    uri: `${process.env.EXPO_PUBLIC_API_URL}/graphql/`,
});

const authLink = (token: string) => setContext((_, { headers })  => {
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        }
    }
});

export const client = (token: string) => new ApolloClient({
    link: authLink(token).concat(httpLink),
    cache,
    typeDefs,
    resolvers: {
        Query: {
            //organizations: organizationsResolver,
            // organization: organizationResolver,
        },
        Mutation: {
            updateConfiguration: async (_, { newConfiguration }, { cache }) => {
                configurationVar(newConfiguration);
                await AsyncStorage.setItem('configuration', JSON.stringify(newConfiguration));
                return newConfiguration;
            },
            resetConfiguration: async (_,  vars, { cache }) => {
                configurationVar({});
                await AsyncStorage.removeItem('configuration');
                return {}
            }
        },
    },
});

export const unauthenticatedClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({}),
});