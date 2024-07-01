import {InMemoryCache, makeVar, ReactiveVar} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    EventTypePolicy,
    OrganisationsListModelTypePolicy,
    RadioMessageTypePolicy,
    SimplePagesTypePolicy
} from "./typePolicies";
import {Configuration} from "@/types/configuration";

export const configurationVar: ReactiveVar<{}|Configuration> = makeVar({});

export const loadConfiguration = async () => {
    const settings = await AsyncStorage.getItem('configuration');
    configurationVar(settings ? JSON.parse(settings) : {});
};

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        ...EventTypePolicy,
        ...SimplePagesTypePolicy,
        ...OrganisationsListModelTypePolicy,
        ...RadioMessageTypePolicy,
        Query: {
            fields: {
                configuration: {
                    read() {
                        return configurationVar();
                    },
                },
            },
        },
    },
});