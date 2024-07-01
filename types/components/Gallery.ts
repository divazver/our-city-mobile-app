import {ImageSource} from "react-native-image-viewing/dist/@types";

export type GalleryProps = {
    gallery: {[key: string]: string}[],
    useUrl?: boolean,
}