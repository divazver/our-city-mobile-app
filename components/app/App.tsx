import {ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import {Colors} from 'react-native-ui-lib';
import OrganisationSelection from "@/components/organisationSelection/OrganisationSelection";
import {useQuery} from "@apollo/client";
import {CONFIGURATION_QUERY} from "@/grapql/queries/configuration";

export default function App() {
    const { data: appConfiguration, loading } = useQuery(CONFIGURATION_QUERY);

    if (Object.keys(appConfiguration.configuration).length == 0) {
        return <OrganisationSelection />
    }

    return (
        <ThemeProvider value={{
            dark: Colors.getScheme() !== 'dark',
            colors: {
                primary: Colors.$textPrimary,
                background: Colors.$backgroundDefault,
                card: Colors.$backgroundDefault,
                text: Colors.$textDefault,
                border: Colors.$outlineDefault,
                notification: Colors.$textDanger,
            }
        }}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false, title: appConfiguration.configuration.name}}/>
                <Stack.Screen name="(home)/[id]" options={{title: "Aktuality", headerShadowVisible: false}} />
                <Stack.Screen name="news" options={{title: "Aktuality", headerShadowVisible: false}} />
                <Stack.Screen name="news/[id]" options={{title: "Článok", headerShadowVisible: false}} />
                <Stack.Screen name="events" options={{title: "Udalosti", headerShadowVisible: false}} />
                <Stack.Screen name="radio" options={{title: "Obecný rozhlas", headerShadowVisible: false}} />
                <Stack.Screen name="settings" options={{title: "Nastavenia", headerShadowVisible: false}} />
                <Stack.Screen name="+not-found"/>
            </Stack>
        </ThemeProvider>
    );
}