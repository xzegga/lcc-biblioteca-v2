import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Results } from 'realm/dist/bundle';
import tailwind from 'twrnc';

import { Categories } from '../../components/Categories';
import { SearchBar } from '../../components/SarchBar';
import { baseUri, folderPath } from '../../services/config';
import { useCategories } from '../../hooks/useCategories';
import { useCropIssues } from '../../hooks/useCropIssues';
import { useCrops } from '../../hooks/useCrops';
import { useStore } from '../../hooks/useGlobalStore';
import useImagesLoader from '../../hooks/useImagesLoader';
import useRealmSubscriptions from '../../hooks/useRealmSubscriptions';
import { Category } from '../../schemas/Category';
import { Crop } from '../../schemas/Crop';
import { CropIssues } from '../../schemas/CropIssues';
import { Crops } from '../../components/Crops';
import { CustomHeader } from '../../components/CustomHeader';

export default function Home() {
    const categoriesHook = useCategories();
    const categories = categoriesHook.items();

    const cropsHook = useCrops();
    const cropsResults = cropsHook.items();
    const [crops, setCrops] = useState(cropsResults);

    const cropsIssuesHook = useCropIssues();
    const cropsIssues = cropsIssuesHook.items();

    const [phrase, setPhrase] = useState('');

    const subscription = useRealmSubscriptions(['Crop', 'CropIssues', 'Category']);
    const { images, setState, toDownload, appState } = useStore((state) => ({
        images: state.images,
        setState: state.setState,
        toDownload: state.toDownload,
        appState: state.appState,
    }));

    const { imagePaths, pathsLoaded } = useImagesLoader(folderPath, baseUri);
    
    useEffect(() => {
        subscription.subscribe();
        return () => {
            subscription.unsubscribe();
        }
    }, []);


    useEffect(() => {
       if(phrase!) {
            const cropItems = cropsHook.findByName(phrase);
            setCrops(cropItems);
       } else {
            setCrops(cropsResults);
       }
    }, [phrase]);

    useEffect(() => {
        if (imagePaths && Object.keys(imagePaths).length) {
            setState({ images: imagePaths });
        }
    }, [imagePaths]);

    useEffect(() => {
        const download = async () => {
            if (categories.length && crops.length && cropsIssues.length && appState !== 'idle' && pathsLoaded) {
                const cropImages = getImages(crops);
                const cropIssuesImages = getImages(cropsIssues);
                const categoriesImages = getImages(categories);
                const imagestdl = [...cropImages, ...cropIssuesImages, ...categoriesImages];

                const imagesToDownload = [];
                for (let img of imagestdl) {
                    if (!toDownload.includes(img) && !images[img]) {
                        imagesToDownload.push(img);
                    }
                }
                setState({
                    appState: 'idle',
                    toDownload: [...toDownload, ...imagesToDownload]
                });
            }
        }
        download();

    }, [categories, crops, cropsIssues, pathsLoaded]);

    const getImages = (entity: any[] | Results<Category> | Results<Crop> | Results<CropIssues>) => {
        return (entity as any[]).filter((item: any) => item.imagen !== '').map((item: any) => item.imagen);
    }

    return (
        <SafeAreaView style={[tailwind`bg-white h-full`]}>
            <CustomHeader />
            <View style={tailwind`pt-12`}></View>
            <SearchBar phrase={phrase} action={setPhrase} />

            <View style={[tailwind`p-4 pt-2`]}>
                <View style={[tailwind`mt-0`]}>
                    <Categories categories={categories}></Categories>
                </View>
                <View style={[tailwind`mt-0`]}>
                    <Crops crops={crops}></Crops>
                </View>

            </View>
        </SafeAreaView>
    );
}
