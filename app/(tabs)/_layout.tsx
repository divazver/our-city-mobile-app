import {Link, Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Image, Pressable} from 'react-native';
import {Colors, Spacings} from 'react-native-ui-lib';
import TabBar from "@/components/navigation/TabBar";
import {useReactiveVar} from "@apollo/client";
import {configurationVar} from "@/grapql/cache/cache";
import {Configuration} from "@/types/configuration";

export default function TabLayout() {
    const configuration = useReactiveVar(configurationVar) as Configuration;

    return (
        <Tabs
            screenOptions={{tabBarActiveTintColor: Colors.$textPrimary, tabBarInactiveTintColor: Colors.$textDefault}}
            tabBar={TabBar}
        ><Tabs.Screen
            name="index"
            options={{
                title: 'Domov',
                tabBarLabel: 'Domov',
                tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>,
                headerStyle: {
                    height: 110,
                },
                headerTitle: () => <Image source={{uri: `${process.env.EXPO_PUBLIC_API_URL}/${configuration.logo}`}}
                                          style={{
                                              alignSelf: 'center',
                                              resizeMode: 'contain',
                                              height: 40,
                                              width: 120
                                          }}/>,
                headerRight: () => (<Link href="/settings" asChild>
                    <Pressable>
                        {({pressed}) => (
                            <TabBarIcon
                                name={'setting'}
                                color={Colors.$iconDefault}
                                style={{marginRight: Spacings.s4, opacity: pressed ? 0.5 : 1}}/>
                        )}
                    </Pressable>
                </Link>),
                headerLeft: () => (
                    <TabBarIcon
                        name={'bells'}
                        color={Colors.$iconDefault}
                        style={{marginLeft: Spacings.s4, opacity: .25}}/>

                ),
            }}
        />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: 'Kalendár',
                    tabBarIcon: ({color}) => <TabBarIcon name="calendar" color={color}/>,
                }}
            />
        </Tabs>
    );
}
