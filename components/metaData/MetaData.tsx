import {Colors, Spacings, Text, View} from "react-native-ui-lib";
import AntDesign from "@expo/vector-icons/AntDesign";
import {StyleSheet} from "react-native";
import {MetaDataProps} from "@/types/components/MetaData";

const MetaData = ({date, author}: MetaDataProps) => {
    return <View style={styles.metaData}>
        <View style={styles.metaDataItem}>
            <AntDesign name={"calendar"} color={Colors.$textNeutral}/><Text text80L $textNeutral>{date}</Text>
        </View>
        <View style={styles.metaDataItem}>
            <AntDesign name={"user"} color={Colors.$textNeutral}/><Text text80L $textNeutral>{author}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    metaData: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: Spacings.s3
    },
    metaDataItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: Spacings.s1
    }
});

export default MetaData;