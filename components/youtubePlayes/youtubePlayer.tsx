import {YoutubePlayerProps} from "@/types/components/YoutubePlayer";
import YoutubeIframe from "react-native-youtube-iframe";
import {youtubeIdParser} from "@/utils/youtubeIdParser";
import {useMemo} from "react";
import {Text} from "react-native-ui-lib";

const YoutubePlayer = ({videoLink}: YoutubePlayerProps) => {
    const videoID = useMemo(() => youtubeIdParser(videoLink), [videoLink]);

    if(!videoID) {
        return <Text>Invalid youtube video url.</Text>
    }

    return <YoutubeIframe height={215} videoId={videoID} />
}

export default YoutubePlayer;