// @ts-nocheck
import {SeverityAlertProps} from "@/types/components/SeverityAlert";
import {Colors, Spacings, View} from "react-native-ui-lib";
import {StyleSheet} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";
import {SeverityIcons} from "@/constants/SeverityIcons";

const SeverityAlert = ({severity, message}: SeverityAlertProps) => {
    return <View style={{
        ...styles.alert,
        ...styles[severity]
    }}>
        <AntDesign
            name={SeverityIcons[severity]}
            style={{
                ...styles.severityIcon,
                ...styles[`${severity}Icon`]
            }}
            size={32}
        />
        <ThemedText style={{
            ...styles.severityText,
            ...styles[`${severity}Text`]
        }}>{message}</ThemedText>
    </View>
}

const styles = StyleSheet.create({
    alert: {
        padding: Spacings.s4,
        borderRadius: 15,
        display: "flex",
        flexDirection: "row",
        gap: Spacings.s4,
        alignItems: "center"
    },
    severityText: {
        flexShrink: 2
    },
    severityIcon: {
    },
    Info: {
        backgroundColor: Colors.$backgroundGeneralLight,
    },
    Warning: {
        backgroundColor: Colors.$backgroundWarningHeavy
    },
    Danger: {
        backgroundColor: Colors.$backgroundDangerHeavy,
    },
    InfoText: {
        color: Colors.$textGeneral,
    },
    WarningText: {
        color: Colors.$textNeutralHeavy
    },
    DangerText: {
        color: Colors.$textDefaultLight
    },
    InfoIcon: {
        color: Colors.$textGeneral,
    },
    WarningIcon: {
        color: Colors.$textNeutralHeavy
    },
    DangerIcon: {
        color: Colors.$textDefaultLight,
    }
});

export default SeverityAlert;