import {Colors, LoaderScreen} from "react-native-ui-lib";
import {LoadingScreenProps} from "@/types/components/LoadingScreen";

export const LoadingScreen = ({message}: LoadingScreenProps) => {
    return <LoaderScreen message={message} color={Colors.$textPrimary} />
}

export default LoadingScreen;