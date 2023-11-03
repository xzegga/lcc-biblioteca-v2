import { Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import tailwind from 'twrnc';

import { Ionicons } from '@expo/vector-icons';

export function SearchBar({ phrase, action }: {
    phrase: string,
    action: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <View style={tailwind`
            flex h-[12]
            px-3
            py-3
            bg-white
            flex-row items-center 
            justify-between`}>
            <View style={[tailwind`
                    flex flex-row items-center gap-2
                    rounded-md w-full px-2 py-2
                    bg-slate-100
                    h-[9]`]}>
                <Ionicons name="ios-search" size={20} color="gray" />
                <TextInput
                    onChangeText={action}
                    value={phrase}
                    placeholder="Buscar"
                    style={tailwind`flex-1 h-[9]`}
                />
                <Pressable onPress={() => action('')} style={tailwind`w-6`}>
                    <Ionicons name="close" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    );

}