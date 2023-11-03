import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import tailwind from 'twrnc';

import useScrollBar from '../hooks/useScrollBar';
import { Issues } from './Issues';
import LocalImage from './LocalImage';
import ParallaxScrollView from './ParallaxScrollView';
import { CropIssues as CropIssuesSchema } from '../schemas/CropIssues';
import { Results } from 'realm/dist/bundle';
import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import NotFound from '../assets/not-found.svg';

export default function CropIssues({
    issueTitle,
    issuesByCrop,
    crop
}: {
    issueTitle: string,
    issuesByCrop: CropIssuesSchema[],
    crop: any
}) {

    const {
        ref,
        onScroll,
        renderStickyHeader,
        renderFixedHeader,
        onChangeHeaderVisibility } = useScrollBar({ fixedHeader: true });

    return (
        <SafeAreaView style={[tailwind`bg-white h-full`]}>

            {crop ?
                <>
                    <ParallaxScrollView
                        ref={ref}
                        onScroll={onScroll}

                        renderFixedHeader={renderFixedHeader}
                        stickyHeaderHeight={70}

                        renderStickyHeader={renderStickyHeader}
                        onChangeHeaderVisibility={onChangeHeaderVisibility}

                        backgroundColor="white"
                        style={{ flex: 1 }}

                        renderBackground={() => (
                            <View style={[tailwind`bg-white overflow-hidden`]}>
                                <LocalImage source={crop.imagen} />
                            </View>
                        )}
                        parallaxHeaderHeight={200}

                        contentContainerStyle={tailwind`rounded-t-[2rem] -mt-9`}
                    >
                        <View style={[tailwind`bg-white rounded-t-[2rem] overflow-hidden p-6`]}>

                            <View style={[tailwind`mt-0`]}>
                                {issuesByCrop?.length ?
                                    <Issues issues={issuesByCrop} crop={crop} title={issueTitle as string}></Issues>
                                    :
                                    <Animated.View entering={FadeInDown} exiting={FadeInDown}
                                        style={tailwind`h-full w-full`}>
                                        <View style={tailwind`flex flex-row justify-between -mb-6 items-center`}>
                                            <Text style={tailwind`text-3xl pb-4 text-green-900 text-center max-w-[85] mx-auto mt-20`}>No se encontraron {issueTitle} para {crop.title}</Text>
                                        </View>
                                        <NotFound style={tailwind`max-w-90 max-h-90`} />
                                    </Animated.View>
                                }

                            </View>
                        </View>
                    </ParallaxScrollView>
                </> : null
            }
            <StatusBar barStyle="light-content" />
        </SafeAreaView >
    );
}