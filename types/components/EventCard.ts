import {GestureResponderEvent} from "react-native";
import {TouchableOpacityProps} from "react-native-ui-lib";

export type EventCardProps = {
    id: string,
    title: string,
    date: string,
    dateFrom: string,
    dateTo: string,
    tags: string[],
    shortText: string,
    featuredImage: string,
    author: string,
    onPress?: (props?: (TouchableOpacityProps & {
        event: GestureResponderEvent;
    }) | any) => void
}