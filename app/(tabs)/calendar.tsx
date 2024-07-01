import {View} from 'react-native-ui-lib';
import React from "react";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_EVENTS_LIST} from "@/grapql/queries/calendar";
import {useApp} from "@/context/app";
import {configurationVar} from "@/grapql/cache/cache";
import {Configuration} from "@/types/configuration";
import {ModuleTypesEnum} from "@/enums/ModuleTypesEnum";
import Calendar from "@/components/calendar/Calendar";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";

export default function CalendarRoot() {
    const {modules} = useApp();
    const configuration = useReactiveVar(configurationVar) as Configuration;

    const {data, loading, error} = useQuery(GET_EVENTS_LIST, {variables: {
            // @ts-ignore
            id: modules[ModuleTypesEnum.calendar],
            organisationID: configuration.id
        }})

    if (loading) {
        return <LoadingScreen message={"Načítavam kalendár..."}/>
    }

    if (error) {
        return <ErrorScreen message={"Nepodarilo sa načítať obsah..."} />
    }

    return (<View useSafeArea style={{flex: 1, marginBottom: 80}}><Calendar events={data.moduleEventMobile} /></View>
    );
}