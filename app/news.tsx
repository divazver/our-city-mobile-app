// @ts-nocheck
import {ScrollView, StyleSheet} from 'react-native';
import {useQuery, useReactiveVar} from "@apollo/client";
import {configurationVar} from "@/grapql/cache/cache";
import {Configuration} from "@/types/configuration";
import {GET_NEWS_LIST} from "@/grapql/queries/news";
import LoadingScreen from "@/components/loadingScreen/LoadingScreen";
import ArticleCard from "@/components/articleCard/ArticleCard";
import {router} from "expo-router";
import {useApp} from "@/context/app";
import {ModuleTypesEnum} from "@/enums/ModuleTypesEnum";
import ErrorScreen from "@/components/errorScreen/ErrorScreen";

export default function NewsScreen() {
    const {modules} = useApp();
    const configuration = useReactiveVar(configurationVar) as Configuration;

    const {data, loading, error} = useQuery(GET_NEWS_LIST, {variables: {
            id: modules[ModuleTypesEnum.news],
            organisationID: configuration.id
        }});

    if (loading) {
        return <LoadingScreen message={"Načítavam novinky..."}/>
    }

    if (error) {
        return <ErrorScreen message={"Nepodarilo sa načítať obsah..."} />
    }

    return (
        <ScrollView style={styles.container}>
            {data.moduleNewsMobile.map((article) =>
                <ArticleCard
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    date={article.createdAt}
                    tags={article.tags.map(tag => tag.name)}
                    shortText={article.shorText}
                    featuredImage={article.featuredImage}
                    author={article.createdBy}
                    onPress={() => router.navigate(`news/${article.id}`)}
                />)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
