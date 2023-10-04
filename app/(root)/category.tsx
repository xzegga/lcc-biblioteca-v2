import { useGlobalSearchParams, useRouter } from 'expo-router';
import {  SafeAreaView, View, StatusBar } from 'react-native';
import tailwind from 'twrnc';

import LocalImage from '../../components/LocalImage';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { useCategories } from '../../hooks/useCategories';
import { useCrops } from '../../hooks/useCrops';
import { Crops } from '../../components/Crops';
import { useEffect, useState } from 'react';

import { AntDesign } from '@expo/vector-icons'; 
import BackBtn from '../../components/BackAction';

export default function Category() {
    const [dark, setDark] = useState(false);
    const [category, setCategory] = useState<any>();
    const [crops, setCrops] = useState<any>();
    const router = useRouter();

    const { catId } = useGlobalSearchParams();

    const cropsHook = useCrops();
    const categoryHook = useCategories();

    useEffect(() => {
        const categoryItem = categoryHook.getById(Number(catId)) as any;
        if (categoryItem) setCategory(categoryItem);

        const cropItems = cropsHook.findByCategory(Number(catId));
        if (cropItems) setCrops(cropItems);
    }, []);

    return (
        <SafeAreaView style={[tailwind`bg-white h-full`]}>
            {crops && category ?
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
                            <LocalImage source={category.imagen} />
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
                        <View style={[tailwind`mt-0`]}>
                            <Crops crops={crops}></Crops>
                        </View>
                    </View>
                </ParallaxScrollView>
                : null}
            <StatusBar barStyle="light-content" />
        </SafeAreaView>
    );
}