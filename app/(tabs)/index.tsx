// @ts-nocheck
import {StyleSheet} from 'react-native';

import {Colors, Spacings, Toast, View} from "react-native-ui-lib";
import {ScrollView} from 'react-native';
import {useEffect, useState} from "react";
import {useQuery, useReactiveVar} from "@apollo/client";
import {ORGANISATIONS_LIST_BY_ID} from "@/grapql/queries/organisation";
import {configurationVar} from "@/grapql/cache/cache";
import {Configuration} from "@/types/configuration";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import {useApp} from "@/context/app";
import ModuleButton from "@/components/moduleButton/ModuleButton";
import {ModuleTypesEnum} from "@/enums/ModuleTypesEnum";
import {MODULES_LINKS} from "@/constants/Modules";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";

export default function HomeScreen() {
    const configuration = useReactiveVar(configurationVar) as Configuration;
    const {setModules} = useApp();
    const {data, loading, error, refetch} = useQuery(ORGANISATIONS_LIST_BY_ID, {variables: {id: configuration.id}});
    const [modulesList, setModulesList] = useState([]);

    useEffect(() => {
        refetch()
    }, []);

    useEffect(() => {
        if (data?.organisationByIdMobile) {
            setModules(Object.fromEntries(data.organisationByIdMobile.modules.map(({id, moduleType}) => [moduleType, id])));

            let moduleList = [];
            let specialAnn = null;

            data.organisationByIdMobile.modules.forEach((module) => {
                if(module.moduleType === ModuleTypesEnum.page)
                    moduleList.push(...module.moduleSimplePages)
                else if (module.moduleType === ModuleTypesEnum.specAnn)
                    specialAnn = module
                else
                    moduleList.push(module);
            });

            setModulesList(moduleList);
        }
    }, [data]);

    if (loading) {
        return <LoadingScreen message={"Načítavam moduly..."}/>
    }

    if (error) {
        return <ErrorScreen message={"Nepodarilo sa načítať obsah..."} />
    }

    return (
        <ScrollView>
            <Toast
                visible={false}
                backgroundColor={Colors.$backgroundDangerHeavy}
                position={'top'}
                swipeable={true}
                autoDismiss={5000}
                onDismiss={() => {
                }}
                message={"V nasej obci vsetci piju iba duro nie. Kto vie co mu asi je!"}></Toast>
            <View style={styles.moduleList}>
                {modulesList.map((module, index) => <ModuleButton
                        key={`${module.id}-${module.name}`}
                        name={module.name}
                        icon={module.icon == "icon" ? "info" : module.icon}
                        link={module?.moduleType ? `/${MODULES_LINKS[module.moduleType]}` : `/${module.id}`}
                    />)}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    moduleList: {
        display: "flex",
        gap: Spacings.s5,
        flexDirection: "row",
        flexWrap: "wrap",
        margin: Spacings.s5,
        paddingBottom: 85,
    },
    moduleWrapper: {
        width: '29.76%',
        display: "flex",
        alignItems: "center",
    },
    module: {
        width: "100%"
    },
    moduleIcon: {
        backgroundColor: Colors.$backgroundPrimaryHeavy,
        height: 105,
        borderRadius: 15,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    moduleTitle: {
        width: "100%",
        marginTop: Spacings.s1
    },
    moduleTitleText: {
        textAlign: "center",
    }
});
