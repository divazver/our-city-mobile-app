import {ThemedText} from "@/components/ThemedText";
import {StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {Stack, useLocalSearchParams} from "expo-router";
import {Image} from "react-native-ui-lib";
import MetaData from "@/components/metaData/MetaData";
import {useMemo} from "react";
import Gallery from "@/components/gallery/Gallery";
import {useQuery} from "@apollo/client";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import YoutubePlayer from "@/components/youtubePlayes/youtubePlayer";
import {GET_PAGE_BY_ID} from "@/grapql/queries/page";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";
import {dateFormatter} from "@/utils/dateFormater";

/**${process.env.EXPO_PUBLIC_API_URL}/*/
const Page = () => {
    const { id } = useLocalSearchParams();
    const {data, loading, error} = useQuery(GET_PAGE_BY_ID, {variables: {id}})
    const page = useMemo(() => data?.moduleSimplePageMobileByIdMobile || {}, [data]);

    if (loading) {
        return <LoadingScreen message={"Načítavam stránku..."}/>
    }

    if (error) {
        return <>
            <Stack.Screen options={{title: "Error"}}/>
            <ErrorScreen message={"Nepodarilo sa načítať obsah..."} />
        </>
    }

    return <ParallaxScrollView
        headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
        headerImage={
            <Image
                source={{uri: `${page.featuredImage}`}}
                style={styles.headerImage}
            />
        }>
        <Stack.Screen options={{title: page.title}}/>
        <ThemedView style={styles.titleContainer}>
            <ThemedText text30BO type="title">{page.title}</ThemedText>
        </ThemedView>
        <MetaData date={dateFormatter(page.createdAt)} author={page.createdBy}/>
        <ThemedText text65L>{page.context}</ThemedText>
        {page.gallery.length > 0 && <>
            <ThemedText text40BO>Galéria</ThemedText>
            <Gallery gallery={page.gallery} useUrl={true}/>
        </>}

        {page.videoLink && <>
            <ThemedText text40BO>Video</ThemedText>
            <YoutubePlayer videoLink={page.videoLink} />
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
});

export default Page;