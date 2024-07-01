import {TagsListProps} from "@/types/components/TagsList";
import {Chip, Colors, Spacings, View} from "react-native-ui-lib";
import {StyleSheet} from "react-native";

const TagsList = ({tags}: TagsListProps) => {
    return <View style={styles.tagsList}>{
        tags.map((tag) => <Chip containerStyle={styles.tagContainerStyle} labelStyle={styles.tagLabelStyle} key={tag} label={tag}/>)}
    </View>
}

const styles = StyleSheet.create({
    tagsList: {
        display: 'flex',
        flexDirection: "row",
        gap: Spacings.s1
    },
    tagContainerStyle: {
        borderColor: Colors.$textNeutral
    },
    tagLabelStyle: {
        color: Colors.$textNeutral
    }
});

export default TagsList;