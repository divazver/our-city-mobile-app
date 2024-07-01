import {Card, Spacings, Text, View} from "react-native-ui-lib";
import {StyleSheet} from "react-native";
import TagsList from "@/components/tagsList/TagsList";
import MetaData from "@/components/metaData/MetaData";
import {dateFormatter} from "@/utils/dateFormater";
import {EventCardProps} from "@/types/components/EventCard";
import EventDate from "@/components/eventDate/EventDate";
//${/*process.env.EXPO_PUBLIC_API_URL}/*/}
const EventCard = ({id, title, tags, date, dateFrom, dateTo, shortText, featuredImage, author, onPress}: EventCardProps) => {
    return <Card
        style={{marginBottom: Spacings.s4, position: "relative"}}
        onPress={onPress}
        borderRadius={0}
    >
        <Card.Section
            imageSource={{uri: `${featuredImage}`}}
            imageStyle={{height: 260}}
        />

        <View style={styles.eventDateWrapper}>
            <EventDate date={dateFrom} dateTo={dateTo} />
        </View>

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
}

const styles = StyleSheet.create({
    mainContent: {
        marginTop: Spacings.s2,
    },
    title: {
        marginVertical: Spacings.s2
    },
    eventDateWrapper: {
        position: "absolute",
        width: 80,
        top: Spacings.s4,
        paddingBottom: Spacings.s4,
        left: Spacings.s4
    },
});

export default EventCard;