// @ts-nocheck
import {Colors, Spacings, View} from "react-native-ui-lib";
import {Link} from "expo-router";
import {Pressable, StyleSheet} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {ThemedText} from "@/components/ThemedText";
import {ModuleButtonProps} from "@/types/components/ModuleButton";

const ModuleButton = ({name, icon, link}: ModuleButtonProps) => {
    return <View style={styles.moduleWrapper}>
        <Link href={link} asChild style={styles.module}>
            <Pressable>
                <View style={styles.moduleIcon}><AntDesign name={icon} size={48}
                                                           color={Colors.$textDefaultLight}/></View>
                <View style={styles.moduleTitle}><ThemedText h6
                                                             style={styles.moduleTitleText}>{
                    name.length > 20 ? `${name.slice(0, 17)}...` : name
                }</ThemedText>
                </View>
            </Pressable>
        </Link>
    </View>;
}

const styles = StyleSheet.create({
    moduleWrapper: {
        width: '29.74%',
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

export default ModuleButton;