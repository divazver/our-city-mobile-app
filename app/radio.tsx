// @ts-nocheck
import {useQuery, useReactiveVar} from "@apollo/client";
import {configurationVar} from "@/grapql/cache/cache";
import {Configuration} from "@/types/configuration";
import {GET_RADIO_QUERY} from "@/grapql/queries/radio";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import {Card, Colors, Spacings, Text, View} from "react-native-ui-lib";
import {ScrollView, StyleSheet} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {format} from "date-fns/format";
import {sk} from "date-fns/locale/sk";
import {useApp} from "@/context/app";
import {ModuleTypesEnum} from "@/enums/ModuleTypesEnum";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";

const Radio = () => {
    const {modules} = useApp();
    const configuration = useReactiveVar(configurationVar) as Configuration;

    const {data, loading, error} = useQuery(GET_RADIO_QUERY, {
        variables: {
            id: modules[ModuleTypesEnum.radio],
            organisationID: configuration.id
        }
    });

    if (loading) {
        return <LoadingScreen message={"Načítavam oznamy..."}/>
    }

    if (error) {
        return <ErrorScreen message={"Nepodarilo sa načítať obsah..."} />
    }

    const icons = ["info", "eye", "camera", "windows"]

    const cats = {
        info: "Info",
        eye: "Úrad",
        camera: "Upozornenie",
        windows: "Trhovisko"
    }

    return <ScrollView style={styles.container}>
        {data.moduleMunicipalRadioMobile.map((radio, index) => {
            let date = format(new Date(radio.createdAt), "EEEE dd.MM.yyyy H:ii", {locale: sk});
            return <View key={`radio-${index}`} style={styles.radioGroup}>
                <Text text70M style={styles.radioGroupTitle}>{`${date}`}</Text>
                {radio.messages.map(({message, category}, mIndex) => {
                    let icon = icons[Math.floor(Math.random() * 4)];
                    return <Card key={`radio-${index}-message-${mIndex}`} style={styles.radioMessageContainer}>
                        <View style={styles.radioMessage}>
                            <View style={styles.radioMessageCategory}>
                                <View style={styles.radioMessageIcon}><AntDesign color={Colors.$textDefaultLight} size={22}
                                                                                 name={icon}/></View>
                                <Text text100BO>{cats[icon]}</Text>
                            </View>
                            <Text style={styles.radioMessageText}>{message}</Text>
                        </View>
                    </Card>
                })}
            </View>
        })}
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacings.s4,
        flex: 1,
    },
    radioGroup: {
        marginTop: Spacings.s4
    },
    radioGroupTitle: {
        marginBottom: Spacings.s2,
    },
    radioMessageContainer: {
        marginBottom: Spacings.s2,
        padding: Spacings.s4
    },
    radioMessage: {
        display: "flex",
        flexDirection: "row"
    },
    radioMessageCategory: {
        flexBasis: "25%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRightWidth: 1,
        paddingRight: Spacings.s4,
        borderRightColor: Colors.$textDisabled
    },
    radioMessageIcon: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: Colors.$backgroundPrimaryHeavy,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    radioMessageText: {
        marginLeft: Spacings.s4,
        flexBasis: "70%"
    }
});

export default Radio;