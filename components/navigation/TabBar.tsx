// @ts-nocheck
import {ActionBar, Colors, Spacings} from "react-native-ui-lib";
import React from "react";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";

const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => <ActionBar
    centered
    actions={state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                    ? options.title
                    : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
        };

        const onLongPress = () => {
            navigation.emit({
                type: 'tabLongPress',
                target: route.key,
            });
        };

        const Icon = options.tabBarIcon;
        const color = isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor;

        return {
            accessibilityState: isFocused,
            onPress,
            onLongPress,
            label,
            labelStyle: {
                marginLeft: Spacings.s3,
                fontWeight: 600,
                color: isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor,
            },
            iconSource: () => Icon &&
                <Icon focused={isFocused} color={color || Colors.$iconDefault} size={15}/>
        }

    })}
/>;

export default TabBar;