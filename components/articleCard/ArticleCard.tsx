import {Card, Spacings, Text, View} from "react-native-ui-lib";
import {ArticleCardProps} from "@/types/components/ArticleCard";
import {StyleSheet} from "react-native";
import TagsList from "@/components/tagsList/TagsList";
import MetaData from "@/components/metaData/MetaData";
import {dateFormatter} from "@/utils/dateFormater";

const ArticleCard = ({id, title, tags, date, shortText, featuredImage, author, onPress}: ArticleCardProps) => <Card
    style={{marginBottom: Spacings.s4}}
    onPress={onPress}
    borderRadius={0}
>
    <Card.Section
        imageSource={{uri: `${process.env.EXPO_PUBLIC_API_URL}/${featuredImage}`}}
        imageStyle={{height: 260}}
    />

    <View paddingV-20 paddingH-15>
        <TagsList tags={tags} />
        <Text text40BO $textDefault style={styles.title}>
            {title}
        </Text>
        <MetaData date={dateFormatter(new Date(date))} author={author} />
        <Text text70 $textDefault style={styles.mainContent}>
            {shortText}
        </Text>
    </View>
</Card>;

const styles = StyleSheet.create({
    mainContent: {
        marginTop: Spacings.s2,
    },
    title: {
        marginVertical: Spacings.s2
    }
});

export default ArticleCard;