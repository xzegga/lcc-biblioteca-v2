import { useGlobalSearchParams } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import tailwind from "twrnc";

import LocalImage from "../../../components/LocalImage";
import ParallaxScrollView from "../../../components/ParallaxScrollView";
import { useCrops } from "../../../hooks/useCrops";
import useScrollBar from "../../../hooks/useScrollBar";
import { useCropIssues } from "../../../hooks/useCropIssues";
import { AntDesign } from "@expo/vector-icons";
import { useStore } from "../../../hooks/useGlobalStore";
import { flattenArray } from "../../../helpers/flatArray";

export function Details({ label, value }: { label: string; value: string }) {
  return (
    <View>
      {value! ? (
        <View style={tailwind`mt-2`}>
          <Text
            style={tailwind`text-base font-semibold pb-1 w-full`}
          >
            {label}:
          </Text>
          <Text
            style={tailwind`text-base font-normal pb-1`}
          >
            {value}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

export default function Issue() {
  const crops = useCrops();
  const { cropIssueId } = useGlobalSearchParams();
  const issues = useCropIssues();
  const cropIssue = cropIssueId
    ? issues.getById(cropIssueId as string)
    : null;

  const cropsControlIds =
    cropIssue?.controls?.map((control: any) => control.crop) || [];

  const cropIssueIds = cropIssue?.crop || [];
  const uniqueIds = new Set(
    flattenArray([...cropIssueIds, ...cropsControlIds]),
  );

  const cropsNames = crops.getNamesByIds(Array.from(uniqueIds));

  const { selectedCrop } = useStore((state) => ({
    selectedCrop: state.selectedCrop,
  }));

  const crop = crops.getById(selectedCrop);

  const {
    ref,
    onScroll,
    renderStickyHeader,
    renderFixedHeader,
    onChangeHeaderVisibility,
  } = useScrollBar({ fixedHeader: true });

  return (
    <View style={[tailwind`bg-white h-full`]}>
      {cropIssue ? (
        <>
          <ParallaxScrollView
            ref={ref}
            onScroll={onScroll}
            renderFixedHeader={renderFixedHeader}
            stickyHeaderHeight={78}
            renderStickyHeader={renderStickyHeader}
            onChangeHeaderVisibility={onChangeHeaderVisibility}
            backgroundColor="white"
            style={{ flex: 1 }}
            renderBackground={() => (
              <View style={[tailwind`bg-white overflow-hidden`]}>
                <LocalImage source={cropIssue.imagen} />
              </View>
            )}
            parallaxHeaderHeight={300}
            contentContainerStyle={tailwind`rounded-t-[2rem] -mt-9`}
          >
            <View
              style={[tailwind`bg-white rounded-t-[2rem] overflow-hidden p-6`]}
            >
              <View style={tailwind`mb-4`}>
                <Text
                  style={tailwind`text-[2rem] font-extrabold text-teal-900`}
                >
                  {cropIssue.title}
                </Text>
                {cropIssue.scientific_name && (
                  <Text
                    style={tailwind`text-sm md:text-lg font-normal text-slate-500 mb-3`}
                  >
                    {cropIssue.scientific_name}
                  </Text>
                )}
                {cropIssue.description && (
                  <Text
                    style={tailwind`text-lg md:text-base pt-3 font-normal text-green-950`}
                  >
                    {cropIssue.description}
                  </Text>
                )}
              </View>

              {cropsNames.length ? (
                <View style={tailwind`mb-6`}>
                  <Text
                    style={tailwind`text-[1rem] font-extrabold text-teal-900 mb-3`}
                  >
                    Cultivos afectados
                  </Text>
                  {cropsNames.map((cropName: string, index: number) => (
                    <View
                      key={index}
                      style={tailwind`flex flex-row items-center gap-3`}
                    >
                      <AntDesign name="frowno" size={18} color="black" />
                      <Text
                        key={index}
                        style={tailwind`text-base text-green-950`}
                      >
                        {cropName}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}

              <View style={tailwind`mb-10`}>
                {cropIssue?.controls?.length ? (
                  <View>
                    {cropIssue.controls.map((control: any, index: any) => (
                      <View key={index}>
                        {crop &&
                          (control.crop.includes(crop.id) ||
                            cropIssue.crop.includes(crop.id)) ? (
                          <View

                            style={tailwind`flex border-t-[1px] mt-3 pt-3 
                            border-slate-200 mb-5`}
                          >
                            <Text
                              style={tailwind`text-lg pb-1 min-w-[25] 
                              text-lime-700`}
                            >
                              {control.name}
                            </Text>
                            <Details label="Dosis" value={control.dose} />
                            <Details label="Frecuencia" value={control.frequency} />
                            <Details label="Recomendaciones" value={control.recommendation} />
                          </View>
                        ) : null}
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            </View>
          </ParallaxScrollView>
        </>
      ) : null}

      <StatusBar barStyle="light-content" />
    </View>
  );
}
