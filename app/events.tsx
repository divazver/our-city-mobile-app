// @ts-nocheck
import {useApp} from "@/context/app";
import {useQuery, useReactiveVar} from "@apollo/client";
import {configurationVar} from "@/grapql/cache/cache";
import {Configuration} from "@/types/configuration";
import {ModuleTypesEnum} from "@/enums/ModuleTypesEnum";
import {EVENTS_READABLE_TAGS} from "@/constants/Events";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import {GET_EVENTS_LIST} from "@/grapql/queries/events";
import {Pressable, ScrollView, StyleSheet} from "react-native";
import {router, Stack} from "expo-router";
import EventCard from "@/components/eventCard/EventCard";
import {TabBarIcon} from "@/components/navigation/TabBarIcon";
import {
    Spacings,
} from "react-native-ui-lib";
import {useState} from "react";
import TagFilter from "@/components/tagFilter/TagFilter";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";

const Events = () => {
    const {modules} = useApp();
    const configuration = useReactiveVar(configurationVar) as Configuration;
    const [visibleFilter, setVisibleFilter] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>(EVENTS_READABLE_TAGS);

    const {data, loading, error} = useQuery(GET_EVENTS_LIST, {
        variables: {
            id: modules[ModuleTypesEnum.events],
            organisationID: configuration.id,
            tags: selectedTags,
        }
    });

    if (loading) {
        return <LoadingScreen message={"Načítavam novinky..."}/>
    }

    if (error) {
        return <ErrorScreen message={"Nepodarilo sa načítať obsah..."} />
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{
                headerRight: () => <Pressable onPress={() => setVisibleFilter(true)}>
                    {({pressed}) => (
                        <TabBarIcon
                            badge={{
                                show: selectedTags.length !== EVENTS_READABLE_TAGS.length,
                                label: `${selectedTags.length}`
                            }}
                            name={"filter"}
                            style={{marginLeft: Spacings.s4, opacity: pressed ? 0.5 : 1}}
                        />
                    )}
                </Pressable>
            }}/>

            <TagFilter
                visibleFilter={visibleFilter}
                setVisibleFilter={setVisibleFilter}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                availableTags={EVENTS_READABLE_TAGS}
                />

            {data.moduleEventMobile.map((event) =>
                <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.createdAt}
                    dateFrom={event.dateFrom}
                    dateTo={event.dateTo}
                    tags={event.tags.map(tag => tag.name)}
                    shortText={event.shorText}
                    featuredImage={event.featuredImage}
                    author={event.createdBy}
                    onPress={() => router.navigate(`events/${event.id}`)}
                />)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Events;