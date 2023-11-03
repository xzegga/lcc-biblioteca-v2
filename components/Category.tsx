import { Pressable, StyleSheet, Text, View } from "react-native";
import tailwind from "twrnc";

import LocalImage from "./LocalImage";
import { useStore } from "../hooks/useGlobalStore";
import { Category as CategoryModel } from "../schemas/Category";
import { Link } from "expo-router";

export function Category({ category }: { category: any }) {
  const { selectedCategory, setState } = useStore((state) => ({
    selectedCategory: state.selectedCategory,
    setState: state.setState,
  }));

  return (
    <Link
      href={{
        pathname: "/category",
        params: { catId: category.id },
      }}
      style={tailwind`mr-2`}
    >
      <View
        style={[
          tailwind`
            flex gap-2 border-[1px] mb-4
            border-slate-200 rounded-[8px] min-h-[140px]
            bg-white`,
          styles.shadow,
        ]}
      >
        <View style={tailwind`rounded-t-[8px] w-25 h-25 overflow-hidden`}>
          <LocalImage source={category.imagen} />
        </View>
        <Text
          style={tailwind`text-xs text-slate-600 max-w-[25] px-1.5 pb-1 leading-[.9rem]`}
        >
          {category.name}{" "}
        </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
