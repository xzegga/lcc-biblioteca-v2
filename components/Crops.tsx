import { ScrollView, View, Text, Pressable } from "react-native";
import tailwind from "twrnc";
import { Crop } from "./Crop";
import { useStore } from "../hooks/useGlobalStore";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Category } from "../schemas/Category";
import { Link, useGlobalSearchParams } from "expo-router";

export function Crops({ crops }: { crops: any }) {
  const { selectedCategory, setState } = useStore((state) => ({
    selectedCategory: state.selectedCategory,
    setState: state.setState,
  }));

  const { catId } = useGlobalSearchParams();

  const handlePress = () => {
    setState({ selectedCategory: {} as Category });
  };

  return (
    <View style={tailwind`h-[100%]`}>
      <View style={tailwind`flex flex-row justify-between pb-2 items-center`}>
        <Text style={tailwind`text-lg pb-1 text-green-900 `}>Cultivos</Text>
        {catId ? (
          <Link href={"/"}>
            <View
              style={tailwind`
                      flex
                      flex-row
                      justify-center
                      items-center
                      bg-slate-900
                      px-3 py-1
                      rounded-[60px] ml-2`}
            >
              <Text
                style={tailwind`
                                    text-xs
                                    text-white`}
              >
                Todas las categorías
              </Text>
              <Ionicons name="close" size={15} color="white" />
            </View>
          </Link>
        ) : null}
      </View>

      <ScrollView style={tailwind`mb-30`}>
        {crops.map((crops: any) => (
          <View key={crops._id.toString()}>
            <Crop crop={crops} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
