import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View, Text } from "react-native";
import tailwind from "twrnc";

export default function BackBtn({ color = "text-white" }: { color?: string }) {
  const router = useRouter();

  return (
    <View style={[tailwind`pt-8 pl-3`]}>
      <Pressable
        onPress={() => router.back()}
        style={tailwind`flex flex-row items-center gap-2`}
      >
        <AntDesign name="arrowleft" size={15} color={color} />
        <Text
          style={[
            tailwind`text-lg`,
            {
              color: `${color}`,
            },
          ]}
        >
          Atras
        </Text>
      </Pressable>
    </View>
  );
}
