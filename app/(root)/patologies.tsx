import { View, Text, SafeAreaView } from "react-native";
import tailwind from "twrnc";

export default function Patologies() {

    return (
        <View style={[tailwind`bg-white`, { height: 500 }]}>
            <Text>Patologies</Text>
        </View>
    );
}