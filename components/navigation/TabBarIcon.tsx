// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import AntDesign from '@expo/vector-icons/AntDesign';
import {type IconProps} from '@expo/vector-icons/build/createIconSet';
import {type ComponentProps} from 'react';
import {Badge, Colors, Spacings, View} from "react-native-ui-lib";
import {StyleSheet} from "react-native";

export function TabBarIcon({style, badge, ...rest}: IconProps<ComponentProps<typeof AntDesign>['name']> & {
    badge?: { show: boolean, label: string }
}) {
    return <View style={styles.tabBarIconWrapper}>
        <AntDesign size={28} style={style} {...rest} />
        {(badge && badge?.show) &&
            <Badge
                style={styles.tabBarIconBadge}
                label={badge.label}
                backgroundColor={Colors.$backgroundPrimaryHeavy} size={12}
            />}
    </View>;
}

const styles = StyleSheet.create({
    tabBarIconWrapper: {
        position: "relative",
    },
    tabBarIconBadge: {
        position: "absolute",
        top: -5,
        right: -5
    }
});
