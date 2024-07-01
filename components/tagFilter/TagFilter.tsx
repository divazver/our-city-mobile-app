import {Chip, Modal, Spacings, Text, View} from "react-native-ui-lib";
import {useState} from "react";
import {TagFilterProps} from "@/types/components/TagFilter";
import {StyleSheet} from "react-native";

const TagFilter = ({visibleFilter, setVisibleFilter, selectedTags, setSelectedTags, availableTags}: TagFilterProps) => {

    const [selectedTagsTemp, setSelectedTagsTemp] = useState(selectedTags);

    return <Modal visible={visibleFilter}>
        <View useSafeArea>
            <Modal.TopBar
                title={'Filter'}
                doneLabel={'Uložiť'}
                onCancel={() => setVisibleFilter(false)}
                onDone={() => {
                    setSelectedTags(selectedTagsTemp);
                    setVisibleFilter(false)
                }}
            />
            <View style={styles.filterBody}>
                <View style={styles.filterItem}>
                    <Text text70M>Tagy:</Text>
                    <View style={styles.filterChipList}>
                        {availableTags.map((tag, index) => selectedTagsTemp.includes(tag)
                            ? <Chip
                                key={`filter-${tag.trim()}`}
                                label={tag}
                                onDismiss={() => {
                                    setSelectedTagsTemp(selectedTagsTemp.filter((item) => item != tag));
                                }}
                            />
                            : <Chip
                                key={`filter-${tag.trim()}`}
                                label={tag}
                                onPress={() => {
                                    let temp = [...selectedTagsTemp]
                                    temp.push(tag)
                                    setSelectedTagsTemp(temp)
                                }}
                            />)}
                    </View>
                </View>
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    filterBody: {
        padding: Spacings.s4
    },
    filterItem: {
        display: "flex",
        gap: Spacings.s2
    },
    filterChipList: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: Spacings.s2
    }
});

export default TagFilter;