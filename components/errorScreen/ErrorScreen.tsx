import {Colors, Spacings, Text, View} from "react-native-ui-lib";
import AntDesign from "@expo/vector-icons/AntDesign";
import {ErrorScreenProps} from "@/types/components/ErrorScreen";
import {StyleSheet} from "react-native";

export const ErrorScreen = ({message}: ErrorScreenProps) => {
    return <View style={styles.container}>
        <AntDesign color={Colors.$textNeutral} name={"warning"} size={64}/>
        <Text color={Colors.$textNeutral} text50M>{message}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: Spacings.s2
    },
});

export default ErrorScreen;