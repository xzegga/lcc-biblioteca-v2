import { AntDesign } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Pressable, View, Text } from "react-native"
import tailwind from "twrnc"

export default function BackBtn() {
    const router = useRouter();
    return (
        <View style={[tailwind`pt-7 pl-3`]}>
            <Pressable onPress={() => router.back()} style={
                tailwind`flex flex-row items-center gap-2`}>
                <AntDesign name="arrowleft" size={15} color="rgb(19 78 74)" />
                <Text style={tailwind`text-lg text-teal-900`}>
                    Atras</Text>
            </Pressable>
        </View>
    );
}