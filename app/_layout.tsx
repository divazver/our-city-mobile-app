import 'react-native-reanimated';
import {AppProvider} from "@/context/app";

import {ApolloProvider} from "@apollo/client";
import {client, unauthenticatedClient} from "@/grapql/client/client";
import {useEffect, useState} from "react";
import {loadConfiguration} from "@/grapql/cache/cache";
import App from "@/components/app/App";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {CONFIGURATION_QUERY} from "@/grapql/queries/token";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [clientInitialized, setClientInitialized] = useState(false);
    const [token, setToken] = useState("");
    const [error, setError] = useState(undefined);

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded && clientInitialized) {
            SplashScreen.hideAsync();
        }
    }, [loaded, clientInitialized]);

    useEffect(() => {
        const fetchToken = async () => {
            return await unauthenticatedClient.query({query: CONFIGURATION_QUERY})
                .then((response) => {
                    return setToken(response.data.createMobileAppToken);
                }).catch(() => {
                    return setToken("");
                });
        }
        const initializeClient = async () => {
            await loadConfiguration();
            await fetchToken();

            setClientInitialized(true)
        };
        initializeClient();
    }, []);

    if (!loaded) {
        return null;
    }

    if (!clientInitialized) return <LoadingScreen message={"Načítavam klienta..."}/>;

    if (error) {
        return <ErrorScreen message={"Nepodarilo sa načítať klienta..."} />
    }

    return (
        <GestureHandlerRootView>
            <ApolloProvider client={client(token)}>
                <AppProvider>
                    <App />
                </AppProvider>
            </ApolloProvider>
        </GestureHandlerRootView>
    );
}
