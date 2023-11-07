import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Results } from "realm/dist/bundle";
import tailwind from "twrnc";

import QuestionsIcon from "../../assets/questions.svg";
import { Categories } from "../../components/Categories";
import { Crops } from "../../components/Crops";
import { CustomHeader } from "../../components/CustomHeader";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import { SearchBar } from "../../components/SarchBar";
import { useCategories } from "../../hooks/useCategories";
import { useCropIssues } from "../../hooks/useCropIssues";
import { useCrops } from "../../hooks/useCrops";
import { useStore } from "../../hooks/useGlobalStore";
import useImagesLoader from "../../hooks/useImagesLoader";
import useRealmSubscriptions from "../../hooks/useRealmSubscriptions";
import useScrollBar from "../../hooks/useScrollBar";
import { Category } from "../../schemas/Category";
import { Crop } from "../../schemas/Crop";
import { CropIssues } from "../../schemas/CropIssues";
import { baseUri, folderPath } from "../../services/config";
import { Link } from "expo-router";
import { useQueries } from "../../hooks/useQueries";
import { useAuth } from "../../context/AuthContext";
import { Query } from "../../schemas/Query";
import useUpdateQuery from "../../hooks/useUpdateQueries";
import { Schemas } from "../../schemas/Schemas";

export default function Home() {  
  const { authState } = useAuth();
  const { networkStatus } = useUpdateQuery();

  const queryHook = useQueries();
  const queriesResults = queryHook.items(authState?.user);
  const [queries, setQueries] = useState(queriesResults);

  const categoriesHook = useCategories();
  const categories = categoriesHook.items();

  const cropsHook = useCrops();
  const cropsResults = cropsHook.items();
  const [crops, setCrops] = useState(cropsResults);

  const cropsIssuesHook = useCropIssues();
  const cropsIssues = cropsIssuesHook.items();

  const [headerActive, setHeaderActive] = useState(true);
  const [phrase, setPhrase] = useState("");

  const subscription = useRealmSubscriptions([
    Schemas.CROP,
    Schemas.CROPISSUES,
    Schemas.CATEGORY,
    Schemas.QUERY,
  ]);

  const { images, setState, toDownload, appState } = useStore((state) => ({
    images: state.images,
    setState: state.setState,
    toDownload: state.toDownload,
    appState: state.appState,
  }));

  const { ref, onScroll } = useScrollBar({});

  const { imagePaths, pathsLoaded } = useImagesLoader(folderPath, baseUri);

  useEffect(() => {
    subscription.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (phrase!) {
      // trim phrase value
      const cropItems = cropsHook.findByName(phrase.trim());
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
      if (
        categories.length &&
        crops.length &&
        cropsIssues.length &&
        appState !== "idle" &&
        pathsLoaded
      ) {
        const cropImages = getImages(crops);
        const cropIssuesImages = getImages(cropsIssues);
        const categoriesImages = getImages(categories);
        const queryImages = getImages(queries);
        const imagestdl = [
          ...cropImages,
          ...cropIssuesImages,
          ...categoriesImages,
          ...queryImages,
        ];

        const imagesToDownload = [];
        for (let img of imagestdl) {
          if (!toDownload.includes(img) && !images[img]) {
            imagesToDownload.push(img);
          }
        }
        setState({
          appState: "idle",
          toDownload: [...toDownload, ...imagesToDownload],
        });
      }
    };
    download();
  }, [categories, crops, cropsIssues, queries, pathsLoaded]);

  const getImages = (
    entity:
      | any[]
      | Results<Category>
      | Results<Crop>
      | Results<CropIssues>
      | Results<Query>,
  ) => {
    return (entity as any[])
      .filter((item: any) => item.imagen !== "")
      .map((item: any) => item.imagen);
  };

  return (
    <SafeAreaView style={[tailwind`bg-white h-full`]}>
      <ParallaxScrollView
        ref={ref}
        onScroll={onScroll}
        renderStickyHeader={() => (
          <View style={tailwind`bg-white w-full h-20 z-20 absolute`} />
        )}
        backgroundColor="transparent"
        style={{ flex: 1 }}
        parallaxHeaderHeight={405}
        stickyHeaderHeight={40}
        renderBackground={() => (
          <View style={[tailwind`bg-white p-2 pt-2 pb-0`]}>
            <CustomHeader />
            <View style={tailwind`pt-12`}></View>
            <SearchBar phrase={phrase} action={setPhrase} />
            <View style={[tailwind`px-2 mt-0`]}>
              <Categories categories={categories}></Categories>
            </View>
          </View>
        )}
        headerActive={headerActive}
        backgroundScrollSpeed={3}
      >
        <View style={[tailwind`p-4 pt-0`]}>
          <View style={[tailwind`mt-0`]}>
            <Text>{networkStatus}</Text>
            {crops.length ? <Crops crops={crops}></Crops> : null}
          </View>
        </View>
      </ParallaxScrollView>

      <Animated.View entering={FadeInDown}>
        <View
          style={tailwind`absolute bottom-4 right-4 min-w-12 min-h-12 flex`}
        >
          <Link href="/questions">
            <QuestionsIcon style={tailwind`min-w-12 min-h-12`} />
          </Link>
        </View>
      </Animated.View>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}
