import { useGlobalSearchParams } from 'expo-router';
import { SafeAreaView, Text, View, StatusBar } from 'react-native';
import tailwind from 'twrnc';

import LocalImage from '../../components/LocalImage';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { useCategories } from '../../hooks/useCategories';
import { useCrops } from '../../hooks/useCrops';
import { JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from 'react';
import BackBtn from '../../components/BackAction';

export default function Details() {
    const crops = useCrops();
    const categoryHook = useCategories();
    const { cropId } = useGlobalSearchParams();
    const [crop, setCrop] = useState<any>();
    const [categories, setCategories] = useState<any>();

    useEffect(() => {
        const cropItem = cropId ? crops.getById(cropId.toString()) : null;
        if (cropItem) {
            const categoryItems = cropItem && cropItem?.categories.length ? categoryHook.getNamesByIds(cropItem?.categories) : [];
            setCrop(cropItem);
            setCategories(categoryItems)
        }
    }, []);

    return (

        <SafeAreaView style={[tailwind`bg-white h-full`]}>
            {crop ?
                <ParallaxScrollView
                    backgroundColor="white"
                    style={{ flex: 1 }}
                    parallaxHeaderHeight={300}
                    stickyHeaderHeight={74}
                    renderStickyHeader={() => (
                        <BackBtn />
                    )}
                    renderBackground={() => (
                        <View style={[tailwind`bg-white overflow-hidden`]}>
                            <LocalImage source={crop.imagen} />
                        </View>
                    )}
                    onChangeHeaderVisibility={(visible: boolean) => {
                        if (visible) {
                            StatusBar.setBarStyle('light-content')
                        } else {
                            StatusBar.setBarStyle('dark-content')
                        };
                    }}
                >
                    <View style={[tailwind`bg-white rounded-t-2xl overflow-hidden p-6`]}>
                        <View style={tailwind`flex flex-row items-center`}>
                            <Text style={tailwind`flex-1 text-[2rem] font-extrabold text-teal-900`}>{crop.title}</Text>
                            {
                                categories?.map((category: any, index: any) => (
                                    <View key={category} style={tailwind` flex
                                    justify-center
                                    items-center
                                    bg-slate-900
                                    px-3 py-1
                                    rounded-[60px] ml-2`}>
                                        <Text key={index} style={tailwind`
                                    text-xs
                                    text-white`}>{category}</Text>
                                    </View>
                                ))
                            }

                        </View>
                        <Text style={tailwind`text-lg font-normal text-slate-500`}>{crop.scientific_name}</Text>
                        <Text style={tailwind`text-base pt-3 font-normal text-green-950`}>{crop.description}</Text>
                    </View>
                </ParallaxScrollView>
                : null}

            <StatusBar barStyle="light-content" />
        </SafeAreaView>

    );
}