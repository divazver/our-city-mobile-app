import {Image, Spacings, Text, View} from "react-native-ui-lib";
import {StyleSheet, TouchableOpacity} from "react-native";
import ImageView from "react-native-image-viewing";
import {GalleryProps} from "@/types/components/Gallery";
import {useMemo, useRef, useState} from "react";

const Gallery = ({gallery, useUrl}: GalleryProps) => {
    const [visible, setIsVisible] = useState(false);
    const imageIndex = useRef(0);

    const images = useMemo(() => gallery.length > 0
        ? gallery.map(({urlLink}) => ({uri: useUrl ? urlLink : `${process.env.EXPO_PUBLIC_API_URL}/${urlLink}`}))
        : [], [gallery]);

    const labels = useMemo(() => gallery.length > 0
        ? gallery.map(({name}) => name)
        : [], [gallery]);

    const toggleGallery = (index: number) => {
        imageIndex.current = index;
        setIsVisible(!visible);
    }

    return <>
        <View style={styles.galleryContainer}>
            {images.map((image, index) => <View key={`image-${index}`} style={styles.galleryImageWrapper}>
                <TouchableOpacity onPress={() => toggleGallery(index)}>
                    <Image source={image} style={styles.galleryImage}/>
                </TouchableOpacity>
            </View>)}
        </View>

        <ImageView
            images={images}
            imageIndex={imageIndex.current}
            visible={visible}
            onRequestClose={() => toggleGallery(0)}
            FooterComponent={({imageIndex}) => <View>
                <View useSafeArea style={styles.galleryImageDescriptionWrapper}>
                    <View style={styles.galleryImageDescription}>
                        {labels && <Text $textDefaultLight text65L>{labels[imageIndex]}</Text>}
                        <Text $textDefaultLight text90BL>{imageIndex+1}/{images.length}</Text>
                    </View>
                </View>
            </View> }
        />
    </>
}

const styles = StyleSheet.create({
    galleryContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: Spacings.s1
    },
    galleryImageWrapper: {
        width: '32.6%',
        height: 120,
    },
    galleryImage: {
        height: '100%'
    },
    galleryImageDescription: {
        paddingVertical: Spacings.s2,
        paddingHorizontal: Spacings.s4,
    },
    galleryImageDescriptionWrapper: {
        backgroundColor: 'rgba(0,0,0, .4)',
    }
});

export default Gallery;