import {useMutation, useQuery} from "@apollo/client";
import {ORGANISATIONS_LIST_QUERY} from "@/grapql/queries/organisation";
import {Organisation} from "@/types/organisation";
import {ThemedView} from "@/components/ThemedView";
import {Colors, Picker, PickerItemProps, Spacings, View} from "react-native-ui-lib";
import {Image, StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {UPDATE_CONFIGURATION} from "@/grapql/queries/configuration";
import React, {useEffect, useState} from "react";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";

const OrganisationSelection = () => {

    const {data: organisations, loading: loadingQuery, error} = useQuery(ORGANISATIONS_LIST_QUERY);
    const [updateConfiguration] = useMutation(UPDATE_CONFIGURATION);
    const [options, setOptions] = useState<PickerItemProps[]>();

    const searchOptions = (value: string) => {
        if (value) {
            setOptions(options?.filter((item) => item.label.toLowerCase().includes(value.toLowerCase())));
        } else {
            setOptions(organisations ? organisations?.organisationsListMobile.map((item: Organisation) => ({
                label: item.name,
                value: item.id
            })) : [])
        }
    }

    useEffect(() => {
        setOptions(organisations ? organisations?.organisationsListMobile.map((item: Organisation) => ({
            label: item.name,
            value: item.id
        })) : []);
    }, [organisations]);

    if (loadingQuery) {
        return <LoadingScreen message={"Načítavam samosprávy..."}/>
    }

    if (error) {
        return <ErrorScreen message={"Nepodarilo sa načítať samosprávy..."}/>
    }

    return <ThemedView style={styles.setupPage}>
        <View style={styles.setup}>
            <Image source={require('@/assets/images/logo-ourcity.png')}
                   style={{alignSelf: 'center', resizeMode: 'contain', height: 40}}/>
            <ThemedText h3>Ahoj,</ThemedText>
            <ThemedText>začnime tým že si vyberieš obec ktorú chceš sledovať!</ThemedText>

            <Picker
                placeholder="Vyber obec..."
                floatingPlaceholder
                enableModalBlur={false}
                onChange={(organisationID) => {
                    let {id, name, logo, color} = organisations
                        .organisationsListMobile.find(
                            (organisation: Organisation) => organisation.id == organisationID
                        );
                    updateConfiguration({variables: {newConfiguration: {id, name, logo, color}}})
                }}
                topBarProps={{title: 'Samosprávy'}}
                useSafeArea={true}
                showSearch
                searchPlaceholder={'Vyhľadaj samosprávu'}
                searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.grey50}}
                onSearchChange={(searchValue) => searchOptions(searchValue)}
                items={options?.length ? options : undefined}
            />
        </View>
    </ThemedView>
}

const styles = StyleSheet.create({
    setupPage: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
    },
    setup: {
        padding: Spacings.s8,
        paddingBottom: Spacings.s10,
        marginBottom: Spacings.s10,
    }
});

export default OrganisationSelection;