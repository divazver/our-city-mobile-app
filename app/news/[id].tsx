// @ts-nocheck
import {ThemedText} from "@/components/ThemedText";
import {StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {Stack, useLocalSearchParams} from "expo-router";
import {Image} from "react-native-ui-lib";
import TagsList from "@/components/tagsList/TagsList";
import MetaData from "@/components/metaData/MetaData";
import {useMemo} from "react";
import Gallery from "@/components/gallery/Gallery";
import {dateFormatter} from "@/utils/dateFormater";
import {useQuery} from "@apollo/client";
import {GET_NEWS_BY_ID} from "@/grapql/queries/news";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import YoutubePlayer from "@/components/youtubePlayes/youtubePlayer";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";

const Article = () => {
    const { id } = useLocalSearchParams();
    const {data, loading, error} = useQuery(GET_NEWS_BY_ID, {variables: {id}})
    const article = useMemo(() => data?.moduleNewsByIdMobile || {}, [data])

    if (loading) {
        return <LoadingScreen message={"Načítavam novinku..."}/>
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
                source={{uri: `${process.env.EXPO_PUBLIC_API_URL}/${article.featuredImage}`}}
                style={styles.headerImage}
            />
        }>
        <Stack.Screen options={{title: article.title}}/>
        <TagsList tags={article.tags.map(tag => tag.name)}/>
        <ThemedView style={styles.titleContainer}>
            <ThemedText text30BO type="title">{article.title}</ThemedText>
        </ThemedView>
        <MetaData date={dateFormatter(article.createdAt)} author={article.createdBy}/>
        <ThemedText text65T>{article.shorText}</ThemedText>
        <ThemedText text65L>{article.context}</ThemedText>
        {article.gallery.length > 0 && <>
            <ThemedText text40BO>Galéria</ThemedText>
            <Gallery gallery={article.gallery}/>
        </>}

        {article.videoLink && <>
            <ThemedText text40BO>Video</ThemedText>
            <YoutubePlayer videoLink={article.videoLink} />
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

export default Article;