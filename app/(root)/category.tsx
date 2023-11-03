import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import tailwind from 'twrnc';

import { Crops } from '../../components/Crops';
import LocalImage from '../../components/LocalImage';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { useCategories } from '../../hooks/useCategories';
import { useCrops } from '../../hooks/useCrops';
import useScrollBar from '../../hooks/useScrollBar';

export default function Category() {
    const [category, setCategory] = useState<any>();
    const [crops, setCrops] = useState<any>();
    const { catId } = useGlobalSearchParams();

    const cropsHook = useCrops();
    const categoryHook = useCategories();

    const {
        ref,
        onScroll,
        renderStickyHeader,
        renderFixedHeader,
        onChangeHeaderVisibility } = useScrollBar({});

    useEffect(() => {
        const categoryItem = categoryHook.getById(Number(catId)) as any;
        if (categoryItem) setCategory(categoryItem);

        const cropItems = cropsHook.findByCategory(Number(catId));
        if (cropItems) setCrops(cropItems);
    }, []);

    return (
        <SafeAreaView style={[tailwind`bg-white h-full`]}>

            {crops && category ?
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
                                <LocalImage source={category.imagen} />
                            </View>
                        )}
                        parallaxHeaderHeight={300}

                        contentContainerStyle={tailwind`rounded-t-[2rem] -mt-9`}
                    >
                        <View style={[tailwind`bg-white rounded-t-[2rem] overflow-hidden p-6`]}>
                            <View style={[tailwind`mt-0`]}>
                                <Crops crops={crops}></Crops>
                            </View>
                        </View>
                    </ParallaxScrollView>
                </> : null
            }
            <StatusBar barStyle="light-content" />
        </SafeAreaView >
    );
}