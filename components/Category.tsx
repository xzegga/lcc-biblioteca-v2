import { Platform, StyleSheet, Text, View } from "react-native";
import tailwind from "twrnc";

import LocalImage from "./LocalImage";
import { useStore } from "../hooks/useGlobalStore";
import { Link } from "expo-router";

export function Category({ category }: { category: any }) {

  return (
    <Link
      href={{
        pathname: "/category",
        params: { catId: category.id },
      }}
      style={tailwind`mr-2 ${Platform.OS === "ios" ? "max-h-[170px]" : "max-h-[180px]"}`}
    >
      <View
        style={[
          tailwind`
            flex gap-2 border-[1px] mb-4
            border-slate-200 rounded-[8px]
            bg-white
            ${Platform.OS === "ios" ? "h-[160px]" : "min-h-[180px]"}
            `,
          styles.shadow,
        ]}
      >
        <View style={tailwind`rounded-t-[8px] w-30 overflow-hidden
        ${Platform.OS === "ios" ? "h-[125px]" : "h-[125px]"}`}>
          <LocalImage source={category.imagen} />
        </View>
        <Text
          style={tailwind`text-xs text-slate-600 max-w-[30] px-1.5 leading-[.9rem]`}
        >
          {category.name}
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
