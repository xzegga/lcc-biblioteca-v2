import { View, Text, SafeAreaView } from "react-native";
import tailwind from "twrnc";

export default function Deficiencies() {

    return (
        <View style={[tailwind`bg-white`, { height: 500 }]}>
            <Text>Deficiencies</Text>
        </View>
    );
}