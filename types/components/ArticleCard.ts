import {GestureResponderEvent} from "react-native";
import {TouchableOpacityProps} from "react-native-ui-lib";

export type ArticleCardProps = {
    id: string,
    title: string,
    date: string,
    tags: string[],
    shortText: string,
    featuredImage: string,
    author: string,
    onPress?: (props?: (TouchableOpacityProps & {
        event: GestureResponderEvent;
    }) | any) => void
}