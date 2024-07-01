// @ts-nocheck
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {Stack, useLocalSearchParams} from "expo-router";
import {Image, Spacings, View} from "react-native-ui-lib";
import TagsList from "@/components/tagsList/TagsList";
import MetaData from "@/components/metaData/MetaData";
import {useMemo} from "react";
import Gallery from "@/components/gallery/Gallery";
import {dateFormatter} from "@/utils/dateFormater";
import {useQuery} from "@apollo/client";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import YoutubePlayer from "@/components/youtubePlayes/youtubePlayer";
import {GET_EVENT_BY_ID} from "@/grapql/queries/events";
import EventDate from "@/components/eventDate/EventDate";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";
/*${process.env.EXPO_PUBLIC_API_URL}/*/
const Event = () => {
    const { id } = useLocalSearchParams();
    const {data, loading, error} = useQuery(GET_EVENT_BY_ID, {variables: {id}})
    const event = useMemo(() => data?.moduleEventMobileByIdMobile || {}, [data]);

    if (loading) {
        return <LoadingScreen message={"Načítavam udalosť..."}/>
    }

    if (error) {
        return <>
            <Stack.Screen options={{title: "Error"}}/>
            <ErrorScreen message={"Nepodarilo sa načítať obsah..."} />
        </>
    }

    return <ParallaxScrollView
        headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
        headerImage={<>
                <Image
                    source={{uri: `${event.featuredImage}`}}
                    style={styles.headerImage}
                />
                <View style={styles.eventDateWrapper}>
                    <EventDate date={event.dateFrom} dateTo={event.dateTo} />
                </View>
            </>
        }>
        <Stack.Screen options={{title: event.title}}/>
        <TagsList tags={event.tags.map(tag => tag.name)}/>
        <ThemedView style={styles.titleContainer}>
            <ThemedText text30BO type="title">{event.title}</ThemedText>
        </ThemedView>
        <MetaData date={dateFormatter(event.createdAt)} author={event.createdBy}/>
        <ThemedText text65T>{event.shorText}</ThemedText>
        <ThemedText text65L>{event.context}</ThemedText>
        {event.gallery.length > 0 && <>
            <ThemedText text40BO>Galéria</ThemedText>
            <Gallery gallery={event.gallery}/>
        </>}

        {event.videoLink && <>
            <ThemedText text40BO>Video</ThemedText>
            <YoutubePlayer videoLink={event.videoLink} />
        </>}

    </ParallaxScrollView>
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerImage: {
        height: 280,
        width: '100%',
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    eventDateWrapper: {
        marginLeft: Spacings.s4,
        marginTop: Spacings.s4,
    }
});

export default Event;