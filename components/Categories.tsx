import { View, Text, ScrollView } from "react-native";
import { Category } from "./Category";
import tailwind from "twrnc";

export function Categories({ categories }: { categories: any }) {

    return (
        <View>
            <Text style={tailwind`text-lg py-2 text-green-900 `}>Categorías</Text>
            <ScrollView horizontal>
                {categories.map((category: any) => (
                    <View key={category._id.toString()} style={tailwind`pb-4`}>
                        <Category category={category}></Category>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}