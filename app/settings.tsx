import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Button, Colors, Spacings} from "react-native-ui-lib";
import {useMutation, useReactiveVar} from "@apollo/client";
import {RESET_CONFIGURATION} from "@/grapql/queries/configuration";
import {configurationVar} from "@/grapql/cache/cache";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Configuration} from "@/types/configuration";
import {ORGANISATIONS_LIST_QUERY} from "@/grapql/queries/organisation";

export default function Settings() {
    const configuration = useReactiveVar(configurationVar) as Configuration;
    const [resetConfiguration] = useMutation(RESET_CONFIGURATION, {
        refetchQueries: [ORGANISATIONS_LIST_QUERY],
        awaitRefetchQueries: true
    });

    return (
        <>
            <ThemedView style={styles.container}>
                <ThemedText text30BO>Nastavenia</ThemedText>
                <ThemedView style={styles.settingsBody}>
                    <ThemedText text65L style={{marginBottom: Spacings.s2}}>
                        Sledujete samosprávu <ThemedText text65M>{
                            typeof configuration?.name != "undefined" ? configuration?.name : ''
                        }</ThemedText>
                    </ThemedText>

                    <Button outline
                            outlineColor={Colors.$textDisabled}
                            color={Colors.$textNeutralHeavy}
                            label={"Zmeniť samosprávu"}
                            iconOnRight={true}
                            onPress={() => resetConfiguration()}
                            iconSource={() => <AntDesign
                                color={Colors.$textNeutralHeavy}
                                style={{marginLeft: Spacings.s2}}
                                name={"logout"}
                            />} />
                </ThemedView>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Spacings.s4,
    },
    settingsBody: {
        marginTop: Spacings.s4
    }
});
