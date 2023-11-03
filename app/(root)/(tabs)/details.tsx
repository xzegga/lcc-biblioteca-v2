import { useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import tailwind from 'twrnc';

import LocalImage from '../../../components/LocalImage';
import ParallaxScrollView from '../../../components/ParallaxScrollView';
import { useCategories } from '../../../hooks/useCategories';
import { useCrops } from '../../../hooks/useCrops';
import useScrollBar from '../../../hooks/useScrollBar';
import { useStore } from '../../../hooks/useGlobalStore';
import { shortenText } from '../../../helpers/shortText';

export default function Details() {
    const crops = useCrops();
    const categoryHook = useCategories();
    const { cropId } = useGlobalSearchParams();

    const { setState } = useStore((state: any) => ({ setState: state.setState }));

    useEffect(() => {
        if (cropId) setState({ selectedCrop: cropId });
    }, [cropId]);

    const [crop, setCrop] = useState<any>();
    const [categories, setCategories] = useState<any>();

    const {
        ref,
        onScroll,
        renderStickyHeader,
        renderFixedHeader,
        onChangeHeaderVisibility } = useScrollBar({ fixedHeader: true });

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
                        parallaxHeaderHeight={300}

                        contentContainerStyle={tailwind`rounded-t-[2rem] -mt-9`}
                    >
                        <View style={[tailwind`bg-white rounded-t-[2rem] overflow-hidden p-6`]}>
                            <View style={tailwind`flex flex-row justify-center items-center`}>
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
                                            text-white`}>{shortenText(category, 15)}</Text>
                                        </View>
                                    ))
                                }

                            </View>
                            <Text style={tailwind`text-sm md:text-lg font-normal text-slate-500`}>{crop.scientific_name}</Text>
                            <Text style={tailwind`text-lg md:text-base pt-3 font-normal text-green-950`}>{crop.description}</Text>
                        </View>
                    </ParallaxScrollView>
                </> : null}

            <StatusBar barStyle="light-content" />
        </SafeAreaView>

    );
}